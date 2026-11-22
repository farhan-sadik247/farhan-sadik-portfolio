'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '@mui/material';
import { Download, ArrowRight, Mail } from 'lucide-react';
import { GitHub, LinkedIn } from '@mui/icons-material';
import Image from 'next/image';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { RESUME_URL } from '@/data/navigation';
const socials = [
  { href: 'https://github.com/farhan-sadik247', label: 'Md. Farhan Sadik on GitHub', icon: <GitHub /> },
  { href: 'https://www.linkedin.com/in/farhan-sadik247/', label: 'Md. Farhan Sadik on LinkedIn', icon: <LinkedIn /> },
  { href: 'mailto:md.farhan.sadik.578@gmail.com', label: 'Email Md. Farhan Sadik', icon: <Mail size={22} /> },
];

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-28 pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute left-[-10%] top-[-10vh] w-[40vw] h-[40vh] rounded-full bg-primary/20 blur-[100px] opacity-50 animate-pulse" />
        <div className="absolute right-[-10%] top-[70vh] w-[40vw] h-[40vh] rounded-full bg-secondary/20 blur-[100px] opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Container className="relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content: rendered without an entrance animation. This text is the
              Largest Contentful Paint element, so it must be visible before JS loads. */}
          <motion.div
            variants={staggerContainer}
            initial={false}
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 border border-primary/20">
                Available for new opportunities
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary">
                Hi, I&apos;m <span className="text-primary">Md. Farhan Sadik</span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-semibold text-text-secondary">
                Software Engineer
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
                I build healthcare web applications at Neeramoy Digital Services, and most recently took a
                microsite from development to <span className="text-text-primary font-medium">production in 3 weeks</span>.
                I work across the stack with Angular, React, Next.js, Python, Firebase and AWS.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowRight size={18} />}
                href="#projects"
                disableElevation
                sx={{ px: 3.5, py: 1.4, fontSize: '1rem', fontWeight: 600 }}
              >
                View Projects
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<Download size={18} />}
                href={RESUME_URL}
                download
                sx={{ px: 3.5, py: 1.4, fontSize: '1rem', fontWeight: 600, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
              >
                Download CV
              </Button>
            </motion.div>

            <motion.ul variants={fadeInUp} className="flex items-center gap-3 pt-2" aria-label="Social links">
              {socials.map(({ href, label, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                    aria-label={label}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-border bg-surface text-text-secondary hover:text-primary hover:border-primary transition-colors"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center relative mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-75 sm:max-w-87.5 lg:w-100 h-87.5 sm:h-100 lg:h-125 rounded-2xl overflow-hidden border border-border/50 bg-surface shadow-2xl p-4">
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center border border-border/30 overflow-hidden relative">
                {/* Light Theme Image */}
                <Image 
                  src="https://res.cloudinary.com/dupf4kmfg/image/upload/v1784715354/farhan_profie_light_wgz6sd.png" 
                  alt="Md. Farhan Sadik, software engineer" 
                  fill
                  priority
                  className="object-cover block dark:hidden"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {/* Dark Theme Image */}
                <Image 
                  src="https://res.cloudinary.com/dupf4kmfg/image/upload/v1784715017/fathan_profile_inauvp.png" 
                  alt="Md. Farhan Sadik, software engineer" 
                  fill
                  priority
                  className="object-cover hidden dark:block"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>

          </motion.div>

        </div>
      </Container>
    </section>
  );
}
