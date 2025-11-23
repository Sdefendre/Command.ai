# Reddit Dataset Integration for AI Agent

This document explains the Reddit dataset integration that allows the AI agent to reference real-world questions and answers from r/veteransbenefits when chatting with users.

## Overview

The system scrapes questions and answers from r/veteransbenefits and stores them in Supabase. When users ask questions, the AI agent automatically searches this dataset for relevant examples and uses them to provide more contextual, real-world-informed answers.

## Components Created

### 1. Database Schema (`supabase/migrations/002_reddit_qa_dataset.sql`)

- Creates `reddit_qa_dataset` table to store scraped Q&A
- Includes full-text search indexes for efficient querying
- Creates a PostgreSQL function `search_reddit_qa()` for semantic search
- Enables public read access (RLS policy)

### 2. Reddit Scraper (`scripts/scrape-reddit.ts`)

- Fetches posts from r/veteransbenefits using Reddit's JSON API
- Extracts questions (post titles/bodies) and answers (top comments)
- Auto-tags posts based on keywords (disability, C&P, DD-214, etc.)
- Stores data in Supabase with deduplication
- Includes rate limiting to respect Reddit's servers

### 3. Dataset Utilities (`lib/reddit-dataset.ts`)

- `searchRedditDataset()` - Full-text search for relevant Q&A
- `getQAByTags()` - Search by specific tags
- `formatRedditContext()` - Format results for AI prompts
- `getDatasetStats()` - Get dataset statistics

### 4. AI Agent Integration (`lib/ai-agent.ts`)

- Updated `buildPrompt()` to include Reddit dataset search
- Automatically searches for relevant Q&A when user asks questions
- Includes top 3 relevant results in AI prompt context
- Works alongside existing knowledge base integration

### 5. API Route Update (`app/api/ai-agent/route.ts`)

- Updated to use the new `buildPrompt()` function
- Automatically includes Reddit dataset context in AI responses

## Setup Instructions

### Step 1: Apply Database Migration

Run the migration to create the `reddit_qa_dataset` table:

```bash
# If using Supabase CLI
supabase migration up

# Or manually in Supabase Dashboard:
# 1. Go to SQL Editor
# 2. Copy contents of supabase/migrations/002_reddit_qa_dataset.sql
# 3. Run the SQL
```

### Step 2: Install Dependencies

```bash
npm install
# or
pnpm install
```

This will install:

- `tsx` - For running TypeScript scripts
- `dotenv` - For environment variable management

### Step 3: Configure Environment Variables

Ensure your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Important**: Use the service role key (not the anon key) for the scraper, as it needs to bypass RLS to insert data.

### Step 4: Run the Scraper

Scrape Reddit posts:

```bash
# Scrape 500 posts (default)
npm run scrape-reddit

# Or specify a custom number
npm run scrape-reddit 1000
```

The scraper will:

- Fetch posts from r/veteransbenefits
- Extract questions and top answers
- Auto-tag posts based on content
- Store everything in Supabase
- Skip duplicates automatically

**Note**: The first run may take a while (1-2 seconds per post due to rate limiting). For 500 posts, expect ~10-15 minutes.

## How It Works

### When a User Asks a Question:

1. **User sends message** → AI agent receives question
2. **Search Reddit dataset** → System searches for relevant Q&A using full-text search
3. **Get top 3 results** → Most relevant questions/answers are retrieved
4. **Format for AI** → Results are formatted and added to AI prompt
5. **AI generates response** → AI uses Reddit examples as context to provide better answers

### Example Flow:

```
User: "How do I file a disability claim?"

System searches Reddit dataset → Finds 3 relevant posts:
- "First time filing disability claim - need help"
- "Disability claim process step by step"
- "What documents do I need for disability claim?"

AI receives prompt with:
- System instructions
- Conversation history
- Knowledge base articles (if any)
- Reddit Q&A examples ← NEW!
- User's current question

AI generates response using all this context
```

## Data Structure

Each scraped post includes:

```typescript
{
  reddit_post_id: string        // Unique Reddit post ID
  title: string                 // Post title (question)
  question: string              // Post body/question content
  answer: string                // Top-rated answer
  all_answers: JSONB            // Top 10 answers as array
  upvotes: number               // Post score (relevance)
  comment_count: number         // Number of comments
  author: string                // Reddit username
  subreddit: string             // Always "veteransbenefits"
  url: string                   // Link to original post
  tags: string[]                // Auto-extracted tags
  metadata: JSONB               // Flair, awards, etc.
  created_at_reddit: timestamp // When post was created
  scraped_at: timestamp         // When we scraped it
}
```

## Auto-Tagging

Posts are automatically tagged based on keywords:

- `disability` - Disability claims, ratings
- `c&p` - C&P exams
- `dd-214` - DD-214 questions
- `claim` - Filing claims, appeals
- `ptsd` - Mental health topics
- `tinnitus` - Hearing issues
- `back`, `knee`, `shoulder` - Physical conditions
- `migraine` - Headache conditions
- `sleep` - Sleep apnea, insomnia
- `gulf-war` - Gulf War syndrome, burn pits
- `education` - GI Bill, education benefits
- `healthcare` - VA healthcare
- `pension` - Pension, compensation

## Updating the Dataset

To keep the dataset fresh, run the scraper periodically:

```bash
# Weekly update (recommended)
npm run scrape-reddit 200  # Scrape 200 new posts
```

The scraper automatically:

- Skips posts that already exist (by `reddit_post_id`)
- Only processes new posts
- Updates metadata if needed

## Monitoring

Check dataset statistics:

```typescript
import { getDatasetStats } from '@/lib/reddit-dataset'

const stats = await getDatasetStats()
console.log(stats)
// {
//   totalPosts: 500,
//   totalAnswers: 450,
//   averageUpvotes: 15,
//   topTags: [
//     { tag: 'disability', count: 120 },
//     { tag: 'c&p', count: 80 },
//     ...
//   ]
// }
```

## Troubleshooting

### Scraper Issues

**"Missing Supabase credentials"**

- Check `.env.local` exists
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set (not anon key)

**"Reddit API error"**

- Reddit may rate limit - wait a few minutes
- Reduce batch size in script
- Check internet connection

**"Error storing post"**

- Verify migration was applied
- Check Supabase connection
- Ensure service role key has insert permissions

### Search Issues

**"No results found"**

- Dataset may be empty - run scraper first
- Check if full-text search function exists in database
- Verify RLS policies allow public SELECT

**"Search function doesn't exist"**

- The migration creates `search_reddit_qa()` function
- If missing, run migration again
- System falls back to simple text search automatically

## Best Practices

1. **Initial Scrape**: Start with 500-1000 posts to build a good dataset
2. **Regular Updates**: Run weekly to capture new questions
3. **Monitor Quality**: Check that answers are being extracted correctly
4. **Respect Rate Limits**: Don't run scraper too frequently
5. **Backup Data**: Export dataset periodically for backup

## Future Enhancements

Potential improvements:

- Scheduled scraping (cron job)
- Quality scoring for answers
- User feedback on answer relevance
- More sophisticated tagging
- Multi-subreddit support
- Answer quality filtering (upvote thresholds)

## Support

For issues or questions:

1. Check `scripts/README-reddit-scraper.md` for detailed scraper docs
2. Review Supabase logs for database errors
3. Check Reddit API status if scraping fails
