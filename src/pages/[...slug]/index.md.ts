import type { APIRoute } from 'astro';

const docs = import.meta.glob('/src/content/docs/**/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const docsBySlug = Object.entries(docs)
  .filter(([filePath]) => !filePath.endsWith('/index.mdx') && !filePath.endsWith('/index.md') && filePath !== '/src/content/docs/index.mdx' && filePath !== '/src/content/docs/index.md')
  .map(([filePath, source]) => {
    const relativePath = filePath
      .replace('/src/content/docs/', '')
      .replace(/\.(md|mdx)$/, '');

    return {
      params: { slug: relativePath },
      props: {
        source,
        filename: 'index.md',
      },
    };
  })
  .concat(
    Object.entries(docs)
      .filter(
        ([filePath]) =>
          (filePath.endsWith('/index.mdx') || filePath.endsWith('/index.md')) &&
          filePath !== '/src/content/docs/index.mdx' &&
          filePath !== '/src/content/docs/index.md',
      )
      .map(([filePath, source]) => {
        const relativePath = filePath
          .replace('/src/content/docs/', '')
          .replace(/\/index\.(md|mdx)$/, '');

        return {
          params: { slug: relativePath },
          props: {
            source,
            filename: 'index.md',
          },
        };
      }),
  );

export function getStaticPaths() {
  return docsBySlug;
}

export const GET: APIRoute = async ({ props }) => {
  if (!props) {
    return new Response(null, { status: 404 });
  }

  return new Response(props.source, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `inline; filename="${props.filename}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
