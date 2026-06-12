import { text } from '@sveltejs/kit';
import { getSitemapEntries, siteUrl } from '$lib/seo';

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${getSitemapEntries()
  .map(
    (entry) => `  <url>
    <loc>${siteUrl}${entry.path}</loc>
    <lastmod>${entry.lastModified}</lastmod>
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
