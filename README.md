# Counterpose

A boutique recovery studio landing page. Full page: hero, method, room,
sessions, membership.

## Concept

```
BRAND ESSENCE     Counterweight.
VISUAL TENSION    Exertion vs. stillness, expressed as heat vs. cold —
                  a warm bone/ink ground carrying one cold accent.
SIGNATURE MOMENT  The Tempo Rule: a breath metronome drawn as a lab
                  instrument, pacing 5.5 breaths/min. The hero breathes
                  with it, and the same instrument becomes the page's
                  spine — section rail, session structure, timetable.
TECH AMBITION     One GSAP master timeline, Lenis-driven ScrollTrigger,
                  magnetic CTA, blend-mode cursor, transform/opacity only.
```

## Stack

Next.js 15 (App Router) · Tailwind CSS v4 · GSAP 3.13 + ScrollTrigger · Lenis

```bash
npm install
npm run dev
```

## Design tokens

All in `app/globals.css` under `@theme`.

| Token | Value | Role |
|---|---|---|
| `--color-bone` | `#EAE5DB` | warm-white ground |
| `--color-ink` | `#141110` | warm-black — display type |
| `--color-plunge` | `#2743F0` | the accent, on bone |
| `--color-plunge-lift` | `#6E80FF` | the accent, on ink |

Never `#000` / `#fff`. The plate stand-in sits at `#191512` — one step off
true ink, so the display type stays the darkest thing on the page.

Type: Space Grotesk (display + body), Instrument Serif italic (the accent
word), Space Mono (instrument labels). Loaded via `next/font`, so they are
subset, self-hosted and preloaded. Scale runs ~200px display against 11px
mono — roughly 18:1.

Easing: house curves only, defined as `--ease-*` custom properties and their
GSAP equivalents in `lib/gsap.ts`. No `ease`, no `linear`.

## Photography

Four plates in `public/plates/`, served through `next/image` with `fill` +
`object-cover`. Each slot reserves its space by `aspect-ratio`, so swapping a
file in costs zero layout shift.

| File | Slot | Aspect |
|---|---|---|
| `plate-01-recovery-room.jpg` | Hero — `priority` | 4/5 (3/2 on mobile) |
| `plate-02-floor.jpg` | Room, large left | 4/5 |
| `plate-03-reformer.jpg` | Room, centre | 1/1 |
| `plate-04-recovery-bay.jpg` | Room, right | 3/4 |

> **These are AI-generated placeholders.** They depict rooms that do not exist
> and carry a SynthID watermark. They stand in for a real shoot — do not ship
> them as photographs of the actual studio.

A plate is three layers, and each owns exactly one transform:

```
figure.anim-plate            overflow-hidden, aspect-ratio reserves the space
└── [data-plate-reveal]      the mask reveal
    ├── [data-parallax]      scroll drift — OVERSCANNED 15% top and bottom,
    │   └── PlateFill        because the drift would otherwise expose an edge
    └── PlateFurniture       scrim, registration marks, caption — PINNED
```

The furniture sits outside the parallax wrapper on purpose: a caption belongs
to the plate, not to the photograph, so it must not drift out of frame as the
picture travels. The hero repeats the structure with its own parallax and the
extra `[data-breath="plate"]` scale layer.

Only `object-position` differs per slot, and only where the rendered aspect
differs from the file's — the hero is `center 55%` so its 3/2 mobile crop keeps
the windows and the mat together.

## Open items for the client

- **CTA destination.** `href="#book"` in `Hero.tsx` and `Header.tsx` is a
  placeholder pending the booking decision (form / WhatsApp / Mindbody).
- **Placeholder copy.** Location, session times, ratios, plate captions,
  street address and `hello@counterpose.studio`.
- **Unverified claims.** The copy now makes claims the studio has to be able
  to keep. Each is marked `TODO(client)` at its source:
  `Hero.tsx` — the `06` mats cap and `100%` physio-led figures;
  `Room.tsx` — "one physio" and the `1:6` coach ratio;
  `Membership.tsx` — the first-session refund promise.
  "Physio" is a protected title in most jurisdictions; confirm it before launch
  or soften it to "clinician".
- **Placeholder photography.** All four plates are AI-generated stand-ins (see
  Photography above). Replace with a real shoot before launch.
- **Placeholder pricing.** Tier names, LKR amounts and terms in
  `Membership.tsx` — all marked `TODO(client)`.

## The spine

The Tempo Rule is not a hero one-off. The same instrument recurs:

| Where | What it measures |
|---|---|
| `TempoRule.tsx` | breath — 4.4s in / 1.0s hold / 5.6s out |
| `SectionRail.tsx` | page position — fixed left rail, inverts over ink |
| `Method.tsx` | the shape of 45 minutes — segments are the real split |
| `Sessions.tsx` | each session drawn to scale against the longest |

## Sections

`Hero` · `Method` (ink) · `Room` (plate grid) · `Sessions` (timetable)
· `Membership` (ink, closing CTA + footer)

Ground alternates bone → ink → bone → bone → ink. `data-ground` on each
section drives the rail's inversion.

## Accessibility

- `prefers-reduced-motion` is a full parity path, not a degraded one: no
  smooth scroll, no cursor, no magnet, no breath loop. The Tempo Rule renders
  as a static diagram.
- Text tokens clear WCAG AA (4.5:1) on their grounds; the CTA border clears
  3:1 as a UI boundary.
- Focus is `:focus-visible`, accent-coloured, offset 4px, and switches to
  `--color-plunge-lift` inside `.on-ink` regions.
- The custom cursor only suppresses the native one for precise pointers, and
  never for touch or reduced motion.
- The breath pacer carries an `sr-only` description; the marker is `aria-hidden`.
