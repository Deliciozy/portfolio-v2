# Portfolio V2 Development Rules

## Core Principle

This is a responsive, code-first portfolio website.

There must be a single source of truth for components, design tokens,
layout rules, typography, and motion.

The website must remain easy to visually redesign and maintain in the future.

---

## Responsive System

Use three discrete responsive modes:

- Mobile: below 768px
- Tablet: 768px–1199px
- Desktop: 1200px and above

Build mobile-first.

Every component must work from approximately 320px to large desktop screens.

Never create separate React components for desktop, tablet, and mobile.

Use one shared component and control responsive behavior through CSS.

---

## Typography Responsive Rules

Typography uses fixed sizes within each responsive mode.

Font sizes must NOT continuously scale with viewport width.

Do not use `clamp()` or viewport units such as `vw` for font sizes.

Within the same responsive mode:

- font size stays the same
- text may wrap differently
- line breaks may change
- available text width may change
- surrounding layout may reflow

Font size should only change when crossing a defined breakpoint.

Browser accessibility zoom must remain functional and must not be disabled.

---

## Breakpoints

Use these project-wide breakpoints.

### Mobile

Default styles.

```css
/* Mobile — default */
```

### Tablet

```css
@media (min-width: 768px) {
}
```

### Desktop

```css
@media (min-width: 1200px) {
}
```

Do not add additional breakpoints unless there is a clear layout problem
that cannot be solved cleanly with the existing responsive system.

Avoid device-specific breakpoints for individual phones, tablets, or laptops.

---

## Single Component Rule

Never create:

- ProjectCardDesktop
- ProjectCardTablet
- ProjectCardMobile
- HeroDesktop
- HeroTablet
- HeroMobile
- NavbarDesktop
- NavbarMobile

Create one shared component:

- ProjectCard
- Hero
- Navbar

Responsive behavior must live inside the shared component.

Changes to shared content, visuals, borders, images, interaction logic,
or component structure should propagate across all viewport sizes.

---

## Design System

Repeated visual values must come from shared design tokens.

This includes:

- colors
- typography
- font sizes
- font weights
- line heights
- letter spacing
- spacing
- page padding
- content width
- border radius
- borders
- motion duration
- easing

Avoid random one-off values.

Typography tokens must define fixed values for:

- Mobile
- Tablet
- Desktop

Components should consume shared typography tokens instead of
repeatedly hard-coding individual font sizes.

---

## Layout

Prefer natural document flow.

Use:

- CSS Grid
- Flexbox
- responsive widths
- percentages
- max-width
- min-width
- gap
- padding
- min()
- max()
- minmax()
- aspect-ratio

Layout may change at breakpoints.

Examples:

- one column → two columns
- vertical composition → horizontal composition
- three cards → two cards → one card
- desktop navigation → mobile navigation
- image beside text → image below text

Within the same breakpoint, elements should naturally wrap or reflow
when available space becomes smaller.

Avoid absolute positioning for primary page layout.

Absolute positioning should only be used intentionally for:

- decorative objects
- overlays
- animation layers
- intentionally overlapping visual compositions

Avoid fixed heights unless technically or visually necessary.

---

## Images and Media

All media must be responsive.

Images and video may resize with their containers even when typography
remains fixed.

Avoid fixed media dimensions that break smaller screens.

Use appropriate:

- width
- max-width
- height
- aspect-ratio
- object-fit

Images may:

- resize
- wrap
- stack
- move to another column
- change layout position at breakpoints

Media should remain visually high quality without unnecessarily hurting
performance.

---

## Spacing

Spacing uses shared design tokens.

Spacing may have separate fixed values for:

- Mobile
- Tablet
- Desktop

Examples:

- page padding
- section spacing
- card gaps
- internal card padding

Do not continuously scale spacing unless there is a specific design reason.

Avoid unexplained one-off spacing values.

---

## Motion

Motion must use a shared motion system.

Shared motion values should include:

- fast
- normal
- slow
- standard easing

Use Motion for React when animation logic requires it.

Use CSS transitions for simple visual state changes when sufficient.

Avoid arbitrary animation values scattered across components.

---

## Responsive Motion

Desktop hover behavior must never be the only way to access information.

Touch devices must receive an appropriate equivalent experience.

Desktop may use:

- hover reveals
- image scaling
- pointer interactions

Mobile / Touch must ensure:

- important metadata remains accessible
- pointer-dependent effects are reduced or removed
- excessive parallax is avoided

Respect `prefers-reduced-motion`.

Accessibility takes priority over decorative animation.

---

## Content Structure

Project content should be separated from visual components whenever possible.

Do not repeatedly hard-code the same project metadata inside different pages.

Shared project data may include:

- slug
- title
- year
- role
- category
- description
- cover image
- media
- credits

The same data should be reusable across:

- homepage
- project index
- case study pages
- related projects

---

## Component Architecture

Components should be reusable and composable.

Core layout primitives may include:

- Container
- Section
- Grid
- Stack

Reusable UI may include:

- Navbar
- ProjectCard
- Button
- Link
- Media
- Footer

Sections should compose shared primitives rather than recreate layout logic.

---

## AI Coding Rules

Before implementing any visual request:

1. Determine whether the change belongs to:
   - a global design token
   - a shared component
   - a section
   - a page

2. Modify the highest appropriate shared level.

3. Check behavior in:
   - Mobile
   - Tablet
   - Desktop

4. Never solve responsive problems by duplicating React components.

5. Do not use `clamp()` or `vw` for typography.

6. Typography must remain fixed within each responsive mode.

7. Prefer wrapping and layout reflow before introducing new breakpoints.

8. Preserve touch behavior.

9. Preserve reduced-motion accessibility.

10. Avoid fragile layout hacks and unexplained magic numbers.

11. Prefer Grid and Flexbox over absolute positioning for primary layout.

12. Preserve the existing design system unless a requested design change
requires updating it.

13. If a visual adjustment should affect the whole website, update the
appropriate global token instead of editing many components individually.

14. If a responsive issue appears at one width, first fix the underlying
layout rule instead of adding a new breakpoint.

---

## Visual Consistency

Typography hierarchy should remain consistent across the website.

Shared styles control:

- font family
- font size
- font weight
- line height
- letter spacing
- text color

Shared visual tokens control:

- background colors
- borders
- card surfaces
- radius
- spacing

Avoid slightly different versions of the same visual style across
multiple components unless there is a deliberate design reason.

---

## Definition of Done

A component is not finished when it only looks correct on desktop.

A component is finished only when:

- Mobile works
- Tablet works
- Desktop works
- intermediate widths within each breakpoint work
- typography remains fixed within each responsive mode
- text wrapping behaves correctly
- long text does not break the layout
- images and video remain responsive
- layout reflows cleanly
- hover has a touch equivalent when needed
- motion behaves appropriately
- reduced motion is respected
- no unnecessary duplicate components exist
- no unnecessary breakpoint hacks are introduced
- shared design tokens are used where appropriate