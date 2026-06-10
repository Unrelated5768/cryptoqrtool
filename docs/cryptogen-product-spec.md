# CryptoGen Product Spec

## Summary
Build **CryptoGen** as a SvelteKit app with a dark institutional interface based on the `design/` sketches. V1 includes a public SEO landing page, a focused crypto QR generator, browser-local saved addresses, first-class Monero support, live market/fee/exchange modules, and a customizable QR style system with presets, crypto logos, color palettes, and custom logo upload.

## Product Structure
- Use **SvelteKit + Svelte 5 + TypeScript + Bun**, matching the existing Nix dev environment.
- Use **Tailwind CSS + shadcn-svelte** for owned, customizable UI components.
- Use **qr-code-styling** for QR rendering because it supports styled dots, corners, colors, embedded images/logos, and PNG/SVG export.
- Adopt the sketch design system: dark surfaces, glass panels, Geist for UI text, JetBrains Mono for addresses, blue primary actions, green verification states, amber/error warnings.
- Remove all product mentions and UI affordances for wallet connection, login, notification center, and security logs.
- Routes:
  - `/`: SEO landing page based on the private utility hub sketch.
  - `/generate`: QR generator and QR style editor.
  - `/saved`: saved addresses and saved QR style presets stored in local browser storage.
  - `/markets`: live market prices and converter.
  - `/fees`: live network fee comparison.
  - `/exchanges`: live exchange directory.
  - `/security`: static trust/privacy explanation page.

## Core Generator
- Support v1 networks: **Monero, Bitcoin, Ethereum/EVM, and Solana**.
- Treat Monero as equal priority in UI ordering, SEO copy, validation, saved addresses, price display, and QR payload generation.
- QR payload behavior:
  - Generate **address-only QR** for every supported network.
  - Generate **address + amount payment URI** where supported.
  - Use Monero URI format: `monero:<address>?tx_amount=<amount>`.
  - Use Bitcoin BIP21-style URI.
  - Use Ethereum/EVM payment URI conventions.
  - Use Solana payment URL conventions.
- Generator UI:
  - Network selector with Monero visible in the first set of options.
  - Address input with paste/copy controls.
  - Optional amount input with fiat estimate.
  - Validation badge: valid, invalid, unsupported, or warning.
  - QR preview with scan-safe contrast checks.
  - Download PNG/SVG, copy payload, share where browser support exists.
  - Save address action storing label, network, and address in local storage only.

## QR Styling
- Add a QR style editor beside or below the generator preview.
- Built-in style controls:
  - Crypto logo in the center: XMR, BTC, ETH, SOL, or none.
  - Custom logo upload from the user's device.
  - Dot style: square, rounded, dots, classy, extra-rounded.
  - Corner square style: square, dot, extra-rounded.
  - Corner dot style: square or dot.
  - Color mode: solid foreground, gradient foreground, or preset palette.
  - Background color.
  - QR margin/safe zone.
  - Logo size with a bounded slider.
- Built-in preset styles:
  - Institutional Dark
  - Monero Orange
  - Bitcoin Gold
  - Ethereum Blue
  - Solana Neon
  - High Contrast Print
  - Minimal Black
- User-defined presets:
  - Save current QR styling as a named preset.
  - Edit preset name.
  - Apply preset.
  - Delete preset.
  - Store presets only in `localStorage`.
- Custom logo handling:
  - Accept PNG, JPEG, SVG, or WebP.
  - Store custom logos as browser-local data URLs only if the user saves a preset.
  - Limit file size and dimensions before storing.
  - Show a warning when a custom logo or low-contrast palette may reduce scan reliability.
- Default QR output must prioritize scannability over aesthetics:
  - Use high error correction when a logo is embedded.
  - Enforce a minimum quiet zone.
  - Warn or block unsafe foreground/background contrast combinations.

## Saved Addresses And Presets
- Store saved addresses in `localStorage` under a versioned app key.
- Saved address fields:
  - `id`
  - `label`
  - `network`
  - `address`
  - `createdAt`
  - `updatedAt`
- Saved style preset fields:
  - `id`
  - `name`
  - `style`
  - `customLogoDataUrl`
  - `createdAt`
  - `updatedAt`
- Support add, edit label/name, copy address, generate QR from saved address, apply style preset, filter by network, and delete.
- Include clear privacy copy that saved addresses, style presets, and custom logos never leave the browser unless the user exports or shares them.

## Live Data Modules
- Market prices:
  - Use CoinGecko endpoints for BTC, ETH, SOL, XMR, and common fiat currencies.
  - Cache server-side where possible to avoid excessive API calls.
- Network fees:
  - Use mempool.space REST API for Bitcoin fee recommendations.
  - Use Etherscan Gas Oracle for Ethereum/EVM gas data, configured through `ETHERSCAN_API_KEY`.
  - Use a Solana RPC or public fee endpoint only for basic estimated fee display.
  - For Monero, show fee data only if a reliable source is configured; otherwise show a clear unavailable state.
- Exchange directory:
  - Use CoinGecko exchange data as the default source.
  - Include XMR support/filtering where exchange asset data is available.
- All live modules must show loading, stale-data, unavailable, and rate-limited states.

## SEO And Content
- Server-render or prerender public pages wherever possible.
- Add unique title, meta description, canonical URL, Open Graph tags, and Twitter card metadata per route.
- Add JSON-LD:
  - `WebApplication` for the generator.
  - `Organization` for CryptoGen.
  - `FAQPage` on landing/security pages if FAQ content is added.
- Add `sitemap.xml` and `robots.txt`.
- Landing page copy should emphasize:
  - Local/client-side QR generation.
  - First-class Monero, Bitcoin, Ethereum, and Solana support.
  - Custom QR design, color palettes, embedded crypto logos, and saved style presets.
  - No server-side address, logo, or preset storage.
  - Browser-only saved addresses.
  - Scannable high-contrast QR output.

## Testing
- Unit test QR payload builders for XMR, BTC, ETH/EVM, and SOL.
- Unit test address validation for Monero standard addresses, subaddresses, and integrated addresses, plus invalid-address states.
- Unit test QR style serialization, preset storage, custom logo validation, contrast warnings, and local storage migrations.
- Component test the generator form, QR preview, style editor, logo selection, custom logo upload, preset save/apply/delete, copy, download, save address, and amount behavior.
- Integration test live module API adapters with mocked success, failure, stale, and rate-limit responses.
- Run Lighthouse checks for SEO, accessibility, performance, and best practices.
- Manually verify mobile and desktop layouts against the provided sketches.

## Assumptions
- Saved addresses, custom logos, and user-defined style presets are browser-local only and do not require accounts, sync, or server storage.
- Wallet connection, login, notification center, and security logs are excluded from product copy, navigation, and UI.
- Monero is a first-class v1 network, but live Monero fee data is included only if a reliable source is configured.
