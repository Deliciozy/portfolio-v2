import type {
  Metadata,
} from "next";

import type {
  ReactNode,
} from "react";

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

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />

        {children}
      </body>
    </html>
  );
}