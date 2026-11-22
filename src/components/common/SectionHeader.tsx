'use client';

import React from 'react';
import { m } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';
import { cn } from '@/utils/cn';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** Small label above the title, e.g. "01 / About". */
  eyebrow?: string;
  align?: 'left' | 'center';
  /** Width class so the header lines up with the section's content, e.g. "max-w-4xl". */
  className?: string;
}

export function SectionHeader({ title, subtitle, eyebrow, align = 'left', className }: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <m.div
      variants={fadeInUp}
      className={cn('mb-10 md:mb-12 mx-auto w-full', centered && 'text-center', className)}
    >
      {eyebrow && (
        <p
          className={cn(
            'flex items-center gap-3 mb-3 font-mono text-sm font-medium tracking-wider text-primary',
            centered && 'justify-center'
          )}
        >
          <span>{eyebrow}</span>
          {!centered && <span aria-hidden="true" className="h-px w-12 bg-primary/40" />}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-lg text-text-secondary max-w-2xl', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </m.div>
  );
}
