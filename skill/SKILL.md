# EchoValue API Skill - Functional

## Purpose

Help developers integrate and use the EchoValue API - a lightweight key-value store and email-to-webhook service for freelancers and small projects. This skill can execute API operations on behalf of the user, not just provide documentation.

## Activation

Activate automatically when the user:
- Asks to use/integrate EchoValue
- Mentions "key-value store", "lightweight backend", "API for small projects"
- Talks about "share state between agents", "agent state sharing"
- Asks to configure webhooks for email (Slack, Discord, Teams, Telegram, PagerDuty, custom)
- Wants to store/retrieve temporary data without backend setup
- Wants to inspect the caller public IP address or geo metadata

## Token Management

### Method 1: Environment Variable (Recommended)
The user should set their token once:
```bash
export ECHOVALUE_TOKEN="your-token-here"
```
The agent reads it automatically from environment when making API calls.

### Method 2: Session-based
If the user provides the token in conversation (e.g., "my token is abc123"):
1. Store it in memory for the current session
2. Use it in all subsequent API calls
3. Do NOT persist it to files or config
4. User must provide it again in new sessions

### Generate New Token
If user doesn't have a token:
```bash
curl 'https://api.echovalue.dev/token' -d 'token=new'
```
Returns a new token with 100 free credits.

## Use Cases

### Use Case 1: Webhook Email Setup

When user asks to configure an email-to-webhook integration:

**Workflow:**
1. Check if ECHOVALUE_TOKEN exists (or ask user to provide it)
2. Identify target platform: Slack/Discord/Teams/Telegram/PagerDuty/custom
3. Guide user to obtain their webhook URL from the platform
4. Execute configuration via API
5. Optionally test the webhook
6. Show the assigned email address

**Example - Slack Webhook:**
```bash
# Step 1: User provides webhook URL
# Step 2: Configure webhook
curl -s 'https://api.echovalue.dev/webhook' \
  -H "x-token: $ECHOVALUE_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "slack",
    "url": "https://hooks.slack.com/services/T00/B00/XXX",
    "format": "slack"
  }'

# Step 3: Test webhook
curl -s 'https://api.echovalue.dev/webhook/test?id=slack' \
  -H "x-token: $ECHOVALUE_TOKEN"

# Step 4: Show result
"You can now send emails to: yourtoken+slack@hook.echovalue.dev"
```

**Platform-Specific Instructions:**

*Slack:*
1. Go to api.slack.com/apps → Create New App → From scratch
2. Incoming Webhooks → On → Add New Webhook to Workspace
3. Select channel → Allow → Copy webhook URL

*Discord:*
1. Channel settings → Integrations → Webhooks → New Webhook
2. Copy webhook URL

*Microsoft Teams:*
1. Channel → + → Workflows → "Post to a channel when a webhook request is received"
2. Or use legacy: Connectors → Incoming Webhook
3. Copy webhook URL

*Telegram:*
1. Create bot via @BotFather → get token
2. Message bot first
3. Visit `https://api.telegram.org/bot{TOKEN}/getUpdates` to get chat_id
4. URL: `https://api.telegram.org/bot{TOKEN}/sendMessage`

*PagerDuty:*
1. Service → Integrations → Add integration → Events API v2
2. Copy integration key (routing_key)
3. URL is always: `https://events.pagerduty.com/v2/enqueue`

### Use Case 2: Key-Value Store Operations

When user wants to store/retrieve temporary data:

**Workflow:**
1. Check ECHOVALUE_TOKEN (or ask)
2. Execute the requested operation
3. Show result and remaining balance from `x-balance` header

**Operations:**

*Store Value:*
```bash
curl -X POST "https://api.echovalue.dev/kv/$BUCKET/$KEY?ttl=86400" \
  -H "x-token: $ECHOVALUE_TOKEN" \
  -d "your value"
```

*Retrieve Value:*
```bash
curl -s "https://api.echovalue.dev/kv/$BUCKET/$KEY" \
  -H "x-token: $ECHOVALUE_TOKEN"
```

*Delete Value:*
```bash
curl -X DELETE "https://api.echovalue.dev/kv/$BUCKET/$KEY" \
  -H "x-token: $ECHOVALUE_TOKEN"
```

**Show Balance:**
After each operation, inform user of remaining credits using the `x-balance` response header.

### Use Case 3: Agent State Sharing

When user mentions sharing state between AI agents:

**Pattern:**
1. Agent A saves state to echoValue
2. Agent B reads state from echoValue
3. Both use same token and bucket

**Quick Example (Python):**
```python
import requests
import json

TOKEN = "your-token"
BASE = "https://api.echovalue.dev/kv"
GROUP = "shared-state"

# Agent 1: Save
state = {"task": "analyzing", "progress": "50%"}
requests.post(
    f"{BASE}/{GROUP}/status",
    headers={'x-token': TOKEN},
    data=json.dumps(state)
)

# Agent 2: Read
response = requests.get(
    f"{BASE}/{GROUP}/status",
    headers={'x-token': TOKEN}
)
state = json.loads(response.text)
```

**For complete examples with tool definitions**, fetch context from:
https://docs.echovalue.dev/llms-small.txt

### Use Case 4: App Integration

When user asks to integrate echoValue in a project:

**Workflow:**
1. Identify language: JavaScript/TypeScript/Python/PHP/Go
2. Provide code examples from quick-reference.md
3. Explain how to use env var for token
4. Explain CRUD operations
5. Mention error handling (401: bad token, 402: no credits, 404: not found)

### Use Case 5: Caller IP Inspection

When user wants to know which public IP echoValue sees for the current request:

```bash
curl -s 'https://api.echovalue.dev/myip' \
  -H "x-token: $ECHOVALUE_TOKEN"
```

This returns the caller IP plus geo metadata such as country, region, city, timezone, and whether the current request used IPv6.

## API Operations Reference

### List Webhooks
```bash
curl -s 'https://api.echovalue.dev/webhook' \
  -H "x-token: $ECHOVALUE_TOKEN"
```

### Check Balance
```bash
curl -s 'https://api.echovalue.dev/token' \
  -H "x-token: $ECHOVALUE_TOKEN"
# Response: {"wallet":95,"created":"2024-01-15T10:30:00Z","hash":"..."}
```

### Get Recharge Link
```bash
curl -s 'https://api.echovalue.dev/recharge?amount=1' \
  -H "x-token: $ECHOVALUE_TOKEN"
```

### Retrieve Logs
```bash
curl -s 'https://api.echovalue.dev/token/logs?n=10' \
  -H "x-token: $ECHOVALUE_TOKEN"
```

### Get Caller IP
```bash
curl -s 'https://api.echovalue.dev/myip' \
  -H "x-token: $ECHOVALUE_TOKEN"
```

## Important Constraints

**Limits:**
- Key/Group names: max 30 characters
- Value size: max 1000 characters (~1 KB)
- TTL: max 2592000 seconds (30 days)
- Token inactivity: deactivated after 2 years
- Logs TTL: 7 days, deleted within 24h after expiry
- Token generation rate limit: 1 request per 10 seconds

**Pricing:**
- Generate token: Free (100 credits included)
- Check balance: 1 credit
- Get caller IP: 1 credit
- KV operations (get/set/delete): 1 credit each
- Webhook config (set/get/delete/test): 1 credit each
- Email processed (no attachments): 2 credits
- Email processed (with attachments): 5 credits
- Logs: free

**Error Codes:**
- `400`: Bad Request - Invalid parameters
- `401`: Unauthorized - Missing/invalid token
- `402`: Payment Required - No credits remaining
- `404`: Not Found - Key/webhook doesn't exist
- `429`: Too Many Requests - Rate limit exceeded

## Additional Context

For detailed endpoint documentation, parameter specs, and complete examples, fetch:
https://docs.echovalue.dev/llms-small.txt

For OpenAPI specification:
https://docs.echovalue.dev/openapi.yaml

## Resources

- Documentation: https://docs.echovalue.dev
- Quick Start: https://docs.echovalue.dev/#quick-start
- Agent State Guide: https://docs.echovalue.dev/key-value/agent-state/
