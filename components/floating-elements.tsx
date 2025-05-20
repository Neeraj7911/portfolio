"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useTheme } from "next-themes"

export default function FloatingElements() {
  const elementsRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, elementsRef)

    return () => ctx.revert()
  }, [])

  // Generate random elements
  const elements = Array.from({ length: 15 }, (_, i) => {
    const size = Math.floor(Math.random() * 60) + 20 // 20-80px
    const top = Math.floor(Math.random() * 100) // 0-100%
    const left = Math.floor(Math.random() * 100) // 0-100%
    const opacity = Math.random() * 0.15 + 0.05 // 0.05-0.2

    // Shapes: circle, square, triangle
    const shapes = ["rounded-full", "rounded-md", "clip-path-triangle"]
    const shape = shapes[Math.floor(Math.random() * shapes.length)]

    // Colors based on theme
    const colors = ["bg-primary", "bg-secondary", "bg-purple-500", "bg-pink-500", "bg-blue-500"]
    const color = colors[Math.floor(Math.random() * colors.length)]

    return { id: i, size, top, left, opacity, shape, color }
  })

  return (
    <div ref={elementsRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`floating-element absolute ${element.shape} ${element.color}`}
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
    </div>
  )
}
