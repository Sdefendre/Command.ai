'use client'

import dynamic from 'next/dynamic'
import { Chat } from './Chat'

// Load topographic background after initial render
const TopographicBackground = dynamic(
  () =>
    import('@/components/landing/TopographicBackground').then((mod) => mod.TopographicBackground),
  { ssr: false }
)

export function CommandPageClient() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background supports-[height:100dvh]:min-h-dvh text-foreground">
      {/* Background */}
      <TopographicBackground />

      {/* Chat Interface */}
      <div className="relative z-10">
        <Chat />
      </div>
    </div>
  )
}
