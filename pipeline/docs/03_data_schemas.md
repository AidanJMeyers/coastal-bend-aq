# 03 — Data Schemas

**The Neon `aq_coastal_bend` schema is the deliverable.** All queries
go through Neon over HTTPS — SQL (via psycopg / SQLAlchemy / any BI
tool) or the Neon Data API (REST). File-based access is a maintainer
detail, not a user path.

## Tables in `aq_coastal_bend`

| Table | Rows | Size | Primary indexes | Query with |
|---|---:|---:|---|---|
| `aq_coastal_bend.site_registry` | 8 | 16 kB | `aqsid` | SQL / REST |
| `aq_coastal_bend.parameter_reference` | 57 | 16 kB | `parameter_code`, `pollutant_group` | SQL / REST |
| `aq_coastal_bend.naaqs_design_values` | 129 | 40 kB | `aqsid`, `metric`, `year` | SQL / REST |
| `aq_coastal_bend.pollutant_hourly` | 768,243 | 119 MB | `aqsid`, `date_local`, `pollutant_group`, `year` | SQL (REST paginates) |
| `aq_coastal_bend.pollutant_daily` | 31,015 | 5 MB | `aqsid`, `date_local`, `pollutant_group` | SQL / REST |
| `aq_coastal_bend.pollutant_daily_24hr` | 0 | 8 kB | `aqsid`, `date_local`, `pollutant_group` | SQL / REST (empty in Coastal Bend) |
| `aq_coastal_bend.pollutant_monthly` | 1,035 | 264 kB | `aqsid`, `year_month`, `pollutant_group` | SQL / REST |
| `aq_coastal_bend.vocs_1hr` | 336,922 | 55 MB | `aqsid`, `date_local`, `parameter_code` | SQL (REST paginates) |
| `aq_coastal_bend.vocs_24hr` | 7,152 | 1.3 MB | `aqsid`, `date_local`, `parameter_code` | SQL / REST |
| `aq_coastal_bend.weather_hourly` | 197,124 | 81 MB | `location`, `year`, `date_local` | SQL (REST paginates) |

Total: **~1.34 M rows, ~260 MB.**

Grants applied: `SELECT` and `USAGE` on the schema to both
`anonymous` (Data API public) and `authenticated` (Data API JWT-gated)
roles. `ALTER DEFAULT PRIVILEGES` set so future tables inherit.

## Canonical 14-column pollutant schema

Used by `pollutant_hourly`, `pollutant_daily_24hr`, `vocs_1hr`,
`vocs_24hr`:

| Column | Type | Unit | Description |
|---|---|---|---|
| `state_code` | int32 | — | Always 48 (Texas) |
| `county_code` | int32 | — | 273 (Kleberg) or 355 (Nueces) |
| `site_number` | int32 | — | AQS site number |
| `parameter_code` | int32 | — | AQS parameter code |
| `poc` | int32 | — | Parameter Occurrence Code (sub-instrument disambiguation) |
| `date_local` | text | — | `YYYY-MM-DD` |
| `time_local` | text | — | `HH:MM` (`00:00` for daily readings) |
| `sample_measurement` | float64 | varies | Value in canonical units |
| `method_code` | int32 | — | AQS method code (see [05 Method-code reference](./05_method_codes_reference.md)) |
| `county_name` | text | — | Title-case, e.g. "Nueces" |
| `pollutant_name` | text | — | Friendly name, e.g. "Benzene" |
| `aqsid` | text | — | 9-digit AQS site ID |
| `pollutant_group` | text | — | One of: `Ozone`, `NOx_Family`, `CO`, `SO2`, `PM10`, `PM2.5`, `VOCs` |
| `site_name` | text | — | Canonical `Name_XXXX` |

`pollutant_hourly` adds derived `datetime, year, month, hour, season`
columns for query-time convenience.

## `site_registry` — 8 rows

```
aqsid       | site_name                    | county   | pol_hourly     | voc | first_date | last_date
------------+------------------------------+----------+----------------+-----+------------+-----------
482730314   | Kingsville_0314              | Kleberg  | PM2.5          |     | 2015-01-01 | 2025-05-07
483550025   | Corpus Christi West_0025     | Nueces   | Ozone;SO2      |     | 2015-01-01 | 2025-12-31
483550026   | Corpus Christi Tuloso_0026   | Nueces   | Ozone;SO2      |     | 2015-01-01 | 2025-12-31
483550029   | Corpus Christi Hillcrest_0029| Nueces   |                | 24hr| 2025-01-01 | 2025-10-28
483550032   | Corpus Christi Dona Park_0032| Nueces   | PM2.5;SO2      | 24hr| 2015-01-01 | 2025-12-31
483550034   | Corpus Christi Holly_0034    | Nueces   | PM10;PM2.5;SO2 | 24hr| 2015-01-01 | 2025-12-31
483550083   | Corpus Christi Palm_0083     | Nueces   |                | 1hr | 2025-01-01 | 2025-12-31
483551024   | Williams Park                | Nueces   |                |     | (disabled) | (disabled)
```

Full column list:

```
aqsid, state_code, county_code, site_number,
site_name, county_name,
pollutant_groups_hourly, pollutant_groups_daily_24hr, voc_cadence,
n_pollutant_groups,
first_date, last_date, n_records,
data_status, notes,
lat, lon
```

## `parameter_reference` — 57 rows (AQS code catalog)

```
parameter_code, parameter_name, chemical_family, pollutant_group,
default_units, naaqs_regulated, is_hap, notes
```

Query it to look up what any parameter code means:

```sql
SELECT parameter_code, parameter_name, chemical_family, is_hap
FROM   aq_coastal_bend.parameter_reference
ORDER  BY parameter_code;
```

## `naaqs_design_values` — 129 rows

Design values computed per 40 CFR Part 50:

```
aqsid, year, pollutant_group, metric, value, units,
naaqs_level, exceeds, site_name, county_name
```

Metrics present: `ozone_8hr_4th_max`, `pm25_annual_mean`,
`pm25_24hr_p98`, `pm10_24hr_exceedances`, `so2_1hr_p99`.

## `weather_hourly` — 197,124 rows

45 columns including temperature, dew point, wind, humidity, cloud
cover, visibility, precipitation, and solar irradiance (GHI / DNI /
DHI, clear-sky and cloudy-sky) at hourly resolution. Filtered to
Nueces + Kleberg stations.

Most-used subset:

| Column | Unit | Meaning |
|---|---|---|
| `dt`, `datetime_utc`, `datetime_local`, `date_local` | — | UTC timestamp + local time components |
| `location` | — | Weather station name |
| `county_name`, `lat`, `lon` | — | Station location |
| `temp`, `temp_c` | °C | Air temperature |
| `temp_f` | °F | Fahrenheit alias |
| `humidity` | % | Relative humidity |
| `pressure` | hPa | Station pressure |
| `wind_speed` | m/s | Wind speed |
| `wind_deg` | ° | Wind direction (meteorological convention) |
| `wind_u`, `wind_v` | m/s | Wind components (for kriging) |
| `heat_index_c` | °C | Rothfusz (NULL when T<26°C or RH<40%) |
| `rain_1h`, `rain_3h` | mm | Rainfall |
| `ghi_cloudy_sky`, `ghi_clear_sky` | W/m² | Global horizontal irradiance |

## Reference: how to query

- **SQL from Python / R / BI tools** — see [08 Neon SQL access](./08_usage_neon.md)
- **HTTP REST via Neon Data API** — see [08 Neon SQL access §Data API](./08_usage_neon.md#the-neon-data-api-http-rest-alternative)
- **Copy-paste Python + pandas examples** — see [09 Python & R examples](./09_usage_python_r.md)
