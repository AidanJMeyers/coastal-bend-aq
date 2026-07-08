# 05 — Method-code Reference & Timelines

> **Why this page exists.** Cross-year comparisons only make scientific
> sense if the underlying instruments are comparable. Method codes tell
> you which physical measurement approach TCEQ used at each site in
> each year. This page catalogs every method-code change in the
> `aq_coastal_bend.*` dataset so downstream analyses can control for
> instrument changes explicitly.
>
> Derived from the [2026-07-08 meeting](./index.md#team-assignments-from-2026-07-08-meeting)
> discussion about method codes 141 vs 209 vs 639 and what those
> mean for machine-learning models over 10-year periods.

## The problem in one paragraph

TCEQ's air monitoring network migrates instrumentation on rolling
schedules — old filter-based samplers get replaced by continuous
BAM/TEOM/FEM instruments, sensors get upgraded, and the AQS method code
associated with each measurement changes. A 10-year analysis that ignores
these transitions can spuriously attribute an instrument-baseline shift
to a real pollution trend. This page documents every observed method
change in the 8-site Coastal Bend dataset so we can either (a) exclude
mixed-method years from cross-year models, or (b) explicitly model the
instrument change as a covariate.

## Method-code catalog (Coastal Bend only)

The 8 sites in `aq_coastal_bend.pollutant_hourly` use **9 distinct
method codes** across the 2015–2025 study period. The
[full EPA AQS method-code list](https://aqs.epa.gov/aqsweb/documents/codetables/methods.html)
is the authoritative reference for every AQS method code.

| Code | Parameter | Sampling / measurement principle | Sampling duration |
|---:|---|---|---|
| `87` | Ozone (44201) | Ultraviolet photometry | Continuous 1-hr |
| `92` | SO₂ (42401) | Fluorescence (older reference method) | Continuous 1-hr |
| `100` | SO₂ (42401) | Pulsed fluorescence — TECO/API monitor | Continuous 1-hr |
| `128` | VOCs (43xxx / 45xxx) | AutoGC (automated gas chromatography) | 1-hr |
| `141` | PM10 (81102) | Manual filter-based FRM (24hr integrated) | 1-in-6 day filter |
| `209` | PM2.5 (88101 / 88502) | Continuous BAM (Met One, β-attenuation) | Continuous 1-hr |
| `638` | PM2.5 (88502) | Newer BAM revision (Met One 1020) | Continuous 1-hr |
| `639` | PM10 (81102) | Continuous BAM PM10 (Met One 1020) | Continuous 1-hr |
| `702` | PM2.5 (88502) | Continuous FEM (TEOM 1400ab / 1405-F) | Continuous 1-hr |

> ⚠ Method-code descriptions above are best-effort assignments based on
> TCEQ's Annual Network Plan reports and the EPA AQS Manual. When each
> pollutant lead confirms these against TCEQ documentation, update the
> per-pollutant sections in [pollutants/](./pollutants/pm25.md).

## Per-site, per-pollutant method-code timeline

Each row below shows the method code observed at that site in each year.
Cells with multiple codes (`, `-separated) indicate a mid-year transition
— those are the flag years for cross-year comparability audits.

### Ozone (44201) — steady across the study period

| Site | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| CC West_0025 | 87 | 87 | 87 | 87 | 87 | 87 | 87 | 87 | 87 | 87 | 87 |
| CC Tuloso_0026 | 87 | 87 | 87 | 87 | 87 | 87 | 87 | 87 | 87 | 87 | 87 |

**Verdict:** Ozone measurements are **fully comparable across all 11
years at both Coastal Bend ozone sites.** No method transitions.

### SO₂ (42401) — mostly steady, one site retired mid-2017

| Site | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| CC West_0025 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| CC Tuloso_0026 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| CC Dona Park_0032 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| CC Holly_0034 | **92** | **92** | **92** | — | — | — | — | — | — | — | — |

**Verdict:** Methods `100` (pulsed-fluorescence) SO₂ data is
comparable across 3 sites, all 11 years. CC Holly used a different
reference method (`92`) 2015-2017 before going offline for SO₂.

### PM2.5 — several transitions, requires care

| Site | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Kingsville_0314 | 702 | 702 | 702 | **209, 702** | 209 | 209 | 209 | 209 | 209 | 209 | 209 |
| CC Dona Park_0032 | — | — | — | 209 | 209 | 209 | 209 | 209 | 209 | 209 | 209 |
| CC Holly_0034 | 702 | 702 | 702 | 702 | 702 | 702 | 702 | **209, 702** | 209 | **209, 638** | 638 |

⚠ **Kingsville switched TEOM (702) → BAM (209) in 2018** — 2018 is a
mixed-method year, exclude or specifically handle in trend analyses.

⚠ **CC Holly PM2.5 has TWO transitions:** TEOM → BAM (2022) and then BAM
generation update (209 → 638) in 2024. Both 2022 and 2024 are mixed-method
years.

⚠ **CC Dona Park PM2.5 dataset starts in 2018** (method 209 from day
one). Pre-2018 comparisons vs. this site are impossible.

### PM10 — the fundamental discontinuity

| Site | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| CC Holly_0034 | **141** | **141** | **141** | **141** | ⚫ | ⚫ | ⚫ | ⚫ | ⚫ | **639** | **639** |

⚠⚠⚠ **This is the single most important instrumentation change in the
Coastal Bend dataset.**

- **2015–2018:** Method 141 = manual FRM filter, 1-in-6 day sampling
  (~61 24-hour integrated samples per year).
- **2019–2023:** No PM10 monitoring at all in the Coastal Bend.
- **2024–2025:** Method 639 = continuous BAM (Met One 1020) reporting
  hourly, ~8,000+ hourly rows per year.

The pre-2019 and post-2024 datasets are **fundamentally different
sampling paradigms**. Direct comparison of pre-2019 24hr integrated
means with post-2024 hourly BAM values will bias the analysis. Any
PM10 trend paper needs to explicitly model this transition (or restrict
scope to 2024+).

### VOCs — single method, 2025-only

| Site | Cadence | Method |
|---|---|:---:|
| CC Palm_0083 | 1hr AutoGC | 128 |
| CC Hillcrest_0029 | 24hr AutoGC | 128 |
| CC Dona Park_0032 | 24hr AutoGC | 128 |
| CC Holly_0034 | 24hr AutoGC | 128 |

Method 128 is consistent across all VOC-measuring sites in the
Coastal Bend. Because all VOC data is 2025-only in the current pull,
there is no cross-year method comparison problem — the trade-off is
that there is no historical trend to analyze either.

## Implications for machine-learning models (from the 2026-07-08 meeting)

Aidan's meeting-call framing was:

> When we're doing something as sensitive as machine learning, [method
> changes] could absolutely change how it's going and could absolutely
> tweak the prediction.

Concrete recommendations, applied to the Coastal Bend dataset:

1. **Ozone models** — no method transition concern. Train on the full
   2015–2025 window at CC West and CC Tuloso.

2. **SO₂ models** — restrict to method 100 sites (West, Tuloso, Dona
   Park). Exclude CC Holly SO₂ entirely (different method + short data
   period).

3. **PM2.5 models** —
   - Option A: **Train on method 209 only** (BAM). Kingsville from 2018,
     CC Dona Park from 2018, CC Holly from 2023. Loses ~3 years but
     methodologically clean.
   - Option B: **Train on the full dataset but include `method_code` as
     a categorical covariate.** More rows, but requires the model to
     "learn" the method offset.
   - Option C: **Train two models** — 702 (TEOM era, 2015-2021) and
     209/638 (BAM era, 2018+) — and compare their meteorology response
     curves for physical consistency.

4. **PM10 models** — restrict to 2024+ (method 639, continuous) or
   restrict to 2015-2018 (method 141, filter). **Do not combine.**
   The dataset does not have enough data to fit a temporal machine-learning
   model spanning both eras.

5. **VOCs** — 2025-only. Fit intra-year models. Not enough time depth
   for trend work yet.

## How to re-query these tables

```sql
-- Method code timeline for any site
SELECT aqsid, site_name, pollutant_group,
       EXTRACT(year FROM date_local::date)::int AS yr,
       method_code,
       COUNT(*) AS n_rows
FROM aq_coastal_bend.pollutant_hourly
WHERE aqsid = '483550034'   -- CC Holly
GROUP BY aqsid, site_name, pollutant_group, yr, method_code
ORDER BY yr, method_code;

-- Every mixed-method (site, pollutant, year) combination
SELECT aqsid, site_name, pollutant_group,
       EXTRACT(year FROM date_local::date)::int AS yr,
       COUNT(DISTINCT method_code) AS n_methods,
       string_agg(DISTINCT method_code::text, ',' ORDER BY method_code::text) AS methods
FROM aq_coastal_bend.pollutant_hourly
GROUP BY aqsid, site_name, pollutant_group, yr
HAVING COUNT(DISTINCT method_code) > 1
ORDER BY aqsid, pollutant_group, yr;
```

## Open questions (for team follow-up)

- [ ] **Confirm method-code semantics against TCEQ Annual Network Plans**
      2015–2025 (11 PDFs from tceq.texas.gov). Aidan, Manasa, Jasmine
      to split by pollutant.
- [ ] **Contact Delaney (TCEQ)** for guidance on cross-method comparability
      per the 2026-07-08 meeting discussion.
- [ ] **Extract the exact instrument model** (Met One BAM 1020 vs 1022,
      TEOM 1400ab vs 1405-F, etc.) per site-year — this is finer-grained
      than method code and matters for BAM/TEOM cross-comparisons.
