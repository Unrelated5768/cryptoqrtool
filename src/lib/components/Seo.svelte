<script lang="ts">
  import { page } from '$app/stores';
  import { routeMeta, type JsonLd, type SeoMeta } from '$lib/seo';

  function serializeJsonLd(value: JsonLd) {
    return JSON.stringify(value).replace(/</g, '\\u003c').replace(/<\/script/gi, '<\\/script').replace(/-->/g, '--\\u003e');
  }

  $: meta = ($page.data.meta ?? routeMeta($page.url.pathname)) as SeoMeta;
  $: jsonItems = meta.jsonLd ?? [];
  $: jsonLdMarkup = jsonItems
    .map((item) => '<script type="application/ld+json">' + serializeJsonLd(item) + '</' + 'script>')
    .join('\n');
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  {#if meta.robots}
    <meta name="robots" content={meta.robots} />
  {/if}
  <link rel="canonical" href={meta.canonical} />
  {#each meta.alternates ?? [] as alternate}
    <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
  {/each}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="CryptoQR Tool" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={meta.canonical} />
  <meta property="og:image" content={meta.ogImage} />
  <meta property="og:image:alt" content={meta.ogImageAlt} />
  <meta property="og:image:width" content={String(meta.ogImageWidth)} />
  <meta property="og:image:height" content={String(meta.ogImageHeight)} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.twitterImage ?? meta.ogImage} />
  <meta name="twitter:image:alt" content={meta.ogImageAlt} />
  {@html jsonLdMarkup}
</svelte:head>
