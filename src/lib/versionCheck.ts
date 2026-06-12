import { appCommit, appVersion, buildId, buildVersion } from '$lib/buildInfo';

type VersionPayload = {
  version?: unknown;
  commit?: unknown;
  buildVersion?: unknown;
  buildId?: unknown;
};

type VersionCheckOptions = {
  intervalMs?: number;
  visibilityMinAgeMs?: number;
};

const defaultIntervalMs = 10 * 60 * 1000;
const defaultVisibilityMinAgeMs = 2 * 60 * 1000;

function stringValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function isNewVersion(payload: VersionPayload) {
  const remoteBuildId = stringValue(payload.buildId);
  const remoteBuildVersion = stringValue(payload.buildVersion);
  const remoteCommit = stringValue(payload.commit);
  const remoteVersion = stringValue(payload.version);

  if (remoteBuildId && buildId && remoteBuildId !== buildId) return true;
  if (remoteBuildVersion && buildVersion && remoteBuildVersion !== buildVersion) return true;
  if (remoteCommit && appCommit && remoteCommit !== appCommit) return true;
  if (remoteVersion && appVersion && remoteVersion !== appVersion) return true;

  return false;
}

async function fetchRemoteVersion() {
  const response = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });

  if (!response.ok) {
    return {};
  }

  return (await response.json()) as VersionPayload;
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
      const remoteVersion = await fetchRemoteVersion();

      if (isNewVersion(remoteVersion)) {
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
