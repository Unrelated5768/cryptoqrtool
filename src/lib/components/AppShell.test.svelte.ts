import { fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AppShell from './AppShell.svelte';
import { loadStorage } from '$lib/storage';
import { setTheme } from '$lib/theme';
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
  beforeEach(() => {
    localStorage.clear();
    setTheme('dark');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows and dismisses the update banner when a new version is detected', async () => {
    render(AppShell);

    expect(screen.queryByText('A new version is available.')).not.toBeInTheDocument();

    const onNewVersion = vi.mocked(startVersionCheck).mock.calls[0][0];
    onNewVersion();

    expect(await screen.findByText('A new version is available.')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveAttribute('data-testid', 'update-notice');

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

  it('shows the footer privacy badge and tagline', () => {
    render(AppShell);

    expect(screen.getByText('Your data never leaves your browser')).toBeInTheDocument();
    expect(screen.getByText(/zero data collection/i)).toBeInTheDocument();
    expect(screen.getByText('Made with')).toBeInTheDocument();
    expect(screen.getByText('for privacy.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view source on github/i })).toHaveAttribute(
      'href',
      'https://github.com/Unrelated5768/cryptoqrtool'
    );
  });

  it('toggles between dark and light themes', async () => {
    render(AppShell);

    const toggle = screen.getByRole('button', { name: 'Switch to light mode' });
    await fireEvent.click(toggle);

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(loadStorage().theme).toBe('light');
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  });

  it('updates the default currency from the header picker', async () => {
    const { container } = render(AppShell);
    const currencySummary = container.querySelector('header > div > div.flex.items-center.gap-2 details summary');

    expect(currencySummary).not.toBeNull();

    await fireEvent.click(currencySummary as HTMLElement);
    await fireEvent.click(screen.getByRole('button', { name: 'EUR EUR' }));

    expect(loadStorage().defaultCurrency).toBe('EUR');
    expect(screen.getAllByText('EUR').length).toBeGreaterThan(0);
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
