<script lang="ts">
  import { onMount } from 'svelte';
  import { BarChart3, Cookie, Database, HardDrive, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-svelte';
  import { analyticsOptOutEnabled, setAnalyticsOptOut } from '$lib/analytics';
  import { productName } from '$lib/seo';

  const localStorageItems = [
    {
      title: 'Saved addresses',
      body: 'Public recipient addresses and labels stay in this browser profile when you choose to save them.'
    },
    {
      title: 'QR style presets',
      body: 'Colors, quiet zones, error correction, and optional custom logo data are kept locally for reuse.'
    },
    {
      title: 'Preferences',
      body: 'Theme and display currency are stored locally so the interface opens with your preferred settings.'
    },
    {
      title: 'Analytics opt-out',
      body: 'If you disable anonymous analytics, this browser stores a local opt-out flag named umami.disabled.'
    }
  ];

  let analyticsDisabled = false;

  onMount(() => {
    analyticsDisabled = analyticsOptOutEnabled();
  });

  function toggleAnalyticsOptOut() {
    analyticsDisabled = !analyticsDisabled;
    setAnalyticsOptOut(analyticsDisabled);
  }
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8">
    <p class="label mb-2">Privacy notice</p>
    <h1 class="text-3xl font-bold text-on-surface md:min-h-24 md:text-5xl">Cookies, local storage, and analytics</h1>
    <p class="mt-3 max-w-3xl text-on-surface-variant">
      {productName} does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault.
      Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.
    </p>
  </div>

  <section class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
    <article class="surface-panel rounded-card p-6">
      <Cookie class="mb-5 text-primary" size={30} />
      <h2 class="text-2xl font-semibold text-on-surface">Cookie use</h2>
      <p class="mt-3 leading-7 text-on-surface-variant">
        {productName} does not set cookies for advertising, retargeting, user accounts, or cross-site profiling. A cookie settings
        popup is not shown because there are no optional cookie categories to manage.
      </p>
      <p class="mt-3 leading-7 text-on-surface-variant">
        The site may still use browser local storage for features you control, such as saved addresses, presets, theme, currency,
        and analytics opt-out status.
      </p>
    </article>

    <article class="surface-panel rounded-card p-6">
      <BarChart3 class="mb-5 text-primary" size={30} />
      <h2 class="text-2xl font-semibold text-on-surface">Anonymous analytics</h2>
      <p class="mt-3 leading-7 text-on-surface-variant">
        Self-hosted Umami analytics helps measure page usage and coarse product events. It is configured without tracking cookies,
        respects browser Do Not Track, and excludes query strings from page URLs.
      </p>
      <button
        type="button"
        class={`mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
          analyticsDisabled
            ? 'bg-surface-container text-on-surface hover:bg-surface-high'
            : 'bg-primary-action text-white shadow-glow'
        }`}
        aria-pressed={analyticsDisabled}
        on:click={toggleAnalyticsOptOut}
      >
        {#if analyticsDisabled}
          <ToggleRight size={18} />
          Anonymous analytics disabled
        {:else}
          <ToggleLeft size={18} />
          Disable anonymous analytics
        {/if}
      </button>
    </article>
  </section>

  <section class="mt-8 grid gap-5 md:grid-cols-2">
    <article class="surface-panel rounded-card p-6">
      <HardDrive class="mb-5 text-primary" size={30} />
      <h2 class="text-2xl font-semibold text-on-surface">What stays in local storage</h2>
      <div class="mt-5 grid gap-4">
        {#each localStorageItems as item}
          <div class="rounded-lg border border-outline-variant bg-surface-low p-5">
            <h3 class="text-lg font-semibold text-on-surface">{item.title}</h3>
            <p class="mt-2 text-sm leading-6 text-on-surface-variant">{item.body}</p>
          </div>
        {/each}
      </div>
    </article>

    <article class="surface-panel rounded-card p-6">
      <ShieldCheck class="mb-5 text-primary" size={30} />
      <h2 class="text-2xl font-semibold text-on-surface">What is not collected</h2>
      <div class="mt-5 grid gap-3 text-sm leading-6 text-on-surface-variant">
        <p class="rounded-lg border border-outline-variant bg-surface-low p-4">No private keys, seed phrases, wallet connections, or exchange credentials are requested.</p>
        <p class="rounded-lg border border-outline-variant bg-surface-low p-4">QR payloads, pasted public addresses, amounts, labels, and custom logos are not uploaded to an address vault.</p>
        <p class="rounded-lg border border-outline-variant bg-surface-low p-4">Saved data can be removed by deleting items in the app or clearing this site&apos;s browser storage.</p>
      </div>
    </article>
  </section>

  <section class="mt-8">
    <div class="surface-panel rounded-card p-6">
      <Database class="mb-5 text-primary" size={30} />
      <h2 class="text-2xl font-semibold text-on-surface">Data processing summary</h2>
      <p class="mt-3 max-w-4xl leading-7 text-on-surface-variant">
        Browser-local data is used to provide the generator, saved address list, QR styling, and display preferences. Server logs and
        anonymous analytics may be used for reliability, abuse prevention, performance monitoring, and aggregate product improvement.
        Public market, fee, and exchange views may call external data APIs, but those modules do not require wallet connection or account data.
      </p>
    </div>
  </section>
</main>
