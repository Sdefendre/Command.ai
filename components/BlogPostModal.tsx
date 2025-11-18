"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, X } from 'lucide-react'
import { FloatingDots } from '@/components/FloatingDots'

export default function BlogPostModal({ post, onClose }: { post: any; onClose: () => void }) {
  return (
    <AnimatePresence>
      {post && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 overflow-y-auto bg-black">
          <div className="min-h-screen relative">
            <FloatingDots />
            <div className="relative z-10">
              <header className="sticky top-0 glass-header border-b border-white/10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                  <button onClick={onClose} className="glass-button px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
                    <ArrowLeft size={20} /> Back to Blog
                  </button>
                  <button onClick={onClose} className="glass-button p-2 rounded-full hover:scale-105 transition-transform">
                    <X size={20} />
                  </button>
                </div>
              </header>
              <article className="max-w-4xl mx-auto px-6 py-12">
                <div className="prose prose-lg prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

