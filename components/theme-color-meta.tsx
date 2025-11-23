'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

/**
 * Dynamically updates the theme-color meta tag based on the current theme.
 * This ensures the browser UI (address bar, etc.) matches the site theme.
 */
export function ThemeColorMeta() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    // Get the meta theme-color tag or create it
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.setAttribute('name', 'theme-color')
      document.head.appendChild(metaThemeColor)
    }

    // Get the actual background color from computed styles
    // This will automatically use the correct theme color
    const root = document.documentElement
    const computedBg = getComputedStyle(root).backgroundColor

    // Set the color - getComputedStyle will return the resolved color
    // which works for both light and dark themes
    if (computedBg && computedBg !== 'rgba(0, 0, 0, 0)' && computedBg !== 'transparent') {
      metaThemeColor.setAttribute('content', computedBg)
    } else {
      // Fallback colors if computed style doesn't work
      if (resolvedTheme === 'dark') {
        metaThemeColor.setAttribute('content', '#1a1a1a')
      } else {
        metaThemeColor.setAttribute('content', '#ffffff')
      }
    }
  }, [resolvedTheme])

  return null
}
