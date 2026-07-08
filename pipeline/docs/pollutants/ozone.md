# Ozone (O₃) — Deep Dive

**Lead:** Manasseh Kuchavaram
**Target:** filled draft by 2026-07-15
**Coastal Bend coverage:** 2 sites, 22 site-years (clean data)

## 1. Chemistry

*(TO FILL)* — Tropospheric O₃ as a secondary photochemical pollutant.
NOx + VOCs + sunlight → O₃. Winter vs summer regimes. Ozone titration by
fresh NO. Sources of Coastal Bend precursor emissions (Port of Corpus
Christi refining corridor, Bay area traffic, marine background).

## 2. Instrumentation

**Coastal Bend method code: 87 (UV photometry) at both sites for all
11 years.** No transitions.

*(TO FILL)*: Instrument model at each site (2B Tech 205? TEI 49i?),
calibration schedule, MDL/LOD, TCEQ QA protocol.

## 3. Parameter codes

| Code | Meaning | Native unit | Canonical unit |
|---:|---|---|---|
| **44201** | Ozone (the only code we see) | ppb (TCEQ) | ppm (× 0.001 at ingest) |

## 4. NAAQS

- **2015 standard: 0.070 ppm 8-hr rolling average** — form is the annual
  4th-highest daily-max 8-hr, averaged over the most recent 3 years.
- History: 1979 = 0.12 ppm 1-hr; 1997 = 0.08 ppm 8-hr; 2008 = 0.075 ppm
  8-hr; 2015 = 0.070 ppm 8-hr (current).

*(TO FILL)*: EPA's current review + likely revision path.

## 5. Method-code timeline

See [05 Method-code reference §Ozone](../05_method_codes_reference.md#ozone-44201--steady-across-the-study-period).
**No transitions — full-window comparability.**

## 6. Coastal Bend design values

| Year | CC West_0025 | CC Tuloso_0026 | Exceeds NAAQS? |
|---:|---:|---:|:---:|
| 2023 | 0.0640 ppm | 0.0659 ppm | No |
| 2024 | 0.0664 ppm | 0.0638 ppm | No |

*(TO FILL)*: 2015–2022 series; interannual trend; comparison to Bexar
sites (which do exceed) and to prior Corpus Christi literature.

## 7. Meteorological drivers

*(TO FILL)*:
- Diurnal — afternoon peak from photolysis
- Seasonal — March-June peak in South Texas subtropical climate
- Synoptic — high-pressure stagnation events
- Coastal-specific — sea breeze recirculation, Corpus Christi Bay
  ozone plume observations (cite prior TCEQ papers)
- Wind rose analysis per site (Jasmine's meteorology expertise)

## 8. Health literature (3-5 recent reviews)

*(TO FILL)*: Recent systematic reviews / meta-analyses on:
- Short-term ozone × respiratory outcomes (asthma exacerbations, ER visits)
- Long-term ozone × chronic respiratory / cardiovascular outcomes
- Vulnerable populations (children, elderly, outdoor workers)

## 9. ML modeling considerations

- Method-code homogeneity → **full 22 site-years usable as one training set.**
- Temporal features: hour-of-day, day-of-year, day-of-week
- Meteorology: temperature, solar radiation, wind (sea-breeze
  identification), boundary-layer height (if inferrable from
  humidity/temp diurnal), NOx and VOCs are the biggest missing
  predictors (**both are unmeasured in the Coastal Bend** — biggest
  known limitation)
- 2 sites only — limited spatial validation; hold-out by year rather
  than by site

## 10. Open questions

- [ ] Instrument model per site — need Delaney (TCEQ) confirmation
- [ ] Any hurricane-year outliers (Harvey 2017, Beryl 2024) to note
- [ ] Cross-check with EPA AQS 3-year design values published for Corpus
      Christi MSA
