# TCEQ CAMS ↔ EPA AQS Site Reference — Coastal Bend

**Authoritative mapping** between the two identifier systems the team keeps
mixing up, plus the ground-truth list of every monitoring site TCEQ has
run (active or deactivated) in the 11-county Coastal Bend region.

Compiled from a live Neon `aq_coastal_bend.site_registry` query cross-
checked against [TCEQ TAMIS Region 14 (Corpus Christi–Victoria) daily
summary](https://www.tceq.texas.gov/cgi-bin/compliance/monops/daily_summary.pl?region=14)
on 2026-08-26.

## 0. The two identifier systems (READ FIRST)

| System | Owner | What it is | Example |
|---|---|---|---|
| **TCEQ CAMS ID** | TCEQ | Sequential Texas-only station number in TCEQ's air-monitoring network. Used on the TAMIS portal, TCEQ site photos, TCEQ station reports. | CAMS 98, CAMS 199, CAMS 660 |
| **EPA AQS `site_number`** | EPA | Last 4 digits of the 9-digit AQS ID (`SSCCCNNNN` = state + county + site). Used in Neon `site_registry.site_number`, in EPA AQS query, and in our pipeline everywhere. | 25 (CC West), 32 (Huisache), 34 (Dona Park) |
| **AQS ID (`aqsid`)** | EPA | Full 9-digit ID: state code + county code + site_number. | `483550025` = TX (48) + Nueces (355) + site 25 |

**They are not the same number.** TCEQ CAMS 98 in the TAMIS portal is
EPA AQS site `483550032` (site_number 32) in the pipeline. When Aidan
said "CAMS 32" in the 2026-08-12 meeting, he was reading the pipeline's
`site_number` — not the TCEQ CAMS ID.

**Practical implication:** when redownloading from TCEQ TAMIS, query by
TCEQ CAMS number (e.g. CAMS 98). When joining, filter, or verifying in
the pipeline, use the AQS `site_number` (32) or full `aqsid`
(`483550032`).

## 1. Active Coastal Bend sites in current pipeline (Neon)

Live snapshot from `aq_coastal_bend.site_registry` on 2026-08-26:

| AQS ID | site_number | Site name (as in Neon) | County | Hourly pollutants | 24-hr / VOC | Date range | Rows |
|---|---:|---|---|---|---|---|---:|
| 482730314 | 314 | Kingsville_0314 | Kleberg | PM2.5 | — | 2015-01-01 → 2025-05-07 | 80,418 |
| 483550025 | 25 | Corpus Christi West_0025 | Nueces | Ozone; SO₂ | — | 2015-01-01 → 2025-12-31 | 184,842 |
| 483550026 | 26 | Corpus Christi Tuloso_0026 | Nueces | Ozone; SO₂ | — | 2015-01-01 → 2025-12-31 | 173,063 |
| 483550029 | 29 | Corpus Christi Hillcrest_0029 | Nueces | — | 24-hr VOCs | 2025-01-01 → 2025-10-28 | 2,352 |
| 483550032 | **32** | Corpus Christi Huisache_0032 | Nueces | PM2.5; SO₂ | 24-hr VOCs | 2015-01-01 → 2025-12-31 | 211,187 |
| 483550034 | **34** | Corpus Christi Dona Park_0034 | Nueces | PM10; PM2.5; SO₂ | 24-hr VOCs | 2015-01-01 → 2025-12-31 | 123,533 |
| 483550083 | 83 | Corpus Christi Palm_0083 | Nueces | — | 1-hr VOCs | 2025-01-01 → 2025-12-31 | 336,922 |
| 483551024 | 1024 | Williams Park | Nueces | — | — | (disabled) | 0 |

**8 total (7 active + 1 disabled).** Kleberg has 1 site (Kingsville);
Nueces has 7. The other 9 Coastal Bend counties — Aransas, Bee, Brooks,
Duval, Jim Wells, Kenedy, Live Oak, Refugio, San Patricio — have zero
monitoring in current TCEQ pull.

## 2. TCEQ Region 14 CAMS list — Coastal Bend counties only

TCEQ Region 14 covers Corpus Christi–Victoria and includes both Coastal
Bend counties and Victoria (out of scope). Filtered to Coastal Bend only:

### Currently active on TCEQ

| CAMS ID | TCEQ site name | County | Likely AQS mapping | In our Neon pull? |
|---|---|---|---|---|
| CAMS 4 | Corpus Christi West | Nueces | site_number 25 | ✅ yes |
| CAMS 21 | Corpus Christi Tuloso | Nueces | site_number 26 | ✅ yes |
| CAMS 83 | Corpus Christi Palm | Nueces | site_number 83 (VOCs only) | ✅ yes |
| CAMS 98 | Corpus Christi Huisache | Nueces | site_number 32 (candidate) | ✅ likely — Huisache is CAMS 98/149/155 group |
| CAMS 149 | Corpus Christi Huisache | Nueces | — | ⚠ unclear if separate site or co-located instrument |
| CAMS 155 | Corpus Christi Huisache | Nueces | — | ⚠ unclear |
| CAMS 168 | Corpus Christi Hillcrest | Nueces | site_number 29 (candidate) | ✅ likely — Hillcrest is CAMS 168/170/195 group |
| CAMS 170 | Corpus Christi Hillcrest | Nueces | — | ⚠ unclear |
| CAMS 195 | Corpus Christi Hillcrest | Nueces | — | ⚠ unclear |
| CAMS 199 | Dona Park | Corpus Christi (Nueces) | site_number 34 (candidate) | ✅ likely — Dona Park is CAMS 199/635 group |
| CAMS 314 | National Seashore | Kenedy or Kleberg (verify) | not in Neon | ❌ **missing** — potential add |
| CAMS 635 | Dona Park | Corpus Christi (Nueces) | — | ⚠ unclear if separate from CAMS 199 |
| CAMS 1024 | Williams Park | Nueces | site_number 1024 | 🟡 in Neon but disabled |

**Note on the CAMS-cluster pattern (98/149/155, 168/170/195, 199/635):**
TCEQ often maintains multiple CAMS IDs at a single physical site to
distinguish instruments (e.g. one CAMS number per analyzer or per
parameter class). EPA's AQS collapses these into a single AQS
`site_number`, which is what our pipeline uses. This means **one AQS
site_number can span multiple TCEQ CAMS IDs at the same location.**

### Deactivated (historical) — in Coastal Bend counties

| CAMS ID | Site | County | Deactivated |
|---|---|---|---|
| CAMS 121 | Corpus Navigation | Nueces | 2002-10-02 |
| CAMS 164 | Corpus Poth | Nueces | 1997-12-24 |
| CAMS 641 | Beeville Airport | Bee | 2006-10-18 |
| CAMS 659 | Aransas Pass | Aransas / San Patricio | 2016-05-31 |
| CAMS 660 | Holly Road | Nueces | 2018-12-03 |
| CAMS 664 | Violet | Nueces | 2019-02-12 |
| CAMS 685 | Ingleside | San Patricio | 2019-02-12 |
| CAMS 686 | Odem | San Patricio | 2016-05-31 |
| CAMS 687 | Taft | San Patricio | 2016-05-31 |
| CAMS 629 | Port Grain Elevator | (verify county) | 2016-05-23 |
| CAMS 630 | J.I. Hailey | (verify county) | 2016-05-23 |
| CAMS 631 | Inner Harbor | (verify county) | 2012-05-15 |
| CAMS 632 | FHR Easement | (verify county) | 2016-05-23 |
| CAMS 633 | Solar Estates | (verify county) | 2017-05-31 |
| CAMS 634 | Oak Park | (verify county) | 2016-05-23 |

**Redownload consideration.** For a 2015–2025 window, sites deactivated
**before 2015** (Navigation, Poth, Beeville Airport) are out of scope
entirely. Sites deactivated **between 2015 and 2019** (Aransas Pass,
Holly Road, Violet, Ingleside, Odem, Taft, Port Grain Elevator, J.I.
Hailey, FHR Easement, Solar Estates, Oak Park) have partial 2015–2018/19
data that might be worth pulling depending on scope — especially the
Nueces-County ones (Holly, Violet) if the analysis wants pre-2019
context.

## 3. Reconciliation summary for the 2026-08-26 QC pass

Cross-checking the meeting's flagged issues against the live Neon query:

| Flagged 2026-08-12 | Reality per 2026-08-26 Neon query | Action |
|---|---|---|
| "CAMS 32 mislabeled as Donna" | Neon `site_name` = `Corpus Christi Huisache_0032` ✅ | No SQL rename needed. Manasa's SQL item can be closed. |
| "CAMS 34 mislabeled as Holly" | Neon `site_name` = `Corpus Christi Dona Park_0034` ✅ | Same — no rename needed. |
| "CC Huisache missing from Neon" | Present with 211,187 rows, 2015–2025 full range ✅ | No push needed. |
| "CC Holly deactivated 2018" | Correctly absent from schema ✅ | Consistent with TCEQ CAMS 660 deactivation 2018-12-03. |

**What's actually worth doing in the QC pass:**

1. **Row-count reconcile against fresh TCEQ downloads** — see whether
   TCEQ has published any QC-updated historical records since the
   pipeline's last ingest snapshot.
2. **Consider adding the deactivated Nueces sites** (Holly CAMS 660,
   Violet CAMS 664) if the 2015–2018 window matters for pre-deactivation
   comparison.
3. **Consider adding National Seashore (CAMS 314)** — the only Kenedy /
   Kleberg-adjacent site we're missing.
4. **Verify the CAMS-cluster mapping** — confirm whether AQS
   `site_number 32` actually spans CAMS 98 + 149 + 155 (co-located
   instruments), or whether one of those is a separate physical site
   that should have its own AQS ID.

## 4. County-code reference (FIPS)

For SQL filters and cross-checks:

| County | FIPS | Sites in Coastal Bend scope? |
|---|---:|---|
| Aransas | 007 | 0 |
| Bee | 025 | 0 |
| Brooks | 047 | 0 |
| Duval | 131 | 0 |
| Jim Wells | 249 | 0 |
| Kenedy | 261 | 0 (verify National Seashore county) |
| Kleberg | 273 | 1 (Kingsville_0314) |
| Live Oak | 297 | 0 |
| **Nueces** | **355** | **7 (6 active + 1 disabled)** |
| Refugio | 391 | 0 |
| San Patricio | 409 | 0 |

## 5. Related pipeline docs

- [Data availability matrix](./04_data_availability.md) — site × year ×
  pollutant coverage.
- [Method-code timelines](./05_method_codes_reference.md) — per-site
  instrument changes.
- [Refinery-Row project scope](./proposals/refinery_row_directional_health.md)
  — the study currently in flight, uses 7 Nueces sites.
- [2026-08-12 meeting notes](./meeting_notes/2026-08-12.md) — where the
  label concern was first raised (now reconciled here).
- [Pipeline Updates](./pipeline_updates.md) — see v0.1.6 entry for the
  reconciliation record.

## 6. Sources

- Live query of `aq_coastal_bend.site_registry` (Neon project
  `aged-salad-62359207`), 2026-08-26.
- [TCEQ TAMIS daily summary — Region 14](https://www.tceq.texas.gov/cgi-bin/compliance/monops/daily_summary.pl?region=14).
- [EPA AQS Monitor Values](https://aqs.epa.gov/aqsweb/airdata/download_files.html)
  (for AQS-ID structure reference).
