<script lang="ts">
  import { CircleHelp, ShieldCheck } from 'lucide-svelte';
  import { faqPageItems, productName } from '$lib/seo';
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8">
    <p class="label mb-2">Help</p>
    <h1 class="text-3xl font-bold text-on-surface md:min-h-24 md:text-5xl">Crypto QR Code FAQ</h1>
    <p class="mt-3 max-w-3xl text-on-surface-variant">
      Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility,
      and the checks to make before sharing or scanning a payment request.
    </p>
  </div>

  <section class="grid gap-4 md:grid-cols-2">
    {#each faqPageItems as item}
      <article class="surface-panel rounded-card p-6">
        <CircleHelp class="mb-5 text-primary" size={28} />
        <h2 class="text-xl font-semibold text-on-surface">{item.question}</h2>
        <p class="mt-3 leading-7 text-on-surface-variant">{item.answer}</p>
      </article>
    {/each}
  </section>

  <section class="mt-8">
    <div class="surface-panel rounded-card p-6">
      <ShieldCheck class="mb-5 text-primary" size={30} />
      <h2 class="text-2xl font-semibold text-on-surface">Still verify in your wallet</h2>
      <p class="mt-3 max-w-4xl leading-7 text-on-surface-variant">
        {productName} helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain,
        token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.
      </p>
    </div>
  </section>
</main>
