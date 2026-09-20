# Skills — for team + AI download

Downloadable **Claude Code skills** the Melaram Lab CC AQ team uses.
Install any of them locally to give Claude the same shared context
the rest of the team is working with.

## What's a "skill" here?

A Claude Code skill is a bundle of markdown files (`SKILL.md` +
`references/*.md`) that Claude loads on-demand when a matching
topic comes up. Nothing runs on your machine except the file reads —
it's just a knowledge base that Claude uses to answer your questions
with the team's actual context instead of a guess.

- **Install location:** `~/.claude/skills/<skill-name>/` on
  Mac / Linux; `%USERPROFILE%\.claude\skills\<skill-name>\` on
  Windows.
- **Install time:** 30 seconds per skill.
- **Uninstall:** delete the folder.

Detailed install instructions in
[INSTALL_README.md](https://github.com/AidanJMeyers/coastal-bend-aq/blob/main/skill_export/INSTALL_README.md).

## Available skills

<div class="grid cards" markdown>

-   :material-book-open-variant: **corpus-christi-aq-wind-rose-study**

    ---

    Full study context — design, decisions, pipeline architecture,
    Neon schema, MCP setup, team onboarding.

    Auto-loads on: "CC AQ", "Coastal Bend AQ", "Wind Rose Study",
    "Refinery Row", "pollution rose", "aq_coastal_bend".

    [Download zip →](https://github.com/AidanJMeyers/coastal-bend-aq/raw/main/skill_export/corpus-christi-aq-wind-rose-study.zip)

-   :material-file-document-multiple: **scientific-paper-annotation**

    ---

    General-purpose color-coded PDF annotation. Highlights + boxed
    figures/tables + companion workup doc. Works on any scientific
    paper.

    Auto-loads on: "annotate this paper", "highlight this article",
    "paper workup".

    [Download zip →](https://github.com/AidanJMeyers/coastal-bend-aq/raw/main/skill_export/scientific-paper-annotation.zip)

-   :material-flask: **cc-aq-wind-rose-study-annotation**

    ---

    Sub-skill of scientific-paper-annotation. Study-specific
    highlighting rubric mapping annotations to H1-H4 hypotheses +
    our planned Figs 1-6.

    Load in tandem with the parent when annotating papers **for
    this study**.

    [Download zip →](https://github.com/AidanJMeyers/coastal-bend-aq/raw/main/skill_export/cc-aq-wind-rose-study-annotation.zip)

</div>

## Which ones to install

| Your role | Install these |
|---|---|
| **Team lead** (Jasmine / Manasa / Aidan) | All three |
| **New team member** | corpus-christi-aq-wind-rose-study, then the annotation pair when you start reading lit review |
| **Outside reader** (Warden / Jin / Niyogi) | corpus-christi-aq-wind-rose-study (gives you the study context in Claude) |
| **BREATHE-CC teammate** who reads AQ papers | scientific-paper-annotation + cc-aq-wind-rose-study-annotation |

## How the parent + sub-skill pair works

`scientific-paper-annotation` is the general workflow — color scheme,
step-by-step annotation procedure, workup template. Works on its
own for any paper.

`cc-aq-wind-rose-study-annotation` is a **sub-skill** that layers on
top of the parent when you're reading a paper for this study. It
swaps the generic color categories for study-specific ones (H1
directional evidence, H2 RF features, H3 SO₂/O₃ chemistry, etc.),
adds `[integration:<tag>]` markers for our planned Figs 1-6, and
appends "How this paper informs H1-H4" sections to the workup doc.

Both installed → Claude uses the sub-skill's rubric.
Only parent installed → Claude uses the default 8-color palette.

## Boxed figure/table annotations

Both annotation skills support **boxed annotations** — a dark green
1.5 pt rectangle around a whole figure or table that flags it as
a possible integration candidate for our own work. Sub-skill adds
`[integration:<tag>]` values like `[integration:fig4-pollution-rose]`
so a boxed figure names *which* of our planned figures it would
inform.

Use sparingly: 0-3 boxes per paper max.

## Future sub-skills (planned)

Aidan is building sub-skills for:

- Thesis annotation (PSY chapters, in progress).
- CHM 350 already exists as its own workup skill; not a sub-skill
  of this pair.
- Other project rubrics as they come up.

## Contributing

The parent + this project's sub-skill are versioned in-repo at
[`skill_export/`](https://github.com/AidanJMeyers/coastal-bend-aq/tree/main/skill_export).
If you spot something outdated (a decision log entry that's no
longer accurate, a broken link), open a PR or ping Aidan.

## Meta

| Skill | Version | Size |
|---|---|---:|
| corpus-christi-aq-wind-rose-study | v0.1.10 | ~30 KB |
| scientific-paper-annotation | v0.1.0 | ~15 KB |
| cc-aq-wind-rose-study-annotation | v0.1.0 | ~15 KB |

All three are MIT-licensed. Bundle updated on every pipeline
version bump.
