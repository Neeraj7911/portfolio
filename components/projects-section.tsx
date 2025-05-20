"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: "web" | "mobile" | "other";
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalContentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeProject, setActiveProject] = useState(0);
  const [showHorizontalCursor, setShowHorizontalCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const projects: Project[] = [
    {
      id: "project1",
      title: "E-Commerce Dashboard",
      description:
        "A responsive dashboard for e-commerce analytics with real-time data visualization and user management.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React", "Tailwind CSS", "Chart.js", "Firebase"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "web",
    },
    {
      id: "project2",
      title: "Task Management App",
      description:
        "A productivity app for managing tasks, projects, and team collaboration with drag-and-drop functionality.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React", "TypeScript", "Redux", "Node.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "web",
    },
    {
      id: "project3",
      title: "Weather Forecast App",
      description:
        "A weather application that provides real-time forecasts, hourly updates, and location-based weather data.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React", "API Integration", "Geolocation", "CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "mobile",
    },
    {
      id: "project4",
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing projects, skills, and professional detailexperience with modern design.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React", "GSAP", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "web",
    },
    {
      id: "project5",
      title: "Recipe Finder",
      description:
        "A recipe application that allows users to search for recipes based on ingredients, dietary restrictions, and cuisine.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React", "API Integration", "Responsive Design"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "other",
    },
  ];

  // Handle mouse movement for custom cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  // Navigate to previous project
  const prevProject = () => {
    if (activeProject > 0) {
      navigateToProject(activeProject - 1);
    }
  };

  // Navigate to next project
  const nextProject = () => {
    if (activeProject < projects.slice(0, 3).length - 1) {
      navigateToProject(activeProject + 1);
    }
  };

  // Navigate to specific project
  const navigateToProject = (index: number) => {
    setActiveProject(index);

    if (horizontalContentRef.current) {
      const projectWidth = horizontalContentRef.current.clientWidth / 3;
      const targetScrollLeft = index * projectWidth;

      gsap.to(horizontalContentRef.current, {
        scrollLeft: targetScrollLeft,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isInView) {
      const ctx = gsap.context(() => {
        // Animate project cards with staggered reveal
        gsap.fromTo(
          ".project-card",
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".projects-container",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          }
        );

        // Create horizontal scroll for featured projects
        if (horizontalRef.current && horizontalContentRef.current) {
          const totalWidth = horizontalContentRef.current.scrollWidth;
          const containerWidth = horizontalContentRef.current.clientWidth;
          const distanceToScroll = totalWidth - containerWidth;

          // Set up ScrollTrigger for horizontal scrolling
          gsap.to(horizontalContentRef.current, {
            scrollLeft: distanceToScroll,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalRef.current,
              start: "top 20%",
              end: () => `+=${distanceToScroll}`,
              pin: true,
              scrub: 0.5, // Smoother scrub value
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (horizontalContentRef.current) {
                  const projectWidth = containerWidth / 3;
                  const newActiveProject = Math.round(
                    self.progress * (projects.slice(0, 3).length - 1)
                  );
                  if (
                    newActiveProject !== activeProject &&
                    newActiveProject >= 0 &&
                    newActiveProject < 3
                  ) {
                    setActiveProject(newActiveProject);
                  }
                }
              },
              onEnter: () => {
                document.body.classList.add("horizontal-scroll-active");
              },
              onLeaveBack: () => {
                document.body.classList.remove("horizontal-scroll-active");
              },
              onLeave: () => {
                document.body.classList.remove("horizontal-scroll-active");
              },
            },
          });
        }

        // Parallax effect on project images
        gsap.fromTo(
          ".project-image",
          { y: 30, opacity: 0.5, scale: 1.1 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".projects-container",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [isInView, activeProject]);

  const ProjectCard = ({ project }: { project: Project }) => {
    return (
      <motion.div
        className="project-card group"
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
      >
        <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm h-full flex flex-col transform-style-3d hover:shadow-xl transition-all duration-500">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={600}
              height={300}
              className="project-image w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-card/70 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent className="flex-grow">
            <CardDescription className="text-muted-foreground">
              {project.description}
            </CardDescription>
          </CardContent>

          <CardFooter className="flex gap-2">
            {project.liveUrl && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1 group-hover:bg-primary/10 transition-colors duration-300"
                asChild
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              </Button>
            )}

            {project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1 group-hover:bg-primary/10 transition-colors duration-300"
                asChild
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={14} />
                  Code
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  const FeaturedProject = ({ project }: { project: Project }) => {
    return (
      <div className="featured-project min-w-full flex items-center p-4">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-xl h-[250px]">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={500}
              height={250}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{project.title}</h3>

            <div className="flex flex-wrap gap-2 my-3">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-card/70 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-muted-foreground line-clamp-3">
              {project.description}
            </p>

            <div className="flex gap-3 mt-4">
              {project.liveUrl && (
                <Button className="gap-2" size="sm" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </Button>
              )}

              {project.githubUrl && (
                <Button variant="outline" className="gap-2" size="sm" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="container px-4 mx-auto relative">
      {/* Background decorative elements */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>

      {/* Featured Projects Horizontal Scroll */}
      <div
        ref={horizontalRef}
        className="relative mb-16 overflow-hidden horizontal-scroll-section"
        onMouseEnter={() => setShowHorizontalCursor(true)}
        onMouseLeave={() => setShowHorizontalCursor(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute top-0 left-0 py-4 z-10">
          <h3 className="text-2xl font-bold bg-background/80 backdrop-blur-sm px-4 py-2 rounded-r-lg">
            Featured Projects
            <span className="block text-sm font-normal text-muted-foreground mt-1">
              Scroll down to see more →
            </span>
          </h3>
        </div>

        {/* Project counter */}
        <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-lg">
          <span className="text-sm font-medium">
            {activeProject + 1}/{projects.slice(0, 3).length}
          </span>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevProject}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 transition-opacity duration-300 ${
            activeProject === 0
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 hover:bg-primary/10"
          }`}
          disabled={activeProject === 0}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextProject}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 transition-opacity duration-300 ${
            activeProject === projects.slice(0, 3).length - 1
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 hover:bg-primary/10"
          }`}
          disabled={activeProject === projects.slice(0, 3).length - 1}
        >
          <ChevronRight size={24} />
        </button>

        {/* Horizontal scrolling container */}
        <div
          ref={horizontalContentRef}
          className="flex overflow-x-hidden"
          style={{ height: "400px" }}
        >
          {projects.slice(0, 3).map((project, index) => (
            <div
              key={project.id}
              className="min-w-full flex-shrink-0 py-8 px-4"
            >
              <FeaturedProject project={project} />
            </div>
          ))}
        </div>

        {/* Scroll indicator dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {projects.slice(0, 3).map((_, i) => (
            <button
              key={i}
              onClick={() => navigateToProject(i)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                i === activeProject
                  ? "bg-primary"
                  : "bg-muted-foreground/50 hover:bg-muted-foreground"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Custom horizontal scroll cursor */}
      {showHorizontalCursor && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex items-center justify-center gap-4 px-4 py-2 bg-primary/80 backdrop-blur-md rounded-full text-white">
            <ChevronLeft size={16} className="animate-pulse" />
            <span className="text-sm font-medium">Scroll</span>
            <ChevronRight size={16} className="animate-pulse" />
          </div>
        </div>
      )}

      {/* All Projects */}
      <div className="projects-container">
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mx-auto flex justify-center">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="web">Web Apps</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="web" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.category === "web")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.category === "mobile")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="other" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.category === "other")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
