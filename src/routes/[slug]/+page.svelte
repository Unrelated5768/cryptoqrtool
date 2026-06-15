<script lang="ts">
  import { page as routeStore } from '$app/stores';
  import { AlertTriangle, ArrowRight, CheckCircle2, ListChecks, Palette, ShieldCheck, WalletCards } from 'lucide-svelte';
  import { messagesForLocale } from '$lib/i18n/messages';
  import { localizedHref, parseLocalePath } from '$lib/i18n/routing';
  import { landingPages, relatedPageLabel, relatedLandingPages, type CoinLandingPage } from '$lib/seo';

  export let data: {
    landingPage: CoinLandingPage;
  };

  $: page = data.landingPage;
  $: isGeneratorPage = page.template === 'generator';
  $: isGuidePage = page.template === 'guide';
  $: isCheckerPage = page.template === 'checker';
  $: activeLocale = parseLocalePath($routeStore.url.pathname).locale;
  $: t = messagesForLocale(activeLocale);
  $: generatorPage = page.networkId ? landingPages.find((item) => item.template === 'generator' && item.networkId === page.networkId) : null;
  $: guidePage = page.networkId ? landingPages.find((item) => item.template === 'guide' && item.networkId === page.networkId) : null;
  $: relatedPages = relatedLandingPages(page).slice(0, 6);
  $: secondaryAction =
    isGeneratorPage && guidePage
      ? { href: `/${guidePage.slug}`, label: t.landing.readGuide(page.name) }
      : isGuidePage && generatorPage
        ? { href: generatorPage.ctaHref, label: t.landing.openGenerator(page.name) }
        : isCheckerPage && generatorPage
          ? { href: generatorPage.ctaHref, label: t.landing.createQrCode(page.name) }
          : { href: '/security', label: t.landing.privacyModel };
  $: relatedHeading = isGuidePage ? t.landing.nextSteps : isCheckerPage ? t.landing.relatedTools : t.landing.relatedGenerator;
  $: primarySectionHeading = isGuidePage ? t.landing.guideDetails : isCheckerPage ? t.landing.checkerCovers : t.landing.generatorCovers;
  $: trustHeading = isGuidePage ? t.landing.mistakesAvoid : t.landing.trustNotes;

  const benefitIcons = [WalletCards, Palette, ShieldCheck];
</script>

<main>
  <section class="mx-auto grid max-w-7xl items-start gap-10 px-5 py-10 md:min-h-[calc(100dvh-4rem)] md:items-center md:grid-cols-[1.02fr_0.98fr] md:px-8 md:py-14">
    <div class="max-w-2xl">
      <p class="label mb-3">{page.eyebrow}</p>
      <h1 class="text-4xl font-bold leading-tight text-on-surface md:text-6xl">{page.headline}</h1>
      <p class="mt-5 text-lg leading-8 text-on-surface-variant">{page.body}</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a class="btn-primary" href={localizedHref(page.ctaHref, activeLocale)}>
          {page.ctaLabel} <ArrowRight size={18} />
        </a>
        <a class="btn-secondary" href={localizedHref(secondaryAction.href, activeLocale)}>{secondaryAction.label}</a>
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

  {#if page.howToSteps?.length}
    <section class="mx-auto max-w-7xl px-5 pb-12 md:px-8">
      <div class="surface-panel rounded-card p-6">
        <div class="mb-5 flex items-center gap-3">
          <ListChecks class="text-primary" size={24} />
          <h2 class="text-2xl font-semibold text-on-surface">{t.landing.howToSafely}</h2>
        </div>
        <ol class="grid gap-3 md:grid-cols-2">
          {#each page.howToSteps as step, index}
            <li class="rounded-lg border border-outline-variant bg-surface-low p-4 text-sm leading-6 text-on-surface-variant">
              <span class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-action/15 font-semibold text-primary">
                {index + 1}
              </span>
              {step}
            </li>
          {/each}
        </ol>
      </div>
    </section>
  {/if}

  <section class="mx-auto max-w-7xl px-5 pb-12 md:px-8">
    <div class="surface-panel rounded-card p-6">
      <h2 class="text-2xl font-semibold text-on-surface">{primarySectionHeading}</h2>
      <div class="mt-5 grid gap-4 md:grid-cols-3">
        {#each page.primarySections as section}
          <article class="rounded-lg border border-outline-variant bg-surface-low p-5">
            <h3 class="text-lg font-semibold text-on-surface">{section.title}</h3>
            <p class="mt-3 text-sm leading-6 text-on-surface-variant">{section.body}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  {#if page.trustPoints?.length || page.cautionItems?.length}
    <section class="mx-auto max-w-7xl px-5 pb-12 md:px-8">
      <div class="surface-panel rounded-card p-6">
        <h2 class="text-2xl font-semibold text-on-surface">{trustHeading}</h2>
        <div class="mt-5 grid gap-4 md:grid-cols-2">
          {#if page.trustPoints?.length}
            <article class="rounded-lg border border-outline-variant bg-surface-low p-5">
              <div class="mb-4 flex items-center gap-3">
                <ShieldCheck class="text-primary" size={22} />
                <h3 class="text-lg font-semibold text-on-surface">{t.landing.trustSignals}</h3>
              </div>
              <ul class="grid gap-3 text-sm leading-6 text-on-surface-variant">
                {#each page.trustPoints as item}
                  <li class="rounded-lg border border-outline-variant/70 bg-surface-container px-4 py-3">{item}</li>
                {/each}
              </ul>
            </article>
          {/if}

          {#if page.cautionItems?.length}
            <article class="rounded-lg border border-outline-variant bg-surface-low p-5">
              <div class="mb-4 flex items-center gap-3">
                <AlertTriangle class="text-warning" size={22} />
                <h3 class="text-lg font-semibold text-on-surface">{isGuidePage ? t.landing.guideCautions : t.landing.commonMistakes}</h3>
              </div>
              <ul class="grid gap-3 text-sm leading-6 text-on-surface-variant">
                {#each page.cautionItems as item}
                  <li class="rounded-lg border border-outline-variant/70 bg-surface-container px-4 py-3">{item}</li>
                {/each}
              </ul>
            </article>
          {/if}
        </div>
      </div>
    </section>
  {/if}

  {#if page.faq.length}
    <section class="mx-auto max-w-7xl px-5 pb-12 md:px-8">
      <div class="surface-panel rounded-card p-6">
        <h2 class="text-2xl font-semibold text-on-surface">{t.landing.faq}</h2>
        <div class="mt-5 grid gap-4 md:grid-cols-2">
          {#each page.faq as item}
            <article class="rounded-lg border border-outline-variant bg-surface-low p-5">
              <h3 class="text-lg font-semibold text-on-surface">{item.question}</h3>
              <p class="mt-3 text-sm leading-6 text-on-surface-variant">{item.answer}</p>
            </article>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <section class="mx-auto max-w-7xl px-5 pb-16 md:px-8">
    <div class="surface-panel rounded-card p-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-on-surface">{relatedHeading}</h2>
          <p class="mt-2 text-sm text-on-surface-variant">
            {isGuidePage
              ? t.landing.guideRelatedBody
              : isCheckerPage
                ? t.landing.checkerRelatedBody
                : t.landing.generatorRelatedBody}
          </p>
        </div>
        <a class="btn-secondary" href={localizedHref('/generate', activeLocale)}>{t.landing.openAllNetworks}</a>
      </div>
      <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {#each relatedPages as item}
          <a
            class="flex items-center justify-between rounded-lg border border-outline-variant bg-surface-low px-4 py-3 text-sm font-semibold text-on-surface transition hover:border-primary/60 hover:text-primary"
            href={localizedHref(`/${item.slug}`, activeLocale)}
          >
            <span>{relatedPageLabel(item)}</span>
            <CheckCircle2 size={16} style={`color: ${item.accent}`} />
          </a>
        {/each}
      </div>
    </div>
  </section>
</main>
