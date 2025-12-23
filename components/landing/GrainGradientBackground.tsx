'use client'

import { useReducedMotion } from 'framer-motion'

/**
 * Professional grain + gradient background
 * Inspired by Linear, Vercel, and modern SaaS sites
 * Uses the site's military olive/khaki color palette
 */
export function GrainGradientBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Base gradient layer - warm military tones */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.45 0.12 95 / 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 20%, oklch(0.5 0.08 50 / 0.1), transparent),
            radial-gradient(ellipse 70% 50% at 20% 80%, oklch(0.55 0.14 95 / 0.08), transparent)
          `,
        }}
      />

      {/* Subtle animated glow - only if motion is allowed */}
      {!shouldReduceMotion && (
        <div
          className="absolute inset-0 animate-pulse-slow"
          style={{
            background: `
              radial-gradient(ellipse 40% 30% at 70% 10%, oklch(0.45 0.12 95 / 0.12), transparent)
            `,
            animationDuration: '8s',
          }}
        />
      )}

      {/* Film grain overlay using SVG filter */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.35] mix-blend-overlay pointer-events-none">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Vignette effect for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, oklch(0.12 0.015 90 / 0.4) 100%)`,
        }}
      />
    </div>
  )
}
