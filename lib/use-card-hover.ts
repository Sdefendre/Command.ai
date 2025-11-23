'use client'

import { useRef, useEffect, useState } from 'react'

/**
 * Hook that tracks mouse position on a card element
 * and provides coordinates for colorful hover effects
 */
export function useCardHover() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    function handleMouseMove(e: MouseEvent) {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePosition({ x, y })
    }

    function handleMouseLeave() {
      // Reset to center when mouse leaves
      setMousePosition({ x: 50, y: 50 })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { cardRef, mousePosition }
}
