# Pipeline Updates

**Running log** of every change to the Coastal Bend pipeline —
database schema updates, docs restructures, new team decisions, method
audits. Every entry answers **what** changed, **when**, **why**, and
**where the current product lives** on the day of the entry.

Newest first. Older entries never edited in place — new entries
supersede.

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
| v0.1.2 | 2026-07-08 | Interactive meeting dashboard + Manasa spelling fix |
| v0.1.1 | 2026-07-08 | API/DB-only framing + meeting-notes infra + Pipeline Updates page |
| v0.1.0 | 2026-07-08 | Initial Coastal Bend fork (8 sites, ~1.3 M rows) |
