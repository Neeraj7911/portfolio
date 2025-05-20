"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"
import ParticleField from "@/components/particle-field"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subHeadingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple text animation without SplitText
      if (headingRef.current) {
        const headingElements = headingRef.current.querySelectorAll(".animate-text")

        gsap.from(headingElements, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.5,
        })
      }

      // Animate subheading
      if (subHeadingRef.current) {
        gsap.from(subHeadingRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.2,
        })
      }

      // Parallax effect on scroll
      gsap.to(".parallax-layer", {
        y: (i, el) => {
          const speed = el.getAttribute("data-speed") || "0.1"
          return Number.parseFloat(speed) * -200
        },
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Animate the hero content on scroll
      gsap.to(".hero-content", {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      })

      // Rotate 3D elements on scroll
      gsap.to(".rotate-on-scroll", {
        rotationY: 360,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden perspective-1000"
    >
      {/* Particle background */}
      <ParticleField />

      {/* Parallax background elements */}
      <div className="absolute inset-0 z-0">
        <div className="parallax-layer" data-speed="0.2">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="parallax-layer" data-speed="0.3">
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <div className="parallax-layer" data-speed="0.1">
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl" />
        </div>
      </div>

      {/* 3D rotating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="rotate-on-scroll absolute top-1/4 left-1/3 w-32 h-32 border border-primary/20 rounded-lg transform-style-3d" />
        <div className="rotate-on-scroll absolute bottom-1/3 right-1/4 w-40 h-40 border border-purple-500/20 rounded-full transform-style-3d" />
      </div>

      {/* Code snippets floating in background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="parallax-layer" data-speed="0.15">
          <div className="absolute top-1/4 right-1/5 p-4 bg-card/10 backdrop-blur-sm border border-border/10 rounded-lg font-mono text-xs text-primary/40 transform rotate-6">
            {`function animate() {\n  requestAnimationFrame(animate);\n  renderer.render(scene, camera);\n}`}
          </div>
        </div>
        <div className="parallax-layer" data-speed="0.25">
          <div className="absolute bottom-1/3 left-1/5 p-4 bg-card/10 backdrop-blur-sm border border-border/10 rounded-lg font-mono text-xs text-purple-500/40 transform -rotate-3">
            {`const [state, setState] = useState({\n  x: 0,\n  y: 0\n});`}
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto z-10 hero-content">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 perspective-1000"
          >
            <span className="block animate-text">Hi, I'm Neeraj Kumar</span>
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 animate-text">
              Software Developer
            </span>
          </h1>

          <p ref={subHeadingRef} className="text-xl text-muted-foreground mb-8">
            Building elegant solutions to complex problems with clean, efficient code.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <Button size="lg" className="gap-2 relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <Download size={18} />
                Download Resume
              </span>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={18} />
                Contact Me
              </span>
            </Button>
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <div className="flex justify-center items-center">
              <div className="animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
