# 02 — Data Sources

> **This page documents where the data originates for reproducibility
> and manuscript-methods purposes.** You don't need to touch any of the
> files below — everything is already ingested into
> `aq_coastal_bend` on Neon. See [08 Neon access](./08_usage_neon.md)
> to query it.

## 1. TCEQ TAMIS (sole pollutant source)

**Network:** Texas Commission on Environmental Quality — TAMIS web portal.
TCEQ submits to EPA's AQS network, so every site here is the upstream of
whatever appears in EPA's Data Mart.

**Coverage in Coastal Bend:** 8 monitoring sites (7 active + 1 disabled)
across 2 of 11 counties (Nueces + Kleberg). See
[Data availability](./04_data_availability.md#2-site-inventory) for
per-site pollutant coverage.

**Retrieval method:** Manual AQS RD Transaction v1.6 downloads from
[www17.tceq.texas.gov/tamis](https://www17.tceq.texas.gov/tamis/).
Pipe-delimited flat-file format with an 11-row header.

**Parameters ingested:**

| Group | Parameter codes | Units | Notes |
|---|---|---|---|
| Ozone | 44201 | ppb (native) → ppm (× 0.001 at ingest) | Method 87 (UV photometry) |
| SO₂ | 42401 | ppb | Method 100 (pulsed fluorescence) or 92 (older) |
| PM2.5 | 88101 (FRM), 88502 (any method) | µg/m³ LC | Methods 702 (TEOM), 209 (BAM), 638 (BAM v2) |
| PM10 | 81102 (STP) | µg/m³ LC | Methods 141 (1-in-6 day filter), 639 (continuous BAM) |
| VOCs | 43xxx (paraffins, cycloalkanes, olefins), 45xxx (aromatics) | ppbC | Method 128 (AutoGC) |

CO and NOx family parameters (42101, 42601, 42602, 42603) have **no
monitoring in the Coastal Bend** as of 2025-12.

**Landing location** (matches the upstream south-texas-aq pipeline):
`!Final Raw Data/TCEQ Downloads 5-21-26/Confirmed - AQS Ascending/`

Files relevant to the Coastal Bend:
```
480290060_OnlyEPAReportingStandard.txt   (not Coastal Bend — Bexar)
482730314.txt                             Kingsville_0314 (Kleberg)
483550025.txt                             Corpus Christi West
483550026.txt                             Corpus Christi Tuloso
483550029.txt                             Corpus Christi Hillcrest
483550032.txt                             Corpus Christi Huisache
483550034.txt                             Corpus Christi Dona Park
483550083.txt                             Corpus Christi Palm
Cameron_VOCs24hrAutoGC.txt                (not Coastal Bend — Cameron)
Nueces_VOCS1hrAutoGC.txt                  → CC Palm 1hr rows
Nueces_VOCS24hrAutoGC.txt                 → Hillcrest/Dona Park/Huisache 24hr
```

**Site-name note (2026-08-26 reconciliation).** The 32/34 labels above were
corrected from an earlier "Dona Park / Holly" mislabel that turned out to be
a CAMS-ID (TCEQ) vs `site_number` (AQS) confusion — see
[13. TCEQ CAMS ↔ AQS site reference](./13_tceq_cams_aqs_reference.md).
CC Holly (TCEQ CAMS 660) was deactivated 2018 and is not in the current pull.

## 2. Site coordinates + registry

**Files:**
- `01_Data/Reference/enhanced_monitoring_sites.csv` — AQS-verified lat/lon
- `!Final Raw Data/Extra TCEQ Sites.xlsx` — TCEQ CAMS sites not in EPA AQS

Coordinates for all 8 Coastal Bend sites are in the pipeline
`aq_coastal_bend.site_registry` table with columns:

```
aqsid, state_code, county_code, site_number,
site_name, county_name,
pollutant_groups_hourly, pollutant_groups_daily_24hr, voc_cadence,
first_date, last_date, n_records,
data_status, notes, lat, lon
```

## 3. Weather covariates — two independent feeds

The pipeline exposes **two meteorological datasets** side-by-side so that
downstream analysis can compare regional-forecast met against
on-monitor-tower met. Both are queryable via Neon.

### 3a. OpenWeather + Solcast — regional feed (`weather_hourly`)

Unchanged from the upstream south-texas-aq pipeline. The 15-station
network covers the Coastal Bend with ~4 stations directly inside Nueces +
Kleberg. See the
[upstream Data Sources §3](https://aidanjmeyers.github.io/south-texas-aq-pipeline/02_data_sources/#3-openweather--solcast-historical-hourly-observations)
for the full sub-source / license / retrieval detail.

For the Coastal Bend fork, `aq_coastal_bend.weather_hourly` is filtered
to `county_name IN ('Nueces', 'Kleberg')` = 197,124 rows (~4 stations ×
~11 years × ~8,760 hours). Variables include temperature, humidity,
atmospheric pressure, precipitation, cloud cover, and (regional-scale)
wind speed + direction. Join key: `location` (station name).

### 3b. TCEQ site-specific meteorology — on-monitor feed (`site_weather_hourly`)

**Added v0.4.1 (2026-09-20).** On-tower TCEQ meteorology at 4 Coastal
Bend sites: wind speed (resultant + scalar), wind direction (resultant +
scalar), wind gust, and ambient temperature — measured at the same
physical tower as the pollutant analyzers.

**Why it's separate from `weather_hourly`:** different join key (`aqsid`
vs `location`), different variable set (site-met has no humidity,
pressure, precip, or cloud cover), different provenance (TCEQ on-tower
vs Open Weather regional). This was the 2026-08-12 team decision so
that Jasmine's "TCEQ per-site vs Open Weather regional" audit for the
Refinery-Row analysis has direct comparability.

**Coverage snapshot (382,654 wide rows):**

| AQS `site_number` | Site name | Rows | Temp cov | Wind speed cov | Wind dir (scalar) cov |
|---:|---|---:|---:|---:|---:|
| 25 | Corpus Christi West | 95,702 | ~100% | ~99% | ~88% |
| 26 | Corpus Christi Tuloso | 94,159 | ~99% | ~99% | ~88% |
| 32 | Corpus Christi Huisache | 95,655 | ~100% | ~99% | ~88% |
| 34 | Corpus Christi Dona Park | 97,138 | ~100% | ~99% | ~88% |

**Sites without on-monitor met** (still use regional `weather_hourly`):
- **CC Hillcrest (29)** — VOC-only station, no met sensors.
- **CC Palm (83)** — VOC-only station.
- **Kingsville (314, Kleberg)** — PM2.5-only, no met sensors.

**Parameters + units:**

| AQS param | Description | Unit | Method codes seen |
|---:|---|---|---|
| 61101 | Wind Speed - Resultant | m/s | 050, 069 |
| 61102 | Wind Direction - Resultant | compass ° | 069 |
| 61103 | Wind Speed - Scalar | m/s | 020, 069 |
| 61104 | Wind Direction - Scalar | compass ° | 020, 069 |
| 61105 | Wind Gust | m/s | 020, 069 |
| 62101 | Ambient Temperature | °F | 040, 069 |

**Derived columns (added at ingest):**

- `temp_c` = (temp_f − 32) × 5/9
- `wind_u_ms`, `wind_v_ms` — zonal + meridional decomposition from the
  RESULTANT pair (mathematically-correct wind-direction encoding).
- `wind_u_scalar_ms`, `wind_v_scalar_ms` — same decomposition from the
  SCALAR pair. Included because scalar direction has ~88% coverage vs
  resultant's ~33% — prefer resultant when available, fall back to
  scalar.

**POC handling:** POC=01 is used as primary; POC=02 as fallback when
POC=01 is missing (only 269 rows in the current pull fell to fallback).
Method codes and POC per parameter are preserved per row as an audit
trail.

**Ingest source:** [`step_02b_ingest_tceq_site_weather.py`](https://github.com/AidanJMeyers/south-texas-aq-pipeline/blob/main/pipeline/step_02b_ingest_tceq_site_weather.py)
in the upstream pipeline. DDL: [`sql/site_weather_hourly.sql`](https://github.com/AidanJMeyers/south-texas-aq-pipeline/blob/main/pipeline/sql/site_weather_hourly.sql).

## 4. Parameter reference (57 AQS codes)

`aq_coastal_bend.parameter_reference` mirrors the upstream table —
57 AQS parameter codes with `chemical_family`, `pollutant_group`,
`default_units`, `naaqs_regulated`, `is_hap` flags. Source: EPA AQS
official code tables.

## 5. Sites intentionally excluded

The upstream pipeline drops 6 AQSIDs before ingest (4 TSP-only Bexar
CPS sites + Von Ormy + Williams Park). Coastal Bend inherits these
exclusions — none of them are in Coastal Bend counties anyway except
Williams Park (Nueces), which appears in the site_registry as
`data_status = 'disabled'` for historical completeness but has zero
measurement data.

## 6. Data freshness

| Source | Last refresh | Cadence |
|---|---|---|
| TCEQ TAMIS (all Coastal Bend files) | 2026-05-21 | Annual bulk pull |
| OpenWeather + Solcast | 2025-12 | Annual bulk pull |

## 7. What's not from TCEQ that we'd want later

Deferred to future work (see [10 Timeline](./10_project_timeline.md)):

- **Hospitalization / ER data** — INMIS Focus or TX HCUP, purchasable via
  a small internal grant (~$300 for Coastal Bend counties).
- **TCEQ Annual Network Plans** — 11 PDFs (2015–2025) documenting
  monitor changes, method updates, and network additions. Needed to
  confirm the method-code semantics in
  [05 Method-code reference](./05_method_codes_reference.md).
- **VOCs pre-2025** — the current TAMIS pull only has 2025 VOC data.
  A targeted retro-pull is needed if pre-2025 VOC trend work is in
  scope.
