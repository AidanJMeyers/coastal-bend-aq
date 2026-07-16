# Team Meeting Notes — Interactive Dashboard

**Kanban board + action-item tracker for every recurring team meeting.**
Click any card to expand, change status, or add a progress note. Your
edits persist in your browser via `localStorage` — to make them
permanent, use **Export JSON** and paste back into this file.

<div class="cb-hint">
  <strong>Workflow.</strong> Every week: (1) drop the transcript into the
  next-meeting page under
  <a href="#new-meeting-workflow">§ New meeting workflow</a>,
  (2) use the dashboard below to check off completed actions and add
  progress notes, (3) hit <strong>Export JSON</strong>, paste the
  result into the source of this file (replacing the
  <code>action-items</code> block), and commit. Everyone sees the
  same board.
</div>

<script id="action-items" type="application/json">
{
  "meetings": [
    { "date": "2026-06-24", "title": "Scope pivot to Coastal Bend" },
    { "date": "2026-07-15", "title": "BREATHE-CC × Coastal Bend AQ sync (REDCap API + Jasmine PPT feedback)" }
  ],
  "items": [
    {
      "id": "aidan-melaram-call-2606",
      "owner": "Aidan",
      "text": "Call Dr. Melaram tonight (he flies out tomorrow) to confirm the scope pivot, discuss method-code strategy, and align on the deferred health-outcomes layer",
      "meeting": "2026-06-24",
      "due": "2026-06-25",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-fork-neon",
      "owner": "Aidan",
      "text": "Fork the Neon `aq` schema to a Coastal Bend version (aq_coastal_bend)",
      "meeting": "2026-06-24",
      "due": "2026-07-08",
      "status": "done",
      "completed_at": "2026-07-08 14:20",
      "notes": [
        { "at": "2026-07-08 14:20", "by": "Aidan", "body": "Schema created via Neon MCP transaction: CREATE SCHEMA aq_coastal_bend + CREATE TABLE ... AS SELECT ... WHERE county_code IN (273, 355) for all 10 tables. Indexes + grants + default privileges applied." }
      ]
    },
    {
      "id": "aidan-jasmine-comms",
      "owner": "Aidan",
      "text": "Text Jasmine phone number so we have a fast comms channel + add her as Neon admin",
      "meeting": "2026-06-24",
      "due": "2026-06-24",
      "status": "done",
      "completed_at": "2026-06-24 15:05",
      "notes": [
        { "at": "2026-06-24 15:05", "by": "Aidan", "body": "Both done during the call. Jasmine's Islander email (J.Trevino79@islander.tamucc.edu) added to Neon admin role." }
      ]
    },
    {
      "id": "manasa-ozone-deepdive",
      "owner": "Manasa",
      "text": "Ozone deep-dive markdown page — chemistry / instrumentation (single method 87, clean) / NAAQS / method-code timeline / meteorological drivers / literature review",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "manasa-co-gap",
      "owner": "Manasa",
      "text": "CO gap statement — no CO monitoring in Coastal Bend; document gap + strategic options (satellite, upstream Bexar sites, ignore)",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-pm25-deepdive",
      "owner": "Aidan",
      "text": "PM2.5 deep-dive — 3 sites with multiple method transitions (Kingsville 702→209, CC Holly 702→209→638). Handle mixed-method years explicitly.",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-pm10-deepdive",
      "owner": "Aidan",
      "text": "PM10 deep-dive — 1 site (CC Holly) with fundamental 2019-2023 discontinuity between method 141 (filter) and method 639 (continuous BAM). Do not model as continuous series.",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-nox-gap",
      "owner": "Aidan",
      "text": "NOx gap statement — no NOx monitoring in Coastal Bend. Discuss strategic options (TROPOMI satellite NO2, upstream Bexar context, or reframe ozone modeling to acknowledge NOx as an unquantified confounder).",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "jasmine-so2-deepdive",
      "owner": "Jasmine",
      "text": "SO2 deep-dive — 3 active sites + CC Holly offline mid-2017. Method 100 pulsed fluorescence throughout. Include wind-rose analysis (your specialty) especially for Dona Park refinery corridor.",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "jasmine-vocs-deepdive",
      "owner": "Jasmine",
      "text": "VOCs deep-dive — 4 sites (CC Palm 1hr; CC Hillcrest/Dona Park/Holly 24hr AutoGC), 46-48 chemicals including 10 HAPs. All 2025-only in current pull.",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "team-contact-delaney",
      "owner": "Team",
      "text": "Contact Delaney (TCEQ) for method-code semantics + instrument-model confirmations. Jasmine has the relationship; Aidan drafts the question list.",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "team-vocs-retropull",
      "owner": "Team",
      "text": "Decide: TCEQ retro-pull for pre-2025 VOCs, or accept 2025-only?",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "team-boundary-sites",
      "owner": "Team",
      "text": "Decide: import EPA-network Cameron/Hidalgo boundary sites to strengthen spatial interpolation, or restrict scope to Nueces + Kleberg only?",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-publish-docs-v0-1-0",
      "owner": "Aidan",
      "text": "Publish first version of pipeline docs site with availability matrices + method-code timelines",
      "meeting": "2026-06-24",
      "due": "2026-07-08",
      "status": "done",
      "completed_at": "2026-07-08 16:00",
      "notes": [
        { "at": "2026-07-08 16:00", "by": "Aidan", "body": "v0.1.0 shipped. Live at aidanjmeyers.github.io/coastal-bend-aq." },
        { "at": "2026-07-08 20:15", "by": "Aidan", "body": "v0.1.1 followed: API/DB-only framing + meeting-notes infra + Pipeline Updates page." },
        { "at": "2026-07-08 22:00", "by": "Aidan", "body": "v0.1.2: interactive meeting dashboard + Manasa spelling fix." }
      ]
    }
  ]
}
</script>

## Dashboard

<div class="cb-toolbar">
  <div class="cb-toolbar__group">
    <span class="cb-toolbar__label">Owner:</span>
    <div id="cb-owner-chips" class="cb-toolbar__group"></div>
  </div>
  <div class="cb-toolbar__group">
    <button id="cb-filter-overdue" class="cb-chip"></button>
  </div>
  <div class="cb-toolbar__group" style="flex: 1; justify-content: flex-end;">
    <input id="cb-search" class="cb-search" placeholder="Search action items..." type="search">
  </div>
</div>

<div class="cb-toolbar" style="margin-top:-.5rem;">
  <div class="cb-toolbar__group" style="flex: 1;">
    <span class="cb-toolbar__label">Meeting:</span>
    <div id="cb-meeting-chips" class="cb-toolbar__group"></div>
  </div>
  <div class="cb-toolbar__group">
    <button id="cb-btn-add" class="cb-btn cb-btn--ghost">+ Add item</button>
  </div>
</div>

<div id="cb-progress" class="cb-progress"></div>

<div id="cb-kanban" class="cb-kanban"></div>

## Sync your changes back to the file

Your check-offs and notes live in the browser until you export. To make
them permanent for the whole team:

1. **Export JSON** — clicks below.
2. **Copy the JSON** — it lands in the textarea (auto-selected).
3. **Edit `pipeline/docs/meeting_notes/index.md`** — replace the
   contents of the `<script id="action-items" type="application/json">`
   block with what you copied.
4. **Commit and push.** GitHub Pages redeploys; everyone sees the new
   baseline state.

<div class="cb-export">
  <div class="cb-export__title">Export current dashboard state</div>
  <div class="cb-export__desc">
    Generates the exact JSON block to paste back into this file's
    <code>action-items</code> script tag. Only your local changes
    (checks + notes + added items) will be included in the export;
    starting state comes from the file itself.
  </div>
  <div class="cb-export__actions">
    <button id="cb-btn-export" class="cb-btn">📋 Export JSON</button>
    <button id="cb-btn-reset" class="cb-btn cb-btn--danger">↺ Discard local edits</button>
  </div>
  <textarea id="cb-export-textarea" class="cb-export__textarea cb-hidden"
            readonly aria-label="Exported JSON"></textarea>
</div>

## Meeting archive

| Date | Attendees | Focus | Minutes |
|---|---|---|---|
| **2026-06-24** | Aidan, Jasmine (Manasa async) | Scope pivot to Coastal Bend + method-code strategy + team assignments | [minutes](./2026-06-24.md) |

## New-meeting workflow (weekly)

At the start of each week Aidan gives Claude the transcript. Claude
regenerates this dashboard from scratch by:

1. **Adding a new file** at `meeting_notes/YYYY-MM-DD.md` with the
   full write-up (attendees, decisions, discussion, action items).
   Use [`_template.md`](./_template.md) as the starting scaffold.
2. **Appending to the meetings array** in the JSON block above:
   ```json
   { "date": "YYYY-MM-DD", "title": "Short focus" }
   ```
3. **Appending new action items** to the items array with the new
   meeting's date. Carrying forward any still-open items from prior
   meetings **unchanged** (their ids should not change, so
   localStorage stays in sync for team members).
4. **Adding a row** to the "Meeting archive" table above.
5. **Adding a Pipeline Updates entry** on
   [`pipeline_updates.md`](../pipeline_updates.md) if the schema or
   architecture changed.

The dashboard renders itself from that JSON block — no other
edits required.

## Fallback: markdown checklist view

If JavaScript is disabled or you're reading the source directly on
GitHub, here's the same action list rendered as plain markdown
checkboxes. **This is view-only** — the dashboard above is the
source of truth.

### Open

- [ ] **Aidan** — Call Dr. Melaram to confirm scope pivot
      (originated 2026-06-24, blocking on his travel)
- [ ] **Aidan** — Reach out to Delaney (TCEQ) — coordinate with Jasmine
- [ ] **Manasa** — Ozone deep-dive draft, due 2026-07-15
- [ ] **Manasa** — CO gap statement, due 2026-07-15
- [ ] **Aidan** — PM2.5 deep-dive draft, due 2026-07-15
- [ ] **Aidan** — PM10 deep-dive draft, due 2026-07-15
- [ ] **Aidan** — NOx gap statement, due 2026-07-15
- [ ] **Jasmine** — SO2 deep-dive draft, due 2026-07-15
- [ ] **Jasmine** — VOCs deep-dive draft, due 2026-07-15
- [ ] **Team** — Decide: VOC retro-pull (2016+) or 2025-only, due 2026-07-15
- [ ] **Team** — Decide: EPA-network boundary sites for kriging, due 2026-07-15
- [ ] **Team** — First analytical tibble frozen (site × date × pollutant ×
      weather at 75%-complete-day resolution) — target Q3 2026

### Completed

- [x] **Aidan** — Fork Neon schema to `aq_coastal_bend` (2026-07-08)
- [x] **Aidan** — Add Jasmine as Neon admin (2026-06-24)
- [x] **Aidan** — Publish first pipeline docs site with availability
      matrices + method-code timelines (2026-07-08)
