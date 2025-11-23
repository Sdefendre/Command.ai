/**
 * Reddit Dataset Utilities
 *
 * Functions to search and retrieve relevant Q&A from the Reddit dataset
 * for use in AI agent responses.
 */

import { getSupabaseClient } from './supabase'

export interface RedditQAResult {
  id: string
  title: string
  question: string
  answer: string | null
  upvotes: number
  url: string
  relevance_score?: number
}

/**
 * Search the Reddit Q&A dataset for relevant questions and answers
 *
 * @param query - The search query (user's question)
 * @param limit - Maximum number of results to return (default: 5)
 * @returns Array of relevant Q&A results
 */
export async function searchRedditDataset(
  query: string,
  limit: number = 5
): Promise<RedditQAResult[]> {
  const supabase = getSupabaseClient()

  try {
    // Use the full-text search function we created in the migration
    const { data, error } = await supabase.rpc('search_reddit_qa', {
      search_query: query,
      result_limit: limit,
    })

    if (error) {
      console.error('Error searching Reddit dataset:', error)
      // Fallback to simple text search if function doesn't exist yet
      return await fallbackSearch(query, limit)
    }

    return (data || []) as RedditQAResult[]
  } catch (error) {
    console.error('Error in searchRedditDataset:', error)
    return []
  }
}

/**
 * Fallback search using simple text matching
 * Used if the full-text search function isn't available
 */
async function fallbackSearch(query: string, limit: number): Promise<RedditQAResult[]> {
  const supabase = getSupabaseClient()

  try {
    // Simple search using ILIKE (case-insensitive pattern matching)
    const searchPattern = `%${query}%`

    const { data, error } = await supabase
      .from('reddit_qa_dataset')
      .select('id, title, question, answer, upvotes, url')
      .or(
        `title.ilike.${searchPattern},question.ilike.${searchPattern},answer.ilike.${searchPattern}`
      )
      .order('upvotes', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Fallback search error:', error)
      return []
    }

    return (data || []) as RedditQAResult[]
  } catch (error) {
    console.error('Error in fallbackSearch:', error)
    return []
  }
}

/**
 * Get Q&A by specific tags
 *
 * @param tags - Array of tags to search for
 * @param limit - Maximum number of results
 */
export async function getQAByTags(tags: string[], limit: number = 5): Promise<RedditQAResult[]> {
  const supabase = getSupabaseClient()

  try {
    const { data, error } = await supabase
      .from('reddit_qa_dataset')
      .select('id, title, question, answer, upvotes, url')
      .contains('tags', tags)
      .order('upvotes', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error getting Q&A by tags:', error)
      return []
    }

    return (data || []) as RedditQAResult[]
  } catch (error) {
    console.error('Error in getQAByTags:', error)
    return []
  }
}

/**
 * Format Reddit Q&A results for use in AI prompt context
 *
 * @param results - Array of Reddit Q&A results
 * @returns Formatted string for AI context
 */
export function formatRedditContext(results: RedditQAResult[]): string {
  if (results.length === 0) {
    return ''
  }

  const formatted = results
    .map((result, index) => {
      return `[Reference ${index + 1}]
Question: ${result.title}
${result.question ? `Details: ${result.question.substring(0, 200)}...` : ''}
Answer: ${result.answer ? result.answer.substring(0, 500) : 'No answer available'}...
Upvotes: ${result.upvotes}
Source: ${result.url}
---`
    })
    .join('\n\n')

  return `\n\nRelevant Q&A from r/veteransbenefits community:\n${formatted}\n\nUse these real-world examples to inform your response, but always provide your own comprehensive answer.`
}

/**
 * Get statistics about the dataset
 */
export async function getDatasetStats(): Promise<{
  totalPosts: number
  totalAnswers: number
  averageUpvotes: number
  topTags: Array<{ tag: string; count: number }>
}> {
  const supabase = getSupabaseClient()

  try {
    // Get total count
    const { count: totalPosts } = await supabase
      .from('reddit_qa_dataset')
      .select('*', { count: 'exact', head: true })

    // Get posts with answers
    const { count: totalAnswers } = await supabase
      .from('reddit_qa_dataset')
      .select('*', { count: 'exact', head: true })
      .not('answer', 'is', null)

    // Get average upvotes
    const { data: upvoteData } = await supabase.from('reddit_qa_dataset').select('upvotes')

    const averageUpvotes =
      upvoteData && upvoteData.length > 0
        ? upvoteData.reduce((sum, item) => sum + (item.upvotes || 0), 0) / upvoteData.length
        : 0

    // Get top tags (simplified - would need more complex query for full tag analysis)
    const { data: tagData } = await supabase.from('reddit_qa_dataset').select('tags').limit(1000)

    const tagCounts: Record<string, number> = {}
    tagData?.forEach((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      }
    })

    const topTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return {
      totalPosts: totalPosts || 0,
      totalAnswers: totalAnswers || 0,
      averageUpvotes: Math.round(averageUpvotes),
      topTags,
    }
  } catch (error) {
    console.error('Error getting dataset stats:', error)
    return {
      totalPosts: 0,
      totalAnswers: 0,
      averageUpvotes: 0,
      topTags: [],
    }
  }
}
