# EchoValue API Documentation

[![Hugo](https://img.shields.io/badge/Hugo-0.138.0+-blue.svg)](https://gohugo.io)
[![Theme](https://img.shields.io/badge/Theme-DocuAPI%20v2.4.2-blueviolet.svg)](https://github.com/bep/docuapi)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

Official API documentation for [EchoValue](https://www.echovalue.dev) - a lightweight key-value database service designed for freelancers and small projects.

🔗 **Live Documentation**: [docs.echovalue.dev](https://docs.echovalue.dev)

## About EchoValue

EchoValue is a simple key-value database system tailored for developers working on small projects who need:
- Quick setup without complex infrastructure
- Simple REST API for storing and retrieving data
- Credit-based pricing model
- No sensitive data storage (by design)

## Built With

- **[Hugo](https://gohugo.io)** - Fast static site generator
- **[DocuAPI](https://github.com/bep/docuapi)** v2.4.2 - Beautiful API documentation theme (Hugo port of Slate)
- **Hugo Modules** - For theme management
- **PostCSS** - CSS processing
- **AlpineJS** - Lightweight JavaScript framework (included in theme)

## Features

- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Custom Theme** - Modern slate blue palette with cyan accents
- 🔍 **Search Functionality** - Quick search across all documentation
- 🌐 **Single Page Layout** - All docs on one scrollable page
- 💻 **Code Examples** - CURL examples for every endpoint
- 🎯 **Clean Navigation** - Auto-generated sidebar from content structure

## Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) v0.138.0 or later
- [Node.js](https://nodejs.org/) v8.9.0 or later (for PostCSS)
- [npm](https://www.npmjs.com/) v6 or later

## Quick Start

```bash
# Clone the repository
git clone https://github.com/njoylab/docs.echovalue.dev.git
cd docs.echovalue.dev

# Install PostCSS dependencies
npm install

# Download Hugo theme via modules
hugo mod get -u

# Start development server
hugo server

# Build for production
hugo --minify
```

The site will be available at `http://localhost:1313`

## Project Structure

```
docs/
├── config.toml              # Hugo configuration
├── content/                 # Documentation markdown files
│   ├── 1-main.md           # Introduction
│   ├── 2-authentication.md # Authentication docs
│   ├── 3-token.md          # Token management
│   ├── 4-KeyValues.md      # Key-value operations
│   ├── 5-Logs.md           # Logs API
│   ├── 10-response-headers.md
│   └── errors.md           # Error codes
├── static/                  # Static assets
│   └── logo.png            # EchoValue logo
├── layouts/
│   └── partials/           # Theme customization hooks
│       └── hook_left_sidebar_logo.html
├── assets/
│   └── scss/slate/
│       └── docuapi_overrides.scss  # Custom colors
├── package.json            # PostCSS dependencies
├── go.mod                  # Hugo modules
└── CLAUDE.md              # Development guide
```

## Content Organization

Documentation files in `content/` use `weight` in frontmatter for ordering:

```markdown
---
weight: 10
title: API Reference
---

# Your content here
```

Lower weight values appear first in the sidebar.

## Customization

### Colors

Edit `assets/scss/slate/docuapi_overrides.scss` to customize the color scheme:

```scss
// Main colors
$nav-bg: #1e293b;              // Sidebar background
$nav-active-bg: #06b6d4;       // Active menu item
$main-bg: #ffffff;             // Content background
$examples-bg: #0f172a;         // Code examples area

// Aside boxes
$aside-notice-bg: #dbeafe;     // Blue notice boxes
$aside-warning-bg: #fecaca;    // Red warning boxes
$aside-success-bg: #d1fae5;    // Green success boxes
```

### Logo

Replace `static/logo.png` with your own logo. The logo links to the main site and is configured in `layouts/partials/hook_left_sidebar_logo.html`.

### Theme Hooks

DocuAPI supports customization via partials in `layouts/partials/`:
- `hook_head_end.html` - Add custom CSS, meta tags
- `hook_body_end.html` - Add analytics, scripts
- `hook_left_sidebar_start.html` - Customize sidebar top
- `hook_left_sidebar_end.html` - Customize sidebar bottom
- `hook_left_sidebar_logo.html` - Customize logo (currently implemented)

## Updating the Theme

The theme is managed via Hugo Modules for easy updates:

```bash
# Update to latest DocuAPI version
hugo mod get -u github.com/bep/docuapi/v2

# Update all modules
hugo mod get -u

# Clean module cache
hugo mod clean

# View module dependency graph
hugo mod graph
```

## Writing Documentation

### Aside Boxes

Use HTML aside blocks for notices and warnings:

```markdown
<aside class="notice">
This is an informational notice.
</aside>

<aside class="warning">
This is a warning message.
</aside>

<aside class="success">
This is a success message.
</aside>
```

### Code Examples

Code examples appear in the right column:

```markdown
> Example request:

\`\`\`shell
curl 'https://api.echovalue.dev/default/mykey' \\
  -H 'x-token: mytoken'
\`\`\`
```

## Deployment

### Build for Production

```bash
# Create optimized production build
hugo --minify

# Output will be in ./public/
```

### Deploy to Netlify

1. Connect your GitHub repository
2. Set build command: `npm install && hugo --minify`
3. Set publish directory: `public`
4. Deploy!

### Deploy to GitHub Pages

```bash
# Build the site
hugo --minify

# Deploy public/ directory to gh-pages branch
```

## Development

See [CLAUDE.md](CLAUDE.md) for detailed development guidelines, architecture overview, and API documentation patterns.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This documentation is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.

The DocuAPI theme is also licensed under Apache 2.0.

## API Specification

OpenAPI 3.0 specification available at:
- **OpenAPI Spec**: [openapi.yaml](https://docs.echovalue.dev/openapi.yaml)
- View in **Redocly**: [redocly.github.io](https://redocly.github.io/redoc/?url=https://docs.echovalue.dev/openapi.yaml)
- View in **Swagger UI**: [petstore.swagger.io](https://petstore.swagger.io/?url=https://docs.echovalue.dev/openapi.yaml)

Use the OpenAPI spec to:
- Generate client SDKs in any language
- Import into Postman, Insomnia, or other API tools
- Validate requests and responses
- Auto-generate API documentation

## Links

- **EchoValue Website**: [echovalue.dev](https://www.echovalue.dev)
- **API Documentation**: [docs.echovalue.dev](https://docs.echovalue.dev)
- **OpenAPI Specification**: [docs.echovalue.dev/openapi.yaml](https://docs.echovalue.dev/openapi.yaml)
- **DocuAPI Theme**: [github.com/bep/docuapi](https://github.com/bep/docuapi)
- **Hugo Documentation**: [gohugo.io/documentation](https://gohugo.io/documentation/)

## Support

For issues with:
- **EchoValue API**: Visit [echovalue.dev](https://www.echovalue.dev)
- **This documentation site**: Open an issue on GitHub
- **DocuAPI theme**: Visit the [DocuAPI repository](https://github.com/bep/docuapi)

---

Made with ❤️ by [nJoyLab](https://github.com/njoylab)
