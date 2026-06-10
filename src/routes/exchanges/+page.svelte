<script lang="ts">
  import StatusBadge from '$components/StatusBadge.svelte';

  export let data: {
    result: {
      state: 'fresh' | 'stale' | 'unavailable' | 'rate-limited';
      data: Array<{
        id: string;
        name: string;
        image?: string;
        country?: string;
        trustScore?: number;
        tradeVolumeBtc?: number;
        url?: string;
      }>;
      updatedAt: string;
    };
  };

  let xmrFilter = false;
  $: rows = data.result.data;
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <p class="label mb-2">Liquidity sources</p>
      <h1 class="text-3xl font-bold text-on-surface md:text-5xl">Exchange directory</h1>
      <p class="mt-3 max-w-3xl text-on-surface-variant">
        CoinGecko exchange directory data with an explicit XMR support filter placeholder where asset-pair data is available.
      </p>
    </div>
    <StatusBadge status={data.result.state} label={data.result.state} />
  </div>

  <label class="mb-5 inline-flex items-center gap-3 rounded-lg border border-outline-variant bg-surface-low px-4 py-3">
    <input type="checkbox" class="rounded border-outline-variant bg-surface-high text-primary-action" bind:checked={xmrFilter} />
    <span>Show XMR-support filter state</span>
  </label>
  {#if xmrFilter}
    <p class="mb-5 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-warning">
      CoinGecko's exchange list endpoint does not include per-asset support. XMR filtering requires exchange ticker data and is marked unavailable here.
    </p>
  {/if}

  <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {#each rows as row}
      <article class="surface-panel rounded-card p-5">
        <div class="flex items-start justify-between gap-3">
          <div class="flex min-w-0 items-center gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-outline-variant bg-white p-2">
              {#if row.image}
                <img class="h-full w-full object-contain" src={row.image} alt={`${row.name} logo`} loading="lazy" referrerpolicy="no-referrer" />
              {:else}
                <span class="text-sm font-bold text-surface">{row.name.slice(0, 2).toUpperCase()}</span>
              {/if}
            </div>
            <div class="min-w-0">
              <h2 class="truncate text-lg font-semibold text-on-surface">{row.name}</h2>
              <p class="text-sm text-on-surface-variant">{row.country ?? 'Global'}</p>
            </div>
          </div>
          <span class="rounded-full border border-primary/30 bg-primary-action/15 px-3 py-1 text-sm font-semibold text-primary">
            {row.trustScore ?? 'n/a'}
          </span>
        </div>
        <p class="mt-4 text-sm text-on-surface-variant">24h volume: {row.tradeVolumeBtc?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? 'n/a'} BTC</p>
        {#if row.url}
          <a class="mt-4 inline-flex text-sm font-semibold text-primary hover:underline" href={row.url} rel="noreferrer" target="_blank">Open exchange</a>
        {/if}
      </article>
    {:else}
      <p class="rounded-lg border border-outline-variant bg-surface-low p-5 text-on-surface-variant">Exchange data is unavailable.</p>
    {/each}
  </section>
</main>
