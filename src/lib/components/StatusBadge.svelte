<script lang="ts">
  import type { ValidationStatus } from '$lib/networks';

  export let status: ValidationStatus | 'fresh' | 'stale' | 'unavailable' | 'rate-limited' = 'warning';
  export let label: string;

  $: classes = {
    valid: 'border-success/30 bg-success/10 text-success',
    fresh: 'border-success/30 bg-success/10 text-success',
    warning: 'border-warning/30 bg-warning/10 text-warning',
    stale: 'border-warning/30 bg-warning/10 text-warning',
    invalid: 'border-error/30 bg-error/10 text-error',
    unavailable: 'border-error/30 bg-error/10 text-error',
    'rate-limited': 'border-error/30 bg-error/10 text-error',
    unsupported: 'border-outline-variant bg-surface-high text-on-surface-variant'
  }[status];
</script>

<span class={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] ${classes}`}>
  {label}
</span>
