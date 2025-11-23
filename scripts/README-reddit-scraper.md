# Reddit Scraper for r/veteransbenefits

This script scrapes questions and answers from the r/veteransbenefits subreddit and stores them in Supabase for the AI agent to reference when answering user questions.

## Setup

1. **Install Dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Environment Variables**
   Make sure your `.env.local` file contains:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Run Database Migration**
   Apply the migration to create the `reddit_qa_dataset` table:

   ```bash
   # If using Supabase CLI
   supabase migration up

   # Or apply manually through Supabase dashboard
   # Copy contents of supabase/migrations/002_reddit_qa_dataset.sql
   ```

## Usage

### Basic Usage

Scrape 500 posts (default):

```bash
npm run scrape-reddit
```

### Custom Number of Posts

Scrape a specific number of posts:

```bash
npm run scrape-reddit 1000
```

## How It Works

1. **Fetches Posts**: Uses Reddit's JSON API to fetch posts from r/veteransbenefits
2. **Fetches Comments**: For each post, fetches the top comments (answers)
3. **Extracts Tags**: Automatically tags posts based on keywords (disability, C&P, DD-214, etc.)
4. **Stores in Supabase**: Saves questions, answers, upvotes, and metadata to the database
5. **Deduplication**: Skips posts that have already been scraped

## Rate Limiting

The script includes rate limiting to be respectful to Reddit's servers:

- 1 second delay between processing each post
- 2 second delay between batches

## Data Structure

Each scraped post includes:

- **Title**: Post title
- **Question**: Post body/question content
- **Answer**: Top-rated comment/answer
- **All Answers**: Top 10 comments as JSON
- **Upvotes**: Post score (relevance indicator)
- **Tags**: Auto-extracted tags (disability, C&P, DD-214, etc.)
- **URL**: Link to original Reddit post
- **Metadata**: Flair, awards, etc.

## Integration with AI Agent

The AI agent automatically searches this dataset when answering user questions:

1. User asks a question
2. System searches Reddit dataset for relevant Q&A
3. Top 3 most relevant results are included in the AI prompt
4. AI uses these real-world examples to provide better, more contextual answers

## Updating the Dataset

You can run the scraper periodically to keep the dataset fresh:

- Run weekly to get new posts
- The script automatically skips duplicates
- Consider running during off-peak hours

## Troubleshooting

### "Missing Supabase credentials"

- Check that `.env.local` exists and has the correct variables
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set (not the anon key)

### "Reddit API error"

- Reddit may rate limit if you scrape too aggressively
- Wait a few minutes and try again
- Reduce the number of posts per batch

### "Error storing post"

- Check Supabase connection
- Verify the migration was applied successfully
- Check that RLS policies allow inserts (service role key should bypass RLS)

## Notes

- The scraper uses Reddit's public JSON API (no authentication required)
- Posts are stored with public read access (RLS allows public SELECT)
- The dataset is used for educational purposes to help veterans
- Always respect Reddit's terms of service and rate limits
