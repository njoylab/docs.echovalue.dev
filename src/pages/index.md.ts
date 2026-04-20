import type { APIRoute } from 'astro';

const docs = import.meta.glob('/src/content/docs/**/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const indexSource = docs['/src/content/docs/index.mdx'] ?? docs['/src/content/docs/index.md'];

export const GET: APIRoute = async () => {
  if (!indexSource) {
    return new Response(null, { status: 404 });
  }

  return new Response(indexSource, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': 'inline; filename="index.md"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
