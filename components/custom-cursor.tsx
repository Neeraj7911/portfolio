"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // If mobile, don't show custom cursor
    if (isMobile) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const onMouseMove = (e: MouseEvent) => {
      // Store mouse position
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Add hover effect to interactive elements
    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea')

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    // Hide custom cursor when in horizontal scroll mode
    const checkHorizontalScroll = () => {
      if (document.body.classList.contains("horizontal-scroll-active")) {
        if (cursor) cursor.style.opacity = "0"
        if (cursorDot) cursorDot.style.opacity = "0"
      } else {
        if (cursor) cursor.style.opacity = "1"
        if (cursorDot) cursorDot.style.opacity = "1"
      }
    }

    // Create a MutationObserver to watch for class changes on body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkHorizontalScroll()
        }
      })
    })

    // Start observing the body for class changes
    observer.observe(document.body, { attributes: true })

    // Initial check
    checkHorizontalScroll()

    window.addEventListener("mousemove", onMouseMove)

    // Animation loop for smooth cursor movement
    const animateCursor = () => {
      // Smooth follow with lerp (linear interpolation)
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
      }

      // Update cursor position with smooth interpolation
      cursorX = lerp(cursorX, mouseX, 0.1)
      cursorY = lerp(cursorY, mouseY, 0.1)

      // Apply position to main cursor
      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`
      }

      // Dot follows cursor exactly
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      }

      // Continue animation loop
      requestAnimationFrame(animateCursor)
    }

    // Start animation loop
    animateCursor()

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", checkMobile)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })

      // Clean up the observer
      observer.disconnect()
    }
  }, [isMobile])

  // Don't render on mobile
  if (isMobile) {
    return null
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        ref={cursorDotRef}
        className="fixed w-1 h-1 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  )
}
