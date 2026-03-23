import { getGaMeasurementId, isAnalyticsEnabled } from "./index";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

function canTrack(): boolean {
  return hasWindow() && isAnalyticsEnabled() && typeof window.gtag === "function";
}

export function trackPageView(url: string): void {
  if (!canTrack()) {
    return;
  }

  const measurementId = getGaMeasurementId();
  window.gtag("config", measurementId, {
    page_path: url
  });
}

export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (!canTrack()) {
    return;
  }

  window.gtag("event", eventName, params);
}
