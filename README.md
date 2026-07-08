# Coastal Bend Air Quality Pipeline

Reproducible ambient air quality data pipeline for the **11-county
Coastal Bend region of South Texas** (2015–2025). Fork of the broader
[south-texas-aq-pipeline v0.4.0](https://github.com/AidanJMeyers/south-texas-aq-pipeline)
scoped to the Coastal Bend for a focused Corpus Christi–anchored
analysis.

**Full docs:** [aidanjmeyers.github.io/coastal-bend-aq](https://aidanjmeyers.github.io/coastal-bend-aq/)

## Headline reality check

**9 of the 11 Coastal Bend counties have zero TCEQ monitors.** Only
Nueces (7 sites, all Corpus Christi metro) and Kleberg (1 site,
Kingsville) have data. All spatial analysis must acknowledge this.

## Team

- **Lead / pipeline / data engineering:** Aidan Meyers
  ([aidan.meyers@tamucc.edu](mailto:aidan.meyers@tamucc.edu))
- **Ozone / CO:** Manasa Kuchavaram
- **SO₂ / VOCs:** Jasmine Trevino
- **PI:** Dr. Rajesh Melaram, TAMU-CC

## Quick start

```bash
# Clone
git clone https://github.com/AidanJMeyers/coastal-bend-aq.git
cd coastal-bend-aq

# Install deps (same as south-texas-aq)
pip install -r requirements.txt

# Point at the shared Neon project (schema = aq_coastal_bend)
export AQ_POSTGRES_URL='postgresql://neondb_owner:npg_...@ep-...neon.tech/neondb?sslmode=require'

# Query
python -c "
import os, pandas as pd
from sqlalchemy import create_engine
engine = create_engine(os.environ['AQ_POSTGRES_URL'])
print(pd.read_sql('SELECT * FROM aq_coastal_bend.site_registry', engine))
"
```

## Repo layout

```
coastal-bend-aq/
├── pipeline/              — data pipeline (Python, TCEQ TAMIS ingest → Neon)
│   ├── run_pipeline.py    — orchestrator
│   ├── step_01b_*.py      — county-filtered ingest (Coastal Bend scope)
│   └── docs/              — MkDocs site (deployed to GitHub Pages)
├── mkdocs.yml             — MkDocs config
├── .github/workflows/     — CI (docs auto-deploy)
└── README.md              — this file
```

## Neon schema

Single shared Neon project (`aged-salad-62359207`), Coastal Bend fork
lives in schema `aq_coastal_bend`:

| Table | Rows | Size |
|---|---:|---:|
| `site_registry` | 8 | 16 kB |
| `parameter_reference` | 57 | 16 kB |
| `naaqs_design_values` | 129 | 40 kB |
| `pollutant_hourly` | 768,243 | 119 MB |
| `pollutant_daily` | 31,015 | 5 MB |
| `pollutant_monthly` | 1,035 | 264 kB |
| `vocs_1hr` | 336,922 | 55 MB |
| `vocs_24hr` | 7,152 | 1.3 MB |
| `weather_hourly` | 197,124 | 81 MB |

Total: ~1.3M rows, ~260 MB.

## Documentation

The full site includes:
- [Data availability matrix](https://aidanjmeyers.github.io/coastal-bend-aq/04_data_availability/)
  — the key reference for planning analyses
- [Method-code timelines](https://aidanjmeyers.github.io/coastal-bend-aq/05_method_codes_reference/)
  — every instrument change per site over 2015-2025
- [Neon SQL guide](https://aidanjmeyers.github.io/coastal-bend-aq/08_usage_neon/)
- [Pollutant deep-dives](https://aidanjmeyers.github.io/coastal-bend-aq/pollutants/ozone/)
  (7 pages, team-authored)

## License

MIT — see [LICENSE](LICENSE).
