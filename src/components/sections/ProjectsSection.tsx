'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp } from '@/utils/animations';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { ButtonLink } from '../common/ButtonLink';
import { cn } from '@/utils/cn';
import { categories, projectsData, type Project } from '@/data/projects';

const MAX_TAGS = 4;

const toList = (category: Project['category']) => (Array.isArray(category) ? category : [category]);

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const primaryUrl = project.live || project.github;
  const tags = project.techStack.slice(0, MAX_TAGS);
  const hiddenTags = project.techStack.length - tags.length;

  return (
    <m.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'group relative flex flex-col bg-card rounded-2xl border border-border overflow-hidden shadow-sm',
        'transition-[box-shadow,border-color,translate] duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/60 motion-reduce:hover:translate-y-0',
        'focus-within:border-primary/60',
        featured && 'md:col-span-2 lg:col-span-3 lg:flex-row'
      )}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          'relative aspect-video overflow-hidden bg-surface border-b border-border',
          featured && 'lg:w-3/5 lg:aspect-auto lg:min-h-80 lg:border-b-0 lg:border-r'
        )}
      >
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={featured ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        />
      </div>

      {/* Content */}
      <div className={cn('p-6 flex flex-col flex-1', featured && 'lg:p-8 lg:justify-center')}>
        <div className="flex flex-wrap gap-2 mb-3">
          {toList(project.category).map((cat) => (
            <span
              key={cat}
              className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full whitespace-nowrap"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3
          className={cn(
            'font-bold text-text-primary group-hover:text-primary transition-colors mb-3',
            featured ? 'text-2xl lg:text-3xl' : 'text-xl'
          )}
        >
          {/* Stretched link: makes the whole card clickable */}
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
          >
            {project.title}
          </a>
        </h3>

        <p
          className={cn(
            'text-text-secondary text-[15px] leading-relaxed mb-5',
            featured ? 'lg:text-base' : 'line-clamp-4 flex-1'
          )}
        >
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2 mb-5" aria-label="Tech stack">
          {tags.map((tech) => (
            <li
              key={tech}
              className="px-2 py-1 bg-surface text-text-secondary text-[13px] font-medium rounded-md border border-border"
            >
              {tech}
            </li>
          ))}
          {hiddenTags > 0 && (
            <li className="px-2 py-1 text-text-muted text-[13px] font-medium" title={project.techStack.slice(MAX_TAGS).join(', ')}>
              +{hiddenTags} more
            </li>
          )}
        </ul>

        {/* Actions sit above the stretched link */}
        <div className="relative z-10 flex flex-wrap gap-3 pt-4 border-t border-border">
          {project.live && (
            <ButtonLink
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              startIcon={<ExternalLink size={16} />}
              aria-label={`${project.title}: live site (opens in a new tab)`}
            >
              Live
            </ButtonLink>
          )}
          {project.github && (
            <ButtonLink
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="sm"
              startIcon={<FaGithub size={16} />}
              aria-label={`${project.title}: source code on GitHub (opens in a new tab)`}
            >
              Code
            </ButtonLink>
          )}
        </div>
      </div>
    </m.article>
  );
}

interface ProjectsSectionProps {
  limit?: number;
  title?: string;
  subtitle?: string;
  hideViewAll?: boolean;
  eyebrow?: string;
}

export function ProjectsSection({
  limit,
  title = "Featured Projects",
  subtitle = "A selection of my recent work, highlighting complex problem-solving and modern web development practices.",
  hideViewAll = false,
  eyebrow,
}: ProjectsSectionProps = {}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projectsData.filter(
    (project) => activeCategory === "All" || toList(project.category).includes(activeCategory)
  );

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <SectionWrapper id="projects">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {/* Filters */}
        <m.div variants={fadeInUp} className="flex mb-8">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === category
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface text-text-primary border-border hover:border-primary/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </m.div>

        {/* Projects Grid */}
        <m.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.length === 0 ? (
              <m.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-20"
              >
                <p className="text-text-muted text-lg">No projects found matching your criteria.</p>
              </m.div>
            ) : (
              displayedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} featured={index === 0} />
              ))
            )}
          </AnimatePresence>
        </m.div>

        {limit && !hideViewAll && displayedProjects.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <ButtonLink href="/projects" variant="outlined" size="lg" className="rounded-full px-8">
              View All {projectsData.length} Projects
            </ButtonLink>
          </m.div>
        )}
      </Container>
    </SectionWrapper>
  );
}
