<script lang="ts">
  import { FileLock2, HardDrive, ShieldCheck, WifiOff } from 'lucide-svelte';
  import { productName } from '$lib/seo';

  const items = [
    {
      icon: WifiOff,
      title: 'Generation is client-side',
      body: 'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.'
    },
    {
      icon: HardDrive,
      title: 'Local storage only',
      body: 'Saved addresses and user-defined style presets use a versioned local storage key and can be deleted by the user.'
    },
    {
      icon: FileLock2,
      title: 'Custom logo handling',
      body: 'Uploaded logos are accepted as PNG, JPEG, SVG, or WebP, size-limited, and stored only when saved into a preset.'
    },
    {
      icon: ShieldCheck,
      title: 'Scannability checks',
      body: 'Contrast, quiet zone, logo size, and error-correction settings prioritize reliable scanning over decoration.'
    }
  ];
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8">
    <p class="label mb-2">Trust and privacy</p>
    <h1 class="text-3xl font-bold text-on-surface md:min-h-24 md:text-5xl">No account, no wallet connection, no server vault</h1>
    <p class="mt-3 max-w-3xl text-on-surface-variant">
      {productName} is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses,
      saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.
    </p>
  </div>

  <section class="grid gap-5 md:grid-cols-2">
    {#each items as item}
      <article class="surface-panel rounded-card p-6">
        <svelte:component this={item.icon} class="mb-5 text-primary" size={30} />
        <h2 class="text-xl font-semibold text-on-surface">{item.title}</h2>
        <p class="mt-3 leading-7 text-on-surface-variant">{item.body}</p>
      </article>
    {/each}
  </section>
</main>
