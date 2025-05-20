"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Linkedin, Twitter } from "lucide-react";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import EducationSection from "@/components/education-section";
import ContactSection from "@/components/contact-section";
import NavMenu from "@/components/nav-menu";
import BackgroundEffects from "@/components/background-effects";
import CustomCursor from "@/components/custom-cursor";
import SmoothScroll from "@/components/smooth-scroll";
import LoadingScreen from "@/components/loading-screen";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Create scroll triggers for each section
      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "education",
        "contact",
      ];

      // Clear any existing ScrollTriggers to prevent duplicates
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: `#${section}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(section),
          onEnterBack: () => setActiveSection(section),
          markers: false,
        });
      });

      // Initialize horizontal scroll sections if they exist
      const horizontalSections = document.querySelectorAll(
        ".horizontal-scroll-section"
      );

      horizontalSections.forEach((section) => {
        const container = section.querySelector(".horizontal-scroll-container");

        if (container) {
          const width = container.scrollWidth;

          gsap.to(container, {
            x: -(width - window.innerWidth + 100),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${width}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });
        }
      });
    }

    return () => {
      // Clean up all scroll triggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <SmoothScroll>
        <CustomCursor />
        <main ref={mainRef} className="relative min-h-screen overflow-hidden">
          <BackgroundEffects />

          <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
            <ThemeToggle />
          </div>

          <NavMenu activeSection={activeSection} />

          <section id="hero" className="min-h-screen">
            <HeroSection />
          </section>

          <section id="about" className="min-h-screen py-20">
            <AboutSection />
          </section>

          <section id="skills" className="min-h-screen py-20">
            <SkillsSection />
          </section>

          <section id="projects" className="min-h-screen py-20">
            <ProjectsSection />
          </section>

          <section id="education" className="min-h-screen py-20">
            <EducationSection />
          </section>

          <section id="contact" className="min-h-screen py-20">
            <ContactSection />
          </section>

          <footer className="py-8 border-t border-border/20 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Neeraj Kumar. All rights reserved.
              </p>
            </div>
          </footer>
        </main>
      </SmoothScroll>
    </ThemeProvider>
  );
}
