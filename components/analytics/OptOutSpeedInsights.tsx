"use client";

import {
  SpeedInsights,
} from "@vercel/speed-insights/next";

import {
  isAnalyticsOptedOut,
} from "@/lib/analytics-opt-out";

/**
 * Vercel Speed Insights that respects the device-level analytics opt-out.
 *
 * This component normally only mounts inside AnalyticsGate (so opted-out
 * devices never load it at all). The `beforeSend` hook is defense in
 * depth: if it ever does mount on an opted-out device, every performance
 * event is cancelled before it leaves the browser.
 */
export default function OptOutSpeedInsights() {
  return (
    <SpeedInsights
      beforeSend={(event) =>
        (isAnalyticsOptedOut() ? null : event)
      }
    />
  );
}
