import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Container } from "@/components/common/Container";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "All Projects | Farhan Sadik",
  description: "Browse through all my web applications, backend systems, and software projects.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      <Container className="pt-8">
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group mb-[-2rem] relative z-10"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </Container>
      <ProjectsSection 
        title="All Projects" 
        subtitle="Browse through my complete portfolio of web applications, backend systems, and software projects."
        hideViewAll={true}
      />
    </div>
  );
}
