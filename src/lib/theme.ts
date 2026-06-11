import { get, writable } from 'svelte/store';
import { loadStorage, normalizeTheme, saveStorage, type ThemeMode } from './storage';

export const theme = writable<ThemeMode>(loadStorage().theme);

theme.subscribe((value) => {
  applyTheme(value);
});

export function setTheme(nextTheme: string) {
  const normalized = normalizeTheme(nextTheme);
  const data = loadStorage();
  data.theme = normalized;
  saveStorage(data);
  theme.set(normalized);
}

export function toggleTheme() {
  setTheme(get(theme) === 'dark' ? 'light' : 'dark');
}

export function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.classList.toggle('dark', mode === 'dark');
  root.classList.toggle('light', mode === 'light');
  root.style.colorScheme = mode;
}
