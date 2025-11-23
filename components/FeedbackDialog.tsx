'use client'

import { useState } from 'react'
import { Star, Send, MessageSquare } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FeedbackDialogProps {
  /** The page or section where feedback is being submitted */
  path?: string
  /** Optional trigger button - if not provided, defaults to feedback icon button */
  trigger?: React.ReactNode
}

export function FeedbackDialog({ path, trigger }: FeedbackDialogProps) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const [type, setType] = useState<string>('general')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Get current path if not provided
  const currentPath =
    path ||
    (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/')

  // Handle star click for rating
  function handleStarClick(value: number) {
    setRating(value)
  }

  // Handle star hover
  function handleStarHover(value: number | null) {
    setHoveredRating(value)
  }

  // Submit feedback
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!message.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          message: message.trim(),
          rating,
          email: email.trim() || null,
          path: currentPath,
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit feedback')
      }

      // Success - reset form and show thank you
      setSubmitted(true)
      setMessage('')
      setEmail('')
      setRating(null)
      setType('general')

      // Close dialog after 2 seconds
      setTimeout(() => {
        setOpen(false)
        setSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form when dialog opens/closes
  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset form when closing
      setSubmitted(false)
      setMessage('')
      setEmail('')
      setRating(null)
      setType('general')
    }
  }

  // Determine which star should be highlighted
  function getStarState(index: number) {
    const displayRating = hoveredRating !== null ? hoveredRating : rating
    if (displayRating === null) return 'empty'
    return index <= displayRating ? 'filled' : 'empty'
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="relative" aria-label="Provide feedback">
            <MessageSquare className="size-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
              <Send className="size-8 text-green-500" />
            </div>
            <DialogTitle className="text-2xl">Thank You!</DialogTitle>
            <DialogDescription className="mt-2">
              Your feedback has been submitted successfully. We appreciate your input!
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Share Your Feedback</DialogTitle>
              <DialogDescription>
                Help us improve Life Command OS by sharing your thoughts, reporting issues, or
                suggesting features.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Feedback Type */}
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="feedback-type">
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Feedback</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="content">Content Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Rating (Optional)</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleStarClick(value)}
                      onMouseEnter={() => handleStarHover(value)}
                      onMouseLeave={() => handleStarHover(null)}
                      className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded min-h-[44px] min-w-[44px] flex items-center justify-center sm:min-h-[32px] sm:min-w-[32px]"
                      aria-label={`Rate ${value} out of 5`}
                    >
                      <Star
                        className={`size-6 transition-colors ${
                          getStarState(value) === 'filled'
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                  {rating && (
                    <span className="ml-2 text-sm text-muted-foreground">{rating} / 5</span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="feedback-message">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="feedback-message"
                  placeholder="Tell us what's on your mind..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="resize-none"
                />
              </div>

              {/* Email (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="feedback-email">Email (Optional)</Label>
                <Input
                  id="feedback-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  We&apos;ll only use this to follow up if needed.
                </p>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!message.trim() || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 size-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
