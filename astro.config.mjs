import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';

export default defineConfig({
  site: 'https://docs.echovalue.dev',
  publicDir: './static',
  integrations: [
    starlight({
      title: 'EchoValue API',
      description: 'Lightweight key-value API for freelancers and small projects',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/njoylab/docs.echovalue.dev' },
      ],
      sidebar: [
        { label: 'Introduction', link: '/' },
        {
          label: 'Getting Started',
          items: [
            { label: 'Authentication', link: '/authentication/' },
            { label: 'Token Management', link: '/token/' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Key-Value Store', link: '/key-value/' },
            { label: 'Mail2Webhook', link: '/mail2webhook/' },
            { label: 'Logs', link: '/logs/' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Response Headers', link: '/response-headers/' },
            { label: 'Errors', link: '/errors/' },
            { label: 'OpenAPI Specification', link: '/openapi/' },
          ],
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/njoylab/docs.echovalue.dev/edit/main/src/content/docs/',
      },
      lastUpdated: true,
      plugins: [starlightLlmsTxt()],
    }),
  ],
});
