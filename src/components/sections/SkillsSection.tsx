'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { skillIcons } from '@/data/skillIcons';

const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'C', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend',
    skills: ['Angular', 'React', 'Next.js', 'React Native', 'Tailwind CSS'],
  },
  {
    title: 'Backend & Cloud',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Firebase', 'Cloud Functions & FCM', 'AWS', 'AWS Lambda'],
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firestore', 'DynamoDB', 'Prisma'],
  },
  {
    title: 'Tools & AI',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'GitHub Copilot', 'Cursor', 'Claude Code', 'ChatGPT', 'Antigravity'],
  },
];

const foundations = [
  'Data Structures & Algorithms',
  'OOP',
  'Software Design',
  'SDLC & Agile',
  'System Analysis',
  'API Testing',
  'Code Review',
];

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <Container>
        <SectionHeader
          title="Technical Skills"
          subtitle="The languages, frameworks and tools I use to build and ship production software."
        />

        <motion.div
          variants={staggerContainer}
          className="max-w-5xl mx-auto bg-card rounded-2xl border border-border shadow-sm divide-y divide-border"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-6 p-5 md:p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary md:pt-2">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((name) => {
                  const Icon = skillIcons[name];
                  return (
                    <li
                      key={name}
                      className="flex items-center gap-2 px-3 py-1.5 bg-surface text-text-primary text-sm font-medium rounded-lg border border-border hover:border-primary/60 transition-colors"
                    >
                      {Icon && <Icon aria-hidden="true" className="w-4 h-4 shrink-0 text-text-muted" />}
                      {name}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="max-w-5xl mx-auto mt-6 text-center text-text-secondary text-[15px] leading-relaxed"
        >
          <span className="font-semibold text-text-primary">Foundations: </span>
          {foundations.join(' · ')}
        </motion.p>
      </Container>
    </SectionWrapper>
  );
}
