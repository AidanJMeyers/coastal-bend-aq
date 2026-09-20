# Install Melaram Lab CC AQ Team Skills

*Claude Code skills for the CC AQ Wind Rose Study team.*

## What's in this folder

Three zipped Claude Code skills, plus this README.

| Zip | What it does |
|---|---|
| `corpus-christi-aq-wind-rose-study.zip` | Full study context — design, decisions, pipeline architecture, Neon schema, MCP setup, team onboarding. |
| `scientific-paper-annotation.zip` | General-purpose color-coded PDF annotation. Highlights + boxed figures/tables + companion workup doc. Any scientific paper. |
| `cc-aq-wind-rose-study-annotation.zip` | Sub-skill of `scientific-paper-annotation`. Highlighting rubric mapping annotations to our H1-H4 hypotheses + Figs 1-6. Load in tandem with the parent. |

Each skill is a self-contained bundle of markdown files that Claude
Code loads on-demand. Nothing runs on your machine — they're
knowledge-base files that give Claude the team's shared context.

## Which ones do I install?

| Your situation | Install |
|---|---|
| **Team lead** (Jasmine, Manasa, or Aidan) | All three |
| **New team member** | Start with `corpus-christi-aq-wind-rose-study` (context). Add the annotation pair when you start reading lit review. |
| **Outside reader** (Warden / Jin / Niyogi) | Just `corpus-christi-aq-wind-rose-study` — gives you the study context in Claude when we send papers your way. |
| **BREATHE-CC teammate** who reads AQ papers | The annotation pair (parent + sub-skill). Add the study-context skill if you want the full picture. |

## Install (Mac / Linux — 30 seconds per skill)

```bash
# 1. Extract each zip you want
unzip corpus-christi-aq-wind-rose-study.zip
unzip scientific-paper-annotation.zip
unzip cc-aq-wind-rose-study-annotation.zip

# 2. Move into your Claude skills directory
mkdir -p ~/.claude/skills
mv corpus-christi-aq-wind-rose-study      ~/.claude/skills/
mv scientific-paper-annotation            ~/.claude/skills/
mv cc-aq-wind-rose-study-annotation       ~/.claude/skills/

# 3. Restart Claude Code (or start a fresh session)

# 4. Verify — just ask Claude something on-topic:
#    "What's the current status of the CC AQ Wind Rose Study?"
#    Claude should reference the skill and answer with team context.
```

## Install (Windows — 30 seconds per skill)

PowerShell:

```powershell
# 1. Extract each zip
Expand-Archive corpus-christi-aq-wind-rose-study.zip -DestinationPath .
Expand-Archive scientific-paper-annotation.zip       -DestinationPath .
Expand-Archive cc-aq-wind-rose-study-annotation.zip  -DestinationPath .

# 2. Move into your Claude skills directory
$dest = "$env:USERPROFILE\.claude\skills"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Move-Item -Path .\corpus-christi-aq-wind-rose-study      -Destination $dest
Move-Item -Path .\scientific-paper-annotation            -Destination $dest
Move-Item -Path .\cc-aq-wind-rose-study-annotation       -Destination $dest

# 3. Restart Claude Code (or start a fresh session)

# 4. Verify — same as Mac/Linux
```

Git Bash or WSL users: use the Mac/Linux commands.

## Verify each skill loaded

Start a new Claude Code session and try:

- **corpus-christi-aq-wind-rose-study:**
  > "What's the current status of the Coastal Bend Wind Rose Study?"

  Claude should reference the skill by name and summarize from
  `SKILL.md`.

- **scientific-paper-annotation:**
  > "Can you annotate a scientific paper for me? I'll drop the PDF
  > next."

  Claude should describe the annotation workflow — the 8-color
  palette, the boxed figure/table convention, the companion workup
  doc.

- **cc-aq-wind-rose-study-annotation:**
  > "Annotate this paper for the CC AQ Wind Rose Study."

  Claude should load *both* skills (parent + sub-skill) and mention
  the H1-H4 hypothesis mapping + integration tags for our planned
  Figs 1-6.

If any skill doesn't show up, confirm the directory landed at
`~/.claude/skills/<skill-name>/` (or on Windows:
`%USERPROFILE%\.claude\skills\<skill-name>\`) and that `SKILL.md`
is at the top of that folder.

## Recommended follow-up: connect the Neon + Motion MCPs

The corpus-christi-aq-wind-rose-study skill's
`references/mcp_setup.md` has the full walkthrough for connecting
Neon (for database queries) and Motion Notes (for meeting notes).
TL;DR:

1. Add Neon MCP via `.mcp.json` using the hosted `https://mcp.neon.tech/mcp`
   endpoint — no API token needed. Sign in via `/mcp` OAuth flow.
2. Add Motion Notes MCP via `/mcp` in Claude Code (search "Motion").
3. Ping Aidan (`aidan.meyers@tamucc.edu`) if you need Neon project
   access or Motion workspace invite.

## Keeping the skills up to date

The skills are versioned with the pipeline. Every ~2 weeks:

1. Check the pipeline site's [Skills page](https://aidanjmeyers.github.io/coastal-bend-aq/skills/)
   for the current versions.
2. Download any zip with a higher version number than what you have
   installed.
3. Extract + move (overwrites the old skill folder).
4. Restart Claude Code.

## Questions

Ping Aidan: `aidan.meyers@tamucc.edu`.
