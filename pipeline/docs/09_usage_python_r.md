# 09 — Python / R Examples

Every SQL query in [08 Neon SQL Access](./08_usage_neon.md) is directly
usable from Python via `pandas.read_sql()` and from R via `DBI::dbGetQuery()`.
This page collects a few workflow-oriented examples.

## Python — pandas + matplotlib

### Site inventory + summary

```python
import os, pandas as pd
from sqlalchemy import create_engine

engine = create_engine(os.environ['AQ_POSTGRES_URL'], pool_pre_ping=True)

sites = pd.read_sql("""
    SELECT aqsid, site_name, county_name,
           pollutant_groups_hourly, voc_cadence, lat, lon
    FROM   aq_coastal_bend.site_registry
    WHERE  data_status = 'active'
    ORDER  BY county_code, aqsid
""", engine)
print(sites)
```

### Ozone monthly means for 2015–2025

```python
ozone = pd.read_sql("""
    SELECT aqsid, site_name,
           DATE_TRUNC('month', date_local::date) AS month,
           AVG(sample_measurement) AS ozone_ppm,
           COUNT(*) AS n_hours
    FROM   aq_coastal_bend.pollutant_hourly
    WHERE  pollutant_group = 'Ozone'
    GROUP  BY 1, 2, 3
    ORDER  BY 1, 3
""", engine)

import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(12, 4))
for name, grp in ozone.groupby('site_name'):
    ax.plot(grp['month'], grp['ozone_ppm'], label=name, marker='o', ms=3)
ax.axhline(0.070, ls='--', color='red', label='NAAQS 0.070 ppm')
ax.set_ylabel('Ozone (ppm)'); ax.legend(); ax.set_title('Coastal Bend Ozone — Monthly Means')
plt.tight_layout(); plt.show()
```

### PM2.5 vs temperature at CC Holly

```python
q = """
WITH poll AS (
    SELECT date_local::date AS day, AVG(sample_measurement) AS pm25
    FROM   aq_coastal_bend.pollutant_hourly
    WHERE  aqsid = '483550034' AND pollutant_group = 'PM2.5'
      AND  method_code = 209        -- restrict to BAM era (see method timeline)
    GROUP  BY day
),
wx AS (
    SELECT date_local::date AS day, AVG(temp_c) AS temp_c
    FROM   aq_coastal_bend.weather_hourly
    WHERE  county_name = 'Nueces'
    GROUP  BY day
)
SELECT p.day, p.pm25, w.temp_c FROM poll p JOIN wx w USING(day) ORDER BY day
"""
df = pd.read_sql(q, engine)
df.plot.scatter('temp_c', 'pm25', alpha=0.3, title='CC Holly PM2.5 vs Temp (BAM era only)')
```

### VOC benzene time series (2025 only)

```python
benzene = pd.read_sql("""
    SELECT (date_local::date + time_local::time)::timestamp AS ts,
           sample_measurement AS benzene_ppbC
    FROM   aq_coastal_bend.vocs_1hr
    WHERE  aqsid = '483550083'  -- CC Palm
      AND  parameter_code = 45201
    ORDER  BY ts
""", engine)
benzene.set_index('ts').plot(figsize=(12, 3), title='CC Palm — Benzene 2025 hourly (ppbC)')
```

## R — DBI + data.table

```r
library(DBI); library(RPostgres); library(data.table); library(ggplot2)

con <- dbConnect(RPostgres::Postgres(),
                 dbname='neondb', sslmode='require',
                 # ... use the AQ_POSTGRES_URL fields
)

sites <- as.data.table(dbGetQuery(con, "
    SELECT aqsid, site_name, county_name,
           pollutant_groups_hourly, voc_cadence, lat, lon
    FROM aq_coastal_bend.site_registry
    WHERE data_status = 'active'
    ORDER BY county_code, aqsid
"))

# Ozone monthly means
o3 <- as.data.table(dbGetQuery(con, "
    SELECT aqsid, site_name,
           date_trunc('month', date_local::date) AS month,
           AVG(sample_measurement) AS ozone_ppm
    FROM aq_coastal_bend.pollutant_hourly
    WHERE pollutant_group = 'Ozone'
    GROUP BY 1, 2, 3
"))

ggplot(o3, aes(month, ozone_ppm, color = site_name)) +
    geom_line() +
    geom_hline(yintercept = 0.070, linetype = 'dashed', color = 'red') +
    labs(title = 'Coastal Bend Ozone — Monthly Means',
         y = 'Ozone (ppm)', x = NULL) +
    theme_minimal()

dbDisconnect(con)
```
