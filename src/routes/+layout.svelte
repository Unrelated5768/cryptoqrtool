<script lang="ts">
  import '../app.css';
  import Analytics from '$components/Analytics.svelte';
  import AppShell from '$components/AppShell.svelte';
  import Seo from '$components/Seo.svelte';
</script>

<Analytics />
<Seo />
<AppShell>
  <slot />
</AppShell>
