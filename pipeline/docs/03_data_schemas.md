# 03 — Data Schemas

Schemas mirror the upstream
[south-texas-aq v0.4.0 schema](https://aidanjmeyers.github.io/south-texas-aq-pipeline/03_data_schemas/)
— every table on Neon has the same column set. The only difference is
**which rows exist**: the Coastal Bend schema filters to
`county_code IN (273, 355)` for pollutant tables and
`county_name IN ('Nueces', 'Kleberg')` for weather.

## Canonical 14-column schema

Used by `pollutant_hourly`, `pollutant_daily_24hr`, `vocs_1hr`,
`vocs_24hr`:

| Column | Type | Unit | Description |
|---|---|---|---|
| `state_code` | int32 | — | Always 48 (Texas) |
| `county_code` | int32 | — | 273 (Kleberg) or 355 (Nueces) |
| `site_number` | int32 | — | AQS site number |
| `parameter_code` | int32 | — | AQS parameter code |
| `poc` | int32 | — | Parameter Occurrence Code |
| `date_local` | text | — | `YYYY-MM-DD` |
| `time_local` | text | — | `HH:MM` (`00:00` for daily) |
| `sample_measurement` | float64 | varies | Value in canonical units |
| `method_code` | int32 | — | AQS method code |
| `county_name` | text | — | Title-case |
| `pollutant_name` | text | — | Friendly (e.g. "Benzene") |
| `aqsid` | text | — | 9-digit AQS site ID |
| `pollutant_group` | text | — | One of: Ozone, NOx_Family, CO, SO2, PM10, PM2.5, VOCs |
| `site_name` | text | — | Canonical `Name_XXXX` |

`pollutant_hourly` adds derived `datetime, year, month, hour, season`.

## Tables in `aq_coastal_bend` (v0.1.0)

| Table | Rows | Size | Filter applied |
|---|---:|---:|---|
| `site_registry` | 8 | 16 kB | `county_code IN (273, 355)` |
| `parameter_reference` | 57 | 16 kB | (unchanged from upstream — 57 AQS codes) |
| `naaqs_design_values` | 129 | 40 kB | `aqsid` in Coastal Bend sites |
| `pollutant_daily` | 31,015 | 5.0 MB | `aqsid` in Coastal Bend sites |
| `pollutant_daily_24hr` | 0 | 8 KB | (empty — site 0060 is Bexar) |
| `pollutant_monthly` | 1,035 | 264 kB | `aqsid` in Coastal Bend sites |
| `pollutant_hourly` | 768,243 | 119 MB | `county_code IN (273, 355)` |
| `vocs_1hr` | 336,922 | 55 MB | `county_code IN (273, 355)` = Nueces |
| `vocs_24hr` | 7,152 | 1.3 MB | `county_code IN (273, 355)` = Nueces |
| `weather_hourly` | 197,124 | 81 MB | `county_name IN ('Nueces', 'Kleberg')` |

Total: **~1.34 M rows, ~260 MB**.

## Site registry (v0.4.0-schema, Coastal Bend contents)

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

## NAAQS design values

Same schema as upstream:

```
aqsid, year, pollutant_group, metric, value, units,
naaqs_level, exceeds, site_name, county_name
```

129 rows for the Coastal Bend sites × 9 metrics × 11 years.

## Weather hourly

45 columns, unchanged from upstream. See the
[upstream schema doc §weather](https://aidanjmeyers.github.io/south-texas-aq-pipeline/03_data_schemas/#datasparquetweather--weather-hourly-unchanged-in-v040)
for the full column list.

Filtered to Nueces + Kleberg stations only in this fork.
