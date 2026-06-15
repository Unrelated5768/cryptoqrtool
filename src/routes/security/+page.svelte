<script lang="ts">
  import { page } from '$app/stores';
  import { FileLock2, HardDrive, ShieldCheck, WifiOff } from 'lucide-svelte';
  import { tr } from '$lib/i18n/phrases';
  import { parseLocalePath } from '$lib/i18n/routing';
  import { productName, securityFaqItems } from '$lib/seo';

  const items = [
    {
      icon: WifiOff,
      title: 'Generation is client-side',
      body: 'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.'
    },
    {
      icon: HardDrive,
      title: 'Local storage only',
      body: 'Saved addresses and user-defined style presets use a versioned local storage key and can be deleted by the user.'
    },
    {
      icon: FileLock2,
      title: 'Custom logo handling',
      body: 'Uploaded logos are accepted as PNG, JPEG, SVG, or WebP, size-limited, and stored only when saved into a preset.'
    },
    {
      icon: ShieldCheck,
      title: 'Scannability checks',
      body: 'Contrast, quiet zone, logo size, and error-correction settings prioritize reliable scanning over decoration.'
    }
  ];

  $: activeLocale = parseLocalePath($page.url.pathname).locale;
  $: t = (phrase: string) => tr(activeLocale, phrase);
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8">
    <p class="label mb-2">{t('Trust and privacy')}</p>
    <h1 class="text-3xl font-bold text-on-surface md:min-h-24 md:text-5xl">{t('No account, no wallet connection, no server vault')}</h1>
    <p class="mt-3 max-w-3xl text-on-surface-variant">
      {productName} is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses,
      saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.
    </p>
  </div>

  <section class="grid gap-5 md:grid-cols-2">
    {#each items as item}
      <article class="surface-panel rounded-card p-6">
        <svelte:component this={item.icon} class="mb-5 text-primary" size={30} />
        <h2 class="text-xl font-semibold text-on-surface">{t(item.title)}</h2>
        <p class="mt-3 leading-7 text-on-surface-variant">{t(item.body)}</p>
      </article>
    {/each}
  </section>

  <section class="mt-8">
    <div class="surface-panel rounded-card p-6">
      <h2 class="text-2xl font-semibold text-on-surface">{t('Privacy and security FAQ')}</h2>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        {#each securityFaqItems as item}
          <article class="rounded-lg border border-outline-variant bg-surface-low p-5">
            <h3 class="text-lg font-semibold text-on-surface">{item.question}</h3>
            <p class="mt-3 text-sm leading-6 text-on-surface-variant">{item.answer}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>
</main>
