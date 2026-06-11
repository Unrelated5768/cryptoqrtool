<script lang="ts">
  import { browser } from '$app/environment';
  import StatusBadge from '$components/StatusBadge.svelte';
  import { defaultCurrency, formatCurrency, type FiatCurrency } from '$lib/currency';
  import type { LiveResult, MarketAsset } from '$lib/liveData';

  export let data: {
    result: LiveResult<MarketAsset[]>;
  };

  let amount = '1';
  let result = data.result;
  let loadedCurrency: FiatCurrency = 'USD';
  let loadingCurrency = false;
  let searchQuery = '';
  let visibleCount = 12;
  let selected = result.data.some((row) => row.symbol === 'XMR')
    ? 'XMR'
    : (result.data[0]?.symbol ?? '');
  $: if (browser && $defaultCurrency !== loadedCurrency) {
    loadMarkets($defaultCurrency);
  }
  $: asset = result.data.find((row) => row.symbol === selected) ?? result.data[0];
  $: converted = asset?.price ? Number(amount || 0) * asset.price : 0;
  $: badgeStatus = result.state === 'loading' ? 'fresh' : result.state;
  $: normalizedSearch = searchQuery.trim().toLowerCase();
  $: filteredRows = normalizedSearch
    ? result.data.filter((row) => `${row.name} ${row.symbol}`.toLowerCase().includes(normalizedSearch))
    : result.data;
  $: visibleRows = filteredRows.slice(0, visibleCount);
  $: hiddenCount = Math.max(filteredRows.length - visibleRows.length, 0);

  async function loadMarkets(currency: FiatCurrency) {
    loadedCurrency = currency;
    loadingCurrency = true;
    try {
      const response = await fetch(`/api/markets?currency=${currency}`);
      result = await response.json();
    } finally {
      loadingCurrency = false;
    }
  }

  function showMore() {
    visibleCount = Math.min(visibleCount + 12, filteredRows.length);
  }

  function updateSearch(event: Event) {
    searchQuery = event.currentTarget instanceof HTMLInputElement ? event.currentTarget.value : '';
    visibleCount = 12;
  }
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <p class="label mb-2">Live market data</p>
      <h1 class="text-3xl font-bold text-on-surface md:text-5xl">Market prices</h1>
      <p class="mt-3 max-w-3xl text-on-surface-variant">
        CoinGecko-backed top 50 crypto assets by market cap, including logos, {$defaultCurrency} prices, and 24h movement.
      </p>
    </div>
    <StatusBadge status={badgeStatus} label={loadingCurrency ? 'loading' : result.state} />
  </div>

  <div class="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
    <section class="glass-panel rounded-card p-5 md:p-6">
      <label class="sr-only" for="market-search">Search assets</label>
      <input
        id="market-search"
        class="field mb-4"
        type="search"
        placeholder="Search assets or symbols"
        value={searchQuery}
        on:input={updateSearch}
      />

      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {#each visibleRows as row}
          <article class="rounded-lg border border-outline-variant bg-surface-low p-4">
            <div class="flex min-w-0 items-start justify-between gap-3">
              <div class="flex min-w-0 items-center gap-3">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-outline-variant bg-white p-2">
                  {#if row.image}
                    <img class="h-full w-full object-contain" src={row.image} alt={`${row.name} logo`} loading="lazy" referrerpolicy="no-referrer" />
                  {:else}
                    <span class="text-xs font-bold text-surface">{row.symbol.slice(0, 4)}</span>
                  {/if}
                </div>
                <div class="min-w-0">
                  <p class="truncate font-semibold text-on-surface">{row.name}</p>
                  <p class="text-sm text-primary">{row.symbol}</p>
                </div>
              </div>
              <p class={row.change24h && row.change24h >= 0 ? 'shrink-0 text-sm font-semibold text-success' : 'shrink-0 text-sm font-semibold text-error'}>
                {row.change24h?.toFixed(2) ?? 'n/a'}%
              </p>
            </div>
            <p class="mt-4 text-lg font-semibold text-on-surface">{formatCurrency(row.price, $defaultCurrency)}</p>
            <p class="text-xs text-on-surface-variant">Market cap {formatCurrency(row.marketCap, $defaultCurrency)}</p>
          </article>
        {/each}
      </div>

      {#if result.data.length === 0}
        <p class="rounded-lg border border-outline-variant bg-surface-low p-5 text-on-surface-variant">Market data is unavailable.</p>
      {:else if filteredRows.length === 0}
        <p class="rounded-lg border border-outline-variant bg-surface-low p-5 text-on-surface-variant">No assets match this search.</p>
      {/if}

      {#if hiddenCount > 0}
        <div class="mt-6 flex justify-center">
          <button class="btn-secondary" type="button" on:click={showMore}>
            Show 12 more
            <span class="text-on-surface-variant">({hiddenCount} remaining)</span>
          </button>
        </div>
      {/if}
    </section>

    <section class="glass-panel rounded-card p-5 md:p-6">
      <h2 class="text-xl font-semibold">Converter</h2>
      <div class="mt-5 grid gap-4">
        <div>
          <label class="label mb-2 block" for="market-converter-amount">Amount</label>
          <input id="market-converter-amount" class="field" inputmode="decimal" bind:value={amount} />
        </div>
        <div>
          <label class="label mb-2 block" for="market-converter-asset">Asset</label>
          <select id="market-converter-asset" class="field" bind:value={selected}>
            {#each result.data as row}
              <option value={row.symbol}>{row.symbol} - {row.name}</option>
            {/each}
          </select>
        </div>
        {#if asset}
          <div class="flex items-center gap-3 rounded-lg border border-outline-variant bg-surface-low p-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-2">
              {#if asset.image}
                <img class="h-full w-full object-contain" src={asset.image} alt={`${asset.name} logo`} loading="lazy" referrerpolicy="no-referrer" />
              {:else}
                <span class="text-xs font-bold text-surface">{asset.symbol.slice(0, 4)}</span>
              {/if}
            </div>
            <div>
              <p class="font-semibold text-on-surface">{asset.name}</p>
              <p class="text-sm text-on-surface-variant">{asset.symbol}</p>
            </div>
          </div>
        {/if}
        <div class="rounded-lg border border-outline-variant bg-surface-low p-4">
          <p class="text-sm text-on-surface-variant">{$defaultCurrency} estimate</p>
          <p class="text-2xl font-bold text-on-surface">{formatCurrency(converted, $defaultCurrency)}</p>
        </div>
      </div>
    </section>
  </div>
</main>
