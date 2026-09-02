'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import MagneticCTA from './MagneticCTA';
import PlateFill from './PlateFill';
import PlateFurniture from './PlateFurniture';
import TempoRule from './TempoRule';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* TODO(client): confirm both figures before launch. The cap is a promise the
   room has to keep, and "physio-led" is a regulated claim. */
const STATS = [
  { figure: '06', label: 'Mats per session' },
  { figure: '100%', label: 'Physio-led' },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();

      /* Pre-paint state, now GSAP-owned (the CSS stand-in covered hydration). */
      gsap.set('[data-hero-line] > *, [data-reveal-inner]', { y: 0, yPercent: 105 });
      gsap.set('[data-load]', { autoAlpha: 0, y: 16 });
      gsap.set('[data-load="tempo"]', { y: 0 });
      gsap.set('.anim-rule', { scaleX: 0 });

      if (reduced) {
        gsap.set('[data-hero-line] > *, [data-reveal-inner]', { y: 0, yPercent: 0 });
        gsap.set('[data-load]', { autoAlpha: 1, y: 0 });
        gsap.set('.anim-rule', { scaleX: 1 });
        return;
      }

      /* ---- Load choreography -------------------------------------------
         structure -> plate -> headline -> copy -> chrome -> instrument.
         Nothing lands at the same moment as anything else.               */
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        onComplete: () => {
          gsap.set('[data-hero-line] > *, [data-reveal-inner], [data-load]', {
            willChange: 'auto',
          });
        },
      });

      tl.to('.anim-rule', { scaleX: 1, duration: 1.5, stagger: 0.07 }, 0.05)
        .to('[data-reveal-inner]', { yPercent: 0, duration: 1.6 }, 0.14)
        .to('[data-load="eyebrow"]', { autoAlpha: 1, y: 0, duration: 0.9 }, 0.22)
        .to('[data-hero-line] > *', { yPercent: 0, duration: 1.3, stagger: 0.085 }, 0.3)
        .to('[data-load="lede"]', { autoAlpha: 1, y: 0, duration: 1.1 }, 0.66)
        .to('[data-load="cta"]', { autoAlpha: 1, y: 0, duration: 0.95 }, 0.78)
        .to('[data-load="stat"]', { autoAlpha: 1, y: 0, duration: 0.95, stagger: 0.09 }, 0.84)
        .to('[data-load="mark"]', { autoAlpha: 1, y: 0, duration: 0.85 }, 0.9)
        .to('[data-load="nav"]', { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.06 }, 0.96)
        .to('[data-load="tempo"]', { autoAlpha: 1, duration: 1.2 }, 1.15);

      /* ---- Scroll parallax: the plate only, never the type ------------- */
      gsap.to('[data-plate-parallax]', {
        yPercent: -9,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.55,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      data-ground="bone"
      ref={root}
      className="relative flex min-h-[100svh] w-full flex-col"
      style={{ paddingTop: 'var(--header-h)' }}
    >
      <div className="relative flex flex-1 flex-col px-[var(--gutter)]">
        {/* ==============================================================
            THE PLATE - dominant image slot. Space is reserved by aspect
            ratio, so real photography drops in at zero layout shift.
            ============================================================== */}
        <div className="anim-plate order-2 -mx-[var(--gutter)] mt-[clamp(2.5rem,6vw,4rem)] block aspect-[3/2] w-[calc(100%+var(--gutter)*2)] overflow-hidden lg:absolute lg:right-0 lg:top-[clamp(0.5rem,3vh,2.5rem)] lg:z-20 lg:order-none lg:mx-0 lg:mt-0 lg:aspect-[4/5] lg:w-[clamp(18rem,37vw,32rem)]">
          <div data-reveal-inner className="relative h-full w-full will-change-transform">
            {/* Overscanned by 12% at the foot: the parallax travels -9% of this
                element's own height, so the picture has to be taller than its
                slot or the drift exposes a bare edge. */}
            <div
              data-plate-parallax
              className="absolute inset-x-0 top-0 h-[112%] will-change-transform"
            >
              <div
                data-breath="plate"
                className="h-full w-full origin-center will-change-transform"
              >
                {/* The file is 4:5. The slot is 4:5 on desktop and 3:2 on
                    mobile, and that landscape crop keeps only ~53% of the
                    height — biased just below centre to hold the windows,
                    the olive tree and the mat together. */}
                <PlateFill
                  src="/plates/plate-01-recovery-room.jpg"
                  alt="A sunlit recovery studio at dawn: arched windows behind linen curtains, an olive tree, rolled towels on an oak bench and one mat laid out on the floor."
                  sizes="(max-width: 1024px) 100vw, 37vw"
                  position="center 55%"
                  priority
                />
              </div>
            </div>

            <PlateFurniture caption="Plate 01 &mdash; Recovery room, 06:40" />
          </div>
        </div>

        {/* ==============================================================
            THE DISPLAY - three beats, the middle one whispered.
            ============================================================== */}
        {/* ==============================================================
            ORIENTATION - the display type is a claim, not a label, so the
            category and the city are stated plainly before it.
            ============================================================== */}
        <p
          data-load="eyebrow"
          className="anim-fade u-mono order-first mt-[clamp(1.75rem,5.5vh,4.5rem)] text-text-tertiary will-change-transform lg:order-none lg:pl-[clamp(0rem,4.4vw,5.5rem)]"
        >
          Recovery studio<span className="mx-2 text-plunge">/</span>Colombo 07
        </p>

        <h1
          data-breath="type"
          className="u-hero relative z-10 order-1 mt-[clamp(0.9rem,2.2vh,1.6rem)] will-change-transform lg:order-none lg:pl-[clamp(0rem,4.4vw,5.5rem)]"
        >
          <span
            data-hero-line
            className="mask anim-line"
            style={{ paddingBottom: '0.06em', marginBottom: '-0.06em' }}
          >
            <span>Recovery</span>
          </span>

          <span
            data-hero-line
            className="mask anim-line"
            style={{ paddingBottom: '0.18em', marginBottom: '-0.18em' }}
          >
            <span className="flex items-center gap-[clamp(0.9rem,2.2vw,2.4rem)] pl-[clamp(0.4rem,7vw,9rem)]">
              <span
                aria-hidden
                className="block h-px w-[clamp(2rem,7vw,9rem)] shrink-0 bg-plunge"
              />
              <span className="u-serif block shrink-0 text-[0.5em] normal-case leading-[0.92] tracking-[-0.01em] text-plunge">
                is
              </span>
              {/* runs on to the right and disappears behind the plate */}
              <span aria-hidden className="block h-px w-full shrink bg-plunge/35" />
            </span>
          </span>

          <span
            data-hero-line
            className="mask anim-line"
            style={{ paddingBottom: '0.06em', marginBottom: '-0.06em' }}
          >
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '0.018em var(--color-ink)' }}
            >
              The&nbsp;Work
            </span>
          </span>
        </h1>

        {/* ==============================================================
            LOWER BAND - lede, CTA, credentials. Held far from the display
            so the void between them does the work.
            ============================================================== */}
        <div className="order-3 mt-auto grid w-full grid-cols-12 items-end gap-x-[var(--gutter)] gap-y-[clamp(2.5rem,5vw,3.5rem)] pt-[clamp(1.75rem,4vh,3.5rem)] lg:order-none">
          <div className="col-span-12 sm:col-span-8 lg:col-span-4 lg:pl-[clamp(0rem,4.4vw,5.5rem)]">
            <p data-load="lede" className="anim-fade u-lede max-w-[38ch] will-change-transform">
              A recovery studio for people who already train hard.
              Forty&#8209;five programmed minutes of mobility, breath and
              controlled load &mdash; the part of the week that decides whether
              the rest of it holds.
            </p>

            <div
              data-load="cta"
              className="anim-fade mt-[clamp(1.75rem,3.5vw,2.75rem)] flex flex-wrap items-center gap-x-7 gap-y-4 will-change-transform"
            >
              {/* TODO(client): point at the live booking destination
                  (form / WhatsApp / Mindbody) once it is locked. */}
              <MagneticCTA href="#book">
                Book a session
              </MagneticCTA>
              <span className="u-mono text-text-tertiary">
                Next opening &mdash; Thu 06:40
              </span>
            </div>
          </div>

          <div className="col-span-12 flex gap-[clamp(2rem,5vw,4rem)] sm:col-span-4 sm:justify-end lg:col-span-3 lg:col-start-6 lg:justify-start lg:pb-1">
            {STATS.map((s) => (
              <div key={s.label} data-load="stat" className="anim-fade will-change-transform">
                <div className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-none tracking-[-0.03em] tabular-nums">
                  {s.figure}
                </div>
                <div className="u-mono mt-3 whitespace-nowrap text-text-tertiary">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==============================================================
          THE TEMPO RULE - signature moment. Full-bleed, so the marker
          gets the longest possible traverse; it runs behind the plate.
          ============================================================== */}
      <div
        data-load="tempo"
        className="anim-fade relative z-10 mt-[clamp(2.25rem,5.5vh,4.25rem)] w-full overflow-x-clip px-[var(--gutter)] pb-[clamp(1.75rem,4vh,2.75rem)]"
      >
        <TempoRule />
      </div>
    </section>
  );
}
