"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Create a function to update ScrollTrigger when Lenis scrolls
    function connectLenisToScrollTrigger(lenis: Lenis) {
      lenis.on("scroll", ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)
    }

    // Connect Lenis to ScrollTrigger
    if (lenisRef.current) {
      connectLenisToScrollTrigger(lenisRef.current)
    }

    return () => {
      lenisRef.current?.destroy()
      gsap.ticker.remove(lenisRef.current?.raf)
    }
  }, [])

  return <>{children}</>
}
