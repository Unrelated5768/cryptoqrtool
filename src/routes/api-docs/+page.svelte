<script lang="ts">
  import { page } from '$app/stores';
  import { Code2, FileJson, QrCode } from 'lucide-svelte';
  import { tr } from '$lib/i18n/phrases';
  import { parseLocalePath } from '$lib/i18n/routing';
  import { networks, tokenChains } from '$lib/networks';
  import { siteUrl } from '$lib/seo';

  const origin = siteUrl;
  const getExample = `${origin}/api/qr?network=bitcoin&address=bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080&amount=0.1&logo=btc`;
  const postExample = `curl -X POST ${origin}/api/qr \\
  -H 'content-type: application/json' \\
  -d '{
    "network": "bitcoin",
    "address": "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080",
    "amount": "0.1",
    "format": "json",
    "style": {
      "logo": "btc",
      "logoVariant": "color",
      "foreground": "#050816",
      "background": "#ffffff"
    }
  }'`;
  const customExample = `curl -X POST ${origin}/api/qr \\
  -H 'content-type: application/json' \\
  -d '{"mode":"custom","payload":"bitcoin:bc1q...?amount=0.1"}' \\
  --output qr.svg`;

  $: activeLocale = parseLocalePath($page.url.pathname).locale;
  $: t = (phrase: string) => tr(activeLocale, phrase);
</script>

<main class="mx-auto max-w-6xl px-5 py-10 md:px-8">
  <div class="mb-8">
    <p class="label mb-2">{t('Developer API')}</p>
    <h1 class="text-3xl font-bold text-on-surface md:text-5xl">{t('QR code generation API')}</h1>
    <p class="mt-3 max-w-3xl text-on-surface-variant">
      {t('Generate the same wallet-compatible crypto QR payloads from server-side requests. The API returns SVG by default, supports guided network validation, custom payloads, scan-safe colors, quiet-zone sizing, and local catalog logos.')}
    </p>
  </div>

  <div class="grid gap-6">
    <section class="glass-panel rounded-card p-5 md:p-6">
      <div class="mb-4 flex items-center gap-3">
        <QrCode class="text-primary" size={22} />
        <h2 class="text-xl font-semibold">{t('Endpoint')}</h2>
      </div>
      <div class="grid gap-3 md:grid-cols-2">
        <div class="rounded-lg border border-outline-variant bg-surface-low p-4">
          <p class="label mb-2">GET</p>
          <code class="mono break-all text-sm text-on-surface">/api/qr?network=bitcoin&address=...&amount=0.1</code>
        </div>
        <div class="rounded-lg border border-outline-variant bg-surface-low p-4">
          <p class="label mb-2">POST</p>
          <code class="mono break-all text-sm text-on-surface">/api/qr</code>
          <p class="mt-2 text-sm text-on-surface-variant">{t('Send JSON for larger payloads or nested style options.')}</p>
        </div>
      </div>
    </section>

    <section class="glass-panel rounded-card p-5 md:p-6">
      <div class="mb-4 flex items-center gap-3">
        <Code2 class="text-primary" size={22} />
        <h2 class="text-xl font-semibold">{t('Examples')}</h2>
      </div>
      <div class="grid gap-4">
        <div>
          <p class="label mb-2">{t('Direct SVG URL')}</p>
          <pre class="mono overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">{getExample}</pre>
        </div>
        <div>
          <p class="label mb-2">{t('POST JSON response')}</p>
          <pre class="mono overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">{postExample}</pre>
        </div>
        <div>
          <p class="label mb-2">{t('Custom payload SVG')}</p>
          <pre class="mono overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">{customExample}</pre>
        </div>
      </div>
    </section>

    <section class="glass-panel rounded-card p-5 md:p-6">
      <div class="mb-4 flex items-center gap-3">
        <FileJson class="text-primary" size={22} />
        <h2 class="text-xl font-semibold">{t('Request Fields')}</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[680px] text-left text-sm">
          <thead class="border-b border-outline-variant text-on-surface">
            <tr>
              <th class="py-3 pr-4 font-semibold">{t('Field')}</th>
              <th class="py-3 pr-4 font-semibold">{t('Type')}</th>
              <th class="py-3 pr-4 font-semibold">{t('Notes')}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant text-on-surface-variant">
            <tr>
              <td class="py-3 pr-4 mono">mode</td>
              <td class="py-3 pr-4">guided | custom</td>
              <td class="py-3 pr-4">{t('Defaults to guided unless payload is provided.')}</td>
            </tr>
            <tr>
              <td class="py-3 pr-4 mono">network</td>
              <td class="py-3 pr-4">network id | automatic</td>
              <td class="py-3 pr-4">{t('Automatic detection supports the same address formats as the generator.')}</td>
            </tr>
            <tr>
              <td class="py-3 pr-4 mono">address</td>
              <td class="py-3 pr-4">string</td>
              <td class="py-3 pr-4">{t('Validated for guided payment networks.')}</td>
            </tr>
            <tr>
              <td class="py-3 pr-4 mono">amount</td>
              <td class="py-3 pr-4">string</td>
              <td class="py-3 pr-4">{t('Optional positive decimal amount. Invalid amounts are ignored.')}</td>
            </tr>
            <tr>
              <td class="py-3 pr-4 mono">payload</td>
              <td class="py-3 pr-4">string</td>
              <td class="py-3 pr-4">{t('Required for custom mode. Limited to 4096 characters.')}</td>
            </tr>
            <tr>
              <td class="py-3 pr-4 mono">format</td>
              <td class="py-3 pr-4">svg | json</td>
              <td class="py-3 pr-4">{t('SVG is returned as image/svg+xml. JSON includes payload, network, validation, and svg.')}</td>
            </tr>
            <tr>
              <td class="py-3 pr-4 mono">style</td>
              <td class="py-3 pr-4">object</td>
              <td class="py-3 pr-4">{t('Supports foreground, background, margin, logo, logoVariant, and logoSize.')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="grid gap-6 md:grid-cols-2">
      <div class="glass-panel rounded-card p-5 md:p-6">
        <h2 class="text-xl font-semibold">{t('Supported Networks')}</h2>
        <div class="mt-4 flex flex-wrap gap-2">
          {#each networks as network}
            <span class="rounded-lg border border-outline-variant bg-surface-low px-3 py-2 text-sm text-on-surface">
              <span class="mono">{network.id}</span> ({network.ticker})
            </span>
          {/each}
        </div>
      </div>
      <div class="glass-panel rounded-card p-5 md:p-6">
        <h2 class="text-xl font-semibold">{t('Token Chains')}</h2>
        <div class="mt-4 flex flex-wrap gap-2">
          {#each tokenChains as chain}
            <span class="rounded-lg border border-outline-variant bg-surface-low px-3 py-2 text-sm text-on-surface">
              <span class="mono">{chain.id}</span>
            </span>
          {/each}
        </div>
      </div>
    </section>

    <section class="glass-panel rounded-card p-5 md:p-6">
      <h2 class="text-xl font-semibold">{t('Responses And Errors')}</h2>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-outline-variant bg-surface-low p-4">
          <p class="label mb-2">{t('Success')}</p>
          <p class="text-sm text-on-surface-variant">
            <span class="mono">200 image/svg+xml</span> {t('for SVG requests, or')} <span class="mono">200 application/json</span>
            {t('when')} <span class="mono">format=json</span>.
          </p>
        </div>
        <div class="rounded-lg border border-outline-variant bg-surface-low p-4">
          <p class="label mb-2">{t('Errors')}</p>
          <p class="text-sm text-on-surface-variant">
            {t('Invalid addresses, unknown automatic networks, malformed JSON, or empty custom payloads return JSON errors with')}
            <span class="mono">4xx</span> {t('status')}.
          </p>
        </div>
      </div>
    </section>
  </div>
</main>
