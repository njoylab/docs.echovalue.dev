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

// with 30 seconds expiration
curl 'https://api.echovalue.dev/default/mykey?ttl=30' \
-H 'x-token: mytoken' \
-d 'newdata'
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