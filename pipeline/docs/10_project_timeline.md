# 10 — Project Timeline

## v0.1.0 — Coastal Bend fork (2026-07-08)

Split off from the broader
[south-texas-aq v0.4.0](https://aidanjmeyers.github.io/south-texas-aq-pipeline/)
per Dr. Melaram's direction from the 2026-07-08 meeting: focus scope on
Coastal Bend for a publishable first analysis; leave the broader
South Texas pipeline intact for future work.

## Immediate next-week deliverables (due 2026-07-15)

Aligned to the pollutant lead assignments in
[11 Team Assignments](./11_team_assignments.md).

Each pollutant lead delivers, for their assigned pollutant(s):

1. **Chemistry** — what the pollutant is; combustion / photochemical /
   biogenic sources; behavior in atmosphere.
2. **Instrumentation review** — every method code seen in the Coastal
   Bend dataset for this pollutant, confirmed against TCEQ Annual
   Network Plans; what the specific instrument model is (BAM 1020 vs
   1022, etc.).
3. **NAAQS reference** — current standard, averaging period, form,
   historical revisions.
4. **Parameter code catalog** — every AQS parameter code for this
   pollutant (there are up to 3 for PM2.5); which is measured at which
   site.
5. **Method-code timeline audit** — confirm the timelines in
   [05 Method-code reference](./05_method_codes_reference.md) against
   TCEQ documentation; annotate any interpretive nuances.
6. **Meteorological drivers** — which weather variables should predict
   this pollutant; expected diurnal / seasonal / synoptic behavior in
   the Coastal Bend context.
7. **Literature review** — 3-5 recent systematic reviews or
   meta-analyses for health effects; 2-3 methodological references
   for machine-learning approaches on this pollutant.

Deliverable format: pollutant deep-dive markdown page in
[`pollutants/`](./pollutants/ozone.md).

## Q3 2026 (July–September)

- **Method-code audit complete** across all 7 pollutant assignments.
- **First analytical tibble frozen** — the (site × date × pollutant × weather)
  join at the 75%-complete-day resolution.
- **Prelim exploratory analysis PR** — descriptive stats, correlations,
  diurnal / seasonal decomposition.

## Q4 2026 (October–December)

- **Method-controlled machine-learning models** for each pollutant that
  has enough data (Ozone at 2 sites, SO₂ at 3 sites, PM2.5 at 3 sites in
  BAM era, PM10 restricted to 2024+, VOCs 2025-only).
- **Method-aware imputation strategy** documented and applied.
- **Spatial-interpolation feasibility study** — can we defensibly
  interpolate to the 9 unmonitored counties from 8 anchor points?
  Decision + methodology writeup.

## Q1 2027 (Jan–March)

- **Manuscript v0.1 draft** — Coastal Bend AQ characterization.
- **Health-outcome data acquisition** — apply for internal grant, order
  hospitalization + ER data for the 11 Coastal Bend counties (2015–2025).

## Q2 2027

- **Health outcome layer** joined to pollutant/weather tibble at
  county-week or ZIP-code-week resolution.
- **Manuscript v1.0 submitted.**

## Standing questions (unresolved)

- [ ] Should we pursue TCEQ TAMIS retro-pull for pre-2025 VOCs, or
      accept 2025-only?
- [ ] Should we contact Delaney (TCEQ) for method-code
      instrument-model confirmations? (Aidan: yes, cc the team.)
- [ ] Do we import EPA-network Cameron/Hidalgo boundary sites to
      strengthen spatial interpolation, or restrict scope to
      Nueces/Kleberg only?
