"use client";

import {
  useEffect,
} from "react";

import Clarity from "@microsoft/clarity";

import {
  isAnalyticsOptedOut,
} from "@/lib/analytics-opt-out";

let initialized = false;

/**
 * Initializes Microsoft Clarity exactly once for session recordings,
 * heatmaps, and engagement insights.
 *
 * Renders nothing. Only runs in production and only when
 * NEXT_PUBLIC_CLARITY_PROJECT_ID is configured. Mount once in the root layout.
 */
export default function ClarityAnalytics() {
  useEffect(() => {
    if (initialized) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Never initialize or record on devices the owner excluded via
    // ?analytics=off (AnalyticsGate already prevents mounting, this is
    // defense in depth).
    if (isAnalyticsOptedOut()) {
      return;
    }

    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

    if (!projectId) {
      return;
    }

    initialized = true;
    Clarity.init(projectId);
  }, []);

  return null;
}
