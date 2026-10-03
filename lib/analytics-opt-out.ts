/**
 * Central device-level analytics opt-out for the portfolio.
 *
 * A single browser-stored flag — localStorage key
 * "portfolio_analytics_opt_out" — permanently excludes one
 * browser/device from ALL portfolio analytics. It survives IP changes,
 * cellular vs Wi-Fi switches, and restarts, because it lives in the
 * browser itself rather than in any network identifier.
 *
 * How the flag gets set:
 * - Visit https://marychen.me/?analytics=off  → sets the flag
 * - Visit https://marychen.me/?analytics=on   → clears the flag
 * `applyAnalyticsQueryParam()` consumes the query param once and then
 * removes it from the visible URL via history.replaceState.
 *
 * Who honors it (all through `isAnalyticsOptedOut()` — do not add
 * separate opt-out checks elsewhere):
 * - AnalyticsGate: never mounts GA / Clarity / Speed Insights / the
 *   click listener when opted out.
 * - lib/analytics.ts: `trackEvent()` is a no-op when opted out.
 * - ClarityAnalytics: refuses to init when opted out (defense in depth).
 * - Speed Insights: `beforeSend` cancels every event when opted out.
 * - public/case-study-analytics.js: the whole snippet exits early when
 *   opted out (the static pages share this origin's localStorage).
 */

export const ANALYTICS_OPT_OUT_KEY = "portfolio_analytics_opt_out";

/** True when this browser/device opted out of all portfolio analytics. */
export function isAnalyticsOptedOut(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return (
      window.localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === "true"
    );
  } catch {
    // Storage unavailable (private mode, blocked): fail open so normal
    // visitors are still tracked; the owner can use another browser.
    return false;
  }
}

/** Persistently opts this browser/device out of (or back into) analytics. */
export function setAnalyticsOptOut(optOut: boolean): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    if (optOut) {
      window.localStorage.setItem(ANALYTICS_OPT_OUT_KEY, "true");
    } else {
      window.localStorage.removeItem(ANALYTICS_OPT_OUT_KEY);
    }
  } catch {
    // Analytics must never break the site.
  }
}

/**
 * Consumes a one-time `?analytics=off` / `?analytics=on` query param:
 * applies it to the persistent flag, then removes it from the visible URL.
 * Returns true when a param was handled.
 */
export function applyAnalyticsQueryParam(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("analytics");
    if (mode !== "off" && mode !== "on") {
      return false;
    }
    setAnalyticsOptOut(mode === "off");
    params.delete("analytics");
    const query = params.toString();
    const cleanUrl =
      window.location.pathname +
      (query ? `?${query}` : "") +
      window.location.hash;
    window.history.replaceState(null, "", cleanUrl);
    return true;
  } catch {
    return false;
  }
}
