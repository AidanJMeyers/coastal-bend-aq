# VOCs — Volatile Organic Compounds

> **Lead:** Aidan Meyers (with Jasmine Trevino contributing SO2/VOCs
> content in her [briefing](../briefings/2026-07-08_JT_SO2_VOC_briefing.pptx))
> **Source deck:** [`briefings/2026-07-08_AM_PM_VOC_briefing.pptx`](../briefings/2026-07-08_AM_PM_VOC_briefing.pptx) (slides 40–54)
> **Coastal Bend data:** 4 sites, 46–48 chemicals, ~3.35M rows (Palm 1hr AutoGC dominates; Hillcrest/Dona Park/Holly 24hr canister)
> **Neon:** `aq_coastal_bend.vocs_1hr` + `aq_coastal_bend.vocs_24hr`

The most complex pollutant class in the dataset. No single NAAQS, 47
distinct chemical species, two different sampling paradigms
(continuous AutoGC vs 24-hr canister), and multiple regulatory
frameworks (HAP §112(b), PAMS, TCEQ ESL).

## 1. Definition

**Regulatory** ([40 CFR §51.100(s)](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-51/subpart-F/section-51.100)):

> "Any compound of carbon, excluding CO, CO2, carbonic acid, metallic
> carbides or carbonates, and ammonium carbonate, which participates
> in atmospheric photochemical reactions..."

**In practice:** carbon-containing gases + vapors that (a) exist in
gas phase at ambient T and (b) contribute to ozone/SOA formation
through OH-radical oxidation.

**EPA-exempt species** (not VOCs for regulatory purposes even though
they contain carbon):

- Methane (43201) — very slow OH reaction
- Ethane (43202) — low reactivity — **EXEMPT since 2005**
- Acetone (43551), several HFCs, others

**Our pipeline preserves all 43xxx + 45xxx species** that TCEQ
measures — regulatory exemption status doesn't affect what we ingest.

## 2. Why we track VOCs

1. **Ozone precursors** — OH + VOC → RO2 → NO2 → hν → O3. The
   photochemical engine of summer smog. Speciated VOC data is
   required for photochemical modeling (CAMx, CMAQ).
2. **SOA precursors** — aromatic + biogenic VOCs oxidize to secondary
   organic aerosol — a major PM2.5 constituent in the refinery
   corridor (links to [PM2.5 deep-dive](./pm25.md)).
3. **Direct HAP exposure** — 10 of our 47 species are
   [Hazardous Air Pollutants under CAA §112(b)](https://www.epa.gov/haps).
   Benzene alone is IARC Group 1 (definite human carcinogen).
4. **Source fingerprinting** — ratios (e.g., benzene/toluene) identify
   source classes (mobile, refinery, biogenic, unconventional O&G).

## 3. Chemical families in our data — 47 species

| Family | Count | Examples | HAPs |
|---|---:|---|:---:|
| **Paraffins** (alkanes, C₂–C₁₁) | 21 | Ethane, propane, n-butane, n-hexane, n-heptane, n-octane, n-decane | n-Hexane; 2,2,4-TMP |
| **Cycloalkanes** | 4 | Cyclopentane, cyclohexane, methylcyclohexane | — |
| **Olefins** (alkenes/dienes/alkynes) | 12 | Ethylene, propylene, isoprene (biogenic), 1,3-butadiene | 1,3-Butadiene |
| **Aromatics** (BTEX + TMBs) | 11 | Benzene, toluene, ethylbenzene, m/p-xylene, o-xylene, styrene | BTEX + isopropylbenzene + styrene |

**10 HAPs (CAA §112(b)):** Benzene, Toluene, Ethylbenzene, m/p-Xylene,
o-Xylene, Isopropylbenzene (Cumene), Styrene, 1,3-Butadiene, n-Hexane,
2,2,4-Trimethylpentane. **Benzene and 1,3-Butadiene are IARC Group 1
human carcinogens.**

Full parameter reference table: query `aq_coastal_bend.parameter_reference`.

## 4. Health effects — the BTEX + 1,3-butadiene axis

### Benzene (parameter 45201) — IARC Group 1

- Acute myeloid leukemia in occupational cohorts.
- [EPA IRIS Toxicological Review](https://iris.epa.gov/ChemicalLanding/&substance_nmbr=276):
  inhalation unit risk = **7.8×10⁻⁶ per µg/m³**; inhalation RfC = 30 µg/m³.
- [TCEQ ESL](https://www.tceq.texas.gov/toxicology/esl/list_main.html):
  long-term 4.5 µg/m³ (1.4 ppb annual).

### 1,3-Butadiene (43218) — IARC Group 1

- IARC Group 1 (2008). Hematolymphatic cancer.
- [EPA IRIS](https://iris.epa.gov/ChemicalLanding/&substance_nmbr=139):
  IUR = **3×10⁻⁵ per µg/m³** — nearly 4× more potent than benzene per
  unit mass. RfC = 2 µg/m³ (~0.9 ppb).
- Formerly APWL-listed in Houston Milby Park.

### Other BTEX

- **Toluene (45202)** — HAP; CNS depressant at occupational exposure.
  TCEQ long-term ESL ~330 ppb. IARC Group 3.
- **Xylenes (45109 m/p; 45204 o)** — HAPs; irritation + CNS effects.
  IARC Group 3 (insufficient evidence for cancer).

### n-Hexane (43231) neurotoxicity

HAP under §112(b). Occupational chronic exposure causes peripheral
neuropathy via 2,5-hexanedione metabolite. Not IARC-classified for
cancer. Ambient air typically far below occupational thresholds.

### Formaldehyde + carbonyls — NOT currently in our data

TCEQ AutoGC networks don't always report; PAMS Type 2 sites are
required to sample every 3 hours per
[40 CFR Part 58 App. D §5(b)](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-58/appendix-Appendix%20D%20to%20Part%2058).
Formaldehyde = IARC Group 1.

## 5. Regulation — HAPs + PAMS + no direct NAAQS

### 5.1 §112(b) HAPs framework

Established by [Clean Air Act Amendments of 1990](https://www.epa.gov/clean-air-act-overview/1990-clean-air-act-amendment-summary).
Original list = 189 pollutants; current = **188 HAPs** after selective
delistings (caprolactam 1996, MEK 2005, EGBE 2004).

Regulated via NESHAPs — National Emission Standards for HAPs
([40 CFR Part 63](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-63))
— which impose MACT (Maximum Achievable Control Technology) standards
on 174+ source categories.

**Coastal Bend-relevant subparts:**

- **Subpart CC & UUU — Petroleum Refineries** (benzene, toluene,
  xylenes, 1,3-butadiene). 2015 amendments added
  **fenceline benzene monitoring** (action level 9 µg/m³ annual avg)
  — this is why Corpus Christi refineries have benzene monitors
  along their perimeter fences.
- **Subpart R & BBBBBB — Gasoline Distribution.**
- **Subpart U — Group I Polymers & Resins** (1,3-butadiene, styrene).

### 5.2 No NAAQS for VOCs directly

- Ozone NAAQS 0.070 ppm regulates VOC + NOx as ozone precursors
  (see [ozone deep-dive](./ozone.md)).
- PM2.5 NAAQS 9 µg/m³ captures SOA from VOCs indirectly.
- HAPs regulated by NESHAP MACT standards.
- EPA IRIS assessments provide toxicity values (IUR, RfC).

### 5.3 Texas ESLs

TCEQ [Effects Screening Levels](https://www.tceq.texas.gov/toxicology/esl/list_main.html) —
permit + ambient benchmarks, NOT enforceable NAAQS. Short-term ESL
(1-hr) = acute + odor + acute vegetation. Long-term ESL (annual) =
chronic health + vegetation. [Air Pollutant Watch List (APWL)](https://www.tceq.texas.gov/toxicology/apwl)
tracks areas with persistent elevated toxics.

### 5.4 Mobile-source Rules

Mobile Source Air Toxics Rules ([MSAT1 2001, MSAT2 2007](https://www.epa.gov/regulations-emissions-vehicles-and-engines/mobile-source-air-toxics-msat-regulations-fuels)).
MSAT2 caps gasoline benzene at ≤ 0.62 vol% annual avg from 2011 —
dominant driver of declining urban ambient benzene. Mobile sources =
~50–60% of ambient benzene exposure nationally.

## 6. PAMS — the Photochemical Assessment Monitoring Stations network

**Statutory origin:** Section 182(c)(1) of the [Clean Air Act (1990 CAAA)](https://www.epa.gov/amtic/photochemical-assessment-monitoring-stations-pams).
Requires enhanced monitoring in serious, severe, or extreme ozone
nonattainment areas. **2015 NAAQS revision** expanded PAMS: any NCore
site in a CBSA ≥ 1,000,000 population must collect PAMS measurements.

**Required PAMS measurements** ([40 CFR Part 58 App. D §5(b)](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-58/appendix-Appendix%20D%20to%20Part%2058)):

- Hourly speciated VOCs (57-compound target list)
- 3 carbonyl samples/day (formaldehyde, acetaldehyde, acetone) on
  1-in-3 day schedule
- Hourly O3, NO, true NO2, total reactive nitrogen (NOy)
- Surface meteorology (T, wind, RH, P, precip, mixing height, solar)
- Upper-air met at the EMP-designated enhanced site

**Site types:** Type 1 upwind/background · Type 2 max precursor impact ·
Type 3 max ozone · Type 4 extreme downwind.

**Coastal Bend context:** San Antonio is Serious nonattainment
(bumped 2024). Corpus Christi is Attainment, so PAMS is not federally
required — BUT **TCEQ operates AutoGC voluntarily** at CC Palm,
which is the origin of our 3.3M-row 1-hr VOC dataset.

## 7. Measurement — AutoGC + TO-15 canister

### 7.1 AutoGC (continuous hourly)

The technology behind CC Palm's 3.3M-row 1-hr dataset. Workflow:

1. Ambient air sampled every hour (200–700 mL).
2. Preconcentration via Peltier-cooled multi-stage sorbent trap
   (Tenax, Carbopack, Carbosieve) at −10 to −30 °C. Water managed via
   Nafion dryer or Kori-xr cold trap.
3. Ballistic heating (300–380 °C) desorbs analytes into GC carrier.
4. Dual-column separation: Al2O3/KCl PLOT (C2–C5) + DB-1 non-polar
   (C6–C12 aromatics), Deans-switched.
5. Detection: dual FID (carbon response → ppbC) or MS for
   confirmation.
6. Data pushed to LIMS → TAMIS → EPA AQS.

Commercial systems: Markes TT24-7 (US PAMS reference), Synspec GC955
(EU-common turnkey), Chromatotec airmoVOC (dual-FID, lowest LODs),
PerkinElmer Clarus (legacy), Entech + Agilent (cryogenic, GC-MS
confirmation).

**Calibration:** 57-component PAMS gas standards (Restek P/N 26370,
Linde, Apel-Riemer) at 20–60 ppbC. Daily auto-cal; 5–7 point curves
quarterly. Internal standards: BCM, 1,4-DFB, chlorobenzene-d5.

### 7.2 EPA Method TO-15 (canister)

[EPA Compendium Method TO-15](https://www.epa.gov/sites/default/files/2019-11/documents/to-15r.pdf) —
canister-based GC/MS for ambient VOCs (65–70 HAPs at 200–500 pptv LOD).
Updated to [TO-15A (2019)](https://www.epa.gov/amtic/compendium-methods-determination-toxic-organic-compounds-ambient-air):
10× lower reporting limits (20 pptv), tighter calibration linearity,
30-day canister stability test. TO-15A MDLs for benzene/toluene ~5–15
pptv.

Canister types: SUMMA-passivated (NiCrOx layer, standard); Silonite
(silica CVD, more inert). 6 L canisters = de facto NATTS standard
for 24-hr integrated samples.

**Programs using TO-15:** NATTS (27 sites), UATMP, PAMS canister
confirmation, state networks (TCEQ, CARB, NYSDEC), vapor intrusion
(ITRC / ASTM E2600).

**Coastal Bend relevance:** our 24-hr AutoGC data at CC Hillcrest,
Dona Park, Holly is effectively equivalent to TO-15 canister
methodology in reporting cadence — 1-in-6 day sampling typical.

## 8. Parameter + method codes

### 8.1 Parameter codes

Series prefixes:

- **43xxx** — alkanes, alkenes, alkynes, oxygenates
- **45xxx** — aromatic hydrocarbons (BTEX, xylenes, styrene, TMBs)
- 43000 — sum of PAMS target compounds (QC summary)
- 43102 — Total NMOC (bulk sum via TO-12)

Key species (see full 47-row list in `aq_coastal_bend.parameter_reference`):

| Code | Name | HAP | Notes |
|---:|---|:---:|---|
| 43202 | Ethane | | Regulatory-exempt |
| 43218 | 1,3-Butadiene | ⚠ | IARC Group 1 |
| 43231 | n-Hexane | ⚠ | Neurotoxicity HAP |
| 43243 | Isoprene | | Dominant biogenic |
| 43250 | 2,2,4-Trimethylpentane | ⚠ | Isooctane; HAP |
| 45201 | Benzene | ⚠ | IARC Group 1 |
| 45202 | Toluene | ⚠ | HAP |
| 45109 | m/p-Xylene | ⚠ | HAP (combined isomers) |
| 45204 | o-Xylene | ⚠ | HAP |
| 45220 | Styrene | ⚠ | HAP |

### 8.2 Method codes

| Method | Family | Notes |
|---:|---|---|
| 128, 142, 146 | AutoGC continuous hourly | Our workhorse at CC Palm — the 3.3M-row dataset |
| 122, 123 | Canister PAMS dual-FID | Our 24-hr sites (Hillcrest, Dona Park, Holly) most likely |
| 109, 110, 127, 129 | TO-15 GC/MS | HAP confirmation; NATTS reference |

Diagnostic query — disambiguate the specific instrument at each
AQSID:

```sql
SELECT aqsid, site_name, method_code, COUNT(*) AS n_rows,
       MIN(date_local) AS first, MAX(date_local) AS last
FROM   aq_coastal_bend.vocs_1hr
GROUP  BY aqsid, site_name, method_code
UNION  ALL
SELECT aqsid, site_name, method_code, COUNT(*) AS n_rows,
       MIN(date_local) AS first, MAX(date_local) AS last
FROM   aq_coastal_bend.vocs_24hr
GROUP  BY aqsid, site_name, method_code
ORDER  BY aqsid, method_code;
```

## 9. Units — ppbC + conversion

**ppbC = parts per billion CARBON.** For a molecule with n carbon
atoms: **ppbC = ppbv × n**.

Worked examples:

| Species | Carbon count | 1 ppbv → | 1 ppbC → |
|---|---:|---|---|
| Benzene (C6H6) | 6 | 6 ppbC | 0.167 ppbv |
| Toluene (C7H8) | 7 | 7 ppbC | 0.143 ppbv |
| Ethane (C2H6) | 2 | 2 ppbC | 0.5 ppbv |

**Why carbon-normalize?** Ozone-formation potential scales roughly
with reactive carbon count, not with mole count. Reporting in ppbC
lets you compare species of different chain length for photochemical
modeling.

**Mass conversion:** µg/m³ = ppbv × MW / 24.45 at 25 °C, 1 atm. Users
doing health-risk analysis typically want µg/m³ so they can compare to
EPA IRIS RfC values — that requires converting **ppbC → ppbv → µg/m³**.

## 10. Coastal Bend VOC sources

- **Corpus Christi Ship Channel refineries** — 6 major refineries in
  Nueces (Citgo E+W, Flint Hills E+W, Valero, CC Refining) release
  fugitive BTEX + olefins + paraffins. Fenceline benzene monitors
  (per 2015 NESHAP Subpart CC) provide independent QC.
- **Port of Corpus Christi** — largest US crude oil export port. Bulk
  transfer of petroleum + condensate; marine tanker loading vapor
  losses; diesel bunker combustion.
- **Eagle Ford Shale proximity** — Nueces isn't in Eagle Ford proper
  but is DOWNWIND of Karnes / Wilson / Atascosa production. Long-range
  transport from flaring, compressor stations, and diesel fleets.
- **Mobile sources** — I-37, US 77, US 181 diesel + gasoline. Mobile
  benzene ~50–60% of national ambient benzene per EPA; declining
  under MSAT2.
- **Biogenic isoprene + monoterpenes** — South Texas forests, brush,
  and agricultural vegetation emit isoprene (temperature + light
  driven). Isoprene 43243 dominates ambient VOC totals during midday
  at background sites.
- **Trans-boundary + marine** — Cross-Gulf transport can carry biomass
  burning VOCs from Mexican agricultural fires.

## 11. Coastal Bend VOCs — what we have

### 11.1 Sites + volume

| AQSID | Site | Cadence | Rows | Chemicals | Notes |
|---|---|---|---:|---:|---|
| 483550083 | Corpus Christi Palm | **1-hr AutoGC** | ~3,300,000 | 46 | PAMS-style, 2016–2025 |
| 483550029 | Corpus Christi Hillcrest | 24-hr AutoGC | ~30,000 | 48 | Residential, near Ship Channel |
| 483550032 | Corpus Christi Dona Park | 24-hr AutoGC | ~30,000 | 48 | Refinery neighborhood |
| 483550034 | Corpus Christi Holly | 24-hr AutoGC | ~30,000 | 48 | Ship Channel–adjacent |

### 11.2 The 1-hr vs 24-hr caveat

**Do not compare 1-hr Palm means directly to 24-hr Hillcrest means.**
CC Palm captures diurnal variation (morning rush hour peaks, midday
isoprene surges, refinery plume events). 24-hr sites average that
away. Comparing means or medians directly is misleading — use
day-integrated Palm data for comparison to Hillcrest/Dona Park/Holly.

### 11.3 Analytical opportunity

The rich speciation at CC Palm supports source apportionment via
Positive Matrix Factorization (PMF) or Chemical Mass Balance (CMB).
Signature ratios:

- **benzene/toluene** — mobile (~0.3) vs refinery (~1.0)
- **isoprene fraction** — biogenic marker
- **i-pentane/n-pentane** — fuel evaporation
- **acetylene/CO** — combustion age (unavailable — we don't have CO
  in Coastal Bend, see [CO gap statement](./co.md))

## 12. Weather relationships

| Variable | Direction | Mechanism |
|---|---|---|
| **Temperature** | ± dual | Increases biogenic isoprene exponentially + evaporative losses. Also accelerates OH oxidation, shortening reactive-VOC lifetime → net midday minimum, early-morning peak |
| **Wind direction (critical)** | ± source attribution | CC Palm ESE = Ship Channel plume; NW = urban Corpus; NE = trans-Karnes-Eagle-Ford |
| **Boundary layer height** | − | Nocturnal shallow BL traps VOCs → morning peaks; daytime convective BL 1500–2500 m dilutes; sea breeze creates internal structure |
| **Photolysis + OH reactivity** | − reactive species | Solar-driven OH peaks midday. Reactive VOCs (alkenes, aromatics) show midday minima; unreactive (ethane, propane) don't. Ratio → photochemical age |
| **Humidity** | ± | High RH accelerates heterogeneous aqueous-phase oxidation for aldehydes + polar VOCs |
| **Sea-breeze cycle** | ± dominant Coastal Bend forcing | Morning offshore land breeze carries Ship Channel VOCs offshore; afternoon onshore sea breeze recirculates them back over Corpus → characteristic double-peak diurnal |

Conditional bivariate probability functions (CBPF) at CC Palm by
chemical species should reveal Ship Channel, urban, and Eagle Ford
transport signatures.

## 13. Open questions / next steps

- [ ] **CC Palm exploratory descriptives** — monthly medians by
      species, wind-rose CBPFs for benzene + 1,3-butadiene, diurnal
      profiles for reactive vs unreactive species. Isoprene as
      biogenic check.
- [ ] **HAP-only working subset** — join
      `aq_coastal_bend.vocs_1hr` with `parameter_reference` where
      `is_hap = true`, produce annual mean tables per HAP per site.
- [ ] **Benzene fenceline comparison** — Ship Channel fenceline data
      is public via NESHAP CC reporting; compare to CC Palm ambient
      to characterize plume dilution factor.
- [ ] **Source apportionment (PMF)** — CC Palm speciation is rich
      enough to support a PMF study; requires ≥ 100 samples per
      species, which we exceed by orders of magnitude.
- [ ] **VOC retro-pull decision** (open from 2026-06-24 meeting) —
      TCEQ TAMIS backfill for pre-2025 24-hr AutoGC vs accept
      2025-only.

## 14. References

**Regulatory + methods**

- [40 CFR §51.100(s) — VOC definition](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-51/subpart-F/section-51.100)
- [40 CFR Part 63 — NESHAP MACT](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-63)
- [40 CFR Part 58 App. D — PAMS requirements](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-58/appendix-Appendix%20D%20to%20Part%2058)
- [EPA Compendium Method TO-15](https://www.epa.gov/sites/default/files/2019-11/documents/to-15r.pdf)
- [EPA HAPs main page](https://www.epa.gov/haps)
- [EPA PAMS main page](https://www.epa.gov/amtic/photochemical-assessment-monitoring-stations-pams)
- [MSAT Regulations (EPA)](https://www.epa.gov/regulations-emissions-vehicles-and-engines/mobile-source-air-toxics-msat-regulations-fuels)

**Toxicity + IRIS**

- [EPA IRIS — Benzene](https://iris.epa.gov/ChemicalLanding/&substance_nmbr=276)
- [EPA IRIS — 1,3-Butadiene](https://iris.epa.gov/ChemicalLanding/&substance_nmbr=139)
- [EPA IRIS — Toluene](https://iris.epa.gov/ChemicalLanding/&substance_nmbr=118)
- [IARC Monograph 100F (2012, benzene + others)](https://publications.iarc.who.int/123)

**TCEQ**

- [TCEQ Effects Screening Levels](https://www.tceq.texas.gov/toxicology/esl/list_main.html)
- [TCEQ Air Pollutant Watch List](https://www.tceq.texas.gov/toxicology/apwl)
- [TCEQ RG-442 — ESL derivation guidelines](https://www.tceq.texas.gov/downloads/toxicology/publications/rg-442.pdf)
- [TCEQ Air Monitoring Operations](https://www.tceq.texas.gov/airquality/monops)

**Weather–VOC + photochemistry**

- [Jacob & Winner 2009, *Atmos Environ* 43:51–63](https://doi.org/10.1016/j.atmosenv.2008.09.051)
- [40 CFR Part 50 App. P — ozone exceedance flag/EER](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20P%20to%20Part%2050)
