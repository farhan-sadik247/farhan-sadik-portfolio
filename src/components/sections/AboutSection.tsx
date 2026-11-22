'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Briefcase, GraduationCap, FlaskConical, MapPin } from 'lucide-react';

const facts = [
  {
    icon: Briefcase,
    label: 'Currently',
    value: 'Software Engineer at Neeramoy Digital Services Ltd.',
    detail: 'April 2026 – Present',
  },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.Sc. in Computer Science & Engineering, BRAC University',
    detail: 'Jun 2021 – May 2025',
  },
  {
    icon: FlaskConical,
    label: 'Research',
    value: 'Deep learning pipeline translating speech into 3D ASL animation',
    detail: 'Undergraduate thesis · published on arXiv',
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'Dhaka, Bangladesh',
  },
];

export function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-surface/30">
      <Container>
        <SectionHeader
          title="About Me"
          subtitle="Who I am, what I build, and how I work."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start">
          {/* Left: Narrative */}
          <motion.div variants={fadeInUp} className="space-y-5 text-text-secondary leading-relaxed text-lg">
            <p>
              I&apos;m a <span className="text-text-primary font-medium">Software Engineer</span> building
              healthcare web applications and backend workflows with Angular, Python, Firebase and AWS.
              I graduated in Computer Science &amp; Engineering from BRAC University in 2025.
            </p>
            <p>
              I work across frontend and backend, pick up unfamiliar technology quickly, and care about
              shipping. I took a healthcare microsite from development to production in{' '}
              <span className="text-text-primary font-medium">3 weeks</span>. I use AI-assisted tools to move
              faster, and back every change with testing, debugging and code review.
            </p>
          </motion.div>

          {/* Right: Quick facts */}
          <motion.ul
            variants={staggerContainer}
            className="bg-card rounded-2xl border border-border shadow-sm divide-y divide-border"
          >
            {facts.map(({ icon: Icon, label, value, detail }) => (
              <motion.li key={label} variants={fadeInUp} className="flex gap-4 p-5">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="text-primary" size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">{label}</p>
                  <p className="text-text-primary font-medium leading-snug">{value}</p>
                  {detail && <p className="text-sm text-text-muted mt-1">{detail}</p>}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </SectionWrapper>
  );
}
