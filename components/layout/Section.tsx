import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
};

export default function Section({
  children,
  size = "md",
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`site-section ${className}`}
      data-size={size}
    >
      {children}
    </section>
  );
}