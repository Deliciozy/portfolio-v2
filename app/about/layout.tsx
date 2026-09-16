import type { ReactNode } from "react";

import "./about.css";

type AboutLayoutProps = {
  children: ReactNode;
};

export default function AboutLayout({
  children,
}: AboutLayoutProps) {
  return children;
}