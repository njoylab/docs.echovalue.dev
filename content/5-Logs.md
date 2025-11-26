---
weight: 35
title: Logs
---
# Logs Retrieval
> To access logs, execute:

```shell
curl 'https://token.echovalue.dev/logs?n=5' \
-H 'x-token: mytoken'
```

```javascript
// Using fetch API
fetch('https://token.echovalue.dev/logs?n=5', {
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
response = requests.get('https://token.echovalue.dev/logs',
  headers={'x-token': 'mytoken'},
  params={'n': 5}
)
print(response.json())
```

```php
<?php
$ch = curl_init('https://token.echovalue.dev/logs?n=5');
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
	req, _ := http.NewRequest("GET", "https://token.echovalue.dev/logs?n=5", nil)
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
> The above command returns a JSON with :
```json
{
    "logs": [
        {
            "id": "jd9kImh8U4In3odfNeKf",
            "method": "GET",
            "path": "/default/mykey",
            "error": "Key Not Found",
            "timestamp": "2023-12-07T12:14:16.124481Z",
            "expiration": "2023-12-14T12:14:16.12448Z",
            "cost": 1,
            "balance": 97
        },
        {
            "id": "6Ss3GtZPbVwqeyhGHSo1",
            "method": "POST",
            "path": "/default/test",
            "timestamp": "2023-12-07T12:04:11.453575Z",
            "expiration": "2023-12-14T12:04:11.453575Z",
            "cost": 1,
            "balance": 98
        },
        {
            "id": "T4rR1GHCteMwYOFRJLkx",
            "method": "GET",
            "path": "/default/test",
            "timestamp": "2023-12-07T12:01:58.63676Z",
            "expiration": "2023-12-14T12:01:58.63676Z",
            "cost": 1,
            "balance": 99
        }
    ],
    "n": 3
}
```
Retrieves a list of the latest API calls made using the user's tokens.
Logs have a TTL of 7 days and they are typically deleted within 24 hours after they expiration date.

### HTTP Request
`GET https://token.echovalue.dev/logs?n=5`

### HTTP Parameters
Parameter | Description | Optional
--------- | ----------- | -------
n | Number of log entries to retrieve. Defaults to 5 if not specified.| Yes


### HTTP Response
JSON with this values
Key | Description
--------- | -----------
n | Number of entries returned
logs | Array of Log entries

Key | Description
--------- | -----------
id | unique id of the log entry
method | Method requested
path | Path requested
error | Optional, error message
timestamp | Timestamp of Log Creation.
expiration | Expiration Timestamp of the Log Entry
cost | Cost deducted from the wallet
balance | Wallet balance

<aside class="notice">
Costs: 1 credit for each entry log returned ( `n` value in the response). Please note that `n` returned could be less than the value requested depending on wallet capacity and total number of entries
</aside>
