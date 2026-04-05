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
            { label: 'Token Management', link: '/token/' },
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
            { label: 'Agent Shared State', link: '/key-value/agent-state/' },
          ],
        },
        {
          label: 'Mail2Webhook',
          items: [
            { label: 'Overview', link: '/mail2webhook/' },
            { label: 'Configure Webhook', link: '/mail2webhook/configure/' },
            { label: 'Get Webhook Configuration', link: '/mail2webhook/get/' },
            { label: 'Delete Webhook', link: '/mail2webhook/delete/' },
            { label: 'Test Webhook', link: '/mail2webhook/test/' },
            { label: 'Webhook Payload', link: '/mail2webhook/payload/' },
            {
              label: 'Formats',
              items: [
                { label: 'Slack', link: '/mail2webhook-slack/' },
                { label: 'Discord', link: '/mail2webhook-discord/' },
                { label: 'Microsoft Teams', link: '/mail2webhook-teams/' },
                { label: 'Telegram', link: '/mail2webhook-telegram/' },
                { label: 'PagerDuty', link: '/mail2webhook-pagerduty/' },
                { label: 'Custom', link: '/mail2webhook-custom/' },
              ],
            },
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
