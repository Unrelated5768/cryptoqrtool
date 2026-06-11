import QRCode from 'qrcode';
import {
  buildQrPayload,
  detectNetwork,
  getTokenChain,
  isTokenNetwork,
  networks,
  tokenChains,
  validateAddress,
  type NetworkId,
  type TokenChainId,
  type ValidationResult
} from '$lib/networks';
import { defaultQrStyle, logoDataUrl, parseStyle, type QrStyle } from '$lib/qrStyle';

export type ApiQrFormat = 'svg' | 'json';
export type ApiQrMode = 'guided' | 'custom';

export interface ApiQrInput {
  mode?: ApiQrMode;
  network?: NetworkId | 'automatic';
  address?: string;
  amount?: string;
  payload?: string;
  tokenChainId?: TokenChainId;
  caip19AssetOnly?: boolean;
  format?: ApiQrFormat;
  size?: number;
  style?: Partial<QrStyle>;
}

export interface ApiQrResult {
  payload: string;
  svg: string;
  network: NetworkId | 'custom';
  validation: ValidationResult;
  format: ApiQrFormat;
}

export class ApiQrError extends Error {
  constructor(
    message: string,
    public status = 400
  ) {
    super(message);
  }
}

export async function generateApiQr(input: ApiQrInput): Promise<ApiQrResult> {
  const mode = input.mode ?? (input.payload ? 'custom' : 'guided');
  const format = normalizeFormat(input.format);
  const style = normalizeStyle(input.style);
  const size = clampInteger(input.size ?? 320, 160, 1024);

  const payloadResult = mode === 'custom' ? resolveCustomPayload(input.payload) : resolveGuidedPayload(input);
  const svg = await renderQrSvg(payloadResult.payload, style, size);

  return {
    ...payloadResult,
    svg,
    format
  };
}

export function inputFromSearchParams(params: URLSearchParams): ApiQrInput {
  const style: Partial<QrStyle> = {};
  for (const key of [
    'logo',
    'logoVariant',
    'foreground',
    'background',
    'foregroundEnd',
    'colorMode',
    'dots',
    'cornersSquare',
    'cornersDot',
    'margin',
    'logoSize'
  ] as const) {
    const value = params.get(key);
    if (value !== null) {
      style[key] = value as never;
    }
  }

  return {
    mode: normalizeMode(params.get('mode')),
    network: normalizeNetwork(params.get('network')),
    address: params.get('address') ?? undefined,
    amount: params.get('amount') ?? undefined,
    payload: params.get('payload') ?? undefined,
    tokenChainId: normalizeTokenChain(params.get('tokenChainId') ?? params.get('tokenChain')),
    caip19AssetOnly: params.get('caip19AssetOnly') === 'true',
    format: normalizeFormat(params.get('format')),
    size: params.has('size') ? Number(params.get('size')) : undefined,
    style: Object.keys(style).length ? style : undefined
  };
}

function resolveCustomPayload(payload: string | undefined) {
  const value = payload?.trim();
  if (!value) {
    throw new ApiQrError('payload is required when mode is custom.');
  }
  if (value.length > 4096) {
    throw new ApiQrError('payload must be 4096 characters or fewer.');
  }

  return {
    payload: value,
    network: 'custom' as const,
    validation: { status: 'valid' as const, message: 'Custom payload accepted.' }
  };
}

function resolveGuidedPayload(input: ApiQrInput) {
  const requestedNetwork = input.network ?? 'automatic';
  const address = input.address?.trim() ?? '';
  const network = requestedNetwork === 'automatic' ? detectNetwork(address) : requestedNetwork;

  if (!network) {
    throw new ApiQrError('Unable to detect a supported network from address. Provide network explicitly.');
  }
  if (input.caip19AssetOnly && !isTokenNetwork(network)) {
    throw new ApiQrError('caip19AssetOnly is only supported for token networks.');
  }

  const validation = input.caip19AssetOnly
    ? {
        status: 'valid' as const,
        message: `CAIP-19 asset ID for ${network.toUpperCase()} on ${getTokenChain(input.tokenChainId ?? 'ethereum').name}.`
      }
    : validateAddress(network, address);

  if (validation.status !== 'valid') {
    throw new ApiQrError(validation.message);
  }

  const payload = buildQrPayload(network, address, input.amount, {
    tokenChainId: input.tokenChainId,
    caip19AssetOnly: input.caip19AssetOnly
  });

  return { payload, network, validation };
}

async function renderQrSvg(payload: string, style: QrStyle, size: number): Promise<string> {
  const image = logoDataUrl(style.logo, undefined, style.logoVariant);
  const svg = await QRCode.toString(payload, {
    type: 'svg',
    width: size,
    margin: Math.round(style.margin / 4),
    errorCorrectionLevel: image ? 'H' : 'Q',
    color: {
      dark: toOpaqueHex(style.foreground),
      light: toOpaqueHex(style.background)
    }
  });

  return image ? injectLogo(svg, image, size, style.logoSize) : svg;
}

function injectLogo(svg: string, href: string, size: number, logoSize: number): string {
  const imageSize = Math.round(size * logoSize);
  const position = Math.round((size - imageSize) / 2);
  const logo = `<image href="${escapeXml(href)}" x="${position}" y="${position}" width="${imageSize}" height="${imageSize}" preserveAspectRatio="xMidYMid meet"/>`;
  return svg.replace('</svg>', `${logo}</svg>`);
}

function normalizeStyle(style: Partial<QrStyle> | undefined): QrStyle {
  return parseStyle(JSON.stringify({ ...defaultQrStyle, ...(style ?? {}) }));
}

function normalizeFormat(value: unknown): ApiQrFormat {
  return value === 'json' ? 'json' : 'svg';
}

function normalizeMode(value: unknown): ApiQrMode | undefined {
  return value === 'custom' || value === 'guided' ? value : undefined;
}

function normalizeNetwork(value: unknown): NetworkId | 'automatic' | undefined {
  if (value === 'automatic') return 'automatic';
  return typeof value === 'string' && networks.some((network) => network.id === value) ? (value as NetworkId) : undefined;
}

function normalizeTokenChain(value: unknown): TokenChainId | undefined {
  return typeof value === 'string' && tokenChains.some((chain) => chain.id === value) ? (value as TokenChainId) : undefined;
}

function toOpaqueHex(value: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? `${value}ff` : '#000000ff';
}

function clampInteger(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
