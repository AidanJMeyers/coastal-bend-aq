# 07 — Methodology

Detailed methodology inherits from the
[upstream south-texas-aq v0.4.0 methodology](https://aidanjmeyers.github.io/south-texas-aq-pipeline/05_methodology/).
This page documents only the **Coastal Bend–specific** decisions.

## 1. Unit normalization

Same as upstream: TCEQ ozone (ppb) → EPA canonical (ppm) via × 0.001 at
ingest in `step_01b_ingest_tceq_raw.py`. All other parameters are already
in the EPA canonical unit. Applied to 1,144,266 ozone rows across the
broader dataset; **~189,000 rows for the Coastal Bend subset** (both
sites × ~11 years × ~8,600 hours).

## 2. NAAQS computation

Same as upstream — per 40 CFR Part 50, computed in
`pipeline/step_03_compute_naaqs.py`. See
[Data availability §5](./04_data_availability.md#5-naaqs-design-values-2023--2024)
for the Coastal Bend results.

## 3. Method-code stratification (**Coastal Bend priority**)

The Coastal Bend dataset has three critical method transitions that
downstream models must handle:

1. **PM10 at CC Holly**: filter method 141 (2015-2018) → 5-year gap →
   continuous BAM 639 (2024-2025). **Do not model as a continuous
   series.**
2. **PM2.5 at Kingsville**: TEOM 702 (2015-2017) → BAM 209 (2018+).
   Treat 2018 as a mixed-method transition year.
3. **PM2.5 at CC Holly**: 702 (2015-2021) → 209 (2022+) → 638 (2024+).
   Two transitions.

Full timelines with per-year method codes in
[05 Method-code reference](./05_method_codes_reference.md).

## 4. Spatial interpolation (deferred)

With only 8 anchor points concentrated in Nueces (7) + Kleberg (1),
spatial kriging across the full 11-county Coastal Bend region is **not
statistically defensible** in v0.1.0. Options for future work:

- Import EPA-network sites from adjacent regions (bordering counties in
  Bexar, Cameron, Hidalgo) as boundary anchors.
- Model on the metro Corpus Christi scale only (Nueces + immediate
  neighbors) rather than the full 11-county region.
- Focus first on temporal ML at each site, defer spatial extension.

Dr. Jin's advice from the meeting: *"Get as many variables as you can."*
For temporal models this is fine; for spatial models we need more sites,
not more variables at existing sites.

## 5. Meteorological covariates

**Same weather data as upstream** — no changes. Jasmine's note from the
meeting: Coastal Bend meteorology is dominated by:

- **Persistent sea breeze** (year-round; stronger at night in summer)
- **Winter northerlies** (occasional cold-front intrusions)
- **ENSO cycle** (La Niña dry / El Niño wet) driving multi-year drought
  patterns
- **Precipitation is not a routine daily driver** — Coastal Bend is
  chronically water-stressed

This uniformity means meteorological covariates should be reasonably
transferable across the 7 Nueces sites, but Kingsville (Kleberg) is
~65 km south and inland — expect different micrometeorology.

## 6. Data-quality flags

Inherited from upstream:
- 75% hourly completeness → `valid_day` in `pollutant_daily`
- 18-of-24-hour rule for PM daily means
- ≥6 hours for 8-hr ozone rolling averages

## 7. Imputation

**Deferred pending Coastal Bend method-code audit.** From the meeting:
> "The other thing that's happening within this 10 year period is the
> sensors are getting replaced. Can we use the old sensor data still?"

Imputation across a method transition (e.g. filling 2019-2023 PM10 gap
from 2015-2018 filter data and 2024-2025 BAM data) is not defensible.
Any imputation strategy needs to be method-aware — see
[05 Method-code reference §Implications for ML models](./05_method_codes_reference.md#implications-for-machine-learning-models-from-the-2026-07-08-meeting).
