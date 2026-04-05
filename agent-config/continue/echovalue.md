# EchoValue API for Continue

Use EchoValue when the user asks to store temporary state, configure email-to-webhook delivery, inspect token balance, or manage key-value entries.

## Rules

- Read `ECHOVALUE_TOKEN` from the environment when available.
- Base URL: `https://api.echovalue.dev`.
- Key-value store: `/kv/<bucket>/<key>`.
- Webhooks: `/webhook`.
- Token and logs: `/token` and `/token/logs`.
- Keep answers short and operational.
- Mention cost and remaining balance when the action consumes credits.

## Practical guidance

- Ask for the token only if the environment variable is missing.
- Use the smallest API call that satisfies the request.
- For multi-agent workflows, explain how to store and read shared state with the same token and bucket.
