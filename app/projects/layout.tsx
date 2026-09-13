import type { ReactNode } from "react";

import "./projects.css";

type ProjectsLayoutProps = {
  children: ReactNode;
};

export default function ProjectsLayout({
  children,
}: ProjectsLayoutProps) {
  return children;
}
