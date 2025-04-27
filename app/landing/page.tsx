"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Users, Brain, ArrowRight } from "lucide-react"

export default function LandingPage() {
  const [isHoveringCta, setIsHoveringCta] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      <LandingBackground />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-indigo-600/30 backdrop-blur-md flex items-center justify-center">
            <Brain className="h-5 w-5 text-indigo-300" />
          </div>
          <span className="text-xl font-light">Mirro</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-indigo-300 hover:text-white hover:bg-white/5 rounded-full">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-6">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16 md:py-24 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-light leading-tight">Mirro</h1>
          <p className="text-xl md:text-2xl text-indigo-300 font-light">A Mirror. A Sanctuary. A Beginning.</p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Welcome to Mirro—a living space crafted entirely for you. In a world overflowing with noise, Mirro
            offers quiet. A gentle, private space where you can reflect, express, and evolve. Mirro is your mirror,
            your archive, and your companion for the journey inward and forward.
          </p>

          <div className="pt-8">
            <Link href="/signup">
              <motion.div
                onMouseEnter={() => setIsHoveringCta(true)}
                onMouseLeave={() => setIsHoveringCta(false)}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 py-6 text-lg group relative overflow-hidden"
                >
                  <span className="relative z-10">Begin Your Journey</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHoveringCta ? "0%" : "-100%" }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    animate={{ x: isHoveringCta ? 0 : 10, opacity: isHoveringCta ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">Reimagining Connection</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-light">Mirro respects solitude but honors connection</h2>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto">If you choose, discover others through:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Threads"
            description="Connect through meaningful conversations that evolve naturally over time."
            icon={<Brain className="h-6 w-6" />}
            delay={0.1}
          />
          <FeatureCard
            title="Contextual Discovery"
            description="Find connections through shared location and identity markers that matter to you."
            icon={<Users className="h-6 w-6" />}
            delay={0.2}
          />
          <FeatureCard
            title="Insight-based Matches"
            description="Connect with others based on complementary thoughts, interests, and perspectives."
            icon={<Sparkles className="h-6 w-6" />}
            delay={0.3}
          />
        </div>

        <div className="text-center mt-12">
          <p className="text-indigo-300 font-light text-lg">
            You're always in control—anonymous until you choose otherwise.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-16 max-w-4xl mx-auto text-center">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl shadow-indigo-900/10">
          <h2 className="text-2xl md:text-3xl font-light mb-4">Ready to begin your journey?</h2>
          <p className="text-slate-300 mb-8">
            Join Mirro today and discover a new way to connect with yourself and others.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 rounded-full px-8"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-indigo-600/30 backdrop-blur-md flex items-center justify-center">
              <Brain className="h-4 w-4 text-indigo-300" />
            </div>
            <span className="text-sm font-light">Genesis</span>
          </div>
          <div className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Mirro. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-slate-400 hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-slate-400 hover:text-white">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-slate-400 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function LandingBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-900/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-violet-900/20 blur-3xl"></div>
      <div className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-blue-900/20 blur-3xl"></div>

      {/* Animated grid with curved lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 C 30 10, 10 10, 0 0" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="0.5" />
            <path d="M 0 40 C 10 30, 30 30, 40 40" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="0.5" />
            <path d="M 0 0 C 10 10, 10 30, 0 40" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="0.5" />
            <path d="M 40 40 C 30 30, 30 10, 40 0" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-indigo-400"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  delay: number
}

function FeatureCard({ title, description, icon, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg shadow-indigo-900/10"
    >
      <div className="h-12 w-12 rounded-full bg-indigo-900/50 flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-light mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </motion.div>
  )
}
