'use client'

import dynamic from 'next/dynamic'

// Lazy load topographic background to improve initial render
// Must be client-only as it uses browser APIs
const TopographicBackground = dynamic(
  () =>
    import('@/components/landing/TopographicBackground').then((mod) => ({
      default: mod.TopographicBackground,
    })),
  { ssr: false }
)

export function SubtleThreeBackgroundWrapper() {
  return <TopographicBackground />
}
