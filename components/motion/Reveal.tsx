"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useEffect,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

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

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Important:
   * Before JavaScript finishes loading,
   * render normal visible content.
   *
   * This prevents the portfolio from
   * becoming invisible if Motion fails
   * to initialize on a device.
   */
  if (!mounted) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
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