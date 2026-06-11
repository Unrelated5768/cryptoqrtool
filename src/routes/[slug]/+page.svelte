<script lang="ts">
  import { ArrowRight, CheckCircle2, Palette, ShieldCheck, WalletCards } from 'lucide-svelte';
  import { coinLandingPages, type CoinLandingPage } from '$lib/seo';

  export let data: {
    landingPage: CoinLandingPage;
  };

  $: page = data.landingPage;
  $: relatedPages = coinLandingPages.filter((item) => item.slug !== page.slug).slice(0, 6);
  $: isCheckerPage = page.purpose === 'checker';
  const benefitIcons = [WalletCards, Palette, ShieldCheck];
</script>

<main>
  <section class="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-[1.02fr_0.98fr] md:px-8">
    <div class="max-w-2xl">
      <p class="label mb-3">{page.eyebrow}</p>
      <h1 class="text-4xl font-bold leading-tight text-on-surface md:text-6xl">{page.headline}</h1>
      <p class="mt-5 text-lg leading-8 text-on-surface-variant">{page.body}</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a class="btn-primary" href={page.generatorHref}>
          {page.ctaLabel} <ArrowRight size={18} />
        </a>
        <a class="btn-secondary" href={isCheckerPage ? '/generate' : '/security'}>{isCheckerPage ? 'Open generator' : 'Privacy model'}</a>
      </div>
    </div>

    <div class="glass-panel rounded-card p-6">
      <div class="rounded-xl bg-white p-6">
        <div class="grid aspect-square grid-cols-9 gap-1">
          {#each Array(81) as _, index}
            <div
              class={`rounded-[2px] ${
                [
                  0, 1, 2, 3, 9, 12, 18, 19, 20, 21, 5, 6, 7, 8, 14, 17, 23, 24, 25, 26, 54, 55, 56, 57, 63, 66, 72,
                  73, 74, 75, 31, 33, 37, 38, 41, 44, 48, 50, 52, 60, 68, 70, 80
                ].includes(index)
                  ? 'bg-slate-950'
                  : 'bg-slate-100'
              }`}
            ></div>
          {/each}
        </div>
      </div>
      <div class="mt-5 grid gap-3">
        <div class="flex items-center justify-between rounded-lg border border-outline-variant bg-surface-low px-4 py-3">
          <span class="mono truncate text-sm text-on-surface-variant">{page.payloadExample}</span>
          <span class="rounded px-2 py-1 text-xs font-bold text-slate-950" style={`background-color: ${page.accent}`}>
            {page.ticker ?? 'QR'}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-2 text-center text-xs font-bold text-on-surface-variant sm:grid-cols-4">
          {#each page.chips as chip}
            <span class="rounded bg-surface-high px-2 py-2">{chip}</span>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <section class="mx-auto grid max-w-7xl gap-5 px-5 pb-12 md:grid-cols-3 md:px-8">
    {#each page.benefits as benefit, index}
      <article class="surface-panel rounded-card p-6">
        <svelte:component this={benefitIcons[index % benefitIcons.length]} class="mb-5 text-primary" size={28} />
        <h2 class="text-xl font-semibold text-on-surface">{benefit.title}</h2>
        <p class="mt-3 text-sm leading-6 text-on-surface-variant">{benefit.body}</p>
      </article>
    {/each}
  </section>

  <section class="mx-auto max-w-7xl px-5 pb-16 md:px-8">
    <div class="surface-panel rounded-card p-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-on-surface">{isCheckerPage ? 'Related QR generators' : 'More crypto QR generators'}</h2>
          <p class="mt-2 text-sm text-on-surface-variant">
            {isCheckerPage ? 'Create scan-ready QR codes after checking public payload text.' : 'Create dedicated payment QR codes for other supported networks.'}
          </p>
        </div>
        <a class="btn-secondary" href="/generate">Open all networks</a>
      </div>
      <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {#each relatedPages as item}
          <a
            class="flex items-center justify-between rounded-lg border border-outline-variant bg-surface-low px-4 py-3 text-sm font-semibold text-on-surface transition hover:border-primary/60 hover:text-primary"
            href={`/${item.slug}`}
          >
            <span>{item.name} QR Code Generator</span>
            <CheckCircle2 size={16} style={`color: ${item.accent}`} />
          </a>
        {/each}
      </div>
    </div>
  </section>
</main>
