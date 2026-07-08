# 08 — Neon Access

**Two ways to hit the `aq_coastal_bend` schema over the network:**

1. **Direct SQL** — the recommended path. Fast, indexed, works from
   Python / R / any BI tool. Everything below defaults to this.
2. **Neon Data API (HTTP REST)** — for lightweight web-app / notebook
   contexts where you don't want a Postgres client on the box. Uses
   PostgREST, returns JSON, JWT-gated when you need per-user auth.

Both paths hit the same tables and see the same data. Same
credentials (`AQ_POSTGRES_URL` for SQL, JWT from Neon Auth for REST).

## Connection setup (one time)

The Coastal Bend fork lives in the **same Neon project** as
south-texas-aq (`aged-salad-62359207`), just in a different schema
(`aq_coastal_bend`).

### Get the credentials

- **SQL URL:** Neon console →
  [aged-salad-62359207](https://console.neon.tech/app/projects/aged-salad-62359207)
  → Connection Details → copy the `postgresql://...` URL.
- **Data API base URL + Auth URL:** Neon console → same project →
  Data API tab.

### Store as environment variables

Linux / macOS / WSL:

```bash
export AQ_POSTGRES_URL='postgresql://neondb_owner:npg_...@ep-....neon.tech/neondb?sslmode=require'
```

Windows PowerShell:

```powershell
[Environment]::SetEnvironmentVariable("AQ_POSTGRES_URL",
    "postgresql://neondb_owner:npg_...@ep-....neon.tech/neondb?sslmode=require",
    "User")
```

Colab: 🔑 icon → add secret `AQ_POSTGRES_URL`, then toggle
**Notebook access** on.

## Tables available (v0.1.0)

| Table | Rows | Use for |
|---|---:|---|
| `aq_coastal_bend.site_registry` | 8 | Site metadata + pollutant coverage + coordinates |
| `aq_coastal_bend.parameter_reference` | 57 | AQS code lookup (name, chemical family, HAP flag) |
| `aq_coastal_bend.naaqs_design_values` | 129 | Per-site NAAQS values + exceedance flags |
| `aq_coastal_bend.pollutant_daily` | 31k | Daily aggregates with completeness flags (most common) |
| `aq_coastal_bend.pollutant_daily_24hr` | 0 | Empty in Coastal Bend (no 24hr-only sites here) |
| `aq_coastal_bend.pollutant_monthly` | 1k | Monthly rollups |
| `aq_coastal_bend.pollutant_hourly` | 768k | Hourly criteria pollutants — the workhorse |
| `aq_coastal_bend.vocs_1hr` | 337k | Hourly VOC AutoGC (CC Palm, 2025, 46 chemicals) |
| `aq_coastal_bend.vocs_24hr` | 7k | 24hr VOC AutoGC (3 sites, 2025, 48 chemicals) |
| `aq_coastal_bend.weather_hourly` | 197k | Hourly OpenWeather + Solcast (Nueces + Kleberg) |

All schemas documented in [03 Data Schemas](./03_data_schemas.md).

`SELECT` + `USAGE` granted to `anonymous` (public Data API) and
`authenticated` (JWT-gated Data API) roles. `ALTER DEFAULT PRIVILEGES`
set so future tables inherit.

---

## Path 1 — Direct SQL (recommended)

### From Python (SQLAlchemy)

```python
import os, pandas as pd
from sqlalchemy import create_engine

engine = create_engine(os.environ['AQ_POSTGRES_URL'], pool_pre_ping=True)

sites = pd.read_sql("SELECT * FROM aq_coastal_bend.site_registry", engine)
print(sites)
```

### From R (DBI + RPostgres)

```r
library(DBI); library(RPostgres); library(data.table)
# parse AQ_POSTGRES_URL into fields for dbConnect(...)
con <- dbConnect(RPostgres::Postgres(),
                 dbname = "neondb", sslmode = "require",
                 host = "...", user = "...", password = "...")
sites <- as.data.table(dbGetQuery(con, "SELECT * FROM aq_coastal_bend.site_registry"))
```

### From a BI tool

- **Tableau / Power BI / Metabase / DataGrip:** add a PostgreSQL data
  source, paste the URL fields, set SSL mode = `require`. Point the
  schema selector at `aq_coastal_bend`.
- **DBeaver:** New connection → PostgreSQL → paste URL fields → in the
  driver properties set `sslmode=require`.

### Canonical starter queries

```sql
-- Q1  What monitors what
SELECT aqsid, site_name, county_name,
       pollutant_groups_hourly, voc_cadence
FROM   aq_coastal_bend.site_registry
WHERE  data_status = 'active'
ORDER  BY county_code, aqsid;

-- Q2  2024 NAAQS results
SELECT site_name, metric,
       ROUND(value::numeric, 4) AS value,
       naaqs_level, exceeds
FROM   aq_coastal_bend.naaqs_design_values
WHERE  year = 2024
ORDER  BY pollutant_group, exceeds DESC, value DESC;

-- Q3  Method-code audit for any site
SELECT pollutant_group,
       EXTRACT(year FROM date_local::date)::int AS yr,
       method_code, COUNT(*) AS n_rows
FROM   aq_coastal_bend.pollutant_hourly
WHERE  aqsid = '483550034'                -- CC Holly
GROUP  BY pollutant_group, yr, method_code
ORDER  BY pollutant_group, yr, method_code;
```

More recipes in [09 Python & R examples](./09_usage_python_r.md).

### Performance notes

- **Always filter server-side.** Never `SELECT *` from
  `pollutant_hourly` without a `WHERE`.
- **Neon auto-pauses idle computes** — first query after ~5 min idle
  takes ~500 ms to wake. `pool_pre_ping=True` in the SQLAlchemy
  engine handles this transparently.
- **For >500k row pulls,** use pandas `chunksize=50000`.

---

## Path 2 — The Neon Data API (HTTP REST alternative)

The Neon Data API auto-exposes any table with a `SELECT` grant to the
`anonymous` role as a PostgREST endpoint. No Postgres client needed;
just HTTPS + JSON.

### Base URL pattern

Neon's Data API URL follows the pattern:

```
https://<compute-id>.apirest.<region>.aws.neon.tech/neondb/rest/v1
```

For this project the exact URL is on the Neon console → project →
Data API tab. It's the same base URL used by the parent
[south-texas-aq Data API](https://aidanjmeyers.github.io/south-texas-aq-pipeline/17_colab_database_guide/#connection-method-2-neon-data-api-http-rest),
just serving the `aq_coastal_bend` schema alongside `aq`.

### Example — GET the site registry

```bash
curl "$DATA_API_URL/site_registry?schema=aq_coastal_bend" \
     -H "Accept: application/json"
```

or in Python:

```python
import os, requests, pandas as pd

DATA_API = os.environ['NEON_DATA_API_URL']   # same base URL as south-texas-aq
r = requests.get(
    f"{DATA_API}/site_registry",
    headers={"Accept-Profile": "aq_coastal_bend"},   # PostgREST schema selector
    timeout=15,
)
sites = pd.DataFrame(r.json())
```

### Example — filter + limit

PostgREST query syntax uses URL params:

```bash
# ozone rows at CC West for a specific date, limit 100
curl "$DATA_API_URL/pollutant_hourly?\
pollutant_group=eq.Ozone&aqsid=eq.483550025&\
date_local=eq.2024-07-04&limit=100" \
  -H "Accept-Profile: aq_coastal_bend"
```

### Authentication tiers

Same setup as south-texas-aq:

- **Anonymous** (`anonymous` role, no auth): rate-limited public reads,
  fine for research / dashboard use.
- **Authenticated** (`authenticated` role, JWT): higher rate limits,
  audited. Get a JWT from the Neon Auth login page (~24 h validity)
  and pass as `Authorization: Bearer <jwt>`.

For the full setup + Better-Auth login flow, see the
[upstream Colab + Neon guide](https://aidanjmeyers.github.io/south-texas-aq-pipeline/17_colab_database_guide/)
— all of it applies here, just point at the `aq_coastal_bend` schema.

### When to prefer SQL vs REST

| Use SQL when… | Use REST when… |
|---|---|
| Pulling >1000 rows | Pulling a small filtered slice |
| Joining across tables | Reading a single row / small filter |
| Building analytical models | Building a lightweight web widget |
| From Python / R / BI tool | From a browser / mobile app / serverless function |
| You already have psycopg / SQLAlchemy | You don't want a Postgres client dependency |

## Grant a read-only role to a new collaborator

```sql
CREATE ROLE cb_reader WITH LOGIN PASSWORD 'pick_a_strong_password';
GRANT USAGE ON SCHEMA aq_coastal_bend TO cb_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA aq_coastal_bend TO cb_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA aq_coastal_bend
    GRANT SELECT ON TABLES TO cb_reader;
```

Share the connection URL with the `cb_reader` user instead of
`neondb_owner`. They can read everything, modify nothing.
