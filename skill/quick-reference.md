# EchoValue API - Quick Reference

## Base URLs
```
Key-Value:  https://api.echovalue.dev/kv/<bucket>/<key>
Webhook:    https://api.echovalue.dev/webhook
Token:      https://api.echovalue.dev/token
Logs:       https://api.echovalue.dev/token/logs
Recharge:   https://api.echovalue.dev/recharge
My IP:      https://api.echovalue.dev/myip
```

## Authentication
```
Header: x-token: YOUR_TOKEN
```

## Token Operations

### Generate New Token (Free - 100 credits)
```bash
curl 'https://api.echovalue.dev/token' -d 'token=new'
# Response: abc123def456...
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
# Response: https://buy.stripe.com/...
```

## Key-Value Operations

### Store Value
```bash
curl -X POST "https://api.echovalue.dev/kv/$BUCKET/$KEY?ttl=86400" \
  -H "x-token: $ECHOVALUE_TOKEN" \
  -d "your value"
# Response: OK
```

### Retrieve Value
```bash
curl -s "https://api.echovalue.dev/kv/$BUCKET/$KEY" \
  -H "x-token: $ECHOVALUE_TOKEN"
# Response: your value
```

### Delete Value
```bash
curl -X DELETE "https://api.echovalue.dev/kv/$BUCKET/$KEY" \
  -H "x-token: $ECHOVALUE_TOKEN"
# Response: OK
```

## Webhook Operations

### List Webhooks
```bash
curl -s 'https://api.echovalue.dev/webhook' \
  -H "x-token: $ECHOVALUE_TOKEN"
# Response: {"webhooks":[{"id":"0","url":"https://...","format":"slack",...}]}
```

### Configure Webhook
```bash
curl -s 'https://api.echovalue.dev/webhook' \
  -H "x-token: $ECHOVALUE_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "slack",
    "url": "https://hooks.slack.com/services/T00/B00/XXX",
    "format": "slack"
  }'
# Response: OK
# Email: yourtoken+slack@hook.echovalue.dev
```

### Test Webhook
```bash
curl -s 'https://api.echovalue.dev/webhook/test?id=slack' \
  -H "x-token: $ECHOVALUE_TOKEN"
# Response: {"success":true,"message":"test webhook delivered"}
```

### Delete Webhook
```bash
curl -X DELETE 'https://api.echovalue.dev/webhook?id=slack' \
  -H "x-token: $ECHOVALUE_TOKEN"
# Response: OK
```

## Logs

### Retrieve Recent Logs
```bash
curl -s 'https://api.echovalue.dev/token/logs?n=5' \
  -H "x-token: $ECHOVALUE_TOKEN"
# Response: {"logs":[...],"n":5}
```

## My IP

### Get Caller IP And Geo Metadata
```bash
curl -s 'https://api.echovalue.dev/myip' \
  -H "x-token: $ECHOVALUE_TOKEN"
# Response: {"ip":"203.0.113.42","country":"IT","city":"Rome",...}
```

## Pricing

| Operation | Cost |
|-----------|------|
| Generate token | Free (100 credits included) |
| Check balance | 1 credit |
| Get caller IP | 1 credit |
| Key-Value ops (get/set/delete) | 1 credit each |
| Webhook config (set/get/delete/test) | 1 credit each |
| Email processed (no attachments) | 2 credits |
| Email processed (with attachments) | 5 credits |
| Logs retrieval | Free |

## Limits

- Max key/group name: 30 characters
- Max value size: 1000 characters (~1 KB)
- Max TTL: 2592000 seconds (30 days)
- Default TTL: 2592000 seconds (30 days)
- Token inactivity: deactivated after 2 years
- Logs TTL: 7 days, deleted within 24h after expiry

## Response Headers

| Header | Description |
|--------|-------------|
| `x-cost` | Credits deducted for this request |
| `x-balance` | Credits remaining after this request |

## Error Codes

| Code | Meaning | When it occurs |
|------|---------|----------------|
| 400 | Bad Request | Invalid parameters |
| 401 | Unauthorized | Missing/invalid `x-token` |
| 402 | Payment Required | No credits remaining |
| 404 | Not Found | Key/webhook doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded (token generation: 1 req/10s) |

## Code Examples

### JavaScript/TypeScript

**Setup:**
```javascript
const TOKEN = process.env.ECHOVALUE_TOKEN;
const BASE_URL = 'https://api.echovalue.dev';
const headers = { 'x-token': TOKEN };
```

**Key-Value:**
```javascript
// Set
await fetch(`${BASE_URL}/kv/mybucket/mykey`, {
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'text/plain' },
  body: 'my value'
});

// Get
const response = await fetch(`${BASE_URL}/kv/mybucket/mykey`, { headers });
const value = await response.text();

// Delete
await fetch(`${BASE_URL}/kv/mybucket/mykey`, {
  method: 'DELETE',
  headers
});
```

**Webhook:**
```javascript
// Configure
await fetch(`${BASE_URL}/webhook`, {
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'slack',
    url: 'https://hooks.slack.com/services/...',
    format: 'slack'
  })
});

// List
const response = await fetch(`${BASE_URL}/webhook`, { headers });
const data = await response.json();
```

### Python

**Setup:**
```python
import os
import requests

TOKEN = os.environ.get('ECHOVALUE_TOKEN')
BASE_URL = 'https://api.echovalue.dev'
headers = {'x-token': TOKEN}
```

**Key-Value:**
```python
# Set
requests.post(
    f'{BASE_URL}/kv/mybucket/mykey',
    headers=headers,
    data='my value'
)

# Get
response = requests.get(
    f'{BASE_URL}/kv/mybucket/mykey',
    headers=headers
)
value = response.text

# Delete
requests.delete(
    f'{BASE_URL}/kv/mybucket/mykey',
    headers=headers
)
```

**Webhook:**
```python
# Configure
requests.post(
    f'{BASE_URL}/webhook',
    headers=headers,
    json={
        'id': 'slack',
        'url': 'https://hooks.slack.com/services/...',
        'format': 'slack'
    }
)

# List
response = requests.get(f'{BASE_URL}/webhook', headers=headers)
data = response.json()
```

### PHP

**Setup:**
```php
$token = getenv('ECHOVALUE_TOKEN');
$baseUrl = 'https://api.echovalue.dev';
```

**Key-Value:**
```php
// Set
$ch = curl_init("$baseUrl/kv/mybucket/mykey");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'my value');
curl_setopt($ch, CURLOPT_HTTPHEADER, ["x-token: $token"]);
curl_exec($ch);
curl_close($ch);

// Get
$ch = curl_init("$baseUrl/kv/mybucket/mykey");
curl_setopt($ch, CURLOPT_HTTPHEADER, ["x-token: $token"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$value = curl_exec($ch);
curl_close($ch);

// Delete
$ch = curl_init("$baseUrl/kv/mybucket/mykey");
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($ch, CURLOPT_HTTPHEADER, ["x-token: $token"]);
curl_exec($ch);
curl_close($ch);
```

### Go

**Setup:**
```go
package main

import (
    "io"
    "net/http"
    "os"
    "strings"
)

var token = os.Getenv("ECHOVALUE_TOKEN")
var baseURL = "https://api.echovalue.dev"

func setHeader(req *http.Request) {
    req.Header.Set("x-token", token)
}
```

**Key-Value:**
```go
// Set
body := strings.NewReader("my value")
req, _ := http.NewRequest("POST", baseURL+"/kv/mybucket/mykey", body)
setHeader(req)
client := &http.Client{}
client.Do(req)

// Get
req, _ := http.NewRequest("GET", baseURL+"/kv/mybucket/mykey", nil)
setHeader(req)
resp, _ := client.Do(req)
defer resp.Body.Close()
value, _ := io.ReadAll(resp.Body)

// Delete
req, _ := http.NewRequest("DELETE", baseURL+"/kv/mybucket/mykey", nil)
setHeader(req)
client.Do(req)
```

## Agent State Sharing Pattern

Share state between AI agents using echoValue:

**Python Example:**
```python
import requests
import json

TOKEN = "your-token"
BASE = "https://api.echovalue.dev/kv"
GROUP = "shared-state"

# Agent 1: Save state
state = {"task": "analyzing data", "progress": "50%"}
requests.post(
    f"{BASE}/{GROUP}/status",
    headers={'x-token': TOKEN},
    data=json.dumps(state)
)

# Agent 2: Read state
response = requests.get(
    f"{BASE}/{GROUP}/status",
    headers={'x-token': TOKEN}
)
state = json.loads(response.text)
```

**TypeScript Example:**
```typescript
const TOKEN = "your-token";
const BASE = "https://api.echovalue.dev/kv";
const GROUP = "shared-state";

// Agent 1: Save state
const state = { task: "analyzing data", progress: "50%" };
await fetch(`${BASE}/${GROUP}/status`, {
  method: 'POST',
  headers: { 
    'x-token': TOKEN,
    'Content-Type': 'text/plain'
  },
  body: JSON.stringify(state)
});

// Agent 2: Read state
const response = await fetch(`${BASE}/${GROUP}/status`, {
  headers: { 'x-token': TOKEN }
});
const state = JSON.parse(await response.text());
```

For complete examples with tool definitions for AI agents, see:
https://docs.echovalue.dev/key-value/agent-state/
