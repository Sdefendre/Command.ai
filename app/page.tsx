import DefendreSolutionsPortfolio from "@/components/defendre-solutions-portfolio"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Defendre Solutions - Veteran-Owned Software Development",
  description:
    "We turn strong ideas into resilient software. Veteran-owned, full-stack engineering firm specializing in AI-powered apps, MVP development, and government-ready SaaS solutions.",
  keywords:
    "veteran-owned software development, full-stack engineering, AI applications, MVP development, government SaaS, Next.js development, TypeScript",
  authors: [{ name: "Steve Defendre", url: "https://www.linkedin.com/in/joseph-m-defendre-a11a47225/" }],
  creator: "Steve Defendre",
  publisher: "Defendre Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://defendre-solutions.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Defendre Solutions - Veteran-Owned Software Development",
    description:
      "We turn strong ideas into resilient software. Veteran-owned, full-stack engineering firm specializing in AI-powered apps and MVP development.",
    url: "https://defendre-solutions.vercel.app",
    siteName: "Defendre Solutions",
    images: [
      {
        url: "/defendre-logo.png",
        width: 1200,
        height: 630,
        alt: "Defendre Solutions - Veteran-Owned Software Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Defendre Solutions - Veteran-Owned Software Development",
    description: "We turn strong ideas into resilient software. Veteran-owned, full-stack engineering.",
    images: ["/defendre-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function HomePage() {
  return <DefendreSolutionsPortfolio />
}
