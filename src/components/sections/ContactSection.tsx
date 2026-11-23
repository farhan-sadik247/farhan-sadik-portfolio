'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp } from '@/utils/animations';
import { cn } from '@/utils/cn';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { Send, CheckCircle2, Mail, MapPin, AlertCircle, Loader2, type LucideIcon } from 'lucide-react';

const FIELDS = ['name', 'email', 'subject', 'message'] as const;
type FieldName = (typeof FIELDS)[number];
type ContactFormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

// Small hand-written validator. Keeps zod / react-hook-form (~60 KB) out of the homepage bundle.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateField(field: FieldName, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case 'name':
      return value.length < 2 ? 'Name must be at least 2 characters.' : undefined;
    case 'email':
      return EMAIL_PATTERN.test(value) ? undefined : 'Please enter a valid email address.';
    case 'subject':
      return value.length < 5 ? 'Subject must be at least 5 characters.' : undefined;
    case 'message':
      return value.length < 10 ? 'Message must be at least 10 characters.' : undefined;
  }
}
type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL = 'md.farhan.sadik.578@gmail.com';

const contactLinks: { icon: LucideIcon | IconType; label: string; value: string; href?: string }[] = [
  { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'in/farhan-sadik247', href: 'https://www.linkedin.com/in/farhan-sadik247/' },
  { icon: FaGithub, label: 'GitHub', value: 'farhan-sadik247', href: 'https://github.com/farhan-sadik247' },
  { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh' },
];

const inputClass = (hasError: boolean) =>
  cn(
    'w-full px-4 py-3 rounded-xl border bg-surface text-text-primary placeholder:text-text-muted',
    'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors',
    hasError ? 'border-red-500' : 'border-border'
  );

function Field({
  id,
  label,
  error,
  children,
}: {
  id: FieldName;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-sm mt-1.5">
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactSection() {
  const [status, setStatus] = useState<Status>('idle');

  const [errors, setErrors] = useState<FormErrors>({});

  const fieldProps = (field: FieldName) => ({
    id: field,
    name: field,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  // Once a field has shown an error, re-check it as the user types so the message clears.
  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const field = e.target.name as FieldName;
    if (!FIELDS.includes(field) || !errors[field]) return;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, e.target.value) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(
      FIELDS.map((f) => [f, String(formData.get(f) ?? '').trim()])
    ) as ContactFormValues;

    const nextErrors: FormErrors = {};
    for (const f of FIELDS) {
      const error = validateField(f, data[f]);
      if (error) nextErrors[f] = error;
    }
    setErrors(nextErrors);

    const firstInvalid = FIELDS.find((f) => nextErrors[f]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setStatus('submitting');

    try {
      // Web3Forms access keys are designed to be used client-side.
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b5d4bbb0-7eab-4cb0-87eb-c516e9568d8c",
          ...data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        console.error("Web3Forms Error:", result);
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <SectionWrapper id="contact">
      <Container>
        <SectionHeader
          eyebrow="06 / Contact"
          align="center"
          title="Get In Touch"
          subtitle="Have a role, project or question in mind? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 max-w-5xl mx-auto">
          {/* Left: direct contact */}
          <m.aside
            variants={fadeInUp}
            className="flex flex-col bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm"
          >
            <h3 className="text-xl font-bold text-text-primary mb-2">Prefer to reach out directly?</h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              Email is the fastest way to reach me. I usually reply within a day or two.
            </p>

            <ul className="space-y-4">
              {contactLinks.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon aria-hidden="true" style={{ width: 20, height: 20 }} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-text-muted">{label}</span>
                      <span className="block text-text-primary font-medium break-all group-hover:text-primary transition-colors">
                        {value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                        className="group flex items-center gap-4 rounded-xl -m-2 p-2 hover:bg-hover transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 lg:mt-auto pt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping motion-reduce:animate-none" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-primary" />
              </span>
              Available for new opportunities
            </p>
          </m.aside>

          {/* Right: form */}
          <m.div
            variants={fadeInUp}
            className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm"
          >
            <div aria-live="polite">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <m.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">Message sent!</h3>
                    <p className="text-text-secondary">
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-8 px-6 py-2.5 rounded-xl border border-border text-text-primary hover:bg-hover transition-colors font-medium"
                    >
                      Send another message
                    </button>
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    className="space-y-5"
                    aria-label="Contact form"
                    noValidate
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field id="name" label="Name" error={errors.name}>
                        <input
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Doe"
                          className={inputClass(!!errors.name)}
                          {...fieldProps('name')}
                        />
                      </Field>
                      <Field id="email" label="Email" error={errors.email}>
                        <input
                          type="email"
                          autoComplete="email"
                          placeholder="jane@company.com"
                          className={inputClass(!!errors.email)}
                          {...fieldProps('email')}
                        />
                      </Field>
                    </div>

                    <Field id="subject" label="Subject" error={errors.subject}>
                      <input
                        type="text"
                        placeholder="Software Engineer role at …"
                        className={inputClass(!!errors.subject)}
                        {...fieldProps('subject')}
                      />
                    </Field>

                    <Field id="message" label="Message" error={errors.message}>
                      <textarea
                        rows={5}
                        placeholder="Tell me a bit about what you have in mind…"
                        className={cn(inputClass(!!errors.message), 'resize-y min-h-32')}
                        {...fieldProps('message')}
                      />
                    </Field>

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="flex gap-3 p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-text-primary text-sm"
                      >
                        <AlertCircle size={18} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <p>
                          Sorry, your message couldn&apos;t be sent. Please try again, or email me directly at{' '}
                          <a href={`mailto:${EMAIL}`} className="font-medium text-primary underline underline-offset-2">
                            {EMAIL}
                          </a>
                          .
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold text-on-primary bg-primary hover:bg-primary-hover rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <Send size={18} aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </m.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
