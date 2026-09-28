"use client";

import {
  useEffect,
} from "react";

import GlowCursor from "@/components/GlowCursor";

export default function CustomCursor() {
  useEffect(() => {
    const getGlowLayer = () =>
      document.querySelector<HTMLElement>(
        ".portfolio-glow-cursor",
      );

    const forwardPointerMove = (
      event: PointerEvent,
    ) => {
      const glowLayer =
        getGlowLayer();

      if (!glowLayer) {
        return;
      }

      const forwardedEvent =
        new PointerEvent(
          "pointermove",
          {
            clientX:
              event.clientX,

            clientY:
              event.clientY,

            pointerId:
              event.pointerId,

            pointerType:
              event.pointerType,

            isPrimary:
              event.isPrimary,

            bubbles: false,
          },
        );

      glowLayer.dispatchEvent(
        forwardedEvent,
      );
    };

    window.addEventListener(
      "pointermove",
      forwardPointerMove,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        forwardPointerMove,
      );
    };
  }, []);

  return (
    <>
      <div
        className="portfolio-cursor-layer"
        aria-hidden="true"
      >
        <GlowCursor
          className="portfolio-glow-cursor"

          color="#FF8A3D"
          secondaryColor="#F97316"

          trailLength={19}
          trailWidth={24}

          trailTaper={0.88}

          /*
           * Slower, smoother following.
           *
           * Previous: 0.5
           * New:      0.32
           */
          followSpeed={0.32}

          glowIntensity={0.1}

          glowSpread={1.45}

          hotspot={0.95}

          brightness={0.85}

          opacity={1}

          pulseSpeed={3.4}

          noiseStrength={0.035}

          /*
           * Never disappear when idle.
           */
          idleFade={false}

          idleTimeout={600}

          fadeDuration={900}

          blendMode="screen"

          maxDevicePixelRatio={1.5}

          enabled={true}

          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </div>

      <style jsx global>{`
        .portfolio-cursor-layer {
          position: fixed;

          inset: 0;

          width: 100vw;
          height: 100vh;

          z-index: 99999;

          overflow: hidden;

          pointer-events: none;

          user-select: none;

          contain: strict;
        }

        .portfolio-glow-cursor {
          position: absolute !important;

          inset: 0 !important;

          width: 100% !important;
          height: 100% !important;

          overflow: hidden;

          pointer-events: none !important;
        }

        .portfolio-glow-cursor
          canvas {
          position: absolute;

          inset: 0;

          width: 100% !important;
          height: 100% !important;

          pointer-events: none;

          user-select: none;
        }

        @media (pointer: fine) {
          html,
          body,
          a,
          button,
          input,
          textarea,
          select,
          [role="button"] {
            cursor: none !important;
          }
        }

        @media (pointer: coarse) {
          .portfolio-cursor-layer {
            display: none;
          }
        }

        @media (
          prefers-reduced-motion:
            reduce
        ) {
          .portfolio-cursor-layer {
            display: none;
          }

          html,
          body,
          a,
          button,
          input,
          textarea,
          select,
          [role="button"] {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}