import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        surface: '#11131c',
        'surface-lowest': '#0c0e17',
        'surface-low': '#191b25',
        'surface-container': '#1d1f29',
        'surface-high': '#282934',
        'surface-highest': '#32343f',
        'surface-bright': '#373943',
        'on-surface': '#e1e1ef',
        'on-surface-variant': '#c3c5d9',
        outline: '#8d90a2',
        'outline-variant': '#434656',
        primary: '#b7c4ff',
        'primary-action': '#0052ff',
        'primary-action-dark': '#0038b6',
        secondary: '#b7c8e1',
        tertiary: '#d2bbff',
        success: '#34d399',
        warning: '#fbbf24',
        error: '#ffb4ab',
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
