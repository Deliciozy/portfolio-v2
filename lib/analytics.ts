/**
 * Central analytics utility for the portfolio.
 *
 * Recruiter-relevant events are fanned out to Google Analytics 4
 * (via @next/third-parties) and Microsoft Clarity (via @microsoft/clarity)
 * from this single module — do not scatter gtag/clarity calls across
 * components.
 *
 * How tracking is wired to the UI:
 * - Components stay server components. They declare intent with data
 *   attributes via `trackProps(eventName, params)`.
 * - `AnalyticsListener` (one client component mounted in the root layout)
 *   listens for clicks on `[data-track-event]` and calls `trackEvent`.
 *
 * Safety rules:
 * - Everything is disabled outside production builds, so local development
 *   never pollutes recruiter analytics.
 * - Each provider only fires when its ID is configured; the site works
 *   normally when IDs are missing.
 * - No visual output, no layout effects, no PII in event params.
 */

import {
  sendGAEvent,
} from "@next/third-parties/google";

import Clarity from "@microsoft/clarity";

/** Canonical event names shared by the Next.js app and the static case-study pages. */
export const AnalyticsEvents = {
  PROJECT_CARD_CLICK: "project_card_click",
  CASE_STUDY_VIEW: "case_study_view",
  CASE_STUDY_25_PERCENT: "case_study_25_percent",
  CASE_STUDY_50_PERCENT: "case_study_50_percent",
  CASE_STUDY_75_PERCENT: "case_study_75_percent",
  CASE_STUDY_90_PERCENT: "case_study_90_percent",
  RESUME_CLICK: "resume_click",
  LINKEDIN_CLICK: "linkedin_click",
  EMAIL_CLICK: "email_click",
  NEXT_PROJECT_CLICK: "next_project_click",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

export type AnalyticsParams = Record<
  string,
  string | number | boolean | undefined
>;

/** Attribute that marks an element for click tracking. */
export const TRACK_EVENT_ATTR = "data-track-event";

/** Attribute carrying JSON-encoded event params for a tracked element. */
export const TRACK_PARAMS_ATTR = "data-track-params";

const isProduction = process.env.NODE_ENV === "production";
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

function canTrack(): boolean {
  return (
    isProduction && typeof window !== "undefined"
  );
}

/**
 * Returns props to spread onto a link/button to track its clicks.
 * Keeps the host component a server component — no onClick needed.
 *
 * Example:
 *   <Link href="/resume" {...trackProps(AnalyticsEvents.RESUME_CLICK, { location: "nav" })}>
 */
export function trackProps(
  eventName: string,
  params: AnalyticsParams = {},
): Record<string, string> {
  return {
    [TRACK_EVENT_ATTR]: eventName,
    [TRACK_PARAMS_ATTR]: JSON.stringify(params),
  };
}

/**
 * Sends one event to every configured provider.
 * Automatically attaches the current page path. Never throws.
 */
export function trackEvent(
  eventName: string,
  params: AnalyticsParams = {},
): void {
  if (!canTrack()) {
    return;
  }

  const cleanParams: Record<string, string | number | boolean> = {
    page_path: window.location.pathname,
  };

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      cleanParams[key] = value;
    }
  }

  if (gaId) {
    try {
      sendGAEvent("event", eventName, cleanParams);
    } catch {
      // Analytics must never break the site.
    }
  }

  if (clarityProjectId) {
    try {
      Clarity.event(eventName);
    } catch {
      // Analytics must never break the site.
    }
  }
}

/** Homepage "View case" click. */
export function trackProjectCardClick(
  projectName: string,
  destination: string,
): void {
  trackEvent(AnalyticsEvents.PROJECT_CARD_CLICK, {
    project_name: projectName,
    destination,
  });
}

/** Resume link click. `location` describes where the link lives ("nav", "footer"). */
export function trackResumeClick(
  location: string,
  destination: string,
): void {
  trackEvent(AnalyticsEvents.RESUME_CLICK, {
    location,
    destination,
  });
}

/** LinkedIn profile link click. */
export function trackLinkedInClick(destination: string): void {
  trackEvent(AnalyticsEvents.LINKEDIN_CLICK, {
    destination,
  });
}

/** Email/contact link click. */
export function trackEmailClick(destination: string): void {
  trackEvent(AnalyticsEvents.EMAIL_CLICK, {
    destination,
  });
}

/** Case-study "next project" click. */
export function trackNextProjectClick(
  projectName: string,
  destination: string,
): void {
  trackEvent(AnalyticsEvents.NEXT_PROJECT_CLICK, {
    project_name: projectName,
    destination,
  });
}
