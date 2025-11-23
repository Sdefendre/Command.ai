import { CommandChat } from '@/components/command/CommandChat'
import { CommandThreeBackground } from '@/components/CommandThreeBackground'

export const metadata = {
  title: 'Command Interface - Life Command OS',
  description: 'Direct interface for Command AI. Ask about VA benefits, claims, and transition.',
}

export default function CommandPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background/80">
      <CommandThreeBackground />
      <CommandChat />
    </div>
  )
}
