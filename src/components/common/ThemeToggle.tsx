'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder to prevent layout shift
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <IconButton
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      color="inherit"
      aria-label="Toggle theme"
      size="large"
      sx={{
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'var(--hover)',
        }
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0.8 : 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex items-center justify-center"
      >
        {isDark ? <Moon size={24} /> : <Sun size={24} />}
      </motion.div>
    </IconButton>
  );
}
