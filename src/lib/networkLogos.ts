import { hasCryptoIcon } from './cryptoIcons';
import type { NetworkId } from './networks';
import type { LogoChoice } from './qrStyle';

export const networkLogoDefaults: Record<NetworkId, LogoChoice> = {
  monero: 'xmr',
  bitcoin: 'btc',
  lightning: 'btc',
  ethereum: 'eth',
  solana: 'sol',
  litecoin: 'ltc',
  usdc: 'usdc',
  usdt: 'usdt'
};

export function logoForNetwork(network: NetworkId): LogoChoice {
  return networkLogoDefaults[network];
}

export function logoForMarketSymbol(symbol: string): LogoChoice | null {
  const normalized = symbol.trim().toLowerCase();
  return normalized && hasCryptoIcon(normalized) ? normalized : null;
}
