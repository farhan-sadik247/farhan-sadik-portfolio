'use client';

import React from 'react';
import { m, type HTMLMotionProps } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';

/**
 * Small client-side animation wrappers. Sections can stay server components
 * (no JS shipped for their content) and only these wrappers hydrate.
 */
type Tag = 'div' | 'ul' | 'li' | 'article' | 'aside' | 'p';
type RevealProps = { as?: Tag } & HTMLMotionProps<'div'>;

/** Fades and slides in when its parent section scrolls into view. */
export function Reveal({ as = 'div', ...props }: RevealProps) {
  const Component = m[as] as typeof m.div;
  return <Component variants={fadeInUp} {...props} />;
}

/** Container that staggers the entrance of its <Reveal> children. */
export function RevealGroup({ as = 'div', ...props }: RevealProps) {
  const Component = m[as] as typeof m.div;
  return <Component variants={staggerContainer} {...props} />;
}
