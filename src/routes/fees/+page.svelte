<script lang="ts">
  import StatusBadge from '$components/StatusBadge.svelte';

  export let data: {
    result: {
      state: 'fresh' | 'stale' | 'unavailable' | 'rate-limited';
      data: Array<{ network: string; ticker: string; status: 'fresh' | 'stale' | 'unavailable' | 'rate-limited'; priority: string; standard: string; economy: string; source: string }>;
      updatedAt: string;
    };
  };
</script>

<main class="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <p class="label mb-2">Live fee comparison</p>
      <h1 class="text-3xl font-bold text-on-surface md:text-5xl">Network fees</h1>
      <p class="mt-3 max-w-3xl text-on-surface-variant">
        Fee modules show live, configured, stale, rate-limited, and unavailable states explicitly.
      </p>
    </div>
    <StatusBadge status={data.result.state} label={data.result.state} />
  </div>

  <section class="glass-panel overflow-hidden rounded-card">
    <div class="grid gap-px bg-outline-variant/50 md:grid-cols-5">
      <div class="bg-surface-container p-4 font-semibold">Network</div>
      <div class="bg-surface-container p-4 font-semibold">Priority</div>
      <div class="bg-surface-container p-4 font-semibold">Standard</div>
      <div class="bg-surface-container p-4 font-semibold">Economy</div>
      <div class="bg-surface-container p-4 font-semibold">Source</div>
      {#each data.result.data as row}
        <div class="bg-surface-low p-4">
          <p class="font-semibold">{row.network}</p>
          <StatusBadge status={row.status} label={row.status} />
        </div>
        <div class="bg-surface-low p-4">{row.priority}</div>
        <div class="bg-surface-low p-4">{row.standard}</div>
        <div class="bg-surface-low p-4">{row.economy}</div>
        <div class="bg-surface-low p-4 text-on-surface-variant">{row.source}</div>
      {/each}
    </div>
  </section>
</main>
