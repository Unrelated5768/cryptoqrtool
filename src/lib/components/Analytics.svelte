<script lang="ts">
  import { env } from '$env/dynamic/public';

  const websiteId = env.PUBLIC_UMAMI_WEBSITE_ID || 'f71ad2c5-3431-4744-8cd7-84474eb23793';
  const scriptUrl = env.PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';
  const domains = env.PUBLIC_UMAMI_DOMAINS;
</script>

<svelte:head>
  {#if websiteId && scriptUrl}
    <script
      defer
      src={scriptUrl}
      data-website-id={websiteId}
      data-domains={domains || undefined}
      data-do-not-track="true"
      data-exclude-search="true"
    ></script>
  {/if}
</svelte:head>
