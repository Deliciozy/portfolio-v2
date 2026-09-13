"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import type { ReactNode } from "react";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

export default function StaggerGroup({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
}: StaggerGroupProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren:
              shouldReduceMotion
                ? 0
                : delay,

            staggerChildren:
              shouldReduceMotion
                ? 0
                : stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
};

export function StaggerItem({
  children,
  className = "",
  distance = 20,
}: StaggerItemProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden:
          shouldReduceMotion
            ? {
                opacity: 1,
              }
            : {
                opacity: 0,
                y: distance,
              },

        visible: {
          opacity: 1,
          y: 0,

          transition: {
            duration:
              shouldReduceMotion
                ? 0
                : 0.55,

            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}