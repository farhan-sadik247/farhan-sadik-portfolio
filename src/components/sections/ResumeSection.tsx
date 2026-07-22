'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp } from '@/utils/animations';
import { Button } from '@mui/material';
import { Download, ExternalLink, FileText } from 'lucide-react';

export function ResumeSection() {
  return (
    <SectionWrapper id="resume">
      <Container>
        <SectionHeader 
          title="Resume" 
          subtitle="View my full work history, education, and technical skills."
        />

        <motion.div 
          variants={fadeInUp}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-lg text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-surface rounded-2xl flex items-center justify-center mb-6 border border-border shadow-inner">
                <FileText size={40} className="text-primary" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Ready to review my full profile?
              </h3>
              
              <p className="text-text-muted max-w-lg mx-auto mb-8 text-lg">
                Download my comprehensive resume for a detailed look at my past roles, technical expertise, and academic background.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  startIcon={<Download size={20} />}
                  href="/Farhan_Sadik_CV.pdf"
                  download
                  disableElevation
                  className="px-8 py-3 rounded-xl"
                >
                  Download PDF
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  startIcon={<ExternalLink size={20} />}
                  href="/Farhan_Sadik_CV.pdf"
                  target="_blank"
                  className="px-8 py-3 rounded-xl"
                >
                  Open in Browser
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
