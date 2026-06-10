<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { Clipboard, Copy, Save } from 'lucide-svelte';
  import QrPreview from '$components/QrPreview.svelte';
  import StatusBadge from '$components/StatusBadge.svelte';
  import StyleEditor from '$components/StyleEditor.svelte';
  import { defaultCurrency, type FiatCurrency } from '$lib/currency';
  import {
    buildQrPayload,
    detectNetwork,
    estimateFiat,
    getNetwork,
    networks,
    validateAddress,
    type NetworkId
  } from '$lib/networks';
  import { defaultQrStyle, type QrStyle } from '$lib/qrStyle';
  import { loadStorage, saveAddress, saveStylePreset } from '$lib/storage';

  type NetworkSelection = NetworkId | 'automatic';
  type GeneratorMode = 'guided' | 'custom';

  let mode: GeneratorMode = 'guided';
  let network: NetworkSelection = 'automatic';
  let address = '';
  let amount = '';
  let customPayload = '';
  let label = '';
  let presetName = '';
  let savedMessage = '';
  let copied = false;
  let price: number | undefined;
  let loadedPriceKey = '';
  let style: QrStyle = { ...defaultQrStyle, logo: 'xmr' };
  let customLogoDataUrl: string | undefined;

  $: detectedNetwork = network === 'automatic' ? detectNetwork(address) : network;
  $: effectiveNetwork = detectedNetwork ?? 'monero';
  $: selectedNetwork = getNetwork(effectiveNetwork);
  $: validation =
    network === 'automatic' && !detectedNetwork
      ? {
          status: address.trim() ? ('warning' as const) : ('warning' as const),
          message: address.trim()
            ? 'Automatic mode could not identify a supported network from this address.'
            : 'Paste an address and CryptoGen will select the network automatically.'
        }
      : validateAddress(effectiveNetwork, address);
  $: customPayloadValidation = customPayload.trim()
    ? {
        status: customPayload.length > 4096 ? ('warning' as const) : ('valid' as const),
        message:
          customPayload.length > 4096
            ? 'Large payloads may produce dense QR codes that scan poorly.'
            : 'Custom payload will be encoded exactly as entered.'
      }
    : {
        status: 'warning' as const,
        message: 'Enter a custom payload to generate a QR code.'
      };
  $: activeValidation = mode === 'custom' ? customPayloadValidation : validation;
  $: payload =
    mode === 'custom'
      ? customPayload.trim()
      : validation.status === 'valid'
        ? buildQrPayload(effectiveNetwork, address, amount)
        : '';
  $: priceKey = `${$defaultCurrency}:${selectedNetwork.ticker}`;
  $: if (browser && priceKey !== loadedPriceKey) {
    loadPrice($defaultCurrency);
  }
  $: fiatEstimate = estimateFiat(amount, price, $defaultCurrency);

  onMount(async () => {
    const params = $page.url.searchParams;
    const requestedNetwork = params.get('network') as NetworkSelection | null;
    const requestedAddress = params.get('address');
    const requestedPreset = params.get('preset');
    if (
      requestedNetwork &&
      (requestedNetwork === 'automatic' || networks.some((option) => option.id === requestedNetwork))
    ) {
      network = requestedNetwork;
    }
    if (requestedAddress) {
      address = requestedAddress;
    }
    if (requestedPreset) {
      const preset = loadStorage().presets.find((item) => item.id === requestedPreset);
      if (preset) {
        style = { ...preset.style };
        customLogoDataUrl = preset.customLogoDataUrl;
        presetName = preset.name;
      }
    }
  });

  async function loadPrice(currency: FiatCurrency) {
    const ticker = selectedNetwork.ticker;
    loadedPriceKey = `${currency}:${ticker}`;
    try {
      const response = await fetch(`/api/markets?currency=${currency}`);
      const result = await response.json();
      const row = result.data?.find((asset: { symbol: string }) => asset.symbol === ticker);
      price = row?.price;
    } catch {
      price = undefined;
    }
  }

  async function pasteAddress() {
    if (!navigator.clipboard) return;
    address = await navigator.clipboard.readText();
  }

  async function pasteCustomPayload() {
    if (!navigator.clipboard) return;
    customPayload = await navigator.clipboard.readText();
  }

  async function copyAddress() {
    if (!address || !navigator.clipboard) return;
    await navigator.clipboard.writeText(address);
    copied = true;
    setTimeout(() => (copied = false), 1400);
  }

  async function copyCustomPayload() {
    if (!customPayload || !navigator.clipboard) return;
    await navigator.clipboard.writeText(customPayload);
    copied = true;
    setTimeout(() => (copied = false), 1400);
  }

  function persistAddress() {
    if (mode !== 'guided' || validation.status !== 'valid') return;
    saveAddress({
      label: label.trim() || `${selectedNetwork.ticker} address`,
      network: effectiveNetwork,
      address: address.trim()
    });
    savedMessage = 'Saved locally in this browser.';
    setTimeout(() => (savedMessage = ''), 1800);
  }

  function persistStylePreset() {
    saveStylePreset(presetName.trim() || style.presetName || 'Custom QR style', style, customLogoDataUrl);
    savedMessage = 'Style preset saved locally in this browser.';
    setTimeout(() => (savedMessage = ''), 1800);
  }

</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8">
    <p class="label mb-2">Local QR generator</p>
    <h1 class="text-3xl font-bold text-on-surface md:text-5xl">Generate crypto QR codes</h1>
    <p class="mt-3 max-w-3xl text-on-surface-variant">
      Build address-only or amount payment payloads for Monero, Bitcoin, Ethereum/EVM, Solana, Litecoin, USDC, and USDT. QR styling stays local.
      Switch to custom mode to design an arbitrary QR payload by hand.
    </p>
  </div>

  <div class="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
    <div class="grid gap-6">
      <section class="glass-panel rounded-card p-5 md:p-6">
        <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-xl font-semibold">Payment details</h2>
            <p class="text-sm text-on-surface-variant">
              Automatic mode detects XMR, BTC, ETH/EVM, LTC, or SOL from the address format. Select USDC or USDT manually for ERC-20 token payment URIs.
            </p>
          </div>
          <StatusBadge status={activeValidation.status} label={activeValidation.status === 'valid' ? 'Valid' : activeValidation.status} />
        </div>

        <div class="grid gap-5">
          <div class="grid grid-cols-2 rounded-lg border border-outline-variant bg-surface-low p-1">
            <button
              type="button"
              class={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                mode === 'guided' ? 'bg-primary-action text-white' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              on:click={() => (mode = 'guided')}
            >
              Guided
            </button>
            <button
              type="button"
              class={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                mode === 'custom' ? 'bg-primary-action text-white' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              on:click={() => (mode = 'custom')}
            >
              Custom payload
            </button>
          </div>

          {#if mode === 'guided'}
            <div>
              <label class="label mb-2 block" for="network">Network</label>
              <select id="network" class="field" bind:value={network}>
                <option value="automatic">Automatic from address</option>
                {#each networks as option}
                  <option value={option.id}>{option.name} ({option.ticker})</option>
                {/each}
              </select>
              {#if network === 'automatic' && detectedNetwork}
                <p class="mt-2 text-sm text-success">Detected {selectedNetwork.name} ({selectedNetwork.ticker}).</p>
              {/if}
            </div>

            <div>
              <div class="mb-2 flex items-center justify-between gap-3">
                <label class="label" for="address">Address</label>
                <span class="text-xs text-on-surface-variant">{validation.message}</span>
              </div>
              <div class="flex gap-2">
                <textarea
                  id="address"
                  class="field mono min-h-28"
                  placeholder={selectedNetwork.placeholder}
                  bind:value={address}
                ></textarea>
                <div class="flex flex-col gap-2">
                  <button class="icon-button" type="button" title="Paste address" on:click={pasteAddress}><Clipboard size={18} /></button>
                  <button class="icon-button" type="button" title="Copy address" on:click={copyAddress}><Copy size={18} /></button>
                </div>
              </div>
              {#if copied}
                <p class="mt-2 text-sm text-success">Address copied.</p>
              {/if}
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="label mb-2 block" for="amount">Optional amount</label>
                <input id="amount" class="field" inputmode="decimal" placeholder="0.00" bind:value={amount} />
              </div>
              <div>
                <label class="label mb-2 block" for="label">Local save label</label>
                <input id="label" class="field" placeholder={`${selectedNetwork.ticker} treasury`} bind:value={label} />
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-outline-variant bg-surface-low p-4">
              <div>
                <p class="text-sm text-on-surface-variant">Fiat estimate</p>
                <p class="text-lg font-semibold text-on-surface">{fiatEstimate}</p>
              </div>
              <button class="btn-primary" type="button" on:click={persistAddress} disabled={validation.status !== 'valid'}>
                <Save size={16} />
                Save address
              </button>
            </div>
          {:else}
            <div>
              <div class="mb-2 flex items-center justify-between gap-3">
                <label class="label" for="custom-payload">Payload</label>
                <span class="text-xs text-on-surface-variant">{customPayloadValidation.message}</span>
              </div>
              <div class="flex gap-2">
                <textarea
                  id="custom-payload"
                  class="field mono min-h-40"
                  placeholder="bitcoin:bc1q...?amount=0.01 or any text, URL, JSON, or payment URI"
                  bind:value={customPayload}
                ></textarea>
                <div class="flex flex-col gap-2">
                  <button class="icon-button" type="button" title="Paste payload" on:click={pasteCustomPayload}><Clipboard size={18} /></button>
                  <button class="icon-button" type="button" title="Copy payload" on:click={copyCustomPayload}><Copy size={18} /></button>
                </div>
              </div>
              <p class="mt-3 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">
                Custom mode does not validate addresses or amounts. The QR code encodes exactly the payload you provide.
              </p>
              {#if copied}
                <p class="mt-2 text-sm text-success">Payload copied.</p>
              {/if}
            </div>
          {/if}
          {#if savedMessage}
            <p class="text-sm text-success">{savedMessage}</p>
          {/if}
        </div>
      </section>

      <StyleEditor bind:style bind:customLogoDataUrl />

      <section class="glass-panel rounded-card p-5 md:p-6">
        <h2 class="text-xl font-semibold">Save current style</h2>
        <p class="mt-2 text-sm text-on-surface-variant">
          Custom logos are stored as browser-local data URLs only when you save a style preset.
        </p>
        <div class="mt-4 flex flex-col gap-3 sm:flex-row">
          <input class="field" placeholder="Preset name" bind:value={presetName} />
          <button class="btn-primary sm:w-52" type="button" on:click={persistStylePreset}>Save preset</button>
        </div>
      </section>
    </div>

    <QrPreview {payload} {style} {customLogoDataUrl} />
  </div>
</main>
