---
weight: 15
title: Logs
---
# Logs

```shell
curl 'https://token.echovalue.dev?logs?n=5' \
-h 'x-token: mytoken'
```
> The above command returns a JSON with :
```json
{"logs":[{"method":"POST","path":"/default/test","timestamp":"2023-12-02T12:00:52.736Z","expiration":"2024-01-01T12:00:52.719624Z","cost":0},{"method":"POST","path":"/default/test","timestamp":"2023-12-02T11:18:21.987Z","expiration":"2024-01-01T11:18:21.985298Z","cost":0},{"method":"POST","path":"/default/test","timestamp":"2023-12-02T11:18:14.416Z","expiration":"2024-01-01T11:18:14.413627Z","cost":0},{"method":"DELETE","path":"/default/test","timestamp":"2023-12-02T11:12:49.111Z","expiration":"2024-01-01T11:12:49.097578Z","cost":0},{"method":"POST","path":"/default/test","timestamp":"2023-12-02T11:00:07.316Z","expiration":"2024-01-01T11:00:07.303867Z","cost":0}],"n":5}
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
method | Method requested
path | Path Requested
timestamp | TimeStamp creation
expiration | TimeStamp when the entry will expire
cost | cost deducted from the wallet

<aside class="notice">
Costs: 1 credit for each entry log returned ( `n` value in the response). Please note that `n` returned could be less than the value requested depending on wallet capacity and total number of entries
</aside>
