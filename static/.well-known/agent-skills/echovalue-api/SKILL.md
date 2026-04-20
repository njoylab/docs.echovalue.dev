---
name: echovalue-api
description: Use the echoValue API to manage shared key-value state, mailbox-to-webhook integrations, wallet credits, and webhook tests.
---

# EchoValue API

Use this skill when the user wants to integrate with echoValue or operate the API directly.

## When to use it

- Store or read short-lived shared state for agents.
- Configure Mail2Webhook integrations for Slack, Discord, Teams, Telegram, PagerDuty, or custom webhooks.
- Generate a token, inspect wallet balance, recharge credits, or review recent logs.

## API overview

- Base API: `https://api.echovalue.dev`
- Documentation: `https://docs.echovalue.dev`
- OpenAPI: `https://docs.echovalue.dev/openapi.yaml`
- Authentication: send `x-token: <token>` on paid endpoints

## Core endpoints

- `POST /token` with `token=new` creates a token with 100 free credits.
- `GET /token` returns wallet balance and token metadata.
- `GET /token/logs` returns recent request logs.
- `POST /kv/<bucket>/<key>?ttl=<seconds>` stores a string value.
- `GET /kv/<bucket>/<key>` reads a value.
- `DELETE /kv/<bucket>/<key>` deletes a value.
- `POST /webhook` creates or updates a mailbox-to-webhook route.
- `GET /webhook` lists configured webhook routes.
- `DELETE /webhook?id=<id>` removes a route.
- `POST /webhook/test?id=<id>` sends a test event to a configured route.

## Constraints

- Bucket and key names are limited to 30 characters.
- Values are limited to 1000 characters.
- Maximum TTL is 2592000 seconds (30 days).
- Do not store sensitive data in echoValue.

## Execution notes

- Prefer using the documented API directly instead of inventing wrappers.
- Surface `x-cost` and `x-balance` headers when helpful so the user sees credit impact.
- If the user has not provided a token, guide them to create one first.

