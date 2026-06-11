import { json } from '@sveltejs/kit';
import { appCommit, appVersion, buildId, buildVersion } from '$lib/buildInfo';

const headers = { 'cache-control': 'no-store' };

export function GET() {
  return json(
    {
      version: appVersion,
      commit: appCommit,
      buildVersion,
      buildId
    },
    { headers }
  );
}
