import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildId } from '$lib/buildInfo';
import { startVersionCheck } from './versionCheck';

function responseWithBuildId(remoteBuildId: string, ok = true) {
  return {
    ok,
    json: () => Promise.resolve({ buildId: remoteBuildId })
  } as Response;
}

function setVisibilityState(value: DocumentVisibilityState) {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    value
  });
}

async function flushPromises() {
  await Promise.resolve();
  await Promise.resolve();
}

describe('startVersionCheck', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    setVisibilityState('visible');
  });

  it('does not notify when the deployed build matches the loaded build', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    const fetchMock = vi.fn().mockResolvedValue(responseWithBuildId(buildId));
    vi.stubGlobal('fetch', fetchMock);
    const onNewVersion = vi.fn();

    const stop = startVersionCheck(onNewVersion);
    await flushPromises();

    expect(onNewVersion).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    stop();
  });

  it('notifies when the deployed build differs from the loaded build', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(responseWithBuildId(`${buildId}-next`)));
    const onNewVersion = vi.fn();

    const stop = startVersionCheck(onNewVersion);
    await flushPromises();

    expect(onNewVersion).toHaveBeenCalledTimes(1);

    stop();
  });

  it('ignores failed version checks', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const onNewVersion = vi.fn();

    const stop = startVersionCheck(onNewVersion);
    await flushPromises();

    expect(onNewVersion).not.toHaveBeenCalled();

    stop();
  });

  it('checks on the configured interval', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    const fetchMock = vi.fn().mockResolvedValue(responseWithBuildId(buildId));
    vi.stubGlobal('fetch', fetchMock);

    const stop = startVersionCheck(vi.fn(), { intervalMs: 10 * 60 * 1000 });
    await flushPromises();

    await vi.advanceTimersByTimeAsync(10 * 60 * 1000);

    expect(fetchMock).toHaveBeenCalledTimes(2);

    stop();
  });

  it('checks on visibilitychange when the last check is more than 2 minutes old', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    const fetchMock = vi.fn().mockResolvedValue(responseWithBuildId(buildId));
    vi.stubGlobal('fetch', fetchMock);
    setVisibilityState('visible');

    const stop = startVersionCheck(vi.fn(), { visibilityMinAgeMs: 2 * 60 * 1000 });
    await flushPromises();

    vi.setSystemTime(2 * 60 * 1000 + 1);
    document.dispatchEvent(new Event('visibilitychange'));
    await flushPromises();

    expect(fetchMock).toHaveBeenCalledTimes(2);

    stop();
  });

  it('skips visibilitychange checks when the last check is 2 minutes old or newer', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    const fetchMock = vi.fn().mockResolvedValue(responseWithBuildId(buildId));
    vi.stubGlobal('fetch', fetchMock);
    setVisibilityState('visible');

    const stop = startVersionCheck(vi.fn(), { visibilityMinAgeMs: 2 * 60 * 1000 });
    await flushPromises();

    vi.setSystemTime(2 * 60 * 1000);
    document.dispatchEvent(new Event('visibilitychange'));
    await flushPromises();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    stop();
  });
});
