'use client'

import { useReducedMotion } from 'framer-motion'

/**
 * Military-inspired topographic contour line background
 * Creates a subtle, professional map-like pattern
 */
export function TopographicBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 0%, oklch(0.45 0.12 95 / 0.08), transparent 60%),
            radial-gradient(ellipse 80% 60% at 100% 100%, oklch(0.5 0.08 50 / 0.06), transparent 50%)
          `,
        }}
      />

      {/* Topographic SVG pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: 0.12,
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for contour lines */}
          <linearGradient id="topoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.45 0.12 95)" />
            <stop offset="50%" stopColor="oklch(0.5 0.08 50)" />
            <stop offset="100%" stopColor="oklch(0.55 0.14 95)" />
          </linearGradient>

          {/* Animated gradient for subtle movement */}
          <linearGradient id="topoGradientAnimated" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.55 0.14 95)">
              {!shouldReduceMotion && (
                <animate
                  attributeName="stop-color"
                  values="oklch(0.55 0.14 95); oklch(0.45 0.12 95); oklch(0.55 0.14 95)"
                  dur="12s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor="oklch(0.45 0.12 95)">
              {!shouldReduceMotion && (
                <animate
                  attributeName="stop-color"
                  values="oklch(0.45 0.12 95); oklch(0.55 0.14 95); oklch(0.45 0.12 95)"
                  dur="12s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </linearGradient>
        </defs>

        {/* Topographic contour lines - organic, flowing shapes */}
        <g fill="none" stroke="url(#topoGradient)" strokeWidth="1">
          {/* Layer 1 - Outer contours */}
          <path d="M-100,200 Q200,100 400,180 T800,150 T1200,200 T1600,160 T2000,200" />
          <path d="M-100,280 Q150,200 350,260 T750,220 T1150,280 T1550,240 T1950,280" />
          <path d="M-100,360 Q100,300 300,340 T700,300 T1100,360 T1500,320 T1900,360" />

          {/* Layer 2 - Mid contours */}
          <path d="M-50,450 Q250,380 450,440 T850,400 T1250,460 T1650,420 T2050,450" />
          <path d="M-50,530 Q200,480 400,520 T800,480 T1200,540 T1600,500 T2000,530" />
          <path d="M-50,610 Q150,560 350,600 T750,560 T1150,620 T1550,580 T1950,610" />

          {/* Layer 3 - Inner contours with animation */}
          <g stroke="url(#topoGradientAnimated)" strokeWidth="1.5">
            <path d="M0,700 Q300,640 500,690 T900,650 T1300,710 T1700,670 T2100,700">
              {!shouldReduceMotion && (
                <animate
                  attributeName="d"
                  values="M0,700 Q300,640 500,690 T900,650 T1300,710 T1700,670 T2100,700;
                          M0,710 Q300,650 500,700 T900,660 T1300,720 T1700,680 T2100,710;
                          M0,700 Q300,640 500,690 T900,650 T1300,710 T1700,670 T2100,700"
                  dur="20s"
                  repeatCount="indefinite"
                />
              )}
            </path>
            <path d="M50,780 Q250,730 450,770 T850,730 T1250,790 T1650,750 T2050,780">
              {!shouldReduceMotion && (
                <animate
                  attributeName="d"
                  values="M50,780 Q250,730 450,770 T850,730 T1250,790 T1650,750 T2050,780;
                          M50,790 Q250,740 450,780 T850,740 T1250,800 T1650,760 T2050,790;
                          M50,780 Q250,730 450,770 T850,730 T1250,790 T1650,750 T2050,780"
                  dur="18s"
                  repeatCount="indefinite"
                />
              )}
            </path>
          </g>

          {/* Layer 4 - Lower section */}
          <path d="M-100,860 Q200,810 400,850 T800,810 T1200,870 T1600,830 T2000,860" />
          <path d="M-100,940 Q150,900 350,930 T750,890 T1150,950 T1550,910 T1950,940" />
          <path d="M-100,1020 Q100,980 300,1010 T700,970 T1100,1030 T1500,990 T1900,1020" />
        </g>

        {/* Circular contours - like elevation markers */}
        <g fill="none" stroke="url(#topoGradient)" strokeWidth="0.75" opacity="0.7">
          {/* Top right cluster */}
          <ellipse cx="85%" cy="15%" rx="120" ry="80" />
          <ellipse cx="85%" cy="15%" rx="90" ry="60" />
          <ellipse cx="85%" cy="15%" rx="60" ry="40" />
          <ellipse cx="85%" cy="15%" rx="30" ry="20" />

          {/* Bottom left cluster */}
          <ellipse cx="10%" cy="85%" rx="150" ry="100" />
          <ellipse cx="10%" cy="85%" rx="110" ry="75" />
          <ellipse cx="10%" cy="85%" rx="70" ry="50" />
          <ellipse cx="10%" cy="85%" rx="35" ry="25" />

          {/* Center cluster - subtle */}
          <ellipse cx="45%" cy="55%" rx="180" ry="120" opacity="0.5" />
          <ellipse cx="45%" cy="55%" rx="130" ry="90" opacity="0.5" />
          <ellipse cx="45%" cy="55%" rx="80" ry="55" opacity="0.5" />
        </g>

        {/* Grid lines - very subtle coordinate marks */}
        <g stroke="url(#topoGradient)" strokeWidth="0.5" opacity="0.3">
          <line x1="25%" y1="0" x2="25%" y2="100%" strokeDasharray="8,16" />
          <line x1="50%" y1="0" x2="50%" y2="100%" strokeDasharray="8,16" />
          <line x1="75%" y1="0" x2="75%" y2="100%" strokeDasharray="8,16" />
          <line x1="0" y1="33%" x2="100%" y2="33%" strokeDasharray="8,16" />
          <line x1="0" y1="66%" x2="100%" y2="66%" strokeDasharray="8,16" />
        </g>
      </svg>

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, oklch(0.12 0.015 90 / 0.3) 100%)`,
        }}
      />
    </div>
  )
}
