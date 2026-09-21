'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Container } from '../common/Container';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeader } from '../common/SectionHeader';
import { fadeInUp } from '@/utils/animations';

import { Send, CheckCircle2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b5d4bbb0-7eab-4cb0-87eb-c516e9568d8c",
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        reset();
        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        console.error("Web3Forms Error:", result);
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact">
      <Container>
        <SectionHeader 
          title="Get In Touch" 
          subtitle="Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you."
        />

        <motion.div 
          variants={fadeInUp}
          className="max-w-2xl mx-auto mt-12 bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h3>
                <p className="text-text-muted">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 px-6 py-2.5 rounded-xl border border-border text-text-primary hover:bg-surface-hover transition-colors font-medium"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-4 py-3.5 rounded-xl border ${errors.name ? 'border-red-500' : 'border-border dark:border-slate-600'} bg-surface dark:bg-slate-800/50 text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-slate-500/30 transition-all`}
                      {...register("name")}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className={`w-full px-4 py-3.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-border dark:border-slate-600'} bg-surface dark:bg-slate-800/50 text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-slate-500/30 transition-all`}
                      {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className={`w-full px-4 py-3.5 rounded-xl border ${errors.subject ? 'border-red-500' : 'border-border dark:border-slate-600'} bg-surface dark:bg-slate-800/50 text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-slate-500/30 transition-all`}
                    {...register("subject")}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.subject.message}</p>}
                </div>
                
                <div>
                  <textarea
                    placeholder="Message"
                    rows={5}
                    className={`w-full px-4 py-3.5 rounded-xl border ${errors.message ? 'border-red-500' : 'border-border dark:border-slate-600'} bg-surface dark:bg-slate-800/50 text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-slate-500/30 transition-all resize-none`}
                    {...register("message")}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold text-white bg-bluegrey-500 hover:bg-bluegrey-600 active:bg-bluegrey-700 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={18} />}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
