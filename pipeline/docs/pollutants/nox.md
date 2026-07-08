# NOx Family — Deep Dive

**Lead:** Aidan Meyers
**Target:** filled draft by 2026-07-15
**Coastal Bend coverage:** ⚠ **ZERO SITES — no NOx monitoring**

## 0. Gap statement

**There are no operating NO, NO₂, or NOx monitors in the 11-county
Coastal Bend region.** The nearest NOx sites are in the Bexar (San
Antonio) or Cameron (Brownsville-Harlingen) MSAs.

For the Coastal Bend ozone story this is **the single most important
missing measurement** — you can't model tropospheric ozone chemistry
without the primary precursors.

## 1. Chemistry

*(TO FILL)*: NO ↔ NO₂ ↔ O₃ cycling. NO from combustion (primary
emission); NO₂ from oxidation of NO or direct emission; NOx = NO + NO₂;
photolysis of NO₂ drives ozone formation. Reactive nitrogen (NOy) as the
broader family.

## 2. AQS parameter codes we would want

| Code | Meaning | Native unit |
|---:|---|---|
| 42601 | Nitric oxide (NO) | ppb |
| 42602 | Nitrogen dioxide (NO₂) | ppb |
| 42603 | Oxides of nitrogen (NOx) | ppb |

## 3. NAAQS

- **NO₂ 1-hr: 100 ppb** (form = 3-year avg of 98th percentile daily max)
- **NO₂ annual mean: 53 ppb**

No NAAQS for NO or total NOx.

## 4. Why no Coastal Bend NOx site

*(TO FILL — likely from TCEQ Annual Network Plans)*: NOx monitors are
concentrated in nonattainment/near-nonattainment ozone areas (Bexar =
San Antonio marginal nonattainment). Corpus Christi metro is attainment
for both ozone and NO₂, so there's no regulatory driver. Historically a
site (CAMS ??) may have existed — worth checking network history.

## 5. Options for the analysis

*(TO FILL)*: Discuss the trade-offs.

1. **Use Bexar NOx sites (14 in the upstream schema) as regional
   background context** — for framing only, not for Coastal Bend site
   ML.
2. **Petition to add NOx to the Coastal Bend network via TCEQ.**
   Not something we can do in-project.
3. **Infer NOx from co-emitted CO / VOCs / SO₂ where available.**
   Speculative and typically low-fidelity.
4. **Use TROPOMI satellite NO₂** — has real coverage of the Coastal Bend.
   Would let us actually add a NOx signal. Requires processing effort.
5. **Reframe the ozone story** — instead of "predict ozone from
   precursors," analyze "sensitivity of ozone to weather" and
   acknowledge NOx as an unquantified confounder.

## 6. Deliverable status

Aidan: this page should stay short. The value is documenting the gap
clearly so downstream readers don't waste time looking for NOx tables.
The strategic decision (TROPOMI vs reframe) belongs in the
[methodology](../07_methodology.md) page.
