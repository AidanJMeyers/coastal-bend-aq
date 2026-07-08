# 02 — Data Sources

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
483550032.txt                             Corpus Christi Dona Park
483550034.txt                             Corpus Christi Holly
483550083.txt                             Corpus Christi Palm
Cameron_VOCs24hrAutoGC.txt                (not Coastal Bend — Cameron)
Nueces_VOCS1hrAutoGC.txt                  → CC Palm 1hr rows
Nueces_VOCS24hrAutoGC.txt                 → Hillcrest/Dona Park/Holly 24hr
```

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

## 3. OpenWeather + Solcast (weather covariates)

Unchanged from the upstream south-texas-aq pipeline. The 15-station
network covers the Coastal Bend with ~4 stations directly inside Nueces +
Kleberg. See the
[upstream Data Sources §3](https://aidanjmeyers.github.io/south-texas-aq-pipeline/02_data_sources/#3-openweather--solcast-historical-hourly-observations)
for the full sub-source / license / retrieval detail.

For the Coastal Bend fork, `aq_coastal_bend.weather_hourly` is filtered
to `county_name IN ('Nueces', 'Kleberg')` = 197,124 rows (~4 stations ×
~11 years × ~8,760 hours).

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
