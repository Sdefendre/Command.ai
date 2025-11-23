import { CommandChat } from '@/components/command/CommandChat'

export const metadata = {
  title: 'Command Interface - Life Command OS',
  description: 'Direct interface for Command AI. Ask about VA benefits, claims, and transition.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function CommandPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black supports-[height:100dvh]:min-h-dvh">
      <CommandChat />
    </div>
  )
}
