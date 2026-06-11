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
});
