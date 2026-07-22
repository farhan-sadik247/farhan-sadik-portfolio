'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SectionWrapperProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
}

export function SectionWrapper({ children, className, id, ...props }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
        }
      }}
      className={cn("py-20 md:py-32", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
