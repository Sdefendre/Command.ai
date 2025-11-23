'use client'

import { Twitter, Linkedin, Mail, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  url: string
  description?: string
}

export function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url
  const shareText = description || title

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2 hidden sm:inline">Share:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.twitter, '_blank', 'noopener,noreferrer')}
        className="gap-2"
        aria-label="Share on Twitter"
      >
        <Twitter size={16} />
        <span className="hidden sm:inline">Twitter</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.linkedin, '_blank', 'noopener,noreferrer')}
        className="gap-2"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.email, '_blank', 'noopener,noreferrer')}
        className="gap-2"
        aria-label="Share via Email"
      >
        <Mail size={16} />
        <span className="hidden sm:inline">Email</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="gap-2"
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check size={16} />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <Copy size={16} />
            <span className="hidden sm:inline">Copy</span>
          </>
        )}
      </Button>
    </div>
  )
}
