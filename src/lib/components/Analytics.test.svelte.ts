import { render } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Analytics from './Analytics.svelte';

const publicEnv = vi.hoisted(() => ({} as Record<string, string | undefined>));

vi.mock('$env/dynamic/public', () => ({
  env: publicEnv
}));

afterEach(() => {
  document.head.innerHTML = '';
  for (const key of Object.keys(publicEnv)) {
    delete publicEnv[key];
  }
});

describe('Analytics', () => {
  it('enables Umami performance metrics when analytics is active', () => {
    publicEnv.PUBLIC_UMAMI_ENABLED = 'true';
    publicEnv.PUBLIC_UMAMI_WEBSITE_ID = 'test-site-id';

    render(Analytics);

    const script = document.head.querySelector('script[src*="analytics.cryptoqrtool.com"]');
    expect(script).toHaveAttribute('data-website-id', 'test-site-id');
    expect(script).toHaveAttribute('data-do-not-track', 'true');
    expect(script).toHaveAttribute('data-exclude-search', 'true');
    expect(script).toHaveAttribute('data-performance', 'true');
  });

  it('does not load Umami unless it is explicitly enabled', () => {
    publicEnv.PUBLIC_UMAMI_WEBSITE_ID = 'test-site-id';

    render(Analytics);

    expect(document.head.querySelector('script[src*="analytics.cryptoqrtool.com"]')).not.toBeInTheDocument();
  });
});
