# SO₂ — Sulfur Dioxide

> **Lead:** Jasmine Trevino
> **Source deck:** [`briefings/2026-07-01_JT_SO2_VOC_briefing.pptx`](../briefings/2026-07-01_JT_SO2_VOC_briefing.pptx) (slides 2–10)
> **Coastal Bend data:** 3 active sites (CC West, CC Tuloso, CC Dona Park); ~166k hourly rows across 2015–2025; CC Holly offline mid-2017
> **Neon:** `aq_coastal_bend.pollutant_hourly WHERE pollutant_group='SO2'`

Sulfur dioxide is the most industrially-mediated criteria pollutant in
the Coastal Bend — refinery emissions and marine bunker fuel drive
short-term exceedance events, and the Ship Channel corridor is
climatologically downwind of the refinery row for the prevailing
SE Gulf wind.

## 1. Definition

**SO₂** is a colorless gas with a strong, irritating (pungent,
"burnt-match") odor. Odor threshold ~1 ppm. At elevated ambient
concentrations it irritates the upper airways and bronchi.

**Primary pollutant** — emitted directly from sources — in contrast to
[ozone](./ozone.md) which is secondary.

## 2. Sources

**Anthropogenic:**

- **Fossil fuel combustion at power plants and industrial facilities** —
  historically the dominant national source; largely mitigated by
  post-2000 flue-gas desulfurization (FGD "scrubber") retrofits.
- **Refineries** — sulfur recovery unit (SRU / Claus) losses, tail-gas
  incineration, flaring. Corpus Christi Ship Channel refineries are
  the dominant local source.
- **Marine bunker fuel combustion** — high-sulfur bunker fuel at the
  Port of Corpus Christi (large crude-export port); IMO 2020 global
  sulfur cap has reduced but not eliminated this contribution.
- **Metal smelting, pulp & paper, cement kilns** — secondary industrial.
- **Diesel combustion** — small contribution; ULSD (ultra-low-sulfur
  diesel, 15 ppm cap since 2006 on-road) essentially eliminated
  diesel SO2 in on-road applications.

**Natural:**

- **Volcanic emissions** (globally significant, negligible in South Texas).
- **DMS (dimethyl sulfide)** from marine phytoplankton — oxidizes to
  SO2 and downstream to sulfate aerosol. Contributes to Coastal Bend
  background sulfate aerosol (see [PM2.5 deep-dive §1](./pm25.md)).

## 3. Health effects

- **Respiratory (acute)** — bronchoconstriction, wheezing, asthma
  exacerbation at short-term exposures (5–30 min inhalation studies
  in asthmatics show FEV1 decrement at ~200 ppb).
- **Long-term** — associations with respiratory mortality, lung
  function decrements. Evidence weaker than for PM2.5 or ozone in
  ambient-air studies because SO2 has declined substantially in
  post-scrubber-era US.
- **Cardiovascular** — suggestive but less consistent than PM2.5.

Reference: [EPA Integrated Science Assessment for Sulfur Oxides — Health Criteria](https://www.epa.gov/isa/integrated-science-assessment-isa-sulfur-oxides-health-criteria).

## 4. NAAQS

**Current primary standard (2010):** **75 ppb 1-hour** —
[75 FR 35520](https://www.federalregister.gov/documents/2010/06/22/2010-13947/primary-national-ambient-air-quality-standard-for-sulfur-dioxide).
Form: 3-year average of the annual 99th percentile of daily maximum
1-hour concentrations must be ≤ 75 ppb.

**Secondary standard (revised 2024-12-27):**
[89 FR 105554](https://www.federalregister.gov/documents/2024/12/27/2024-29463/review-of-the-secondary-national-ambient-air-quality-standards-for-oxides-of-nitrogen-oxides-of).
Revised alongside NOx and PM to protect welfare (crops, ecosystems);
Coastal Bend rarely hits the secondary standard's threshold.

**Historical:**

- 1971: 24-hr 140 ppb + annual 30 ppb (primary); 3-hr 500 ppb (secondary)
- 2010: **replaced the 24-hr and annual with the 1-hr 75 ppb form** —
  because short-duration SO2 peaks near industrial sources drive the
  respiratory effect

**WHO 2021 guideline:** [WHO Global Air Quality Guidelines](https://www.who.int/publications/i/item/9789240034228)
40 µg/m³ (~15 ppb) 24-hr — much stricter than US NAAQS.

## 5. Measurement — UV Fluorescence (UVF)

**Dominant FEM instrument in TCEQ + US networks:**

- **Thermo Scientific TEI 43i** ([product page](https://www.thermofisher.com/order/catalog/product/43iSO2))
  — pulsed UV fluorescence.
- Teledyne API T100 series.
- Similar UVF-family analyzers.

**Principle** ([40 CFR Part 50 Appendix A-1](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20A-1%20to%20Part%2050)):

1. Ambient air pulled through a hydrocarbon scrubber (removes
   fluorescing interferents).
2. Sample gas exposed to pulsed UV light (~214 nm) in the reaction cell.
3. SO2 absorbs UV → excited state → fluoresces at 240–420 nm.
4. Photomultiplier tube (PMT) measures fluorescence intensity;
   concentration derived by Beer-Lambert.
5. Continuous, hourly-reporting FEM analyzer.

**Federal Reference Method** ([40 CFR Part 50 App. A-1](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20A-1%20to%20Part%2050)):
UV fluorescence per the reference measurement principle. Most
UVF-family instruments carry FEM designation ([Part 53](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-53)).

**Continuous monitoring:** hourly reporting to AQS is the norm —
provides near-real-time coverage of short-term peaks that the 1-hr
NAAQS form measures.

## 6. Parameter + method codes

| Code | Meaning | Notes |
|---|---|---|
| **42401** | Sulfur dioxide (SO₂) — mass concentration | Our data; units = ppb |

| Method | Description | Coastal Bend presence |
|---|---|---|
| **100** | Pulsed UV Fluorescence (UVF) — Thermo TEI 43i family | Dominant in our data |
| 92 | UVF variant (older Thermo model / calibration convention) | Historic |
| 60 | Pararosaniline (legacy wet-chemistry) | Not in our data |

**FRM/FEM comparability:** for SO2, TCEQ instruments align with the
EPA reference principle (both use UVF), so there is **no cross-source
harmonization issue analogous to the ozone ppb/ppm gotcha**. Numbers
are directly comparable.

**Query the disambiguating audit:**

```sql
SELECT aqsid, site_name, method_code,
       COUNT(*) AS n_rows,
       MIN(date_local) AS first, MAX(date_local) AS last
FROM   aq_coastal_bend.pollutant_hourly
WHERE  pollutant_group = 'SO2'
GROUP  BY aqsid, site_name, method_code
ORDER  BY aqsid, method_code;
```

## 7. TCEQ vs EPA

**No unit trap.** Both report SO2 in ppb — TCEQ CAMS reports to TAMIS,
which pushes certified data to EPA AQS. Our pipeline holds TCEQ
TAMIS as the sole source.

**Certification lag:** TCEQ near-real-time data may differ slightly
from EPA AQS certified data because certification (~months of QA)
occasionally results in small revisions. Use certified data for
regulatory-comparable analyses.

## 8. Sensor evolution

TCEQ SO2 network has been stable on UVF pulsed-fluorescence
technology (Thermo TEI 43i family) since the mid-2000s. Individual
instrument replacements happen periodically but the measurement
principle has not changed within our study window — **no fundamental
comparability discontinuity** at the pollutant level (contrast with
PM10 CC Holly method 141 → 639 transition, see
[PM10 deep-dive §8](./pm10.md)).

Refer to [TCEQ Annual Monitoring Network Plans](https://www.tceq.texas.gov/airquality/monops/ambient_monitoring)
(2018–2024) for site-by-site instrument model history.

## 9. Weather relationships

| Variable | Direction | Mechanism |
|---|---|---|
| **Wind direction (critical)** | ± source attribution | ESE from Ship Channel refineries drives peaks at CC Dona Park + CC Holly + downwind residential |
| **Wind speed** | − | Dilutes plumes; peak concentrations under low-wind stagnation |
| **Boundary layer height** | − | Shallow nocturnal BL traps refinery + port emissions |
| **Temperature** | ± indirect | Affects OH oxidation → sulfate → removes SO2 from atmosphere over hours (competing with mixing losses) |
| **Humidity** | − | Aqueous-phase oxidation of SO2 to sulfate accelerates in humid conditions — a sink for gas-phase SO2, source for PM2.5 sulfate |
| **Precipitation** | − (strong) | Wet deposition scavenges both SO2(g) and sulfate aerosol |

**Coastal Bend feature:** the prevailing SE Gulf wind pushes Ship
Channel refinery emissions **inland toward CC Hillcrest / Dona Park
residential neighborhoods** — this is the geographic pattern that
makes SO2 a health-justice issue here even under generally low
regional means.

## 10. Coastal Bend SO2 — what we have

| AQSID | Site | Rows 2015–2025 | Notes |
|---|---|---:|---|
| 483550025 | Corpus Christi West | ~92k | Continuous 2015–present |
| 483550026 | Corpus Christi Tuloso | ~89k | Continuous |
| 483550032 | Corpus Christi Dona Park | ~76k | Continuous |
| 483550034 | Corpus Christi Holly | ~29k | **Offline mid-2017**; 2015-01 → 2017-05 only |

**2024 NAAQS results** (query `aq_coastal_bend.naaqs_design_values`):

Expected 3-yr 99th-percentile 1-hr design values well below 75 ppb
at all four sites in 2022–2024 rolling window — Coastal Bend is
generally in attainment for SO2 despite the industrial footprint.
Confirm by query on demand for freshest numbers.

## 11. Open questions / next steps

- [ ] **CC Holly offline (2017-05) — root cause?** Instrument
      retirement, budget, TCEQ network optimization? Document.
- [ ] **Wind-rose analysis at CC Dona Park + CC Hillcrest** — CBPF
      to characterize the fraction of high-SO2 hours that originate
      from the Ship Channel bearing (leverages Jasmine's meteorology
      expertise).
- [ ] **Ship Channel refinery emission inventory join** — TCEQ Point
      Source Emissions Inventory ([TSEI](https://www.tceq.texas.gov/airquality/point-source-ei))
      publishes annual refinery SO2 totals; correlate with ambient
      trends at receptor sites.
- [ ] **IMO 2020 impact on port emissions** — the global 0.5% marine
      fuel sulfur cap took effect 2020-01-01; look for a step change
      in Coastal Bend SO2 attributable to bunker fuel changes.
- [ ] **DMS marine background estimation** — for source apportionment,
      quantify the DMS contribution to background sulfate (affects
      PM2.5 story too).

## 12. References

**Regulatory + methods**

- [40 CFR Part 50, Appendix A-1 — SO2 FRM (UVF)](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20A-1%20to%20Part%2050)
- [40 CFR Part 53 — FEM designation criteria](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-53)
- [75 FR 35520 (2010) — Primary SO2 NAAQS (1-hr 75 ppb)](https://www.federalregister.gov/documents/2010/06/22/2010-13947/primary-national-ambient-air-quality-standard-for-sulfur-dioxide)
- [89 FR 105554 (2024) — Secondary NAAQS review for NOx/SOx/PM](https://www.federalregister.gov/documents/2024/12/27/2024-29463/review-of-the-secondary-national-ambient-air-quality-standards-for-oxides-of-nitrogen-oxides-of)
- [EPA SO2 pollution main page](https://www.epa.gov/so2-pollution)
- [EPA ISA for Sulfur Oxides — Health Criteria](https://www.epa.gov/isa/integrated-science-assessment-isa-sulfur-oxides-health-criteria)
- [EPA AQS Method Code Table (all methods)](https://aqs.epa.gov/aqsweb/documents/codetables/methods_all.html)
- [EPA AQS parameter codes](https://aqs.epa.gov/aqsweb/documents/codetables/parameters.html)
- [EPA AMTIC](https://www.epa.gov/amtic)
- [EPA Criteria Air Pollutants overview](https://www.epa.gov/criteria-air-pollutants)
- [WHO Global AQ Guidelines (2021)](https://www.who.int/publications/i/item/9789240034228)

**Instrument documentation**

- [Thermo Scientific 43i pulsed UV fluorescence SO2 analyzer](https://www.thermofisher.com/order/catalog/product/43iSO2)

**TCEQ**

- [TCEQ Air Monitoring Operations](https://www.tceq.texas.gov/airquality/monops)
- [TCEQ Annual Monitoring Network Plans](https://www.tceq.texas.gov/airquality/monops/ambient_monitoring)
- [TCEQ Point Source Emissions Inventory](https://www.tceq.texas.gov/airquality/point-source-ei)

**Clean Air Act**

- [Clean Air Act §109 — NAAQS statutory basis](https://www.law.cornell.edu/uscode/text/42/7409)
