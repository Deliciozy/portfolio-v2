#!/usr/bin/env node
/**
 * Build-time generator for the static case-study analytics snippet.
 *
 * Runs automatically as the npm `prebuild` hook (before `next build`).
 *
 * Why this exists: the case-study pages (/projects/*) are static HTML files
 * served via rewrites, so they cannot read NEXT_PUBLIC_* environment
 * variables at runtime. This script bakes NEXT_PUBLIC_GA_ID and
 * NEXT_PUBLIC_CLARITY_PROJECT_ID into public/case-study-analytics.js at
 * build time, keeping the environment variables as the single source of
 * truth. No hand-editing IDs into JS files, no duplicate Clarity setup.
 *
 * If an env var is missing, the corresponding feature degrades gracefully:
 * an empty Clarity ID disables Clarity on the static pages, and an empty
 * GA ID skips the gtag bootstrap (pages that load gtag themselves are
 * unaffected).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = join(root, "public", "case-study-analytics.template.js");
const outPath = join(root, "public", "case-study-analytics.js");

const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";
const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "";

const template = readFileSync(templatePath, "utf8");
const output = template
  .replaceAll("__GA_ID__", gaId)
  .replaceAll("__CLARITY_PROJECT_ID__", clarityId);

writeFileSync(outPath, output);
console.log(
  `[analytics] wrote public/case-study-analytics.js ` +
    `(NEXT_PUBLIC_GA_ID=${gaId ? "set" : "missing"}, ` +
    `NEXT_PUBLIC_CLARITY_PROJECT_ID=${clarityId ? "set" : "missing"})`
);
