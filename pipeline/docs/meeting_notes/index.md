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
    { "date": "2026-07-08", "title": "Team PPT briefings (FRM/FEM + method codes) + pipeline walkthrough" },
    { "date": "2026-07-15", "title": "Pollution rose → Refinery-Row directional health study pivot" },
    { "date": "2026-07-22", "title": "Literature-scan check-in (short; Aidan absent)" },
    { "date": "2026-07-29", "title": "Design pivot — K-fold stacked model + Random Forest single-model start" },
    { "date": "2026-08-12", "title": "Proposal-template working session + CAMS site-label catch + UT Austin (Niyogi) signal" },
    { "date": "2026-09-20", "title": "Proposal review + Refinery-Row proximity variable + Oct-4 target for Warden/Jin session" }
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
      "status": "done",
      "completed_at": "2026-07-15 12:00",
      "notes": [
        { "at": "2026-07-15 12:00", "by": "Aidan (v0.1.3)", "body": "pollutants/ozone.md published — ported from Manasa's Pollutant.pptx (south-texas-aq-pipeline). Method 87 UV photometric only, 70 ppb 8-hr MDA8 NAAQS, 2 sites CC West + CC Tuloso, ppb→ppm conversion trap called out." }
      ]
    },
    {
      "id": "manasa-co-gap",
      "owner": "Manasa",
      "text": "CO gap statement — no CO monitoring in Coastal Bend; document gap + strategic options (satellite, upstream Bexar sites, ignore)",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "done",
      "completed_at": "2026-07-15 12:00",
      "notes": [
        { "at": "2026-07-15 12:00", "by": "Aidan (v0.1.3)", "body": "pollutants/co.md published with three strategic options + recommendation (option 1 accept gap for first manuscript, option 3 MOPITT/TROPOMI supplementary if reviewers push). Strategic-option confirmation carried forward as manasa-co-option-confirm." }
      ]
    },
    {
      "id": "aidan-pm25-deepdive",
      "owner": "Aidan",
      "text": "PM2.5 deep-dive — 3 sites with multiple method transitions (Kingsville 702→209, CC Holly 702→209→638). Handle mixed-method years explicitly.",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "done",
      "completed_at": "2026-07-15 12:00",
      "notes": [
        { "at": "2026-07-15 12:00", "by": "Aidan (v0.1.3)", "body": "pollutants/pm25.md published from Aidan's 2026-07-08 briefing PPT (slides 16-29). Includes NAAQS (Feb 2024 tightening 12→9 µg/m³), FRM Appendix L, FEM (BAM 1020 + TEOM-FDMS), 88101 vs 88502 distinction, sensor evolution 2010-2025, met drivers, Coastal Bend 2024 (CC Holly 11.61, Dona Park 10.34 µg/m³ both exceed 9)." }
      ]
    },
    {
      "id": "aidan-pm10-deepdive",
      "owner": "Aidan",
      "text": "PM10 deep-dive — 1 site (CC Holly) with fundamental 2019-2023 discontinuity between method 141 (filter) and method 639 (continuous BAM). Do not model as continuous series.",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "done",
      "completed_at": "2026-07-15 12:00",
      "notes": [
        { "at": "2026-07-15 12:00", "by": "Aidan (v0.1.3)", "body": "pollutants/pm10.md published from Aidan's PPT slides 30-39. Documents CC Holly discontinuity (141 filter 2015-2018 → 5-yr gap → 639 BAM 2024-2025) with explicit warning to not model as continuous series. Saharan dust discussion (Prospero, Bozlaker, Yu). NAAQS 150 µg/m³ + Exceptional Events Rule." }
      ]
    },
    {
      "id": "aidan-nox-gap",
      "owner": "Aidan",
      "text": "NOx gap statement — no NOx monitoring in Coastal Bend. Discuss strategic options (TROPOMI satellite NO2, upstream Bexar context, or reframe ozone modeling to acknowledge NOx as an unquantified confounder).",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "done",
      "completed_at": "2026-07-15 12:00",
      "notes": [
        { "at": "2026-07-15 12:00", "by": "Aidan (v0.1.3)", "body": "pollutants/nox.md published with three strategic options. Recommendation: option 2 (TROPOMI NO2 column via Google Earth Engine) for regime classification via HCHO/NO2 ratio (Duncan 2010). Confirmation carried forward as aidan-nox-option-confirm." }
      ]
    },
    {
      "id": "jasmine-so2-deepdive",
      "owner": "Jasmine",
      "text": "SO2 deep-dive — 3 active sites + CC Holly offline mid-2017. Method 100 pulsed fluorescence throughout. Include wind-rose analysis (your specialty) especially for Dona Park refinery corridor.",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "done",
      "completed_at": "2026-07-15 12:00",
      "notes": [
        { "at": "2026-07-15 12:00", "by": "Aidan (v0.1.3)", "body": "pollutants/so2.md published — ported from Jasmine's 2026-07-08 briefing PPT, expanded to match Aidan's format. UVF method (Thermo TEI 43i), method codes 100 + 92, 75 ppb 1-hr NAAQS (2010), Coastal Bend 3 active sites, CC Holly offline mid-2017. Wind-rose analysis still open (Jasmine's specialty)." }
      ]
    },
    {
      "id": "jasmine-vocs-deepdive",
      "owner": "Jasmine",
      "text": "VOCs deep-dive — 4 sites (CC Palm 1hr; CC Hillcrest/Dona Park/Holly 24hr AutoGC), 46-48 chemicals including 10 HAPs. All 2025-only in current pull.",
      "meeting": "2026-06-24",
      "due": "2026-07-15",
      "status": "done",
      "completed_at": "2026-07-15 12:00",
      "notes": [
        { "at": "2026-07-15 12:00", "by": "Aidan (v0.1.3)", "body": "pollutants/vocs.md published from Aidan's PPT slides 40-54. Chemical families (21 paraffins, 4 cycloalkanes, 12 olefins, 11 aromatics), 10 HAPs, benzene/1,3-butadiene IARC Group 1, NESHAP Subpart CC fenceline, PAMS network, AutoGC + TO-15, ppbC units, CC Palm 3.3M row analysis opportunities." }
      ]
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
        { "at": "2026-07-08 22:00", "by": "Aidan", "body": "v0.1.2: interactive meeting dashboard + Manasa spelling fix." },
        { "at": "2026-07-15 12:00", "by": "Aidan", "body": "v0.1.3: all 7 pollutant deep-dive pages filled + 2 team briefing PPTs archived at briefings/ + 2026-07-08 meeting logged." },
        { "at": "2026-07-15 22:00", "by": "Aidan", "body": "v0.1.4: corrected 2026-07-08 meeting notes (real meeting was the PPT-briefings meeting, not a BREATHE-CC crossover as I initially wrote). PPT files renamed 07-01 → 07-08 to match actual presentation date. Added 2026-07-15 meeting notes capturing the pollution-rose → refinery-row directional health study pivot. Wrote scope doc + Warden/Jin meeting-poll email under proposals/." }
      ]
    },
    {
      "id": "manasa-mirror-ozone-pptx",
      "owner": "Manasa",
      "text": "Mirror Pollutant.pptx (Ozone deck) from parent south-texas-aq-pipeline repo into coastal-bend-aq briefings/ folder for team-wide access. Suggested filename: 2026-06-24_MK_Ozone_briefing.pptx.",
      "meeting": "2026-07-08",
      "due": "2026-07-22",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "manasa-co-option-confirm",
      "owner": "Manasa",
      "text": "Confirm CO gap strategic option (accept gap / import Bexar context / satellite MOPITT-TROPOMI) at next AQ team meeting. Recommendation in pollutants/co.md is option 1 for first manuscript; option 3 as supplementary.",
      "meeting": "2026-07-08",
      "due": "2026-07-22",
      "status": "done",
      "completed_at": "2026-07-08 22:00",
      "notes": [
        { "at": "2026-07-08 22:00", "by": "Team", "body": "Decision at 2026-07-08 PPT meeting: drop CO from the first manuscript scope. No CO monitors anywhere in Coastal Bend; retain the gap statement in pollutants/co.md as a network-limitation note but no satellite/regional import for first paper." }
      ]
    },
    {
      "id": "aidan-nox-option-confirm",
      "owner": "Aidan",
      "text": "Confirm NOx gap strategic option (accept / TROPOMI / Bexar) at next AQ team meeting. Recommendation in pollutants/nox.md is option 2 (TROPOMI NO2 via Google Earth Engine).",
      "meeting": "2026-07-08",
      "due": "2026-07-22",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "all-leads-review-deepdives",
      "owner": "Team",
      "text": "All AQ leads (Aidan, Manasa, Jasmine) review the 7 pollutant deep-dive pages under pollutants/ and flag factual corrections or additions before Q3 team review.",
      "meeting": "2026-07-08",
      "due": "2026-07-22",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-tropomi-prototype",
      "owner": "Aidan",
      "text": "Prototype TROPOMI NO2 pull over Coastal Bend footprint (Google Earth Engine free tier). Only after team endorses option 2 for the NOx gap. Write results into pollutants/nox.md.",
      "meeting": "2026-07-08",
      "due": "2026-08-15",
      "status": "open",
      "completed_at": null,
      "notes": [
        { "at": "2026-07-15 22:00", "by": "Aidan", "body": "Deferred — 2026-07-15 project pivot to Refinery-Row directional health study supersedes the NOx satellite prototype as the top priority. Revisit after novelty/feasibility scan on the new direction." }
      ]
    },
    {
      "id": "manasa-mopitt-prototype",
      "owner": "Manasa",
      "text": "Prototype MOPITT or TROPOMI CO pull over Coastal Bend footprint. Only after team endorses option 3 for the CO gap. Write results into pollutants/co.md.",
      "meeting": "2026-07-08",
      "due": "2026-08-15",
      "status": "open",
      "completed_at": null,
      "notes": [
        { "at": "2026-07-15 22:00", "by": "Aidan", "body": "Deferred — CO was decided out of the first manuscript at 2026-07-08. This item stays open for later manuscripts but is not on the critical path." }
      ]
    },
    {
      "id": "aidan-send-meeting-poll-warden-jin",
      "owner": "Aidan",
      "text": "Send meeting poll (Schej.it) to Dr. Warden and Dr. Jin (and Jasmine's atmospheric-physics mentor) for the next 2 weeks. Purpose: consult on the Refinery-Row directional health-outcome ML study.",
      "meeting": "2026-07-15",
      "due": "2026-07-17",
      "status": "open",
      "completed_at": null,
      "notes": [
        { "at": "2026-07-22 20:00", "by": "Jasmine", "body": "Poll went out but neither Dr. Warden nor Dr. Jin had filled it in by 2026-07-22 meeting time." },
        { "at": "2026-08-12 22:00", "by": "Aidan (2026-08-12 meeting)", "body": "Still pending; team pivoted mid-August to potential Dr. Niyogi (UT Austin) collaboration which may reduce urgency of Warden/Jin session." }
      ]
    },
    {
      "id": "aidan-data-redownload-qc",
      "owner": "Aidan",
      "text": "Full TCEQ re-download for 7 Nueces sites; row-count QC against current Neon schema; document discrepancies.",
      "meeting": "2026-08-12",
      "due": "2026-08-26",
      "status": "in_progress",
      "completed_at": null,
      "notes": [
        { "at": "2026-08-26 14:00", "by": "Aidan (v0.1.6 reconciliation)", "body": "Rescoped: (a) Hyosachi/Huisache is present in Neon with 211,187 rows 2015-2025 (not missing); (b) site labels already correct. Remaining QC work: fresh TCEQ download + row-count reconcile to catch any TCEQ-side QC updates since last ingest, plus decide whether to add TCEQ CAMS 660 (Holly, deactivated 2018), CAMS 664 (Violet, deactivated 2019), or CAMS 314 (National Seashore, active) to the pull. See 13_tceq_cams_aqs_reference.md." }
      ]
    },
    {
      "id": "manasa-sql-rename-sites",
      "owner": "Manasa",
      "text": "Run SQL rename in Neon aq_coastal_bend.site_registry: CAMS 32 label 'Donna' → 'CC Hyosachi'; CAMS 34 label 'Holly' → 'CC Dona Park'. CC Holly (CAMS 660) stays out of scope (deactivated 2018).",
      "meeting": "2026-08-12",
      "due": "2026-08-15",
      "status": "done",
      "completed_at": "2026-08-26 14:00",
      "notes": [
        { "at": "2026-08-26 14:00", "by": "Aidan (v0.1.6 reconciliation)", "body": "NOT NEEDED — verified via live Neon query 2026-08-26 that site_number 32 = 'Corpus Christi Huisache_0032' and site_number 34 = 'Corpus Christi Dona Park_0034'. Labels are already correct. The 2026-08-12 confusion was CAMS ID (TCEQ) vs site_number (AQS/pipeline) — these are different identifiers. See 13_tceq_cams_aqs_reference.md for the full mapping." }
      ]
    },
    {
      "id": "jasmine-tceq-met-var-audit",
      "owner": "Jasmine",
      "text": "Audit TCEQ per-site meteorological variable availability (temperature, wind, wind direction, solar irradiance) across the 7 Nueces sites. Compare against current Open Weather variable set to decide whether to swap or blend sources.",
      "meeting": "2026-08-12",
      "due": "2026-08-26",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "team-fill-proposal-template",
      "owner": "Team",
      "text": "Continue filling the Melaram-Lab Bioinformatics-variant proposal template (research question, hypothesis, variables, methods). Each lead brings 3-4 references to shared Zotero collection before 2026-08-26.",
      "meeting": "2026-08-12",
      "due": "2026-08-26",
      "status": "open",
      "completed_at": null,
      "notes": [
        { "at": "2026-08-12 22:00", "by": "Team", "body": "In-meeting variable table for SO2 filled; wind direction encoding decided (continuous degrees + u/v decomposition + 16 sector categorical for pollution rose)." }
      ]
    },
    {
      "id": "aidan-zotero-invite-onboard",
      "owner": "Aidan",
      "text": "Invite Manasa + Jasmine to shared Zotero collection; onboard Manasa (Zotero-new; comes from EndNote). Convert to EndNote at publication phase.",
      "meeting": "2026-08-12",
      "due": "2026-08-19",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-scheduled-claude-meeting-ingest",
      "owner": "Aidan",
      "text": "Ship a scheduled Claude task that auto-ingests the weekly meeting-summary email and updates meeting_notes/ + dashboard JSON without manual intervention. Demo at 2026-08-26.",
      "meeting": "2026-08-12",
      "due": "2026-08-26",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "jasmine-melaram-niyogi-call",
      "owner": "Jasmine + Melaram",
      "text": "Joint call with Dr. Deb Niyogi (UT Austin, Extreme Weather and Urban Sustainability Lab) Friday 2026-08-14 at noon CT. Assess collaboration: his lab has thunderstorm × aerosol × asthma health data; ours has exposure-side depth.",
      "meeting": "2026-08-12",
      "due": "2026-08-14",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "manasa-map-remove-pm10",
      "owner": "Manasa",
      "text": "Remove PM10 from the site map + send a cleaner version. (Aidan's request during 2026-09-20 proposal review.)",
      "meeting": "2026-09-20",
      "due": "2026-09-21",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "manasa-map-city-limits-color",
      "owner": "Manasa",
      "text": "Change color of the city-limits rectangle so it does not visually collide with the Refinery-Row overlay (currently both red).",
      "meeting": "2026-09-20",
      "due": "2026-09-21",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "manasa-map-refinery-overlay",
      "owner": "Manasa",
      "text": "Add a Refinery-Row overlay rectangle to the site map to clearly mark the corridor.",
      "meeting": "2026-09-20",
      "due": "2026-09-21",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-timeline-note",
      "owner": "Aidan",
      "text": "Add a note in the proposal doc that the timeline is a living artefact and updates continuously as the project progresses.",
      "meeting": "2026-09-20",
      "due": "2026-09-21",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "jasmine-schej-poll-warden-jin-melaram",
      "owner": "Jasmine",
      "text": "Send Schej poll Monday 2026-09-22 morning for a meeting with Dr. Melaram, Dr. Jin, and Dr. Warden. Target: week of 2026-10-04.",
      "meeting": "2026-09-20",
      "due": "2026-09-22",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-annotation-skill",
      "owner": "Aidan",
      "text": "Create + share the PDF annotation Claude skill with the team (email delivery).",
      "meeting": "2026-09-20",
      "due": "2026-09-27",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-cc-aq-study-skill",
      "owner": "Aidan",
      "text": "Create Corpus Christi Air Quality — Wind Rose Study Claude skill with full study context, GitHub links, and MCP-connection guidance for teammates.",
      "meeting": "2026-09-20",
      "due": "2026-09-21",
      "status": "done",
      "completed_at": "2026-09-20 19:00",
      "notes": [
        { "at": "2026-09-20 19:00", "by": "Aidan (v0.1.10)", "body": "Skill landed at ~/.claude/skills/corpus-christi-aq-wind-rose-study/; packaged for team export at pipeline/skill_export/. See Pipeline Updates v0.1.10 entry." }
      ]
    },
    {
      "id": "aidan-refinery-row-proximity-variable",
      "owner": "Aidan",
      "text": "Add Refinery-Row proximity variable + use wind direction relative to it as a derived predictor (formalises the Refinery-Row bearing construct). Include sensitivity analysis over cone width + distance weighting.",
      "meeting": "2026-09-20",
      "due": "2026-10-04",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "aidan-text-manasa-upload-done",
      "owner": "Aidan",
      "text": "Text Manasa when site-specific weather data upload to Neon is done so she can update the Plan Datasets section of the proposal draft.",
      "meeting": "2026-09-20",
      "due": "2026-09-21",
      "status": "done",
      "completed_at": "2026-09-20 17:00",
      "notes": [
        { "at": "2026-09-20 17:00", "by": "Aidan (v0.1.8)", "body": "Data loaded to Neon (382,654 rows). Aidan to text Manasa." }
      ]
    },
    {
      "id": "aidan-manasa-ppt-mirror",
      "owner": "Aidan",
      "text": "Mirror Manasa's Pollutant.pptx (Ozone + CO briefing) into pipeline briefings folder as 2026-07-08_MK_Ozone_CO_briefing.pptx.",
      "meeting": "2026-07-08",
      "due": "2026-08-13",
      "status": "done",
      "completed_at": "2026-08-13 15:00",
      "notes": [
        { "at": "2026-08-13 15:00", "by": "Aidan (v0.1.5)", "body": "Copied from OneDrive/Downloads/Pollutant.pptx into pipeline/docs/briefings/. Briefings archive index updated." }
      ]
    },
    {
      "id": "aidan-text-jasmine-recap",
      "owner": "Aidan",
      "text": "Text Jasmine the 2026-07-15 meeting recap so she knows the refinery-row directional health study crystallized after she left the call.",
      "meeting": "2026-07-15",
      "due": "2026-07-17",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "all-literature-novelty-scan",
      "owner": "Team",
      "text": "Literature scan: has anyone published refinery-centered directional pollution × health-outcome analysis? Keywords: openair R, wind-rose-informed predictive modeling, industrial point-source attribution, coastal-breeze health effects. Bring findings to 2026-07-22.",
      "meeting": "2026-07-15",
      "due": "2026-07-22",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "all-feasibility-check-health-data",
      "owner": "Team",
      "text": "Feasibility check: what Texas hospital / ED datasets are realistically obtainable at residential-zone × time resolution? Needed as the ML target for the new project direction.",
      "meeting": "2026-07-15",
      "due": "2026-07-22",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "team-review-scope-doc",
      "owner": "Team",
      "text": "Review proposals/refinery_row_directional_health.md and flag anything missing or wrong before the joint session with Warden/Jin.",
      "meeting": "2026-07-15",
      "due": "2026-07-22",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "melaram-nihs-r25-friday",
      "owner": "Dr. Melaram",
      "text": "Meeting NIHS on Friday about R25 grant. Explore whether the Refinery-Row directional health project can anchor a resubmission of the climate-change seed grant that was previously scored high on novelty/significance but denied on feasibility.",
      "meeting": "2026-07-15",
      "due": "2026-07-17",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "team-climate-change-grant-resubmit",
      "owner": "Team",
      "text": "Evaluate revising/resubmitting the climate-change seed grant with the Refinery-Row directional health study as the anchor. Depends on Dr. Melaram's NIHS meeting Friday.",
      "meeting": "2026-07-15",
      "due": "2026-08-31",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "team-vocs-retropull-decision",
      "owner": "Team",
      "text": "Decide: TCEQ retro-pull for pre-2025 VOCs, or accept 2025-only? Becomes more urgent post-pivot — the new project needs multi-year VOC coverage. Carried from 2026-06-24, re-flagged 2026-07-15.",
      "meeting": "2026-07-15",
      "due": "2026-07-29",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "team-analytical-tibble-q3-rescoped",
      "owner": "Team",
      "text": "First analytical tibble (site × date × pollutant × weather at 75%-complete-day resolution). Re-scoped 2026-07-15 for the new refinery-row direction — needs wind vector + direction from Refinery Row per row. Q3 2026 target.",
      "meeting": "2026-07-15",
      "due": "2026-09-30",
      "status": "open",
      "completed_at": null,
      "notes": []
    },
    {
      "id": "all-leads-methods-paragraph",
      "owner": "Team",
      "text": "Each AQ lead drafts a methods-section paragraph for their assigned pollutant, based on the deep-dive markdown page. Consolidates into the first manuscript draft at Q3 team review.",
      "meeting": "2026-07-08",
      "due": "2026-09-01",
      "status": "open",
      "completed_at": null,
      "notes": []
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
| **2026-09-20** | Aidan, Jasmine, Manasa | Proposal review + Refinery-Row proximity variable + Oct-4 target for Warden/Jin joint session | [minutes](./2026-09-20.md) |
| **2026-08-12** | Aidan (late), Dr. Melaram, Manasa, Jasmine | Proposal-template working session; CAMS 32/34 site-label catch; UT Austin (Dr. Niyogi) collaboration signal; bi-weekly cadence adopted | [minutes](./2026-08-12.md) |
| **2026-07-29** | Dr. Melaram, Manasa, Jasmine | Design pivot — K-fold stacked model + Random Forest single-model start; DSHS ED-visit data as target-fallback | [minutes](./2026-07-29.md) |
| **2026-07-22** | Manasa, Jasmine | Literature-scan check-in (short); Ecuador 2017 PM2.5 paper surfaced | [minutes](./2026-07-22.md) |
| **2026-07-15** | Aidan, Dr. Melaram, Manasa, Jasmine (partial) | Pollution rose (Jasmine) → refinery-row directional health study (Aidan/Manasa) — core project pivot | [minutes](./2026-07-15.md) |
| **2026-07-08** | Aidan, Dr. Melaram, Manasa, Jasmine | Three-way PPT briefings on assigned pollutants + FRM/FEM + method codes + pipeline walkthrough | [minutes](./2026-07-08.md) |
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

### Open (as of v0.1.5, 2026-08-13)

**High-urgency (this week):**

- [ ] **Aidan** — Full TCEQ re-download for 7 Nueces sites + row-count QC against Neon + push CC Hyosachi to Neon (~1 hour target — plan in chat)
- [ ] **Manasa** — SQL rename in Neon: CAMS 32 → CC Hyosachi; CAMS 34 → CC Dona Park (committed 2026-08-12)
- [ ] **Jasmine + Dr. Melaram** — Joint call with Dr. Deb Niyogi (UT Austin) Fri 2026-08-14 @ noon CT

**Before 2026-08-26:**

- [ ] **Jasmine** — Audit TCEQ per-site meteorological variable availability across the 7 Nueces sites vs current Open Weather set
- [ ] **Team** — Continue filling proposal template; each brings 3-4 references to Zotero
- [ ] **Aidan** — Invite Manasa + Jasmine to shared Zotero collection; onboard Manasa
- [ ] **Aidan** — Ship scheduled-Claude meeting-notes-ingestion automation; demo 2026-08-26

**Carried / standing:**

- [ ] **Aidan** — Follow up with Warden + Jin on Schej.it poll (still open)
- [ ] **Aidan** — Text Jasmine the 2026-07-15 recap (originated 2026-07-15)
- [ ] **Team** — Contact Delaney (TCEQ) for method-code confirmations — Jasmine has the relationship
- [ ] **All AQ leads** — Review 7 pollutant deep-dive pages + flag corrections
- [ ] **All AQ leads** — Draft methods-section paragraph per pollutant, Q3 target
- [ ] **Team** — Decide: VOC retro-pull (2016+) or 2025-only
- [ ] **Team** — Decide: EPA-network Cameron/Hidalgo boundary sites for kriging
- [ ] **Team** — First frozen analytical tibble (site × date × pollutant × weather + wind vector from Refinery Row) — Q3 2026
- [ ] **Team** — Redo raw TCEQ ingest to preserve method codes per row (folds into Aidan's re-download this week)
- [ ] **Team** — Requery 24-hr VOCs where 1-hr was empty (folds into Aidan's re-download)
- [ ] **Dr. Melaram** — R25 grant work; interim report due end of month; explore climate-change grant resubmit

### Completed

- [x] **Aidan** — Fork Neon schema to `aq_coastal_bend` (2026-07-08)
- [x] **Aidan** — Add Jasmine as Neon admin (2026-06-24)
- [x] **Aidan** — Publish first pipeline docs site with availability
      matrices + method-code timelines (2026-07-08)
- [x] **Manasa** — Ozone deep-dive published at `pollutants/ozone.md` (2026-07-15, v0.1.3)
- [x] **Manasa** — CO gap statement published at `pollutants/co.md` (2026-07-15, v0.1.3)
- [x] **Aidan** — PM2.5 deep-dive published at `pollutants/pm25.md` (2026-07-15, v0.1.3)
- [x] **Aidan** — PM10 deep-dive published at `pollutants/pm10.md` (2026-07-15, v0.1.3)
- [x] **Aidan** — NOx gap statement published at `pollutants/nox.md` (2026-07-15, v0.1.3)
- [x] **Jasmine** — SO₂ deep-dive published at `pollutants/so2.md` (2026-07-15, v0.1.3)
- [x] **Jasmine** — VOCs deep-dive published at `pollutants/vocs.md` (2026-07-15, v0.1.3)
- [x] **Aidan** — Attach 2 team briefing PPTs at `briefings/` (2026-07-15, v0.1.3)
- [x] **Team** — Decided at 2026-07-08 to drop CO from first manuscript scope (no monitors in Coastal Bend)
- [x] **Aidan** — Mirror Manasa's Ozone/CO PPT into briefings/ (2026-08-13, v0.1.5)
- [x] **Team** — Bi-weekly meeting cadence adopted for fall; next meeting 2026-08-26 (2026-08-12)
- [x] **Team** — Refined research question with grad-level specificity: SO₂ + Ozone, 2015-2025, Random Forest, 7 meteorological covariates (2026-08-12)
- [x] **Team** — Adopted K-fold stacked model design (base model now, health-outcome stack later) (2026-07-29)
