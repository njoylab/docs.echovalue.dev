---
weight: 11
title: Authentication
---

# Authentication

> To authorize, use this code:

```shell
# With shell, you can just pass the correct header with each request
curl 'api_endpoint_here'
  -H 'x-token: mytoken'
```


> Remember to replace `mytoken` with your actual token.

**echoValue** uses API tokens to allow access to the API.

**The echoValue API** offers a streamlined way for users to interact with its services. To authenticate your requests, include the following header in your API calls:

`x-token: mytoken`

<aside class="notice">
You must replace <code>mytoken</code> with your personal API token.
</aside>
