# EchoValue API Documentation

[![Astro](https://img.shields.io/badge/Astro-6-orange.svg)](https://astro.build)
[![Starlight](https://img.shields.io/badge/Starlight-0.38-purple.svg)](https://starlight.astro.build)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

Official API documentation for [EchoValue](https://www.echovalue.dev) - a lightweight key-value database service designed for freelancers and small projects.

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
├── src/
│   ├── assets/               # Processed assets (logo)
│   ├── content.config.ts     # Content collection schema
│   └── content/docs/         # MDX documentation pages
│       ├── index.mdx
│       ├── authentication.mdx
│       ├── token.mdx
│       ├── key-value.mdx
│       ├── mail2webhook.mdx
│       ├── logs.mdx
│       ├── response-headers.mdx
│       ├── errors.mdx
│       └── openapi.mdx
├── agent-config/            # Skill/config files for Codex, ChatGPT, Cursor, and Continue
└── static/                   # Static assets (favicons, openapi.yaml)
```

## Links

- **EchoValue Website**: [echovalue.dev](https://www.echovalue.dev)
- **OpenAPI Specification**: [docs.echovalue.dev/openapi.yaml](https://docs.echovalue.dev/openapi.yaml)
- **Starlight**: [starlight.astro.build](https://starlight.astro.build)
