import { describe, expect, it } from 'vitest';
import { verifyWithLookup } from './server/verificationLookup';
import { explorerLinks, parsePaymentUri, validateTransactionHash, verifyLocally } from './verification';

const evmAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
const evmTx = '0x' + 'a'.repeat(64);
const hexTx = 'b'.repeat(64);
const solanaSignature = '5'.repeat(88);

describe('verification input detection', () => {
  it('detects addresses, transactions, payment URIs, and Lightning invoices', () => {
    expect(verifyLocally(evmAddress).inputType).toBe('address');
    expect(verifyLocally(evmTx).inputType).toBe('transaction');
    expect(verifyLocally(`bitcoin:bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080?amount=0.1`).inputType).toBe('payment-uri');
    expect(verifyLocally('lnbc2500u1p3xnhl2pp5qqqsyqcyq5rqwzqfka').inputType).toBe('lightning-invoice');
  });

  it('honors manual network overrides for ambiguous 64-character hashes', () => {
    expect(verifyLocally(hexTx).network).toBe('bitcoin');
    expect(verifyLocally(hexTx, 'monero').network).toBe('monero');
    expect(verifyLocally(hexTx, 'litecoin').network).toBe('litecoin');
  });
});

describe('payment URI parsing', () => {
  it('parses simple payment URIs', () => {
    expect(parsePaymentUri('litecoin:ltc1qg8jccf2k56l5r6gr5d9g0nv5ar09l6029l4z2l?amount=1.5')).toMatchObject({
      scheme: 'litecoin',
      amount: '1.5'
    });
  });

  it('parses ERC-681 token transfer payloads', () => {
    expect(
      parsePaymentUri(
        `ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48@1/transfer?address=${evmAddress}&uint256=1000000`
      )
    ).toMatchObject({
      scheme: 'usdc',
      tokenNetwork: 'usdc',
      recipient: evmAddress,
      amount: '1000000'
    });
  });

  it('parses native ERC-681 payloads with pay-prefix and chain id', () => {
    expect(parsePaymentUri(`ethereum:pay-${evmAddress}@8453?value=250000000000000000`)).toMatchObject({
      scheme: 'ethereum',
      target: evmAddress,
      amount: '250000000000000000',
      normalized: `ethereum:${evmAddress}@8453?value=250000000000000000`
    });
  });

  it('rejects malformed ERC-681 numeric values', () => {
    expect(parsePaymentUri(`ethereum:${evmAddress}@1?value=0.1`)).toBeNull();
    expect(parsePaymentUri(`ethereum:${evmAddress}@1/transfer?address=${evmAddress}&uint256=1.2`)).toBeNull();
  });
});

describe('transaction hash validation and explorer links', () => {
  it('validates transaction hash shapes by network', () => {
    expect(validateTransactionHash('bitcoin', hexTx).status).toBe('valid');
    expect(validateTransactionHash('litecoin', hexTx).status).toBe('valid');
    expect(validateTransactionHash('monero', hexTx).status).toBe('valid');
    expect(validateTransactionHash('ethereum', evmTx).status).toBe('valid');
    expect(validateTransactionHash('solana', solanaSignature).status).toBe('valid');
    expect(validateTransactionHash('lightning', hexTx).status).toBe('unsupported');
  });

  it('generates network-specific explorer URLs', () => {
    expect(explorerLinks('bitcoin', hexTx, 'transaction')[0].href).toContain('mempool.space/tx/');
    expect(explorerLinks('ethereum', evmTx, 'transaction')[0].href).toContain('etherscan.io/tx/');
    expect(explorerLinks('solana', solanaSignature, 'transaction')[0].href).toContain('explorer.solana.com/tx/');
  });
});

describe('verification API result shaping', () => {
  it('returns fresh Bitcoin lookup details when the provider responds', async () => {
    const fetchFn = async () =>
      new Response(
        JSON.stringify({
          status: { confirmed: true, block_height: 840000 },
          fee: 1200
        })
      );

    const result = await verifyWithLookup(fetchFn as typeof fetch, hexTx, 'bitcoin');
    expect(result.inputType).toBe('transaction');
    expect(result.lookup.state).toBe('fresh');
    expect(result.lookup.details?.confirmed).toBe(true);
  });

  it('returns unavailable EVM lookup when Etherscan is not configured', async () => {
    const result = await verifyWithLookup(fetch as typeof fetch, evmTx, 'ethereum');
    expect(result.validation.status).toBe('valid');
    expect(result.lookup.state).toBe('unavailable');
    expect(result.lookup.source).toBe('Etherscan');
  });

  it('returns rate-limited lookup state for 429 provider responses', async () => {
    const fetchFn = async () => new Response('Rate limited', { status: 429 });
    const result = await verifyWithLookup(fetchFn as typeof fetch, hexTx, 'bitcoin');
    expect(result.lookup.state).toBe('rate-limited');
  });
});
