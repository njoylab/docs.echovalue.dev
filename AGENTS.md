# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

This is an **Astro + Starlight** documentation site for the **echoValue API** - a lightweight key-value database service designed for freelancers and small projects. Deployed to `https://docs.echovalue.dev`.

> **Migration note:** The `content/` directory and `config.toml` are legacy Hugo files kept for reference. The active Starlight site lives under `src/`.

## Key Commands

```bash
# Start dev server with live reload
npm run dev

# Build the site (outputs to ./dist)
npm run build

# Preview the production build
npm run preview
```

## Architecture

### Content Structure

All documentation lives in `src/content/docs/` as `.mdx` files:

- `index.mdx` (order: 1) — Introduction and overview
- `authentication.mdx` (order: 2) — Authentication with `x-token` header
- `token.mdx` (order: 3) — Token management (generate, check balance, recharge)
- `key-value.mdx` (order: 4) — Key-value store operations (GET/POST/DELETE)
- `mail2webhook.mdx` (order: 5) — Mail2Webhook service
- `logs.mdx` (order: 6) — Logs retrieval API
- `response-headers.mdx` (order: 7) — Response headers documentation
- `errors.mdx` (order: 8) — HTTP error codes
- `openapi.mdx` (order: 9) — OpenAPI specification

Sidebar order is controlled via `sidebar.order` in frontmatter.

### Configuration

- `astro.config.mjs` — Main Astro + Starlight configuration (sidebar, logo, social links)
- `src/content.config.ts` — Content collection schema (Astro 6 location)
- `static/` — Static assets served as-is (configured via `publicDir: './static'`)
  - Includes favicons, `openapi.yaml`, `robots.txt`, `logo.png`
- `src/assets/logo.png` — Logo for Starlight header (processed by Astro)

### API Documentation Patterns

1. **Callouts** — Use Starlight directives:
   ```markdown
   :::note
   Notice text here
   :::

   :::caution
   Warning text here
   :::
   ```

2. **Multi-language code examples** — Use `<Tabs syncKey="lang">` so language selection persists across pages:
   ```mdx
   import { Tabs, TabItem } from '@astrojs/starlight/components';

   <Tabs syncKey="lang">
   <TabItem label="cURL">
   ```sh
   curl ...
   ```
   </TabItem>
   <TabItem label="JavaScript">
   ```js
   fetch(...)
   ```
   </TabItem>
   </Tabs>
   ```

3. **Cost information** — Document credit costs in `:::note` blocks after each endpoint

4. **API Endpoints** — Base URLs:
   - Key-Value API: `https://api.echovalue.dev/kv/<group>/<key>`
   - Token management: `https://api.echovalue.dev/token`
   - Webhook API: `https://api.echovalue.dev/webhook`

### File Organization

```
docs/
├── astro.config.mjs          # Astro + Starlight config
├── package.json              # Dependencies (astro, @astrojs/starlight)
├── tsconfig.json             # TypeScript config
├── src/
│   ├── assets/               # Processed assets (logo)
│   ├── content.config.ts     # Content collection schema (Astro 6)
│   └── content/
│       └── docs/             # MDX documentation files
├── static/                   # Static assets (served as publicDir)
│   ├── openapi.yaml
│   ├── logo.png
│   └── favicon*.png / *.ico
├── dist/                     # Generated site (git-ignored)
└── node_modules/             # npm dependencies (git-ignored)
```

## Content Guidelines

When editing documentation:

1. **Sidebar order**: Use `sidebar.order` in frontmatter (lower = first in sidebar)
2. **Language tabs**: Always wrap multi-language examples in `<Tabs syncKey="lang">` with labels: `cURL`, `JavaScript`, `Python`, `PHP`, `Go`
3. **Credit costs**: Always document operation costs in `:::note` blocks
4. **Constraints**: Document length/size/time limits (30 char key/group limits, TTL ranges, etc.)
5. **Auth header**: Use `x-token` for authentication; document `x-cost` and `x-balance` response headers
6. **Endpoint sync is mandatory**: Whenever an endpoint is added, removed, or changed in `static/openapi.yaml`, update the human docs in `src/content/docs/` and the agent-facing docs (`skill/`, `agent-config/`, and install/setup docs if they summarize capabilities) in the same change.

## Important Notes

- Documentation-only repository (no API source code)
- Maximum key/group name length: 30 characters
- Maximum value length: 1000 characters (~1 KB)
- Maximum TTL: 2592000 seconds (30 days)
- Unused tokens expire after 2 years with data deletion
- Logs have 7-day TTL, deleted within 24 hours post-expiration
- Search powered by Pagefind (built automatically with `npm run build`)
