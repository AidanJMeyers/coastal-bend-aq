# Team Briefings — Source PPTs

This page is the archive of team presentation decks that back the
[pollutant deep-dive pages](../pollutants/pm25.md). The markdown
deep-dives are the canonical documentation; these PPTs are the
source-of-truth slide decks the leads used to present the material
live.

## Available briefings

| Date | Lead | Topic | File |
|---|---|---|---|
| 2026-07-01 | Aidan Meyers | PM2.5 / PM10 / VOCs (60 slides) | [`2026-07-01_AM_PM_VOC_briefing.pptx`](./2026-07-01_AM_PM_VOC_briefing.pptx) |
| 2026-07-01 | Jasmine Trevino | SO₂ + VOCs | [`2026-07-01_JT_SO2_VOC_briefing.pptx`](./2026-07-01_JT_SO2_VOC_briefing.pptx) |
| _pending_ | Manasa Kuchavaram | Ozone — currently lives at [`Pollutant.pptx` in south-texas-aq-pipeline](https://github.com/AidanJMeyers/south-texas-aq-pipeline/blob/main/Pollutant.pptx); mirror into this folder is a v0.1.3 open action. | _pending mirror_ |

## Why briefings are archived here

- **Reproducibility.** Any future team member can trace a claim in a
  pollutant deep-dive back to the specific slide that seeded it.
- **Dr. Melaram's stated principle** (2026-07-08 meeting): the deep-dive
  content that clarified FRM/FEM was worth investing in. The PPT +
  markdown pair keeps that investment visible.
- **BREATHE-CC crossover.** Sibling projects that consume Coastal Bend
  AQ data (e.g. BREATHE-CC exposure-outcome analyses) can point at
  these decks for methods sections.

## How to add a briefing

1. Drop the PPT into `pipeline/docs/briefings/`.
2. Name it `YYYY-MM-DD_INITIALS_topic_briefing.pptx` (e.g.
   `2026-07-01_AM_PM_VOC_briefing.pptx`).
3. Append a row to the table above.
4. Port the deck's substantive science content into the corresponding
   deep-dive page under [`pollutants/`](../pollutants/pm25.md) — the
   deep-dive markdown is where the team + external readers actually
   consume the science.
5. Commit + push.

## Related

- [Pollutant deep-dives](../pollutants/pm25.md) — the canonical prose
  versions of everything in these decks.
- [2026-07-08 meeting notes](../meeting_notes/2026-07-08.md) — where
  Dr. Melaram gave verbatim positive feedback on the FRM/FEM
  clarifications in Jasmine's briefing.
- [Pipeline Updates](../pipeline_updates.md) — see the v0.1.3 entry
  for the batch that landed these briefings + deep-dives.
