'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

/* Resonance breathing: ~5.5 breaths per minute. Not a decorative loop —
   the actual cadence the studio paces its recovery sessions to. */
const IN = 4.4;
const HOLD = 1.0;
const OUT = 5.6;

const PHASES = ['INHALE', 'HOLD', 'EXHALE'] as const;

/**
 * THE TEMPO RULE — the signature moment.
 * A breath metronome drawn as a laboratory instrument: hairline rail,
 * traversing marker, monospace phase readout, live cycle count. It also
 * drives the hero's own respiration via [data-breath] targets, so the whole
 * composition inhales with the visitor. Transform and opacity only.
 */
export default function TempoRule() {
  const root = useRef<HTMLDivElement>(null);
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    const el = root.current!;
    const q = gsap.utils.selector(el);

    const fill = q('[data-rail-fill]');
    const marker = q('[data-marker]');
    const words = PHASES.map((p) => q(`[data-phase="${p}"]`)[0]);
    const plate = gsap.utils.toArray<HTMLElement>('[data-breath="plate"]');
    const type = gsap.utils.toArray<HTMLElement>('[data-breath="type"]');

    /* Rest state — also the entire experience under reduced motion. */
    gsap.set(fill, { scaleX: 0.5, transformOrigin: 'left center' });
    gsap.set(marker, { xPercent: 50 });
    gsap.set(words, { autoAlpha: 0, y: 6 });

    if (prefersReducedMotion()) {
      gsap.set(words[0], { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(fill, { scaleX: 0 });
    gsap.set(marker, { xPercent: 0 });

    const tl = gsap.timeline({
      repeat: -1,
      // Settle the composition before the first breath is drawn.
      delay: 1.5,
      onRepeat: () => setCycle((c) => c + 1),
    });

    const phaseIn = (i: number) =>
      gsap.timeline()
        .to(words, { autoAlpha: 0, y: -6, duration: 0.28, ease: 'power2.in' }, 0)
        .fromTo(
          words[i],
          { autoAlpha: 0, y: 6 },
          { autoAlpha: 1, y: 0, duration: 0.42, ease: 'expo.out' },
          0.18,
        );

    /* ---- INHALE ------------------------------------------------------ */
    tl.addLabel('inhale')
      .set(fill, { transformOrigin: 'left center' }, 'inhale')
      .add(phaseIn(0), 'inhale')
      .to(fill, { scaleX: 1, duration: IN, ease: 'power2.inOut' }, 'inhale')
      .to(marker, { xPercent: 100, duration: IN, ease: 'power2.inOut' }, 'inhale')
      .to(plate, { scale: 1.022, duration: IN, ease: 'power2.inOut' }, 'inhale')
      .to(type, { y: -9, duration: IN, ease: 'power2.inOut' }, 'inhale')

      /* ---- HOLD ------------------------------------------------------ */
      .addLabel('hold', `inhale+=${IN}`)
      .add(phaseIn(1), 'hold')

      /* ---- EXHALE ---------------------------------------------------- */
      .addLabel('exhale', `hold+=${HOLD}`)
      // Origin stays left: the bar is breath volume, and the marker rides its
      // leading edge in both directions.
      .add(phaseIn(2), 'exhale')
      .to(fill, { scaleX: 0, duration: OUT, ease: 'power1.inOut' }, 'exhale')
      .to(marker, { xPercent: 0, duration: OUT, ease: 'power1.inOut' }, 'exhale')
      .to(plate, { scale: 1, duration: OUT, ease: 'power1.inOut' }, 'exhale')
      .to(type, { y: 0, duration: OUT, ease: 'power1.inOut' }, 'exhale');

    /* Don't burn a background tab's battery on a breath nobody is taking. */
    const onVis = () => (document.hidden ? tl.pause() : tl.resume());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      document.removeEventListener('visibilitychange', onVis);
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="w-full select-none">
      {/* meta row */}
      <div className="flex items-baseline justify-between gap-4">
        <span className="u-mono text-text-tertiary">
          Tempo<span className="mx-2 text-plunge">/</span>Resonance
        </span>
        <span className="u-mono text-text-tertiary tabular-nums">
          Cycle {String(cycle).padStart(3, '0')}
        </span>
      </div>

      {/* the rail */}
      <div className="anim-rule relative mt-4 h-px w-full origin-left bg-rule will-change-transform">
        <span
          data-rail-fill
          aria-hidden
          className="absolute inset-0 block bg-plunge will-change-transform"
        />
        {/* wrapper is exactly rail-width, so xPercent 0→100 traverses it precisely */}
        <span
          data-marker
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 block w-full will-change-transform"
        >
          <span className="absolute left-0 top-0 block -translate-x-1/2">
            <span className="block h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-plunge" />
            <span className="mt-[-1px] block h-[26px] w-px bg-plunge/45" />
          </span>
        </span>
      </div>

      {/* readout row */}
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <span className="relative block h-[11px] w-[72px]">
          {PHASES.map((p) => (
            <span
              key={p}
              data-phase={p}
              className="u-mono absolute left-0 top-0 block text-plunge will-change-transform"
            >
              {p}
            </span>
          ))}
        </span>
        <span className="u-mono text-text-tertiary tabular-nums">5.5 breaths / min</span>
      </div>

      <p className="sr-only">
        A breathing pacer set to 5.5 breaths per minute: inhale four seconds,
        hold one, exhale six.
      </p>
    </div>
  );
}
