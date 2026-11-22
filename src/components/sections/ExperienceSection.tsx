'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Briefcase, Calendar, MapPin, Trophy } from 'lucide-react';
import { skillIcons } from '@/data/skillIcons';

/** Renders text with **bold** segments highlighted. */
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-text-primary">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

const experiences = [
  {
    company: "Neeramoy Digital Services Ltd.",
    role: "Software Engineer",
    duration: "April 2026 – Present",
    location: "Dhaka, Bangladesh",
    responsibilities: [
      "Develop and maintain **healthcare web applications** and backend workflows using Angular, Python, Firebase Cloud Functions, AWS, and REST APIs, contributing across frontend and backend modules.",
      "Built Firebase Cloud Messaging (FCM) push notification workflows delivering **90+ notifications per month**, and architected an **end-to-end Google Analytics 4 (GA4) integration** with technical documentation for consistent user behavior tracking.",
      "Owned the end-to-end delivery of a healthcare microsite, taking it **from development to production launch in 3 weeks**, including implementation, documentation, and post-launch improvements.",
      "Collaborate with senior engineers in an Agile team through code reviews, debugging, technical discussions, and feature planning, using AI-assisted tools while validating all generated code through testing and review."
    ],
    technologies: ["Angular", "Python", "Firebase", "AWS", "REST APIs", "Google Analytics 4", "Agile", "Jira", "DynamoDB"],
    achievements: "Delivered a healthcare microsite from development to production in **3 weeks** and implemented the analytics and notification workflows supporting the platform's operations."
  }
];

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="bg-surface/30">
      <Container>
        <SectionHeader
          title="Work Experience"
          subtitle="Where I've worked and the impact I've made."
        />

        <motion.div variants={staggerContainer} className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp) => (
            <motion.article
              key={`${exp.company}-${exp.role}`}
              variants={fadeInUp}
              className="p-6 md:p-8 bg-card rounded-2xl border border-border shadow-sm"
            >
              <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-1">{exp.role}</h3>
                  <p className="flex items-center gap-2 text-primary font-medium text-lg">
                    <Briefcase size={18} aria-hidden="true" />
                    <span>{exp.company}</span>
                  </p>
                </div>

                <div className="flex flex-wrap md:flex-col gap-2 text-text-muted text-sm font-medium">
                  <span className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-border">
                    <Calendar size={16} aria-hidden="true" />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-border">
                    <MapPin size={16} aria-hidden="true" />
                    {exp.location}
                  </span>
                </div>
              </header>

              <ul className="list-disc list-outside ml-5 space-y-3 text-text-secondary leading-relaxed marker:text-primary mb-6">
                {exp.responsibilities.map((resp) => (
                  <li key={resp}>
                    <Emphasis text={resp} />
                  </li>
                ))}
              </ul>

              {exp.achievements && (
                <div className="flex gap-3 p-4 mb-6 bg-primary/10 rounded-r-xl border-l-4 border-primary">
                  <Trophy size={20} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-text-secondary leading-relaxed">
                    <span className="font-semibold text-text-primary">Key achievement: </span>
                    <Emphasis text={exp.achievements} />
                  </p>
                </div>
              )}

              <ul className="flex flex-wrap gap-2 pt-5 border-t border-border" aria-label="Technologies used">
                {exp.technologies.map((tech) => {
                  const Icon = skillIcons[tech];
                  return (
                    <li
                      key={tech}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-surface text-text-primary rounded-lg border border-border"
                    >
                      {Icon && <Icon aria-hidden="true" className="w-4 h-4 shrink-0 text-text-muted" />}
                      {tech}
                    </li>
                  );
                })}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
