import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import { Container } from '../common/Container';
import { navLinks } from '@/data/navigation';
import { Mail } from 'lucide-react';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const socialLinks = [
  { name: 'GitHub', icon: <GitHub sx={{ fontSize: 20 }} />, href: 'https://github.com/farhan-sadik247' },
  { name: 'LinkedIn', icon: <LinkedIn sx={{ fontSize: 20 }} />, href: 'https://linkedin.com/in/md-farhan-sadik-39826721b' },
  { name: 'Email', icon: <Mail size={20} />, href: 'mailto:md.farhan.sadik.578@gmail.com' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border/50 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-800 shadow-lg transition-transform group-hover:scale-110">
                <span className="font-bold text-2xl text-white tracking-tighter">F</span>
                <span className="font-bold text-2xl text-slate-300 tracking-tighter">S</span>
              </div>
              <div className="h-8 w-[2px] bg-slate-600/50 rounded-full mx-1"></div>
              <span className="font-bold text-2xl tracking-tight text-text-primary">Portfolio</span>
            </Link>
            <p className="text-text-muted max-w-sm">
              Computer Science graduate and Software Engineer building impactful digital solutions with modern technologies.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <IconButton 
                  key={social.name}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  size="small"
                  sx={{ color: 'var(--text-muted)', '&:hover': { color: 'var(--primary)', bgcolor: 'var(--hover)' } }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            © {currentYear} Md. Farhan Sadik. All rights reserved.
          </p>
          <p className="text-sm text-text-muted flex gap-1 flex-wrap items-center justify-center">
            Designed and maintained by <span className="font-medium text-text-primary">Farhan Sadik</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
