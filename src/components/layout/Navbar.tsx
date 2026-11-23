'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ButtonLink } from '../common/ButtonLink';
import { ThemeToggle } from '../common/ThemeToggle';
import { Container } from '../common/Container';
import { navLinks } from '@/data/navigation';
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll(); // set correct state when the page loads already scrolled
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll and allow Escape to close while the drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const isAuthOrShortenerPage = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/shortener');

  return (
    <>
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-surface/80 backdrop-blur-md shadow-sm border-b border-border/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-slate-400 to-slate-800 shadow-lg transition-transform group-hover:scale-110">
            <span className="font-bold text-2xl text-white tracking-tighter">F</span>
            <span className="font-bold text-2xl text-slate-300 tracking-tighter">S</span>
          </div>
          <div className="h-8 w-0.5 bg-slate-600/50 rounded-full mx-1"></div>
          <span className="font-bold text-2xl tracking-tight text-text-primary">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        {!isAuthOrShortenerPage && (
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="text-sm font-medium text-text-primary/80 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          
          {!isAuthOrShortenerPage && (
            <ButtonLink href="/#contact">
              Let&apos;s Talk
            </ButtonLink>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          {!isAuthOrShortenerPage && (
            <button 
              className="p-2 rounded-md hover:bg-hover transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </Container>

    </header>

      {/* Mobile Drawer (rendered outside <header> so its backdrop-blur doesn't trap position: fixed) */}
      <AnimatePresence>
        {mobileMenuOpen && !isAuthOrShortenerPage && (
          <>
            <m.div
              key="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-60 bg-black/30 backdrop-blur-sm"
              aria-hidden="true"
            />
            <m.aside
              key="mobile-menu"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="lg:hidden fixed inset-y-0 right-0 z-70 flex w-[80%] max-w-sm flex-col border-l border-border/50 bg-surface/60 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Menu</span>
                <button
                  className="p-2 rounded-md hover:bg-hover transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {navLinks.map((link, i) => (
                  <m.div
                    key={link.name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-text-primary hover:bg-hover hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </m.div>
                ))}
              </nav>
              <div className="p-5 border-t border-border/50">
                <ButtonLink
                  href="/#contact"
                  size="lg"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  Let&apos;s Talk
                </ButtonLink>
              </div>
            </m.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
