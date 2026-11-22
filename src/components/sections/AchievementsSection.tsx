'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Shield, BookOpen, ExternalLink, Medal, type LucideIcon } from 'lucide-react';

type Achievement = {
  result: string;
  resultLabel: string;
  title: string;
  category: string;
  date: string;
  icon: LucideIcon;
  description: string;
  link?: { href: string; label: string };
  /** Spans two rows from the md breakpoint up */
  tall?: boolean;
};

const achievements: Achievement[] = [
  {
    result: 'arXiv',
    resultLabel: 'Published paper',
    title: 'Translating Speech into 3D Hand Sign Language (ASL)',
    category: 'Research · Thesis',
    date: 'Jan 2025',
    icon: BookOpen,
    description:
      'A deep learning pipeline converting speech into 3D ASL animation via speech-to-text, gloss translation, keypoint mapping and sequence modeling, trained on How2Sign. Built with Whisper, BART, MarianMT, RTMPose3D, MediaPipe and LSTM.',
    link: { href: 'https://doi.org/10.48550/arXiv.2507.06530', label: 'Read paper' },
    tall: true,
  },
  {
    result: '8th',
    resultLabel: 'Final round',
    title: 'BUET CTF 2024',
    category: 'Cybersecurity',
    date: '2024',
    icon: Shield,
    description: 'Capture The Flag competition organized by BUET Cybersecurity Club.',
  },
  {
    result: '5th',
    resultLabel: 'Final round',
    title: 'EWU CTF 2024',
    category: 'Cybersecurity',
    date: '2024',
    icon: Medal,
    description: 'Capture The Flag competition hosted by East West University Robotics Club.',
  },
];

export function AchievementsSection() {
  return (
    <SectionWrapper id="achievements" className="bg-surface/30">
      <Container>
        <SectionHeader
          title="Achievements & Recognition"
          subtitle="Competitions and research outside of day-to-day work."
        />

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {achievements.map(({ result, resultLabel, title, category, date, icon: Icon, description, link, tall }) => (
            <motion.article
              key={title}
              variants={fadeInUp}
              className={`flex flex-col p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/60 transition-[box-shadow,border-color] duration-300 ${tall ? 'md:row-span-2' : ''}`}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-4xl font-bold tracking-tight text-primary leading-none">{result}</p>
                  <p className="text-sm font-medium text-text-muted mt-2">{resultLabel}</p>
                </div>
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={22} aria-hidden="true" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-text-primary leading-snug mb-1">{title}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                {category} · {date}
              </p>
              <p className="text-text-secondary text-[15px] leading-relaxed flex-1">{description}</p>

              {link && (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-primary font-medium hover:underline w-fit"
                >
                  {link.label} <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
