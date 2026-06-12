<script lang="ts">
  import { ArrowRight, DatabaseZap, Heart, QrCode, ShieldCheck, WifiOff } from 'lucide-svelte';
  import { coinLandingPages, homeFaqItems, productName, searchLandingPages } from '$lib/seo';

  const features = [
    {
      icon: ShieldCheck,
      title: '100% Client-Side Processing',
      body: 'Addresses, amounts, logos, and presets are generated in your browser. There is no account and no server-side address vault.'
    },
    {
      icon: DatabaseZap,
      title: 'Zero Data Collection',
      body: 'We do not collect your wallet addresses, uploaded logos, or saved presets. Your QR workflow stays on your device.'
    },
    {
      icon: WifiOff,
      title: 'Works Completely Offline',
      body: 'Core QR generation, styling, downloads, and saved presets keep working in the browser without a live connection.'
    }
  ];
</script>

<main>
  <section class="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-8">
    <div class="max-w-2xl">
      <div class="mb-5 inline-flex items-center gap-2 rounded border border-outline-variant bg-surface-high px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
        <DatabaseZap size={16} />
        Browser-local crypto QR utility
      </div>
      <h1 class="text-4xl font-bold leading-tight text-on-surface md:text-6xl">
        Crypto QR Code Generator
      </h1>
      <p class="mt-5 text-lg leading-8 text-on-surface-variant">
        Your data never leaves your browser. {productName} generates scannable payment QR codes for Monero, Bitcoin,
        Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses,
        uploaded logos, or saved presets to a server.
      </p>
      <div class="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
        <ShieldCheck size={16} />
        <span>Your data never leaves your browser</span>
      </div>
      <p class="mt-4 flex items-center gap-2 text-sm text-on-surface-variant">
        <Heart size={16} class="text-error" />
        <span>Made with love for privacy and zero data collection.</span>
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <a class="btn-primary" href="/generate">Open generator <ArrowRight size={18} /></a>
        <a class="btn-secondary" href="/security">Privacy model</a>
      </div>
    </div>

    <div class="glass-panel rounded-card p-6">
      <div class="rounded-xl bg-white p-6">
        <div class="grid aspect-square grid-cols-7 gap-1">
          {#each Array(49) as _, index}
            <div class={`rounded-[2px] ${[0, 1, 2, 7, 14, 8, 16, 6, 13, 42, 43, 44, 35, 28, 36, 48, 41, 47, 3, 10, 22, 24, 26, 30, 32, 38, 45].includes(index) ? 'bg-slate-950' : 'bg-slate-100'}`}></div>
          {/each}
        </div>
      </div>
      <div class="mt-5 grid gap-3">
        <div class="flex items-center justify-between rounded-lg border border-outline-variant bg-surface-low px-4 py-3">
          <span class="mono truncate text-sm text-on-surface-variant">monero:84Pq...tx_amount=1.25</span>
          <QrCode class="text-primary" size={20} />
        </div>
        <div class="grid grid-cols-4 gap-2 text-center text-xs font-bold text-on-surface-variant">
          <span class="rounded bg-monero/15 px-2 py-2 text-monero">XMR</span>
          <span class="rounded bg-bitcoin/15 px-2 py-2 text-bitcoin">BTC</span>
          <span class="rounded bg-ethereum/15 px-2 py-2 text-ethereum">ETH</span>
          <span class="rounded bg-solana/15 px-2 py-2 text-solana">SOL</span>
          <span class="rounded bg-surface-high px-2 py-2 text-primary">LTC</span>
          <span class="rounded bg-surface-high px-2 py-2 text-primary">USDC</span>
          <span class="rounded bg-surface-high px-2 py-2 text-primary">USDT</span>
        </div>
      </div>
    </div>
  </section>

  <section class="mx-auto grid max-w-7xl gap-5 px-5 pb-16 md:grid-cols-3 md:px-8">
    {#each features as feature}
      <article class="surface-panel rounded-card p-6">
        <feature.icon class="mb-5 text-primary" size={28} />
        <h2 class="text-xl font-semibold text-on-surface">{feature.title}</h2>
        <p class="mt-3 text-sm leading-6 text-on-surface-variant">{feature.body}</p>
      </article>
    {/each}
  </section>

  <section class="mx-auto max-w-7xl px-5 pb-16 md:px-8">
    <div class="surface-panel rounded-card p-6">
      <h2 class="text-2xl font-semibold text-on-surface">Crypto QR generators by coin</h2>
      <p class="mt-2 text-sm text-on-surface-variant">
        Dedicated pages for each supported wallet address format and payment payload.
      </p>
      <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {#each coinLandingPages as item}
          <a
            class="rounded-lg border border-outline-variant bg-surface-low px-4 py-3 text-sm font-semibold text-on-surface transition hover:border-primary/60 hover:text-primary"
            href={`/${item.slug}`}
          >
            {item.name} QR Code Generator
          </a>
        {/each}
      </div>
      <h3 class="mt-8 text-lg font-semibold text-on-surface">Popular crypto QR searches</h3>
      <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {#each searchLandingPages as item}
          <a
            class="rounded-lg border border-outline-variant bg-surface-low px-4 py-3 text-sm font-semibold text-on-surface transition hover:border-primary/60 hover:text-primary"
            href={`/${item.slug}`}
          >
            {item.headline}
          </a>
        {/each}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-5 pb-16 md:px-8">
    <div class="surface-panel rounded-card p-6">
      <h2 class="text-2xl font-semibold text-on-surface">Frequently asked questions</h2>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        {#each homeFaqItems as item}
          <article class="rounded-lg border border-outline-variant bg-surface-low p-5">
            <h3 class="text-lg font-semibold text-on-surface">{item.question}</h3>
            <p class="mt-3 text-sm leading-6 text-on-surface-variant">{item.answer}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>
</main>
