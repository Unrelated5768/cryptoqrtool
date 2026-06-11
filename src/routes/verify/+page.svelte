<script lang="ts">
  import { Clipboard, ExternalLink, Search, ShieldAlert } from 'lucide-svelte';
  import StatusBadge from '$components/StatusBadge.svelte';
  import { getNetwork, networks, type NetworkId, type ValidationStatus } from '$lib/networks';
  import type { ExplorerLink, LookupState, VerificationInputType, VerificationNetwork } from '$lib/verification';

  type Lookup = {
    state: LookupState;
    source: string;
    summary: string;
    details?: Record<string, string | number | boolean | null>;
  };

  type VerifyResult = {
    state: LookupState;
    inputType: VerificationInputType;
    network: NetworkId | null;
    validation: { status: ValidationStatus; message: string };
    normalized: string;
    lookup: Lookup;
    explorerLinks: ExplorerLink[];
    updatedAt: string;
    message: string;
  };

  export let data: {
    q: string;
    network: VerificationNetwork;
    result: VerifyResult | null;
  };

  let q = data.q;
  let network: VerificationNetwork = isVerificationNetwork(data.network) ? data.network : 'automatic';
  let result: VerifyResult | null = data.result;
  let loading = false;
  let errorMessage = '';

  $: selectedNetworkName = network === 'automatic' ? 'Automatic detection' : getNetwork(network).name;
  $: detectedNetworkName = result?.network ? getNetwork(result.network).name : 'Unknown';
  $: detailRows = result?.lookup.details ? Object.entries(result.lookup.details) : [];

  async function verify() {
    const value = q.trim();
    errorMessage = '';
    result = null;

    if (!value) {
      errorMessage = 'Paste an address, transaction hash, Lightning invoice, or payment URI.';
      return;
    }

    loading = true;
    try {
      const response = await fetch(`/api/verify?network=${encodeURIComponent(network)}&q=${encodeURIComponent(value)}`);
      result = (await response.json()) as VerifyResult;
      const params = new URLSearchParams({ q: value, network });
      history.replaceState(null, '', `/verify?${params.toString()}`);
    } catch {
      errorMessage = 'Verification is unavailable right now. Try again or use a trusted explorer directly.';
    } finally {
      loading = false;
    }
  }

  async function pasteInput() {
    if (!navigator.clipboard) return;
    q = await navigator.clipboard.readText();
  }

  function isVerificationNetwork(value: string): value is VerificationNetwork {
    return value === 'automatic' || networks.some((option) => option.id === value);
  }
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <p class="label mb-2">Address and transaction checker</p>
      <h1 class="text-3xl font-bold text-on-surface md:text-5xl">Verify crypto QR payloads</h1>
      <p class="mt-3 max-w-3xl text-on-surface-variant">
        Check pasted crypto addresses, transaction hashes, Lightning invoices, and payment URIs before using or sharing a QR code.
      </p>
    </div>
    <StatusBadge status={result?.validation.status ?? 'warning'} label={result?.validation.status ?? 'Ready'} />
  </div>

  <div class="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
    <section class="glass-panel rounded-card p-5 md:p-6">
      <form class="grid gap-5" on:submit|preventDefault={verify}>
        <div>
          <label class="label mb-2 block" for="verify-network">Network</label>
          <select id="verify-network" class="field" bind:value={network} data-testid="verify-network">
            <option value="automatic">Automatic detection</option>
            {#each networks as option}
              <option value={option.id}>{option.name} ({option.ticker})</option>
            {/each}
          </select>
          <p class="mt-2 text-sm text-on-surface-variant">Selected: {selectedNetworkName}</p>
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between gap-3">
            <label class="label" for="verify-input">Payload</label>
            <span class="text-xs text-on-surface-variant">No seed phrases. No private keys.</span>
          </div>
          <div class="flex gap-2">
            <textarea
              id="verify-input"
              class="field mono min-h-40"
              data-testid="verify-input"
              placeholder="bc1q..., 0x transaction hash, lnbc1..., bitcoin:bc1q...?amount=0.01"
              bind:value={q}
            ></textarea>
            <button class="icon-button shrink-0" type="button" title="Paste payload" on:click={pasteInput}>
              <Clipboard size={18} />
            </button>
          </div>
        </div>

        {#if errorMessage}
          <p class="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">{errorMessage}</p>
        {/if}

        <button class="btn-primary w-full sm:w-auto" type="submit" data-testid="verify-submit" disabled={loading}>
          <Search size={17} />
          {loading ? 'Checking...' : 'Verify payload'}
        </button>
      </form>
    </section>

    <section class="surface-panel rounded-card p-5 md:p-6">
      <div class="flex items-start gap-3">
        <ShieldAlert class="mt-1 text-warning" size={22} />
        <div>
          <h2 class="text-xl font-semibold text-on-surface">Security note</h2>
          <p class="mt-2 text-sm leading-6 text-on-surface-variant">
            Public wallet addresses, transaction hashes, and payment request text are safe to inspect. Never paste seed phrases,
            private keys, recovery codes, or exchange login credentials into any checker.
          </p>
        </div>
      </div>
    </section>
  </div>

  {#if result}
    <section class="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <article class="glass-panel rounded-card p-5 md:p-6" data-testid="verify-result">
        <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="label mb-2">Local validation</p>
            <h2 class="text-2xl font-semibold text-on-surface">{detectedNetworkName}</h2>
          </div>
          <StatusBadge status={result.validation.status} label={result.validation.status} />
        </div>

        <div class="grid gap-3 text-sm">
          <div class="rounded-lg border border-outline-variant bg-surface-low p-4">
            <p class="text-on-surface-variant">Detected type</p>
            <p class="mt-1 font-semibold capitalize text-on-surface">{result.inputType.replace('-', ' ')}</p>
          </div>
          <div class="rounded-lg border border-outline-variant bg-surface-low p-4">
            <p class="text-on-surface-variant">Normalized value</p>
            <p class="mono mt-1 break-all text-on-surface">{result.normalized || 'Unavailable'}</p>
          </div>
          <div class="rounded-lg border border-outline-variant bg-surface-low p-4">
            <p class="text-on-surface-variant">Validation message</p>
            <p class="mt-1 text-on-surface">{result.validation.message}</p>
          </div>
        </div>
      </article>

      <article class="glass-panel rounded-card p-5 md:p-6">
        <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="label mb-2">Live lookup</p>
            <h2 class="text-2xl font-semibold text-on-surface">{result.lookup.source}</h2>
          </div>
          <StatusBadge status={result.lookup.state} label={result.lookup.state} />
        </div>

        <p class="text-sm leading-6 text-on-surface-variant">{result.lookup.summary}</p>

        {#if detailRows.length}
          <div class="mt-5 grid gap-2">
            {#each detailRows as [key, value]}
              <div class="flex items-center justify-between gap-4 rounded-lg border border-outline-variant bg-surface-low px-3 py-2 text-sm">
                <span class="text-on-surface-variant">{key}</span>
                <span class="mono break-all text-right text-on-surface">{String(value ?? 'n/a')}</span>
              </div>
            {/each}
          </div>
        {/if}

        {#if result.explorerLinks.length}
          <div class="mt-6">
            <p class="label mb-3">Explorer links</p>
            <div class="flex flex-wrap gap-3">
              {#each result.explorerLinks as link}
                <a class="btn-secondary" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ExternalLink size={16} />
                </a>
              {/each}
            </div>
          </div>
        {/if}
      </article>
    </section>
  {/if}
</main>
