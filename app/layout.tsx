import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSiteUrl } from "../lib/site-config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Engineering Stack Portal",
    template: "%s | Engineering Stack Portal"
  },
  description:
    "SEO-first editorial portal built with Next.js, TypeScript, and a WordPress headless CMS.",
  alternates: {
    canonical: siteUrl
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
