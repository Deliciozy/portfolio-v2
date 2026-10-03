"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  applyAnalyticsQueryParam,
  isAnalyticsOptedOut,
} from "@/lib/analytics-opt-out";

/**
 * Mounts analytics children only on devices that did not opt out.
 *
 * The check must happen client-side (localStorage), so on the very first
 * render nothing is mounted; after hydration the flag is read — along
 * with any one-time `?analytics=off|on` param — and analytics mount only
 * for normal visitors. Opted-out browsers never initialize GA, Clarity,
 * Speed Insights, or the click listener, because those components are
 * never created.
 *
 * Renders nothing visible either way.
 */
export default function AnalyticsGate({
  children,
}: {
  children: ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    applyAnalyticsQueryParam();
    setEnabled(!isAnalyticsOptedOut());
  }, []);

  if (!enabled) {
    return null;
  }

  return <>{children}</>;
}
