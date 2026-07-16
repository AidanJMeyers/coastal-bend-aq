# NOx Family — Gap Statement

> **Lead:** Aidan Meyers
> **Coastal Bend data status: NONE.** No NOx / NO / NO₂ monitors
> operate in the 11-county Coastal Bend region during 2015–2025.

## 1. The gap

Query `aq_coastal_bend.pollutant_hourly WHERE pollutant_group='NOx_Family'`
returns **zero rows**. The `NOx_Family` group (parameter codes 42601 NO,
42602 NO₂, 42603 NOx) has no Coastal Bend monitoring coverage.

This is a **structural TCEQ + EPA network gap** — no site in Nueces,
Kleberg, or the other 9 Coastal Bend counties measures NOx. The
nearest NOx monitors are in Bexar County (San Antonio metro,
outside Coastal Bend).

## 2. Why NOx would matter for our Coastal Bend science

**NOx is critical context for at least three of our other pollutants:**

1. **[Ozone](./ozone.md) precursor.** Ozone formation is NOx + VOCs +
   sunlight. Without NOx measurements at our CC West / CC Tuloso ozone
   sites, we can't directly classify the local photochemical regime
   (NOx-limited vs VOC-limited), which is critical for interpreting
   trends and framing control-strategy recommendations.
2. **[PM2.5](./pm25.md) secondary nitrate precursor.** NOx → HNO3 →
   ammonium nitrate is a fine-particulate mass pathway. Our sulfate
   coverage is strong (via SO2 monitoring); our nitrate coverage is
   blind.
3. **[VOC](./vocs.md) OH-radical budget.** NOx competes with VOCs for
   OH radical; NOx/VOC ratios inform photochemistry. CC Palm's rich
   47-species VOC dataset would be more powerful with parallel NOx.

## 3. Definition (brief)

**NOx family:**

- **NO (nitric oxide, 42601)** — colorless gas, primary combustion emission.
- **NO₂ (nitrogen dioxide, 42602)** — reddish-brown, oxidized product
  of NO; the criteria pollutant with a NAAQS.
- **NOx (42603)** — operational sum of NO + NO₂; sometimes reported
  separately by TCEQ.
- **NOy (reactive nitrogen)** — NOx plus oxidized products (HNO3, PAN,
  organic nitrates). Measured at PAMS Type 2 sites; not in our data.

## 4. Regulatory context

### NO₂ NAAQS (the criteria pollutant of the family)

- **Primary 1-hour: 100 ppb** (2010) — 3-yr avg of the 98th percentile
  of daily max 1-hr
- **Primary annual: 53 ppb** (1971, retained) — annual mean
- **Secondary annual: 53 ppb** (1971) — protects welfare

See [EPA NO₂ NAAQS](https://www.epa.gov/no2-pollution/national-ambient-air-quality-standards-naaqs-nitrogen-dioxide-no2).

### FRM / FEM

**Reference principle** ([40 CFR Part 50 App. F](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20F%20to%20Part%2050)):
gas-phase chemiluminescence — NO + O3 → NO2* → hν. NO2 measured
indirectly after molybdenum-catalyst reduction to NO, then chemi
detection. **Known interferent:** molybdenum catalyst also reduces
PAN, HNO3, alkyl nitrates — so "NO2" from a standard chemiluminescence
analyzer is really "NOy-minus-NO" at some sites.

**Class II FEM (true NO2):** [Teledyne T500U CAPS spectroscopy](https://www.teledyne-api.com/products/nitrogen-compound-instruments/t500u)
— cavity attenuated phase-shift, directly measures NO2. PAMS Type 2
sites require true NO2.

### Health effects

- Short-term NO2 exposure → airway inflammation, asthma exacerbation,
  bronchial hyperresponsiveness.
- Long-term NO2 → increased asthma incidence + respiratory infection risk.
- Distinguishing NO2 effects from co-pollutants (PM2.5, ultrafines from
  the same combustion sources) is a known epidemiologic challenge.

Reference: [EPA Integrated Science Assessment for Nitrogen Oxides — Health Criteria](https://www.epa.gov/isa/integrated-science-assessment-isa-oxides-nitrogen-health-criteria).

## 5. Strategic options for NOx in our study

Three plausible paths:

1. **Accept the gap and reframe as scope constraint.** Manuscript
   explicitly acknowledges we cannot directly quantify NOx at our
   Coastal Bend receptors. Ozone regime assignment relies on
   literature + regional context.
2. **[TROPOMI](https://sentinel.esa.int/web/sentinel/missions/sentinel-5p)
   satellite NO₂ column** for regional coverage. ~7×3.5 km footprint,
   daily 13:30 local time overpass. Column-integrated (not surface
   mixing ratio), but useful for **regime classification** via
   HCHO/NO₂ column ratios and for **plume tracking**.
3. **Import upstream Bexar NOx for regional context.** Bexar has multiple
   NOx monitors in `aq.pollutant_hourly` (south-texas-aq v0.4.0 schema).
   Use for regional NOx trend context but not as a proxy for Coastal
   Bend ambient concentrations.

**Recommendation:** option 2 (TROPOMI) as the strongest scientific
angle — satellite NO2 columns are the modern standard for regime
classification when in-situ NOx is absent. Adds a whole methodology
section to the manuscript.

## 6. TROPOMI approach (option 2 detail)

- **Product:** [NO₂ tropospheric column density, L2 or L3 gridded](https://sentinel.esa.int/web/sentinel/technical-guides/sentinel-5p/products-algorithms).
- **Spatial:** ~5.5 × 3.5 km native pixels; L3 grids at ~0.1° typical.
- **Temporal:** daily overpass ~13:30 local time.
- **Access:** [Sentinel Copernicus Open Access Hub](https://scihub.copernicus.eu/)
  or [Google Earth Engine](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S5P_OFFL_L3_NO2).
- **HCHO/NO₂ regime classifier:** ratio > 1 → NOx-limited; < 1 →
  VOC-limited ([Duncan et al. 2010](https://doi.org/10.1029/2009JD013351)).

This would substantially strengthen the ozone methodology section of
the manuscript — a defensible, satellite-based regime classification
in the absence of in-situ NOx.

## 7. References

- [EPA NO₂ Pollution main page](https://www.epa.gov/no2-pollution)
- [EPA NO₂ NAAQS](https://www.epa.gov/no2-pollution/national-ambient-air-quality-standards-naaqs-nitrogen-dioxide-no2)
- [40 CFR Part 50, Appendix F — NO2 reference method](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-50/appendix-Appendix%20F%20to%20Part%2050)
- [EPA ISA for Nitrogen Oxides — Health Criteria](https://www.epa.gov/isa/integrated-science-assessment-isa-oxides-nitrogen-health-criteria)
- [Duncan et al. 2010, *JGR-A* 115:D14311 — HCHO/NO₂ regime](https://doi.org/10.1029/2009JD013351)
- [Sentinel-5P TROPOMI mission](https://sentinel.esa.int/web/sentinel/missions/sentinel-5p)
- [Google Earth Engine — S5P NO2 L3](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S5P_OFFL_L3_NO2)
- [40 CFR Part 58 App. D — PAMS true-NO2 requirement](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-58/appendix-Appendix%20D%20to%20Part%2058)

## 8. Aidan's open items

- [ ] **Confirm strategic option** (accept / TROPOMI / Bexar) at
      the next AQ team meeting.
- [ ] **If option 2**: prototype TROPOMI NO₂ pull over the Coastal
      Bend footprint via Google Earth Engine (free tier sufficient
      for a bounding box + date range this small).
- [ ] **HCHO/NO₂ regime classification** for CC West + CC Tuloso if
      TROPOMI HCHO is also pulled.
- [ ] **Add explicit paragraph** to manuscript methods draft noting
      the NOx absence as a Coastal Bend network limitation, and
      documenting whatever compensating approach we adopt.
