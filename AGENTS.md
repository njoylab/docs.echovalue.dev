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
- `token.mdx` (order: 3) — Token management overview
- `token/` — Token endpoint reference pages
- `key-value/` — Key-value overview and endpoint reference pages
- `guides/` — Product guides and use-case pages
- `webhook/` — Webhook overview and endpoint reference pages
- `logs.mdx` (order: 6) — Logs retrieval API
- `response-headers.mdx` (order: 7) — Response headers documentation
- `errors.mdx` (order: 8) — HTTP error codes
- `openapi.mdx` (order: 9) — OpenAPI specification

Sidebar order is controlled via `sidebar.order` in frontmatter.

### Configuration

- `astro.config.mjs` — Main Astro + Starlight configuration (sidebar, logo, social links)
- `src/content.config.ts` — Content collection schema (Astro 6 location)
- `static/` — Static assets served as-is (configured via `publicDir: './static'`)
  - Includes favicons, generated `openapi.yaml`, `robots.txt`, `logo.png`
- `src/assets/logo.png` — Logo for Starlight header (processed by Astro)

### OpenAPI Source

`static/openapi.yaml` is generated from `/Users/emln/dev/njoylab.com/echovalue.dev/functions/openapi.yaml`. Do not edit `static/openapi.yaml` directly unless explicitly regenerating or synchronizing the generated copy. Make public API contract changes in the source file first, then update the generated static copy.

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
7. **Use a Utilities section for cross-cutting endpoints**: Endpoints that do not fit primary product areas like token management, key-value, or webhook (for example `GET /myip`) should live under a dedicated sidebar group such as `Utilities`.
8. **Use fixed page archetypes**:
   - Overview pages: intro, endpoints, pricing, limits, related pages when relevant
   - Endpoint pages: request, response, status codes, examples
   - Integration or guide pages: prerequisites, setup, configuration, output, notes
9. **Keep guides out of endpoint sections**: Tutorial or use-case content such as agent workflows should live under a dedicated `Guides` section rather than inside API reference groups.
10. **Terminology and style**:
   - Use `credits`, not `tokens`, for billing language
   - Use trailing slashes in internal doc links
   - Avoid decorative `---` separators in page bodies
   - Use `Pricing` only on overview pages and `:::note` cost callouts on endpoint pages

### Documentation Maintenance Principles

Use these rules when adding or revising pages so the documentation stays coherent over time:

1. **Document the public contract, not the implementation**: Describe the endpoint, request, response, limits, costs, status codes, and user-visible behavior. Do not expose internal architecture, routing, queues, workers, vendors, cloud providers, or service boundaries unless they are part of the public API contract.
2. **Never mention upstream hops for API-backed APIs**: If an echoValue endpoint calls another API or service internally, do not say that the request is proxied, forwarded upstream, delegated to another API, or handled by an upstream provider. Phrase it as echoValue behavior instead, for example "returns URL metadata", "runs DNS lookup", or "delivers the webhook payload".
3. **Never document internal endpoints**: Do not mention, link, or describe endpoints that are not exposed to users, even when explaining limits or payload formats. State the public behavior instead, for example "inbound email payloads are limited to 1 MiB after parsing."
4. **Never name infrastructure vendors**: Do not mention Cloudflare, cloud services, provider dashboards, provider logs, workers, routing products, queues, storage services, or any other infrastructure vendor used by echoValue. Use vendor-neutral wording such as "inbound email delivery" or "echoValue processing."
5. **Keep source-of-truth files synchronized**: For every API change, update the source OpenAPI file at `/Users/emln/dev/njoylab.com/echovalue.dev/functions/openapi.yaml`, regenerate or synchronize `static/openapi.yaml`, update the matching page in `src/content/docs/`, sidebar entries in `astro.config.mjs` if navigation changes, and agent-facing docs that summarize the same capability.
6. **Prefer stable examples over exhaustive examples**: Show the smallest complete request and a representative successful response. Avoid documenting incidental fields unless they are stable enough for users to rely on.
7. **Separate guarantees from best-effort behavior**: Use direct language for guaranteed fields, limits, and costs. Mark inferred, optional, source-dependent, or best-effort results clearly so users do not build against unstable behavior.
8. **Keep naming consistent across surfaces**: Endpoint names, field names, sidebar labels, OpenAPI operation summaries, page titles, and guide terminology should use the same wording unless there is a clear user-facing reason to differ.
9. **Write from the user's perspective**: Favor action-oriented descriptions such as "Create a webhook" or "Get the current balance". Avoid implementation phrasing such as "the backend stores", "the worker processes", or "the service forwards to another internal endpoint".
10. **Maintain page archetypes**: Endpoint pages should include request, response, status codes, examples, and a cost note. Overview pages should include purpose, endpoints, pricing, limits, and related pages. Guides should include prerequisites, setup, configuration, output, and notes.
11. **Preserve cross-link hygiene**: Add related links when they reduce navigation friction, use trailing slashes, and avoid orphan pages by adding new docs to the sidebar when they are meant for users.
12. **Verify docs as docs**: After meaningful documentation changes, run `npm run build` to catch MDX, Starlight, sidebar, and generated `llms.txt` issues.

## Important Notes

- Documentation-only repository (no API source code)
- Maximum key/group name length: 30 characters
- Maximum value length: 1000 characters (~1 KB)
- Maximum TTL: 2592000 seconds (30 days)
- Unused tokens expire after 2 years with data deletion
- Logs have 7-day TTL, deleted within 24 hours post-expiration
- Search powered by Pagefind (built automatically with `npm run build`)
