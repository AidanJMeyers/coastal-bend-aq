# 11 — Team Assignments

Locked in during the 2026-07-08 Aidan × Jasmine sync (Manasa was
managing a mosquito-abatement public event and joined asynchronously).

## Pollutant leads

| Pollutant | Lead | Notes |
|---|---|---|
| **Ozone (44201)** | Manasa Kuchavaram | 2 sites in Coastal Bend (CC West, CC Tuloso). Clean data, single method code (87). |
| **CO (42101)** | Manasa Kuchavaram | **⚠ No CO monitors in the Coastal Bend.** Deliverable = write the reference page + confirm gap. |
| **PM2.5 (88101, 88502)** | Aidan Meyers | 3 sites (Kingsville, CC Dona Park, CC Holly). Multiple method transitions to audit. |
| **PM10 (81102)** | Aidan Meyers | 1 site (CC Holly), fundamental discontinuity 2019-2023. Critical to document. |
| **NOx family (42601/2/3)** | Aidan Meyers | **⚠ No NOx monitors in the Coastal Bend.** Deliverable = confirm gap + describe upstream Bexar sites for context. |
| **SO₂ (42401)** | Jasmine Trevino | 3 active sites + 1 offline-since-2017 (CC Holly). Steady method 100. |
| **VOCs (43xxx + 45xxx)** | Jasmine Trevino | 4 sites, 2025-only in current pull. 46-48 chemicals × 10 HAPs. |

## Working cadence

- **Weekly sync:** Wednesday, same time. Recurring calendar invite covers
  Aidan + Jasmine; Manasa joins by phone if her public-health schedule
  allows.
- **Dr. Melaram check-ins:** Aidan calls Dr. Melaram nightly; team
  updates roll up through those calls.
- **Pipeline updates:** every meeting, the AI-produced meeting notes
  land in the pipeline docs. See the
  [south-texas-aq notebooks](https://github.com/AidanJMeyers/south-texas-aq-pipeline/tree/main/AM_R_Notebooks)
  for the workflow.

## Communication

- **Text (fast)** for schedule / running-late / quick blockers. Aidan
  and Jasmine exchanged numbers on 2026-07-08.
- **Teams chat** for artifact sharing (SQL, screenshots, links).
- **Email** for official records (Dr. Melaram + PI review).

## Cross-cutting deliverables (shared)

| Deliverable | Lead | Reviewers |
|---|---|---|
| [Data availability page](./04_data_availability.md) | Aidan | Manasa, Jasmine |
| [Method-code reference](./05_method_codes_reference.md) | Aidan | Pollutant leads confirm their own sections |
| Neon `aq_coastal_bend` schema + Data API | Aidan | — |
| Weekly meeting minutes → pipeline docs | Rotating | Whole team |
| Manuscript draft v0.1 | Aidan (lead), all authors | Dr. Melaram + Dr. Jin |

## Onboarding checklist for Jasmine

- [x] Text messaging channel established (2026-07-08)
- [x] Access to Neon (`aq_coastal_bend` schema) — granted via admin role
- [x] GitHub repo access — coastal-bend-aq (this repo)
- [x] Pipeline URL bookmarked — this site
- [ ] SQL client set up (Colab / Python / R / DataGrip / etc.)
- [ ] First deep-dive page draft (SO₂) — target 2026-07-15
- [ ] First deep-dive page draft (VOCs) — target 2026-07-22

## Onboarding notes for anyone else joining

Read this order:
1. [Home](./index.md) — the 9-of-11-counties-have-no-monitors framing
2. [04 Data availability](./04_data_availability.md) — the matrix
3. [05 Method-code reference](./05_method_codes_reference.md) — the audit
4. [08 Neon SQL access](./08_usage_neon.md) — how to query
5. Your assigned pollutant page — fill in the template
