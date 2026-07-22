'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Layout, Server, Cloud, Database, Sparkles, Terminal, Wrench, Lightbulb, CheckCircle } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="text-primary" size={24} />,
    skills: ["Angular", "React.js", "Next.js", "React Native", "Tailwind CSS"]
  },
  {
    title: "Backend",
    icon: <Server className="text-primary" size={24} />,
    skills: ["Node.js", "Express.js", "Firebase Cloud Functions", "AWS Lambda", "REST APIs"]
  },
  {
    title: "Databases",
    icon: <Database className="text-primary" size={24} />,
    skills: ["MongoDB", "Firestore", "MySQL", "DynamoDB"]
  },
  {
    title: "Cloud",
    icon: <Cloud className="text-primary" size={24} />,
    skills: ["AWS", "Firebase", "Firebase Authentication", "FCM"]
  },
  {
    title: "Languages",
    icon: <Terminal className="text-primary" size={24} />,
    skills: ["Python", "JavaScript", "TypeScript", "C", "HTML5", "CSS3"]
  },
  {
    title: "AI Tools",
    icon: <Sparkles className="text-primary" size={24} />,
    skills: ["GitHub Copilot", "Cursor", "ChatGPT", "Codex Code", "Gemini"]
  },
  {
    title: "Development",
    icon: <Wrench className="text-primary" size={24} />,
    skills: ["Git", "GitHub", "Docker", "Postman", "npm"]
  },
  {
    title: "Concepts",
    icon: <Lightbulb className="text-primary" size={24} />,
    skills: ["Data Structures", "Algorithms", "OOP", "SDLC", "Agile", "Software Design", "System Analysis"]
  },
  {
    title: "Practices",
    icon: <CheckCircle className="text-primary" size={24} />,
    skills: ["Code Review", "Debugging", "Documentation", "Requirement Analysis", "API Testing", "Problem Solving", "Continuous Learning"]
  }
];

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <Container>
        <SectionHeader 
          title="Technical Skills" 
          subtitle="A comprehensive overview of my technical expertise and the tools I use to build digital solutions."
        />

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {skillCategories.map((category) => (
            <motion.div 
              key={category.title}
              variants={fadeInUp}
              className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1 bg-surface text-text-primary text-sm font-medium rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
