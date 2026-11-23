'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { LazyMotion, MotionConfig } from 'framer-motion';

// The animation engine is fetched after the page loads instead of shipping in the startup bundle.
const loadMotionFeatures = () => import('@/utils/motionFeatures').then((mod) => mod.default);

/**
 * Theme switching is handled entirely by next-themes toggling the `dark` class
 * on <html>; all colors come from the CSS variables in globals.css.
 */
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {/* `strict` throws if a full `motion.*` component sneaks back in and re-bloats the bundle */}
      <LazyMotion features={loadMotionFeatures} strict>
        {/* Skip framer-motion transforms for users who prefer reduced motion */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </NextThemesProvider>
  );
}
