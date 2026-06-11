import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import StyleEditor from './StyleEditor.svelte';
import { defaultQrStyle } from '$lib/qrStyle';

describe('StyleEditor', () => {
  it('shows scan-safety feedback for low-contrast styles', () => {
    render(StyleEditor, {
      style: {
        ...defaultQrStyle,
        foreground: '#777777',
        background: '#888888'
      }
    });

    expect(screen.getByText(/contrast is below/i)).toBeInTheDocument();
  });

  it('rejects unsupported custom logo file types', async () => {
    render(StyleEditor, {
      style: defaultQrStyle
    });

    await fireEvent.change(screen.getByTestId('custom-logo-input'), {
      target: {
        files: [new File(['x'], 'logo.gif', { type: 'image/gif' })]
      }
    });

    expect(screen.getByText(/png, jpeg, svg, or webp/i)).toBeInTheDocument();
  });

  it('searches and selects catalog icons', async () => {
    render(StyleEditor, {
      style: defaultQrStyle
    });

    await fireEvent.input(screen.getByTestId('logo-search'), { target: { value: 'monero' } });
    await fireEvent.click(screen.getByRole('button', { name: /xmr monero/i }));

    expect(screen.getByText(/monero \(xmr\) selected/i)).toBeInTheDocument();
  });

  it('switches logo variants in the picker', async () => {
    const { container } = render(StyleEditor, {
      style: { ...defaultQrStyle, logo: 'btc' }
    });

    await fireEvent.click(screen.getByRole('button', { name: 'Black' }));
    expect(screen.getByRole('button', { name: 'Black' })).toHaveAttribute('aria-pressed', 'true');

    await fireEvent.input(screen.getByTestId('logo-search'), { target: { value: 'bitcoin' } });
    const bitcoinIcon = container.querySelector('img[src="/crypto-icons/black/btc.svg"]');
    expect(bitcoinIcon).toHaveAttribute('src', '/crypto-icons/black/btc.svg');
  });
});
