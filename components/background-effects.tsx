"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useTheme } from "next-themes"

export default function BackgroundEffects() {
  const elementsRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create parallax effect for background elements
      gsap.to(".parallax-bg", {
        y: (i, el) => {
          const speed = el.getAttribute("data-speed") || "0.1"
          return Number.parseFloat(speed) * -200
        },
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })

      // Animate floating elements
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        yoyoEase: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "random",
        },
      })

      // Create noise effect
      const noise = document.querySelector(".noise-effect")
      if (noise) {
        gsap.to(noise, {
          backgroundPosition: "random(-500, 500)px random(-500, 500)px",
          duration: 0.5,
          repeat: -1,
          ease: "none",
        })
      }
    }, elementsRef)

    return () => ctx.revert()
  }, [])

  // Generate random elements
  const elements = Array.from({ length: 20 }, (_, i) => {
    const size = Math.floor(Math.random() * 100) + 20 // 20-120px
    const top = Math.floor(Math.random() * 100) // 0-100%
    const left = Math.floor(Math.random() * 100) // 0-100%
    const opacity = Math.random() * 0.15 + 0.05 // 0.05-0.2
    const speed = (Math.random() * 0.2 + 0.05).toFixed(2) // 0.05-0.25

    // Shapes: circle, square, triangle, hexagon
    const shapes = ["rounded-full", "rounded-md", "clip-path-triangle", "clip-path-hexagon"]
    const shape = shapes[Math.floor(Math.random() * shapes.length)]

    // Colors based on theme
    const colors = ["bg-primary", "bg-secondary", "bg-purple-500", "bg-pink-500", "bg-blue-500"]
    const color = colors[Math.floor(Math.random() * colors.length)]

    return { id: i, size, top, left, opacity, shape, color, speed }
  })

  return (
    <div ref={elementsRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Noise texture overlay */}
      <div className="noise-effect absolute inset-0 opacity-5 z-10" />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-background to-background/50 z-0" />

      {/* Floating elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className={`floating-element parallax-bg absolute ${element.shape} ${element.color}`}
          data-speed={element.speed}
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            top: `${element.top}%`,
            left: `${element.left}%`,
            opacity: element.opacity,
            filter: "blur(8px)",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0" />
    </div>
  )
}
