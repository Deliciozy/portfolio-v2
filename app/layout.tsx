import type { Metadata } from "next";

import "./globals.css";
import "./interactions.css";

export const metadata: Metadata = {
  title: "Mary Chen — Portfolio",
  description: "Portfolio of Mary Chen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}