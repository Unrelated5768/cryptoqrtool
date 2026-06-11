<script lang="ts">
  import { env } from '$env/dynamic/public';

  const enabled = env.PUBLIC_UMAMI_ENABLED === 'true';
  const websiteId = env.PUBLIC_UMAMI_WEBSITE_ID;
  const scriptUrl = env.PUBLIC_UMAMI_SCRIPT_URL || 'https://analytics.cryptoqrtool.com/script.js';
  const domains = env.PUBLIC_UMAMI_DOMAINS;
</script>

<svelte:head>
  {#if enabled && websiteId && scriptUrl}
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
