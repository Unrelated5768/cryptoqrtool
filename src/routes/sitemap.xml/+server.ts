import { text } from '@sveltejs/kit';
import { landingPages, siteUrl } from '$lib/seo';

const routes = [
  '/',
  '/generate',
  '/saved',
  '/markets',
  '/fees',
  '/exchanges',
  '/security',
  '/api-docs',
  ...landingPages.map((page) => `/${page.slug}`)
];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
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
