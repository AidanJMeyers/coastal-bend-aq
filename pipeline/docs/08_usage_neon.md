# 08 — Neon SQL Access (`aq_coastal_bend`)

## Connection

Same credentials as the upstream `south-texas-aq-pipeline` project — the
Coastal Bend fork lives in the **same Neon project** (`aged-salad-62359207`)
under a **different schema** (`aq_coastal_bend` instead of `aq`).

Set the environment variable (from your Neon console → Connection
Details):

```bash
export AQ_POSTGRES_URL='postgresql://neondb_owner:npg_...@ep-....neon.tech/neondb?sslmode=require'
```

Or add it as a Colab Secret (🔑 icon → `AQ_POSTGRES_URL`).

## Tables at a glance

```
aq_coastal_bend.site_registry            8 rows
aq_coastal_bend.parameter_reference      57 rows
aq_coastal_bend.naaqs_design_values      129 rows
aq_coastal_bend.pollutant_hourly         768,243 rows
aq_coastal_bend.pollutant_daily          31,015 rows
aq_coastal_bend.pollutant_daily_24hr     0 rows (empty in Coastal Bend)
aq_coastal_bend.pollutant_monthly        1,035 rows
aq_coastal_bend.vocs_1hr                 336,922 rows
aq_coastal_bend.vocs_24hr                7,152 rows
aq_coastal_bend.weather_hourly           197,124 rows
```

All read grants applied to `anonymous` and `authenticated` Data API
roles.

## Canonical starter queries

### Q1 — What monitors what in the Coastal Bend

```sql
SELECT aqsid, site_name, county_name,
       pollutant_groups_hourly,
       voc_cadence,
       first_date, last_date, n_records
FROM   aq_coastal_bend.site_registry
ORDER  BY county_code, aqsid;
```

### Q2 — 2024 NAAQS results

```sql
SELECT site_name, metric,
       ROUND(value::numeric, 4) AS value,
       naaqs_level, exceeds
FROM   aq_coastal_bend.naaqs_design_values
WHERE  year = 2024
ORDER  BY pollutant_group, exceeds DESC, value DESC;
```

Expected finding: **all 3 PM2.5 sites exceed the new 9.0 µg/m³ annual
NAAQS in 2024.** No exceedances for ozone or SO₂.

### Q3 — Daily ozone at CC Tuloso vs meteorology

```sql
WITH ozone_daily AS (
    SELECT date_local::date AS day, AVG(sample_measurement) AS ozone_ppm
    FROM   aq_coastal_bend.pollutant_hourly
    WHERE  aqsid = '483550026' AND pollutant_group = 'Ozone'
    GROUP  BY day
),
wx_daily AS (
    SELECT date_local::date AS day,
           AVG(temp_c) AS temp_c,
           AVG(humidity) AS humidity,
           AVG(wind_speed) AS wind_speed,
           SUM(rain_1h) AS rain_1h
    FROM   aq_coastal_bend.weather_hourly
    WHERE  county_name = 'Nueces'
    GROUP  BY day
)
SELECT o.day, o.ozone_ppm, w.temp_c, w.humidity, w.wind_speed, w.rain_1h
FROM   ozone_daily o
JOIN   wx_daily    w USING (day)
ORDER  BY o.day;
```

### Q4 — Benzene at CC Palm (2025 hourly)

```sql
SELECT v.date_local, v.time_local,
       v.sample_measurement AS benzene_ppbC,
       p.is_hap
FROM   aq_coastal_bend.vocs_1hr v
JOIN   aq_coastal_bend.parameter_reference p USING (parameter_code)
WHERE  v.aqsid = '483550083'
  AND  v.parameter_code = 45201       -- Benzene
ORDER  BY v.date_local, v.time_local;
```

### Q5 — Method-code timeline for any site (audit prep)

```sql
SELECT pollutant_group,
       EXTRACT(year FROM date_local::date)::int AS yr,
       method_code,
       COUNT(*) AS n_rows
FROM   aq_coastal_bend.pollutant_hourly
WHERE  aqsid = '483550034'   -- CC Holly, notorious for method changes
GROUP  BY pollutant_group, yr, method_code
ORDER  BY pollutant_group, yr, method_code;
```

## Cross-schema comparisons (Coastal Bend vs the full South Texas)

Any query can join across schemas. Example: how does CC Tuloso ozone
compare to the top ozone-exceeding sites in Bexar?

```sql
SELECT year, aqsid, site_name, value AS ozone_8hr_ppm, exceeds
FROM   aq.naaqs_design_values          -- full South Texas
WHERE  metric = 'ozone_8hr_4th_max' AND year = 2024
UNION ALL
SELECT year, aqsid, site_name, value, exceeds
FROM   aq_coastal_bend.naaqs_design_values   -- Coastal Bend subset
WHERE  metric = 'ozone_8hr_4th_max' AND year = 2024
ORDER  BY value DESC
LIMIT 10;
```

## Python + SQLAlchemy quick start

```python
import os, pandas as pd
from sqlalchemy import create_engine

engine = create_engine(os.environ['AQ_POSTGRES_URL'], pool_pre_ping=True)

sites = pd.read_sql('SELECT * FROM aq_coastal_bend.site_registry', engine)
print(sites)
```

## Read-only user for collaborators

Same procedure as the upstream project (see the
[upstream doc](https://aidanjmeyers.github.io/south-texas-aq-pipeline/17_colab_database_guide/#read-only-users-for-collaborators)).
Grant `USAGE` on `aq_coastal_bend` and `SELECT` on all tables in the
schema.
