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
        {
          label: 'Introduction',
          items: [
            { label: 'Overview', link: '/' },
            { label: 'Authentication', link: '/authentication/' },
            { label: 'Token Overview', link: '/token/' },
            { label: 'Create Token', link: '/token/create/' },
            { label: 'Get Balance', link: '/token/balance/' },
            { label: 'Recharge Wallet', link: '/token/recharge/' },
            { label: 'Get Low Balance Settings', link: '/token/settings/' },
            { label: 'Update Low Balance Settings', link: '/token/update-settings/' },
            { label: 'Logs', link: '/logs/' },
          ],
        },
        {
          label: 'Key-Value Store',
          items: [
            { label: 'Overview', link: '/key-value/' },
            { label: 'Set Key/Value', link: '/key-value/set/' },
            { label: 'Get Key/Value', link: '/key-value/get/' },
            { label: 'Delete Key/Value', link: '/key-value/delete/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Agent Shared State', link: '/guides/agent-shared-state/' },
          ],
        },
        {
          label: 'Mail2Webhook',
          items: [
            { label: 'Overview', link: '/mail2webhook/' },
            { label: 'Create Webhook', link: '/mail2webhook/create/' },
            { label: 'List Webhooks', link: '/mail2webhook/list/' },
            { label: 'Get Webhook', link: '/mail2webhook/get/' },
            { label: 'Update Webhook', link: '/mail2webhook/update/' },
            { label: 'Delete Webhook', link: '/mail2webhook/delete/' },
            { label: 'Test Webhook', link: '/mail2webhook/test/' },
            { label: 'Webhook Payload', link: '/mail2webhook/payload/' },
            {
              label: 'Formats',
              items: [
                { label: 'Slack', link: '/mail2webhook/formats/slack/' },
                { label: 'Discord', link: '/mail2webhook/formats/discord/' },
                { label: 'Microsoft Teams', link: '/mail2webhook/formats/teams/' },
                { label: 'Telegram', link: '/mail2webhook/formats/telegram/' },
                { label: 'PagerDuty', link: '/mail2webhook/formats/pagerduty/' },
                { label: 'Custom', link: '/mail2webhook/formats/custom/' },
              ],
            },
          ],
        },
        {
          label: 'Utilities',
          items: [
            { label: 'DNS Lookup', link: '/dns-lookup/' },
            { label: 'My IP', link: '/myip/' },
            { label: 'URL To Metadata', link: '/url-to-metadata/' },
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
        baseUrl: 'https://github.com/njoylab/docs.echovalue.dev/edit/main/',
      },
      lastUpdated: true,
      plugins: [
        starlightLlmsTxt({
          details: [
            'Primary API base: `https://api.echovalue.dev`.',
            'Authenticate paid endpoints with the `x-token` header.',
            'Main resources: key-value store under `/kv/<bucket>/<key>`, webhooks under `/webhook`, token management under `/token`.',
          ].join('\n'),
          optionalLinks: [
            {
              label: 'OpenAPI specification',
              url: 'https://docs.echovalue.dev/openapi.yaml',
              description: 'Machine-readable API schema for client generation and validation.',
            },
            {
              label: 'Agent installation guide',
              url: 'https://github.com/njoylab/docs.echovalue.dev/blob/main/INSTALL.md',
              description: 'Setup guide for Claude, Codex, ChatGPT, Cursor, and Continue.',
            },
          ],
        }),
      ],
    }),
  ],
});
