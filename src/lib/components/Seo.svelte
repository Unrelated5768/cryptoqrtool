<script lang="ts">
  import { page } from '$app/stores';
  import { routeMeta, organizationJsonLd } from '$lib/seo';

  $: meta = ($page.data.meta ?? routeMeta($page.url.pathname)) as {
    title: string;
    description: string;
    canonical?: string;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  };
  $: jsonLd = meta.jsonLd ?? organizationJsonLd;
  $: jsonItems = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.canonical ?? $page.url.href} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={meta.canonical ?? $page.url.href} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  {#each jsonItems as item}
    <script type="application/ld+json">{JSON.stringify(item)}</script>
  {/each}
</svelte:head>
