import { browser } from '$app/environment';

export type AnalyticsProperties = Record<string, boolean | number | string | null | undefined>;

type UmamiTracker = {
  track: (eventName?: string | Record<string, unknown>, data?: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (!browser || !window.umami) return;

  const data = Object.fromEntries(
    Object.entries(properties).filter((entry): entry is [string, boolean | number | string] => entry[1] !== null && entry[1] !== undefined)
  );

  window.umami.track(eventName, data);
}
