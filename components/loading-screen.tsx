"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.to(".loading-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      });

      gsap.to(".loading-percent", {
        innerText: 100,
        duration: 1.5,
        snap: { innerText: 1 },
        ease: "power2.inOut",
      });
    }, loadingRef);

    // Calculate random positions only on client side
    const randomPositions = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setPositions(randomPositions);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold mb-8"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          Neeraj Kumar
        </span>
      </motion.div>

      <div className="w-64 h-1 bg-muted/30 rounded-full overflow-hidden mb-2">
        <div className="loading-bar h-full w-0 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
      </div>

      <div className="text-sm text-muted-foreground">
        Loading <span className="loading-percent">0</span>%
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            initial={{
              x: pos.x,
              y: pos.y,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
