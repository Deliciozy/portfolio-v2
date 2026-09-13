"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 24,
  once = true,
}: RevealProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? {
              opacity: 1,
            }
          : {
              opacity: 0,
              y: distance,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once,
        amount: 0.15,
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0
            : 0.6,

        delay:
          shouldReduceMotion
            ? 0
            : delay,

        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
    >
      {children}
    </motion.div>
  );
}