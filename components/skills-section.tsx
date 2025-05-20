"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Layout,
  Database,
  GitBranch,
  Terminal,
  Layers,
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ElementType;
  level: number;
  color: string;
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const frontendSkills: Skill[] = [
    {
      name: "HTML & CSS",
      icon: Layout,
      level: 90,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "JavaScript",
      icon: Code,
      level: 85,
      color: "from-yellow-500 to-amber-500",
    },
    {
      name: "React",
      icon: Code,
      level: 80,
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "TypeScript",
      icon: Code,
      level: 75,
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "Tailwind CSS",
      icon: Layout,
      level: 85,
      color: "from-cyan-400 to-teal-500",
    },
  ];

  const backendSkills: Skill[] = [
    {
      name: "Node.js",
      icon: Terminal,
      level: 70,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Express",
      icon: Layers,
      level: 65,
      color: "from-gray-500 to-slate-500",
    },
    {
      name: "MongoDB",
      icon: Database,
      level: 60,
      color: "from-green-600 to-emerald-600",
    },
    {
      name: "Git & GitHub",
      icon: GitBranch,
      level: 80,
      color: "from-orange-600 to-red-600",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isInView) {
      const ctx = gsap.context(() => {
        // Animate skill bars with scroll-based reveal
        gsap.from(".skill-progress", {
          width: 0,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Animate skill cards with 3D effect
        gsap.from(".skill-card", {
          y: 100,
          opacity: 0,
          rotationX: 15,
          transformOrigin: "center top",
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Animate skill icons
        gsap.from(".skill-icon", {
          scale: 0,
          rotation: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.3,
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Parallax effect on section
        gsap.to(".skills-parallax", {
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [isInView]);

  const SkillCard = ({ skill }: { skill: Skill }) => {
    const Icon = skill.icon;

    return (
      <div className="skill-card bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-500 transform-style-3d hover:-translate-y-2 hover:shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`skill-icon w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center text-white transform-style-3d`}
          >
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-semibold">{skill.name}</h3>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`skill-progress h-full rounded-full bg-gradient-to-r ${skill.color}`}
            style={{ width: `${skill.level}%` }}
          />
        </div>
        <div className="mt-2 text-right text-sm text-muted-foreground">
          {skill.level}%
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="container px-4 mx-auto relative">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>

      <div className="skills-container skills-parallax space-y-16">
        <div>
          <h3 className="text-2xl font-bold mb-8 relative">
            <span className="relative z-10">Frontend Development</span>
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-primary to-purple-500"></span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontendSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-8 relative">
            <span className="relative z-10">Backend Development</span>
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-primary to-purple-500"></span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {backendSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
