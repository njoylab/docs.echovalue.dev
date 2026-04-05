# EchoValue API Skill

A functional skill that enables AI agents to execute EchoValue API operations on your behalf.

## What This Skill Does

This skill is **functional** - it doesn't just provide documentation, it can actually execute API operations:

✅ **Webhook Setup** - Configure email-to-webhook integrations (Slack, Discord, Teams, Telegram, PagerDuty)  
✅ **Key-Value Operations** - Store, retrieve, and delete temporary data  
✅ **Token Management** - Generate tokens, check balance, retrieve logs  
✅ **Agent State Sharing** - Share state between AI agents  

## Installation

### Quick Install (macOS/Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/install-skill.sh | bash
```

### Manual Install

```bash
# Create skill directory
mkdir -p ~/.claude/skills/echovalue

# Download files
curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/skill/SKILL.md \
  -o ~/.claude/skills/echovalue/SKILL.md

curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/skill/quick-reference.md \
  -o ~/.claude/skills/echovalue/quick-reference.md
```

### Verify Installation

```bash
ls -la ~/.claude/skills/echovalue/
# Should show: SKILL.md and quick-reference.md
```

## Setup

### Option 1: Environment Variable (Recommended)

Set your EchoValue token once:

```bash
export ECHOVALUE_TOKEN="your-token-here"
```

The agent will automatically use it for all API operations.

### Option 2: Session-based

Provide your token in the conversation:

```
You: "My echoValue token is abc123. Configure a Slack webhook."
Agent: [uses the token and configures everything]
```

Note: Session-based tokens are not persisted and must be provided for each new session.

## Usage Examples

Once installed, the skill activates automatically when you mention echoValue or related topics.

### Configure Webhook for Slack

```
"Configure a Slack webhook for echoValue with URL https://hooks.slack.com/services/..."
```

The agent will:
1. Use your token (from env or session)
2. Configure the webhook
3. Test it (optional)
4. Show you the assigned email address

### Check Balance

```
"How many credits do I have on echoValue?"
```

### Store a Value

```
"Store 'hello world' in bucket 'test' with key 'message' using echoValue"
```

### Share State Between Agents

```
"How do I share state between two AI agents using echoValue?"
```

The agent will provide code examples and explain the pattern.

## Automatic Activation

The skill activates automatically when you:
- Mention "echoValue", "key-value store", "webhook email"
- Talk about "agent state sharing"
- Ask to configure webhooks for Slack/Discord/Teams/Telegram
- Want to store temporary data without backend setup

## What's Included

### SKILL.md
- Operational instructions for the agent
- Complete workflow for each use case
- Token management logic
- Platform-specific webhook setup instructions

### quick-reference.md
- Base URLs and authentication
- All API operations with curl examples
- Pricing and limits
- Code examples in JavaScript, Python, PHP, Go
- Agent state sharing patterns

## Files in This Repository

- `SKILL.md` - Skill definition and instructions
- `quick-reference.md` - Technical reference with code examples
- `install-skill.sh` - Installation script
- `README.md` - This file

## Uninstall

```bash
rm -rf ~/.claude/skills/echovalue
```

## Documentation

- Full API Documentation: https://docs.echovalue.dev
- LLM-optimized docs: https://docs.echovalue.dev/llms-small.txt
- OpenAPI Spec: https://docs.echovalue.dev/openapi.yaml

## Support

- GitHub: https://github.com/njoylab/docs.echovalue.dev
- Issues: https://github.com/njoylab/docs.echovalue.dev/issues

## License

This skill is provided under the same license as the EchoValue documentation.

---

Made with ❤️ by [njoylab](https://njoylab.com)