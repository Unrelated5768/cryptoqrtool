import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import QrPreview from './QrPreview.svelte';
import { defaultQrStyle } from '$lib/qrStyle';

vi.mock('qr-code-styling', () => ({
  default: class QRCodeStyling {
    append(host: HTMLElement) {
      host.innerHTML = '<svg role="img" aria-label="Generated QR"></svg>';
    }

    update() {
      return undefined;
    }

    download() {
      return Promise.resolve();
    }
  }
}));

describe('QrPreview', () => {
  it('renders a QR preview and exposes the encoded payload', async () => {
    render(QrPreview, {
      payload: 'bitcoin:bc1qaddress?amount=0.1',
      style: defaultQrStyle
    });

    expect(screen.getByTestId('qr-payload')).toHaveTextContent('bitcoin:bc1qaddress?amount=0.1');
    await waitFor(() => expect(screen.getByTestId('qr-render-host').querySelector('svg')).toBeTruthy());
  });

  it('copies the payload when clipboard is available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    });

    render(QrPreview, {
      payload: 'monero:84PqAddress?tx_amount=1.23',
      style: defaultQrStyle
    });

    await fireEvent.click(screen.getByTestId('copy-payload'));

    expect(writeText).toHaveBeenCalledWith('monero:84PqAddress?tx_amount=1.23');
    expect(screen.getByTestId('copy-payload')).toHaveTextContent('Copied');
  });
});
