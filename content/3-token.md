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
Costs: 1 credit
</aside>

## Recharging Wallet
> To add credits to your wallet, use:
```shell
curl 'https://token.echovalue.dev' \
-H 'x-token: mytoken' \
-d 'token=recharge'
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
Please be aware that the card payment page will appear as nJoyLab. This is to simplify operations, as I use a single Stripe account for all my projects.</aside>