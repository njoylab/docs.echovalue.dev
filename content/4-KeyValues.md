---
weight: 20
title: DB API - Key-Value Store
---

# DB API: Key-Value Store

## Setting a Key/Value Pair

> To store a new key/value pair, use:

```shell
curl 'https://api.echovalue.dev/default/mykey' \
-H 'x-token: mytoken' \
-d 'newdata'

# with 30 seconds expiration
curl 'https://api.echovalue.dev/default/mykey?ttl=30' \
-H 'x-token: mytoken' \
-d 'newdata'
```

```javascript
// Using fetch API
fetch('https://api.echovalue.dev/default/mykey', {
  method: 'POST',
  headers: {
    'x-token': 'mytoken'
  },
  body: 'newdata'
});

// with 30 seconds expiration
fetch('https://api.echovalue.dev/default/mykey?ttl=30', {
  method: 'POST',
  headers: {
    'x-token': 'mytoken'
  },
  body: 'newdata'
});
```

```python
import requests

# Using requests library
requests.post('https://api.echovalue.dev/default/mykey',
  headers={'x-token': 'mytoken'},
  data='newdata'
)

# with 30 seconds expiration
requests.post('https://api.echovalue.dev/default/mykey?ttl=30',
  headers={'x-token': 'mytoken'},
  data='newdata'
)
```

```php
<?php
// Using cURL
$ch = curl_init('https://api.echovalue.dev/default/mykey');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'newdata');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['x-token: mytoken']);
curl_exec($ch);
curl_close($ch);

// with 30 seconds expiration
$ch = curl_init('https://api.echovalue.dev/default/mykey?ttl=30');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'newdata');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['x-token: mytoken']);
curl_exec($ch);
curl_close($ch);
?>
```

```go
package main

import (
	"net/http"
	"strings"
)

func main() {
	// Create request
	body := strings.NewReader("newdata")
	req, _ := http.NewRequest("POST", "https://api.echovalue.dev/default/mykey", body)
	req.Header.Set("x-token", "mytoken")

	// Send request
	client := &http.Client{}
	client.Do(req)

	// with 30 seconds expiration
	req2, _ := http.NewRequest("POST", "https://api.echovalue.dev/default/mykey?ttl=30", body)
	req2.Header.Set("x-token", "mytoken")
	client.Do(req2)
}
```

This endpoint sets the value of the key.
The maximum length of a key is **30** characters.
The maximum length of a group name is **30** characters.
The maximum length of value is **30** characters.

Optionally, you can set a time-to-live (TTL) for the key.

### HTTP Request
`POST https://api.echovalue.dev/<group>/<key>?ttl=<seconds>`

### PATH Parameters
Parameter | Description
--------- | -----------
group | You can specify in which group of keys save the value. You can start using just `default`
key | Key to set

### HTTP Parameters
Parameter | Description | Optional
--------- | ----------- | -------
ttl | You can specify in seconds the time to live for this key. If omitted key will expire in 30 days if not updated. Maximum value is 2592000 ( 30 days) | Yes

<aside class="notice">
Costs: 1 credit
</aside>

## Retrieving a Key/Value Pair
> Retrieve the value of a key with:

```shell
curl 'https://api.echovalue.dev/default/mykey' \
-H 'x-token: mytoken'
```

```javascript
// Using fetch API
fetch('https://api.echovalue.dev/default/mykey', {
  headers: {
    'x-token': 'mytoken'
  }
})
.then(response => response.text())
.then(data => console.log(data));
```

```python
import requests

# Using requests library
response = requests.get('https://api.echovalue.dev/default/mykey',
  headers={'x-token': 'mytoken'}
)
print(response.text)
```

```php
<?php
// Using cURL
$ch = curl_init('https://api.echovalue.dev/default/mykey');
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
	"io"
	"net/http"
)

func main() {
	// Create request
	req, _ := http.NewRequest("GET", "https://api.echovalue.dev/default/mykey", nil)
	req.Header.Set("x-token", "mytoken")

	// Send request and read response
	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	println(string(body))
}
```

This endpoint gets the value of the key.

### HTTP Request
`GET https://api.echovalue.dev/<group>/<key>`

### PATH Parameters
Parameter | Description
--------- | -----------
group | You can specify in which group of keys save the value. You can start using just `default`
key | Key to retreve

<aside class="notice">
Costs: 1 credit
</aside>

## Delete a Key/Value
> To delete a key/value pair, use:

```shell
curl 'https://api.echovalue.dev/default/mykey' \
-H 'x-token: mytoken' \
-X DELETE
```

```javascript
// Using fetch API
fetch('https://api.echovalue.dev/default/mykey', {
  method: 'DELETE',
  headers: {
    'x-token': 'mytoken'
  }
});
```

```python
import requests

# Using requests library
requests.delete('https://api.echovalue.dev/default/mykey',
  headers={'x-token': 'mytoken'}
)
```

```php
<?php
// Using cURL
$ch = curl_init('https://api.echovalue.dev/default/mykey');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['x-token: mytoken']);
curl_exec($ch);
curl_close($ch);
?>
```

```go
package main

import "net/http"

func main() {
	// Create DELETE request
	req, _ := http.NewRequest("DELETE", "https://api.echovalue.dev/default/mykey", nil)
	req.Header.Set("x-token", "mytoken")

	// Send request
	client := &http.Client{}
	client.Do(req)
}
```
This endpoint delete the key and it's value.

### HTTP Request
`DELETE https://api.echovalue.dev/<group>/<key>`

### PATH Parameters
Parameter | Description
--------- | -----------
group | You can specify in which group of keys save the value. You can start using just `default`
key | Key to retreve

<aside class="notice">
Costs: 1 credit
</aside>