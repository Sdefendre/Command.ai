'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Check, X } from 'lucide-react'
import { track } from '@vercel/analytics'
import { createFadeInUp, viewportOnce } from '@/lib/motion'

export function NewsletterSubscription() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const shouldReduceMotion = useReducedMotion()
  const resetTimerRef = useRef<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    const emailDomain = email.split('@')[1]
    track('newsletter_subscribe_attempt', { email_domain: emailDomain })

    try {
      // Call the newsletter subscription API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing! Check your email for confirmation.')
        setEmail('')
        track('newsletter_subscribe_success', { email_domain: emailDomain })
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again later.')
        track('newsletter_subscribe_error', { error: 'api_error', message: data.error })
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again later.')
      track('newsletter_subscribe_error', { error: 'network_failure' })
    }
  }

  // Auto-reset UI state after showing success/error, with cleanup
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      resetTimerRef.current = window.setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    }
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
        resetTimerRef.current = null
      }
    }
  }, [status])

  return (
    <motion.section
      variants={createFadeInUp(shouldReduceMotion)}
      initial="initial"
      whileInView="animate"
      viewport={viewportOnce}
      className="relative"
    >
      {/* Glass morphism container */}
      <div className="relative glass-card rounded-2xl p-8 max-w-4xl mx-auto">
        {/* Floating dots decoration */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse" />
        <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-300" />
        <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-pulse delay-700" />

        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="glass-morph rounded-full p-4">
              <Mail size={28} className="text-blue-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-3">
            Stay Updated
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Get the latest insights on software development, AI, and veteran entrepreneurship
            delivered straight to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" aria-busy={status === 'loading'}>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 hover:bg-white/10"
              disabled={status === 'loading'}
              aria-label="Email address for newsletter subscription"
              aria-invalid={status === 'error'}
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`relative w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${
                status === 'success'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-default shadow-lg shadow-green-500/25'
                  : status === 'error'
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/25'
                    : status === 'loading'
                      ? 'bg-gradient-to-r from-blue-500/50 to-purple-600/50 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] cursor-pointer'
              }`}
            >
              {status === 'loading' && (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Subscribing...</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <Check size={20} className="animate-bounce" />
                  <span>Subscribed!</span>
                </>
              )}
              {status === 'error' && (
                <>
                  <X size={20} />
                  <span>Try Again</span>
                </>
              )}
              {status === 'idle' && (
                <>
                  <Mail size={20} className="group-hover:animate-pulse" />
                  <span>Subscribe to Newsletter</span>
                </>
              )}
            </button>

            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`text-center p-4 rounded-lg backdrop-blur-sm border ${
                  status === 'success'
                    ? 'text-green-300 bg-green-500/10 border-green-500/30'
                    : 'text-red-300 bg-red-500/10 border-red-500/30'
                }`}
                role={status === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                <p className="text-sm font-medium">{message}</p>
              </motion.div>
            )}
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-600/30">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <div className="w-1 h-1 bg-blue-400/50 rounded-full" />
            <span>No spam, ever</span>
            <div className="w-1 h-1 bg-blue-400/50 rounded-full" />
            <span>Unsubscribe anytime</span>
            <div className="w-1 h-1 bg-blue-400/50 rounded-full" />
            <span>Privacy respected</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
