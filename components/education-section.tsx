"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Calendar } from "lucide-react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  description: string;
  achievements?: string[];
}

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const education: Education[] = [
    {
      id: "edu1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      duration: "2019 - 2023",
      description:
        "Studied core computer science concepts including algorithms, data structures, software engineering, and web development.",
      achievements: [
        "Graduated with honors (3.8 GPA)",
        "Dean's List for 6 consecutive semesters",
        "Capstone Project: Developed a real-time collaborative coding platform",
      ],
    },
    {
      id: "edu2",
      institution: "Tech Academy",
      degree: "Certificate",
      field: "Full Stack Web Development",
      duration: "2023",
      description:
        "Intensive 12-week bootcamp focused on modern web development technologies and practices.",
      achievements: [
        "Built 5 full-stack applications",
        "Received recognition for best final project",
        "Collaborated with a team of 4 developers on a real-world client project",
      ],
    },
  ];

  const achievements: Achievement[] = [
    {
      id: "ach1",
      title: "Hackathon Winner",
      issuer: "TechFest 2023",
      date: "October 2023",
      description:
        "First place in the annual hackathon for developing an innovative solution for remote healthcare monitoring. Led a team of 4 developers and presented the final product to a panel of industry experts.",
    },
    {
      id: "ach2",
      title: "Open Source Contributor",
      issuer: "GitHub",
      date: "2022 - Present",
      description:
        "Active contributor to several open-source projects with over 50 accepted pull requests. Recognized as a top contributor to the React UI Components library with improvements to accessibility and performance.",
    },
    {
      id: "ach3",
      title: "Web Development Certification",
      issuer: "freeCodeCamp",
      date: "August 2022",
      description:
        "Completed comprehensive certification covering responsive web design, JavaScript algorithms, and front-end libraries. Created 15 projects as part of the certification requirements.",
    },
    {
      id: "ach4",
      title: "Best Student Project Award",
      issuer: "University of Technology",
      date: "May 2023",
      description:
        "Received recognition for developing an innovative collaborative code editor with real-time synchronization and integrated AI code suggestions.",
    },
    {
      id: "ach5",
      title: "Technical Writing Award",
      issuer: "Dev.to Community",
      date: "January 2023",
      description:
        "Awarded for a series of articles on modern JavaScript practices and performance optimization techniques that received over 50,000 views.",
    },
    {
      id: "ach6",
      title: "UI/UX Design Certificate",
      issuer: "Interaction Design Foundation",
      date: "March 2023",
      description:
        "Completed advanced coursework in user experience research, interface design principles, and accessibility standards for web applications.",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate timeline items
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate timeline line
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        {
          height: "100%",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate timeline dots
      gsap.fromTo(
        ".timeline-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.25,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate achievement cards
      gsap.fromTo(
        ".achievement-card",
        { opacity: 0, y: 20, rotationX: 10 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          transformOrigin: "center top",
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".achievements-container",
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-gradient-to-b from-background to-background/95 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-50" />

        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Education & Achievements
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-3 text-foreground">
              <GraduationCap className="text-primary h-6 w-6" />
              Education
            </h3>

            <div ref={timelineRef} className="relative">
              <div className="timeline-line absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-purple-500" />

              <div className="space-y-8">
                {education.map((item, index) => (
                  <div key={item.id} className="timeline-item relative pl-10">
                    <div className="timeline-dot absolute left-[-7px] top-2 w-4 h-4 rounded-full bg-primary border-2 border-background flex items-center justify-center">
                      <span className="text-background font-semibold text-[10px]">
                        {index + 1}
                      </span>
                    </div>

                    <div className="bg-card/70 backdrop-blur-md border border-border/30 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-foreground">
                          {item.institution}
                        </h4>
                        <Badge
                          variant="outline"
                          className="border-primary/30 text-foreground/80"
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          {item.duration}
                        </Badge>
                      </div>

                      <p className="text-base font-medium text-primary mb-2">
                        {item.degree} in {item.field}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {item.achievements && (
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="achievements-container bg-background/70 border border-border/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-3 text-foreground">
              <Award className="text-primary h-6 w-6" />
              Achievements
            </h3>

            <div className="space-y-5">
              {achievements.map((item) => (
                <Card
                  key={item.id}
                  className="achievement-card bg-card/90 backdrop-blur-md border border-border/30 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="h-1 bg-gradient-to-r from-primary to-purple-500" />
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-base font-semibold text-foreground">
                        {item.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-foreground/80 w-fit"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        {item.date}
                      </Badge>
                    </div>
                    <CardDescription className="text-muted-foreground text-sm">
                      {item.issuer}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-5 bg-primary/10 border border-primary/20 rounded-lg">
              <h4 className="text-base font-semibold mb-3 text-foreground">
                Skills Acquired
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "TypeScript",
                  "Next.js",
                  "Node.js",
                  "UI/UX Design",
                  "API Development",
                  "Responsive Design",
                  "Git",
                  "Testing",
                  "Performance Optimization",
                  "Accessibility",
                ].map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-background/70 text-foreground/80"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
