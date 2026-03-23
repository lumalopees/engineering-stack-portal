import { afterEach, describe, expect, it, vi } from "vitest";
import { trackEvent, trackPageView } from "../../lib/analytics/events";

describe("analytics events", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (globalThis as any).window;
  });

  it("does nothing in SSR context when window is unavailable", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST1234");

    expect(() => {
      trackPageView("/home");
      trackEvent("view_home", { article_count: 1 });
    }).not.toThrow();
  });

  it("sends page view and custom event when GA is enabled in browser context", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST1234");
    const gtag = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).window = {
      gtag,
      dataLayer: []
    };

    trackPageView("/article/test");
    trackEvent("view_article", { article_slug: "test" });

    expect(gtag).toHaveBeenCalledWith("config", "G-TEST1234", { page_path: "/article/test" });
    expect(gtag).toHaveBeenCalledWith("event", "view_article", { article_slug: "test" });
  });

  it("does not track when measurement id is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    const gtag = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).window = {
      gtag,
      dataLayer: []
    };

    trackPageView("/home");
    trackEvent("view_home");

    expect(gtag).not.toHaveBeenCalled();
  });
});
