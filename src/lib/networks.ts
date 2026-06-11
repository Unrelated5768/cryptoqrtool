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
    id: 'lightning',
    name: 'Bitcoin Lightning',
    ticker: 'BTC-LN',
    accent: '#facc15',
    coingeckoId: 'bitcoin',
    placeholder: 'lnbc1...',
    supportsAmount: false
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
export type TokenNetworkId = Extract<NetworkId, 'usdc' | 'usdt'>;
export type TokenChainId =
  | 'ethereum'
  | 'polygon'
  | 'base'
  | 'arbitrum'
  | 'optimism'
  | 'avalanche'
  | 'celo'
  | 'kaia'
  | 'kava';
export type ValidationStatus = 'valid' | 'invalid' | 'unsupported' | 'warning';

export interface ValidationResult {
  status: ValidationStatus;
  message: string;
}

export interface TokenChain {
  id: TokenChainId;
  name: string;
  shortName: string;
  caip2: `eip155:${number}`;
  eip155: number;
}

export interface TokenDeployment {
  chainId: TokenChainId;
  contractAddress: `0x${string}`;
  decimals: number;
  bridged?: boolean;
}

export const tokenChains = [
  { id: 'ethereum', name: 'Ethereum', shortName: 'ETH', caip2: 'eip155:1', eip155: 1 },
  { id: 'polygon', name: 'Polygon PoS', shortName: 'POL', caip2: 'eip155:137', eip155: 137 },
  { id: 'base', name: 'Base', shortName: 'BASE', caip2: 'eip155:8453', eip155: 8453 },
  { id: 'arbitrum', name: 'Arbitrum One', shortName: 'ARB', caip2: 'eip155:42161', eip155: 42161 },
  { id: 'optimism', name: 'OP Mainnet', shortName: 'OP', caip2: 'eip155:10', eip155: 10 },
  { id: 'avalanche', name: 'Avalanche C-Chain', shortName: 'AVAX', caip2: 'eip155:43114', eip155: 43114 },
  { id: 'celo', name: 'Celo', shortName: 'CELO', caip2: 'eip155:42220', eip155: 42220 },
  { id: 'kaia', name: 'Kaia', shortName: 'KAIA', caip2: 'eip155:8217', eip155: 8217 },
  { id: 'kava', name: 'Kava EVM', shortName: 'KAVA', caip2: 'eip155:2222', eip155: 2222 }
] as const satisfies readonly TokenChain[];

export const tokenDeployments = {
  usdc: [
    {
      chainId: 'ethereum',
      contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6
    },
    {
      chainId: 'polygon',
      contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
      decimals: 6
    },
    {
      chainId: 'base',
      contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      decimals: 6
    },
    {
      chainId: 'arbitrum',
      contractAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      decimals: 6
    },
    {
      chainId: 'optimism',
      contractAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
      decimals: 6
    }
  ],
  usdt: [
    {
      chainId: 'ethereum',
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6
    },
    {
      chainId: 'avalanche',
      contractAddress: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
      decimals: 6
    },
    {
      chainId: 'celo',
      contractAddress: '0x48065fbBe25f71C9282ddf5e1cD6D6A887483d5e',
      decimals: 6
    },
    {
      chainId: 'kaia',
      contractAddress: '0xd077A400968890eacc75cdc901F0356c943e4fdb',
      decimals: 6
    },
    {
      chainId: 'kava',
      contractAddress: '0x919C1c267BC06a7039e03fcc2eF738525769109c',
      decimals: 6
    }
  ]
} as const satisfies Record<TokenNetworkId, readonly TokenDeployment[]>;

const base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58Pattern = new RegExp(`^[${base58}]+$`);

export function getNetwork(id: NetworkId) {
  return networks.find((network) => network.id === id) ?? networks[0];
}

export function isTokenNetwork(id: NetworkId): id is TokenNetworkId {
  return id === 'usdc' || id === 'usdt';
}

export function getTokenDeployment(network: TokenNetworkId, chainId: TokenChainId): TokenDeployment {
  return (
    tokenDeployments[network].find((deployment) => deployment.chainId === chainId) ?? tokenDeployments[network][0]
  );
}

export function getTokenChain(chainId: TokenChainId): TokenChain {
  return tokenChains.find((chain) => chain.id === chainId) ?? tokenChains[0];
}

export function getTokenChainOptions(network: TokenNetworkId): TokenChain[] {
  return tokenDeployments[network].map((deployment) => getTokenChain(deployment.chainId));
}

export function detectNetwork(address: string): NetworkId | null {
  const value = address.trim();
  if (!value) return null;

  const checks: Array<[NetworkId, (candidate: string) => ValidationResult]> = [
    ['monero', validateMoneroAddress],
    ['lightning', validateLightningInvoice],
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
    case 'lightning':
      return validateLightningInvoice(value);
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

export function validateLightningInvoice(invoice: string): ValidationResult {
  const bolt11 = /^ln(bc|tb|bcrt)(\d+[munp]?)?1[02-9ac-hj-np-z]+$/i;

  if (bolt11.test(invoice) && invoice.length >= 20 && invoice.length <= 4096) {
    return { status: 'valid', message: 'Valid Bitcoin Lightning BOLT11 invoice.' };
  }

  return { status: 'invalid', message: 'Expected a Bitcoin Lightning BOLT11 invoice beginning with lnbc1.' };
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

export function buildQrPayload(
  network: NetworkId,
  address: string,
  amount?: string,
  options: { tokenChainId?: TokenChainId; caip19AssetOnly?: boolean } = {}
): string {
  const cleanAddress = address.trim();
  const cleanAmount = normalizeAmount(amount);

  if (isTokenNetwork(network) && options.caip19AssetOnly) {
    return buildCaip19AssetId(network, options.tokenChainId);
  }

  if (!cleanAmount) {
    return cleanAddress;
  }

  switch (network) {
    case 'lightning':
      return cleanAddress;
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
      return buildErc20TransferPayload(network, cleanAddress, cleanAmount, options.tokenChainId);
    default:
      return cleanAddress;
  }
}

export function buildCaip19AssetId(network: TokenNetworkId, chainId?: TokenChainId): string {
  const token = getTokenDeployment(network, chainId ?? tokenDeployments[network][0].chainId);
  const chain = getTokenChain(token.chainId);
  return `${chain.caip2}/erc20:${token.contractAddress}`;
}

function buildErc20TransferPayload(
  network: TokenNetworkId,
  address: string,
  amount: string,
  chainId?: TokenChainId
): string {
  const token = getTokenDeployment(network, chainId ?? tokenDeployments[network][0].chainId);
  const chain = getTokenChain(token.chainId);
  const units = decimalToUnits(amount, token.decimals);
  return `ethereum:${token.contractAddress}@${chain.eip155}/transfer?address=${encodeURIComponent(address)}&uint256=${units}`;
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
