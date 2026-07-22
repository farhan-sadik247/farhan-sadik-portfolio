'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Code, BookOpen, Coffee, Target } from 'lucide-react';

export function AboutSection() {
  const highlights = [
  {
    icon: <Code className="text-primary" size={24} />,
    title: "Core Strengths",
    description:
      "Software Engineering, Data Structures & Algorithms, REST API Development, Agile Development, and analytical problem solving."
  },
  {
    icon: <Target className="text-primary" size={24} />,
    title: "Tech Stack",
    description:
      "Angular, React, Next.js, Python, Node.js, Firebase, AWS Lambda, TypeScript, and modern AI-assisted development tools."
  },
  {
    icon: <BookOpen className="text-primary" size={24} />,
    title: "Education",
    description: (
      <>
        Bachelor of Science in Computer Science & Engineering (B.Sc. CSE)<br />
        BRAC University<br />
        Jun 2021 – May 2025
      </>
    )
  },
  {
    icon: <Coffee className="text-primary" size={24} />,
    title: "Relevant Coursework",
    description:
      "Data Structures & Algorithms, Software Engineering, Object-Oriented Programming, Database Systems, Computer Networks, System Analysis & Design, and Natural Language Processing."
  }
];

  return (
    <SectionWrapper id="about" className="bg-surface/30">
      <Container>
        <SectionHeader 
          title="About Me" 
          subtitle="A glimpse into my professional journey, strengths, and what drives me as a software engineer."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Left: Narrative */}
          <motion.div variants={fadeInUp} className="space-y-6 text-text-muted leading-relaxed text-lg">
            <p>
              I&apos;m a Computer Science graduate with professional experience building robust healthcare applications. My journey is defined by a passion for continuous learning and delivering impactful digital solutions.
            </p>
            <p>
              I have a demonstrated ability to quickly learn unfamiliar technologies and contribute across both frontend and backend systems in Agile environments. I leverage tools like Angular, Python, Firebase, and AWS to build scalable architectures.
            </p>
            <p>
              I heavily utilize AI-assisted development tools to improve productivity, while always validating correctness through rigorous testing, debugging, and code reviews to ensure secure and maintainable codebases.
            </p>
          </motion.div>

          {/* Right: Highlights */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
