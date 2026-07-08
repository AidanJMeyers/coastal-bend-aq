# SO₂ (Sulfur Dioxide) — Deep Dive

**Lead:** Jasmine Trevino
**Target:** filled draft by 2026-07-15
**Coastal Bend coverage:** 3 active sites + 1 offline-since-2017

## 1. Chemistry

*(TO FILL)*: SO₂ from fossil fuel combustion (esp. sulfur-containing
crude / bunker fuel), industrial processes (refining, petrochemical
plants). Oxidation to sulfate (SO₄²⁻) → secondary PM2.5 formation.
Half-life ~1-4 days in atmosphere. Health impact = bronchoconstriction,
esp. asthmatics.

## 2. Instrumentation

Two method codes seen in the Coastal Bend:

| Code | Description | Coastal Bend usage |
|---:|---|---|
| **100** | Pulsed fluorescence (Thermo TEI 43i / API 100E) | CC West, CC Tuloso, CC Dona Park all years |
| **92** | Older fluorescence reference method | CC Holly 2015-2017 only |

*(TO FILL)*: Instrument-specific detection limits, calibration
protocols. Note that method 92 → 100 is not the *same* instrument;
they're a generational transition.

## 3. Parameter codes

| Code | Meaning | Native unit |
|---:|---|---|
| **42401** | Sulfur dioxide | ppb |

## 4. NAAQS

- **1-hr: 75 ppb** (form = 3-year avg of 99th percentile daily max 1-hr)
- **Annual mean: 30 ppb** (revoked — replaced by 1-hr in 2010)
- **24-hr: 140 ppb (secondary/welfare) — rarely tested**

Coastal Bend 2024 1-hr 99th percentiles (from
[availability page](../04_data_availability.md#5-naaqs-design-values-2023--2024)):

| Site | 2024 SO₂ p99 1-hr (ppb) | NAAQS status |
|---|---:|---|
| CC West_0025 | 4.84 | Well below (75) |
| CC Tuloso_0026 | 1.68 | Well below |
| CC Dona Park_0032 | 16.96 | Well below but ~4× higher than the other two |

**Dona Park's higher SO₂** (~4× CC West, ~10× CC Tuloso) is the story.
Investigate the source: Dona Park is adjacent to the refinery corridor
on the east side of the Ship Channel.

## 5. Method-code timeline

See [05 Method-code reference §SO₂](../05_method_codes_reference.md#so-42401--mostly-steady-one-site-retired-mid-2017).

- **CC West, Tuloso, Dona Park:** method 100 for all 11 years — clean
- **CC Holly:** method 92, 2015–May 2017 only, then decommissioned

## 6. Historical trend

*(TO FILL)*: Bring in the yearly n_rows from the availability page —
the CC Tuloso 2023-2024 dip (4.6k / 3.5k rows) is worth investigating.
Was that a monitor problem or a real reporting gap?

## 7. Meteorological drivers

*(TO FILL, Jasmine — this is your specialty):*
- Wind direction (Ship Channel refinery emissions during easterlies
  → Dona Park receptor)
- Wind speed (dispersion vs stagnation)
- Boundary-layer stability
- Sea breeze vs land breeze SO₂ signature
- Wind-rose analysis per site (add via the Neon SQL — you know how to
  build these from OpenWeather data)

## 8. Health literature

*(TO FILL)*: 3-5 recent reviews on:
- Short-term SO₂ × asthma / pediatric hospitalizations
- SO₂ × cardiovascular effects (weak literature but present)
- Community-scale exposure studies near refining corridors (relevant
  for Dona Park, given its 4× higher levels vs CC West)

## 9. ML modeling considerations

- **Method 100 sites give a clean 3-site × 11-year dataset** (33
  site-years). Comparable to the ozone dataset in size and much cleaner
  than PM.
- Consider a **spatial gradient model** — Dona Park as receptor, West
  and Tuloso as background. Wind-direction–weighted regression.
- Very low measured levels (single-digit ppb) → precision matters.
  Check whether values near instrument detection limit (~1 ppb) need
  special handling.

## 10. Open questions

- [ ] Confirm method-100 instrument model at each site — Delaney
- [ ] What happened at CC Tuloso in 2023-2024? (Monitor down? Reporting
      gap?)
- [ ] Any TCEQ industry inventory (Point Source Database) linkage to
      Dona Park emissions?
- [ ] Is 24hr average SO₂ ever regulatory-relevant here, or is 1-hr the
      only exposure metric worth focusing on?
