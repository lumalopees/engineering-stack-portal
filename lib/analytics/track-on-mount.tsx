"use client";

import { useEffect } from "react";
import { trackEvent } from "./events";

interface TrackOnMountProps {
  eventName: string;
  params?: Record<string, string | number | boolean | undefined>;
}

export function TrackOnMount({ eventName, params }: TrackOnMountProps) {
  useEffect(() => {
    trackEvent(eventName, params);
  }, [eventName, params]);

  return null;
}
