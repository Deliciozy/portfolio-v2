/**
 * TEMPLATE — do not edit the generated file by hand.
 *
 * Analytics for the static case-study pages (/projects/*).
 *
 * These pages are pre-built HTML served via rewrites, so the Next.js root
 * layout (and its analytics components) does not apply to them. This one
 * shared script gives them the same coverage:
 *
 * - Microsoft Clarity (session recordings, heatmaps)
 * - case_study_view event to GA4 (the page already loads gtag itself)
 * - case_study_25/50/75/90_percent scroll-depth events to GA4 + Clarity,
 *   fired once per threshold per page view
 *
 * Invisible: no UI, no visual changes. Disabled on localhost so local
 * previews never pollute recruiter analytics.
 *
 * How the IDs get in: static files cannot read environment variables at
 * runtime, so `scripts/generate-case-study-analytics.mjs` (run automatically
 * as the npm `prebuild` hook) replaces the ID placeholders in the two `var`
 * assignments below with NEXT_PUBLIC_GA_ID and
 * NEXT_PUBLIC_CLARITY_PROJECT_ID, and writes the result to
 * public/case-study-analytics.js. The environment variables are the single
 * source of truth — never paste an ID into the generated file by hand.
 */
(function () {
  "use strict";

  // Device-level analytics opt-out (same flag as the Next.js app — these
  // pages share this origin's localStorage). When set, e.g. via
  // https://marychen.me/?analytics=off, the entire snippet exits here:
  // no Clarity init, no gtag bootstrap, no view or scroll-depth events.
  var OPT_OUT_KEY = "portfolio_analytics_opt_out";

  function consumeOptOutParam() {
    try {
      var params = new URLSearchParams(window.location.search);
      var mode = params.get("analytics");
      if (mode !== "off" && mode !== "on") {
        return;
      }
      if (mode === "off") {
        window.localStorage.setItem(OPT_OUT_KEY, "true");
      } else {
        window.localStorage.removeItem(OPT_OUT_KEY);
      }
      params.delete("analytics");
      var query = params.toString();
      window.history.replaceState(
        null,
        "",
        window.location.pathname +
          (query ? "?" + query : "") +
          window.location.hash
      );
    } catch (e) {
      // Analytics must never break the page.
    }
  }

  function isOptedOut() {
    try {
      consumeOptOutParam();
      return window.localStorage.getItem(OPT_OUT_KEY) === "true";
    } catch (e) {
      return false;
    }
  }

  if (isOptedOut()) {
    return;
  }

  // Replaced at build time from NEXT_PUBLIC_CLARITY_PROJECT_ID.
  // Empty string = Clarity disabled on the static case-study pages.
  var CLARITY_PROJECT_ID = "";

  // Replaced at build time from NEXT_PUBLIC_GA_ID.
  // Empty string = gtag bootstrap skipped (pages that load gtag themselves
  // still report to their own hardcoded ID).
  var GA_ID = "";

  var isLocalhost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(
    window.location.hostname
  );
  if (isLocalhost) {
    return;
  }

  // Project slug from paths like /projects/agent-studio
  var slugMatch = window.location.pathname.match(/\/projects\/([^\/?#]+)/);
  var projectSlug = slugMatch ? slugMatch[1] : "unknown";

  function sendGtagEvent(eventName, params) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
      }
    } catch {
      // Analytics must never break the page.
    }
  }

  function sendClarityEvent(eventName) {
    try {
      if (typeof window.clarity === "function") {
        window.clarity("event", eventName);
      }
    } catch {
      // Analytics must never break the page.
    }
  }

  // Boot gtag when the page doesn't load it itself (only agent-studio.html
  // does). Queued events flush once the library arrives.
  function ensureGtag() {
    if (!GA_ID) {
      return;
    }
    if (typeof window.gtag === "function") {
      return;
    }
    try {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_ID);
      var s = document.createElement("script");
      s.async = true;
      s.src =
        "https://www.googletagmanager.com/gtag/js?id=" +
        encodeURIComponent(GA_ID);
      var first = document.getElementsByTagName("script")[0];
      if (first && first.parentNode) {
        first.parentNode.insertBefore(s, first);
      } else {
        document.head.appendChild(s);
      }
    } catch {
      // Analytics must never break the page.
    }
  }

  ensureGtag();

  // 1. Microsoft Clarity (only when configured)
  if (CLARITY_PROJECT_ID) {
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  }

  // 2. Case-study view (page_view is already automatic via the page's gtag config)
  sendGtagEvent("case_study_view", {
    project_slug: projectSlug,
    page_path: window.location.pathname,
  });

  // 3. Scroll depth — each threshold fires once per page view
  var fired = {};
  var thresholds = [25, 50, 75, 90];

  function currentDepthPercent() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) {
      return 100;
    }
    var scrolled = window.scrollY || window.pageYOffset || 0;
    return Math.min(100, Math.round((scrolled / max) * 100));
  }

  function checkDepth() {
    var depth = currentDepthPercent();
    for (var k = 0; k < thresholds.length; k++) {
      var t = thresholds[k];
      if (depth >= t && !fired[t]) {
        fired[t] = true;
        var eventName = "case_study_" + t + "_percent";
        sendGtagEvent(eventName, {
          project_slug: projectSlug,
          page_path: window.location.pathname,
          depth_percent: t,
        });
        sendClarityEvent(eventName);
      }
    }
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(function () {
          checkDepth();
          ticking = false;
        });
      }
    },
    { passive: true }
  );

  checkDepth();
})();
