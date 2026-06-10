<script lang="ts">
  import '../app.css';
  import AppShell from '$components/AppShell.svelte';
  import Seo from '$components/Seo.svelte';
</script>

<Seo />
<AppShell>
  <slot />
</AppShell>
