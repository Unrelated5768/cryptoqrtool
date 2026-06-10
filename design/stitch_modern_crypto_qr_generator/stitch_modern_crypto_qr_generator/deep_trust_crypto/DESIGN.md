---
name: Deep Trust Crypto
colors:
  surface: '#11131c'
  surface-dim: '#11131c'
  surface-bright: '#373943'
  surface-container-lowest: '#0c0e17'
  surface-container-low: '#191b25'
  surface-container: '#1d1f29'
  surface-container-high: '#282934'
  surface-container-highest: '#32343f'
  on-surface: '#e1e1ef'
  on-surface-variant: '#c3c5d9'
  inverse-surface: '#e1e1ef'
  inverse-on-surface: '#2e303a'
  outline: '#8d90a2'
  outline-variant: '#434656'
  surface-tint: '#b7c4ff'
  primary: '#b7c4ff'
  on-primary: '#002682'
  primary-container: '#0052ff'
  on-primary-container: '#dfe3ff'
  inverse-primary: '#004ced'
  secondary: '#b7c8e1'
  on-secondary: '#213145'
  secondary-container: '#3a4a5f'
  on-secondary-container: '#a9bad3'
  tertiary: '#d2bbff'
  on-tertiary: '#3f008e'
  tertiary-container: '#7b39ec'
  on-tertiary-container: '#ecdfff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001452'
  on-primary-fixed-variant: '#0038b6'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#11131c'
  on-background: '#e1e1ef'
  surface-variant: '#32343f'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  address-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-desktop: 40px
  container-padding-mobile: 20px
  gutter: 24px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered for high-stakes financial interactions, specifically the generation and verification of crypto QR codes. The brand personality is **Institutional yet Innovative**, blending the reliability of traditional finance with the technical forwardness of Web3. 

The visual style utilizes **Modern Glassmorphism** and **Minimalism**. It relies on high-contrast surface layering to ensure information hierarchy is unmistakable. By using semi-transparent containers and subtle backdrop blurs, the UI maintains a sense of depth and sophistication without distracting from the primary task: the secure transfer of assets. Every interaction should feel intentional, precise, and secure, evoking an emotional response of total confidence and technical clarity.

## Colors

This design system utilizes a **Sophisticated Dark Mode** to reduce eye strain and highlight the luminous quality of the QR codes and action buttons. 

- **Primary (#0052FF):** Used for the most critical actions, such as "Generate" or "Confirm." It represents stability and institutional trust.
- **Secondary (#64748B):** A neutral slate used for secondary text and borders to maintain a clean, professional aesthetic.
- **Tertiary (#7C3AED):** A vibrant purple used sparingly for accenting Web3-specific features or secondary active states.
- **Functional Accents:** Success Green is reserved for confirmed transaction states and valid address checks. Warning Amber is strictly for security alerts or unverified addresses.
- **Surface Strategy:** The background is near-black, while UI components sit on slightly lighter slate-tinted surfaces to create perceived depth.

## Typography

Typography is optimized for technical accuracy. We use **Geist** for its precision and neutral, developer-friendly aesthetic across all UI labels and headings. 

For the most critical information—the wallet addresses—we switch to **JetBrains Mono**. This monospaced font ensures that every character (especially easily confused ones like '0' and 'O' or '1' and 'l') is distinct, preventing costly transaction errors. 

**Hierarchy Rules:**
- Use `headline-lg` for primary screen titles.
- Use `address-mono` for all alphanumeric crypto strings; these should always have a "Copy" icon adjacent.
- `label-sm` is used for metadata headers (e.g., "NETWORK," "FEE").

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to keep the QR code generator centered and focused, preventing visual sprawl. On mobile, it transitions to a fluid single-column layout.

**Spacing Rhythm:**
- A strict 8px base unit is used for all measurements.
- **Generous Whitespace:** Critical for high-stakes UI. The QR code must have a minimum "safe zone" padding of `stack-lg` (48px) to ensure no surrounding elements interfere with camera scanning.
- **Breakpoints:** 
    - Mobile: < 640px (Margins: 20px)
    - Tablet: 640px - 1024px (Margins: 32px)
    - Desktop: > 1024px (Fixed content width of 1200px)

## Elevation & Depth

Depth is achieved through **Glassmorphic Tonal Layers** rather than heavy drop shadows. 

- **Level 0 (Background):** Solid `#020617`.
- **Level 1 (Main Card):** Background blur (20px) with a semi-transparent slate fill (80% opacity) and a 1px solid border (`#ffffff10`).
- **Level 2 (Active Inputs/Buttons):** These use a primary color glow—a very soft, low-opacity outer shadow (`#0052FF30`) to indicate focus and interactivity.
- **Glass Effect:** Use a linear gradient stroke (top-to-bottom) on card borders to simulate a light source catching the top edge of the "glass."

## Shapes

The shape language is **Refined and Modern**. 

- **Primary Containers:** Use `rounded-xl` (1.5rem / 24px) to give the application a soft, approachable feel despite its technical nature.
- **Buttons and Inputs:** Use `rounded-lg` (1rem / 16px).
- **QR Code Blocks:** The QR code itself should have a subtle rounding (approx 2px) on its individual data modules if the generator supports it, matching the outer container's aesthetic.
- **Interactive States:** On hover, buttons should not change size but may increase their inner "glow" or border brightness.

## Components

**Buttons:**
- **Primary:** Solid `#0052FF` with white text. High-contrast and bold.
- **Secondary/Ghost:** Transparent background with a `1px` border of `#64748B`.
- **Icon Buttons:** Circular or slightly rounded squares used for "Copy" and "Share" actions.

**QR Code Container:**
- The central component. It must be white or very high-contrast light gray to ensure maximum scannability against the dark UI. It sits inside a `rounded-xl` glass container with a clear "Copy Address" label underneath.

**Input Fields:**
- Large padding (`16px 20px`).
- Darker background than the card surface to create an "inset" feel.
- Focus state: `1px` primary blue border with a subtle outer glow.

**Security Badges (Chips):**
- Small, `rounded-full` pills used to indicate network status (e.g., "Ethereum Mainnet" or "Verified Address"). These use the success and warning colors with low-opacity backgrounds (e.g., green text on a 10% green background).

**Iconography:**
- Use thin-stroke (1.5pt) linear icons. Icons should be clear and functional: a "shield" for security, a "document" for logs, and a "square-within-square" for copying addresses.