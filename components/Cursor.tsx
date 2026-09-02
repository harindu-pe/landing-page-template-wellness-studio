'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

/**
 * Two-body cursor: a hard dot that tracks almost 1:1 and a ring that trails it.
 * `mix-blend-mode: difference` keeps it legible over bone *and* over the ink
 * plate without tracking which surface it is on. Elements opt in with
 * `data-cursor`; the ring opens over them and the dot retracts into it.
 * No labels — the interface already says what it does.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || prefersReducedMotion()) return;

    const d = dot.current!;
    const r = ring.current!;

    document.documentElement.classList.add('cursor-live');

    const dx = gsap.quickTo(d, 'x', { duration: 0.11, ease: 'power3.out' });
    const dy = gsap.quickTo(d, 'y', { duration: 0.11, ease: 'power3.out' });
    const rx = gsap.quickTo(r, 'x', { duration: 0.5, ease: 'expo.out' });
    const ry = gsap.quickTo(r, 'y', { duration: 0.5, ease: 'expo.out' });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      dx(e.clientX); dy(e.clientY);
      rx(e.clientX); ry(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to([d, r], { autoAlpha: 1, duration: 0.5, ease: 'expo.out' });
      }
    };

    const enter = (e: Event) => {
      if (!(e.target as HTMLElement).closest('[data-cursor]')) return;
      gsap.to(r, { scale: 0.62, duration: 0.6, ease: 'expo.out', overwrite: 'auto' });
      gsap.to(d, { scale: 0, duration: 0.45, ease: 'expo.out', overwrite: 'auto' });
    };

    const leave = (e: Event) => {
      if (!(e.target as HTMLElement).closest('[data-cursor]')) return;
      gsap.to(r, { scale: 0.15, duration: 0.5, ease: 'expo.out', overwrite: 'auto' });
      gsap.to(d, { scale: 1, duration: 0.5, ease: 'expo.out', overwrite: 'auto' });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', enter);
    document.addEventListener('pointerout', leave);

    return () => {
      document.documentElement.classList.remove('cursor-live');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', enter);
      document.removeEventListener('pointerout', leave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ring}
        className="absolute -left-[52px] -top-[52px] h-[104px] w-[104px] scale-[0.15] rounded-full border border-bone opacity-0 mix-blend-difference will-change-transform"
      />
      <div
        ref={dot}
        className="absolute -left-[3px] -top-[3px] h-[6px] w-[6px] rounded-full bg-bone opacity-0 mix-blend-difference will-change-transform"
      />
    </div>
  );
}
