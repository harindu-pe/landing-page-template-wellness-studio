'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/**
 * Weighted scroll. Lenis owns the wheel, GSAP's ticker owns the clock — one
 * RAF loop for the whole page, so ScrollTrigger never reads a stale frame.
 *
 * In-page anchors are routed through Lenis too. A raw hash jump moves the
 * page without Lenis emitting, which leaves ScrollTrigger's reveals unfired
 * and sections apparently blank.
 */
export default function SmoothScroll() {
  useEffect(() => {
    /* Measure the header rather than parsing --header-h: the token is a
       clamp() expression, and parseFloat on it yields the min, not the used
       value. */
    const headerOffset = () =>
      -(document.querySelector('header')?.getBoundingClientRect().height ?? 0);

    /* Fonts change metrics, which changes every trigger position. */
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    if (prefersReducedMotion()) {
      const onAnchorReduced = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        const id = a?.getAttribute('href')?.slice(1);
        const el = id && document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        ScrollTrigger.refresh();
      };
      document.addEventListener('click', onAnchorReduced);
      return () => document.removeEventListener('click', onAnchorReduced);
    }

    const lenis = new Lenis({
      duration: 1.15,
      // Same shape as our expo-out curve, expressed as a scalar easing.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.92,
      touchMultiplier: 1.6,
      // Never hijack touch — thumbs get native physics.
      syncTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchor = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const href = a?.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: headerOffset(), duration: 1.4 });
    };
    document.addEventListener('click', onAnchor);

    /* Deep link straight to a section. */
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) requestAnimationFrame(() => lenis.scrollTo(el, { offset: headerOffset(), immediate: true }));
    }

    return () => {
      document.removeEventListener('click', onAnchor);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
