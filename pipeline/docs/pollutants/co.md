# CO (Carbon Monoxide) — Deep Dive

**Lead:** Manasa Kuchavaram
**Target:** filled draft by 2026-07-15
**Coastal Bend coverage:** ⚠ **ZERO SITES — no CO monitoring**

## 0. Gap statement

**There are no operating CO monitors in the 11-county Coastal Bend
region.** The nearest CO-measuring sites are in Bexar County (San Antonio
MSA), which is outside the study scope.

This page documents:
- What we would ideally measure
- What's available upstream in `aq.pollutant_hourly` (Bexar sites) for
  context
- Options for inferring Coastal Bend CO indirectly

## 1. Chemistry

*(TO FILL)*: CO as an incomplete-combustion tracer. Sources: motor
vehicle exhaust, industrial combustion, wildfires. Half-life ~1-2 months
— regional to hemispheric mixing. Health impact = hypoxia via
hemoglobin binding.

## 2. What we'd measure if we had a site

- **Parameter code 42101** (native ppm)
- **Method typically 553 or 554** (non-dispersive infrared, NDIR) —
  TCEQ CO monitors
- Standard 1-hr and 8-hr NAAQS: 35 ppm 1-hr, 9 ppm 8-hr

Both NAAQS levels are far higher than modern urban CO concentrations
(most US metros are <2 ppm 8-hr max). CO exceedances are effectively
zero anywhere the network hasn't been shrunk for lack of them.

## 3. Why there's no Coastal Bend CO site

*(TO FILL — likely explanation from TCEQ Annual Network Plans)*: CO
sites were retired in the mid-2000s across most of Texas because levels
fell well below NAAQS after mobile-source emission controls. Corpus
Christi metro did have a CO site (CAMS 4) historically but it was
decommissioned.

## 4. Options for including CO in the analysis anyway

*(TO FILL)*: Discuss trade-offs.

1. **Ignore CO.** Simplest; CO isn't a health-relevant priority in
   Corpus Christi.
2. **Use Bexar CO sites as regional-background proxies.** Weakness:
   San Antonio's traffic profile is not Corpus Christi's.
3. **Model CO from co-emitted species we do have (NOx isn't measured
   either; some VOCs are).**
4. **Petition to extend scope to include EPA satellite CO retrievals**
   (MOPITT / IASI / TROPOMI) if CO is analytically important.

## 5. Deliverable status

Manasa: consider closing this out with a **short "no data" reference
page** and reallocating your effort to a deeper ozone deep-dive. If
`aq.pollutant_hourly` (upstream) has Bexar CO data, it may be useful
context for the ozone chemistry story.

Ask Aidan to confirm whether CO belongs in the Coastal Bend scope at all
before spending more time here.
