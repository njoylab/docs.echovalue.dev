# EchoValue API Documentation

[![Astro](https://img.shields.io/badge/Astro-6-orange.svg)](https://astro.build)
[![Starlight](https://img.shields.io/badge/Starlight-0.38-purple.svg)](https://starlight.astro.build)

Official API documentation for [EchoValue](https://www.echovalue.dev), an API-first platform for key-value storage, webhooks, and lightweight automation workflows.

🔗 **Live Documentation**: [docs.echovalue.dev](https://docs.echovalue.dev)

## Quick Start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to ./dist
npm run preview   # preview production build
```

## Project Structure

```
docs/
├── astro.config.mjs          # Astro + Starlight configuration
├── INSTALL.md                # Agent skill installation guide
├── install-skill.sh          # Installer for local agent/workspace files
├── src/
│   ├── assets/               # Processed assets (logo)
│   ├── content.config.ts     # Content collection schema
│   └── content/docs/         # MDX documentation pages
│       ├── index.mdx
│       ├── authentication.mdx
│       ├── token.mdx
│       ├── token/
│       │   ├── create.mdx
│       │   ├── balance.mdx
│       │   ├── recharge.mdx
│       │   ├── settings.mdx
│       │   └── update-settings.mdx
│       ├── logs.mdx
│       ├── response-headers.mdx
│       ├── errors.mdx
│       ├── openapi.mdx
│       ├── key-value/
│       │   ├── index.mdx
│       │   ├── set.mdx
│       │   ├── get.mdx
│       │   └── delete.mdx
│       ├── guides/
│       │   └── agent-shared-state.mdx
│       └── webhook/
│           ├── index.mdx
│           ├── create.mdx
│           ├── list.mdx
│           ├── get.mdx
│           ├── update.mdx
│           ├── delete.mdx
│           ├── test.mdx
│           ├── payload.mdx
│           └── formats/
│               ├── slack.mdx
│               ├── discord.mdx
│               ├── teams.mdx
│               ├── telegram.mdx
│               ├── pagerduty.mdx
│               └── custom.mdx
├── skill/                    # Shared skill assets and quick reference
├── agent-config/             # Agent-specific files for Codex, ChatGPT, Cursor, and Continue
└── static/                   # Static assets (favicons, openapi.yaml)
```

## AI Resources

- **Install Guide**: [INSTALL.md](https://github.com/njoylab/docs.echovalue.dev/blob/main/INSTALL.md)
- **LLMs Index**: [docs.echovalue.dev/llms.txt](https://docs.echovalue.dev/llms.txt)
- **LLMs Abridged**: [docs.echovalue.dev/llms-small.txt](https://docs.echovalue.dev/llms-small.txt)
- **LLMs Full**: [docs.echovalue.dev/llms-full.txt](https://docs.echovalue.dev/llms-full.txt)

## Links

- **EchoValue Website**: [echovalue.dev](https://www.echovalue.dev)
- **OpenAPI Specification**: [docs.echovalue.dev/openapi.yaml](https://docs.echovalue.dev/openapi.yaml)
- **Starlight**: [starlight.astro.build](https://starlight.astro.build)
