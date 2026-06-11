import { buildId } from '$lib/buildInfo';

type VersionPayload = {
  buildId?: unknown;
};

type VersionCheckOptions = {
  intervalMs?: number;
  visibilityMinAgeMs?: number;
};

const defaultIntervalMs = 10 * 60 * 1000;
const defaultVisibilityMinAgeMs = 2 * 60 * 1000;

async function fetchRemoteBuildId() {
  const response = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });

  if (!response.ok) {
    return '';
  }

  const payload = (await response.json()) as VersionPayload;
  return typeof payload.buildId === 'string' ? payload.buildId : '';
}

export function startVersionCheck(onNewVersion: () => void, options: VersionCheckOptions = {}) {
  const intervalMs = options.intervalMs ?? defaultIntervalMs;
  const visibilityMinAgeMs = options.visibilityMinAgeMs ?? defaultVisibilityMinAgeMs;
  let lastCheckedAt = 0;
  let stopped = false;
  let newVersionFound = false;

  async function check() {
    if (stopped || newVersionFound) {
      return;
    }

    lastCheckedAt = Date.now();

    try {
      const remoteBuildId = await fetchRemoteBuildId();

      if (remoteBuildId && remoteBuildId !== buildId) {
        newVersionFound = true;
        onNewVersion();
      }
    } catch {
      // Ignore transient connectivity and deploy-race failures.
    }
  }

  function checkWhenVisible() {
    if (document.visibilityState !== 'visible') {
      return;
    }

    if (Date.now() - lastCheckedAt > visibilityMinAgeMs) {
      void check();
    }
  }

  const interval = window.setInterval(() => {
    void check();
  }, intervalMs);

  document.addEventListener('visibilitychange', checkWhenVisible);
  void check();

  return () => {
    stopped = true;
    window.clearInterval(interval);
    document.removeEventListener('visibilitychange', checkWhenVisible);
  };
}
