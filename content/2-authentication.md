---
weight: 11
title: Authentication
---

# Authentication

> To authorize, use this code:

```shell
# With shell, you can just pass the correct header with each request
curl 'api_endpoint_here' \
  -H 'x-token: mytoken'
```

```javascript
// Using fetch API
fetch('api_endpoint_here', {
  headers: {
    'x-token': 'mytoken'
  }
});
```

```python
import requests

# Using requests library
requests.get('api_endpoint_here',
  headers={'x-token': 'mytoken'}
)
```

```php
<?php
// Using cURL
$ch = curl_init('api_endpoint_here');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['x-token: mytoken']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
?>
```

```go
package main

import "net/http"

func main() {
	// Create request with authentication header
	req, _ := http.NewRequest("GET", "api_endpoint_here", nil)
	req.Header.Set("x-token", "mytoken")

	// Send request
	client := &http.Client{}
	client.Do(req)
}
```

> Remember to replace `mytoken` with your actual token.

**echoValue** uses API tokens to allow access to the API.

**The echoValue API** offers a streamlined way for users to interact with its services. To authenticate your requests, include the following header in your API calls:

`x-token: mytoken`

<aside class="notice">
You must replace <code>mytoken</code> with your personal API token.
</aside>
