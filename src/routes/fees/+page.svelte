<script lang="ts">
  import { page } from '$app/stores';
  import StatusBadge from '$components/StatusBadge.svelte';
  import { tr } from '$lib/i18n/phrases';
  import { parseLocalePath } from '$lib/i18n/routing';

  export let data: {
    result: {
      state: 'fresh' | 'stale' | 'unavailable' | 'rate-limited';
      data: Array<{ network: string; ticker: string; status: 'fresh' | 'stale' | 'unavailable' | 'rate-limited'; priority: string; standard: string; economy: string; source: string }>;
      updatedAt: string;
    };
  };

  $: activeLocale = parseLocalePath($page.url.pathname).locale;
  $: t = (phrase: string) => tr(activeLocale, phrase);
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <p class="label mb-2">{t('Live fee comparison')}</p>
      <h1 class="text-3xl font-bold text-on-surface md:text-5xl">{t('Network fees')}</h1>
      <p class="mt-3 max-w-3xl text-on-surface-variant">
        Fee modules show live, configured, stale, rate-limited, and unavailable states explicitly.
      </p>
    </div>
    <StatusBadge status={data.result.state} label={data.result.state} />
  </div>

  <section class="glass-panel overflow-hidden rounded-card">
    <div class="grid gap-px bg-outline-variant/50 md:hidden">
      {#each data.result.data as row}
        <article class="bg-surface-low p-4">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="font-semibold">{row.network}</p>
              <p class="mt-1 text-sm text-on-surface-variant">{row.ticker}</p>
            </div>
            <StatusBadge status={row.status} label={row.status} />
          </div>

          <dl class="mt-4 grid gap-3 sm:grid-cols-2">
            <div class="rounded-lg border border-outline-variant/70 bg-surface-container px-3 py-2">
              <dt class="text-xs font-semibold uppercase tracking-[0.08em] text-on-surface-variant">{t('Priority')}</dt>
              <dd class="mt-1 text-sm text-on-surface">{row.priority}</dd>
            </div>
            <div class="rounded-lg border border-outline-variant/70 bg-surface-container px-3 py-2">
              <dt class="text-xs font-semibold uppercase tracking-[0.08em] text-on-surface-variant">{t('Standard')}</dt>
              <dd class="mt-1 text-sm text-on-surface">{row.standard}</dd>
            </div>
            <div class="rounded-lg border border-outline-variant/70 bg-surface-container px-3 py-2">
              <dt class="text-xs font-semibold uppercase tracking-[0.08em] text-on-surface-variant">{t('Economy')}</dt>
              <dd class="mt-1 text-sm text-on-surface">{row.economy}</dd>
            </div>
            <div class="rounded-lg border border-outline-variant/70 bg-surface-container px-3 py-2">
              <dt class="text-xs font-semibold uppercase tracking-[0.08em] text-on-surface-variant">{t('Source')}</dt>
              <dd class="mt-1 text-sm text-on-surface">{row.source}</dd>
            </div>
          </dl>
        </article>
      {/each}
    </div>

    <div class="hidden gap-px bg-outline-variant/50 md:grid md:grid-cols-5">
      <div class="bg-surface-container p-4 font-semibold">{t('Network')}</div>
      <div class="bg-surface-container p-4 font-semibold">{t('Priority')}</div>
      <div class="bg-surface-container p-4 font-semibold">{t('Standard')}</div>
      <div class="bg-surface-container p-4 font-semibold">{t('Economy')}</div>
      <div class="bg-surface-container p-4 font-semibold">{t('Source')}</div>
      {#each data.result.data as row}
        <div class="bg-surface-low p-4">
          <p class="font-semibold">{row.network}</p>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge status={row.status} label={row.status} />
            <span class="text-sm text-on-surface-variant">{row.ticker}</span>
          </div>
        </div>
        <div class="bg-surface-low p-4">{row.priority}</div>
        <div class="bg-surface-low p-4">{row.standard}</div>
        <div class="bg-surface-low p-4">{row.economy}</div>
        <div class="bg-surface-low p-4 text-on-surface-variant">{row.source}</div>
      {/each}
    </div>
  </section>
</main>
