'use client'

import dynamic from 'next/dynamic'

const TopographicBackground = dynamic(
  () =>
    import('@/components/landing/TopographicBackground').then((mod) => ({
      default: mod.TopographicBackground,
    })),
  { ssr: false }
)

export function TopographicBackgroundWrapper() {
  return <TopographicBackground />
}
