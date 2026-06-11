import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-lowest': 'rgb(var(--surface-lowest) / <alpha-value>)',
        'surface-low': 'rgb(var(--surface-low) / <alpha-value>)',
        'surface-container': 'rgb(var(--surface-container) / <alpha-value>)',
        'surface-high': 'rgb(var(--surface-high) / <alpha-value>)',
        'surface-highest': 'rgb(var(--surface-highest) / <alpha-value>)',
        'surface-bright': 'rgb(var(--surface-bright) / <alpha-value>)',
        'on-surface': 'rgb(var(--on-surface) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--on-surface-variant) / <alpha-value>)',
        outline: 'rgb(var(--outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--outline-variant) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-action': 'rgb(var(--primary-action) / <alpha-value>)',
        'primary-action-dark': 'rgb(var(--primary-action-dark) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--tertiary) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
        monero: '#ff6600',
        bitcoin: '#f7931a',
        ethereum: '#627eea',
        solana: '#14f195'
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      borderRadius: {
        card: '0.75rem'
      },
      boxShadow: {
        glow: '0 0 32px rgba(0, 82, 255, 0.18)',
        glass: '0 20px 60px rgba(0, 0, 0, 0.24)'
      }
    }
  },
  plugins: [forms]
} satisfies Config;
