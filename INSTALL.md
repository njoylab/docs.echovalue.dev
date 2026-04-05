# AI Agent Skill Installation

This repository includes an AI agent skill that enables agents to execute EchoValue API operations on your behalf.

## What This Skill Does

✅ Configure email-to-webhook integrations (Slack, Discord, Teams, Telegram, PagerDuty)  
✅ Execute key-value store operations (get/set/delete)  
✅ Manage tokens (generate, check balance, retrieve logs)  
✅ Share state between AI agents  

## Compatible Agents

This skill works with any AI agent that supports the skills convention:

- ✅ **Claude Code** (Anthropic's terminal-based agent)
- ✅ **Cursor** (AI-powered code editor)
- ✅ **Aider** (AI pair programming tool)
- ✅ **Continue** (Autopilot for VS Code/JetBrains)
- ✅ **Any agent** using `~/.claude/skills/` directory

All compatible agents follow the same skill directory convention: `~/.claude/skills/`

## Quick Install

```bash
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/install-skill.sh | bash
```

## Manual Install

```bash
mkdir -p ~/.claude/skills/echovalue
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/skill/SKILL.md -o ~/.claude/skills/echovalue/SKILL.md
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/skill/quick-reference.md -o ~/.claude/skills/echovalue/quick-reference.md
```

## Setup

Set your EchoValue token:

```bash
export ECHOVALUE_TOKEN="your-token-here"
```

## Usage

Once installed, the skill activates automatically. Just ask:

- "Configure a Slack webhook for echoValue"
- "Check my echoValue balance"
- "Store a value in echoValue"
- "How do I share state between AI agents?"

## More Information

- [Skill README](./skill/README.md) - Detailed usage guide
- [EchoValue Documentation](https://docs.echovalue.dev) -Full API docs
- [LLM-optimized docs](https://docs.echovalue.dev/llms-small.txt) - For AI consumption