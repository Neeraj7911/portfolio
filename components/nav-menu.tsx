"use client"

import { motion } from "framer-motion"
import { Home, User, Code, Briefcase, GraduationCap, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavMenuProps {
  activeSection: string
}

export default function NavMenu({ activeSection }: NavMenuProps) {
  const menuItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "skills", icon: Code, label: "Skills" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "contact", icon: MessageSquare, label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 left-0 w-full flex justify-center z-50"
    >
      <div className="flex flex-row items-center gap-1 p-2 rounded-full backdrop-blur-md bg-background/50 border border-border/50 shadow-lg sm:gap-2 sm:p-3">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <Icon className="relative z-10" size={16} />
              <span className="sr-only">{item.label}</span>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
