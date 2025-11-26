---
weight: 15
title: New API Token
---
# Token Management
## Generating a New Token

> To obtain a new API token, execute this command:

```shell
curl 'https://token.echovalue.dev' \
-d 'token=new'
```

```javascript
// Using fetch API
fetch('https://token.echovalue.dev', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'token=new'
})
.then(response => response.text())
.then(token => console.log(token));
```

```python
import requests

# Using requests library
response = requests.post('https://token.echovalue.dev',
  data={'token': 'new'}
)
print(response.text)
```

```php
<?php
$ch = curl_init('https://token.echovalue.dev');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'token=new');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$token = curl_exec($ch);
curl_close($ch);
echo $token;
?>
```

```go
package main

import (
	"io"
	"net/http"
	"strings"
)

func main() {
	body := strings.NewReader("token=new")
	resp, _ := http.Post("https://token.echovalue.dev", "application/x-www-form-urlencoded", body)
	defer resp.Body.Close()
	token, _ := io.ReadAll(resp.Body)
	println(string(token))
}
```

> This will return a new token as a string.:
```shell
mytoken
```
This endpoint requests a new API Token.
### HTTP Request
`POST https://token.echovalue.dev`

Parameter | Value
--------- | -----------
token | `new`

### HTTP Response
200 - String with the new user's token

<aside class="notice">
You will get <code>100</code> operation with your personal API token.
</aside>
<aside class="warning">
Tokens unused for two years will be automatically deactivated, and all associated data will be deleted. Please ensure regular API usage to keep your token active.
</aside>

## Checking Wallet Balance
> To view your remaining credits, use:

```shell
curl 'https://token.echovalue.dev' \
-H 'x-token: mytoken'
```

```javascript
// Using fetch API
fetch('https://token.echovalue.dev', {
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
response = requests.get('https://token.echovalue.dev',
  headers={'x-token': 'mytoken'}
)
print(response.json())
```

```php
<?php
$ch = curl_init('https://token.echovalue.dev');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['x-token: mytoken']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
$data = json_decode($response);
print_r($data);
?>
```

```go
package main

import (
	"encoding/json"
	"io"
	"net/http"
)

func main() {
	req, _ := http.NewRequest("GET", "https://token.echovalue.dev", nil)
	req.Header.Set("x-token", "mytoken")

	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var result map[string]interface{}
	json.Unmarshal(body, &result)
	println(result)
}
```

> The response will be a JSON object detailing your credit balance and token creation date.
```json
{"wallet":12345,"created":"2023-08-09T15:40:09.77Z"}
```
To view your remaining credits, use:
### HTTP Request
`GET https://token.echovalue.dev`

### HTTP Response
JSON with this values
Key | Description
--------- | -----------
wallet | Integer with the remaining credit
created | Date when the token has been created

<aside class="notice">
Costs: 1 credit. The best method to check your balance is to look at the `x-balance` response header following each request.
</aside>

## Recharging Wallet
> To add credits to your wallet, use:
```shell
curl 'https://token.echovalue.dev' \
-H 'x-token: mytoken' \
-d 'token=recharge' \
-d 'amount=1'
```
> This returns a Stripe payment link for the recharge process:
```
https://buy.stripe.com/<productID>?client_reference_id=mytoken
```

To add credits to your wallet, use:

### HTTP Request
`POST https://token.echovalue.dev`

Parameter | Value  | Description
--------- | ----------- | -----------
token | `recharge` | constant
amount | `1` | Select the number of million operations you wish to recharge. Available options are `1` and `3`, with the default set to `1`.

### HTTP Response
200 - String with the payment link

Follow the link to make a payment and recharge your wallet

<aside class="notice">
Please be aware that the card transaction will appear as nJoyLab on your statement. This is to simplify operations, as I use a single Stripe account for all my projects.</aside>