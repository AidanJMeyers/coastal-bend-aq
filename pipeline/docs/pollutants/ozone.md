# Ozone (O₃) — Ground-Level

> **Lead:** Manasa Kuchavaram
> **Source deck:** [`briefings/2026-06-24_MK_Ozone.pptx`](https://github.com/AidanJMeyers/south-texas-aq-pipeline/blob/main/Pollutant.pptx) — Manasa's original briefing (currently housed in the parent south-texas-aq-pipeline repo; will be mirrored into this repo's `briefings/` folder next revision)
> **Coastal Bend data:** 2 sites (CC West 483550025, CC Tuloso 483550026); ~187k hourly rows across 2015–2025; single-instrument method 87 throughout — cleanest of any Coastal Bend pollutant
> **Neon:** `aq_coastal_bend.pollutant_hourly WHERE pollutant_group='Ozone'`

Ozone is the archetype secondary pollutant, the primary component of
photochemical smog, and the pollutant with the **cleanest** measurement
history in our Coastal Bend dataset (both active sites on the same
UV-absorption method for the entire study period).

## 1. Definition

Ground-level ozone (O₃):

- **Molecule** — triatomic allotrope of oxygen (O₃); three oxygen atoms
  in a bent, resonance-stabilized structure. Pale-blue, pungent,
  strongly oxidizing gas.
- **Same molecule, two roles.** *Stratospheric* ozone shields the
  biosphere from UV; *tropospheric (ground-level)* ozone is a harmful
  air pollutant and short-lived climate forcer.
- **Secondary pollutant** — not emitted directly in significant
  quantities; forms in the lower atmosphere from precursor emissions
  reacting under sunlight.
- **Photochemical oxidant** — the principal component of photochemical
  smog and a powerful respiratory irritant.

**Why a "criteria" pollutant?** One of the six criteria pollutants
under the [Clean Air Act §§108–109](https://www.law.cornell.edu/uscode/text/42/7409),
alongside PM, CO, SO₂, NO₂, Pb. EPA must set NAAQS using published
"criteria" documenting health and welfare effects.

## 2. Sources & formation

**Precursor-driven photochemistry:**

```
     NOₓ  (Nitrogen oxides — vehicles, power plants, industry)
      +
     VOCs (Volatile organic compounds — fuels, solvents, petrochem, biogenic)
      +
     Sunlight (UV) + Heat
      ↓
     O₃  (ground-level ozone)
```

**Key characteristics:**

- **Precursor-limited.** Production is limited by supply of NOx and
  VOCs and by sunlight intensity.
- **Chemical regimes.** Can be *NOx-limited* (rural / downwind) or
  *VOC-limited* (urban cores); this dictates which precursor to
  control.
- **Diurnal cycle.** Builds to a mid-afternoon peak; falls overnight
  as photochemistry stops and NO titrates O₃.
- **Secondary & regional.** Peaks often occur downwind of sources;
  transported background ozone adds to local production.

**Coastal Bend implication:** with 0 NOx monitors in the Coastal Bend
(see [NOx gap statement](./nox.md)), we cannot directly measure the
precursor concentration for the two ozone sites we do have (CC West,
CC Tuloso). NOx context has to come from EPA satellite data
(TROPOMI NO₂ column) or from upstream Bexar sites.

Sources: [EPA Integrated Science Assessment for Ozone (2020)](https://www.epa.gov/isa/integrated-science-assessment-isa-ozone-and-related-photochemical-oxidants);
[NRC (1991), *Rethinking the Ozone Problem in Urban and Regional Air Pollution*](https://nap.nationalacademies.org/catalog/1889/rethinking-the-ozone-problem-in-urban-and-regional-air-pollution).

## 3. Measurement — principle & instrument

### 3.1 UV Photometric Absorption

**Dominant in practice (~99% of monitors).** Ozone absorbs UV at
**254 nm**; absorbance → concentration via Beer–Lambert. Air is
measured with and without ozone (scrubbed reference) to isolate the
O₃ signal. Continuous, hourly-reporting analyzers; most regulatory O₃
monitors use this principle.

Common commercial FEM instruments: Thermo Scientific 49i, Teledyne
API T400, 2B Technologies Model 202, Ecotech Serinus 10, older
Dasibi and Bendix (legacy).

### 3.2 Gas-Phase Chemiluminescence — the Federal Reference Principle

Ozone reacts with **ethylene** (or nitric oxide) to emit light
proportional to O₃ concentration. Basis of the Federal Reference
Method in [40 CFR Part 50, Appendix D](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20D%20to%20Part%2050).
Highly specific and interference-resistant, but less common in
routine networks (UV FEMs do the day-to-day work; chemiluminescence
FRM sets the traceability standard).

### 3.3 Calibration & traceability

- Calibrations trace to a **NIST-traceable UV Standard Reference
  Photometer (SRP)**.
- Uses a defined ozone absorption cross-section for consistency
  across the network.
- Sited + operated under [40 CFR Part 58 (monitoring network requirements)](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-58).
- **Ozone "season" operation** is common; many sites report April–October
  at minimum — but both Coastal Bend ozone sites (CC West, CC Tuloso)
  report year-round in our data.

Sources: [40 CFR Part 50 App. D](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20D%20to%20Part%2050);
[40 CFR Part 58](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-58);
[EPA List of Designated Reference & Equivalent Methods](https://www.epa.gov/amtic/air-monitoring-methods-criteria-pollutants).

## 4. FRM vs FEM — one-line difference

- **FRM** = the benchmark method EPA specifies by measurement
  principle and calibration in [40 CFR Part 50 App. D](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20D%20to%20Part%2050)
  — for ozone: gas-phase chemiluminescence.
- **FEM** = an alternative method (often different principle) EPA has
  tested + certified as producing data equivalent to the FRM per
  [40 CFR Part 53](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-53)
  — for ozone: UV photometric analyzers are the predominant FEMs.

Both yield regulatory-quality data usable for NAAQS comparisons. In
ozone networks, the FRM sets the scale while UV FEMs do most day-to-day
monitoring.

## 5. Parameter + method codes

### AQS parameter code: **44201**

Ozone (O₃). Reported in **ppm** in EPA AQS canonical convention.

TCEQ TAMIS reports ozone in **ppb** — this is the one unit
harmonization our pipeline applies at ingest: **step_01b multiplies
ozone rows by 0.001 to convert TCEQ ppb → EPA ppm** before storage.

### Method codes

**Note on numeric method codes.** AQS also stores a short numeric
method code per monitor (distinguishing UV-photometric vs
chemiluminescence families). Pull the exact numeric codes and current
designations from the [EPA AQS Methods code table](https://aqs.epa.gov/aqsweb/documents/codetables/methods_all.html)
rather than assuming them — they change as instruments are approved
or retired.

| Method | Family | Our Coastal Bend presence |
|---|---|---|
| **87** | UV photometric absorption (dominant FEM) | Both sites, all years — the ONLY method in our Coastal Bend O₃ data |
| 47 | UV photometric variant (older instrument) | Historic; not in our data |
| 19 | Gas-phase chemiluminescence FRM | Reference standard; not deployed at Coastal Bend sites |

**This is our cleanest pollutant methodologically** — a single method
code across both sites for the entire 2015–2025 window means no
mid-record instrument transition concerns. Ozone analysis can proceed
without the FRM/FEM caveats that dominate PM2.5 and PM10 discussion.

Sources: [EPA AQS parameter code 44201](https://aqs.epa.gov/aqsweb/documents/codetables/parameters.html);
[EPA List of Designated Reference & Equivalent Methods](https://www.epa.gov/amtic/air-monitoring-methods-criteria-pollutants).

## 6. Units, conversions & reporting conventions

**Conversion at 25 °C, 1 atm:**

- 1 ppb O₃ ≈ **1.96 µg/m³**
- 0.070 ppm = **70 ppb**

Mass–volume conversion varies with temperature and pressure via the
molar volume; always state reference conditions.

**Reporting conventions:**

- **Hourly averages** — continuous analyzers report 1-hour average
  concentrations to AQS.
- **8-hour statistic** — AQS computes the **daily maximum 8-hour
  average (MDA8)** as a running mean of eight 1-hour values.
- **Design value** — the regulatory metric: **3-year average of the
  annual 4th-highest MDA8.**
- **Completeness** — data-capture and validity rules govern whether
  a day or quarter counts.
- **US regulatory ozone** is handled in ppm/ppb by volume; µg/m³
  appears in health and international contexts.

Sources: [EPA AQS/AirData documentation](https://www.epa.gov/aqs);
[40 CFR Part 50 App. U (8-hour ozone data handling & design value)](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20U%20to%20Part%2050).

## 7. NAAQS — level, history, and the design-value test

**Current NAAQS (2015):**

> **0.070 ppm (70 ppb), 8-hour** — primary + secondary, set identically.

**Form of the standard:** attained when the 3-year average of the
annual 4th-highest daily-max 8-hour concentration is ≤ 0.070 ppm at
a site.

**Scientific rationale:**

- Controlled-exposure and epidemiological evidence link short-term
  O₃ to reduced lung function, airway inflammation, and aggravated
  asthma; long-term exposure to respiratory harm.
- The secondary standard protects welfare: vegetation, crop and
  forest productivity, ecosystems.
- EPA's 2020 review retained 0.070 ppm as protective with an adequate
  margin of safety.

**WHO guideline (2021):** 100 µg/m³ 8-hr (~50 ppb) — substantially
stricter than the US 70 ppb NAAQS.

**History:**

| Year | Level | Form |
|---|---|---|
| 1971 | 80 ppb 1-hr | 1-hr not to exceed |
| 1979 | 120 ppb 1-hr | 1-hr not to exceed |
| 1997 | 80 ppb 8-hr | 3-yr avg 4th-highest MDA8 |
| 2008 | 75 ppb 8-hr | Same form |
| **2015** | **70 ppb 8-hr** | Same form (current) |
| 2020 | Retained at 70 ppb after review | |

Sources: [40 CFR Part 50](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50);
[EPA Ozone NAAQS Timeline](https://www.epa.gov/ground-level-ozone-pollution/timeline-national-ambient-air-quality-standards-naaqs-ground-level);
[EPA ISA for Ozone (2020)](https://www.epa.gov/isa/integrated-science-assessment-isa-ozone-and-related-photochemical-oxidants);
[EPA Ground-level Ozone Basics](https://www.epa.gov/ground-level-ozone-pollution/ground-level-ozone-basics).

## 8. Data governance — TCEQ vs EPA

- **TCEQ** operates Texas monitors (CAMS network), performs QA + certifies
  data, and submits validated data to EPA AQS. Provides near-real-time
  (uncertified) data publicly.
- **EPA AQS** is the national repository. Standardized identifiers
  (state/county/site + parameter code 44201 + method codes + POC).
  Source for design values, AirData reports, NAAQS determinations.

**Flow:** Monitor → TCEQ (collect, QA, certify) → EPA AQS (national,
certified). Uncertified/preliminary data support timely analysis but
can change; **certified AQS data are the official record for regulatory
and trend work.** Latency to AQS can be several months.

**The unit trap** — the one thing to remember for any cross-source
comparison:

> Ozone is **ppb in TCEQ** but **ppm in EPA** — a **1000× factor**.
> Convert ppb → ppm (× 0.001) before any cross-source comparison or
> NAAQS check.

Our pipeline handles this automatically: `step_01b_ingest_tceq_raw.py`
multiplies parameter_code 44201 by 0.001 at ingest so downstream code
always sees ppm.

## 9. Weather relationships

| Variable | Direction | Mechanism |
|---|---|---|
| **Temperature** | + (strong) | Heat accelerates photochemistry and biogenic VOC emissions; ozone rises sharply on hot days |
| **Solar radiation** | + | UV is the energy source for O₃ formation; clear-sky summer days maximize production |
| **Wind & transport** | ± | Light winds and stagnation trap precursors; regional transport imports background ozone from upwind |
| **Boundary layer** | ± | A shallow, stable mixing layer concentrates precursors; strong mixing dilutes them |
| **High pressure** | + | Subsidence, clear skies, and light winds under stagnant highs are classic ozone-episode conditions |
| **Humidity & fronts** | − | Clean maritime or frontal passages usually suppress peaks; coastal recirculation can worsen them |
| **Sea-breeze cycle** | ± Coastal Bend-specific | Recirculates morning Ship Channel emissions inland → afternoon ozone peaks at inland receptors |

Sources: [NOAA/NWS air-quality meteorology guidance](https://www.weather.gov/aq);
[Jacob & Winner 2009, *Atmos Environ* 43:51–63](https://doi.org/10.1016/j.atmosenv.2008.09.051);
[EPA ISA for Ozone (2020)](https://www.epa.gov/isa/integrated-science-assessment-isa-ozone-and-related-photochemical-oxidants).

## 10. Coastal Bend ozone — what we have

**Site inventory** (from Manasa's original PPT, mirrored to our fork):

| AQSID | Site | County | Rows | Notes |
|---|---|---|---:|---|
| 483550025 | Corpus Christi West | Nueces | ~93k | Continuous 2015–2025 |
| 483550026 | Corpus Christi Tuloso | Nueces | ~94k | Continuous 2015–2025 |

That's it — 2 sites, both in Corpus Christi, both on method 87 UV
photometric. Nothing in Kleberg or elsewhere in the 11-county Coastal
Bend footprint.

**Comparison with the broader south-texas-aq pipeline** (kept for
context; not in `aq_coastal_bend`): 18 sites total across 13 South
Texas counties, of which 7 in Bexar (San Antonio metro), 2 Cameron,
2 Comal, 2 Guadalupe, 1 Hidalgo, 1 Victoria, 1 Webb, plus these 2
Nueces sites.

**Reference metrics** — pull from `aq_coastal_bend.naaqs_design_values`:

```sql
SELECT site_name, year, metric, ROUND(value::numeric, 4) AS value,
       naaqs_level, exceeds
FROM   aq_coastal_bend.naaqs_design_values
WHERE  pollutant_group = 'Ozone'
ORDER  BY site_name, year, metric;
```

Expected values 2022–2024 rolling design values well below the 70
ppb NAAQS for both Coastal Bend sites (0.063–0.066 ppm range) — this
region does not have the ozone exceedance problem that Bexar County
does (Elm Creek Elementary, Heritage Middle School, Garden Ridge are
the notorious exceedance sites, all in the San Antonio metro, all
outside Coastal Bend).

## 11. Open questions / next steps (for Manasa)

- [ ] **Mirror Manasa's PPT into `pipeline/docs/briefings/`** — currently
      lives at `Pollutant.pptx` in the parent `south-texas-aq-pipeline`
      repo. Should be copied here for team access.
- [ ] **Ozone MDA8 recalculation from our data** — verify our
      `naaqs_design_values` computation matches TCEQ + EPA AQS published
      values for the 2 Coastal Bend sites.
- [ ] **NOx-limited vs VOC-limited chemistry** at CC West / CC Tuloso —
      inferred from HCHO/NO2 ratios; requires satellite-derived context
      given our zero NOx monitors in the region (see [NOx gap](./nox.md)).
- [ ] **Diurnal + seasonal patterns** — heatmap of MDA8 by month and
      hour-of-day at both sites; document classic mid-afternoon summer
      peak vs any deviations.
- [ ] **Coastal Bend attainment status confirmation** — cross-check
      TCEQ nonattainment designations against our computed 3-yr design
      values.

## 12. Reference summary — the one-slide card

| Aspect | Value |
|---|---|
| **Type** | Secondary photochemical pollutant; criteria pollutant |
| **Formation** | NOx + VOCs + sunlight + heat |
| **AQS parameter code** | 44201 (EPA stores in ppm; TCEQ reports in ppb) |
| **Measurement** | UV photometry (dominant FEM); chemiluminescence FRM |
| **Reference metric** | 3-yr avg of annual 4th-highest daily-max 8-hour (MDA8) |
| **Current NAAQS** | 0.070 ppm (70 ppb), 8-hour — set 2015, retained 2020 |
| **TCEQ vs EPA** | TCEQ hourly ppb · EPA 8-hr max in ppm (convert × 0.001) |
| **Data governance** | TCEQ collects + certifies → EPA AQS national record |
| **Coastal Bend attainment** | To be determined by analysis — not assumed |

## 13. References

**Regulatory + methods**

- [40 CFR Part 50 (NAAQS)](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50)
  — Appendix D (ozone reference method, calibration, traceability);
  Appendix U (8-hour ozone data handling & design value)
- [40 CFR Part 53 (FEM designation)](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-53)
- [40 CFR Part 58 (network design)](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-58)
- [EPA Ozone NAAQS Timeline](https://www.epa.gov/ground-level-ozone-pollution/timeline-national-ambient-air-quality-standards-naaqs-ground-level)
- [EPA List of Designated Reference & Equivalent Methods](https://www.epa.gov/amtic/air-monitoring-methods-criteria-pollutants)
- [EPA AQS parameter code 44201](https://aqs.epa.gov/aqsweb/documents/codetables/parameters.html)
- [EPA AQS Method Code Table](https://aqs.epa.gov/aqsweb/documents/codetables/methods_all.html)
- [EPA AMTIC](https://www.epa.gov/amtic)
- [WHO Global Air Quality Guidelines (2021)](https://www.who.int/publications/i/item/9789240034228)

**Health + ISA**

- [EPA Integrated Science Assessment for Ozone (2020)](https://www.epa.gov/isa/integrated-science-assessment-isa-ozone-and-related-photochemical-oxidants)
- [EPA Ground-level Ozone Basics](https://www.epa.gov/ground-level-ozone-pollution/ground-level-ozone-basics)

**Photochemistry + meteorology**

- [NRC (1991), *Rethinking the Ozone Problem in Urban and Regional Air Pollution*](https://nap.nationalacademies.org/catalog/1889/rethinking-the-ozone-problem-in-urban-and-regional-air-pollution)
- [Jacob & Winner 2009, *Atmos Environ* 43:51–63](https://doi.org/10.1016/j.atmosenv.2008.09.051)
- [NOAA/NWS air-quality meteorology guidance](https://www.weather.gov/aq)

**Data governance**

- [EPA Air Quality System (AQS)](https://www.epa.gov/aqs)
- [TCEQ Air Monitoring Operations (CAMS/TAMIS)](https://www.tceq.texas.gov/airquality/monops)
- [Clean Air Act §109](https://www.law.cornell.edu/uscode/text/42/7409)
- [Clean Air Act (Cornell LII)](https://www.law.cornell.edu/uscode/text/42/chapter-85)

**Method / calibration evolution**

- [40 CFR Part 50 App. D revision history via eCFR](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20D%20to%20Part%2050)
- [80 FR 65453 (2015 ozone NAAQS revision Federal Register notice)](https://www.federalregister.gov/citation/80-FR-65453)
