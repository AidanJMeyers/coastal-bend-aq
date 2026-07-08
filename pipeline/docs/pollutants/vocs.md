# VOCs (Volatile Organic Compounds) — Deep Dive

**Lead:** Jasmine Trevino
**Target:** filled draft by 2026-07-15
**Coastal Bend coverage:** 4 sites, 46–48 chemicals, **2025-only in current pull ⚠**

## 1. Chemistry

*(TO FILL)*: VOC family taxonomy — paraffins (alkanes, C₂-C₁₁),
cycloalkanes, olefins (alkenes, dienes, alkynes), aromatics (BTEX +).
Volatility spectrum, reactivity in OH/O₃ chemistry, secondary organic
aerosol (SOA) contribution. Biogenic (isoprene) vs anthropogenic
(refining, transport) sources.

## 2. Instrumentation

**Single method code across all 4 sites: 128 (AutoGC, automated gas
chromatography).**

Two cadences:
- **1-hour AutoGC:** CC Palm_0083 (the workhorse — 336,922 rows in 2025)
- **24-hour AutoGC:** CC Hillcrest, CC Dona Park, CC Holly (~2,400 rows each)

*(TO FILL)*: Instrument model (Markes / Agilent), column, canister
protocol, detector (FID/MS), MDL, calibration standards used.

## 3. Parameter codes (57 in the reference, 46-48 measured per site)

The Coastal Bend VOC sites cover **10 HAPs** (Hazardous Air Pollutants
under CAA §112(b)):

| Code | Name | Family | HAP? |
|---:|---|---|:---:|
| 45201 | Benzene | Aromatic | ⚠ |
| 45202 | Toluene | Aromatic | ⚠ |
| 45203 | Ethylbenzene | Aromatic | ⚠ |
| 45109 | m/p-Xylene | Aromatic | ⚠ |
| 45204 | o-Xylene | Aromatic | ⚠ |
| 45210 | Isopropylbenzene (cumene) | Aromatic | ⚠ |
| 45220 | Styrene | Aromatic | ⚠ |
| 43218 | 1,3-Butadiene | Olefin | ⚠ |
| 43231 | n-Hexane | Paraffin | ⚠ |
| 43250 | 2,2,4-Trimethylpentane (isooctane) | Paraffin | ⚠ |

Full parameter reference in `aq_coastal_bend.parameter_reference`.

## 4. NAAQS

**None.** VOCs are regulated at the source-emission level (NSPS/NESHAP)
and via their contribution to ozone (as precursors), not as ambient
concentrations. However, TCEQ maintains **Air Monitoring Comparison Values
(AMCVs)** — short-term and long-term thresholds for individual VOCs used
in permitting and community risk assessment.

*(TO FILL)*: For each of the 10 HAPs, list the TCEQ short-term ESL and
long-term AMCV. Benzene is the priority (known human carcinogen).

## 5. Coastal Bend data snapshot (2025)

| Site | Cadence | Rows | Chemicals | Date range |
|---|---|---:|---:|---|
| CC Palm_0083 | 1hr | 336,922 | 46 | 2025-01-01 → 2025-12-31 |
| CC Hillcrest_0029 | 24hr | 2,352 | 48 | 2025-01-01 → 2025-10-28 |
| CC Dona Park_0032 | 24hr | 2,400 | 48 | 2025-01-01 → 2025-10-28 |
| CC Holly_0034 | 24hr | 2,400 | 48 | 2025-01-07 → 2025-10-28 |

⚠ **The dataset has no pre-2025 VOCs.** Consider a TAMIS retro-pull if
historical trend analysis is in scope.

## 6. Meteorological drivers

*(TO FILL, Jasmine)*:
- Wind direction (refinery corridor vs residential — Dona Park & Hillcrest
  are near industry; Palm is a background/mixed site)
- Temperature (evaporative emissions — gasoline VOCs peak in summer)
- Boundary-layer height (nocturnal accumulation)
- Photochemistry (afternoon consumption of reactive VOCs → ozone)
- Wind-rose analysis per site (esp. for Benzene and 1,3-Butadiene HAP
  source apportionment)

## 7. Health literature

*(TO FILL)*: For the 10 HAPs specifically:
- Benzene: IARC Group 1 human carcinogen, ALL leukemia link
- 1,3-Butadiene: probable human carcinogen, refining corridor exposure studies
- Toluene / Xylenes: neurologic + developmental
- Community-scale exposure studies in fenceline neighborhoods

Corpus Christi refinery corridor has been the subject of prior TCEQ
Community Air Monitoring Project reports — cite those.

## 8. Analysis strategy (2025-only pull)

- **Intra-year models only** — cannot do multi-year trends.
- **Diel + weekly cycles** — should be visible even in 12 months.
- **Wind-rose × HAP concentration** — identify source-apportionment story
  for Dona Park vs Palm.
- **1hr vs 24hr comparison** — Palm hourly gives fine-grained detection
  of transient plumes; 24hr AutoGC at 3 sites gives spatial context.

## 9. If we can retro-pull pre-2025

Priorities in order:
1. Palm (1hr) 2016+ — this was the high-density VOC site in Nueces per
   the upstream south-texas-aq
2. Hillcrest (24hr) 2016+ — the long-running community site
3. Everything else pre-2025 as available

Effort: manual TAMIS downloads per site per year. Split across the team
during the July 15 sync if we decide this is in scope.

## 10. Open questions

- [ ] Retro-pull decision (see §9)
- [ ] Instrument model + AutoGC column configuration per site — Delaney
- [ ] Any TCEQ Community Air Monitoring reports for the Ship Channel
      corridor that can seed the literature review
- [ ] Ozone precursor modeling — can we use the VOC + weather data to
      predict ozone at CC West/Tuloso where NOx isn't measured?
