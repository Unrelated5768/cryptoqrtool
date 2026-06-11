import { describe, expect, it } from 'vitest';
import {
  buildCaip19AssetId,
  buildQrPayload,
  decimalToUnits,
  detectNetwork,
  validateAddress,
  validateLightningInvoice,
  validateMoneroAddress
} from './networks';

const fill = (prefix: string, length: number) => prefix + 'A'.repeat(length - prefix.length);
const lightningInvoice = 'lnbc2500u1p3xnhl2pp5qqqsyqcyq5rqwzqfka';

describe('network address validation', () => {
  it('accepts Monero standard, subaddress, and integrated address shapes', () => {
    expect(validateMoneroAddress(fill('4', 95)).status).toBe('valid');
    expect(validateMoneroAddress(fill('8', 95)).status).toBe('valid');
    expect(validateMoneroAddress(fill('4', 106)).status).toBe('valid');
  });

  it('rejects invalid Monero addresses', () => {
    expect(validateMoneroAddress('4'.repeat(20)).status).toBe('invalid');
    expect(validateMoneroAddress(fill('0', 95)).status).toBe('invalid');
  });

  it('validates Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, and ERC-20 recipient addresses', () => {
    expect(validateAddress('bitcoin', 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080').status).toBe('valid');
    expect(validateAddress('lightning', lightningInvoice).status).toBe('valid');
    expect(validateAddress('ethereum', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e').status).toBe('valid');
    expect(validateAddress('solana', '7XSYgFFZPM91GtMWygbH6g2hQF3Y7doYxWKTpXhGZ4kD').status).toBe('valid');
    expect(validateAddress('litecoin', 'ltc1qg8jccf2k56l5r6gr5d9g0nv5ar09l6029l4z2l').status).toBe('valid');
    expect(validateAddress('usdc', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e').status).toBe('valid');
    expect(validateAddress('usdt', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e').status).toBe('valid');
  });

  it('rejects invalid Bitcoin Lightning invoices', () => {
    expect(validateLightningInvoice('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080').status).toBe('invalid');
    expect(validateLightningInvoice('lnurl1dp68gurn8ghj7mrww4exctnvdakz7').status).toBe('invalid');
  });
});

describe('QR payload builders', () => {
  it('returns address-only payloads when no amount is provided', () => {
    expect(buildQrPayload('monero', '84PqAddress')).toBe('84PqAddress');
  });

  it('builds network payment URIs with amounts', () => {
    expect(buildQrPayload('monero', '84PqAddress', '1.23')).toBe('monero:84PqAddress?tx_amount=1.23');
    expect(buildQrPayload('bitcoin', 'bc1qaddress', '0.5')).toBe('bitcoin:bc1qaddress?amount=0.5');
    expect(buildQrPayload('lightning', lightningInvoice, '0.5')).toBe(lightningInvoice);
    expect(buildQrPayload('ethereum', '0xabc', '2')).toBe('ethereum:0xabc@1?value=2000000000000000000');
    expect(buildQrPayload('solana', 'SolAddress', '3')).toBe('solana:SolAddress?amount=3');
    expect(buildQrPayload('litecoin', 'ltc1address', '4')).toBe('litecoin:ltc1address?amount=4');
    expect(buildQrPayload('usdc', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', '1.23')).toBe(
      'ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48@1/transfer?address=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&uint256=1230000'
    );
    expect(buildQrPayload('usdt', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', '5')).toBe(
      'ethereum:0xdAC17F958D2ee523a2206206994597C13D831ec7@1/transfer?address=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&uint256=5000000'
    );
  });

  it('builds CAIP-19 asset identifiers for chain-specific stablecoins', () => {
    expect(buildCaip19AssetId('usdc')).toBe('eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
    expect(buildCaip19AssetId('usdc', 'polygon')).toBe(
      'eip155:137/erc20:0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'
    );
    expect(buildQrPayload('usdt', '', undefined, { tokenChainId: 'avalanche', caip19AssetOnly: true })).toBe(
      'eip155:43114/erc20:0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7'
    );
  });

  it('builds ERC-681 token transfer payloads on selected EVM chains', () => {
    expect(
      buildQrPayload('usdc', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', '2.5', {
        tokenChainId: 'base'
      })
    ).toBe(
      'ethereum:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913@8453/transfer?address=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&uint256=2500000'
    );
  });

  it('builds native EIP-681 payloads on selected EVM chains', () => {
    expect(
      buildQrPayload('ethereum', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', '0.25', {
        tokenChainId: 'base'
      })
    ).toBe('ethereum:0x742d35Cc6634C0532925a3b844Bc454e4438f44e@8453?value=250000000000000000');
  });

  it('ignores invalid amount input', () => {
    expect(buildQrPayload('bitcoin', 'bc1qaddress', '-1')).toBe('bc1qaddress');
  });
});

describe('automatic network detection', () => {
  it('detects supported networks from address shape', () => {
    expect(detectNetwork(fill('4', 95))).toBe('monero');
    expect(detectNetwork(lightningInvoice)).toBe('lightning');
    expect(detectNetwork('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')).toBe('ethereum');
    expect(detectNetwork('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080')).toBe('bitcoin');
    expect(detectNetwork('ltc1qg8jccf2k56l5r6gr5d9g0nv5ar09l6029l4z2l')).toBe('litecoin');
    expect(detectNetwork('7XSYgFFZPM91GtMWygbH6g2hQF3Y7doYxWKTpXhGZ4kD')).toBe('solana');
  });
});

describe('token amount unit conversion', () => {
  it('converts decimal token amounts to base units without floating point math', () => {
    expect(decimalToUnits('1.23', 6)).toBe('1230000');
    expect(decimalToUnits('0.000001', 6)).toBe('1');
    expect(decimalToUnits('2', 6)).toBe('2000000');
  });
});
