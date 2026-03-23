export function getGaMeasurementId(): string {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
}

export function isAnalyticsEnabled(): boolean {
  return getGaMeasurementId().length > 0;
}
