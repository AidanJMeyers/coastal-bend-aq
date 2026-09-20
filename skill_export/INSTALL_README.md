# Install the "Corpus Christi AQ — Wind Rose Study" skill

*A shared knowledge base for the Melaram Lab CC AQ team.*

## What this is

A **Claude Code skill** that gives every teammate the same context on
the study — study design, key decisions, pipeline architecture, Neon
schema, MCP setup, and team onboarding. When you ask Claude anything
about "the Coastal Bend AQ study" or "Refinery Row" or the Neon
schema, it automatically loads the relevant reference doc from this
skill and answers with the same shared knowledge base the rest of
the team has.

## Requirements

- **Claude Code** installed. Get it at
  <https://claude.com/product/claude-code>.
- **~5 MB of disk space** in your home directory.

## Install (Mac / Linux — 30 seconds)

```bash
# 1. Extract the zip somewhere
unzip corpus-christi-aq-wind-rose-study.zip

# 2. Move the skill into your Claude skills directory
mkdir -p ~/.claude/skills
mv corpus-christi-aq-wind-rose-study ~/.claude/skills/

# 3. Restart Claude Code (or start a fresh session)

# 4. Verify — in Claude Code, type:
#    "load the corpus-christi-aq-wind-rose-study skill"
#    Or just ask about the study — the skill loads automatically.
```

## Install (Windows — 30 seconds)

Using PowerShell:

```powershell
# 1. Extract the zip
Expand-Archive corpus-christi-aq-wind-rose-study.zip -DestinationPath .

# 2. Move into your Claude skills directory
$dest = "$env:USERPROFILE\.claude\skills"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Move-Item -Path .\corpus-christi-aq-wind-rose-study -Destination $dest

# 3. Restart Claude Code (or start a fresh session)

# 4. Verify — same as Mac/Linux
```

Or in Git Bash / WSL, use the Mac/Linux commands.

## Verify it loaded

Start a new Claude Code session and ask:

> *"What's the current status of the Coastal Bend Wind Rose Study?"*

Claude should:
1. Reference `corpus-christi-aq-wind-rose-study` in its response.
2. Give you a summary based on the skill's SKILL.md.
3. Offer to load more detail from the reference files if needed.

If it doesn't, check that the directory landed at
`~/.claude/skills/corpus-christi-aq-wind-rose-study/` (or on
Windows: `%USERPROFILE%\.claude\skills\corpus-christi-aq-wind-rose-study\`)
and that `SKILL.md` exists inside it.

## What's in the skill

```
corpus-christi-aq-wind-rose-study/
├── SKILL.md                              ← Main entry point (~200 lines, always loaded)
├── references/                            ← Loaded on-demand
│   ├── study_scope.md                    ← RQs, hypotheses, variables, methods
│   ├── decisions_log.md                  ← Every key decision, chronologically
│   ├── data_inventory.md                 ← Neon schema tour + queries
│   ├── pipeline_architecture.md          ← GitHub repos + ETL flow
│   ├── mcp_setup.md                      ← Neon/Motion/Gmail MCP setup guide
│   ├── team_onboarding.md                ← First day / week / month for new teammates
│   ├── meeting_archive.md                ← Every meeting, one line + link
│   ├── publication_plan.md               ← Target journals, policy angle, grants
│   └── related_projects.md               ← Parent pipeline, BREATHE-CC, Niyogi
└── assets/                                ← (reserved for diagrams/refs)
```

## Recommended follow-up: connect the Neon + Motion MCPs

The skill's `references/mcp_setup.md` has the full walkthrough.
TL;DR:

1. Add Neon MCP via `.mcp.json` (uses hosted `https://mcp.neon.tech/mcp`
   endpoint — no API token needed).
2. Add Motion Notes MCP via `/mcp` in Claude Code (search "Motion").
3. Ask Aidan (`aidan.meyers@tamucc.edu`) for Neon project access +
   Motion workspace invite if you don't already have them.

## Keeping it up to date

The skill is versioned with the pipeline (`v0.1.10` at the time of
this zip). Every ~2 weeks, ask Aidan for the latest zip, or grab the
current version directly from the pipeline repo at
<https://github.com/AidanJMeyers/coastal-bend-aq/tree/main/skill_export>.

Version stamp: see the "Meta" section at the bottom of `SKILL.md`.

## Questions / issues

Ping Aidan: `aidan.meyers@tamucc.edu`.
