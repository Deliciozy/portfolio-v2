import type {
  Metadata,
} from "next";

import type {
  ReactNode,
} from "react";

import {
  GoogleAnalytics,
} from "@next/third-parties/google";

import {
  SpeedInsights,
} from "@vercel/speed-insights/next";

import AnalyticsListener from "@/components/analytics/AnalyticsListener";
import ClarityAnalytics from "@/components/analytics/ClarityAnalytics";
import CustomCursor from "@/components/ui/CustomCursor";

import "./globals.css";
import "./framer-fonts.css";
import "./capability-card.css";
import "./interactions.css";

export const metadata: Metadata = {
  title:
    "Mary Chen — Product Designer",

  description:
    "Product design portfolio of Mary Chen.",
};

type RootLayoutProps = {
  children:
    ReactNode;
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const isProduction = process.env.NODE_ENV === "production";

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />

        {children}

        {isProduction && gaId ? (
          <GoogleAnalytics gaId={gaId} />
        ) : null}

        {isProduction ? (
          <>
            <ClarityAnalytics />
            <AnalyticsListener />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}