"use client";

import Script from "next/script";
import type { ReactNode } from "react";
import { getGaMeasurementId, isAnalyticsEnabled } from "./index";
import { PageViewTracker } from "./page-view-tracker";

export default function AnalyticsProvider({ children }: { children: ReactNode }) {
  if (!isAnalyticsEnabled()) {
    return <>{children}</>;
  }

  const measurementId = getGaMeasurementId();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
      <PageViewTracker />
      {children}
    </>
  );
}
