import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://farhansadik.me"),
  title: {
    default: "Md. Farhan Sadik | Software Developer",
    template: "%s | Md. Farhan Sadik"
  },
  description: "Md. Farhan Sadik is a software developer from Bangladesh specializing in full-stack web development, modern web applications, AI-powered applications and cloud technologies.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://farhansadik.me/",
    title: "Md. Farhan Sadik | Software Developer",
    description: "Md. Farhan Sadik is a software developer from Bangladesh specializing in full-stack web development, modern web applications, AI-powered applications and cloud technologies.",
    images: [
      {
        url: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784715354/farhan_profie_light_wgz6sd.png",
        alt: "Md. Farhan Sadik, software developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Farhan Sadik | Software Developer",
    description: "Md. Farhan Sadik is a software developer from Bangladesh specializing in full-stack web development, modern web applications, AI-powered applications and cloud technologies.",
    images: ["https://res.cloudinary.com/dupf4kmfg/image/upload/v1784715354/farhan_profie_light_wgz6sd.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Md. Farhan Sadik",
              "alternateName": "Farhan Sadik",
              "url": "https://farhansadik.me/",
              "jobTitle": "Software Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Neeramoy Digital Services Ltd."
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "BRAC University"
              },
              "sameAs": [
                "https://github.com/farhan-sadik247",
                "https://www.linkedin.com/in/farhan-sadik247/",
                "https://www.facebook.com/farhan.sadik247",
                "https://www.instagram.com/farhan.sadik247"
              ],
              "knowsAbout": [
                "Software Development",
                "Full-Stack Development",
                "Web Development",
                "Angular",
                "React.js",
                "Next.js",
                "React Native",
                "Node.js",
                "Express.js",
                "Python",
                "JavaScript",
                "TypeScript",
                "REST APIs",
                "Firebase",
                "AWS",
                "DynamoDB",
                "PostgreSQL",
                "MongoDB",
                "Prisma",
                "AI-Assisted Development",
                "Artificial Intelligence",
                "Cloud Computing"
              ],
              "image": "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784715354/farhan_profie_light_wgz6sd.png"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Md. Farhan Sadik",
              "url": "https://farhansadik.me/"
            })
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
