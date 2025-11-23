'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Handle theme toggle
  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  // Show a placeholder during SSR to prevent layout shift
  if (!mounted) {
    return (
      <button
        className="relative p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem] opacity-0" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
