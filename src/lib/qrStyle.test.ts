import { describe, expect, it } from 'vitest';
import {
  contrastRatio,
  defaultQrStyle,
  getContrastWarning,
  logoDataUrl,
  normalizeLogoChoice,
  parseStyle,
  serializeStyle,
  validateLogoFile
} from './qrStyle';
import { logoForMarketSymbol, logoForNetwork } from './networkLogos';

describe('QR style utilities', () => {
  it('serializes and parses styles with bounded quiet zone and logo size', () => {
    const serialized = serializeStyle({ ...defaultQrStyle, margin: 120, logoSize: 0.9, logoVariant: 'black' });
    const parsed = parseStyle(serialized);
    expect(parsed.margin).toBe(48);
    expect(parsed.logoSize).toBe(0.32);
    expect(parsed.logoVariant).toBe('black');
  });

  it('warns on low contrast palettes', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeGreaterThan(10);
    expect(getContrastWarning({ ...defaultQrStyle, foreground: '#777777', background: '#888888' })).toContain(
      'contrast'
    );
  });

  it('validates custom logo file types and sizes', () => {
    const good = new File(['x'], 'logo.png', { type: 'image/png' });
    const badType = new File(['x'], 'logo.gif', { type: 'image/gif' });
    const tooLarge = new File([new Uint8Array(301_000)], 'logo.png', { type: 'image/png' });

    expect(validateLogoFile(good)).toBeNull();
    expect(validateLogoFile(badType)).toContain('PNG');
    expect(validateLogoFile(tooLarge)).toContain('300 KB');
  });

  it('migrates removed market logos to no embedded logo', () => {
    expect(parseStyle(JSON.stringify({ ...defaultQrStyle, logo: 'market' })).logo).toBe('none');
  });

  it('defaults missing logo variants to color for legacy saved styles', () => {
    expect(parseStyle(JSON.stringify({ ...defaultQrStyle, logo: 'btc', logoVariant: undefined })).logoVariant).toBe(
      'color'
    );
  });

  it('resolves catalog logo paths for selected variants', () => {
    expect(logoDataUrl('btc', undefined, 'color')).toBe('/crypto-icons/color/btc.svg');
    expect(logoDataUrl('btc', undefined, 'black')).toBe('/crypto-icons/black/btc.svg');
    expect(logoDataUrl('btc', undefined, 'white')).toBe('/crypto-icons/white/btc.svg');
  });

  it('handles none, custom, and invalid saved logo choices', () => {
    expect(logoDataUrl('none')).toBeUndefined();
    expect(logoDataUrl('custom', 'data:image/png;base64,abc')).toBe('data:image/png;base64,abc');
    expect(normalizeLogoChoice('not-a-real-local-icon')).toBe('none');
    expect(parseStyle(JSON.stringify({ ...defaultQrStyle, logo: 'not-a-real-local-icon' })).logo).toBe('none');
  });

  it('maps supported networks and known market symbols to catalog logos', () => {
    expect(logoForNetwork('monero')).toBe('xmr');
    expect(logoForNetwork('lightning')).toBe('btc');
    expect(logoForNetwork('usdc')).toBe('usdc');
    expect(logoForMarketSymbol('AAVE')).toBe('aave');
    expect(logoForMarketSymbol('definitely-not-a-symbol')).toBeNull();
  });
});
