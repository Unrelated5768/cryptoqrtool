<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { Copy, Pencil, QrCode, Trash2 } from 'lucide-svelte';
  import { tr } from '$lib/i18n/phrases';
  import { localizedHref, parseLocalePath } from '$lib/i18n/routing';
  import { networks, type NetworkId } from '$lib/networks';
  import {
    deleteAddress,
    deleteStylePreset,
    loadStorage,
    updateAddressLabel,
    updateStylePresetName,
    type SavedAddress
  } from '$lib/storage';
  import type { StylePreset } from '$lib/qrStyle';

  let addresses: SavedAddress[] = [];
  let presets: StylePreset[] = [];
  let filter: NetworkId | 'all' = 'all';
  let message = '';

  $: activeLocale = parseLocalePath($page.url.pathname).locale;
  $: t = (phrase: string) => tr(activeLocale, phrase);
  $: filteredAddresses = filter === 'all' ? addresses : addresses.filter((address) => address.network === filter);

  onMount(refresh);

  function refresh() {
    const data = loadStorage();
    addresses = data.addresses;
    presets = data.presets;
  }

  async function copy(value: string) {
    await navigator.clipboard?.writeText(value);
    message = t('Copied to clipboard.');
    setTimeout(() => (message = ''), 1400);
  }

  function renameAddress(address: SavedAddress) {
    const next = prompt('Rename saved address', address.label);
    if (!next) return;
    updateAddressLabel(address.id, next);
    refresh();
  }

  function renamePreset(preset: StylePreset) {
    const next = prompt('Rename style preset', preset.name);
    if (!next) return;
    updateStylePresetName(preset.id, next);
    refresh();
  }
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8">
    <p class="label mb-2">{t('Browser-local library')}</p>
    <h1 class="text-3xl font-bold text-on-surface md:text-5xl">{t('Saved addresses and presets')}</h1>
    <p class="mt-3 max-w-3xl text-on-surface-variant">
      {t('This page reads only from local storage in this browser. Saved custom logos are kept as data URLs only inside saved presets.')}
    </p>
  </div>

  {#if message}
    <p class="mb-4 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-success">{message}</p>
  {/if}

  <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
    <section class="glass-panel rounded-card p-5 md:p-6">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-xl font-semibold">{t('Saved addresses')}</h2>
        <select class="field max-w-56" bind:value={filter}>
          <option value="all">{t('All networks')}</option>
          {#each networks as network}
            <option value={network.id}>{network.name}</option>
          {/each}
        </select>
      </div>

      <div class="grid gap-3">
        {#each filteredAddresses as item}
          <article class="rounded-lg border border-outline-variant bg-surface-low p-4" data-testid="saved-address-row">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="font-semibold text-on-surface">{item.label}</p>
                <p class="mono mt-2 break-all text-sm text-on-surface-variant">{item.address}</p>
                <p class="mt-2 text-xs uppercase tracking-[0.12em] text-primary">{item.network}</p>
              </div>
              <div class="flex gap-2">
                <a
                  class="icon-button"
                  data-testid="generate-saved-address"
                  href={localizedHref(`/generate?network=${item.network}&address=${encodeURIComponent(item.address)}`, activeLocale)}
                  title={t('Generate QR')}
                >
                  <QrCode size={17} />
                </a>
                <button class="icon-button" on:click={() => copy(item.address)} title={t('Copy address')}><Copy size={17} /></button>
                <button class="icon-button" on:click={() => renameAddress(item)} title={t('Edit label')}><Pencil size={17} /></button>
                <button
                  class="icon-button"
                  on:click={() => {
                    deleteAddress(item.id);
                    refresh();
                  }}
                  title={t('Delete address')}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </article>
        {:else}
          <p class="rounded-lg border border-outline-variant bg-surface-low p-5 text-on-surface-variant">{t('No saved addresses yet.')}</p>
        {/each}
      </div>
    </section>

    <section class="glass-panel rounded-card p-5 md:p-6">
      <h2 class="mb-5 text-xl font-semibold">{t('Style presets')}</h2>
      <div class="grid gap-3">
        {#each presets as preset}
          <article class="rounded-lg border border-outline-variant bg-surface-low p-4" data-testid="saved-preset-row">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="font-semibold text-on-surface">{preset.name}</p>
                <p class="mt-2 text-sm text-on-surface-variant">
                  {preset.style.dots} dots, {preset.style.logo} logo, {preset.style.margin}px quiet zone
                </p>
              </div>
              <div class="flex gap-2">
                <a class="icon-button" data-testid="apply-saved-preset" href={localizedHref(`/generate?preset=${preset.id}`, activeLocale)} title={t('Apply preset')}><QrCode size={17} /></a>
                <button class="icon-button" on:click={() => renamePreset(preset)} title={t('Edit preset name')}><Pencil size={17} /></button>
                <button
                  class="icon-button"
                  on:click={() => {
                    deleteStylePreset(preset.id);
                    refresh();
                  }}
                  title={t('Delete preset')}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </article>
        {:else}
          <p class="rounded-lg border border-outline-variant bg-surface-low p-5 text-on-surface-variant">
            {t('No user-defined style presets yet. Save one from the generator after customizing QR styling.')}
          </p>
        {/each}
      </div>
    </section>
  </div>
</main>
