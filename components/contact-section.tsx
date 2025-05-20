"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

interface ContactInfo {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string;
  link?: string;
}

interface SocialLink {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  link: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isInView) {
      const ctx = gsap.context(() => {
        // Animate contact cards
        gsap.from(".contact-card", {
          y: 40,
          opacity: 0,
          rotationX: 10,
          transformOrigin: "center top",
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-cards",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        // Animate form elements
        gsap.from(".form-element", {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        // Animate social icons
        gsap.from(".social-icon", {
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".social-icons",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Parallax effect
        gsap.to(".contact-parallax", {
          y: -20,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (formRef.current) {
        formRef.current.reset();
      }
      alert("Thank you for your message! I'll get back to you soon.");
    }, 1500);
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: "Email",
      value: "kumarrneeraj791@gmail.com",
      link: "mailto:kumarrneeraj791@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: Github,
      title: "GitHub",
      link: "https://github.com",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      link: "https://linkedin.com",
    },
    {
      icon: Instagram,
      title: "Instagram",
      link: "https://twitter.com",
    },
  ];

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
          Get In Touch
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="contact-parallax space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                Let's Talk About Your Project
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I'm open to freelance opportunities, especially for ambitious or
                large-scale projects. Feel free to reach out with any requests
                or questions.
              </p>
            </div>

            <div className="contact-cards grid gap-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={index}
                    className="contact-card bg-card/70 backdrop-blur-md border border-border/30 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">
                          {item.title}
                        </h4>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-muted-foreground text-sm hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div>
              <h4 className="text-base font-semibold mb-3 text-foreground">
                Connect With Me
              </h4>
              <div className="social-icons flex gap-3">
                {socialLinks.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon w-8 h-8 rounded-full bg-card/70 backdrop-blur-md border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <Icon size={16} />
                      <span className="sr-only">{item.title}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="contact-form">
            <Card className="bg-card/70 backdrop-blur-md border border-border/30 rounded-lg transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-foreground">
                  Send Me a Message
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Fill out the form below, and I'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="form-element space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      className="bg-card/50 backdrop-blur-sm border border-border/30 focus:border-primary transition-colors duration-300 text-sm"
                    />
                  </div>

                  <div className="form-element space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      required
                      className="bg-card/50 backdrop-blur-sm border border-border/30 focus:border-primary transition-colors duration-300 text-sm"
                    />
                  </div>

                  <div className="form-element space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-sm font-medium text-foreground"
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Subject of your message"
                      required
                      className="bg-card/50 backdrop-blur-sm border border-border/30 focus:border-primary transition-colors duration-300 text-sm"
                    />
                  </div>

                  <div className="form-element space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      rows={5}
                      required
                      className="bg-card/50 backdrop-blur-sm border border-border/30 focus:border-primary transition-colors duration-300 text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="form-element w-full relative overflow-hidden group bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={16} />
                          Send Message
                        </span>
                      )}
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
