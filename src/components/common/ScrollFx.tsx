'use client';

import React from 'react';
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/utils/cn';

/** Thin accent bar at the top of the page that fills as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-primary"
      style={{ scaleX }}
    />
  );
}

type ScrollParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Pixels to move over the first screen of scrolling (negative = up, faster than the page). */
  distance: number;
  /** Fade toward this opacity over the same scroll range. */
  fadeTo?: number;
};

/** Moves (and optionally fades) its content as the page scrolls past the top screen. */
export function ScrollParallax({ children, className, distance, fadeTo = 1 }: ScrollParallaxProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, distance], { clamp: true });
  const opacity = useTransform(scrollY, [0, 700], [1, fadeTo], { clamp: true });

  // Same element on server and client (no hydration mismatch); motion is just skipped for reduced motion.
  return (
    <m.div className={cn('will-change-transform', className)} style={reduceMotion ? undefined : { y, opacity }}>
      {children}
    </m.div>
  );
}
