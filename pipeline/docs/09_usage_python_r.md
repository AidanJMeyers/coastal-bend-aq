# 09 — Python & R Examples

**Every query below runs against the Neon `aq_coastal_bend` schema
over the network.** No files are downloaded, no pipeline is run
locally. All you need is the `AQ_POSTGRES_URL` connection string.

For raw SQL and the connection setup, start at
[08 Neon SQL access](./08_usage_neon.md). This page is a cookbook of
common Python + R patterns on top of that connection.

## Python setup

```bash
pip install "psycopg[binary]" sqlalchemy pandas
```

```python
import os, pandas as pd
from sqlalchemy import create_engine

engine = create_engine(os.environ['AQ_POSTGRES_URL'], pool_pre_ping=True)
```

Set `AQ_POSTGRES_URL` from the Neon console → Connection Details.
In Colab, use the 🔑 secrets panel.

## R setup

```r
install.packages(c("DBI", "RPostgres", "data.table", "ggplot2"))

library(DBI); library(RPostgres); library(data.table)

# parse AQ_POSTGRES_URL and connect
url <- Sys.getenv("AQ_POSTGRES_URL")
con <- dbConnect(RPostgres::Postgres(), dbname = "neondb", sslmode = "require",
                 # ... use the URL fields for host, user, password
                 )
```

---

## Recipe 1 — Site inventory

=== "Python"

    ```python
    sites = pd.read_sql("""
        SELECT aqsid, site_name, county_name,
               pollutant_groups_hourly, voc_cadence,
               first_date, last_date, n_records,
               lat, lon
        FROM   aq_coastal_bend.site_registry
        WHERE  data_status = 'active'
        ORDER  BY county_code, aqsid
    """, engine)
    print(sites)
    ```

=== "R"

    ```r
    sites <- as.data.table(dbGetQuery(con, "
        SELECT aqsid, site_name, county_name,
               pollutant_groups_hourly, voc_cadence,
               first_date, last_date, n_records,
               lat, lon
        FROM aq_coastal_bend.site_registry
        WHERE data_status = 'active'
        ORDER BY county_code, aqsid
    "))
    ```

## Recipe 2 — 2024 NAAQS exceedances (headline)

=== "Python"

    ```python
    dv = pd.read_sql("""
        SELECT site_name, metric,
               ROUND(value::numeric, 4) AS value,
               naaqs_level, exceeds
        FROM   aq_coastal_bend.naaqs_design_values
        WHERE  year = 2024
        ORDER  BY exceeds DESC, value DESC
    """, engine)
    print(dv.query('exceeds == True'))
    ```

    Expected: **3 PM2.5 sites exceeding the 9 µg/m³ annual NAAQS**,
    CC Holly also exceeding the 35 µg/m³ 24hr NAAQS.

=== "R"

    ```r
    dv <- as.data.table(dbGetQuery(con, "
        SELECT site_name, metric, ROUND(value::numeric, 4) AS value,
               naaqs_level, exceeds
        FROM aq_coastal_bend.naaqs_design_values
        WHERE year = 2024
        ORDER BY exceeds DESC, value DESC
    "))
    dv[exceeds == TRUE]
    ```

## Recipe 3 — Ozone monthly means, 2015-2025 (both sites)

=== "Python"

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
    for name, g in ozone.groupby('site_name'):
        ax.plot(g['month'], g['ozone_ppm'], label=name, marker='o', ms=3)
    ax.axhline(0.070, ls='--', color='red', label='NAAQS 0.070 ppm')
    ax.set_ylabel('Ozone (ppm)'); ax.legend()
    ax.set_title('Coastal Bend Ozone — Monthly Means')
    plt.tight_layout(); plt.show()
    ```

=== "R"

    ```r
    library(ggplot2)
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
    ```

## Recipe 4 — PM2.5 vs meteorology at CC Holly (BAM era only)

The `method_code = 209` filter restricts to the BAM era to avoid
mixing method transitions (see
[05 Method-code reference](./05_method_codes_reference.md)).

=== "Python"

    ```python
    df = pd.read_sql("""
        WITH poll AS (
            SELECT date_local::date AS day,
                   AVG(sample_measurement) AS pm25
            FROM   aq_coastal_bend.pollutant_hourly
            WHERE  aqsid = '483550034'          -- CC Holly
              AND  pollutant_group = 'PM2.5'
              AND  method_code = 209             -- BAM era only
            GROUP  BY day
        ),
        wx AS (
            SELECT date_local::date AS day,
                   AVG(temp_c) AS temp_c,
                   AVG(humidity) AS humidity,
                   AVG(wind_speed) AS wind_speed
            FROM   aq_coastal_bend.weather_hourly
            WHERE  county_name = 'Nueces'
            GROUP  BY day
        )
        SELECT p.day, p.pm25, w.temp_c, w.humidity, w.wind_speed
        FROM   poll p JOIN wx w USING (day)
        ORDER  BY p.day
    """, engine)

    print(df[['pm25', 'temp_c', 'humidity', 'wind_speed']].corr())
    ```

=== "R"

    ```r
    df <- as.data.table(dbGetQuery(con, "
        WITH poll AS (
            SELECT date_local::date AS day, AVG(sample_measurement) AS pm25
            FROM aq_coastal_bend.pollutant_hourly
            WHERE aqsid='483550034' AND pollutant_group='PM2.5'
              AND method_code = 209
            GROUP BY day
        ),
        wx AS (
            SELECT date_local::date AS day,
                   AVG(temp_c) AS temp_c, AVG(humidity) AS humidity,
                   AVG(wind_speed) AS wind_speed
            FROM aq_coastal_bend.weather_hourly
            WHERE county_name='Nueces'
            GROUP BY day
        )
        SELECT p.day, p.pm25, w.temp_c, w.humidity, w.wind_speed
        FROM poll p JOIN wx w USING(day)
    "))
    cor(df[, .(pm25, temp_c, humidity, wind_speed)], use = 'complete.obs')
    ```

## Recipe 5 — Benzene hourly time series at CC Palm (2025)

=== "Python"

    ```python
    benzene = pd.read_sql("""
        SELECT (date_local::date + time_local::time)::timestamp AS ts,
               sample_measurement AS benzene_ppbC
        FROM   aq_coastal_bend.vocs_1hr
        WHERE  aqsid = '483550083'
          AND  parameter_code = 45201       -- Benzene
        ORDER  BY ts
    """, engine)
    benzene.set_index('ts').plot(figsize=(12, 3),
        title='CC Palm — Benzene 2025 hourly (ppbC)')
    ```

## Recipe 6 — Method-code audit for any site (for the deep-dive pages)

=== "Python"

    ```python
    methods = pd.read_sql("""
        SELECT pollutant_group,
               EXTRACT(year FROM date_local::date)::int AS yr,
               method_code,
               COUNT(*) AS n_rows
        FROM   aq_coastal_bend.pollutant_hourly
        WHERE  aqsid = '483550034'          -- CC Holly, notorious for changes
        GROUP  BY pollutant_group, yr, method_code
        ORDER  BY pollutant_group, yr, method_code
    """, engine)
    print(methods.pivot_table(
        index=['pollutant_group', 'yr'],
        columns='method_code', values='n_rows', fill_value=0
    ))
    ```

## Recipe 7 — Cross-schema comparison (Coastal Bend vs full South Texas)

Both `aq` (upstream, 42 sites) and `aq_coastal_bend` (8 sites) live in
the same Neon project, so any query can join across them:

```sql
SELECT 'south_texas' AS scope, year,
       AVG(value) AS ozone_ppm_avg
FROM   aq.naaqs_design_values
WHERE  metric = 'ozone_8hr_4th_max'
GROUP  BY year
UNION ALL
SELECT 'coastal_bend' AS scope, year, AVG(value)
FROM   aq_coastal_bend.naaqs_design_values
WHERE  metric = 'ozone_8hr_4th_max'
GROUP  BY year
ORDER  BY year, scope;
```

## Performance tips

- **Always filter server-side** — never `SELECT *` from
  `pollutant_hourly` and filter in pandas. The `year` and
  `date_local` indexes make date filters cheap.
- **Use `LIMIT` while exploring** — pulling 768k rows one time on a
  slow connection will hurt.
- **Neon auto-pauses idle computes** — first query after ~5 min idle
  takes ~500 ms to wake the compute. `pool_pre_ping=True` in the
  engine handles this transparently.
- **For very large result sets** (>500k rows), use `chunksize`:

    ```python
    chunks = pd.read_sql(sql, engine, chunksize=50_000)
    df = pd.concat(chunks, ignore_index=True)
    ```
