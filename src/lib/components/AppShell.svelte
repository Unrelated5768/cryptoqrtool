<script lang="ts">
  import { page } from '$app/stores';
  import { Landmark, LockKeyhole, QrCode, Save, ShieldCheck, TrendingUp, WalletCards, Zap } from 'lucide-svelte';
  import { trackEvent } from '$lib/analytics';
  import { buildVersion } from '$lib/buildInfo';
  import { defaultCurrency, fiatCurrencies, setDefaultCurrency } from '$lib/currency';
  import { coinLandingPages, productName } from '$lib/seo';

  const nav = [
    { href: '/generate', label: 'Generator', icon: QrCode },
    { href: '/saved', label: 'Saved', icon: Save },
    { href: '/markets', label: 'Markets', icon: TrendingUp },
    { href: '/fees', label: 'Fees', icon: Zap },
    { href: '/exchanges', label: 'Exchanges', icon: Landmark },
    { href: '/security', label: 'Security', icon: ShieldCheck }
  ];

  $: pathname = $page.url.pathname;
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
      {#each nav as item}
        <a
          href={item.href}
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
    </nav>
    <div class="flex items-center gap-2">
      <label class="sr-only" for="default-currency">Default currency</label>
      <select
        id="default-currency"
        class="h-10 rounded-lg border border-outline-variant bg-surface-low px-2 text-sm font-semibold text-on-surface outline-none transition focus:border-primary"
        title="Default currency"
        bind:value={$defaultCurrency}
        on:change={(event) => {
          setDefaultCurrency(event.currentTarget.value);
          trackEvent('currency_selected', { currency: event.currentTarget.value });
        }}
      >
        {#each fiatCurrencies as option}
          <option value={option.code}>{option.label}</option>
        {/each}
      </select>
      <a href="/security" class="icon-button" title="Local-only privacy model" aria-label="Local-only privacy model">
        <LockKeyhole size={18} />
      </a>
    </div>
  </div>
  <nav class="flex gap-2 overflow-x-auto border-t border-outline-variant/40 px-5 py-2 md:hidden" aria-label="Mobile navigation">
    {#each nav as item}
      <a
        href={item.href}
        class={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
          pathname === item.href ? 'bg-surface-high text-primary' : 'text-on-surface-variant'
        }`}
      >
        <svelte:component this={item.icon} size={16} />
        {item.label}
      </a>
    {/each}
  </nav>
</header>

<slot />

<footer class="border-t border-outline-variant/50 bg-surface-lowest/70">
  <div class="mx-auto grid max-w-7xl gap-6 px-5 py-10 text-sm text-on-surface-variant md:grid-cols-[1fr_auto] md:px-8">
    <div>
      <p>{productName} generates QR payloads in the browser. Saved addresses, presets, and custom logos stay in local storage.</p>
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
      <p class="text-xs text-on-surface-variant/70">Version {buildVersion}</p>
    </div>
  </div>
</footer>
