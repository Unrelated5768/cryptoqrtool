<script lang="ts">
  import { browser } from '$app/environment';
  import { Download, Share2 } from 'lucide-svelte';
  import { trackEvent, type AnalyticsProperties } from '$lib/analytics';
  import type { QrStyle } from '$lib/qrStyle';
  import { getContrastWarning, logoDataUrl } from '$lib/qrStyle';
  import { productName } from '$lib/seo';

  export let payload = '';
  export let style: QrStyle;
  export let customLogoDataUrl: string | undefined = undefined;
  export let analyticsContext: AnalyticsProperties = {};

  let host: HTMLDivElement;
  let qr: import('qr-code-styling').default | undefined;
  let copied = false;
  $: warning = getContrastWarning(style);

  $: if (browser && host && payload && style) {
    renderQr(payload, style, customLogoDataUrl);
  }

  async function renderQr(currentPayload = payload, currentStyle = style, currentCustomLogoDataUrl = customLogoDataUrl) {
    const { default: QRCodeStyling } = await import('qr-code-styling');
    const image = logoDataUrl(currentStyle.logo, currentCustomLogoDataUrl, currentStyle.logoVariant);
    const options = {
      width: 320,
      height: 320,
      type: 'svg' as const,
      data: currentPayload,
      image,
      margin: Math.max(8, currentStyle.margin),
      qrOptions: {
        errorCorrectionLevel: image ? ('H' as const) : ('Q' as const)
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: currentStyle.logoSize,
        margin: 6
      },
      dotsOptions: {
        type: currentStyle.dots === 'extra-rounded' ? 'extra-rounded' : currentStyle.dots,
        color: currentStyle.foreground,
        gradient:
          currentStyle.colorMode === 'gradient'
            ? {
                type: 'linear' as const,
                rotation: 0.75,
                colorStops: [
                  { offset: 0, color: currentStyle.foreground },
                  { offset: 1, color: currentStyle.foregroundEnd }
                ]
              }
            : undefined
      },
      cornersSquareOptions: {
        type: currentStyle.cornersSquare,
        color: currentStyle.foreground
      },
      cornersDotOptions: {
        type: currentStyle.cornersDot,
        color: currentStyle.foreground
      },
      backgroundOptions: {
        color: currentStyle.background
      }
    };

    if (!qr) {
      qr = new QRCodeStyling(options as ConstructorParameters<typeof QRCodeStyling>[0]);
      host.innerHTML = '';
      qr.append(host);
    } else {
      qr.update(options as ConstructorParameters<typeof QRCodeStyling>[0]);
    }
  }

  async function download(extension: 'png' | 'svg') {
    await renderQr();
    await qr?.download({ name: `crypto-qr-${Date.now()}`, extension });
    trackEvent('qr_downloaded', { ...analyticsContext, format: extension });
  }

  async function copyPayload() {
    if (!payload || !navigator.clipboard) return;
    await navigator.clipboard.writeText(payload);
    copied = true;
    setTimeout(() => (copied = false), 1600);
    trackEvent('qr_payload_copied', analyticsContext);
  }

  async function sharePayload() {
    if (!navigator.share || !payload) return;
    await navigator.share({ title: `${productName} QR payload`, text: payload });
    trackEvent('qr_payload_shared', analyticsContext);
  }
</script>

<section class="glass-panel rounded-card p-5 md:p-6">
  <div class="mb-4 flex items-center justify-between gap-3">
    <div>
      <h2 class="text-xl font-semibold text-on-surface">QR preview</h2>
      <p class="text-sm text-on-surface-variant">High-contrast output with quiet-zone enforcement.</p>
    </div>
    {#if warning}
      <span data-testid="qr-scan-status" class="rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">Scan warning</span>
    {:else}
      <span data-testid="qr-scan-status" class="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-semibold text-success">Scan safe</span>
    {/if}
  </div>

  <div class="rounded-xl bg-white p-5 shadow-glow">
    {#if payload}
      <div bind:this={host} data-testid="qr-render-host" class="mx-auto flex min-h-[320px] items-center justify-center"></div>
    {:else}
      <div class="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-500">
        Enter a valid address to generate a QR code.
      </div>
    {/if}
  </div>

  {#if warning}
    <p class="mt-4 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">{warning}</p>
  {/if}

  <div class="mt-4 rounded-lg border border-outline-variant bg-surface-low p-3">
    <p class="label mb-2">Payload</p>
    <p class="mono break-all text-sm text-on-surface-variant" data-testid="qr-payload">{payload || 'No payload yet'}</p>
  </div>

  <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
    <button class="btn-secondary" on:click={() => download('png')} disabled={!payload}>
      <Download size={16} /> PNG
    </button>
    <button class="btn-secondary" on:click={() => download('svg')} disabled={!payload}>
      <Download size={16} /> SVG
    </button>
    <button class="btn-secondary" data-testid="copy-payload" on:click={copyPayload} disabled={!payload}>{copied ? 'Copied' : 'Copy'}</button>
    <button class="btn-secondary" on:click={sharePayload} disabled={!payload || !browser || !navigator.share}>
      <Share2 size={16} /> Share
    </button>
  </div>
</section>
