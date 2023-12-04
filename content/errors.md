---
weight: 50
title: Errors

---

# Errors Codes
The API uses standard HTTP error codes, including 400 (Bad Request), 401 (Unauthorized), 402 (Payment Required), and others, to indicate various types of errors.

<aside class="notice">
Please note: API calls resulting in errors due to malformed requests will count as successful calls to prevent misuse.
</aside>

The API uses the following error codes:

## 4xx

Error Code | Meaning
---------- | -------
400 | Bad Request -- Your request is malformed
401 | Unauthorized -- Your API token is wrong
402 | Payment Required -- Your wallet is empty
403 | Forbidden -- You don't have the rights to call this endpoint
404 | Not Found -- The specified key could not be found
405 | Method Not Allowed -- You tried to access with an invalid method
406 | Not Acceptable -- You requested a format that isn't json
418 | I'm a teapot
429 | Too Many Requests -- You reached the rate limit

## 5xx

Error Code | Meaning
---------- | -------
500 | Internal Server Error -- We had a problem with our service. Try again later.
501 | Not Implemented -- Endpoint is not implemented
503 | Service Unavailable -- We're temporarily offline. Please try again later.
