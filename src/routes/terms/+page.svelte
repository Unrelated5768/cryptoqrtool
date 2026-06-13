<script lang="ts">
  import { AlertTriangle, BadgeCheck, FileText, Scale, ShieldCheck, WalletCards } from 'lucide-svelte';
  import { productName } from '$lib/seo';

  const termsSections = [
    {
      icon: ShieldCheck,
      title: 'Browser-local utility',
      body: `${productName} provides tools for creating and checking QR payloads in a browser. The app does not create wallets, custody funds, broker trades, or manage blockchain transactions.`
    },
    {
      icon: WalletCards,
      title: 'No wallet custody or account service',
      body: 'The service does not ask for seed phrases, private keys, exchange credentials, or wallet access. Do not enter secrets into the generator, verifier, or custom payload fields.'
    },
    {
      icon: BadgeCheck,
      title: 'User verification is required',
      body: 'You are responsible for checking every recipient address, chain, token, amount, invoice, memo, and QR payload before sharing it or sending funds.'
    },
    {
      icon: AlertTriangle,
      title: 'Crypto transactions are irreversible',
      body: 'Blockchain payments can be final and difficult or impossible to recover. Wallet behavior varies, and some wallets may ignore optional amount or token parameters.'
    }
  ];
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8">
    <p class="label mb-2">Legal</p>
    <h1 class="text-3xl font-bold text-on-surface md:min-h-24 md:text-5xl">Terms of Use</h1>
    <p class="mt-3 max-w-3xl text-on-surface-variant">
      These terms explain the permitted use and limits of {productName}. By using the site, you agree to use it as a self-directed
      crypto QR utility and to verify all payment details before acting on them.
    </p>
    <p class="mt-3 text-sm text-on-surface-variant">Last updated: June 13, 2026</p>
  </div>

  <section class="grid gap-5 md:grid-cols-2">
    {#each termsSections as section}
      <article class="surface-panel rounded-card p-6">
        <svelte:component this={section.icon} class="mb-5 text-primary" size={30} />
        <h2 class="text-xl font-semibold text-on-surface">{section.title}</h2>
        <p class="mt-3 leading-7 text-on-surface-variant">{section.body}</p>
      </article>
    {/each}
  </section>

  <section class="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
    <article class="surface-panel rounded-card p-6">
      <Scale class="mb-5 text-primary" size={30} />
      <h2 class="text-2xl font-semibold text-on-surface">No financial advice</h2>
      <p class="mt-3 leading-7 text-on-surface-variant">
        {productName} does not provide investment, tax, legal, trading, custody, accounting, or financial advice. Market, fee,
        exchange, and verification data are informational and may be delayed, incomplete, inaccurate, or unavailable.
      </p>
      <p class="mt-3 leading-7 text-on-surface-variant">
        You are responsible for your own decisions, wallet configuration, transaction review, and compliance obligations.
      </p>
    </article>

    <article class="surface-panel rounded-card p-6">
      <FileText class="mb-5 text-primary" size={30} />
      <h2 class="text-2xl font-semibold text-on-surface">Acceptable use</h2>
      <div class="mt-5 grid gap-3 text-sm leading-6 text-on-surface-variant">
        <p class="rounded-lg border border-outline-variant bg-surface-low p-4">Do not use the site to misrepresent payment destinations, impersonate another party, distribute malicious QR payloads, or facilitate fraud.</p>
        <p class="rounded-lg border border-outline-variant bg-surface-low p-4">Do not interfere with site availability, bypass rate limits, scrape aggressively, or abuse public API endpoints.</p>
        <p class="rounded-lg border border-outline-variant bg-surface-low p-4">Do not rely on generated QR codes as the only verification step for a transaction. Always confirm details in a trusted wallet or explorer.</p>
      </div>
    </article>
  </section>

  <section class="mt-8">
    <div class="surface-panel rounded-card p-6">
      <h2 class="text-2xl font-semibold text-on-surface">Availability and liability</h2>
      <p class="mt-3 max-w-4xl leading-7 text-on-surface-variant">
        The site is provided as-is and may change, pause, or stop without notice. To the fullest extent permitted by law,
        {productName} is not liable for lost funds, wrong-address payments, wallet incompatibility, network fees, failed scans,
        delayed data, third-party API behavior, or other losses from using generated or verified payloads.
      </p>
    </div>
  </section>
</main>
