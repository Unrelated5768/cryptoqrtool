# CryptoGen Implementation Progress

This file tracks implementation against [the product spec](./cryptogen-product-spec.md). Update it as features land so the remaining scope stays visible.

## Status Legend
- `[ ]` Not started
- `[~]` In progress
- `[x]` Complete
- `[!]` Blocked or deferred with note

## Foundation
- [x] Scaffold SvelteKit + Svelte 5 + TypeScript app using Bun-compatible scripts.
- [x] Configure Tailwind CSS.
- [~] Add shadcn-svelte-compatible component primitives or local equivalents. Current UI uses local class primitives and lucide icons; full shadcn registry setup remains.
- [x] Install and integrate `qr-code-styling`.
- [x] Establish dark institutional design tokens: surfaces, glass panels, blue primary, green valid, amber warning, red error.
- [x] Add Geist and JetBrains Mono font loading/fallbacks.
- [x] Remove wallet connection, login, notification center, and security-log affordances from all UI/copy.

## Routes
- [x] `/` SEO landing page based on private utility hub sketch.
- [x] `/generate` QR generator and style editor.
- [x] `/saved` browser-local saved addresses and style presets.
- [x] `/markets` live market prices and converter.
- [x] `/fees` live network fee comparison.
- [x] `/exchanges` live exchange directory.
- [x] `/security` static trust/privacy page.

## Generator
- [x] Network support for Monero, Bitcoin, Ethereum/EVM, and Solana.
- [x] Monero first-class ordering and copy.
- [x] Address-only QR payloads for every network.
- [x] Amount URI payloads where supported.
- [x] Monero URI: `monero:<address>?tx_amount=<amount>`.
- [x] Bitcoin BIP21-style URI.
- [x] Ethereum/EVM payment URI convention.
- [x] Solana payment URL convention.
- [x] Network selector.
- [x] Address input with paste/copy controls.
- [x] Optional amount input with fiat estimate.
- [x] Validation badge states: valid, invalid, unsupported, warning.
- [x] QR preview with contrast checks.
- [x] Download PNG/SVG.
- [x] Copy payload.
- [x] Browser share support where available.
- [x] Save address to local storage.

## QR Styling
- [x] Style editor adjacent/responsive to preview.
- [x] Built-in crypto logos: XMR, BTC, ETH, SOL, none.
- [x] Custom logo upload for PNG/JPEG/SVG/WebP.
- [x] Dot style controls.
- [x] Corner square style controls.
- [x] Corner dot style controls.
- [x] Solid, gradient, and preset palette color modes.
- [x] Background color control.
- [x] QR margin/safe-zone control.
- [x] Bounded logo-size slider.
- [x] Built-in presets: Institutional Dark, Monero Orange, Bitcoin Gold, Ethereum Blue, Solana Neon, High Contrast Print, Minimal Black.
- [x] User preset save.
- [x] User preset rename.
- [x] User preset apply.
- [x] User preset delete.
- [x] Store custom logo data URLs only with saved presets.
- [~] File size and dimension validation for custom logos. File size/type validation is implemented; image dimension probing remains.
- [x] Scan reliability warnings for custom logos and low contrast.
- [x] High error correction when logo is embedded.
- [x] Minimum quiet zone enforcement.

## Local Storage
- [x] Versioned app storage key.
- [x] Saved address schema: `id`, `label`, `network`, `address`, `createdAt`, `updatedAt`.
- [x] Saved style preset schema: `id`, `name`, `style`, `customLogoDataUrl`, `createdAt`, `updatedAt`.
- [x] Address add/edit label/copy/generate/delete flows.
- [x] Style preset apply/edit/delete flows.
- [x] Network filtering.
- [x] Privacy copy for browser-only storage.
- [x] Local storage migration tests.

## Live Data
- [~] CoinGecko market price adapter for BTC, ETH, SOL, XMR, and fiat currencies. USD implemented; additional fiat selector remains.
- [x] Server-side caching where possible.
- [x] Market loading, stale, unavailable, and rate-limit states.
- [x] Bitcoin fee adapter using mempool.space.
- [x] Ethereum fee adapter using Etherscan Gas Oracle and `ETHERSCAN_API_KEY`.
- [x] Solana basic fee adapter.
- [x] Monero fee unavailable/configured-source state.
- [x] Fee loading, stale, unavailable, and rate-limit states.
- [x] CoinGecko exchange directory adapter.
- [~] XMR exchange support/filtering where data allows. UI exposes unavailable state because the current exchange list endpoint lacks asset-pair support.
- [x] Exchange loading, stale, unavailable, and rate-limit states.

## SEO
- [x] Route-specific titles and meta descriptions.
- [x] Canonical URLs.
- [x] Open Graph tags.
- [x] Twitter card metadata.
- [x] `WebApplication` JSON-LD for generator.
- [x] `Organization` JSON-LD for CryptoGen.
- [x] FAQ JSON-LD on landing/security pages if FAQ content is added.
- [x] `sitemap.xml`.
- [x] `robots.txt`.
- [~] Prerender/server-render public pages where appropriate. SSR is enabled; static prerender tuning remains.

## Tests And Verification
- [x] Unit tests for QR payload builders.
- [x] Unit tests for Monero standard/subaddress/integrated address validation and invalid states.
- [x] Unit tests for style serialization.
- [x] Unit tests for preset storage.
- [x] Unit tests for custom logo validation.
- [x] Unit tests for contrast warnings.
- [ ] Component tests for generator form.
- [ ] Component tests for QR preview and style editor.
- [ ] Component tests for logo selection and upload.
- [ ] Component tests for preset save/apply/delete.
- [ ] Component tests for copy/download/share/save-address behavior.
- [~] Integration tests for live adapters: success, failure, stale, rate-limit. Basic adapter success/cache tests implemented; full matrix remains.
- [ ] Lighthouse SEO/accessibility/performance/best-practices checks.
- [ ] Manual mobile and desktop layout verification against `design/` sketches.

## Notes
- 2026-06-10: Product spec and progress tracker created before implementation.
- 2026-06-10: Implemented SvelteKit app foundation, all requested routes, generator, QR styling, browser-local storage, live API adapters, SEO endpoints, and focused unit tests. `bun run check`, `bun run test`, and `bun run build` pass.
- 2026-06-10: Added Litecoin plus ERC-20 USDC/USDT support. Automatic mode detects address families; USDC/USDT are selected manually because their recipient addresses are indistinguishable from ETH/EVM addresses.
- 2026-06-10: Expanded CoinGecko market module to the top 50 assets by market cap and surfaced crypto logo images in market rows and the converter.
- 2026-06-10: Added generator custom payload mode. Guided mode keeps validation and saved-address behavior; custom mode encodes exactly the user-provided payload.
- 2026-06-10: Added CoinGecko top-50 logo picker to the QR style editor so generator users can embed market asset logos in QR codes.
