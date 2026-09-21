'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Shield, BookOpen, ExternalLink } from 'lucide-react';

const achievements = [
  {
    title: "A Deep Learning Approach of Translating Speech into 3D Hand Sign Language (ASL)",
    category: "Academic Thesis",
    date: "Jan 2025",
    icon: <BookOpen size={20} />,
    description: (
      <span className="flex flex-col gap-2">
        <span>Proposed a deep learning pipeline to convert speech into 3D ASL animation using speech-to-text, gloss translation, keypoint mapping, and sequence modeling trained on the How2Sign dataset.</span>
        <span>Utilized Whisper, BART, MarianMT, OpenPifPaf, RTMPose3D, ResNet50, MediaPipe, and LSTM for accurate 3D hand sign generation.</span>
        <a href="https://doi.org/10.48550/arXiv.2507.06530" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium mt-1 inline-flex items-center gap-1">
          Read Paper <ExternalLink size={14} />
        </a>
      </span>
    )
  },
  {
    title: "Capture The Flag (CTF) Competitions",
    category: "Extracurricular",
    date: "2024",
    icon: <Shield size={20} />,
    description: (
      <span className="flex flex-col gap-2">
        <span>• Ranked 8th in the final round of BUET CTF 2024, organized by BUET Cybersecurity Club.</span>
        <span>• Secured 5th place in the final round of EWU CTF 2024, hosted by East West University Robotics Club.</span>
      </span>
    )
  }
];

export function AchievementsSection() {
  return (
    <SectionWrapper id="achievements" className="bg-surface/30">
      <Container>
        <SectionHeader 
          title="Achievements & Recognition" 
          subtitle="Awards, certifications, and contributions to the tech community."
        />

        <motion.div 
          variants={staggerContainer}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {achievements.map((item, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="p-6 bg-card rounded-2xl border border-border shadow-sm flex gap-6 hover:shadow-md transition-shadow group"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {item.category}
                  </span>
                  <span className="text-xs text-text-muted">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
