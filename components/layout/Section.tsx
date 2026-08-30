import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Section({
  children,
  size = "md",
  className = "",
}: SectionProps) {
  return (
    <section
      className={`site-section ${className}`}
      data-size={size}
    >
      {children}
    </section>
  );
}