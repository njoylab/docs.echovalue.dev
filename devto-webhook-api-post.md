---
title: Turning email and cron into webhooks
tags: webdev, api, serverless, tools
---

I had two small problems that kept coming back in side projects:

- I wanted an email address that would call my webhook
- I wanted a cron job that would call my webhook

I did not want another dashboard or a full automation product for that, so I added both to echoValue.

Email mode creates an address like this:

```text
r_abcd1234@hook.echovalue.dev
```

Anything sent there is posted to the URL you configured.

```sh
curl 'https://api.echovalue.dev/webhook' \
  -H 'x-token: YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "webhookId": "support-alerts",
    "url": "https://example.com/hooks/support",
    "includeAttachments": false
  }'
```

There are also output formats for Slack, Discord, Teams, Telegram, and PagerDuty, because for some cases I just want email alerts to land in a channel.

The other mode is scheduled webhooks:

```sh
curl 'https://api.echovalue.dev/webhook' \
  -H 'x-token: YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "webhookId": "daily-sync",
    "url": "https://example.com/hooks/daily-sync",
    "schedule": {
      "cron": "0 9 * * *",
      "timezone": "Europe/Rome"
    }
  }'
```

This is intentionally small. No workflow builder, no queue UI, no complex routing.

Just:

```text
email -> webhook
cron  -> webhook
```

Pricing uses credits, mostly to prevent abuse. The actual cost per request is very low. New tokens include free credits; if someone wants to test more seriously, I can create a voucher.

Docs:

https://docs.echovalue.dev/webhook/

Landing page:

https://www.echovalue.dev/webhook-api/

Curious if other people have similar tiny webhook use cases.
