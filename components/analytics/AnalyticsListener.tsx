"use client";

import {
  useEffect,
} from "react";

import {
  TRACK_EVENT_ATTR,
  TRACK_PARAMS_ATTR,
  trackEvent,
} from "@/lib/analytics";

import type {
  AnalyticsParams,
} from "@/lib/analytics";

/**
 * Global click listener that turns `data-track-event` declarations into
 * analytics events. Mount once in the root layout.
 *
 * Components declare tracking with `trackProps(eventName, params)` from
 * `@/lib/analytics` and stay server components — no onClick handlers,
 * no visual changes.
 *
 * Renders nothing. Only active in production (see `trackEvent`).
 */
export default function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const element = target?.closest?.(
        `[${TRACK_EVENT_ATTR}]`,
      ) as HTMLElement | null;

      if (!element) {
        return;
      }

      const eventName = element.getAttribute(TRACK_EVENT_ATTR);

      if (!eventName) {
        return;
      }

      let params: AnalyticsParams = {};

      try {
        params = JSON.parse(
          element.getAttribute(TRACK_PARAMS_ATTR) ?? "{}",
        ) as AnalyticsParams;
      } catch {
        params = {};
      }

      trackEvent(eventName, params);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
