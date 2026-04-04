---
weight: 25
title: Mail2Webhook Service
---

# Mail2Webhook Service

The Mail2Webhook service allows you to receive email notifications at a custom webhook URL. Each wallet can have one webhook configured, and emails sent to `<wallet-id>@hook.echovalue.dev` will be forwarded to your webhook.


<aside class="notice">
Costs: Each webhook operation (get, set, or delete) costs 1 credit. Each email processed costs 1 credit.
</aside>

## Configure Webhook

> To configure or update your webhook, use:

```shell
curl 'https://api.echovalue.dev/webhook' \
-H 'x-token: mytoken' \
-H 'Content-Type: application/json' \
-d '{"url":"https://yourdomain.com/webhook","headers":{"Authorization":"Bearer secret"}}'
```

```javascript
// Using fetch API
fetch('https://api.echovalue.dev/webhook', {
  method: 'POST',
  headers: {
    'x-token': 'mytoken',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://yourdomain.com/webhook',
    headers: {
      'Authorization': 'Bearer secret'
    }
  })
});
```

```python
import requests
import json

# Using requests library
response = requests.post('https://api.echovalue.dev/webhook',
  headers={
    'x-token': 'mytoken',
    'Content-Type': 'application/json'
  },
  data=json.dumps({
    'url': 'https://yourdomain.com/webhook',
    'headers': {
      'Authorization': 'Bearer secret'
    }
  })
)
```

```php
<?php
// Using cURL
$data = json_encode([
  'url' => 'https://yourdomain.com/webhook',
  'headers' => [
    'Authorization' => 'Bearer secret'
  ]
]);

$ch = curl_init('https://api.echovalue.dev/webhook');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'x-token: mytoken',
  'Content-Type: application/json'
]);
curl_exec($ch);
curl_close($ch);
?>
```

```go
package main

import (
	"bytes"
	"encoding/json"
	"net/http"
)

func main() {
	// Create request body
	payload := map[string]interface{}{
		"url": "https://yourdomain.com/webhook",
		"headers": map[string]string{
			"Authorization": "Bearer secret",
		},
	}
	jsonData, _ := json.Marshal(payload)
	body := bytes.NewBuffer(jsonData)

	// Create request
	req, _ := http.NewRequest("POST", "https://api.echovalue.dev/webhook", body)
	req.Header.Set("x-token", "mytoken")
	req.Header.Set("Content-Type", "application/json")

	// Send request
	client := &http.Client{}
	client.Do(req)
}
```

This endpoint sets the webhook for this wallet (upsert operation). Only one webhook can be configured per wallet.

### HTTP Response

> Response
```json
{
  "webhook": "https://yourdomain.com/webhook",
  "headers": {
    "Authorization": "<redacted>"
  },
  "email": "mytoken@hook.echovalue.dev",
  "hash": "a1b2c3d4e5f6..."
}
```

### HTTP Request
`POST https://api.echovalue.dev/webhook`

### HTTP Headers
Header | Description
------- | -----------
x-token | Your wallet ID (minimum 10 characters)
Content-Type | Must be `application/json`

### Request Body
Parameter | Description | Required
--------- | ----------- | -------
url | Callback URL to receive webhook events (must be HTTPS) | Yes
headers | Optional custom headers to include in the callback request | No

<aside class="warning">
Webhook URL Requirements: The webhook URL must be HTTPS and point to a public host. Localhost or private IP addresses are not allowed.
</aside>


<aside class="notice">
Costs: 1 credit
</aside>

## Get Webhook Configuration

> To retrieve your current webhook configuration, use:

```shell
curl 'https://api.echovalue.dev/webhook' \
-H 'x-token: mytoken'
```

```javascript
// Using fetch API
fetch('https://api.echovalue.dev/webhook', {
  headers: {
    'x-token': 'mytoken'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

```python
import requests

# Using requests library
response = requests.get('https://api.echovalue.dev/webhook',
  headers={'x-token': 'mytoken'}
)
print(response.json())
```

```php
<?php
// Using cURL
$ch = curl_init('https://api.echovalue.dev/webhook');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['x-token: mytoken']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
echo $response;
?>
```

```go
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func main() {
	// Create request
	req, _ := http.NewRequest("GET", "https://api.echovalue.dev/webhook", nil)
	req.Header.Set("x-token", "mytoken")

	// Send request and read response
	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	fmt.Println(string(body))
}
```

This endpoint returns the currently configured webhook for this wallet.

### HTTP Response

> Response
```json
{
  "webhook": "https://yourdomain.com/webhook",
  "headers": {
    "Authorization": "<redacted>"
  },
  "email": "mytoken@hook.echovalue.dev",
  "hash": "a1b2c3d4e5f6..."
}
```

If no webhook is configured, only the email and hash fields will be returned:
> No webhook Response

```json
{
  "email": "mytoken@hook.echovalue.dev",
  "hash": "a1b2c3d4e5f6..."
}
```

`GET https://api.echovalue.dev/webhook`

### HTTP Headers
Header | Description
------- | -----------
x-token | Your wallet ID (minimum 10 characters)

### Response Format
The response includes your webhook configuration:

> Response
```json
{
  "webhook": "https://yourdomain.com/webhook",
  "headers": {
    "Authorization": "<redacted>"
  },
  "email": "mytoken@hook.echovalue.dev",
  "hash": "a1b2c3d4e5f6..."
}
```

If no webhook is configured, only the email and hash fields will be returned:
> No webhook Response

```json
{
  "email": "mytoken@hook.echovalue.dev",
  "hash": "a1b2c3d4e5f6..."
}
```

<aside class="notice">
Security Note: Use the `hash` field in webhook payloads instead of email to avoid exposing your wallet token
</aside>

```javascript
// Using fetch API
fetch('https://api.echovalue.dev/webhook', {
  method: 'DELETE',
  headers: {
    'x-token': 'mytoken'
  }
});
```

```python
import requests

# Using requests library
requests.delete('https://api.echovalue.dev/webhook',
  headers={'x-token': 'mytoken'}
)
```

```php
<?php
// Using cURL
$ch = curl_init('https://api.echovalue.dev/webhook');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['x-token: mytoken']);
curl_exec($ch);
curl_close($ch);
?>
```

```go
package main

import (
	"net/http"
)

func main() {
	// Create DELETE request
	req, _ := http.NewRequest("DELETE", "https://api.echovalue.dev/webhook", nil)
	req.Header.Set("x-token", "mytoken")

	// Send request
	client := &http.Client{}
	client.Do(req)
}
```

This endpoint removes the configured webhook for this wallet.

### HTTP Response

> Response
```json
{
  "email": "mytoken@hook.echovalue.dev",
  "hash": "a1b2c3d4e5f6..."
}
```

### HTTP Request
`DELETE https://api.echovalue.dev/webhook`

### HTTP Headers
Header | Description
------- | -----------
x-token | Your wallet ID (minimum 10 characters)

<aside class="notice">
Costs: 1 credit 
</aside>

## Webhook Payload

When an email is received at your wallet's email address (`<wallet-id>@hook.echovalue.dev`), the service will send a POST request to your configured webhook URL with the following JSON payload:

```json
{
  "externalMessageId": "<CA+abc123@mail.gmail.com>",
  "receivedAt": "2026-04-04T09:21:35.218Z",
  "from": { "email": "john@gmail.com", "name": "John Snow" },
  "to": { "hash": "a1b2c3d4e5f6..." },
  "subject": "Alert: Server down",
  "text": "Server #3 is not responding",
  "html": "<div>Server #3 is not responding</div>",
  "headers": { /* raw email headers */ },
  "attachments": [
    {
      "filename": "attachment.pdf",
      "contentType": "application/pdf",
      "size": 33380,
      "downloadUrl": "<presigned_url>",
      "downloadUrlExpiresAt": "2026-04-04T09:26:35.218Z"
    }
  ]
}
```

### Payload Fields

Field | Type | Description
------ | ---- | -----------
externalMessageId | string | Unique identifier for the email message
receivedAt | string (ISO 8601 timestamp) | When the email was received by the service
from | object | Sender information with email and optional name
to | object | Recipient information with hash (use hash instead of exposing wallet token)
subject | string | Email subject line
text | string | Plain text version of the email body
html | string | HTML version of the email body (if present)
headers | object | Raw email headers as key-value pairs
attachments | array | List of file attachments (empty if no attachments)

#### Attachment Object Fields

Field | Type | Description
------ | ---- | -----------
filename | string | Original filename of the attachment
contentType | string | MIME type of the attachment
size | integer | File size in bytes
downloadUrl | string | Presigned URL to download the attachment (expires in 1 hour)
downloadUrlExpiresAt | string (ISO 8601 timestamp) | When the download URL expires

<aside class="notice">
Costs: Each email processed costs 1 credit (in addition to webhook operation credits)
</aside>

<aside class="warning">
Security: Your webhook endpoint should validate that requests come from the Mail2Webhook service. You can implement IP whitelisting or verify request signatures if needed.
</aside>

