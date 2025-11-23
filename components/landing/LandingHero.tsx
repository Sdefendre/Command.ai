'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Medal, Users, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { HeroThreeBackground } from './HeroThreeBackground'

const stats = [
  { label: 'Veterans Served', value: '2.5K+', icon: Users },
  { label: 'Success Rate', value: '94%', icon: Medal },
  { label: 'AI-Powered', value: '24/7', icon: GraduationCap },
]

export function LandingHero() {
  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      <HeroThreeBackground />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
            >
              <Badge
                variant="outline"
                className="mb-6 px-5 py-2 text-sm font-mono font-medium rounded-full border-primary/50 text-primary bg-primary/10 dark:bg-primary/20 uppercase tracking-wider hover:border-primary/70 transition-colors"
              >
                Built by Veterans, For Veterans
              </Badge>
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold tracking-tight mb-6 leading-[1.1] antialiased"
            >
              Stop Surviving. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/80 animate-gradient-x">
                Start Commanding Your Benefits.
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed font-sans"
            >
              AI-powered education for veterans ready to escape survival mode and unlock financial
              freedom.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 },
                },
              }}
              className="text-base sm:text-lg text-muted-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed font-sans"
            >
              Confused about your DD-214? Overwhelmed by C&P exams? Broke after EAS? We&apos;ve been
              there. Let&apos;s navigate your service-connected benefits together.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
                },
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16"
            >
              <Link href="/ai-agent" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-10 py-7 rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all duration-300 bg-primary text-white border-0 group font-semibold relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg px-10 py-7 rounded-full border-2 border-primary/50 hover:border-primary hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all duration-300 font-semibold backdrop-blur-sm"
                >
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicator */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground mb-16"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Free AI Benefits Navigator</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>No credit card required</span>
              <span className="hidden sm:inline">•</span>
              <span>Veteran-owned & operated</span>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="glass rounded-xl p-6 hover:scale-105 transition-all duration-300"
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Image / Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="glass rounded-2xl shadow-2xl overflow-hidden p-2 sm:p-4 hover:shadow-primary/20 hover:bg-white/15 dark:hover:bg-black/15 transition-all duration-500 group">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center relative overflow-hidden hover:scale-[1.01] transition-transform duration-700 ease-out">
              {/* Abstract representation of dashboard */}
              <Image
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop"
                alt="Dashboard Background"
                fill
                className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
                priority
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

              <div className="relative z-10 text-center p-8">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <Shield className="h-20 w-20 text-primary mx-auto mb-4 opacity-80" />
                </motion.div>
                <p className="text-2xl font-mono font-bold text-foreground tracking-widest uppercase">
                  Benefits Navigator Ready
                </p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
