import { describe, expect, it } from 'vitest';
import { ApiQrError, generateApiQr, inputFromSearchParams } from './qrApi';

const bitcoinAddress = 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080';

describe('QR API generator', () => {
  it('generates guided SVG output with a wallet payload and catalog logo', async () => {
    const result = await generateApiQr({
      network: 'bitcoin',
      address: bitcoinAddress,
      amount: '0.1',
      style: { logo: 'btc', logoVariant: 'black' }
    });

    expect(result.network).toBe('bitcoin');
    expect(result.payload).toBe(`bitcoin:${bitcoinAddress}?amount=0.1`);
    expect(result.svg).toContain('<svg');
    expect(result.svg).toContain('/crypto-icons/black/btc.svg');
  });

  it('generates native Ethereum payloads with EIP-155 chain id and wei value', async () => {
    const result = await generateApiQr({
      network: 'ethereum',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      amount: '0.25',
      tokenChainId: 'base'
    });

    expect(result.payload).toBe('ethereum:0x742d35Cc6634C0532925a3b844Bc454e4438f44e@8453?value=250000000000000000');
  });

  it('generates custom payload JSON responses', async () => {
    const result = await generateApiQr({
      mode: 'custom',
      payload: 'hello api',
      format: 'json'
    });

    expect(result.format).toBe('json');
    expect(result.network).toBe('custom');
    expect(result.payload).toBe('hello api');
  });

  it('rejects invalid guided addresses', async () => {
    await expect(generateApiQr({ network: 'bitcoin', address: 'not-a-bitcoin-address' })).rejects.toBeInstanceOf(
      ApiQrError
    );
  });

  it('builds input from query parameters', () => {
    const input = inputFromSearchParams(
      new URLSearchParams({
        network: 'bitcoin',
        address: bitcoinAddress,
        amount: '0.1',
        format: 'json',
        logo: 'btc',
        logoVariant: 'white'
      })
    );

    expect(input.network).toBe('bitcoin');
    expect(input.format).toBe('json');
    expect(input.style?.logo).toBe('btc');
    expect(input.style?.logoVariant).toBe('white');
  });
});
