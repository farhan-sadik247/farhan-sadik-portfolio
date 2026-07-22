'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    company: "Neeramoy Digital Services Ltd.",
    role: "Graduate Engineer",
    duration: "Jul 2026 - Present",
    location: "Dhaka, Bangladesh",
    responsibilities: [
      "Developed and maintained healthcare web applications using Angular, Python, Firebase Cloud Functions, and REST APIs while contributing across both frontend and backend modules.",
      "Worked closely with senior engineers during Agile development, participating in code reviews, debugging, documentation, technical discussions, and feature planning while continuously improving code quality and maintainability.",
      "Used AI-assisted development tools to accelerate implementation while validating generated code through testing, debugging, and manual review to ensure correctness and security."
    ],
    technologies: ["Angular", "Python", "Firebase", "REST APIs", "AWS", "Agile", "Jira", "DynamoDB"],
    achievements: "Improved code quality and maintainability through rigorous code reviews and AI-assisted tooling."
  },
  {
    company: "Neeramoy Digital Services Ltd.",
    role: "Software Engineer Intern (Python & AWS)",
    duration: "Apr 2026 - Jun 2026",
    location: "Dhaka, Bangladesh",
    responsibilities: [
      "Quickly learned new technologies including Firebase Cloud Functions, AWS Lambda, and Angular to implement scheduled push notifications, backend validation, API integration, and automated workflows."
    ],
    technologies: ["Python", "AWS Lambda", "Firebase", "Angular"],
    achievements: ""
  }
];

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="bg-surface/30">
      <Container>
        <SectionHeader 
          title="Work Experience" 
          subtitle="My professional journey and the impact I've made across different organizations."
        />

        <div className="mt-16 max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-border" />

          <motion.div 
            variants={staggerContainer}
            className="space-y-12"
          >
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="relative md:pl-24"
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-[26px] top-1 w-5 h-5 rounded-full bg-primary ring-4 ring-surface items-center justify-center z-10" />

                <div className="p-8 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary mb-1">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-primary font-medium text-lg mb-2">
                        <Briefcase size={18} />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 text-text-muted text-sm font-medium">
                      <div className="flex items-center gap-2 bg-surface/50 px-3 py-1.5 rounded-lg border border-border/50">
                        <Calendar size={16} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-surface/50 px-3 py-1.5 rounded-lg border border-border/50">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <ul className="list-disc list-outside ml-5 space-y-2 text-text-muted leading-relaxed">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                    
                    {exp.achievements && (
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <span className="font-semibold text-text-primary mr-2">Key Achievement:</span>
                        <span className="text-text-muted">{exp.achievements}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {exp.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 text-xs font-medium bg-surface text-text-primary rounded-md border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
