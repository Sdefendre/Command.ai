/**
 * Reddit Scraper for r/veteransbenefits
 *
 * This script scrapes questions and answers from r/veteransbenefits
 * and stores them in Supabase for the AI agent to reference.
 *
 * Usage: npm run scrape-reddit
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { join } from 'path'

// Load environment variables
dotenv.config({ path: join(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing Supabase credentials. Please check your .env.local file.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

interface RedditPost {
  id: string
  title: string
  selftext: string
  author: string
  score: number
  num_comments: number
  created_utc: number
  permalink: string
  url: string
  link_flair_text?: string
}

interface RedditComment {
  body: string
  author: string
  score: number
  created_utc: number
  replies?: RedditComment[]
}

interface RedditPostWithComments extends RedditPost {
  comments?: RedditComment[]
}

/**
 * Fetch posts from Reddit using JSON API
 */
async function fetchRedditPosts(
  subreddit: string = 'veteransbenefits',
  limit: number = 100,
  after?: string
): Promise<{ posts: RedditPost[]; after: string | null }> {
  const baseUrl = `https://www.reddit.com/r/${subreddit}/.json`
  const params = new URLSearchParams({
    limit: limit.toString(),
    ...(after && { after }),
  })

  try {
    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      headers: {
        'User-Agent': 'VeteranBenefitsAI/1.0 (Educational Purpose)',
      },
    })

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const posts: RedditPost[] = data.data.children.map((child: any) => child.data)

    return {
      posts,
      after: data.data.after,
    }
  } catch (error) {
    console.error('Error fetching Reddit posts:', error)
    throw error
  }
}

/**
 * Fetch comments for a specific post
 */
async function fetchPostComments(postId: string): Promise<RedditComment[]> {
  const url = `https://www.reddit.com/r/veteransbenefits/comments/${postId}.json`

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'VeteranBenefitsAI/1.0 (Educational Purpose)',
      },
    })

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`)
    }

    const data = await response.json()
    // Comments are in the second item of the array
    const comments = data[1]?.data?.children || []

    // Extract top-level comments (skip "more" objects)
    const topComments: RedditComment[] = comments
      .filter((child: any) => child.kind === 't1') // t1 = comment
      .map((child: any) => {
        const comment = child.data
        return {
          body: comment.body || '',
          author: comment.author || '[deleted]',
          score: comment.score || 0,
          created_utc: comment.created_utc || 0,
        }
      })
      .filter((comment: RedditComment) => comment.body.length > 20) // Filter out very short comments
      .sort((a: RedditComment, b: RedditComment) => b.score - a.score) // Sort by score

    return topComments
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error)
    return []
  }
}

/**
 * Extract tags from post title and content
 */
function extractTags(title: string, question: string): string[] {
  const text = `${title} ${question}`.toLowerCase()
  const tags: string[] = []

  // Common veteran benefits topics
  const topicKeywords: Record<string, string[]> = {
    disability: ['disability', 'rating', 'service-connected', 'va rating'],
    'c&p': ['c&p', 'c and p', 'compensation and pension', 'exam'],
    'dd-214': ['dd-214', 'dd214', 'discharge', 'separation'],
    claim: ['claim', 'filing', 'appeal', 'supplemental'],
    ptsd: ['ptsd', 'mental health', 'anxiety', 'depression'],
    tinnitus: ['tinnitus', 'hearing'],
    back: ['back', 'spine', 'lumbar', 'cervical'],
    knee: ['knee', 'knees'],
    shoulder: ['shoulder', 'shoulders'],
    migraine: ['migraine', 'headache', 'headaches'],
    sleep: ['sleep', 'apnea', 'insomnia'],
    'gulf-war': ['gulf war', 'burn pit', 'toxic exposure'],
    education: ['gi bill', 'education', 'voc rehab'],
    healthcare: ['healthcare', 'va hospital', 'medical'],
    pension: ['pension', 'compensation'],
  }

  for (const [tag, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      tags.push(tag)
    }
  }

  return [...new Set(tags)] // Remove duplicates
}

/**
 * Process and store a Reddit post in Supabase
 */
async function processAndStorePost(post: RedditPost): Promise<void> {
  try {
    // Check if post already exists
    const { data: existing } = await supabase
      .from('reddit_qa_dataset')
      .select('id')
      .eq('reddit_post_id', post.id)
      .single()

    if (existing) {
      console.log(`Post ${post.id} already exists, skipping...`)
      return
    }

    // Fetch comments for this post
    console.log(`Fetching comments for post: ${post.title.substring(0, 50)}...`)
    const comments = await fetchPostComments(post.id)

    // Get top answer (highest scored comment)
    const topAnswer = comments.length > 0 ? comments[0].body : null

    // Combine top 3 answers if available
    const allAnswers = comments.slice(0, 10).map((c) => ({
      body: c.body,
      author: c.author,
      score: c.score,
      created_utc: c.created_utc,
    }))

    // Extract tags
    const tags = extractTags(post.title, post.selftext)

    // Prepare data for insertion
    const postData = {
      reddit_post_id: post.id,
      title: post.title,
      question: post.selftext || post.title, // Use title if no selftext
      answer: topAnswer,
      all_answers: allAnswers,
      upvotes: post.score || 0,
      comment_count: post.num_comments || 0,
      author: post.author || '[deleted]',
      subreddit: 'veteransbenefits',
      url: `https://www.reddit.com${post.permalink}`,
      created_at_reddit: new Date(post.created_utc * 1000).toISOString(),
      tags,
      metadata: {
        flair: post.link_flair_text || null,
        original_url: post.url,
      },
    }

    // Insert into Supabase
    const { error } = await supabase.from('reddit_qa_dataset').insert(postData)

    if (error) {
      console.error(`Error storing post ${post.id}:`, error.message)
    } else {
      console.log(`✓ Stored: ${post.title.substring(0, 60)}...`)
    }

    // Rate limiting: wait 1 second between posts to be respectful
    await new Promise((resolve) => setTimeout(resolve, 1000))
  } catch (error) {
    console.error(`Error processing post ${post.id}:`, error)
  }
}

/**
 * Main scraping function
 */
async function scrapeReddit(maxPosts: number = 500, batchSize: number = 100): Promise<void> {
  console.log(`Starting Reddit scrape for r/veteransbenefits...`)
  console.log(`Target: ${maxPosts} posts\n`)

  let totalProcessed = 0
  let after: string | null = null
  let batch = 0

  try {
    while (totalProcessed < maxPosts) {
      batch++
      console.log(`\n--- Batch ${batch} ---`)

      const { posts, after: nextAfter } = await fetchRedditPosts(
        'veteransbenefits',
        Math.min(batchSize, maxPosts - totalProcessed),
        after || undefined
      )

      if (posts.length === 0) {
        console.log('No more posts to fetch.')
        break
      }

      console.log(`Fetched ${posts.length} posts. Processing...`)

      // Process each post
      for (const post of posts) {
        if (totalProcessed >= maxPosts) break

        await processAndStorePost(post)
        totalProcessed++

        // Progress indicator
        if (totalProcessed % 10 === 0) {
          console.log(`Progress: ${totalProcessed}/${maxPosts} posts processed`)
        }
      }

      after = nextAfter

      if (!after) {
        console.log('Reached end of subreddit.')
        break
      }

      // Rate limiting between batches
      console.log('Waiting 2 seconds before next batch...')
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    console.log(`\n✓ Scraping complete! Processed ${totalProcessed} posts.`)
  } catch (error) {
    console.error('Scraping failed:', error)
    throw error
  }
}

// Run the scraper if executed directly
// Check if this file is being run directly (not imported)
const isMainModule = process.argv[1] && process.argv[1].endsWith('scrape-reddit.ts')

if (isMainModule || require.main === module) {
  const maxPosts = process.argv[2] ? parseInt(process.argv[2], 10) : 500

  scrapeReddit(maxPosts)
    .then(() => {
      console.log('Done!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Fatal error:', error)
      process.exit(1)
    })
}

export { scrapeReddit, fetchRedditPosts, processAndStorePost }
