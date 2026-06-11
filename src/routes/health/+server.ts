import { json } from '@sveltejs/kit';

const headers = { 'cache-control': 'no-store' };

export function GET() {
  return json({ status: 'ok' }, { headers });
}

export function HEAD() {
  return new Response(null, { status: 200, headers });
}
