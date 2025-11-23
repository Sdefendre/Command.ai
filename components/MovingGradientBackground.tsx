'use client'

import { useReducedMotion } from 'framer-motion'

/**
 * MovingGradientBackground - A vibrant lava lamp style animated gradient background
 *
 * This component creates colorful, organic-moving blobs that flow like a lava lamp.
 * It adapts to light/dark mode and respects user motion preferences.
 */
export function MovingGradientBackground() {
  const shouldReduceMotion = useReducedMotion()

  // For users who prefer reduced motion, show a static gradient
  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30" />
    )
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base background - lighter for better text visibility */}
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />

      {/* Lava lamp blob 1 - Purple/Pink - Large, slow movement */}
      <div
        className="absolute rounded-full blur-[120px] opacity-30 dark:opacity-40"
        style={{
          width: '800px',
          height: '800px',
          left: '10%',
          top: '20%',
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(236, 72, 153, 0.4) 30%, rgba(168, 85, 247, 0.3) 60%, transparent 80%)',
          animation: 'lava-blob-1 12s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Lava lamp blob 2 - Blue/Cyan - Medium, medium speed */}
      <div
        className="absolute rounded-full blur-[120px] opacity-30 dark:opacity-40"
        style={{
          width: '700px',
          height: '700px',
          left: '70%',
          top: '30%',
          background:
            'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(34, 211, 238, 0.4) 30%, rgba(59, 130, 246, 0.3) 60%, transparent 80%)',
          animation: 'lava-blob-2 10s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Lava lamp blob 3 - Pink/Magenta - Small, fast movement */}
      <div
        className="absolute rounded-full blur-[120px] opacity-25 dark:opacity-35"
        style={{
          width: '600px',
          height: '600px',
          left: '30%',
          top: '50%',
          background:
            'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(219, 39, 119, 0.4) 30%, rgba(236, 72, 153, 0.3) 60%, transparent 80%)',
          animation: 'lava-blob-3 8s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Lava lamp blob 4 - Indigo/Violet - Large, slow reverse */}
      <div
        className="absolute rounded-full blur-[120px] opacity-30 dark:opacity-40"
        style={{
          width: '750px',
          height: '750px',
          left: '50%',
          top: '10%',
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.4) 30%, rgba(99, 102, 241, 0.3) 60%, transparent 80%)',
          animation: 'lava-blob-4 11s ease-in-out infinite reverse',
          willChange: 'transform',
        }}
      />

      {/* Lava lamp blob 5 - Cyan/Blue - Medium, medium reverse */}
      <div
        className="absolute rounded-full blur-[120px] opacity-25 dark:opacity-35"
        style={{
          width: '650px',
          height: '650px',
          left: '20%',
          top: '60%',
          background:
            'radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, rgba(59, 130, 246, 0.4) 30%, rgba(34, 211, 238, 0.3) 60%, transparent 80%)',
          animation: 'lava-blob-5 9s ease-in-out infinite reverse',
          willChange: 'transform',
        }}
      />

      {/* Lava lamp blob 6 - Purple/Violet - Small, fast reverse */}
      <div
        className="absolute rounded-full blur-[120px] opacity-25 dark:opacity-35"
        style={{
          width: '550px',
          height: '550px',
          left: '80%',
          top: '40%',
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(168, 85, 247, 0.4) 30%, rgba(139, 92, 246, 0.3) 60%, transparent 80%)',
          animation: 'lava-blob-6 7s ease-in-out infinite reverse',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
