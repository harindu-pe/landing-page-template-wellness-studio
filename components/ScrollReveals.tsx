'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/**
 * One place for every below-the-fold scroll behaviour, so the page runs on a
 * handful of batched ScrollTriggers instead of dozens of individual ones.
 *
 *   [data-reveal]        copy and structure, revealed in staggered groups
 *   [data-plate-reveal]  image slots, unmasked from below
 *   [data-parallax]      decorative depth — plates only, never text
 *
 * Transform and opacity only. Under reduced motion everything is simply
 * placed at its resting state and no trigger is created at all.
 */
export default function ScrollReveals() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      const plates = gsap.utils.toArray<HTMLElement>('[data-plate-reveal]');
      const parallax = gsap.utils.toArray<HTMLElement>('[data-parallax]');

      if (prefersReducedMotion()) {
        gsap.set(reveals, { autoAlpha: 1, y: 0 });
        gsap.set(plates, { y: 0, yPercent: 0 });
        return;
      }

      gsap.set(reveals, { autoAlpha: 0, y: 34 });
      gsap.set(plates, { y: 0, yPercent: 105 });

      ScrollTrigger.batch(reveals, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
            overwrite: true,
          }),
      });

      /* Each plate is triggered off its *untranslated* wrapper. Using the
         translated element as its own trigger is a trap: a tall plate pushes
         itself 105% down, past its own start point, and never reveals. */
      plates.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el.closest('figure') || el,
          start: 'top 92%',
          once: true,
          onEnter: () =>
            gsap.to(el, {
              yPercent: 0,
              duration: 1.5,
              ease: 'expo.out',
              delay: (i % 3) * 0.1,
              overwrite: true,
            }),
        });
      });

      parallax.forEach((el) => {
        const speed = Number(el.dataset.parallaxSpeed || 6);
        gsap.fromTo(
          el,
          { yPercent: speed },
          {
            yPercent: -speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('figure') || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
