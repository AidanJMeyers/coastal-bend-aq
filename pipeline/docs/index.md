---
hide:
  - toc
---

<img src="assets/melaram-lab-logo.png" alt="Melaram Lab" class="hero-logo" />

# Coastal Bend Air Quality Data Pipeline

<span class="brand-badge">Melaram Lab</span>
<span class="brand-badge brand-badge-accent">v0.1.0</span>

!!! info "About this project"

    A reproducible, config-driven data pipeline for ambient air quality
    monitoring across the **Coastal Bend region of South Texas** (11 counties,
    2015–2025). Scoped in from the broader
    [South Texas AQ pipeline](https://aidanjmeyers.github.io/south-texas-aq-pipeline/)
    to enable a focused Corpus Christi–anchored analysis with strict
    scientific integrity around instrumentation and method-code changes.

    **Lab:** Melaram Lab, Texas A&M University–Corpus Christi
    **Principal Investigator:** Dr. Rajesh Melaram, TAMU-CC
    **Lead Developers:** Aidan Meyers, Manassa Kuchavaram, Jasmine Trevino
    **Contact:** [aidan.meyers@tamucc.edu](mailto:aidan.meyers@tamucc.edu) · [www.melaramlab.com](https://www.melaramlab.com)
    **License:** MIT

## The single most important fact about this dataset

!!! danger "9 of the 11 Coastal Bend counties have NO ambient air quality monitors"

    Only **2 counties** in the Coastal Bend region have TCEQ-networked
    monitoring sites: **Nueces (7 sites)** and **Kleberg (1 site)** —
    for a total of **8 sites**. The other 9 counties (Aransas, Bee, Brooks,
    Duval, Jim Wells, Kenedy, Live Oak, Refugio, San Patricio) have no
    monitoring data during 2015–2025. Any inference about air quality in
    those counties requires spatial interpolation from Nueces + Kleberg,
    which is a hard modeling problem with only 8 anchor points.

    This drives every design decision below.

## What's in the pipeline

```mermaid
%%{init: {'theme':'base','themeVariables':{
    'fontFamily':'Arial, sans-serif',
    'fontSize':'14px',
    'primaryColor':'#FFFFFF',
    'primaryTextColor':'#213c4e',
    'primaryBorderColor':'#213c4e',
    'lineColor':'#6b7a85',
    'clusterBkg':'#F5F7F9',
    'clusterBorder':'#213c4e'
}}}%%
flowchart TD
    classDef input  fill:#E8F1F5,stroke:#213c4e,stroke-width:2px,color:#213c4e,font-weight:600
    classDef step   fill:#FFFFFF,stroke:#213c4e,stroke-width:2.5px,color:#213c4e,font-weight:600
    classDef output fill:#FDEBD3,stroke:#c2410c,stroke-width:2.5px,color:#7c2d0b,font-weight:700

    subgraph INPUTS["&nbsp;TCEQ TAMIS raw pulls (11 counties → 2 with data)&nbsp;"]
        A1["<b>Nueces</b><br/>7 sites (6 active + 1 disabled)"]
        A2["<b>Kleberg</b><br/>1 site — Kingsville PM2.5"]
        A3["<b>OpenWeather + Solcast</b><br/>~4 stations covering the region"]
    end

    subgraph PIPELINE["&nbsp;pipeline/run_pipeline.py · County-filtered&nbsp;"]
        S1["01b · Ingest raw TCEQ + county filter"]
        S2["01 / 01c · Parquet stores"]
        S3["02 · Weather store"]
        S4["03 · NAAQS design values"]
        S5["04 · Daily + monthly aggregates"]
        S6["05b · Site registry + parameter reference"]
        S7["07 · Load into aq_coastal_bend Neon schema"]
        S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7
    end

    subgraph OUTPUTS["&nbsp;OUTPUTS&nbsp;"]
        O1["<b>Neon aq_coastal_bend</b><br/>10 tables · ~1.3M rows · 260 MB"]
        O2["<b>data/parquet/</b><br/>Fast local analytics"]
        O3["<b>docs site</b><br/>Availability matrices · method timelines"]
    end

    A1 --> S1
    A2 --> S1
    A3 --> S3
    S7 --> O1
    S3 --> O2
    S2 --> O2
    S5 --> O3

    class A1,A2,A3 input
    class S1,S2,S3,S4,S5,S6,S7 step
    class O1,O2,O3 output
```

!!! abstract "At-a-glance numbers (v0.1.0)"

    | Count | What |
    |---:|---|
    | **11** | Coastal Bend counties in scope |
    | **2** | Counties with active monitoring (Nueces, Kleberg) |
    | **8** | Total monitoring sites (7 active + 1 disabled) |
    | **5** | Pollutant groups measured (Ozone, SO₂, PM2.5, PM10, VOCs) |
    | **0** | Sites measuring CO or NOx in the Coastal Bend |
    | **~1.3M** | Total data rows across all Neon tables |
    | **~9 min** | Full local rebuild runtime |
    | **~5 min** | Neon reload runtime |

## Start here

<div class="grid cards" markdown>

-   :material-map-marker-radius: **Data reality first**

    ---

    Before you plan any analysis, [read the availability matrix](./04_data_availability.md).
    It shows exactly which site has which pollutant in which year — with
    color-coded completeness and method-code changes over time.

-   :material-format-list-bulleted-square: **Method code timelines**

    ---

    [Every method-code change per site](./05_method_codes_reference.md), including
    the CC Holly PM10 gap (2019–2023) and the 2024 method switch (141 → 639).

-   :material-database: **Neon SQL access**

    ---

    [Connect Colab / Python / R / BI tools](./08_usage_neon.md) to the
    `aq_coastal_bend` schema — same credentials as the broader
    `AQ_POSTGRES_URL`.

-   :material-flask: **Pollutant deep-dives**

    ---

    Team-authored technical briefings on each pollutant: chemistry,
    instrumentation, NAAQS, method codes, meteorological drivers.
    [Ozone](./pollutants/ozone.md) · [SO₂](./pollutants/so2.md) ·
    [PM2.5](./pollutants/pm25.md) · [VOCs](./pollutants/vocs.md) · …

</div>

## Team assignments (from 2026-07-08 meeting)

| Pollutant | Lead | Deliverable |
|---|---|---|
| Ozone | Manasseh Kuchavaram | [pollutants/ozone.md](./pollutants/ozone.md) |
| CO | Manasseh Kuchavaram | [pollutants/co.md](./pollutants/co.md) — flagged: no CO sites in Coastal Bend |
| PM2.5 | Aidan Meyers | [pollutants/pm25.md](./pollutants/pm25.md) |
| PM10 | Aidan Meyers | [pollutants/pm10.md](./pollutants/pm10.md) |
| NOx family | Aidan Meyers | [pollutants/nox.md](./pollutants/nox.md) — flagged: no NOx sites in Coastal Bend |
| SO₂ | Jasmine Trevino | [pollutants/so2.md](./pollutants/so2.md) |
| VOCs | Jasmine Trevino | [pollutants/vocs.md](./pollutants/vocs.md) |

Each page is a **structured template** — chemistry / instrumentation /
NAAQS / parameter codes / method codes over time / meteorological drivers /
literature review — that the lead fills in as they research their pollutant.

## Relationship to the South Texas AQ pipeline

This project is a **county-filtered fork** of the broader
[South Texas AQ pipeline](https://github.com/AidanJMeyers/south-texas-aq-pipeline)
(v0.4.0, 42 sites across 13 counties). The rationale for scoping in:

1. **Focus** — Dr. Melaram wants a publishable Coastal Bend analysis as
   the first output.
2. **Method rigor** — with 8 sites we can genuinely audit every method
   code change and comment on cross-year comparability. Not possible at
   42-site scale in the same timeframe.
3. **Publishable scope** — the Coastal Bend has a coherent industrial
   footprint (Port of Corpus Christi refining / petrochemical corridor)
   that makes for a clean geographic frame.
4. **Extensibility** — the pipeline still works at the full 42-site
   scale. Coastal Bend is a `COASTAL_BEND_COUNTIES` filter on top of it.

## Pipeline version history

| Version | Date | Summary |
|---|---|---|
| 0.1.0 | 2026-07-08 | Initial Coastal Bend fork of south-texas-aq v0.4.0. County-filtered Neon schema `aq_coastal_bend`. Availability matrices + method-code timelines documented. |

---

<div style="text-align: center; margin-top: 3em; color: #555555;">
  <strong>Melaram Lab</strong> · Texas A&amp;M University–Corpus Christi
  <br/>
  <a href="https://www.melaramlab.com">www.melaramlab.com</a>
  ·
  <a href="https://github.com/AidanJMeyers/coastal-bend-aq">GitHub</a>
</div>
