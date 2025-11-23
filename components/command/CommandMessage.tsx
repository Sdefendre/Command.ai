'use client'

import { motion } from 'framer-motion'
import { Bot, User, Loader2, Sparkles } from 'lucide-react'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { Message } from 'ai'

interface CommandMessageProps {
  message: Message
  isLast?: boolean
}

export function CommandMessage({ message }: CommandMessageProps) {
  const isUser = message.role === 'user'

  // Extract text content from message parts or content
  const content =
    message.parts
      ?.filter((part) => part.type === 'text')
      .map((part) => ('text' in part ? part.text : ''))
      .join('') || message.content

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`group flex gap-4 p-4 md:p-6 w-full max-w-3xl mx-auto mb-4 rounded-2xl border backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md ${
        isUser ? 'bg-muted/40 border-border/50 ml-auto' : 'bg-background/60 border-primary/10'
      }`}
    >
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div className="h-10 w-10 rounded-xl bg-secondary/50 flex items-center justify-center border border-border shadow-inner">
            <User className="h-5 w-5 text-secondary-foreground" />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
            <Bot className="h-6 w-6 text-primary" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm text-foreground/90">
            {isUser ? 'You' : 'Command AI'}
          </span>
          {!isUser && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
              BOT
            </span>
          )}
        </div>
        <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/90 leading-relaxed text-base">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </motion.div>
  )
}

export function CommandMessageLoading() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex gap-4 p-4 md:p-6 w-full max-w-3xl mx-auto mb-4 rounded-2xl bg-background/40 border border-primary/10 backdrop-blur-md"
    >
      <div className="flex-shrink-0 mt-1">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 animate-pulse">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
      </div>

      <div className="flex-1 space-y-3 py-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-foreground/90">Command AI</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
            THINKING
          </span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm font-medium animate-pulse">Processing request...</span>
        </div>
      </div>
    </motion.div>
  )
}
