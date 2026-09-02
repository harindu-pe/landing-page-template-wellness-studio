'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

type Props = {
  href: string;
  children: React.ReactNode;
  /** `pill` for inline use, `display` for the closing call at headline scale. */
  variant?: 'pill' | 'display';
  /** Magnetic reach in px beyond the button box. */
  radius?: number;
  className?: string;
};

/**
 * Magnetic primary CTA. The shell tracks the pointer at 34% of its offset,
 * the label at 62% — the parallax between them is what makes it feel
 * physical rather than "a button that moves".
 */
export default function MagneticCTA({
  href,
  children,
  variant = 'pill',
  radius,
  className = '',
}: Props) {
  const display = variant === 'display';
  const shell = useRef<HTMLAnchorElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const wash = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = shell.current!;
    const lb = label.current!;
    const wh = wash.current; // absent in the display variant
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;

    const RADIUS = radius ?? (display ? 160 : 90);
    const sx = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'expo.out' });
    const sy = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'expo.out' });
    const lx = gsap.quickTo(lb, 'x', { duration: 0.9, ease: 'expo.out' });
    const ly = gsap.quickTo(lb, 'y', { duration: 0.9, ease: 'expo.out' });

    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      const cx = b.left + b.width / 2;
      const cy = b.top + b.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const inside =
        Math.abs(dx) < b.width / 2 + RADIUS && Math.abs(dy) < b.height / 2 + RADIUS;

      if (inside) {
        sx(dx * 0.34); sy(dy * 0.34);
        lx(dx * 0.62); ly(dy * 0.62);
        if (wh) gsap.to(wh, { scaleY: 1, duration: 0.6, ease: 'expo.out', overwrite: 'auto' });
      } else {
        sx(0); sy(0); lx(0); ly(0);
        if (wh) gsap.to(wh, { scaleY: 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [display, radius]);

  return (
    <a
      ref={shell}
      href={href}
      data-cursor=""
      className={`group relative inline-flex items-center overflow-hidden will-change-transform ${
        display
          ? 'gap-[clamp(1rem,2.5vw,2.5rem)] rounded-none border-0 px-0 py-0'
          : 'rounded-full border border-ink/50 px-8 py-4'
      } ${className}`}
    >
      {/* Accent wash rises from the baseline on approach — origin bottom, scaleY only. */}
      {!display && (
        <span
          ref={wash}
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 bg-plunge will-change-transform"
        />
      )}
      <span
        ref={label}
        className={`relative z-10 flex items-center will-change-transform ${
          display
            ? 'u-hero gap-[clamp(1rem,2.5vw,2.5rem)] text-[clamp(2.5rem,7.5vw,6.5rem)] leading-none'
            : 'u-mono gap-3 text-ink transition-colors duration-300 group-hover:text-bone'
        }`}
        style={display ? undefined : { transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      >
        {children}
        <svg
          width={display ? 68 : 15}
          height={display ? 40 : 9}
          viewBox="0 0 15 9"
          fill="none"
          aria-hidden
          className={
            display
              ? 'shrink-0 text-plunge-lift transition-transform duration-[700ms] will-change-transform group-hover:translate-x-3'
              : ''
          }
          style={display ? { transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' } : undefined}
        >
          <path
            d="M0 4.5h13M9.4 1l3.6 3.5L9.4 8"
            stroke="currentColor"
            strokeWidth={display ? 0.7 : 1.1}
          />
        </svg>
      </span>
    </a>
  );
}
