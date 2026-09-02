'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  // eslint-disable-next-line no-var
  var __cpGsapReady: boolean | undefined;
}

if (typeof window !== 'undefined' && !globalThis.__cpGsapReady) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'expo.out', duration: 1 });
  gsap.config({ nullTargetWarn: false });
  globalThis.__cpGsapReady = true;
}

/** The house curves. Nothing here is `ease` or `linear`. */
export const EASE = {
  outExpo: 'expo.out',
  outQuart: 'power4.out',
  inOutExpo: 'power4.inOut',
  /* Respiration is asymmetric: a quick draw, a long release. */
  breathIn: 'power2.inOut',
  breathOut: 'power1.inOut',
} as const;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
