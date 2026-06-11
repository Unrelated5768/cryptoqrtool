import { cryptoIconPath, hasCryptoIcon, type CryptoIconVariant } from './cryptoIcons';

export type DotStyle = 'square' | 'rounded' | 'dots' | 'classy' | 'extra-rounded';
export type CornerSquareStyle = 'square' | 'dot' | 'extra-rounded';
export type CornerDotStyle = 'square' | 'dot';
export type LogoChoice = 'none' | 'custom' | (string & {});
export type LogoVariant = CryptoIconVariant;
export type ColorMode = 'solid' | 'gradient' | 'preset';

export interface QrStyle {
  logo: LogoChoice;
  logoVariant: LogoVariant;
  dots: DotStyle;
  cornersSquare: CornerSquareStyle;
  cornersDot: CornerDotStyle;
  colorMode: ColorMode;
  foreground: string;
  foregroundEnd: string;
  background: string;
  margin: number;
  logoSize: number;
  presetName?: string;
}

export interface StylePreset {
  id: string;
  name: string;
  style: QrStyle;
  customLogoDataUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const defaultQrStyle: QrStyle = {
  logo: 'none',
  logoVariant: 'color',
  dots: 'rounded',
  cornersSquare: 'extra-rounded',
  cornersDot: 'dot',
  colorMode: 'solid',
  foreground: '#050816',
  foregroundEnd: '#0052ff',
  background: '#ffffff',
  margin: 16,
  logoSize: 0.2,
  presetName: 'High Contrast Print'
};

export const builtInPresets: Array<{ name: string; style: QrStyle }> = [
  {
    name: 'Institutional Dark',
    style: {
      ...defaultQrStyle,
      logo: 'none',
      foreground: '#050816',
      foregroundEnd: '#0052ff',
      background: '#f8fafc',
      dots: 'classy',
      presetName: 'Institutional Dark'
    }
  },
  {
    name: 'Monero Orange',
    style: {
      ...defaultQrStyle,
      logo: 'xmr',
      foreground: '#111111',
      foregroundEnd: '#ff6600',
      background: '#fff7ed',
      colorMode: 'gradient',
      presetName: 'Monero Orange'
    }
  },
  {
    name: 'Bitcoin Gold',
    style: {
      ...defaultQrStyle,
      logo: 'btc',
      foreground: '#17120a',
      foregroundEnd: '#f7931a',
      background: '#fffbeb',
      colorMode: 'gradient',
      presetName: 'Bitcoin Gold'
    }
  },
  {
    name: 'Ethereum Blue',
    style: {
      ...defaultQrStyle,
      logo: 'eth',
      foreground: '#10172a',
      foregroundEnd: '#627eea',
      background: '#eef2ff',
      colorMode: 'gradient',
      presetName: 'Ethereum Blue'
    }
  },
  {
    name: 'Solana Neon',
    style: {
      ...defaultQrStyle,
      logo: 'sol',
      foreground: '#060b14',
      foregroundEnd: '#14f195',
      background: '#ecfeff',
      colorMode: 'gradient',
      presetName: 'Solana Neon'
    }
  },
  {
    name: 'High Contrast Print',
    style: { ...defaultQrStyle, foreground: '#000000', background: '#ffffff', presetName: 'High Contrast Print' }
  },
  {
    name: 'Minimal Black',
    style: {
      ...defaultQrStyle,
      foreground: '#111111',
      background: '#ffffff',
      dots: 'square',
      cornersSquare: 'square',
      cornersDot: 'square',
      presetName: 'Minimal Black'
    }
  }
];

export const acceptedLogoTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
export const maxLogoBytes = 300_000;
export const maxLogoDimension = 1024;

export function serializeStyle(style: QrStyle): string {
  return JSON.stringify(style);
}

export function parseStyle(value: string): QrStyle {
  const parsed = JSON.parse(value) as Partial<QrStyle>;
  const logo = normalizeLogoChoice(parsed.logo);
  const logoVariant = normalizeLogoVariant(parsed.logoVariant);
  return {
    ...defaultQrStyle,
    ...parsed,
    logo,
    logoVariant,
    margin: clamp(Number(parsed.margin ?? defaultQrStyle.margin), 8, 48),
    logoSize: clamp(Number(parsed.logoSize ?? defaultQrStyle.logoSize), 0.12, 0.32)
  };
}

export function contrastRatio(foreground: string, background: string): number {
  const fg = luminance(hexToRgb(foreground));
  const bg = luminance(hexToRgb(background));
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getContrastWarning(style: QrStyle): string | null {
  const ratio = contrastRatio(style.foreground, style.background);
  if (ratio < 4.5) {
    return 'Foreground and background contrast is below the scan-safe threshold.';
  }
  if (style.logo !== 'none' && style.logoSize > 0.26) {
    return 'Large embedded logos may reduce QR scan reliability.';
  }
  return null;
}

export function validateLogoFile(file: File): string | null {
  if (!acceptedLogoTypes.includes(file.type)) {
    return 'Use a PNG, JPEG, SVG, or WebP logo.';
  }
  if (file.size > maxLogoBytes) {
    return 'Logo files must be 300 KB or smaller before saving a preset.';
  }
  return null;
}

export function logoDataUrl(
  choice: LogoChoice,
  customLogoDataUrl?: string,
  variant: LogoVariant = 'color'
): string | undefined {
  if (choice === 'custom') return customLogoDataUrl;
  if (choice === 'none') return undefined;
  return cryptoIconPath(choice, variant);
}

export function normalizeLogoChoice(value: unknown): LogoChoice {
  if (value === 'none' || value === 'custom') return value;
  if (typeof value !== 'string') return 'none';
  const normalized = value.toLowerCase();
  return hasCryptoIcon(normalized) ? normalized : 'none';
}

function normalizeLogoVariant(value: unknown): LogoVariant {
  return value === 'black' || value === 'white' || value === 'color' ? value : 'color';
}

function hexToRgb(hex: string): [number, number, number] {
  const safe = /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : '#000000';
  return [1, 3, 5].map((start) => Number.parseInt(safe.slice(start, start + 2), 16)) as [
    number,
    number,
    number
  ];
}

function luminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
