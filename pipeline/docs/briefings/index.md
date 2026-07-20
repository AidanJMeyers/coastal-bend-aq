# Team Briefings — Source PPTs

Archive of team presentation decks that back the [pollutant deep-dive
pages](../pollutants/pm25.md). The markdown deep-dives are the canonical
documentation; these PPT files are the source-of-truth slide decks the leads
used to present the material live at the 2026-07-08 team meeting.

## Available briefings

| Presented | Lead | Topic | File |
|---|---|---|---|
| 2026-07-08 | Aidan Meyers | PM2.5 / PM10 / VOCs (~35 slides) | [`2026-07-08_AM_PM_VOC_briefing.pptx`](./2026-07-08_AM_PM_VOC_briefing.pptx) |
| 2026-07-08 | Jasmine Trevino | SO₂ + VOCs | [`2026-07-08_JT_SO2_VOC_briefing.pptx`](./2026-07-08_JT_SO2_VOC_briefing.pptx) |
| 2026-07-08 | Manasa Kuchavaram | Ozone + CO (~35 slides) — currently at [`Pollutant.pptx` in south-texas-aq-pipeline](https://github.com/AidanJMeyers/south-texas-aq-pipeline/blob/main/Pollutant.pptx); mirror into this folder is an open action. | _pending mirror_ |

## Why briefings are archived here

- **Reproducibility.** Any team member (present or future) can trace a claim
  in a pollutant deep-dive back to the specific slide that seeded it.
- **Dr. Melaram's stated principle** (2026-07-08 meeting): the FRM/FEM depth
  is worth investing in. The PPT + markdown pair keeps that investment visible.
- **BREATHE-CC crossover** (later, once BREATHE-CC integrates AQ data): sibling
  projects can cite the methodology decks directly.

## Related documents

- [Pollutant deep-dives](../pollutants/pm25.md) — the canonical prose
  versions of everything in these decks.
- [2026-07-08 meeting notes](../meeting_notes/2026-07-08.md) — the meeting
  where these decks were presented + discussed.
- [2026-07-15 meeting notes](../meeting_notes/2026-07-15.md) — the meeting
  where the project pivoted to the Refinery-Row directional health study.
- [Project proposals — Refinery-Row directional health study](../proposals/refinery_row_directional_health.md)
  — the new project scope that came out of 2026-07-15.
- [Pipeline Updates](../pipeline_updates.md) — see the v0.1.3 and v0.1.4
  entries for the ship / correction history.

## How to add a briefing

1. Drop the PPT into `pipeline/docs/briefings/`.
2. Name it `YYYY-MM-DD_INITIALS_topic_briefing.pptx` (e.g.
   `2026-07-08_AM_PM_VOC_briefing.pptx`).
3. Append a row to the table above.
4. Port the deck's substantive science content into the corresponding
   deep-dive page under [`pollutants/`](../pollutants/pm25.md).
5. Commit + push.
