import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

type Variant = 'contained' | 'outlined';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg whitespace-nowrap select-none ' +
  'transition-colors duration-200 disabled:opacity-60';

const variants: Record<Variant, string> = {
  contained: 'bg-primary text-on-primary hover:bg-primary-hover',
  outlined: 'border-2 border-primary/60 text-primary hover:border-primary hover:bg-primary/10',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-[15px]',
  lg: 'h-12 px-6 text-base',
};

export function buttonClasses({
  variant = 'contained',
  size = 'md',
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  variant?: Variant;
  size?: Size;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

/**
 * Button-styled link. Internal routes use next/link (client-side navigation);
 * hashes, external URLs, downloads and new-tab links use a plain <a>.
 */
export function ButtonLink({
  href,
  variant,
  size,
  startIcon,
  endIcon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {startIcon && <span aria-hidden="true" className="flex shrink-0">{startIcon}</span>}
      {children}
      {endIcon && <span aria-hidden="true" className="flex shrink-0">{endIcon}</span>}
    </>
  );

  const isInternalRoute = href.startsWith('/') && !props.download && !props.target;
  if (isInternalRoute) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}
