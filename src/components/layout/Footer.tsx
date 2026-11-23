'use client';

import React from 'react';
import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';
import { Container } from '../common/Container';
import { navLinks } from '@/data/navigation';
import { ArrowUp, ArrowUpRight, ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const EMAIL = 'md.farhan.sadik.578@gmail.com';

const socialLinks = [
  { name: 'Md. Farhan Sadik on GitHub', icon: <FaGithub size={18} />, href: 'https://github.com/farhan-sadik247' },
  { name: 'Md. Farhan Sadik on LinkedIn', icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/farhan-sadik247/' },
  { name: 'Md. Farhan Sadik on Facebook', icon: <FaFacebook size={18} />, href: 'https://www.facebook.com/farhan.sadik247' },
  { name: 'Md. Farhan Sadik on Instagram', icon: <FaInstagram size={18} />, href: 'https://www.instagram.com/farhan.sadik247' },
  { name: 'Email Md. Farhan Sadik', icon: <Mail size={18} />, href: `mailto:${EMAIL}` },
];

const toolLinks = [{ name: 'URL Shortener', href: '/shortener' }];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 py-1 text-sm text-text-muted transition-colors hover:text-text-primary focus-visible:text-text-primary focus-visible:outline-none"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
      </span>
      <ArrowUpRight
        size={14}
        className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        aria-hidden="true"
      />
    </Link>
  );
}

function FooterColumn({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-primary">{title}</h3>
      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={link.name}>
            <FooterLink href={link.href}>{link.name}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 0.5, delay, ease: 'easeOut' as const },
        };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="border-t border-border/50 bg-surface pt-10 pb-6 md:pt-16 md:pb-8">
      <Container>
        {/* CTA */}
        <m.div
          {...fadeUp()}
          className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-card p-6 md:mb-14 md:p-8"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                Let&apos;s build something together
              </h2>
              <p className="mt-1.5 text-sm text-text-secondary md:text-base">
                Open to opportunities, collaborations, and interesting ideas.
              </p>
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl active:translate-y-0 md:w-auto"
            >
              <Mail size={16} aria-hidden="true" />
              Get in touch
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </m.div>

        {/* Main grid */}
        <div className="mb-10 grid grid-cols-2 gap-x-6 gap-y-10 md:mb-12 md:grid-cols-12 md:gap-8">
          {/* Brand + social */}
          <m.div {...fadeUp(0.05)} className="col-span-2 md:col-span-6">
            <Link href="/" className="group mb-4 inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-slate-400 to-slate-800 shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 md:h-12 md:w-12">
                <span className="text-xl font-bold tracking-tighter text-white md:text-2xl">F</span>
                <span className="text-xl font-bold tracking-tighter text-slate-300 md:text-2xl">S</span>
              </div>
              <div className="mx-1 h-7 w-0.5 rounded-full bg-slate-600/50 md:h-8" />
              <span className="text-xl font-bold tracking-tight text-text-primary md:text-2xl">Portfolio</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-text-secondary md:text-base">
              Computer Science graduate and Software Engineer building impactful digital solutions with modern
              technologies.
            </p>
            <ul className="flex flex-wrap gap-2.5" aria-label="Social links">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    {...(social.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                    aria-label={social.name}
                    title={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-on-primary hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:outline-none"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>

          <m.div {...fadeUp(0.1)} className="col-span-1 md:col-span-3">
            <FooterColumn title="Navigation" links={navLinks.slice(0, 5)} />
          </m.div>

          <m.div {...fadeUp(0.15)} className="col-span-1 md:col-span-3">
            <FooterColumn title="Tools" links={toolLinks} />
          </m.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-center gap-4 border-t border-border pt-6 md:flex-row md:justify-between md:pt-8">
          <div className="text-center text-xs text-text-muted md:text-left md:text-sm">
            <p>© {currentYear} Md. Farhan Sadik. All rights reserved.</p>
            <p className="mt-1">
              Designed and maintained by <span className="font-medium text-text-primary">Farhan Sadik</span>
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-text-muted transition-all hover:border-primary hover:text-text-primary md:text-sm"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
