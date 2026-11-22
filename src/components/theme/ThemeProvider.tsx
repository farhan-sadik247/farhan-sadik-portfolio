'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/theme/muiTheme';

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {/* Skip framer-motion transforms for users who prefer reduced motion */}
      <MotionConfig reducedMotion="user">
        <MUIThemeWrapper>
          {children}
        </MUIThemeWrapper>
      </MotionConfig>
    </NextThemesProvider>
  );
}

function MUIThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Server and first client render both use the light theme so hydration matches;
  // the real theme is applied after mount. The provider itself must always be
  // rendered: swapping the wrapper element would make React remount the whole page.
  const theme = mounted && resolvedTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <MUIThemeProvider theme={theme}>
      {mounted && <CssBaseline />}
      {children}
    </MUIThemeProvider>
  );
}
