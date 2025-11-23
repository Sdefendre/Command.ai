'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { ThemeToggle } from '@/components/theme-toggle'
import { FeedbackDialog } from '@/components/FeedbackDialog'

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="sticky top-0 z-50 w-full border-b border-border/80 dark:border-border/60 bg-background/95 dark:bg-background/95 backdrop-blur-xl relative"
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between max-w-5xl">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 font-semibold text-base sm:text-lg tracking-tight group no-underline"
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-sm shadow-md group-hover:shadow-lg transition-shadow"></div>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-500 dark:via-teal-500 dark:to-emerald-400 bg-clip-text text-transparent">
              Life Command OS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">
            <Link href="/#features" className="hover:text-primary transition-colors no-underline">
              Features
            </Link>
            <Link href="/#pricing" className="hover:text-primary transition-colors no-underline">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors no-underline">
              Blog
            </Link>
            <Link
              href="/ai-agent"
              className="flex items-center gap-1.5 hover:text-primary transition-colors no-underline font-medium"
            >
              <MessageSquare className="h-4 w-4" />
              AI Agent
            </Link>
            <Link href="/roadmap" className="hover:text-primary transition-colors no-underline">
              Roadmap
            </Link>
            <Link href="/changelog" className="hover:text-primary transition-colors no-underline">
              Changelog
            </Link>
            <Link
              href="/dashboard"
              className="font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-80 transition-opacity no-underline"
            >
              Dashboard
            </Link>
            <FeedbackDialog />
            <ThemeToggle />
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
            <FeedbackDialog />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -mr-1 sm:-mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border/80 dark:border-border/60 bg-background/95 dark:bg-background/95 backdrop-blur-xl overflow-hidden fixed top-14 sm:top-16 left-0 right-0 z-40"
          >
            <nav className="flex flex-col p-4 space-y-3 text-sm font-medium">
              <Link
                href="/#features"
                className="py-2.5 border-b border-border/50 active:bg-accent/50 rounded-sm px-2 -mx-2 no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#pricing"
                className="py-2.5 border-b border-border/50 active:bg-accent/50 rounded-sm px-2 -mx-2 no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="py-2.5 border-b border-border/50 active:bg-accent/50 rounded-sm px-2 -mx-2 no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/ai-agent"
                className="py-2.5 border-b border-border/50 active:bg-accent/50 rounded-sm px-2 -mx-2 no-underline flex items-center gap-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="h-4 w-4" />
                AI Agent
              </Link>
              <Link
                href="/roadmap"
                className="py-2.5 border-b border-border/50 active:bg-accent/50 rounded-sm px-2 -mx-2 no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Roadmap
              </Link>
              <Link
                href="/changelog"
                className="py-2.5 border-b border-border/50 active:bg-accent/50 rounded-sm px-2 -mx-2 no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Changelog
              </Link>
              <Link
                href="/dashboard"
                className="py-2.5 border-b border-border/50 text-primary font-medium active:bg-accent/50 rounded-sm px-2 -mx-2 no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
