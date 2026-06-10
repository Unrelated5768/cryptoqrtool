import { formatCurrency, type FiatCurrency } from './currency';

export const networks = [
  {
    id: 'monero',
    name: 'Monero',
    ticker: 'XMR',
    accent: '#ff6600',
    coingeckoId: 'monero',
    placeholder: '84Pq... or 4A1...',
    supportsAmount: true
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    ticker: 'BTC',
    accent: '#f7931a',
    coingeckoId: 'bitcoin',
    placeholder: 'bc1q... or 1A1z...',
    supportsAmount: true
  },
  {
    id: 'ethereum',
    name: 'Ethereum / EVM',
    ticker: 'ETH',
    accent: '#627eea',
    coingeckoId: 'ethereum',
    placeholder: '0x742d35Cc...',
    supportsAmount: true
  },
  {
    id: 'solana',
    name: 'Solana',
    ticker: 'SOL',
    accent: '#14f195',
    coingeckoId: 'solana',
    placeholder: '7XSYg...',
    supportsAmount: true
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    ticker: 'LTC',
    accent: '#345d9d',
    coingeckoId: 'litecoin',
    placeholder: 'ltc1... or L...',
    supportsAmount: true
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    ticker: 'USDC',
    accent: '#2775ca',
    coingeckoId: 'usd-coin',
    placeholder: '0x742d35Cc...',
    supportsAmount: true,
    derivedFrom: 'ethereum',
    tokenStandard: 'erc20',
    contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6
  },
  {
    id: 'usdt',
    name: 'Tether USD',
    ticker: 'USDT',
    accent: '#26a17b',
    coingeckoId: 'tether',
    placeholder: '0x742d35Cc...',
    supportsAmount: true,
    derivedFrom: 'ethereum',
    tokenStandard: 'erc20',
    contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6
  }
] as const;

export type NetworkId = (typeof networks)[number]['id'];
export type ValidationStatus = 'valid' | 'invalid' | 'unsupported' | 'warning';

export interface ValidationResult {
  status: ValidationStatus;
  message: string;
}

const base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58Pattern = new RegExp(`^[${base58}]+$`);

export function getNetwork(id: NetworkId) {
  return networks.find((network) => network.id === id) ?? networks[0];
}

export function detectNetwork(address: string): NetworkId | null {
  const value = address.trim();
  if (!value) return null;

  const checks: Array<[NetworkId, (candidate: string) => ValidationResult]> = [
    ['monero', validateMoneroAddress],
    ['ethereum', validateEthereumAddress],
    ['bitcoin', validateBitcoinAddress],
    ['litecoin', validateLitecoinAddress],
    ['solana', validateSolanaAddress]
  ];

  return checks.find(([, validate]) => validate(value).status === 'valid')?.[0] ?? null;
}

export function validateAddress(network: NetworkId, address: string): ValidationResult {
  const value = address.trim();

  if (!value) {
    return { status: 'warning', message: 'Enter an address to generate a QR code.' };
  }

  switch (network) {
    case 'monero':
      return validateMoneroAddress(value);
    case 'bitcoin':
      return validateBitcoinAddress(value);
    case 'ethereum':
      return validateEthereumAddress(value);
    case 'usdc':
    case 'usdt':
      return validateErc20RecipientAddress(value);
    case 'solana':
      return validateSolanaAddress(value);
    case 'litecoin':
      return validateLitecoinAddress(value);
    default:
      return { status: 'unsupported', message: 'Network is not supported in this version.' };
  }
}

export function validateMoneroAddress(address: string): ValidationResult {
  if (!base58Pattern.test(address)) {
    return { status: 'invalid', message: 'Monero addresses use base58 characters.' };
  }

  if (address.length === 95 && address.startsWith('4')) {
    return { status: 'valid', message: 'Valid Monero standard address.' };
  }

  if (address.length === 95 && address.startsWith('8')) {
    return { status: 'valid', message: 'Valid Monero subaddress.' };
  }

  if (address.length === 106 && address.startsWith('4')) {
    return { status: 'valid', message: 'Valid Monero integrated address.' };
  }

  return {
    status: 'invalid',
    message: 'Expected a Monero standard/subaddress length of 95 or integrated length of 106.'
  };
}

export function validateBitcoinAddress(address: string): ValidationResult {
  const legacy = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
  const bech32 = /^(bc1|BC1)[ac-hj-np-z02-9]{11,71}$/;

  if (legacy.test(address) || bech32.test(address)) {
    return { status: 'valid', message: 'Valid Bitcoin address format.' };
  }

  return { status: 'invalid', message: 'Expected a Bitcoin legacy, SegWit, or Taproot address.' };
}

export function validateEthereumAddress(address: string): ValidationResult {
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { status: 'valid', message: 'Valid Ethereum/EVM address format.' };
  }

  return { status: 'invalid', message: 'Expected a 0x-prefixed 40-byte hex address.' };
}

export function validateErc20RecipientAddress(address: string): ValidationResult {
  const result = validateEthereumAddress(address);
  if (result.status === 'valid') {
    return { status: 'valid', message: 'Valid EVM recipient address for ERC-20 token transfer.' };
  }
  return result;
}

export function validateSolanaAddress(address: string): ValidationResult {
  if (base58Pattern.test(address) && address.length >= 32 && address.length <= 44) {
    return { status: 'valid', message: 'Valid Solana public key format.' };
  }

  return { status: 'invalid', message: 'Expected a base58 Solana address between 32 and 44 characters.' };
}

export function validateLitecoinAddress(address: string): ValidationResult {
  const legacy = /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/;
  const bech32 = /^(ltc1|LTC1)[ac-hj-np-z02-9]{11,71}$/;

  if (legacy.test(address) || bech32.test(address)) {
    return { status: 'valid', message: 'Valid Litecoin address format.' };
  }

  return { status: 'invalid', message: 'Expected a Litecoin legacy, P2SH, or bech32 address.' };
}

export function buildQrPayload(network: NetworkId, address: string, amount?: string): string {
  const cleanAddress = address.trim();
  const cleanAmount = normalizeAmount(amount);

  if (!cleanAmount) {
    return cleanAddress;
  }

  switch (network) {
    case 'monero':
      return `monero:${cleanAddress}?tx_amount=${encodeURIComponent(cleanAmount)}`;
    case 'bitcoin':
      return `bitcoin:${cleanAddress}?amount=${encodeURIComponent(cleanAmount)}`;
    case 'ethereum':
      return `ethereum:${cleanAddress}?value=${encodeURIComponent(cleanAmount)}`;
    case 'solana':
      return `solana:${cleanAddress}?amount=${encodeURIComponent(cleanAmount)}`;
    case 'litecoin':
      return `litecoin:${cleanAddress}?amount=${encodeURIComponent(cleanAmount)}`;
    case 'usdc':
    case 'usdt':
      return buildErc20TransferPayload(network, cleanAddress, cleanAmount);
    default:
      return cleanAddress;
  }
}

function buildErc20TransferPayload(network: Extract<NetworkId, 'usdc' | 'usdt'>, address: string, amount: string): string {
  const tokens = {
    usdc: {
      contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6
    },
    usdt: {
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6
    }
  } satisfies Record<Extract<NetworkId, 'usdc' | 'usdt'>, { contractAddress: string; decimals: number }>;
  const token = tokens[network];
  const units = decimalToUnits(amount, token.decimals);
  return `ethereum:${token.contractAddress}/transfer?address=${encodeURIComponent(address)}&uint256=${units}`;
}

export function normalizeAmount(amount?: string): string {
  const value = amount?.trim();
  if (!value) return '';
  if (!/^\d+(\.\d+)?$/.test(value)) return '';
  if (Number(value) <= 0) return '';
  return value;
}

export function decimalToUnits(amount: string, decimals: number): string {
  const normalized = normalizeAmount(amount);
  if (!normalized) return '0';

  const [whole, fraction = ''] = normalized.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  const units = `${whole}${paddedFraction}`.replace(/^0+(?=\d)/, '');
  return units || '0';
}

export function estimateFiat(amount: string, price?: number, currency: FiatCurrency = 'USD'): string {
  const normalized = normalizeAmount(amount);
  if (!normalized || !price) return 'Unavailable';
  return formatCurrency(Number(normalized) * price, currency);
}
