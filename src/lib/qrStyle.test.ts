import { describe, expect, it } from 'vitest';
import {
  contrastRatio,
  defaultQrStyle,
  getContrastWarning,
  logoDataUrl,
  parseStyle,
  serializeStyle,
  validateLogoFile
} from './qrStyle';

describe('QR style utilities', () => {
  it('serializes and parses styles with bounded quiet zone and logo size', () => {
    const serialized = serializeStyle({ ...defaultQrStyle, margin: 120, logoSize: 0.9 });
    const parsed = parseStyle(serialized);
    expect(parsed.margin).toBe(48);
    expect(parsed.logoSize).toBe(0.32);
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
});
