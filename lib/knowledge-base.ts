/**
 * Knowledge Base functions for AI agent
 * Provides search and retrieval of knowledge base articles
 */

import { getSupabaseClient } from './supabase'

export interface KnowledgeBaseArticle {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  keywords: string[]
  priority: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SearchResult {
  article: KnowledgeBaseArticle
  relevance_score: number
  matched_keywords: string[]
}

/**
 * Search knowledge base using full-text search and keyword matching
 * Returns articles ranked by relevance
 */
export async function searchKnowledgeBase(
  query: string,
  limit: number = 5
): Promise<SearchResult[]> {
  const supabase = getSupabaseClient()
  const lowerQuery = query.toLowerCase()

  // Split query into individual words for keyword matching
  const queryWords = lowerQuery.split(/\s+/).filter((word) => word.length > 2) // Filter out very short words

  // Search by title and content using ILIKE for case-insensitive matching
  // Escape special characters in query for ILIKE
  const escapedQuery = query.replace(/%/g, '\\%').replace(/_/g, '\\_')
  const searchPattern = `%${escapedQuery}%`

  // Search title and content separately, then combine results
  const { data: titleResults } = await supabase
    .from('knowledge_base')
    .select('*')
    .eq('is_active', true)
    .ilike('title', searchPattern)
    .order('priority', { ascending: false })
    .limit(limit * 2)

  const { data: contentResults } = await supabase
    .from('knowledge_base')
    .select('*')
    .eq('is_active', true)
    .ilike('content', searchPattern)
    .order('priority', { ascending: false })
    .limit(limit * 2)

  // Combine and deduplicate
  const fullTextResultsMap = new Map<string, KnowledgeBaseArticle>()
  if (titleResults) {
    titleResults.forEach((article) => fullTextResultsMap.set(article.id, article))
  }
  if (contentResults) {
    contentResults.forEach((article) => {
      if (!fullTextResultsMap.has(article.id)) {
        fullTextResultsMap.set(article.id, article)
      }
    })
  }
  const fullTextResults = Array.from(fullTextResultsMap.values())

  // Also search by keywords and tags if we have query words
  let keywordResults: KnowledgeBaseArticle[] = []
  if (queryWords.length > 0) {
    const keywordQueries = queryWords
      .map((word) => `keywords.cs.{${word}},tags.cs.{${word}}`)
      .join(',')

    const { data, error: keywordError } = await supabase
      .from('knowledge_base')
      .select('*')
      .eq('is_active', true)
      .or(keywordQueries)
      .order('priority', { ascending: false })
      .limit(limit * 2)

    if (!keywordError && data) {
      keywordResults = data
    }
  }

  // Combine and deduplicate results
  const allResults = new Map<string, KnowledgeBaseArticle>()

  if (fullTextResults && fullTextResults.length > 0) {
    fullTextResults.forEach((article) => {
      allResults.set(article.id, article)
    })
  }

  if (keywordResults.length > 0) {
    keywordResults.forEach((article) => {
      if (!allResults.has(article.id)) {
        allResults.set(article.id, article)
      }
    })
  }

  // Calculate relevance scores
  const scoredResults: SearchResult[] = Array.from(allResults.values()).map((article) => {
    let relevanceScore = 0
    const matchedKeywords: string[] = []

    // Check title match (highest weight)
    if (article.title.toLowerCase().includes(lowerQuery)) {
      relevanceScore += 10
    }

    // Check keyword matches
    article.keywords.forEach((keyword) => {
      if (queryWords.some((word) => keyword.toLowerCase().includes(word))) {
        relevanceScore += 5
        matchedKeywords.push(keyword)
      }
    })

    // Check tag matches
    article.tags.forEach((tag) => {
      if (queryWords.some((word) => tag.toLowerCase().includes(word))) {
        relevanceScore += 3
        if (!matchedKeywords.includes(tag)) {
          matchedKeywords.push(tag)
        }
      }
    })

    // Check content match (lower weight)
    if (article.content.toLowerCase().includes(lowerQuery)) {
      relevanceScore += 2
    }

    // Add priority boost
    relevanceScore += article.priority

    return {
      article,
      relevance_score: relevanceScore,
      matched_keywords: matchedKeywords,
    }
  })

  // Sort by relevance score and return top results
  return scoredResults.sort((a, b) => b.relevance_score - a.relevance_score).slice(0, limit)
}

/**
 * Get knowledge base articles by category
 */
export async function getKnowledgeBaseByCategory(
  category: string,
  limit: number = 10
): Promise<KnowledgeBaseArticle[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('knowledge_base')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('priority', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching knowledge base by category:', error)
    return []
  }

  return data || []
}

/**
 * Get a specific knowledge base article by ID
 */
export async function getKnowledgeBaseArticle(id: string): Promise<KnowledgeBaseArticle | null> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('knowledge_base')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching knowledge base article:', error)
    return null
  }

  return data
}

/**
 * Format knowledge base articles for inclusion in AI prompt
 */
export function formatKnowledgeBaseForPrompt(searchResults: SearchResult[]): string {
  if (searchResults.length === 0) {
    return ''
  }

  const formattedArticles = searchResults.map((result, index) => {
    return `[Knowledge Base Article ${index + 1}]
Title: ${result.article.title}
Category: ${result.article.category}
Content: ${result.article.content}
Relevance: ${result.relevance_score}
Matched Keywords: ${result.matched_keywords.join(', ')}
---`
  })

  return `\n\n## Relevant Knowledge Base Articles:\n\n${formattedArticles.join('\n\n')}\n\nUse the information from these knowledge base articles to provide accurate, detailed answers. Cite specific information from the articles when relevant.`
}
