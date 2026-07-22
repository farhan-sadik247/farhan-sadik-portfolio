'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button, IconButton } from '@mui/material';
import { Download, ArrowRight, Mail } from 'lucide-react';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { fadeInUp, staggerContainer } from '@/utils/animations';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-[-10%] top-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] opacity-50 animate-pulse" />
        <div className="absolute right-[-10%] bottom-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[100px] opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 border border-primary/20">
                Available for new opportunities
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary">
                Hi, I&apos;m <span className="text-primary">Farhan Sadik</span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-semibold text-text-muted">
                Software Engineer
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-lg text-text-muted max-w-lg leading-relaxed">
                I design and develop scalable, user-focused web applications using React, Next.js, Angular, TypeScript, and Python, complemented by cloud technologies such as Firebase and AWS. I focus on building maintainable software, integrating REST APIs, and delivering high-quality solutions through modern engineering practices.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                endIcon={<ArrowRight size={18} />}
                href="#projects"
                disableElevation
              >
                View Projects
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                startIcon={<Download size={18} />}
                href="#resume"
              >
                View Resume
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-4">
              <IconButton component="a" href="https://github.com/farhan-sadik247" target="_blank" sx={{ color: 'var(--text-muted)', '&:hover': { color: 'var(--primary)', bgcolor: 'var(--hover)' } }}>
                <GitHub />
              </IconButton>
              <IconButton component="a" href="https://linkedin.com/in/md-farhan-sadik-39826721b" target="_blank" sx={{ color: 'var(--text-muted)', '&:hover': { color: 'var(--primary)', bgcolor: 'var(--hover)' } }}>
                <LinkedIn />
              </IconButton>
              <IconButton component="a" href="mailto:md.farhan.sadik.578@gmail.com" sx={{ color: 'var(--text-muted)', '&:hover': { color: 'var(--primary)', bgcolor: 'var(--hover)' } }}>
                <Mail />
              </IconButton>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center relative mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[350px] lg:w-[400px] h-[350px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-border/50 bg-surface shadow-2xl p-4">
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center border border-border/30 overflow-hidden relative">
                {/* Light Theme Image */}
                <img 
                  src="https://res.cloudinary.com/dupf4kmfg/image/upload/v1784715354/farhan_profie_light_wgz6sd.png" 
                  alt="Farhan Sadik Profile" 
                  className="w-full h-full object-cover block dark:hidden"
                />
                {/* Dark Theme Image */}
                <img 
                  src="https://res.cloudinary.com/dupf4kmfg/image/upload/v1784715017/fathan_profile_inauvp.png" 
                  alt="Farhan Sadik Profile Dark" 
                  className="w-full h-full object-cover hidden dark:block"
                />
              </div>
            </div>

          </motion.div>

        </div>
      </Container>
    </section>
  );
}
