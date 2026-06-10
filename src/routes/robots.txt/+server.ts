import { text } from '@sveltejs/kit';

export function GET() {
  return text(`User-agent: *
Allow: /

Sitemap: https://cryptogen.local/sitemap.xml
`);
}
