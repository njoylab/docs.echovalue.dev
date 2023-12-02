---
weight: 11
title: Authentication
---

# Authentication

> To authorize, use this code:

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "x-token: mytoken"
```


> Make sure to replace `mytoken` with your API token.

**EchoValue** uses API tokens to allow access to the API.

**EchoValue** expects for the API token to be included in all API requests to the server in a header that looks like the following:

`x-token: mytoken`

<aside class="notice">
You must replace <code>mytoken</code> with your personal API token.
</aside>
