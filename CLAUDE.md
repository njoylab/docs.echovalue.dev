# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based documentation site for the **echoValue API** - a lightweight key-value database service designed for freelancers and small projects. The site is built using the DocuAPI theme (a Hugo port of Slate) and deployed to `https://docs.echovalue.dev`.

## Key Commands

### Development
```bash
# Start Hugo development server with live reload
hugo server

# Build the site (outputs to ./public directory)
hugo

# Build with minification for production
hugo --minify
```

### Theme Management
```bash
# Update theme to latest version
hugo mod get -u github.com/bep/docuapi/v2

# Update all Hugo modules
hugo mod get -u

# Clean module cache
hugo mod clean

# View module dependency graph
hugo mod graph
```

### Dependencies
```bash
# Install PostCSS dependencies (required for theme)
npm install

# Check Hugo version (requires v0.138.0+ extended)
hugo version
```

## Architecture

### Content Structure

Documentation content lives in `content/` with numbered prefixes for ordering:

- `1-main.md` (weight: 10) - Introduction and overview
- `2-authentication.md` (weight: 11) - Authentication with `x-token` header
- `3-token.md` (weight: 15) - Token management (generate, check balance, recharge)
- `4-KeyValues.md` (weight: 20) - Key-value store operations (GET/POST/DELETE)
- `5-Logs.md` (weight: 35) - Logs retrieval API
- `10-response-headers.md` (weight: 40) - Response headers documentation
- `errors.md` (weight: 50) - HTTP error codes

Files use `weight` in frontmatter to control sidebar ordering (lower numbers appear first).

### Theme Configuration

- Uses DocuAPI v2.4.2 theme via Hugo Modules (`github.com/bep/docuapi/v2`)
- AlpineJS-based (v2 replaced jQuery with AlpineJS for better performance)
- PostCSS required for stylesheet compilation
- Code highlighting: Monokai style with fenced code blocks
- Single language example tabs: Shell/CURL only

### Theme Customization

Custom theme hooks in `layouts/partials/`:

- `hook_left_sidebar_logo.html` - Custom logo linking to https://www.echovalue.dev
  - Logo file: `static/logo.png`
  - Opens in new tab with `target="_blank"`

Available hooks for further customization:
- `hook_head_end.html` - Additional head content (CSS, meta tags)
- `hook_body_end.html` - Additional body end content (analytics, scripts)
- `hook_left_sidebar_start.html` - Top of left sidebar
- `hook_left_sidebar_end.html` - Bottom of left sidebar

### Important Configuration Details

From `config.toml`:
- Maximum key length: 30 characters (configured in params)
- Maximum group name: 30 characters
- Maximum value length: 30 characters
- Free tokens on signup: 500
- Default content language: English
- Search enabled
- Goldmark renderer with unsafe HTML enabled (for styled aside boxes)

### API Documentation Patterns

The documentation follows these conventions:

1. **Asides/Callouts**: Uses HTML-style aside blocks for notices and warnings
   ```markdown
   <aside class="notice">
   Notice text here
   </aside>

   <aside class="warning">
   Warning text here
   </aside>
   ```

2. **Code Examples**: Shell/CURL examples appear in right column via theme
   - Use triple backticks with `shell` language identifier
   - Prefix with `>` blockquote for right-column placement

3. **Cost Information**: Each endpoint documents credit cost in an aside block

4. **API Endpoints**: Base URLs are:
   - Main API: `https://api.echovalue.dev/<group>/<key>`
   - Token management: `https://token.echovalue.dev`

### File Organization

```
docs/
├── config.toml           # Hugo configuration
├── go.mod / go.sum       # Hugo modules dependencies
├── package.json          # PostCSS dependencies
├── content/              # API documentation markdown files
├── layouts/
│   └── partials/         # Theme customization hooks
│       └── hook_left_sidebar_logo.html
├── static/               # Static assets (logo, favicons)
│   └── logo.png
├── public/               # Generated site (git-ignored, build output)
├── node_modules/         # npm dependencies (git-ignored)
├── _vendor/              # Hugo module cache (git-ignored)
├── data/                 # Data files
└── resources/            # Hugo resources cache
```

## Content Guidelines

When editing documentation:

1. **Maintain weight ordering**: Ensure frontmatter `weight` values create logical flow
2. **Preserve example format**: Keep `>` prefix for right-column code examples
3. **Credit costs**: Always document operation costs in aside blocks
4. **Constraints**: Document any length/size/time limits (30 char limits, TTL ranges, etc.)
5. **Headers**: Use `x-token` for authentication, document `x-cost` and `x-balance` response headers

## Important Notes

- This is a documentation-only repository (no API source code)
- The API itself is a separate service not contained in this repo
- Maximum TTL for keys: 2592000 seconds (30 days)
- Unused tokens expire after 2 years with data deletion
- Logs have 7-day TTL and are deleted within 24 hours post-expiration
- Site uses syntax highlighting with Monokai theme
