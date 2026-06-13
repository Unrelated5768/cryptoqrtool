# CryptoQR Tool - browser-local crypto QR code generator

[CryptoQR Tool](https://cryptoqrtool.com) is a browser-local crypto QR code generator and checker for Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT. Use it to create scannable cryptocurrency payment QR codes, verify crypto addresses, inspect transaction hashes, and export styled QR codes without creating an account or connecting a wallet.

Website: https://cryptoqrtool.com  
GitHub: https://github.com/Unrelated5768/cryptoqrtool

## Crypto QR code generator

CryptoQR Tool helps you generate cryptocurrency QR codes for common wallet and payment workflows:

- [Monero QR code generator](https://cryptoqrtool.com/monero-qr-code-generator)
- [Bitcoin QR code generator](https://cryptoqrtool.com/bitcoin-qr-code-generator)
- [Bitcoin Lightning QR code generator](https://cryptoqrtool.com/lightning-qr-code-generator)
- [Ethereum QR code generator](https://cryptoqrtool.com/ethereum-qr-code-generator)
- [Solana QR code generator](https://cryptoqrtool.com/solana-qr-code-generator)
- [Litecoin QR code generator](https://cryptoqrtool.com/litecoin-qr-code-generator)
- [USDC QR code generator](https://cryptoqrtool.com/usdc-qr-code-generator)
- [USDT QR code generator](https://cryptoqrtool.com/usdt-qr-code-generator)

The main generator is available at https://cryptoqrtool.com/generate.

## Local-first and privacy-focused

CryptoQR Tool is designed for people who want to generate a crypto payment QR code without handing data to a hosted wallet service.

- No wallet connection required
- No login or account required
- Saved addresses stay in browser local storage
- QR style presets stay in browser local storage
- Custom logo previews are handled in the browser
- QR payloads are generated client-side where possible
- Public pages are server-rendered for fast loading and search indexing

The privacy and security page is available at https://cryptoqrtool.com/security.

## Supported crypto QR formats

CryptoQR Tool supports address-only QR codes and supported payment URI formats for:

| Network | Common use |
| --- | --- |
| Monero | XMR address QR codes and Monero payment URIs |
| Bitcoin | BTC address QR codes and BIP21-style payment QR codes |
| Bitcoin Lightning | BOLT11 invoice QR codes |
| Ethereum / EVM | ETH address QR codes and EIP-681-style payment requests |
| Solana | SOL address QR codes and Solana payment request payloads |
| Litecoin | LTC address QR codes and payment request payloads |
| USDC | Token payment QR codes for EVM recipient addresses |
| USDT | Token payment QR codes for EVM recipient addresses |

## Crypto address and transaction checkers

The site also includes crypto checker pages for validation and lookup workflows:

- [Monero address checker](https://cryptoqrtool.com/monero-address-checker)
- [Monero transaction checker](https://cryptoqrtool.com/monero-transaction-checker)
- [Bitcoin address checker](https://cryptoqrtool.com/bitcoin-address-checker)
- [Bitcoin transaction checker](https://cryptoqrtool.com/bitcoin-transaction-checker)
- [Lightning invoice checker](https://cryptoqrtool.com/lightning-invoice-checker)
- [Ethereum address checker](https://cryptoqrtool.com/ethereum-address-checker)
- [Ethereum transaction checker](https://cryptoqrtool.com/ethereum-transaction-checker)
- [Solana address checker](https://cryptoqrtool.com/solana-address-checker)
- [Solana transaction checker](https://cryptoqrtool.com/solana-transaction-checker)
- [Litecoin address checker](https://cryptoqrtool.com/litecoin-address-checker)
- [Litecoin transaction checker](https://cryptoqrtool.com/litecoin-transaction-checker)
- [USDC address checker](https://cryptoqrtool.com/usdc-address-checker)
- [USDC transaction checker](https://cryptoqrtool.com/usdc-transaction-checker)
- [USDT address checker](https://cryptoqrtool.com/usdt-address-checker)
- [USDT transaction checker](https://cryptoqrtool.com/usdt-transaction-checker)

The general verification page is available at https://cryptoqrtool.com/verify.

## QR styling features

CryptoQR Tool includes a QR style editor for creating readable, exportable payment QR codes:

- PNG and SVG download
- Copy encoded QR payload
- Built-in crypto logo support
- Custom logo upload from your device
- Dot and corner styling
- Solid and gradient color options
- Scan-safe contrast warnings
- Browser-local style presets
- High-contrast print-friendly QR styles

## Market, fee, and exchange pages

CryptoQR Tool also includes utility pages for planning crypto QR payments:

- [Crypto market prices](https://cryptoqrtool.com/markets)
- [Crypto network fee comparison](https://cryptoqrtool.com/fees)
- [Crypto exchange directory](https://cryptoqrtool.com/exchanges)
- [QR code generation API docs](https://cryptoqrtool.com/api-docs)

## Tech stack

This project is built with:

- SvelteKit
- Svelte 5
- TypeScript
- Bun
- Tailwind CSS
- qr-code-styling
- Vitest
- Playwright
- GitHub Actions

## Development

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Run type and Svelte checks:

```bash
bun run check
```

Run tests:

```bash
bun run test
```

Build for production:

```bash
bun run build
```

Publish sitemap URLs to IndexNow after deployment:

```bash
bun run indexnow:publish
```

Preview the IndexNow payload without submitting it:

```bash
bun run indexnow:publish -- --dry-run
```

## SEO and indexing

The production site includes:

- Server-rendered public pages
- Unique page titles and meta descriptions
- Canonical URLs
- Open Graph tags
- Twitter card metadata
- JSON-LD structured data
- FAQ schema where relevant
- robots.txt
- sitemap.xml
- IndexNow support
- Network-specific landing pages for long-tail crypto QR searches

Sitemap: https://cryptoqrtool.com/sitemap.xml  
Robots: https://cryptoqrtool.com/robots.txt

## License

MIT License. See [LICENSE](LICENSE).