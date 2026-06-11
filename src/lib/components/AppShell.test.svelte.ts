import { fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AppShell from './AppShell.svelte';
import { startVersionCheck } from '$lib/versionCheck';

vi.mock('$app/stores', () => ({
  page: {
    subscribe: (run: (value: { url: URL }) => void) => {
      run({ url: new URL('https://example.test/generate') });
      return () => undefined;
    }
  }
}));

vi.mock('$lib/versionCheck', () => ({
  startVersionCheck: vi.fn(() => vi.fn())
}));

describe('AppShell', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows and dismisses the update banner when a new version is detected', async () => {
    render(AppShell);

    expect(screen.queryByText('A new version is available.')).not.toBeInTheDocument();

    const onNewVersion = vi.mocked(startVersionCheck).mock.calls[0][0];
    onNewVersion();

    expect(await screen.findByText('A new version is available.')).toBeInTheDocument();

    await fireEvent.click(screen.getByRole('button', { name: 'Dismiss update notice' }));

    expect(screen.queryByText('A new version is available.')).not.toBeInTheDocument();
  });

  it('reloads the page from the update banner', async () => {
    const reloadPage = vi.fn();

    render(AppShell, { reloadPage });
    const onNewVersion = vi.mocked(startVersionCheck).mock.calls[0][0];
    onNewVersion();

    await fireEvent.click(await screen.findByRole('button', { name: /reload/i }));

    expect(reloadPage).toHaveBeenCalledTimes(1);
  });

  it('keeps secondary navigation links crawlable in the more menu', () => {
    render(AppShell);

    expect(screen.getAllByRole('link', { name: /fees/i }).some((link) => link.getAttribute('href') === '/fees')).toBe(true);
    expect(screen.getAllByRole('link', { name: /exchanges/i }).some((link) => link.getAttribute('href') === '/exchanges')).toBe(true);
    expect(screen.getAllByRole('link', { name: /api/i }).some((link) => link.getAttribute('href') === '/api-docs')).toBe(true);
    expect(screen.getAllByRole('link', { name: /security/i }).some((link) => link.getAttribute('href') === '/security')).toBe(true);
  });

  it('closes the more menu after a navigation link is clicked', async () => {
    const { container } = render(AppShell);
    const desktopMoreMenu = container.querySelector('nav[aria-label="Primary navigation"] details') as HTMLDetailsElement;
    const feesLink = screen.getAllByRole('link', { name: /fees/i })[0];

    desktopMoreMenu.open = true;
    feesLink.addEventListener('click', (event) => event.preventDefault());
    await fireEvent.click(feesLink);

    expect(desktopMoreMenu.open).toBe(false);
  });
});
