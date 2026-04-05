# AI Agent Skill Installation

This repository includes an AI agent skill plus local files for Cursor and Continue that let agents execute EchoValue API operations on your behalf.

## What This Skill Does

✅ Configure email-to-webhook integrations (Slack, Discord, Teams, Telegram, PagerDuty)  
✅ Execute key-value store operations (get/set/delete)  
✅ Manage tokens (generate, check balance, retrieve logs)  
✅ Share state between AI agents  

## Compatible Agents

This repository supports multiple agents through different installation paths:

- ✅ **Claude Code** via `~/.claude/skills/echovalue/`
- ✅ **Cursor** via `.cursor/rules/echovalue.mdc`
- ✅ **Continue** via `.continue/rules/echovalue.md`
Only Claude uses the shared skill directory convention. Cursor and Continue use local files in the current workspace.

## Quick Install

```bash
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/install-skill.sh | bash
```

To install the workspace files into the current workspace:

```bash
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/install-skill.sh | bash -s -- --all --workspace .
```

## Manual Install

### Claude Code

```bash
mkdir -p ~/.claude/skills/echovalue
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/skill/SKILL.md -o ~/.claude/skills/echovalue/SKILL.md
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/skill/quick-reference.md -o ~/.claude/skills/echovalue/quick-reference.md
```

### Cursor

```bash
mkdir -p .cursor/rules
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/agent-config/cursor/echovalue.mdc -o .cursor/rules/echovalue.mdc
```

### Continue

```bash
mkdir -p .continue/rules
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/agent-config/continue/echovalue.md -o .continue/rules/echovalue.md
```

## Setup

Set your EchoValue token:

```bash
export ECHOVALUE_TOKEN="your-token-here"
```

## Usage

Once installed, ask the agent:

- "Configure a Slack webhook for echoValue"
- "Check my echoValue balance"
- "Store a value in echoValue"
- "How do I share state between AI agents?"

## More Information

- [Skill README](./skill/README.md) - Detailed usage guide
- [EchoValue Documentation](https://docs.echovalue.dev) -Full API docs
- [LLM-optimized docs](https://docs.echovalue.dev/llms-small.txt) - For AI consumption
