# Testing Strategy

CryptoQR uses a tiered test suite so regular feedback stays fast while release checks still cover browser and publishing risks.

## Fast CI Suite

Run this before opening a PR or publishing a small change:

```bash
bun run test:ci
```

This runs:

- `bun run check` for Svelte and TypeScript diagnostics.
- `bun run test` for Vitest unit and component coverage.
- `bun run build` for a production SvelteKit build.
- `bun run test:e2e:smoke` for Chromium desktop and mobile smoke flows.

The target runtime is under two minutes in CI. The current local runtime is roughly 30 seconds after dependencies and browsers are installed.

## Focused Local Commands

Use narrower commands while developing:

```bash
bun run test:unit
bun run test:component
bun run test:e2e:smoke
```

The E2E suite expects a fresh production build. `bun run test:ci` handles this automatically.

## Release Checks

Before publishing a production release, run:

```bash
bun run test:release
```

This runs the fast CI suite and then Lighthouse CI against `/`, `/generate`, `/markets`, `/fees`, `/exchanges`, and `/security`.

Manual checks before release:

- Scan a generated QR code on a real phone.
- Verify custom styles still scan when warnings are absent.
- Confirm saved addresses, presets, and uploaded logos remain browser-local.
- Check the main pages at mobile and desktop widths.
- Confirm live-data unavailable/rate-limited states are acceptable.
