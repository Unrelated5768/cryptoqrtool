<script lang="ts">
  import { Upload } from 'lucide-svelte';
  import {
    builtInPresets,
    defaultQrStyle,
    getContrastWarning,
    validateLogoFile,
    type QrStyle
  } from '$lib/qrStyle';

  export let style: QrStyle = { ...defaultQrStyle };
  export let customLogoDataUrl: string | undefined = undefined;

  let fileWarning = '';
  $: contrastWarning = getContrastWarning(style);

  function applyStyle(next: Partial<QrStyle>) {
    style = { ...style, ...next };
  }

  function commitStyle() {
    style = { ...style };
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
  }

  function readFile(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
</script>

<section class="glass-panel rounded-card p-5 md:p-6">
  <div class="mb-5">
    <h2 class="text-xl font-semibold text-on-surface">Style editor</h2>
    <p class="text-sm text-on-surface-variant">Presets keep contrast and quiet-zone defaults conservative.</p>
  </div>

  <div class="grid gap-5">
    <div>
      <p class="label mb-2">Built-in presets</p>
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

    <div>
      <label class="label mb-2 block" for="logo">Logo</label>
      <select id="logo" data-testid="logo-select" class="field" bind:value={style.logo} on:change={commitStyle}>
        <option value="none">None</option>
        <option value="xmr">Monero XMR</option>
        <option value="btc">Bitcoin BTC</option>
        <option value="eth">Ethereum ETH</option>
        <option value="sol">Solana SOL</option>
        <option value="ltc">Litecoin LTC</option>
        <option value="usdc">USD Coin USDC</option>
        <option value="usdt">Tether USDT</option>
        <option value="custom">Custom uploaded logo</option>
      </select>
    </div>

    <label class="btn-secondary cursor-pointer">
      <Upload size={16} />
      Upload custom logo
      <input data-testid="custom-logo-input" class="sr-only" type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" on:change={handleLogoUpload} />
    </label>
    {#if fileWarning}
      <p class="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">{fileWarning}</p>
    {/if}

    <div class="grid gap-4 md:grid-cols-3">
      <div>
        <label class="label mb-2 block" for="dots">Dots</label>
        <select id="dots" class="field" bind:value={style.dots} on:change={commitStyle}>
          <option value="square">Square</option>
          <option value="rounded">Rounded</option>
          <option value="dots">Dots</option>
          <option value="classy">Classy</option>
          <option value="extra-rounded">Extra rounded</option>
        </select>
      </div>
      <div>
        <label class="label mb-2 block" for="corner-square">Corner square</label>
        <select id="corner-square" class="field" bind:value={style.cornersSquare} on:change={commitStyle}>
          <option value="square">Square</option>
          <option value="dot">Dot</option>
          <option value="extra-rounded">Extra rounded</option>
        </select>
      </div>
      <div>
        <label class="label mb-2 block" for="corner-dot">Corner dot</label>
        <select id="corner-dot" class="field" bind:value={style.cornersDot} on:change={commitStyle}>
          <option value="square">Square</option>
          <option value="dot">Dot</option>
        </select>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div>
        <label class="label mb-2 block" for="color-mode">Color mode</label>
        <select id="color-mode" class="field" bind:value={style.colorMode} on:change={commitStyle}>
          <option value="solid">Solid foreground</option>
          <option value="gradient">Gradient foreground</option>
          <option value="preset">Preset palette</option>
        </select>
      </div>
      <div>
        <label class="label mb-2 block" for="foreground">Foreground</label>
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
        <label class="label mb-2 block" for="foreground-end">Gradient end</label>
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
        <label class="label mb-2 block" for="background">Background</label>
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
        <label class="label mb-2 block" for="margin">Quiet zone: {style.margin}px</label>
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
        <label class="label mb-2 block" for="logo-size">Logo size: {Math.round(style.logoSize * 100)}%</label>
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
      <p class="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">{contrastWarning}</p>
    {/if}
  </div>
</section>
