'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/**
 * THE SPINE. The same instrument as the Tempo Rule, turned ninety degrees and
 * pointed at the page instead of the breath: a hairline the height of the
 * viewport, an accent segment that fills with scroll progress, and a
 * monospace readout of where you are. It inverts over ink sections.
 */
const SECTIONS = [
  { id: 'hero', n: '01', label: 'Recovery' },
  { id: 'method', n: '02', label: 'Method' },
  { id: 'studio', n: '03', label: 'The room' },
  { id: 'sessions', n: '04', label: 'Sessions' },
  { id: 'membership', n: '05', label: 'Membership' },
];

export default function SectionRail() {
  const fill = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(SECTIONS[0]);
  const [onInk, setOnInk] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: ({ isActive }) => {
            if (!isActive) return;
            setActive(s);
            setOnInk(el.dataset.ground === 'ink');
          },
        });
      });

      if (prefersReducedMotion()) {
        gsap.set(fill.current, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const line = onInk ? 'bg-bone/20' : 'bg-rule';
  const text = onInk ? 'text-bone/55' : 'text-text-tertiary';
  const mark = onInk ? 'bg-plunge-lift' : 'bg-plunge';

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-0 left-0 z-40 hidden w-[var(--gutter)] flex-col items-center xl:flex"
      style={{ top: 'var(--header-h)' }}
    >
      <span className={`relative block w-px flex-1 transition-colors duration-700 ${line}`}>
        <span
          ref={fill}
          className={`absolute inset-x-0 top-0 block h-full origin-top will-change-transform transition-colors duration-700 ${mark}`}
        />
      </span>

      <span
        className={`u-mono whitespace-nowrap py-[clamp(1.5rem,3vh,2.25rem)] transition-colors duration-700 ${text}`}
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        {active.label}
        <span className={`mx-3 ${onInk ? 'text-plunge-lift' : 'text-plunge'}`}>&mdash;</span>
        {active.n}
      </span>
    </div>
  );
}
