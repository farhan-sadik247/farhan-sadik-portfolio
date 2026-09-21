'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp } from '@/utils/animations';
import { ExternalLink } from 'lucide-react';
import { GitHub } from '@mui/icons-material';
import { IconButton, Button } from '@mui/material';

const categories = ["All", "Featured", "Frontend", "Full Stack", "Healthcare", "Database"];

const projectsData = [
  {
    id: 1,
    title: "Academic Journal Publish Website",
    category: "Full Stack",
    description: "Built a full-stack academic journal platform supporting end-to-end workflow: submission → peer review → editorial decision → copyediting → publication. Integrated Google OAuth with role-based access and promotion system. Enabled real-time manuscript tracking, email notifications, and manual payment processing via bank transfer.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708783/journal_laauze.png",
    techStack: ["Next.js", "MongoDB", "TypeScript", "NextAuth.js", "SCSS"],
    github: "https://github.com/farhan-sadik247/journalWebsite.git",
    live: "https://gjadt.vercel.app/"
  },
  {
    id: 15,
    title: "codeWithFarhan",
    category: "Full Stack",
    description: "A full-stack Python Learning Platform designed for structured course delivery, coding practice, and progress tracking. It features role-based Admin, Teacher, and Student dashboards, course and lesson management, coding homeworks with Monaco Editor, Python code execution, automated test-case grading, submissions, and student progress tracking.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1790000737/python-learning-website_gfjg6d.png",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Prisma", "PostgreSQL", "Supabase", "Python", "Monaco Editor", "Node.js", "Vercel"],
    github: "https://github.com/farhan-sadik247/python-learning-platform",
    live: "https://codewithfarhan.vercel.app/"
  },
  {
    id: 2,
    title: "Tailor Maven",
    category: "Full Stack",
    description: "Developed an online tailoring platform with 3D suit previews, real-time customization using React Three Fiber, and live chat. Integrated Stripe payment gateway and OAuth2.0 login system for secure and seamless transactions.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708790/tailor_gpbqbw.png",
    techStack: ["MERN Stack", "Stripe", "Socket.io", "React Three Fiber"],
    github: "https://github.com/farhan-sadik247/TailorMaven.git",
    live: "https://tailor-maven-app.vercel.app/"
  },
  {
    id: 3,
    title: "Neeramoy Digital Services Ltd.",
    category: "Healthcare",
    description: "Implemented scheduled push notifications, backend validation, REST API integrations, Google Analytics 4, and enhancements to the clinic attendant module while contributing to healthcare web applications built with Angular, Python, Firebase, and AWS Lambda.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784709397/neeramoy_hik3yq.png",
    techStack: ["Angular", "Python", "Firebase", "AWS Lambda", "REST APIs"],
    github: "https://github.com/farhan-sadik247",
    live: "https://neeramoy.com/"
  },
  {
    id: 4,
    title: "Missing Link",
    category: "Full Stack",
    description: "Developed a decentralized application (DApp) for reporting, tracking, and assisting in finding missing individuals. Enabled public case visibility and secure on-chain reporting with smart contracts on Ethereum.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708783/missing-link_hsyqqw.jpg",
    techStack: ["Solidity", "React.js", "Web3.js", "Truffle", "Docker"],
    github: "https://github.com/farhan-sadik247/missing-person.git",
    live: ""
  },
  {
    id: 5,
    title: "Shoe Bay - AI Shoe Assistant",
    category: "Full Stack",
    description: "A conversational e-commerce web app for discovering and buying shoes that combines classic product browsing with an AI shopping assistant. Features include AI-powered search and recommendations, comprehensive shoe catalog, and cart functionality.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708783/shoebay_apvjau.png",
    techStack: ["Next.js", "React", "TypeScript", "MongoDB", "NextAuth", "Groq AI", "SCSS"],
    github: "https://github.com/farhan-sadik247/ai-ecommerce-chatbot",
    live: "https://shoe-bay247.vercel.app/"
  },
  {
    id: 6,
    title: "Dua - Islamic Supplications Website",
    category: "Frontend",
    description: "A modern web application for browsing, learning, and managing Islamic duas. Features include a fully functional categories sidebar, context-aware dua cards, and a complete admin dashboard for CRUD operations.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784711443/dua_cyv8av.png",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "SQLite", "Node.js"],
    github: "https://github.com/farhan-sadik247/Dua---Islamic-Supplications-Website.git",
    live: "https://dua-pori.vercel.app/"
  },
  {
    id: 7,
    title: "Disease Diagnosis & Symptom Checker",
    category: ["Healthcare", "Database"],
    description: "A comprehensive full-stack web application for exploring 395+ diseases and checking symptoms. Features an intelligent AI-powered symptom matching system, advanced filtering, and a medical-grade user interface.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784711443/disease_jnb3bj.png",
    techStack: ["React 18", "TypeScript", "Vite", "Django", "SQLite", "SCSS"],
    github: "https://github.com/farhan-sadik247/diseaseDiagonose",
    live: "https://diseasediagonose.vercel.app/"
  },
  {
    id: 8,
    title: "Education Platform Website",
    category: "Full Stack",
    description: "Created an e-learning platform inspired by BUX, allowing teachers to upload and manage content. Implemented secure user roles for students and instructors. Enabled enrollment system and dashboard for viewing lectures and progress.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708783/edu_bv0gdn.png",
    techStack: ["React.js", "Django", "PostgreSQL"],
    github: "https://github.com/farhan-sadik247/EducationPlatForm-Frontend",
    live: ""
  },
  {
    id: 9,
    title: "Snake Game",
    category: "Featured",
    description: "A classic Snake game built with Python and Pygame featuring modern graphics and smooth gameplay mechanics. Includes beautiful brick-style borders, multiple game states, real-time scoring system, responsive controls with arrow keys.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708783/snakeGame_ixleu2.png",
    techStack: ["Python", "Pygame"],
    github: "https://github.com/farhan-sadik247/snakeGame_Python",
    live: ""
  },
  {
    id: 10,
    title: "Mini Design Editor App",
    category: "Frontend",
    description: "Built a cross-platform mobile design editor with canvas rendering via Skia, enabling real-time drawing and manipulation. Integrated gesture-based interactions (drag, pinch, zoom) using Gesture Handler and smooth 60fps animations with Reanimated.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784709879/design-editor_vvmvxs.png",
    techStack: ["React Native", "Expo", "TypeScript", "Skia", "Reanimated"],
    github: "https://github.com/farhan-sadik247/dragNdrop_editorApp.git",
    live: "https://tinyurl.com/DragNDrop2o"
  },
  {
    id: 11,
    title: "Calculator Website",
    category: "Frontend",
    description: "SadikCalc is a sleek and functional scientific calculator application designed to handle both basic arithmetic and advanced mathematical operations. Supports features such as trigonometric functions, logarithmic and exponential operations, constants like π and e.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708782/calc_eltav4.png",
    techStack: ["MERN Stack", "Node.js", "Tailwind CSS"],
    github: "https://github.com/farhan-sadik247/calculator-app.git",
    live: "https://calcsdk.netlify.app/"
  },
  {
    id: 12,
    title: "House Rental Website",
    category: "Full Stack",
    description: "Designed a city-specific rental platform with searchable listings and booking functionality. Implemented an admin panel to manage property data and access control. Focused on ease-of-use for individuals relocating to Dhaka.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708785/tolet_fugpxb.png",
    techStack: ["Django", "SQLite", "HTML/CSS"],
    github: "https://github.com/farhan-sadik247/House-Rental-Website.git",
    live: ""
  },
  {
    id: 13,
    title: "BD Medicine Database",
    category: ["Full Stack", "Database"],
    description: "A comprehensive Next.js web application for searching and browsing medicines and drugs available in Bangladesh. Features advanced search with full-text search across medicine names, generic names, manufacturers, and categories.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708782/bdmedicine_pnq77j.png",
    techStack: ["Next.js", "React 19", "TypeScript", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/farhan-sadik247/bdmedicine_database",
    live: "https://bdmedicine.vercel.app/"
  },
  {
    id: 14,
    title: "Age Calculator & Health Hub",
    category: ["Healthcare", "Frontend"],
    description: "A comprehensive health and wellness application that calculates exact age with precision and provides personalized health insights. Features include personalized BMI analysis, custom diet plans, health tips tailored to user needs.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708782/ageCalc_x0mqos.png",
    techStack: ["Next.js", "React", "TypeScript", "SCSS", "jsPDF"],
    github: "https://github.com/farhan-sadik247/age-calculator",
    live: "https://age-health-calculator.vercel.app/"
  }
];

interface ProjectsSectionProps {
  limit?: number;
  title?: string;
  subtitle?: string;
  hideViewAll?: boolean;
}

export function ProjectsSection({ 
  limit, 
  title = "Featured Projects", 
  subtitle = "A selection of my recent work, highlighting complex problem-solving and modern web development practices.",
  hideViewAll = false
}: ProjectsSectionProps = {}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projectsData.filter((project) => {
    const projectCategories = Array.isArray(project.category) ? project.category : [project.category];
    return activeCategory === "All" || projectCategories.includes(activeCategory);
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <SectionWrapper id="projects">
      <Container>
        <SectionHeader 
          title={title} 
          subtitle={subtitle}
        />

        {/* Filters */}
        <motion.div variants={fadeInUp} className="flex justify-center mb-12">
          {/* Categories */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === category 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-surface text-text-primary border-border hover:border-primary/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-1 md:col-span-2 text-center py-20"
              >
                <p className="text-text-muted text-lg">No projects found matching your criteria.</p>
              </motion.div>
            ) : (
              displayedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all hover:border-primary/50"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-surface">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.live && (
                        <Button 
                          variant="contained" 
                          color="primary"
                          startIcon={<ExternalLink size={18} />}
                          href={project.live}
                          target="_blank"
                        >
                          Live Demo
                        </Button>
                      )}
                      {project.github && (
                        <IconButton 
                          component="a" 
                          href={project.github} 
                          target="_blank"
                          sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'gray.200' } }}
                        >
                          <GitHub sx={{ fontSize: 20 }} />
                        </IconButton>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-end ml-4">
                        {(Array.isArray(project.category) ? project.category : [project.category]).map(cat => (
                          <span key={cat} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full whitespace-nowrap">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-1 bg-surface text-text-secondary text-xs font-medium rounded-md border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {limit && !hideViewAll && displayedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 flex justify-center"
          >
            <Button 
              component={Link}
              href="/projects"
              variant="outlined" 
              color="primary" 
              size="large"
              sx={{ borderRadius: '9999px', px: 4, py: 1.5, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
            >
              View All Projects
            </Button>
          </motion.div>
        )}
      </Container>
    </SectionWrapper>
  );
}
