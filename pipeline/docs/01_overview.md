# 01 — Project Overview

## Mission

Characterize ambient air quality across the **Coastal Bend region of
South Texas** (11 counties, 2015–2025), identify weather-driven
pollutant patterns anchored on the Corpus Christi metro, and build the
data foundation for spatial-interpolation models that extend monitored
estimates into the 9 unmonitored counties.

## Study area

11 Coastal Bend counties. **9 have no monitors.** All 8 sites in the
dataset are concentrated in Nueces (7 sites, all in the greater Corpus
Christi metro) and Kleberg (1 site, Kingsville). See
[Data availability](./04_data_availability.md) for the county-level
matrix.

| County | Population (2020) | Active AQ sites |
|---|---:|---:|
| Nueces | 353,178 | 7 |
| Kleberg | 31,040 | 1 |
| Aransas | 23,830 | 0 |
| Bee | 31,047 | 0 |
| Brooks | 7,076 | 0 |
| Duval | 9,831 | 0 |
| Jim Wells | 38,891 | 0 |
| Kenedy | 350 | 0 |
| Live Oak | 11,335 | 0 |
| Refugio | 6,703 | 0 |
| San Patricio | 68,755 | 0 |

## Pollutants measured

TCEQ is the sole data source. See [02 Data Sources](./02_data_sources.md).

| Group | Present in Coastal Bend | Sites |
|---|:---:|---|
| **Ozone** | ✅ | CC West, CC Tuloso |
| **SO₂** | ✅ | CC West, CC Tuloso, CC Dona Park, CC Holly (through 2017-05) |
| **PM2.5** | ✅ | Kingsville, CC Dona Park (2018+), CC Holly |
| **PM10** | ✅ (with 5-year gap) | CC Holly only |
| **VOCs (47 species)** | ✅ (2025-only) | CC Palm (1hr), CC Hillcrest/Dona Park/Holly (24hr) |
| **CO** | ❌ NONE | — |
| **NOx family** | ❌ NONE | — |

## Weather covariates

Hourly OpenWeather + Solcast irradiance from ~4 stations covering the
Coastal Bend. Data is directly inherited from the broader
[South Texas AQ pipeline](https://aidanjmeyers.github.io/south-texas-aq-pipeline/)
and unchanged in this fork — see
[02 Data Sources §3](./02_data_sources.md#3-openweather--solcast).

Jasmine's meeting note: **precipitation events are consistent enough in
the Coastal Bend that meteorological covariates should be predictable
across sites** (constant sea-breeze pattern; winter northerlies; La Niña
vs El Niño ENSO cycle driving multi-year drought/wet). Wind rose
analyses per site will be added under
[pollutant deep-dives](./pollutants/ozone.md#meteorological-drivers).

## Deliverables

1. **Neon `aq_coastal_bend` schema** (10 tables, ~1.3M rows, 260 MB) —
   see [08 Neon SQL access](./08_usage_neon.md).
2. **[Data availability matrix + method timelines](./04_data_availability.md)** —
   the reference document for planning any analysis.
3. **Pollutant deep-dive briefings** (7 pages, split across the team) —
   templates in [`pollutants/`](./pollutants/ozone.md).
4. **NAAQS design values** for the 2 ozone + 3 PM2.5 + 3 SO₂ + 1 PM10
   sites (see availability §5).
5. **Coastal Bend v0.1.0 pipeline** — the local build steps under
   [`pipeline/`](https://github.com/AidanJMeyers/coastal-bend-aq/tree/main/pipeline).

## Intended users

- **Melaram Lab researchers** — SQL-based analysis in Colab / R notebooks
- **Manuscript authors** — NAAQS design value tables, methodology reference
- **Spatial modelers** — kriging inputs (with the caveat that 8 sites is a
  hard interpolation problem)
- **Public health collaborators** — future ER + hospitalization × pollutant
  work (deferred until air-quality methodology is finalized — see the
  [team assignments](./11_team_assignments.md))

## Not in scope (yet)

- **Health-outcome data** — deferred until the AQ methodology (method
  codes, comparability, imputation) is locked. Aidan has a hospitalization
  data source (INMIS Focus / TX HCUP) that can be applied for through a
  College of Nursing & Health Sciences internal grant (~$300) later.
- **Spatial interpolation / kriging** — non-trivial with 8 anchor points.
  Will require substantial method work.
- **The 9 unmonitored counties** — no data to work with directly.
