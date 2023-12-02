---
weight: 15
title: New API Token
---
# Token
## Request a new Token

> To require a new API Token, use this code:

```shell
curl 'https://token.echovalue.dev' \
-d 'token=new'
```
> The above command returns a string with just the new TOKEN:
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

## Wallet Check

```shell
curl 'https://token.echovalue.dev' \
-h 'x-token: mytoken'
```
> The above command returns a JSON with :
```json
{"wallet":12345,"created":"2023-08-09T15:40:09.77Z"}
```
Retrieves the current number of remaining credits for the user's token.
### HTTP Request
`GET https://token.echovalue.dev`

### HTTP Response
JSON with this values
Key | Description
--------- | -----------
wallet | Integer with the remaining credit
created | Date when the token has been created

<aside class="notice">
Costs: 1 credit
</aside>

## Wallet Recharge

```shell
curl 'https://token.echovalue.dev' \
-d 'token=recharge'
```
> The above command returns an URL to Stripe :
```
https://buy.stripe.com/<randomID>?client_reference_id=mytoken
```

Follow the link to make a payment and recharge your tokens

### HTTP Request
`POST https://token.echovalue.dev`

Parameter | Value
--------- | -----------
token | `recharge`

### HTTP Response
200 - String with the payment link
