# Meetings & Updates

Every team meeting has its own notes file with decisions + action
items right in the body. The [Pipeline Updates](../pipeline_updates.md)
page is the running changelog for the pipeline itself. Together they
answer *"what happened when, and why does the current setup look
this way?"*

## Meeting archive

| Date | Focus | Attendees | Minutes |
|---|---|---|---|
| **2026-09-20** | Proposal review + Refinery-Row proximity variable + Oct-4 target for Warden/Jin joint session | Aidan, Jasmine, Manasa | [notes](./2026-09-20.md) |
| **2026-08-12** | Proposal-template working session; CAMS 32/34 site-label catch; Dr. Niyogi (UT Austin) collaboration signal; bi-weekly cadence adopted | Aidan (late), Dr. Melaram, Manasa, Jasmine | [notes](./2026-08-12.md) |
| **2026-07-29** | Design pivot — K-fold stacked model + Random Forest single-model start; DSHS ED-visit data as target-fallback; **health-outcome extension TABLED** | Dr. Melaram, Manasa, Jasmine | [notes](./2026-07-29.md) |
| **2026-07-22** | Literature-scan check-in (short); Ecuador 2017 PM2.5 paper surfaced | Manasa, Jasmine | [notes](./2026-07-22.md) |
| **2026-07-15** | **Origin — pollution rose → Refinery-Row directional health study pivot** | Aidan, Dr. Melaram, Manasa, Jasmine (partial) | [notes](./2026-07-15.md) |
| **2026-07-08** | Three-way PPT briefings on assigned pollutants + FRM/FEM + method codes + pipeline walkthrough | Aidan, Dr. Melaram, Manasa, Jasmine | [notes](./2026-07-08.md) |
| **2026-06-24** | Scope pivot to Coastal Bend + method-code strategy + team assignments | Aidan, Jasmine (Manasa async) | [notes](./2026-06-24.md) |

## Where action items live now

**Every meeting's notes file has its own "Action items" section
in the body.** Each item names an owner, a due date, and a brief
description. That's the whole tracking system — no central kanban,
no export/import friction, no dashboard to maintain.

- Looking for something you owe? Open the most recent meeting notes
  and search for your name.
- Following up with someone? Open the meeting they took the action
  on — the notes have your handle on it.
- Want a running audit trail? Skim newest → oldest.

## Pipeline updates

For pipeline / database / schema changes (as opposed to team
decisions), see the [Pipeline Updates changelog](../pipeline_updates.md).
Every commit that touches the pipeline lands there with a
what / why / where breakdown.

## New-meeting workflow (weekly / bi-weekly)

1. **Meeting happens** on Motion; Motion AI Notetaker records +
   summarises.
2. **Aidan pulls the summary** via `mcp__motion-notes__get_meeting_note`
   (or a scheduled Claude task once that ships).
3. **Writes it up** at `pipeline/docs/meeting_notes/YYYY-MM-DD.md`
   using `_template.md` as the starting scaffold. Sections: attendees,
   length, decisions made, discussion highlights, **action items**
   (owners + due dates), referenced material, next meeting.
4. **Appends a row** to the meeting archive table above.
5. **Adds a Pipeline Updates entry** if the schema or docs
   architecture changed as a result.
6. **Commits + pushes** — GH Pages rebuilds.

## Reference

- **Meeting template** — [`_template.md`](./_template.md) is the
  canonical scaffold for a new meeting notes file.
- **Verbatim transcripts** — stored in Motion; each meeting notes
  file links to its Motion `docId` in the header.
- **Skill for full study context** — the
  `corpus-christi-aq-wind-rose-study` Claude skill has the
  cross-meeting decisions log + team onboarding + MCP setup.
