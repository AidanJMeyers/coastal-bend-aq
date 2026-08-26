# Pipeline Updates

**Running log** of every change to the Coastal Bend pipeline —
database schema updates, docs restructures, new team decisions, method
audits. Every entry answers **what** changed, **when**, **why**, and
**where the current product lives** on the day of the entry.

Newest first. Older entries never edited in place — new entries
supersede.

---

## 2026-08-26 · v0.1.6 — SharePoint proposal link surfaced + TCEQ↔AQS site reference + 2026-08-12 label-catch reconciled

**What changed**

1. **Live-draft SharePoint link surfaced across the pipeline.** Jasmine's
   [STX AQ Proposal.docx (SharePoint)](https://tamucc-my.sharepoint.com/:w:/r/personal/jtrevino79_islander_tamucc_edu/_layouts/15/Doc.aspx?sourcedoc=%7B1F7E1BF3-856B-46A6-8348-2B1D8BF57D76%7D&file=STX%20AQ%20Proposal.docx&action=default&mobileredirect=true&DefaultItemOpen=1&web=1)
   — the collaborative fill of the Melaram-Lab proposal template — is
   now linked from (a) the site home page as a quick-access card,
   (b) the top of the Refinery-Row scope doc as a highlighted callout,
   (c) the proposals index as a "Live shared drafts" table.
2. **New reference doc:
   [`13_tceq_cams_aqs_reference.md`](./13_tceq_cams_aqs_reference.md).**
   Compiled from a live `aq_coastal_bend.site_registry` Neon query
   cross-checked against TCEQ TAMIS Region 14. Documents the two
   identifier systems (TCEQ CAMS ID ≠ EPA AQS `site_number`), lists
   all 8 sites currently in Neon (7 active + 1 disabled), lists the
   TCEQ Region 14 CAMS clusters likely mapping to each AQS
   `site_number`, and lists deactivated Coastal Bend sites that could
   optionally be added (Holly CAMS 660, Violet CAMS 664, National
   Seashore CAMS 314). Added to nav under Project Management.
3. **2026-08-12 site-label catch reconciled.** Live Neon query on
   2026-08-26 confirms site labels are already correct — `site_number
   32 = "Corpus Christi Huisache_0032"`, `site_number 34 = "Corpus
   Christi Dona Park_0034"`. The 2026-08-12 concern was a **CAMS ID
   (TCEQ) vs `site_number` (AQS/pipeline) confusion**, not an actual
   mislabel. Manasa's SQL-rename action item is closed as "not
   needed"; Aidan's re-download item is rescoped from "fix labels +
   push missing Hyosachi" to "reconcile row counts + decide on
   optional deactivated-site additions."
4. **Dashboard JSON updated.** `manasa-sql-rename-sites` → done
   (with explanatory note). `aidan-data-redownload-qc` → in_progress
   (with rescope note).

**Why**

- Aidan asked for the SharePoint link to be added conveniently for
  ease of access ahead of the 2026-08-26 team meeting.
- Aidan also asked for a comprehensive list of possible Coastal Bend
  sites to know what to redownload — this required going to Neon
  (authoritative for our schema) plus TCEQ TAMIS (authoritative for
  ground-truth CAMS list), and the reconciliation uncovered that the
  2026-08-12 mislabel concern was based on identifier-system confusion,
  not actual bad data.
- Every change gets a Pipeline Updates entry per the standing rule.

**Where the current product lives**

- **SharePoint proposal draft:** three convenient entry points from
  the pipeline (home card, scope doc callout, proposals index table).
- **CAMS ↔ AQS reference:**
  [13_tceq_cams_aqs_reference.md](./13_tceq_cams_aqs_reference.md).
- **Neon schema `aq_coastal_bend`:** unchanged; verified correct as
  of 2026-08-26.
- **Live site:** [aidanjmeyers.github.io/coastal-bend-aq](https://aidanjmeyers.github.io/coastal-bend-aq/).

**Follow-up**

- Aidan's rescoped QC pass (row-count reconcile + optional
  additions) still pending; new Pipeline Updates entry after that
  lands.
- 2026-08-26 team meeting outcomes will land in a new meeting-notes
  file after tonight's call.

---

## 2026-08-13 · v0.1.5 — Three new meeting notes + Manasa PPT mirrored + scope-doc refinement + CAMS site-label catch documented

**What changed**

1. **Manasa's Ozone/CO briefing PPT mirrored** into the pipeline at
   [`briefings/2026-07-08_MK_Ozone_CO_briefing.pptx`](./briefings/2026-07-08_MK_Ozone_CO_briefing.pptx).
   Closes the pending mirror action from 2026-07-08. Briefings archive
   index updated to link the file directly.
2. **Three meeting notes files written from transcripts** —
   [2026-07-22](./meeting_notes/2026-07-22.md) (literature-scan
   check-in), [2026-07-29](./meeting_notes/2026-07-29.md) (K-fold
   stacked model + Random Forest single-model design decision),
   [2026-08-12](./meeting_notes/2026-08-12.md) (proposal-template
   working session + CAMS 32/34 site-label catch + UT Austin Niyogi
   collaboration signal + bi-weekly cadence adopted).
3. **Dashboard JSON updated** — 3 new meeting entries; 8 new action
   items from the three meetings; Warden/Jin poll-follow-up note
   appended; Manasa's PPT-mirror item marked done.
4. **Meeting archive table + fallback checklist refreshed** to reflect
   the new state and re-partition open actions by urgency (high /
   before 2026-08-26 / carried).
5. **Refinery-Row scope doc extensively refined** at
   [`proposals/refinery_row_directional_health.md`](./proposals/refinery_row_directional_health.md):
   - Added a **Design evolution log** table so readers can see how the
     design has shifted meeting-by-meeting since 2026-07-15.
   - Rewrote Research Questions section into **Current-project (base
     model)** vs **Future-work stack** halves; added Jasmine's 2026-08-12
     hypothesis (direction prediction > concentration prediction);
     retained the AQI-band exploratory question.
   - Rewrote Methods section around the **K-fold stacked model**
     (base model now, health-outcome stack later); documented the
     Random Forest single-model start decision (2026-07-29); added
     wind-direction 3-way encoding (continuous, u/v decomposition,
     16-sector categorical); added Refinery-Row bearing derived
     variable; documented the < 18-hr daily-completeness threshold
     as a sensitivity knob (not fixed); added imputation-transparency
     requirement.
   - Filled Variables section as a proper 3-part table (pollutants,
     meteorology, time features) matching the 2026-08-12 template fill.
   - Added Dr. Deb Niyogi (UT Austin) to the collaborators section with
     the 2026-08-14 joint-call scheduling.
6. **mkdocs nav updated** to include the 3 new meeting-notes pages.
7. **CAMS 32/34 site-label catch — documented but not yet fixed in
   Neon.** The 2026-08-12 meeting surfaced that CAMS 32 is labeled
   "Donna" in `aq_coastal_bend.site_registry` when it should be
   **CC Hyosachi**, and the site labeled "Holly" is actually
   **CC Dona Park** (CAMS 34). CC Holly (CAMS 660) is genuinely
   deactivated (2018) and correctly absent from the current schema.
   **SQL fix is Manasa's action** (committed 2026-08-12); Aidan is
   running a **full re-download-and-row-count QC** pass this week
   (2026-08-13, ~1-hour session; concrete plan delivered in chat, not
   published to pipeline per personal-deliverables rule).

**Why**

- Three weeks of accumulated meeting content was queued in transcripts
  waiting to land in the pipeline. Manasa's PPT was a pending item
  from 2026-07-08. The scope doc had drifted from what the team
  actually agreed to in the four meetings after 2026-07-15.
- Dr. Melaram: *"You gotta write it down. Just write it down. You have
  it, you don't forget it."* (2026-07-29.) That principle applies to
  pipeline updates too — silent evolution of a scope doc against
  what's in meeting minutes creates the exact gap the meeting-notes
  system exists to prevent.

**Where the current product lives**

- **Meeting archive:** [meeting_notes/](./meeting_notes/index.md) —
  now covers 6 meetings (06-24, 07-08, 07-15, 07-22, 07-29, 08-12).
- **Team briefings archive:** [briefings/](./briefings/index.md) — all
  three 2026-07-08 decks now on the pipeline.
- **Scope doc:** [proposals/refinery_row_directional_health.md](./proposals/refinery_row_directional_health.md)
  — reflects the post-2026-08-12 design.
- **Neon schema `aq_coastal_bend`** — unchanged in structure; SQL
  site-label fix is pending Manasa; row-count reconciliation is
  pending Aidan's re-download.
- **Live site:** [aidanjmeyers.github.io/coastal-bend-aq](https://aidanjmeyers.github.io/coastal-bend-aq/).

**Follow-up (this week)**

- Aidan → data re-download + row-count QC + push CC Hyosachi to Neon
  (in flight — plan handed off in chat).
- Manasa → SQL rename in `aq_coastal_bend.site_registry`.
- Jasmine → TCEQ per-site meteorological variable audit; joint Niyogi
  call 2026-08-14.
- Post-Niyogi + post-QC: another Pipeline Updates entry captures
  whatever schema / scope changes fall out.

---

## 2026-07-20 · v0.1.4 — Correction pass + 2026-07-15 pollution-rose pivot + Refinery-Row scope doc

**What changed** (chronological, within the 2026-07-20 batch)

1. **Correction — 2026-07-08 meeting notes rewritten.** The prior v0.1.3
   version described this as a BREATHE-CC × Coastal Bend AQ crossover
   meeting; that was wrong. The actual 2026-07-08 meeting was the
   three-way PPT briefings meeting (Aidan PM/VOC, Jasmine SO₂/VOCs,
   Manasa Ozone/CO) plus a live pipeline walkthrough. The
   [2026-07-08 meeting notes](./meeting_notes/2026-07-08.md) now
   reflect the real meeting content.
2. **PPT files renamed** to match actual presentation date:
   `2026-07-01_*_briefing.pptx` → `2026-07-08_*_briefing.pptx`. All
   references updated across pollutant deep-dives, briefings index,
   meeting notes, and pipeline_updates itself.
3. **New meeting logged — [2026-07-15](./meeting_notes/2026-07-15.md).**
   Jasmine's pollution-rose idea + Manasa's refinery-centered suggestion
   crystallized into Aidan's proposed **geospatial × meteorological ×
   temporal × health-outcome ML study** centered on Refinery Row
   directionality. Team consensus: **this is the core project direction**
   going forward.
4. **New scope doc — [proposals/refinery_row_directional_health.md](./proposals/refinery_row_directional_health.md).**
   Full scoping of the new project: research questions, exposure axis,
   outcomes, data-availability check, methods (pollution rose, ML
   predictive model), collaborators, deliverables, timeline (1–1.5 yr),
   publishability + policy framing.
5. **Stale status briefing removed** (was built on the incorrect
   2026-07-08 narrative). The scope doc now replaces its role.
6. **Dashboard JSON updated** — 2026-07-15 meeting added; 8 new action
   items; two obsolete satellite-prototype items marked deferred with
   explanatory notes; CO drop-decision from 2026-07-08 recorded.
7. **Meeting archive table + fallback checklist refreshed** to reflect
   the new open-action set.
8. **Strict-mode build fix** — pollutant deep-dive pages had 5 broken
   PPT links after the file rename; caught by `mkdocs build --strict`
   on the first push, fixed on second push. All 4 deep-dive pages
   (`pm10.md`, `pm25.md`, `so2.md`, `vocs.md`) now point at the
   `2026-07-08_*.pptx` filenames.
9. **Meeting-poll email draft removed from the pipeline** per user
   feedback. That kind of personal-outreach copy is a chat-only
   deliverable; pipeline stays scoped to team-facing content (scope
   docs, meeting notes, technical documentation). Related nav +
   references cleaned up. Aidan will send the poll himself with his
   own Schej.it link.
10. **This log entry added retroactively.** Going forward, every
    pipeline change gets a Pipeline Updates entry in the same commit —
    no more assuming "we'll log it later."
11. **Scope-doc link fix** — refinery_row_directional_health.md still had
    2 links pointing at the deleted email draft; caught by strict-mode
    build, removed.
12. **Scope-doc credit rebalance + illustrative image** — proposal was
    reading as too Aidan-authored. Rewrote the origin block to credit
    Jasmine as the foundational-idea originator (pollution-rose framing
    + NWS-verified regional sea-breeze uniformity), Manasa as the
    refinery-centering + `openair` originator, Aidan as the ML +
    health-outcome coupler, Dr. Melaram as the grant + significance
    framer. Rewrote "Collaborators" section into "Team + collaborators"
    with core-team block ordered Jasmine → Manasa → Aidan → PI (equal
    weight, Jasmine first for foundational credit). Removed remaining
    possessive Aidan attributions on the phase-shift hypothesis, the
    comparison paper, and the seasonal-decomposition ML-target
    suggestion. Added a hero **illustrative pollution rose** SVG
    ([assets/pollution_rose_illustration.svg](./assets/pollution_rose_illustration.svg))
    at the top of the scope doc — hand-rendered compass-rose graphic
    with concentration bins (green/yellow/red) showing the Corpus
    Christi Gulf-breeze pattern from S/SSW. Self-contained, no
    external image dependencies, light + dark theme aware.

**Why**

- Aidan flagged mid-meeting on 2026-07-15 that the earlier week's notes
  I'd written were miscategorized (real week's content vs a fabricated
  BREATHE-CC crossover meeting that didn't happen).
- The 2026-07-15 meeting produced the strongest project-scope direction
  the team has landed on — publishing this properly is high-value for the
  Warden / Jin outreach.
- Even if the previous v0.1.3 content was scientifically defensible in
  isolation, the docs should reflect what the team actually did.

**Where the current product lives**

- **Meeting archive:** [meeting_notes/](./meeting_notes/index.md) — all
  three weekly meetings (06-24, 07-08, 07-15).
- **Scope doc:** [proposals/refinery_row_directional_health.md](./proposals/refinery_row_directional_health.md).
- **Live site:** [aidanjmeyers.github.io/coastal-bend-aq](https://aidanjmeyers.github.io/coastal-bend-aq/).
- Neon schema `aq_coastal_bend` unchanged from v0.1.2.

**Follow-up carried into 2026-07-22**

- Aidan: send Schej.it meeting poll to Warden + Jin.
- Aidan: text Jasmine the 2026-07-15 recap.
- Team: novelty + feasibility scan for the new direction.
- Team: review the scope doc.

---

## 2026-07-15 · v0.1.3 — Seven pollutant deep-dives filled + team PPT briefings archived + 2026-07-08 meeting logged

**What changed**

- **All 7 pollutant deep-dive pages** filled from source material:
  - [PM2.5](./pollutants/pm25.md), [PM10](./pollutants/pm10.md), [VOCs](./pollutants/vocs.md) — ported from Aidan's 2026-07-08 briefing PPT (NAAQS, FRM/FEM, method-code semantics, health-effects references, Coastal Bend data reality).
  - [SO₂](./pollutants/so2.md) — ported from Jasmine's 2026-07-08 briefing PPT, expanded to match Aidan's page format.
  - [Ozone](./pollutants/ozone.md) — ported from Manasa's `Pollutant.pptx` (currently in the parent `south-texas-aq-pipeline` repo; awaiting mirror into this repo's `briefings/`).
  - [CO](./pollutants/co.md) — gap statement with three strategic options + recommendation.
  - [NOx](./pollutants/nox.md) — gap statement with three strategic options + TROPOMI NO₂ satellite recommendation.
- **Team PPT briefings archived** at [`pipeline/docs/briefings/`](./briefings/index.md):
  - `2026-07-08_AM_PM_VOC_briefing.pptx` (Aidan)
  - `2026-07-08_JT_SO2_VOC_briefing.pptx` (Jasmine)
- **2026-07-08 meeting logged** as [BREATHE-CC × Coastal Bend AQ sync](./meeting_notes/2026-07-08.md) — the meeting where Dr. Melaram endorsed the FRM/FEM rigor direction from 2026-06-24 and the REDCap API + TAMU-secure-drive workflow was formalized.
- Dashboard JSON updated to mark PPT-derived deep-dive items done + add new 2026-07-08 action items.

**Why**

- 2026-07-08 team meeting: three leads presented briefing decks with substantive science content that needed to land in the docs, not just live inside the slide files.
- 2026-07-08 meeting: Dr. Melaram (verbatim): "y'all clarified the FEM and FRM very well… it hit the science very well." The deep-dives are the visible evidence of that investment; publishing them closes the "docs lag PPTs" gap the team flagged earlier.

**Where the current product lives**

- **Deep-dive pages:** [aidanjmeyers.github.io/coastal-bend-aq/pollutants/pm25/](https://aidanjmeyers.github.io/coastal-bend-aq/pollutants/pm25/) (and all 6 sibling pages linked from nav).
- **PPT source decks:** [`pipeline/docs/briefings/`](./briefings/index.md) in this repo.
- **2026-07-08 meeting notes:** [meeting_notes/2026-07-08.md](./meeting_notes/2026-07-08.md).
- **Neon schema `aq_coastal_bend`** unchanged from v0.1.2.

**Follow-up carried into next AQ team meeting**

- Manasa: mirror `Pollutant.pptx` into this repo's `briefings/` folder.
- Team: confirm CO + NOx strategic options (accept / regional / satellite).
- All AQ leads: review deep-dive pages + draft the methods-section paragraph for your assigned pollutant.

---

## 2026-07-08 · v0.1.2 — Interactive meeting dashboard + Manasa spelling

**What changed**

- **Interactive meeting-notes dashboard** at
  [`meeting_notes/`](./meeting_notes/index.md). Kanban board with Open /
  In Progress / Done columns, filter chips (owner, meeting, overdue,
  free-text search), progress bars per owner and overall, click-to-open
  cards for status changes and progress notes, one-click add-item,
  export-to-JSON for team-wide sync.
- Vanilla JS + CSS in `pipeline/docs/javascripts/meeting_dashboard.js`
  and `pipeline/docs/stylesheets/meeting_dashboard.css`, wired via
  `mkdocs.yml`.
- Data model: single JSON block on the meeting-notes index page is the
  source of truth. Individual browsers hold ephemeral edits in
  `localStorage`; Export JSON generates the block to paste back and
  commit for permanent state.
- **Fixed "Manasseh" / "Manassa" → "Manasa"** across all 10 files where
  it appeared (mkdocs nav, index, meeting notes, team assignments,
  method-code reference, pollutant deep-dives, README, config).

**Why**

- Direct request: make the meeting minutes actually interactive —
  check items off, log notes, log when things are complete. Aidan will
  regenerate the JSON weekly from meeting transcripts.
- Manasa's name was misspelled in the transcript-based initial
  extraction. Fixed at the source.

**Where the current product lives**

- **Live dashboard:** [aidanjmeyers.github.io/coastal-bend-aq/meeting_notes/](https://aidanjmeyers.github.io/coastal-bend-aq/meeting_notes/)
- **JSON source of truth:** the `<script id="action-items">` block in
  `pipeline/docs/meeting_notes/index.md` — always the "committed" state
- **Per-user drafts:** browser `localStorage` key `cb-meeting-notes-v1`
- Everything else unchanged from v0.1.1.

**How weekly regeneration works**

1. Aidan drops a meeting transcript into the conversation.
2. Claude creates `meeting_notes/YYYY-MM-DD.md` with the write-up.
3. Claude appends to the meetings array and items array in the JSON
   block on the meeting-notes index. Prior items keep their `id` so
   `localStorage` stays in sync — team members' unfinished edits
   don't get clobbered.
4. Claude adds a row to the archive table and (if a schema/architecture
   change happened) an entry to this file.
5. `git commit && git push` → GH Pages rebuilds → team sees updates.

---

## 2026-07-08 · v0.1.1 — API/DB-only framing + meeting-notes infra + Pipeline Updates page

**What changed**

- Docs pages rewritten to describe the pipeline as **"the database is
  the deliverable."** Removed file-based (`data/parquet/`, CSV) usage
  paths from all user-facing pages.
- New `meeting_notes/` subsection with 2026-06-24 as the first entry.
- New Pipeline Updates page (this file).
- Master action-item roll-up on the meeting-notes index.
- Neon `aq_coastal_bend.*` schema — no changes to data itself,
  documented Data API access alongside direct SQL.

**Why**

- Aidan's directive: the team consumes this dataset via API/SQL, not
  by cloning parquet files. Docs should reflect that.
- Meeting cadence is now weekly, so meeting minutes need a durable
  home tied to trackable action items.
- Pipeline Updates page addresses the standing concern from the
  2026-06-24 meeting where Dr. Melaram said he "doesn't know what's
  going on with the project" — going forward, every change is logged
  here.

**Where the current product lives**

- **Live docs site:** [aidanjmeyers.github.io/coastal-bend-aq](https://aidanjmeyers.github.io/coastal-bend-aq/)
- **Neon SQL endpoint:** `AQ_POSTGRES_URL` env var → schema
  `aq_coastal_bend`
- **GitHub repo:** [AidanJMeyers/coastal-bend-aq](https://github.com/AidanJMeyers/coastal-bend-aq)
- **Data as of this entry:** 8 sites, ~1.3 M rows, 10 tables. See
  [Data availability](./04_data_availability.md).

---

## 2026-07-08 · v0.1.0 — Initial Coastal Bend fork

**What changed**

- New GitHub repo `AidanJMeyers/coastal-bend-aq` created.
- New Neon schema `aq_coastal_bend` provisioned by county-filtering
  `aq.*` on `county_code IN (273 = Kleberg, 355 = Nueces)`.
- Filtered 10 tables into `aq_coastal_bend`:
    - `site_registry` — 8 rows
    - `parameter_reference` — 57 rows
    - `naaqs_design_values` — 129 rows
    - `pollutant_hourly` — 768,243 rows
    - `pollutant_daily` — 31,015 rows
    - `pollutant_daily_24hr` — 0 rows (empty — site 0060 is Bexar)
    - `pollutant_monthly` — 1,035 rows
    - `vocs_1hr` — 336,922 rows (CC Palm, 2025, 46 chemicals)
    - `vocs_24hr` — 7,152 rows (CC Hillcrest/Dona Park/Holly, 2025, 48 chemicals)
    - `weather_hourly` — 197,124 rows (Nueces + Kleberg)
- Indexes created on all natural query keys (aqsid, date_local,
  pollutant_group, parameter_code, year, location).
- `SELECT` + `USAGE` granted to `anonymous` and `authenticated` Data
  API roles.
- `ALTER DEFAULT PRIVILEGES` set so future tables inherit the grants.
- Pipeline code adapted with `COASTAL_BEND_COUNTY_CODES` filter in
  `step_01b_ingest_tceq_raw.py`. `postgres.schema` updated to
  `aq_coastal_bend` in `config.yaml`.
- 11 docs pages + 7 pollutant deep-dive templates published to
  GitHub Pages.

**Why**

- Dr. Melaram's 2026-06-24 request to Jasmine to narrow scope from
  all South Texas to Coastal Bend for a focused first manuscript.
- The full south-texas-aq v0.4.0 pipeline (42 sites, 13 counties) is
  preserved intact at
  [aidanjmeyers.github.io/south-texas-aq-pipeline](https://aidanjmeyers.github.io/south-texas-aq-pipeline/)
  and remains the parent dataset.

**Where the current product lives (as of ship)**

- **Neon:** project `aged-salad-62359207`, schema `aq_coastal_bend`
- **GitHub:** [AidanJMeyers/coastal-bend-aq](https://github.com/AidanJMeyers/coastal-bend-aq)
- **Live docs:** [aidanjmeyers.github.io/coastal-bend-aq](https://aidanjmeyers.github.io/coastal-bend-aq/)

**Key findings surfaced by v0.1.0**

- **9 of 11 Coastal Bend counties have zero monitors** — only Nueces
  (7 sites) and Kleberg (1 site) have TCEQ data.
- **All 3 PM2.5 sites exceed the new 9.0 µg/m³ annual NAAQS in 2024.**
- **CC Holly PM10 has a 5-year gap** (2019-2023) between method 141
  (filter) and method 639 (continuous BAM).
- **Ozone at both CC sites is below NAAQS** — 0.064-0.066 ppm 4th-max
  in 2023-2024.
- **CO and NOx have no monitors in the Coastal Bend** — documented as
  strategic gaps in the CO and NOx deep-dive pages.

---

## How to add a new entry

Newest entry at the top. Use this structure:

```markdown
## YYYY-MM-DD · vX.Y.Z — [short summary]

**What changed**

- bullet list

**Why**

- one paragraph or bullet list linking back to the meeting or decision
  that drove the change

**Where the current product lives**

- Neon schema / URL
- GitHub commit or tag
- Live docs URL
- Anything else the team consumes downstream
```

When the entry logs a version bump (e.g. `v0.2.0`), also tag the git
commit — that gives us permanent references we can point at in the
manuscript methods section later.

## Version index

| Version | Date | Headline |
|---|---|---|
| v0.1.6 | 2026-08-26 | SharePoint proposal link surfaced + TCEQ↔AQS reference doc + 2026-08-12 label-catch reconciled (no mislabel — CAMS/AQS ID confusion) |
| v0.1.5 | 2026-08-13 | 3 new meeting notes (07-22, 07-29, 08-12) + Manasa PPT mirrored + scope-doc refinement + CAMS 32/34 label catch documented |
| v0.1.4 | 2026-07-20 | Correction pass (2026-07-08 rewritten) + 2026-07-15 meeting logged + Refinery-Row scope doc + email draft moved to chat |
| v0.1.3 | 2026-07-15 | Seven pollutant deep-dives filled + team PPT briefings archived + 2026-07-08 meeting logged |
| v0.1.2 | 2026-07-08 | Interactive meeting dashboard + Manasa spelling fix |
| v0.1.1 | 2026-07-08 | API/DB-only framing + meeting-notes infra + Pipeline Updates page |
| v0.1.0 | 2026-07-08 | Initial Coastal Bend fork (8 sites, ~1.3 M rows) |
