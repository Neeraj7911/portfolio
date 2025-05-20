"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (isInView) {
      const ctx = gsap.context(() => {
        // Animate image with 3D effect
        gsap.from(imageRef.current, {
          scale: 0.8,
          opacity: 0,
          rotationY: 25,
          transformOrigin: "center center",
          duration: 1.2,
          ease: "power3.out",
        })

        // Animate image mask reveal
        gsap.to(".image-mask", {
          width: "100%",
          duration: 1.5,
          ease: "power3.inOut",
        })

        // Animate content with staggered reveal
        gsap.from(contentRef.current?.children, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        })

        // Animate tech badges
        gsap.from(".tech-badge", {
          scale: 0,
          opacity: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.5,
        })

        // Parallax effect on image
        gsap.to(".about-image-parallax", {
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      }, sectionRef)

      return () => ctx.revert()
    }
  }, [isInView])

  const technologies = [
    "React",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Node.js",
    "Git",
    "GitHub",
    "GSAP",
    "Framer Motion",
    "Next.js",
  ]

  return (
    <div ref={sectionRef} className="container px-4 mx-auto relative">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div ref={imageRef} className="relative perspective-1000">
          <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl transform-style-3d">
            {/* Image mask for reveal animation */}
            <div className="image-mask absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 w-0 h-full z-10" />

            {/* 3D card effect */}
            <div className="about-image-parallax relative w-full h-full transform rotateY-5 transition-transform duration-500 hover:rotateY-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl" />
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Neeraj Kumar"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-6 -left-6 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -z-10" />

          {/* Code snippet decoration */}
          <div className="absolute -bottom-10 -left-10 p-3 bg-card/30 backdrop-blur-sm border border-border/10 rounded-lg font-mono text-xs text-primary/60 transform rotate-6 hidden md:block">
            {`const developer = {\n  name: "Neeraj",\n  passion: "coding"\n};`}
          </div>
        </div>

        <div ref={contentRef} className="space-y-6">
          <h3 className="text-2xl font-bold reveal-text">
            Software Developer with a passion for creating elegant solutions
          </h3>

          <p className="text-muted-foreground reveal-text">
            I'm a fresh software developer with a strong foundation in modern web technologies. My journey in
            programming began during my computer science studies, where I discovered my passion for building intuitive
            and efficient applications.
          </p>

          <p className="text-muted-foreground reveal-text">
            I specialize in frontend development with React and have experience building responsive, accessible, and
            performant web applications. I'm constantly learning and exploring new technologies to expand my skill set.
          </p>

          <div className="reveal-text">
            <h4 className="text-lg font-semibold mb-3">Technologies I work with:</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="tech-badge px-3 py-1 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-primary/10 transition-colors duration-300"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
