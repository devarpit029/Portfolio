---
version: 2.0
name: portfolio-design-system
description: Venu Gopal Reddy Palugulla — Full Stack AI Engineer portfolio. Premium OLED dark-first with purple-cyan palette, WebGL particle hero, and cinematic motion.
---

# Portfolio Design System

## Mode
**Experience** — portfolio showcase. The work leads from the first viewport; the interface recedes.

## Visual Identity

- **Theme:** OLED dark-first (dark mode primary, light mode secondary). True black (#000) background in dark.
- **Character:** Premium, cinematic, technical. Each section is a mini-experience.
- **Inspiration:** High-end developer portfolios, AAA game menus, premium tech brand landing pages.

## Colors

### Dark mode
| Token | HSL Value | Description |
|---|---|---|
| `--background` | `0 0% 0%` | True OLED black |
| `--foreground` | `0 0% 96%` | Near-white text |
| `--primary` | `271 81% 68%` | Purple accent (links, CTAs, active states) |
| `--accent` | `190 95% 60%` | Cyan secondary accent — tech edge |
| `--muted` | `0 0% 4%` | Subtle surface (elevated cards) |
| `--muted-foreground` | `0 0% 55%` | Secondary text |
| `--border` | `0 0% 10%` | Subtle dividers |
| `--card` | `0 0% 3%` | Card surface |
| `--glow` | `271 81% 68% / 12%` | Purple glow behind elements |
| `--glow-cyan` | `190 95% 60% / 10%` | Cyan glow for accent elements |

### Light mode
| Token | HSL Value |
|---|---|
| `--background` | `0 0% 100%` |
| `--foreground` | `0 0% 7%` |
| `--primary` | `271 81% 50%` |
| `--accent` | `190 95% 50%` |
| `--muted` | `0 0% 97%` |
| `--muted-foreground` | `0 0% 40%` |
| `--border` | `0 0% 90%` |
| `--card` | `0 0% 100%` |

### Color strategy
**Committed:** Deep neutral canvas with one saturated accent (purple) carrying 30-40% of interactive surfaces, plus cyan for secondary technical emphasis. Purple glow behind key foreground elements. Gradient text reserved for hero only.

## Typography

| Role | Font | Weight Range | Size Range |
|---|---|---|---|
| Body | DM Sans | 400–700 | 14px–18px |
| Display/Headings | Space Grotesk | 500–700 | 28px–72px |
| Code/Metrics | JetBrains Mono | 400–600 | 12px–16px |
| Labels/Metadata | System weights | 500–600 | 11px–13px |

- Body measure: 65–75ch
- Display max: 4.5rem (72px)
- Tracking: -0.02em to -0.04em on headings
- JetBrains Mono for stat values, code blocks, metric badges

## Spacing
- Section spacing: 180px (45 * 4) between major sections — more breathing room
- Card padding: 32px (p-8)
- Grid gap: 24px (gap-6)
- Tight groups (8–16px), generous separation (48px+ between sections)

## Layout
- Single-column scroll with fixed left sidebar nav (desktop)
- Content max-width constrained by `md:pl-48` sidebar offset
- Mobile: sidebar hidden, stacked content
- No vertical timeline line (replaced by scroll progress + section glow indicators)

## Components

### Section headings
Thin primary-colored line + Space Grotesk heading. Added subtle glow on the heading line on hover.

### Cards
- 1px border, 32px padding, rounded-xl (12px)
- Dark: `bg-card` with `border-border/50`
- Hover: border brightens to `border-primary/30`, subtle purple glow via box-shadow
- Transition: all 300ms ease

### Glass sections
- `bg-background/60 backdrop-blur-xl` for navbar and overlay elements
- Never glassmorphism as decoration — only for functional overlays

### Buttons (premium-btn)
- `premium-btn-primary`: filled gradient (purple → cyan), rounded-full, hover lift
- `premium-btn-outline`: bordered with glow, hover fills
- Rounded-full for premium feel, 12-14px font, medium weight

### Stats (StatCounter)
- Animated count-up on scroll reveal
- JetBrains Mono for values, DM Sans for labels
- Optional progress ring or underline bar

### Glow effects
- `box-shadow: 0 0 30px hsl(var(--glow))` on hero profile
- `box-shadow: 0 0 20px hsl(var(--glow-cyan))` on accent elements
- Gradient border on project cards via `::before` pseudo-element

## Motion

### Focal moments
1. **Hero particle field** — WebGL/Canvas background reacting to mouse (continuous, primary focal moment)
2. **Stat counters** — count-up on scroll reveal (1500ms ease-out)
3. **Profile glow ring** — subtle 4s pulse cycle
4. **Typewriter effect** — taglines cycling on hero (50ms/char)
5. **Scroll progress bar** — thin primary line at viewport top

### Scroll reveals
- Sections reveal with `cubic-bezier(0.16, 1, 0.3, 1)` easing
- Hero: staggered entrance (particles → profile → heading → subtitle → tags → CTAs → stats)
- Duration: 800ms entrance, 100ms stagger steps
- Uses IntersectionObserver, one-shot (unobserves after trigger)

### Interactive
- Magnetic hover on primary buttons (cursor-follow shift)
- 3D tilt on project cards (CSS perspective transform)
- Smooth border glow transition on hover (300ms)

### Reduced motion
All animations disabled when `prefers-reduced-motion: reduce`. Sections appear immediately, no scroll reveals, no particles, no typewriter, no counters.

## Accessibility
- `:focus-visible` rings in primary color on all interactive elements
- Skip navigation link as first focusable element
- Decorative SVGs and canvas marked `aria-hidden="true"`
- Theme transition: `transition-colors duration-300` on wrapper
- Dark/light mode respects `prefers-color-scheme`
- Color contrast: body text ≥4.5:1 in both modes
- Canvas particles check reduced motion before starting

## New Sections
- **Case Studies** — Deep-dive cards for PicScore and RoastMyCV with architecture diagrams and live metrics
- **Testimonials** — Social proof carousel with avatars and quotes
- **GitHub/LeetCode Stats** — Live API-driven contribution data, cached client-side

## What This System Refuses
- Gradient text for emphasis (except hero headline)
- Monospace as costume (reserved for actual code, data, metrics)
- Glassmorphism as decoration (functional overlays only)
- Colored border-left/border-right decorations on cards
- Emoji as icons (Lucide SVG icons only)
- Sparklines and progress rings as decoration
