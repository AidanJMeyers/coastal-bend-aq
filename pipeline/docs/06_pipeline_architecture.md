# 06 — Pipeline Architecture

The Coastal Bend pipeline is a **county-filtered fork** of the
[south-texas-aq v0.4.0 pipeline](https://aidanjmeyers.github.io/south-texas-aq-pipeline/04_pipeline_architecture/).
The step chain and code are identical; the only difference is a
`COASTAL_BEND_COUNTIES` filter applied at ingest.

## The filter

Defined in `pipeline/step_01b_ingest_tceq_raw.py`:

```python
COASTAL_BEND_COUNTY_CODES = {
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

Every downstream step (parquet stores, NAAQS, daily aggregates,
metadata, Postgres load) then operates on the filtered dataset.

## Step chain

```
run_pipeline.py
 ├── 00 validate raw
 ├── 01b ingest TCEQ RD  (county filter applied here)
 ├── 01  criteria hourly parquet
 ├── 01c VOC + daily_24hr parquet
 ├── 02  weather parquet (county_name filter: Nueces + Kleberg)
 ├── 03  NAAQS design values
 ├── 04  daily + monthly aggregates
 ├── 05b site_registry + parameter_reference CSVs
 ├── 06  CSV export verify
 └── 07  Load into aq_coastal_bend schema on Neon
```

Runtime for the Coastal Bend build: **~4 min local + ~5 min Neon reload**
(vs. 9 + 54 min for the full South Texas 42-site version).

## What's different from upstream

| Aspect | south-texas-aq v0.4.0 | coastal-bend-aq v0.1.0 |
|---|---|---|
| Counties in scope | 13 | 11 |
| Active sites | 41 | 7 |
| Total tables loaded | 10 | 10 (same schema) |
| Neon schema | `aq` | `aq_coastal_bend` |
| Row count | ~11.5 M | ~1.3 M |
| Storage on Neon | ~2.4 GB | ~260 MB |
| Full build time | ~9 min | ~4 min |

## Where to modify to add a new county

1. Add the FIPS code to `COASTAL_BEND_COUNTY_CODES` in
   `pipeline/step_01b_ingest_tceq_raw.py`.
2. Add the county name to `COUNTY_NAMES` in the same file (already
   populated for all 11 Coastal Bend counties).
3. Drop the corresponding TCEQ TAMIS TXT file(s) into
   `!Final Raw Data/TCEQ Downloads 5-21-26/Confirmed - AQS Ascending/`.
4. Re-run `python pipeline/run_pipeline.py`.
