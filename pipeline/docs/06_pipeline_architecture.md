# 06 — Pipeline Architecture

**The database is the deliverable.** The Python pipeline exists to
build and refresh the Neon `aq_coastal_bend` schema — it is a
maintainer's tool, not a user-facing product. Team members and
collaborators query the database directly via SQL or the Neon Data
API and never need to touch the pipeline code.

## For everyone (query the database)

- **SQL access:** [08 Neon SQL access](./08_usage_neon.md)
- **Python / R examples:** [09 Usage — Python & R](./09_usage_python_r.md)
- **HTTP REST:** [08 §Data API](./08_usage_neon.md#the-neon-data-api-http-rest-alternative)

Everything else on this page is for maintainers (Aidan, or anyone
picking up the pipeline after him) who need to refresh the database
when new TCEQ data arrives.

---

## For maintainers only

### The filter

The Coastal Bend pipeline is a **county-filtered fork** of the
upstream [south-texas-aq v0.4.0 pipeline](https://aidanjmeyers.github.io/south-texas-aq-pipeline/04_pipeline_architecture/).
Everything is identical except for a filter at the ingest step:

```python
# pipeline/step_01b_ingest_tceq_raw.py
COASTAL_BEND_COUNTY_CODES: set[str] | None = {
    "007",  # Aransas    — no monitors in scope
    "025",  # Bee        — no monitors in scope
    "047",  # Brooks     — no monitors in scope
    "131",  # Duval      — no monitors in scope
    "249",  # Jim Wells  — no monitors in scope
    "261",  # Kenedy     — no monitors in scope
    "273",  # Kleberg    — 1 site (Kingsville PM2.5)
    "297",  # Live Oak   — no monitors in scope
    "355",  # Nueces     — 7 sites (Corpus Christi metro)
    "391",  # Refugio    — no monitors in scope
    "409",  # San Patricio — no monitors in scope
}
```

### Step chain (maintainer view)

```
pipeline/run_pipeline.py
 ├── 00 validate raw
 ├── 01b ingest TCEQ RD          <- Coastal Bend filter applied here
 ├── 01  criteria hourly build
 ├── 01c VOC + daily_24hr build
 ├── 02  weather build (Nueces + Kleberg only)
 ├── 03  NAAQS design values
 ├── 04  daily + monthly aggregates
 ├── 05b site_registry + parameter_reference
 ├── 06  export verify
 └── 07  Load into aq_coastal_bend schema on Neon (COPY-based)
```

Each step reads what the previous step produced and pushes the result
one layer closer to Neon. **The only permanent artifact is the Neon
schema** — every other intermediate is rebuilt from scratch on each
run.

### Runtime

- ~4 min for the local build (ingest → parquet → NAAQS → aggregates).
- ~5 min for the Neon COPY reload (10 tables, ~1.3 M rows total).

Compare to the upstream south-texas-aq full 42-site build: 9 min +
54 min. Coastal Bend is small.

### Refreshing the database

Any time TCEQ has new TAMIS data:

```powershell
# 1. Drop the updated TAMIS TXT files into the raw-data folder
#    (same location as the upstream south-texas-aq pipeline)

# 2. Run the pipeline — same command as upstream, filter is applied automatically
python pipeline/run_pipeline.py

# 3. Reload just the aq_coastal_bend schema on Neon
python pipeline/run_pipeline.py --only 07
```

That's it. Every downstream user is querying the Neon schema, so once
step 07 finishes, everyone has the fresh data.

### What lives where

| Artifact | Location | Who reads it |
|---|---|---|
| Raw TCEQ RD TXT files | `!Final Raw Data/TCEQ Downloads .../` | Only the pipeline |
| Intermediate parquet + CSVs | `data/parquet/`, `data/csv/` | Only the pipeline (rebuilt every run) |
| **Neon `aq_coastal_bend` schema** | `AQ_POSTGRES_URL` → schema `aq_coastal_bend` | **The whole team, all collaborators, all downstream code** |
| Docs site source | `pipeline/docs/*.md` in this repo | Editor / GitHub Pages CI |
| **Live docs site** | [aidanjmeyers.github.io/coastal-bend-aq](https://aidanjmeyers.github.io/coastal-bend-aq/) | Everyone |

### What's different from upstream

| Aspect | south-texas-aq v0.4.0 | coastal-bend-aq v0.1.x |
|---|---|---|
| Counties in scope | 13 | 11 (only 2 with data) |
| Active sites | 41 | 7 (+ 1 disabled) |
| Table set | 10 | 10 (same names) |
| **Neon schema** | `aq` | **`aq_coastal_bend`** |
| Row count | ~11.5 M | ~1.3 M |
| Storage on Neon | ~2.4 GB | ~260 MB |
| Full build time | ~9 min | ~4 min |
| Neon reload time | ~54 min | ~5 min |

### Where to modify to add a new county

1. Add its FIPS code to `COASTAL_BEND_COUNTY_CODES` in
   `pipeline/step_01b_ingest_tceq_raw.py`.
2. Confirm the county's name is in `COUNTY_NAMES` in the same file
   (all 11 Coastal Bend counties already populated).
3. Drop new TCEQ TAMIS TXT files with the county's site data into the
   raw-data folder.
4. Re-run the pipeline.

### Where to modify to change the Neon schema name

`pipeline/config.yaml`:

```yaml
postgres:
  schema: "aq_coastal_bend"   # change here + update docs
```

Note that `SELECT` and `USAGE` grants + `ALTER DEFAULT PRIVILEGES`
must be re-applied to the new schema for the Data API roles
(`anonymous`, `authenticated`) to see it. See the SQL in the
[2026-07-08 Pipeline Update](./pipeline_updates.md#2026-07-08--v010--initial-coastal-bend-fork).
