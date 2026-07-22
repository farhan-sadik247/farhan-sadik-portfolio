import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, subtitle, align = 'center' }: SectionHeaderProps) {
  return (
    <motion.div 
      variants={fadeInUp}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-muted">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 bg-primary mt-6 rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
