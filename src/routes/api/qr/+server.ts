import { json, type RequestHandler } from '@sveltejs/kit';
import { ApiQrError, generateApiQr, inputFromSearchParams, type ApiQrInput } from '$lib/server/qrApi';

export const GET: RequestHandler = async ({ url }) => {
  return respond(inputFromSearchParams(url.searchParams));
};

export const POST: RequestHandler = async ({ request }) => {
  let input: ApiQrInput;
  try {
    input = (await request.json()) as ApiQrInput;
  } catch {
    return json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  return respond(input);
};

async function respond(input: ApiQrInput): Promise<Response> {
  try {
    const result = await generateApiQr(input);
    if (result.format === 'json') {
      return json({
        payload: result.payload,
        network: result.network,
        validation: result.validation,
        svg: result.svg
      });
    }

    return new Response(result.svg, {
      headers: {
        'content-type': 'image/svg+xml; charset=utf-8',
        'cache-control': 'no-store'
      }
    });
  } catch (error) {
    if (error instanceof ApiQrError) {
      return json({ error: error.message }, { status: error.status });
    }
    return json({ error: 'Unable to generate QR code.' }, { status: 500 });
  }
}
