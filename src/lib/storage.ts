import { defaultQrStyle, parseStyle, type QrStyle, type StylePreset } from './qrStyle';
import type { NetworkId } from './networks';
import { normalizeCurrency, type FiatCurrency } from './currencyOptions';

const STORAGE_KEY = 'cryptogen:v1';

export interface SavedAddress {
  id: string;
  label: string;
  network: NetworkId;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppStorage {
  version: 1;
  addresses: SavedAddress[];
  presets: StylePreset[];
  defaultCurrency: FiatCurrency;
  theme: ThemeMode;
}

export type ThemeMode = 'dark' | 'light';

const emptyStorage = (): AppStorage => ({ version: 1, addresses: [], presets: [], defaultCurrency: 'USD', theme: 'dark' });

export function loadStorage(): AppStorage {
  if (!browserStorageAvailable()) return emptyStorage();

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyStorage();

  try {
    return migrateStorage(JSON.parse(raw));
  } catch {
    return emptyStorage();
  }
}

export function saveStorage(data: AppStorage) {
  if (!browserStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveAddress(input: Omit<SavedAddress, 'id' | 'createdAt' | 'updatedAt'>): SavedAddress {
  const data = loadStorage();
  const now = new Date().toISOString();
  const existing = data.addresses.find(
    (item) => item.network === input.network && item.address.toLowerCase() === input.address.toLowerCase()
  );

  if (existing) {
    existing.label = input.label || existing.label;
    existing.updatedAt = now;
    saveStorage(data);
    return existing;
  }

  const address: SavedAddress = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now
  };
  data.addresses.unshift(address);
  saveStorage(data);
  return address;
}

export function updateAddressLabel(id: string, label: string) {
  const data = loadStorage();
  const item = data.addresses.find((address) => address.id === id);
  if (!item) return;
  item.label = label;
  item.updatedAt = new Date().toISOString();
  saveStorage(data);
}

export function deleteAddress(id: string) {
  const data = loadStorage();
  data.addresses = data.addresses.filter((address) => address.id !== id);
  saveStorage(data);
}

export function saveStylePreset(name: string, style: QrStyle, customLogoDataUrl?: string): StylePreset {
  const data = loadStorage();
  const now = new Date().toISOString();
  const preset: StylePreset = {
    id: crypto.randomUUID(),
    name: name.trim() || 'Untitled preset',
    style,
    customLogoDataUrl,
    createdAt: now,
    updatedAt: now
  };
  data.presets.unshift(preset);
  saveStorage(data);
  return preset;
}

export function updateStylePresetName(id: string, name: string) {
  const data = loadStorage();
  const preset = data.presets.find((item) => item.id === id);
  if (!preset) return;
  preset.name = name.trim() || preset.name;
  preset.updatedAt = new Date().toISOString();
  saveStorage(data);
}

export function deleteStylePreset(id: string) {
  const data = loadStorage();
  data.presets = data.presets.filter((preset) => preset.id !== id);
  saveStorage(data);
}

export function migrateStorage(value: unknown): AppStorage {
  if (!value || typeof value !== 'object') return emptyStorage();
  const candidate = value as Partial<AppStorage>;

  return {
    version: 1,
    addresses: Array.isArray(candidate.addresses) ? candidate.addresses.filter(isSavedAddress) : [],
    presets: Array.isArray(candidate.presets)
      ? candidate.presets.filter(isStylePreset).map((preset) => ({
          ...preset,
          style: parseStyle(JSON.stringify(preset.style ?? defaultQrStyle))
        }))
      : [],
    defaultCurrency: normalizeCurrency(candidate.defaultCurrency),
    theme: normalizeTheme(candidate.theme)
  };
}

export function normalizeTheme(value: unknown): ThemeMode {
  return value === 'light' ? 'light' : 'dark';
}

function browserStorageAvailable() {
  return typeof localStorage !== 'undefined';
}

function isSavedAddress(value: unknown): value is SavedAddress {
  const item = value as SavedAddress;
  return Boolean(item?.id && item.label !== undefined && item.network && item.address && item.createdAt && item.updatedAt);
}

function isStylePreset(value: unknown): value is StylePreset {
  const item = value as StylePreset;
  return Boolean(item?.id && item.name && item.style && item.createdAt && item.updatedAt);
}
