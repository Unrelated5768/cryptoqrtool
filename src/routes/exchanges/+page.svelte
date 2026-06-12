<script lang="ts">
  import StatusBadge from '$components/StatusBadge.svelte';
  import {
    defaultVisibleSearchPageSize,
    filterVisibleSearchRows,
    getHiddenSearchRowCount,
    getNextVisibleSearchCount,
    getSearchInputValue,
    getVisibleSearchRows
  } from '$lib/visibleSearch';

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
  let searchQuery = '';
  let visibleCount = defaultVisibleSearchPageSize;
  $: rows = data.result.data;
  $: filteredRows = filterVisibleSearchRows(rows, searchQuery, (row) => `${row.name} ${row.country ?? ''}`);
  $: visibleRows = getVisibleSearchRows(filteredRows, visibleCount);
  $: hiddenCount = getHiddenSearchRowCount(filteredRows.length, visibleRows.length);

  function showMore() {
    visibleCount = getNextVisibleSearchCount(visibleCount, filteredRows.length);
  }

  function updateSearch(event: Event) {
    searchQuery = getSearchInputValue(event);
    visibleCount = defaultVisibleSearchPageSize;
  }
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

  <div class="mb-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
    <label class="sr-only" for="exchange-search">Search exchanges</label>
    <input
      id="exchange-search"
      class="field"
      type="search"
      placeholder="Search exchanges or countries"
      value={searchQuery}
      on:input={updateSearch}
    />
    <label class="inline-flex items-center gap-3 rounded-lg border border-outline-variant bg-surface-low px-4 py-3">
      <input type="checkbox" class="rounded border-outline-variant bg-surface-high text-primary-action" bind:checked={xmrFilter} />
      <span>Show XMR-support filter state</span>
    </label>
  </div>
  {#if xmrFilter}
    <p class="mb-5 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-warning">
      CoinGecko's exchange list endpoint does not include per-asset support. XMR filtering requires exchange ticker data and is marked unavailable here.
    </p>
  {/if}

  <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {#each visibleRows as row}
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
    {/each}
  </section>

  {#if rows.length === 0}
    <p class="rounded-lg border border-outline-variant bg-surface-low p-5 text-on-surface-variant">Exchange data is unavailable.</p>
  {:else if filteredRows.length === 0}
    <p class="rounded-lg border border-outline-variant bg-surface-low p-5 text-on-surface-variant">No exchanges match this search.</p>
  {/if}

  {#if hiddenCount > 0}
    <div class="mt-6 flex justify-center">
      <button class="btn-secondary" type="button" on:click={showMore}>
        Show 12 more
        <span class="text-on-surface-variant">({hiddenCount} remaining)</span>
      </button>
    </div>
  {/if}
</main>
