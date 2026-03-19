const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return siteUrl.replace(/\/$/, "");
}
