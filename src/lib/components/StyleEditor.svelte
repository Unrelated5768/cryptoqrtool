<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { ChevronDown, Upload } from 'lucide-svelte';
  import { cryptoIcons, getCryptoIcon, type CryptoIconVariant } from '$lib/cryptoIcons';
  import type { Locale } from '$lib/i18n/locales';
  import { tr } from '$lib/i18n/phrases';
  import {
    builtInPresets,
    defaultQrStyle,
    getContrastWarning,
    validateLogoFile,
    type QrStyle
  } from '$lib/qrStyle';

  export let style: QrStyle = { ...defaultQrStyle };
  export let customLogoDataUrl: string | undefined = undefined;
  export let collapseOnMobile = false;
  export let locale: Locale = 'en';

  const dispatch = createEventDispatcher<{
    logoChanged: void;
    presetApplied: void;
  }>();
  const logoVariants: Array<{ value: CryptoIconVariant; label: string }> = [
    { value: 'color', label: 'Color' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' }
  ];

  let fileWarning = '';
  let logoSearch = '';
  let editorOpen = true;
  $: contrastWarning = getContrastWarning(style);
  $: t = (phrase: string) => tr(locale, phrase);
  $: selectedIcon = style.logo === 'none' || style.logo === 'custom' ? undefined : getCryptoIcon(style.logo);
  $: filteredIcons = cryptoIcons
    .filter((icon) => {
      const query = logoSearch.trim().toLowerCase();
      return !query || icon.symbol.includes(query) || icon.name.toLowerCase().includes(query);
    })
    .slice(0, 36);

  function applyStyle(next: Partial<QrStyle>) {
    style = { ...style, ...next };
    dispatch('presetApplied');
  }

  function commitStyle() {
    style = { ...style };
  }

  function chooseLogo(logo: QrStyle['logo']) {
    style = { ...style, logo };
    dispatch('logoChanged');
  }

  function chooseLogoVariant(logoVariant: CryptoIconVariant) {
    style = { ...style, logoVariant };
    dispatch('logoChanged');
  }

  async function handleLogoUpload(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    fileWarning = '';
    if (!file) return;

    const warning = validateLogoFile(file);
    if (warning) {
      fileWarning = warning;
      input.value = '';
      return;
    }

    customLogoDataUrl = await readFile(file);
    style = { ...style, logo: 'custom' };
    dispatch('logoChanged');
  }

  function readFile(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  onMount(() => {
    if (!collapseOnMobile) return;

    const mobileQuery = window.matchMedia('(max-width: 1023px)');
    const syncOpenState = () => {
      editorOpen = !mobileQuery.matches;
    };

    syncOpenState();
    mobileQuery.addEventListener('change', syncOpenState);

    return () => mobileQuery.removeEventListener('change', syncOpenState);
  });
</script>

<details bind:open={editorOpen} class="glass-panel rounded-card p-5 md:p-6">
  <summary class="group flex cursor-pointer list-none items-center justify-between gap-4 marker:hidden">
    <div>
      <h2 class="text-xl font-semibold text-on-surface">{t('Style editor')}</h2>
      <p class="text-sm text-on-surface-variant">{t('Presets keep contrast and quiet-zone defaults conservative.')}</p>
    </div>
    <ChevronDown size={18} class="shrink-0 text-on-surface-variant transition group-open:rotate-180" />
  </summary>

  <div class="mt-5 grid gap-5">
    <div>
      <p class="label mb-2">{t('Built-in presets')}</p>
      <div class="grid grid-cols-2 gap-2">
        {#each builtInPresets as preset}
          <button
            type="button"
            data-testid="built-in-preset"
            class="rounded-lg border border-outline-variant bg-surface-high px-3 py-2 text-left text-sm text-on-surface transition hover:border-primary"
            on:click={() => applyStyle(preset.style)}
          >
            {preset.name}
          </button>
        {/each}
      </div>
    </div>

    <div class="grid gap-3">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <label class="label mb-2 block" for="logo-search">{t('Logo')}</label>
          <p class="text-sm text-on-surface-variant">
            {#if style.logo === 'none'}
              {t('No embedded logo selected.')}
            {:else if style.logo === 'custom'}
              {t('Custom uploaded logo selected.')}
            {:else if selectedIcon}
              {selectedIcon.name} ({selectedIcon.symbol.toUpperCase()}) {t('Selected')}
            {:else}
              {t('Catalog logo selected.')}
            {/if}
          </p>
        </div>
        <div class="grid grid-cols-3 rounded-lg border border-outline-variant bg-surface-low p-1" data-testid="logo-variant-control">
          {#each logoVariants as option}
            <button
              type="button"
              class={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                style.logoVariant === option.value
                  ? 'bg-primary-action text-white'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              aria-pressed={style.logoVariant === option.value}
              on:click={() => chooseLogoVariant(option.value)}
            >
              {t(option.label)}
            </button>
          {/each}
        </div>
      </div>

      <div class="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
        <input
          id="logo-search"
          data-testid="logo-search"
          class="field"
          placeholder={t('Search by symbol or name')}
          bind:value={logoSearch}
        />
        <button type="button" data-testid="logo-none" class="btn-secondary" on:click={() => chooseLogo('none')}>{t('None')}</button>
        <button type="button" data-testid="logo-custom" class="btn-secondary" on:click={() => chooseLogo('custom')}>{t('Custom')}</button>
      </div>

      <div class="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-outline-variant bg-surface-low p-2 sm:grid-cols-3">
        {#each filteredIcons as icon}
          <button
            type="button"
            data-testid="catalog-logo-option"
            class={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
              style.logo === icon.symbol
                ? 'border-primary bg-primary/12 text-primary'
                : 'border-outline-variant bg-surface-high text-on-surface hover:border-primary'
            }`}
            on:click={() => chooseLogo(icon.symbol)}
          >
            <img class="h-6 w-6 shrink-0" src={icon.variants[style.logoVariant] ?? icon.variants.color} alt="" />
            <span class="min-w-0">
              <span class="block truncate font-semibold">{icon.symbol.toUpperCase()}</span>
              <span class="block truncate text-xs opacity-75">{icon.name}</span>
            </span>
          </button>
        {/each}
      </div>
    </div>

    <label class="btn-secondary cursor-pointer">
      <Upload size={16} />
      {t('Upload custom logo')}
      <input data-testid="custom-logo-input" class="sr-only" type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" on:change={handleLogoUpload} />
    </label>
    {#if fileWarning}
      <p class="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">{t(fileWarning)}</p>
    {/if}

    <div class="grid gap-4 md:grid-cols-3">
      <div>
        <label class="label mb-2 block" for="dots">{t('Dots')}</label>
        <select id="dots" class="field" bind:value={style.dots} on:change={commitStyle}>
          <option value="square">{t('Square')}</option>
          <option value="rounded">{t('Rounded')}</option>
          <option value="dots">{t('Dots')}</option>
          <option value="classy">{t('Classy')}</option>
          <option value="extra-rounded">{t('Extra rounded')}</option>
        </select>
      </div>
      <div>
        <label class="label mb-2 block" for="corner-square">{t('Corner square')}</label>
        <select id="corner-square" class="field" bind:value={style.cornersSquare} on:change={commitStyle}>
          <option value="square">{t('Square')}</option>
          <option value="dot">{t('Dot')}</option>
          <option value="extra-rounded">{t('Extra rounded')}</option>
        </select>
      </div>
      <div>
        <label class="label mb-2 block" for="corner-dot">{t('Corner dot')}</label>
        <select id="corner-dot" class="field" bind:value={style.cornersDot} on:change={commitStyle}>
          <option value="square">{t('Square')}</option>
          <option value="dot">{t('Dot')}</option>
        </select>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div>
        <label class="label mb-2 block" for="color-mode">{t('Color mode')}</label>
        <select id="color-mode" class="field" bind:value={style.colorMode} on:change={commitStyle}>
          <option value="solid">{t('Solid foreground')}</option>
          <option value="gradient">{t('Gradient foreground')}</option>
          <option value="preset">{t('Preset palette')}</option>
        </select>
      </div>
      <div>
        <label class="label mb-2 block" for="foreground">{t('Foreground')}</label>
        <input
          id="foreground"
          data-testid="foreground-input"
          class="h-12 w-full rounded-lg border border-outline-variant bg-surface-low p-1"
          type="color"
          bind:value={style.foreground}
          on:input={commitStyle}
        />
      </div>
      <div>
        <label class="label mb-2 block" for="foreground-end">{t('Gradient end')}</label>
        <input
          id="foreground-end"
          class="h-12 w-full rounded-lg border border-outline-variant bg-surface-low p-1"
          type="color"
          bind:value={style.foregroundEnd}
          on:input={commitStyle}
        />
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div>
        <label class="label mb-2 block" for="background">{t('Background')}</label>
        <input
          id="background"
          data-testid="background-input"
          class="h-12 w-full rounded-lg border border-outline-variant bg-surface-low p-1"
          type="color"
          bind:value={style.background}
          on:input={commitStyle}
        />
      </div>
      <div>
        <label class="label mb-2 block" for="margin">{t('Quiet zone')}: {style.margin}px</label>
        <input
          id="margin"
          class="w-full accent-primary-action"
          type="range"
          min="8"
          max="48"
          step="4"
          bind:value={style.margin}
          on:input={commitStyle}
        />
      </div>
      <div>
        <label class="label mb-2 block" for="logo-size">{t('Logo size')}: {Math.round(style.logoSize * 100)}%</label>
        <input
          id="logo-size"
          class="w-full accent-primary-action"
          type="range"
          min="0.12"
          max="0.32"
          step="0.01"
          bind:value={style.logoSize}
          on:input={commitStyle}
        />
      </div>
    </div>

    {#if contrastWarning}
      <p class="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">{t(contrastWarning)}</p>
    {/if}
  </div>
</details>
