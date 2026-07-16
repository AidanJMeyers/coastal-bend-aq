# CO (Carbon Monoxide) — Gap Statement

> **Lead:** Manasa Kuchavaram
> **Coastal Bend data status: NONE.** No CO monitors operate in the
> 11-county Coastal Bend region during 2015–2025.

## 1. The gap

Query `aq_coastal_bend.pollutant_hourly WHERE pollutant_group='CO'`
returns **zero rows**. The nearest CO monitors are in Bexar County
(San Antonio metro), outside the Coastal Bend scope.

This is a **structural TCEQ network gap**, not a data-pipeline issue —
TCEQ has not deployed CO monitoring at any Nueces, Kleberg, Aransas,
Bee, Brooks, Duval, Jim Wells, Kenedy, Live Oak, Refugio, or
San Patricio county site. Historically justified because CO ambient
concentrations have declined dramatically post-catalytic-converter and
ULSD-diesel; urban CO monitoring is now concentrated in the largest
metros where mobile-source density remains high enough to matter.

## 2. Why CO would still matter to Coastal Bend science

- **Mobile-source combustion age indicator.** The acetylene/CO ratio
  is a classic diagnostic for source age in urban plumes. Without CO
  we lose one axis of source attribution.
- **Ship Channel + Port diesel combustion** is a plausible CO source.
  Not knowing our ambient CO baseline means we can't quantitatively
  characterize it.
- **Confounder for ozone chemistry.** CO participates in the
  photochemical HOx cycle (CO + OH → CO2 + H → HO2). NOx-limited
  vs VOC-limited regimes are influenced by CO abundance.

## 3. Definition (brief)

**CO** = carbon monoxide, colorless odorless gas produced by incomplete
combustion of carbon-containing fuel. Toxic mechanism: binds
hemoglobin ~240× more strongly than O2, forming carboxyhemoglobin and
displacing oxygen from red blood cells.

## 4. Regulatory context

**Current NAAQS** (unchanged since 1971):

- 9 ppm 8-hour
- 35 ppm 1-hour

Both primary; not to be exceeded more than once per year. See
[EPA CO NAAQS](https://www.epa.gov/co-pollution/national-ambient-air-quality-standards-naaqs-co).

**Parameter code:** 42101. Reported in **ppm**.

**Measurement:** Non-Dispersive Infrared (NDIR) or Gas Filter
Correlation (GFC) analyzers. FRM specified in
[40 CFR Part 50 Appendix C](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20C%20to%20Part%2050).

## 5. Health effects

- **Acute** — headache at ~200 ppm (10% COHb); dizziness, confusion,
  loss of consciousness at higher concentrations; death at very high
  concentrations.
- **Chronic (ambient)** — cardiovascular effects in susceptible
  populations (angina exacerbation at low COHb elevations).
- Ambient outdoor CO in the US since ~2000 is generally well below
  levels of concern; occupational + indoor combustion + faulty
  furnaces / generators remain the primary human-exposure risks.

Reference: [EPA Integrated Science Assessment for Carbon Monoxide](https://www.epa.gov/isa/integrated-science-assessment-isa-carbon-monoxide).

## 6. Strategic options for CO in our study

Three plausible paths:

1. **Accept the gap and reframe as scope constraint.** Document that
   Coastal Bend CO characterization is not possible from our data;
   any CO discussion in the manuscript is qualitative + literature-
   based.
2. **Import upstream Bexar CO for regional context.** Bexar has multiple
   CO monitors; the data lives in the parent
   `aq.pollutant_hourly` schema (south-texas-aq v0.4.0). Query from
   there for regional context on CO trends, but do not treat as
   representative of Coastal Bend ambient concentrations.
3. **Satellite CO for regional coverage.** [NASA MOPITT](https://terra.nasa.gov/about/terra-instruments/mopitt)
   or [Sentinel-5P TROPOMI CO](https://sentinel.esa.int/web/sentinel/missions/sentinel-5p)
   provide column-integrated CO at ~7 × 7 km footprint. Not
   surface-level, but useful for regional plume tracking (e.g.,
   biomass burning transport from Mexico).

**Recommendation:** option 1 for the first manuscript; option 3 as
supplementary if the review comments push for it.

## 7. References

- [EPA CO Pollution main page](https://www.epa.gov/co-pollution)
- [EPA CO NAAQS](https://www.epa.gov/co-pollution/national-ambient-air-quality-standards-naaqs-co)
- [40 CFR Part 50, Appendix C — CO FRM](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20C%20to%20Part%2050)
- [EPA ISA for Carbon Monoxide](https://www.epa.gov/isa/integrated-science-assessment-isa-carbon-monoxide)
- [EPA AQS parameter code 42101](https://aqs.epa.gov/aqsweb/documents/codetables/parameters.html)
- [NASA MOPITT — Measurements of Pollution in the Troposphere](https://terra.nasa.gov/about/terra-instruments/mopitt)
- [Sentinel-5P TROPOMI](https://sentinel.esa.int/web/sentinel/missions/sentinel-5p)

## 8. Manasa's open items

- [ ] Confirm the strategic option choice (accept gap / Bexar
      context / satellite) with team at the next AQ team meeting.
- [ ] If option 2 or 3, prototype a query / satellite pull and
      write results into this page.
- [ ] Add a paragraph to the manuscript methods draft explicitly
      noting the CO absence as a Coastal Bend network limitation.
