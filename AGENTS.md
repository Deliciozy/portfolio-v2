# Portfolio V2 Development Rules

## Core Principle

This is a responsive, code-first portfolio website.

There must be a single source of truth for components, design tokens,
layout rules, and motion.

The website must remain easy to visually redesign in the future.

---

## Responsive

- Build mobile-first.
- Every component must work from 320px to large desktop screens.
- Never create separate desktop and mobile versions of the same component.
- Prefer fluid responsive behavior over device-specific layouts.
- Prefer CSS Grid, Flexbox, clamp(), min(), max(), minmax(), and aspect-ratio.
- Use breakpoints mainly when layout structure needs to change.
- Avoid excessive breakpoint-specific overrides.
- Avoid fixed heights unless technically necessary.
- Avoid absolute positioning for primary page layout.

A shared component must automatically adapt across mobile, tablet,
desktop, and wide screens.

---

## Single Component Rule

Never create:

- ProjectCardDesktop
- ProjectCardMobile
- HeroDesktop
- HeroMobile

Create one:

- ProjectCard
- Hero

Responsive behavior must live inside the shared component.

Changes to a shared component must propagate across all viewport sizes.

---

## Design System

Repeated visual values must come from shared design tokens.

This includes:

- colors
- typography
- spacing
- page padding
- content width
- border radius
- borders
- motion duration
- easing

Avoid random one-off values.

Prefer fluid values such as:

font-size: clamp(3rem, 8vw, 8rem)

---

## Layout

Prefer natural document flow.

Use:

- CSS Grid
- Flexbox
- responsive widths
- max-width
- gap
- padding

Avoid absolute positioning for primary layouts.

Absolute positioning should only be used intentionally for things such as:

- decorative objects
- overlays
- animation layers

---

## Motion

Motion must use a shared motion system.

Shared motion values should include:

- fast
- normal
- slow
- standard easing

Desktop hover behavior must never be the only way to access information.

Touch devices must receive an appropriate equivalent experience.

Respect prefers-reduced-motion.

Use Motion for React when animation logic requires it.

Use CSS transitions for simple visual state changes when sufficient.

---

## Images and Media

All media must be responsive.

Avoid fixed dimensions that break smaller screens.

Use appropriate:

- width
- height
- aspect-ratio
- object-fit

Images and video should remain visually high quality without
unnecessarily hurting performance.

---

## AI Coding Rules

Before implementing any visual request:

1. Determine whether the change belongs to a global token, shared component,
   section, or page.
2. Modify the highest appropriate shared level.
3. Check mobile, tablet, and desktop behavior.
4. Never solve responsive problems by duplicating components.
5. Preserve touch behavior.
6. Preserve reduced-motion accessibility.
7. Avoid fragile layout hacks and unexplained magic numbers.
8. Prefer a maintainable responsive solution over a quick patch.

---

## Definition of Done

A component is not finished when it only looks correct on desktop.

A component is finished only when:

- mobile works
- tablet works
- desktop works
- intermediate widths work
- long text does not break the layout
- media remains responsive
- hover has a touch equivalent when needed
- motion behaves appropriately
- reduced motion is respected