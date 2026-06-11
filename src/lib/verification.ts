import {
  getNetwork,
  isTokenNetwork,
  networks,
  tokenDeployments,
  validateAddress,
  validateEthereumAddress,
  type NetworkId,
  type ValidationResult
} from './networks';

export type VerificationNetwork = NetworkId | 'automatic';
export type VerificationInputType = 'address' | 'transaction' | 'payment-uri' | 'lightning-invoice' | 'unknown';
export type LookupState = 'fresh' | 'stale' | 'unavailable' | 'rate-limited';

export interface ExplorerLink {
  label: string;
  href: string;
}

export interface ParsedPaymentUri {
  scheme: NetworkId;
  target: string;
  normalized: string;
  tokenNetwork?: Extract<NetworkId, 'usdc' | 'usdt'>;
  recipient?: string;
  amount?: string;
}

export interface VerificationResultBase {
  state: LookupState;
  inputType: VerificationInputType;
  network: NetworkId | null;
  validation: ValidationResult;
  normalized: string;
  explorerLinks: ExplorerLink[];
  updatedAt: string;
  message: string;
}

const base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58Pattern = new RegExp(`^[${base58}]+$`);
const hex64Pattern = /^[a-fA-F0-9]{64}$/;
const evmTxPattern = /^0x[a-fA-F0-9]{64}$/;

export function verifyLocally(q: string, selectedNetwork: VerificationNetwork = 'automatic'): VerificationResultBase {
  const value = q.trim();
  const updatedAt = new Date().toISOString();

  if (!value) {
    return {
      state: 'unavailable',
      inputType: 'unknown',
      network: null,
      validation: { status: 'warning', message: 'Paste an address, transaction hash, Lightning invoice, or payment URI.' },
      normalized: '',
      explorerLinks: [],
      updatedAt,
      message: 'Nothing to verify yet.'
    };
  }

  const uri = parsePaymentUri(value);
  if (uri) {
    const network = uri.scheme === 'lightning' ? 'lightning' : selectedNetwork === 'automatic' ? (uri.tokenNetwork ?? uri.scheme) : selectedNetwork;
    const candidate = uri.recipient ?? uri.target;
    const validation = uri.scheme === 'lightning' ? validateAddress('lightning', uri.target) : validateAddress(network, candidate);
    return {
      state: validation.status === 'valid' ? 'unavailable' : 'unavailable',
      inputType: uri.scheme === 'lightning' ? 'lightning-invoice' : 'payment-uri',
      network,
      validation,
      normalized: uri.normalized,
      explorerLinks: validation.status === 'valid' && uri.scheme !== 'lightning' ? explorerLinks(network, candidate, 'address') : [],
      updatedAt,
      message:
        validation.status === 'valid'
          ? 'Payment URI format is valid. Confirm the recipient and amount in your wallet before sending.'
          : validation.message
    };
  }

  const lightning = validateAddress('lightning', value);
  if ((selectedNetwork === 'automatic' || selectedNetwork === 'lightning') && lightning.status === 'valid') {
    return {
      state: 'unavailable',
      inputType: 'lightning-invoice',
      network: 'lightning',
      validation: lightning,
      normalized: value.toLowerCase(),
      explorerLinks: [],
      updatedAt,
      message: 'Lightning invoice format is valid. Live invoice settlement lookup is not available.'
    };
  }

  const addressNetwork = detectAddressNetwork(value, selectedNetwork);
  if (addressNetwork) {
    const validation = validateAddress(addressNetwork, value);
    return {
      state: 'unavailable',
      inputType: 'address',
      network: addressNetwork,
      validation,
      normalized: normalizeForNetwork(addressNetwork, value),
      explorerLinks: validation.status === 'valid' ? explorerLinks(addressNetwork, value, 'address') : [],
      updatedAt,
      message:
        validation.status === 'valid'
          ? `${getNetwork(addressNetwork).name} address format is valid. Live data may still be unavailable.`
          : validation.message
    };
  }

  const txNetwork = detectTransactionNetwork(value, selectedNetwork);
  if (txNetwork) {
    const validation = validateTransactionHash(txNetwork, value);
    return {
      state: 'unavailable',
      inputType: 'transaction',
      network: txNetwork,
      validation,
      normalized: txNetwork === 'ethereum' || isTokenNetwork(txNetwork) ? value.toLowerCase() : value,
      explorerLinks: validation.status === 'valid' ? explorerLinks(txNetwork, value, 'transaction') : [],
      updatedAt,
      message:
        validation.status === 'valid'
          ? `${getNetwork(txNetwork).name} transaction hash format is valid.`
          : validation.message
    };
  }

  return {
    state: 'unavailable',
    inputType: 'unknown',
    network: selectedNetwork === 'automatic' ? null : selectedNetwork,
    validation: { status: 'invalid', message: 'Input does not match a supported address, transaction hash, invoice, or payment URI.' },
    normalized: value,
    explorerLinks: [],
    updatedAt,
    message: 'Try selecting the network manually if this is a valid payload from a supported chain.'
  };
}

export function parsePaymentUri(input: string): ParsedPaymentUri | null {
  const value = input.trim();
  const lower = value.toLowerCase();

  if (lower.startsWith('lightning:')) {
    const invoice = value.slice('lightning:'.length);
    return {
      scheme: 'lightning',
      target: invoice,
      normalized: invoice.toLowerCase()
    };
  }

  if (lower.startsWith('bitcoin:')) return parseSimplePaymentUri(value, 'bitcoin', 'amount');
  if (lower.startsWith('litecoin:')) return parseSimplePaymentUri(value, 'litecoin', 'amount');
  if (lower.startsWith('solana:')) return parseSimplePaymentUri(value, 'solana', 'amount');
  if (lower.startsWith('monero:')) return parseSimplePaymentUri(value, 'monero', 'tx_amount');
  if (lower.startsWith('ethereum:')) return parseEthereumUri(value);
  return null;
}

export function validateTransactionHash(network: NetworkId, hash: string): ValidationResult {
  const value = hash.trim();

  switch (network) {
    case 'ethereum':
    case 'usdc':
    case 'usdt':
      return evmTxPattern.test(value)
        ? { status: 'valid', message: 'Valid EVM transaction hash format.' }
        : { status: 'invalid', message: 'Expected a 0x-prefixed 32-byte transaction hash.' };
    case 'bitcoin':
    case 'litecoin':
    case 'monero':
      return hex64Pattern.test(value)
        ? { status: 'valid', message: `Valid ${getNetwork(network).name} transaction hash shape.` }
        : { status: 'invalid', message: 'Expected a 64-character hexadecimal transaction hash.' };
    case 'solana':
      return base58Pattern.test(value) && value.length >= 86 && value.length <= 88
        ? { status: 'valid', message: 'Valid Solana transaction signature shape.' }
        : { status: 'invalid', message: 'Expected a base58 Solana signature, usually 87 or 88 characters.' };
    case 'lightning':
      return { status: 'unsupported', message: 'Lightning invoices are validated as invoices, not transaction hashes.' };
    default:
      return { status: 'unsupported', message: 'Network is not supported in this version.' };
  }
}

export function explorerLinks(network: NetworkId, value: string, type: 'address' | 'transaction'): ExplorerLink[] {
  const normalized = value.trim();
  const encoded = encodeURIComponent(normalized);
  const evmType = type === 'address' ? 'address' : 'tx';

  switch (network) {
    case 'bitcoin':
      return [
        { label: 'mempool.space', href: `https://mempool.space/${type === 'address' ? 'address' : 'tx'}/${encoded}` },
        { label: 'Blockstream', href: `https://blockstream.info/${type === 'address' ? 'address' : 'tx'}/${encoded}` }
      ];
    case 'litecoin':
      return [{ label: 'Blockchair', href: `https://blockchair.com/litecoin/${type === 'address' ? 'address' : 'transaction'}/${encoded}` }];
    case 'ethereum':
    case 'usdc':
    case 'usdt':
      return [{ label: 'Etherscan', href: `https://etherscan.io/${evmType}/${encoded}` }];
    case 'solana':
      return [{ label: 'Solana Explorer', href: `https://explorer.solana.com/${type === 'address' ? 'address' : 'tx'}/${encoded}` }];
    case 'monero':
      return [{ label: 'xmrchain.net search', href: `https://xmrchain.net/search?value=${encoded}` }];
    case 'lightning':
      return [];
    default:
      return [];
  }
}

function parseSimplePaymentUri(value: string, network: NetworkId, amountParam: string): ParsedPaymentUri | null {
  const schemePrefix = `${network}:`;
  const rest = value.slice(schemePrefix.length);
  const [target = '', query = ''] = rest.split('?');
  if (!target) return null;
  const params = new URLSearchParams(query);
  return {
    scheme: network,
    target,
    normalized: `${schemePrefix}${target}${query ? `?${params.toString()}` : ''}`,
    amount: params.get(amountParam) ?? undefined
  };
}

function parseEthereumUri(value: string): ParsedPaymentUri | null {
  const rest = value.slice('ethereum:'.length);
  const [path = '', query = ''] = rest.split('?');
  const [targetWithChain = '', operation = ''] = path.split('/');
  const target = targetWithChain.split('@')[0] ?? '';
  if (!target) return null;

  const params = new URLSearchParams(query);
  if (operation === 'transfer') {
    const tokenNetwork = tokenNetworkForContract(target);
    const recipient = params.get('address') ?? undefined;
    return {
      scheme: tokenNetwork ?? 'ethereum',
      target,
      recipient,
      tokenNetwork,
      normalized: `ethereum:${path}${query ? `?${params.toString()}` : ''}`,
      amount: params.get('uint256') ?? undefined
    };
  }

  return {
    scheme: 'ethereum',
    target,
    normalized: `ethereum:${path}${query ? `?${params.toString()}` : ''}`,
    amount: params.get('value') ?? undefined
  };
}

function tokenNetworkForContract(contract: string): Extract<NetworkId, 'usdc' | 'usdt'> | undefined {
  const normalized = contract.toLowerCase();
  if (tokenDeployments.usdc.some((deployment) => deployment.contractAddress.toLowerCase() === normalized)) return 'usdc';
  if (tokenDeployments.usdt.some((deployment) => deployment.contractAddress.toLowerCase() === normalized)) return 'usdt';
  return undefined;
}

function detectAddressNetwork(value: string, selectedNetwork: VerificationNetwork): NetworkId | null {
  if (selectedNetwork !== 'automatic') {
    return validateAddress(selectedNetwork, value).status === 'valid' ? selectedNetwork : null;
  }

  for (const network of networks) {
    if (network.id === 'lightning') continue;
    if (validateAddress(network.id, value).status === 'valid') return network.id;
  }

  return null;
}

function detectTransactionNetwork(value: string, selectedNetwork: VerificationNetwork): NetworkId | null {
  if (selectedNetwork !== 'automatic') {
    return validateTransactionHash(selectedNetwork, value).status === 'valid' ? selectedNetwork : null;
  }

  if (evmTxPattern.test(value)) return 'ethereum';
  if (hex64Pattern.test(value)) return 'bitcoin';
  if (validateTransactionHash('solana', value).status === 'valid' && validateEthereumAddress(value).status !== 'valid') return 'solana';
  return null;
}

function normalizeForNetwork(network: NetworkId, value: string) {
  if (network === 'ethereum' || isTokenNetwork(network)) return value.toLowerCase();
  if (network === 'lightning') return value.toLowerCase();
  return value.trim();
}
