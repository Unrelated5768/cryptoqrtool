import { describe, expect, it } from 'vitest';
import {
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
    expect(buildQrPayload('ethereum', '0xabc', '2')).toBe('ethereum:0xabc?value=2');
    expect(buildQrPayload('solana', 'SolAddress', '3')).toBe('solana:SolAddress?amount=3');
    expect(buildQrPayload('litecoin', 'ltc1address', '4')).toBe('litecoin:ltc1address?amount=4');
    expect(buildQrPayload('usdc', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', '1.23')).toBe(
      'ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/transfer?address=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&uint256=1230000'
    );
    expect(buildQrPayload('usdt', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', '5')).toBe(
      'ethereum:0xdAC17F958D2ee523a2206206994597C13D831ec7/transfer?address=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&uint256=5000000'
    );
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
