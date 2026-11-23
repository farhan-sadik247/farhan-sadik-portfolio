import React from 'react';
import { Container } from '../common/Container';
import { ButtonLink } from '../common/ButtonLink';
import { Download, ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { RESUME_URL } from '@/data/navigation';

const socials = [
  { href: 'https://github.com/farhan-sadik247', label: 'Md. Farhan Sadik on GitHub', icon: <FaGithub size={22} /> },
  { href: 'https://www.linkedin.com/in/farhan-sadik247/', label: 'Md. Farhan Sadik on LinkedIn', icon: <FaLinkedin size={22} /> },
  { href: 'mailto:md.farhan.sadik.578@gmail.com', label: 'Email Md. Farhan Sadik', icon: <Mail size={22} /> },
];

/** Inline link in the intro: accent underline that fills in on hover, small arrow nudges out. */
function HeroLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link font-medium text-text-primary rounded-sm bg-linear-to-r from-primary/25 to-primary/25 bg-no-repeat bg-size-[100%_2px] bg-bottom hover:bg-size-[100%_100%] hover:text-text-primary transition-[background-size] duration-300 motion-reduce:transition-none"
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        size={14}
        className="inline-block ml-0.5 -mt-0.5 text-primary transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-28 pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        {/* Soft glows drawn with radial gradients: same look as a large blur() filter,
            but far cheaper to paint on slow devices. */}
        <div className="absolute left-[-20%] top-[-30vh] w-[60vw] h-[80vh] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--primary)_14%,transparent),transparent)] animate-pulse" />
        <div className="absolute right-[-20%] top-[50vh] w-[60vw] h-[80vh] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--secondary)_14%,transparent),transparent)] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Container className="relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content: no entrance animation. This text is the Largest Contentful
              Paint element, so it must be visible as soon as the HTML arrives. */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 border border-primary/20">
                Available for new opportunities
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary">
                Hi, I&apos;m <span className="text-primary">Md. Farhan Sadik</span>
              </h1>
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-text-secondary">
                Software Engineer
              </h2>
            </div>

            <div>
              <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
                I build healthcare web applications at Neeramoy Digital Services, working across the stack with
                Angular, React, Next.js, Python, Firebase and AWS. Outside work I build things I&apos;m curious about,
                like an <HeroLink href="https://shoe-bay247.vercel.app/">AI shopping assistant</HeroLink>, a{' '}
                <HeroLink href="https://codewithfarhan.vercel.app/">Python course platform that grades code</HeroLink>{' '}
                and a <HeroLink href="https://doi.org/10.48550/arXiv.2507.06530">model that turns speech into 3D sign language</HeroLink>.
              </p>
            </div>

            <div className="flex gap-3 sm:gap-4 pt-2">
              <ButtonLink
                href="#projects"
                size="lg"
                className="flex-1 sm:flex-none px-3 sm:px-6 text-sm sm:text-base"
                endIcon={<ArrowRight size={18} />}
              >
                View Projects
              </ButtonLink>
              <ButtonLink
                href={RESUME_URL}
                download
                variant="outlined"
                size="lg"
                className="flex-1 sm:flex-none px-3 sm:px-6 text-sm sm:text-base"
                startIcon={<Download size={18} />}
              >
                Download CV
              </ButtonLink>
            </div>

            <ul className="flex items-center gap-3 pt-2" aria-label="Social links">
              {socials.map(({ href, label, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                    aria-label={label}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-border bg-surface text-text-secondary hover:text-primary hover:border-primary transition-colors"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content: CSS-only entrance so the photo never waits on JavaScript */}
          <div className="flex justify-center relative mt-8 lg:mt-0 animate-hero-photo">
            <div className="relative w-full max-w-75 sm:max-w-87.5 lg:w-100 h-87.5 sm:h-100 lg:h-125 rounded-2xl overflow-hidden border border-border/50 bg-surface shadow-2xl p-4">
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center border border-border/30 overflow-hidden relative">
                {/* Light Theme Image */}
                <Image 
                  src="https://res.cloudinary.com/dupf4kmfg/image/upload/v1784715354/farhan_profie_light_wgz6sd.png" 
                  alt="Md. Farhan Sadik, software engineer" 
                  fill
                  priority
                  className="object-cover block dark:hidden"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {/* Dark Theme Image */}
                <Image 
                  src="https://res.cloudinary.com/dupf4kmfg/image/upload/v1784715017/fathan_profile_inauvp.png" 
                  alt="Md. Farhan Sadik, software engineer" 
                  fill
                  priority
                  className="object-cover hidden dark:block"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
