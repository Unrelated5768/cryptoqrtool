import { text } from '@sveltejs/kit';

const routes = ['/', '/generate', '/saved', '/markets', '/fees', '/exchanges', '/security'];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>https://cryptogen.local${route}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return text(body, {
    headers: {
      'content-type': 'application/xml'
    }
  });
}
