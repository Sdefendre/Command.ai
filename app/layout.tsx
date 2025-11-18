import type React from 'react'
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: 'Defendre Solutions - Veteran-Owned Software Development',
    template: '%s | Defendre Solutions',
  },
  description:
    'We turn strong ideas into resilient software. Veteran-owned, full-stack engineering firm specializing in AI-powered apps, MVP development, and government-ready SaaS solutions.',
  keywords:
    'veteran-owned software development, full-stack engineering, AI applications, MVP development, government SaaS, Next.js development, TypeScript',
  authors: [
    { name: 'Steve Defendre', url: 'https://www.linkedin.com/in/joseph-m-defendre-a11a47225/' },
  ],
  creator: 'Steve Defendre',
  publisher: 'Defendre Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://defendre-solutions.vercel.app'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/api/rss', title: 'Defendre Solutions Blog RSS Feed' }],
    },
  },
  openGraph: {
    title: 'Defendre Solutions - Veteran-Owned Software Development',
    description:
      'We turn strong ideas into resilient software. Veteran-owned, full-stack engineering firm.',
    url: 'https://defendre-solutions.vercel.app',
    siteName: 'Defendre Solutions',
    images: [
      {
        url: '/defendre-logo.png',
        width: 1200,
        height: 630,
        alt: 'Defendre Solutions - Veteran-Owned Software Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Defendre Solutions - Veteran-Owned Software Development',
    description:
      'We turn strong ideas into resilient software. Veteran-owned, full-stack engineering.',
    images: ['/defendre-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  generator: 'v0.app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/defendre-logo.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/defendre-logo.png" sizes="180x180" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
