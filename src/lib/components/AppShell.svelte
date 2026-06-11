<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { BadgeCheck, ChevronDown, Code2, Heart, Landmark, LockKeyhole, QrCode, RefreshCw, Save, ShieldCheck, TrendingUp, WalletCards, X, Zap } from 'lucide-svelte';
  import { trackEvent } from '$lib/analytics';
  import { buildVersion } from '$lib/buildInfo';
  import { defaultCurrency, fiatCurrencies, setDefaultCurrency } from '$lib/currency';
  import { coinLandingPages, productName } from '$lib/seo';
  import { startVersionCheck } from '$lib/versionCheck';

  export let reloadPage = () => window.location.reload();

  const primaryNav = [
    { href: '/generate', label: 'Generator', icon: QrCode },
    { href: '/verify', label: 'Verify', icon: BadgeCheck },
    { href: '/saved', label: 'Saved', icon: Save },
    { href: '/markets', label: 'Markets', icon: TrendingUp }
  ];

  const secondaryNav = [
    { href: '/fees', label: 'Fees', icon: Zap },
    { href: '/exchanges', label: 'Exchanges', icon: Landmark },
    { href: '/api-docs', label: 'API', icon: Code2 },
    { href: '/security', label: 'Security', icon: ShieldCheck }
  ];

  $: pathname = $page.url.pathname;
  $: selectedCurrency = fiatCurrencies.find((option) => option.code === $defaultCurrency) ?? fiatCurrencies[0];

  let updateAvailable = false;
  let updateDismissed = false;
  let desktopMoreMenu: HTMLDetailsElement;
  let mobileMoreMenu: HTMLDetailsElement;

  onMount(() => {
    return startVersionCheck(() => {
      updateAvailable = true;
      updateDismissed = false;
    });
  });

  function reloadApp() {
    reloadPage();
  }

  function closeMoreMenus() {
    if (desktopMoreMenu) desktopMoreMenu.open = false;
    if (mobileMoreMenu) mobileMoreMenu.open = false;
  }
</script>

<header class="sticky top-0 z-50 border-b border-outline-variant/50 bg-surface/86 backdrop-blur-xl">
  <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
    <a href="/" class="flex items-center gap-3 font-bold text-on-surface" aria-label={`${productName} home`}>
      <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-action text-white">
        <QrCode size={20} />
      </span>
      <span class="text-xl">{productName}</span>
    </a>
    <nav class="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
      {#each primaryNav as item}
        <a
          href={item.href}
          on:click={closeMoreMenus}
          class={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            pathname === item.href
              ? 'bg-surface-high text-primary'
              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
          }`}
        >
          <svelte:component this={item.icon} size={16} />
          {item.label}
        </a>
      {/each}
      <details bind:this={desktopMoreMenu} class="group relative">
        <summary
          class={`flex cursor-pointer list-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition marker:hidden ${
            secondaryNav.some((item) => pathname === item.href)
              ? 'bg-surface-high text-primary'
              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
          }`}
        >
          More
          <ChevronDown size={16} class="transition group-open:rotate-180" />
        </summary>
        <div class="absolute right-0 top-12 w-48 rounded-lg border border-outline-variant bg-surface-high p-2 shadow-2xl">
          {#each secondaryNav as item}
            <a
              href={item.href}
              on:click={closeMoreMenus}
              class={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                pathname === item.href ? 'bg-surface-container text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <svelte:component this={item.icon} size={16} />
              {item.label}
            </a>
          {/each}
        </div>
      </details>
    </nav>
    <div class="flex items-center gap-2">
      <label class="sr-only" for="default-currency">Default currency</label>
      <div
        class="relative inline-flex h-10 min-w-24 items-center gap-2 rounded-lg border border-outline-variant bg-surface-high px-2.5 text-sm font-semibold text-on-surface transition hover:border-primary/60 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25"
        title="Default currency"
      >
        <span class="flex h-6 min-w-6 items-center justify-center rounded-md bg-surface-container px-1.5 text-xs text-primary" aria-hidden="true">
          {selectedCurrency.symbol}
        </span>
        <span class="min-w-8 text-center" aria-hidden="true">{selectedCurrency.code}</span>
        <ChevronDown size={14} class="text-on-surface-variant" aria-hidden="true" />
        <select
          id="default-currency"
          class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          bind:value={$defaultCurrency}
          on:change={(event) => {
            setDefaultCurrency(event.currentTarget.value);
            trackEvent('currency_selected', { currency: event.currentTarget.value });
          }}
        >
          {#each fiatCurrencies as option}
            <option value={option.code}>{option.symbol} {option.label}</option>
          {/each}
        </select>
      </div>
      <a href="/security" class="icon-button" title="Local-only privacy model" aria-label="Local-only privacy model">
        <LockKeyhole size={18} />
      </a>
    </div>
  </div>
  <nav
    class="relative max-md:!grid md:!hidden grid-cols-5 gap-1 border-t border-outline-variant/40 px-3 py-2"
    style="display: none"
    aria-label="Mobile navigation"
  >
    {#each primaryNav as item}
      <a
        href={item.href}
        on:click={closeMoreMenus}
        class={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-xs font-semibold ${
          pathname === item.href ? 'bg-surface-high text-primary' : 'text-on-surface-variant'
        }`}
      >
        <svelte:component this={item.icon} size={16} />
        <span class="max-w-full truncate">{item.label}</span>
      </a>
    {/each}
    <details bind:this={mobileMoreMenu} class="group relative min-w-0">
      <summary
        class={`flex h-full cursor-pointer list-none flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-xs font-semibold marker:hidden ${
          secondaryNav.some((item) => pathname === item.href) ? 'bg-surface-high text-primary' : 'text-on-surface-variant'
        }`}
      >
        <ChevronDown size={16} class="transition group-open:rotate-180" />
        <span class="max-w-full truncate">More</span>
      </summary>
      <div class="absolute right-0 top-12 z-50 w-48 rounded-lg border border-outline-variant bg-surface-high p-2 shadow-2xl">
        {#each secondaryNav as item}
          <a
            href={item.href}
            on:click={closeMoreMenus}
            class={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              pathname === item.href ? 'bg-surface-container text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
          >
            <svelte:component this={item.icon} size={16} />
            {item.label}
          </a>
        {/each}
      </div>
    </details>
  </nav>
</header>

<slot />

{#if updateAvailable && !updateDismissed}
  <div class="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant bg-surface-high px-5 py-3 shadow-2xl" role="status" aria-live="polite">
    <div class="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm font-semibold text-on-surface">A new version is available.</p>
      <div class="flex items-center gap-2">
        <button class="btn-primary px-3 py-2" type="button" on:click={reloadApp}>
          <RefreshCw size={16} />
          Reload
        </button>
        <button
          class="icon-button h-9 w-9"
          type="button"
          title="Dismiss update notice"
          aria-label="Dismiss update notice"
          on:click={() => {
            updateDismissed = true;
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  </div>
{/if}

<footer class="border-t border-outline-variant/50 bg-surface-lowest/70">
  <div class="mx-auto grid max-w-7xl gap-6 px-5 py-10 text-sm text-on-surface-variant md:grid-cols-[1fr_auto] md:px-8">
    <div>
      <div class="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-semibold text-primary">
        <ShieldCheck size={16} />
        <span>Your data never leaves your browser</span>
      </div>
      <p class="mt-4">{productName} generates QR payloads in the browser. Saved addresses, presets, and custom logos stay in local storage with zero data collection.</p>
      <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {#each coinLandingPages as item}
          <a class="hover:text-primary" href={`/${item.slug}`}>{item.ticker} QR generator</a>
        {/each}
      </div>
    </div>
    <div class="flex flex-col gap-2 md:items-end">
      <div class="flex items-center gap-2 text-primary">
        <WalletCards size={16} />
        <span>No accounts. No wallet connection.</span>
      </div>
      <div class="flex items-center gap-2 text-on-surface">
        <span>Made with</span>
        <Heart size={15} class="fill-error text-error" />
        <span>for privacy.</span>
      </div>
      <p class="text-xs text-on-surface-variant/70">Version {buildVersion}</p>
    </div>
  </div>
</footer>
