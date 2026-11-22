'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiAngular, SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss,
  SiTypescript, SiJavascript, SiPython, SiC,
  SiNodedotjs, SiExpress, SiFirebase,
  SiPostgresql, SiMysql, SiMongodb, SiPrisma,
  SiGit, SiGithub, SiDocker, SiPostman, SiGithubcopilot, SiCursor, SiClaude,
} from 'react-icons/si';
import {
  TbApi, TbBrandAws, TbLambda, TbDatabase, TbBrandReactNative, TbBrandOpenai, TbSparkles,
} from 'react-icons/tb';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp, staggerContainer } from '@/utils/animations';

type Skill = { name: string; icon: IconType };

const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Python', icon: SiPython },
      { name: 'C', icon: SiC },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'Angular', icon: SiAngular },
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React Native', icon: TbBrandReactNative },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    title: 'Backend & Cloud',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'REST APIs', icon: TbApi },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'Cloud Functions & FCM', icon: SiFirebase },
      { name: 'AWS', icon: TbBrandAws },
      { name: 'AWS Lambda', icon: TbLambda },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Firestore', icon: SiFirebase },
      { name: 'DynamoDB', icon: TbDatabase },
      { name: 'Prisma', icon: SiPrisma },
    ],
  },
  {
    title: 'Tools & AI',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Docker', icon: SiDocker },
      { name: 'Postman', icon: SiPostman },
      { name: 'GitHub Copilot', icon: SiGithubcopilot },
      { name: 'Cursor', icon: SiCursor },
      { name: 'Claude Code', icon: SiClaude },
      { name: 'ChatGPT', icon: TbBrandOpenai },
      { name: 'Antigravity', icon: TbSparkles },
    ],
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
                {group.skills.map(({ name, icon: Icon }) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 px-3 py-1.5 bg-surface text-text-primary text-sm font-medium rounded-lg border border-border hover:border-primary/60 transition-colors"
                  >
                    <Icon aria-hidden="true" className="w-4 h-4 shrink-0 text-text-muted" />
                    {name}
                  </li>
                ))}
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
