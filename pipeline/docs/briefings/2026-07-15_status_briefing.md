# 2026-07-15 — Status Briefing for Aidan

Standalone status briefing for Aidan Meyers ahead of the next AQ team
meeting. Companion to the [Pipeline Updates v0.1.3
entry](../pipeline_updates.md) and the [2026-07-08 meeting
notes](../meeting_notes/2026-07-08.md).

## 1. Where the project stands (as of v0.1.3)

**Shipped in v0.1.3 (2026-07-15):**

- All 7 pollutant deep-dive pages published — [Ozone](../pollutants/ozone.md),
  [PM2.5](../pollutants/pm25.md), [PM10](../pollutants/pm10.md),
  [SO₂](../pollutants/so2.md), [VOCs](../pollutants/vocs.md),
  [CO](../pollutants/co.md), [NOx](../pollutants/nox.md).
- 2 team briefing PPTs archived at [`briefings/`](./index.md).
- 2026-07-08 BREATHE-CC × AQ meeting logged at
  [`meeting_notes/2026-07-08.md`](../meeting_notes/2026-07-08.md).
- Dashboard JSON refreshed: 7 items marked done, 7 new 2026-07-08
  actions added.
- Live site (deployed via GH Pages):
  [aidanjmeyers.github.io/coastal-bend-aq](https://aidanjmeyers.github.io/coastal-bend-aq/).

**Not yet started (later releases):**

- TROPOMI NO₂ prototype pull (blocked on team endorsement of NOx option 2).
- MOPITT/TROPOMI CO prototype pull (blocked on team endorsement of CO option 3).
- Manuscript methods-section paragraphs per pollutant (Q3 target).
- First analytical tibble at 75 %-complete-day resolution (Q3 target).

## 2. What to raise in the next AQ team meeting

**Ordered from highest to lowest decision urgency.**

1. **Confirm CO strategic option.**
   [`pollutants/co.md`](../pollutants/co.md) proposes three options and
   recommends option 1 (accept gap for first manuscript, option 3
   MOPITT/TROPOMI supplementary if reviewers push). Manasa owns this;
   need her endorsement.

2. **Confirm NOx strategic option.**
   [`pollutants/nox.md`](../pollutants/nox.md) proposes three options and
   recommends option 2 (TROPOMI NO₂ column via Google Earth Engine +
   HCHO/NO₂ regime classification per Duncan 2010). Aidan owns this;
   need team green-light before starting the prototype.

3. **Manasa: mirror `Pollutant.pptx`.**
   Currently lives at
   [`Pollutant.pptx` in south-texas-aq-pipeline](https://github.com/AidanJMeyers/south-texas-aq-pipeline/blob/main/Pollutant.pptx).
   Should live in this repo's `briefings/` folder alongside Aidan's and
   Jasmine's decks. Suggested filename:
   `2026-06-24_MK_Ozone_briefing.pptx`.

4. **Deep-dive review.**
   All 3 leads (Aidan, Manasa, Jasmine) need to read each other's
   deep-dive pages and flag factual corrections. Especially:
   - Jasmine on SO₂ (Aidan expanded her PPT to match his own format
     — verify nothing was distorted in the port).
   - Manasa on Ozone (ported from her PPT — verify method-code timeline
     narrative matches her intent).
   - All three on their non-owned pollutants for sanity.

5. **Carried decisions from 2026-06-24 (still not decided):**
   - **VOC retro-pull** for pre-2025 24-hr VOCs. Jasmine now has her
     briefing done — is this useful for backfill analysis?
   - **EPA-network Cameron / Hidalgo boundary sites** for spatial
     interpolation strength.

## 3. Cross-project context (BREATHE-CC crossover)

From the 2026-07-08 meeting:

- **Dr. Melaram's verbatim feedback** on Jasmine's SO2/VOC PPT: "y'all
  clarified the FEM and FRM very well… it hit the science very well."
  This is direct endorsement of the technical-rigor direction from
  2026-06-24. Continue investing in the same depth on the remaining
  writing tasks.

- **Data-latency reality:** TCEQ + EPA both lag ambient data by 2
  months for QC certification. When BREATHE-CC students want to join
  AQ data to health-outcome baseline, we can offer prior-year
  fully-certified + rolling recent months with an explicit "certified
  through YYYY-MM" caveat.

- **QC first, analysis second.** Aidan's operational principle
  articulated in the 2026-07-08 meeting mirrors the deep-dive audits
  we're doing here (method_code changes, 88101 vs 88502 for PM2.5).
  Consistent framing across projects.

## 4. Quick links

- [Live docs site](https://aidanjmeyers.github.io/coastal-bend-aq/)
- [Pipeline Updates v0.1.3 entry](../pipeline_updates.md)
- [Interactive meeting dashboard](../meeting_notes/index.md)
- [2026-07-08 meeting notes](../meeting_notes/2026-07-08.md)
- [2026-06-24 scope-pivot notes](../meeting_notes/2026-06-24.md)
- [Team briefings archive (this folder)](./index.md)
- Parent repo (full 42-site pipeline):
  [south-texas-aq-pipeline](https://github.com/AidanJMeyers/south-texas-aq-pipeline)
- Sibling project (BREATHE-CC pediatric cohort):
  [breathe-cc-documentation](https://github.com/AidanJMeyers/breathe-cc-documentation)

## 5. Cheat sheet for standing in front of the team

> "Since our last sync we filled every pollutant deep-dive page from
> the team briefing decks — PM2.5, PM10, VOCs, SO₂, Ozone, plus formal
> gap statements for CO and NOx. Both PPTs are archived alongside the
> markdown. Dr. Melaram gave direct positive feedback on the FRM/FEM
> clarifications in the 2026-07-08 sync. Today I want a decision on
> the CO and NOx strategic options — option 1 for CO (accept + document
> the gap) and option 2 for NOx (TROPOMI NO₂ column) — so we can either
> start the satellite prototypes or move on. Manasa still owes us the
> Ozone PPT mirror into `briefings/`. Everything else on the review
> track."
