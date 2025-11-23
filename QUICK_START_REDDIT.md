# Quick Start: Reddit Dataset for AI Agent

Get the Reddit dataset up and running in 5 minutes!

## Step 1: Apply Database Migration (2 minutes)

**Option A: Using Supabase Dashboard**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open `supabase/migrations/002_reddit_qa_dataset.sql`
4. Copy the entire contents
5. Paste into SQL Editor and click **Run**

**Option B: Using Supabase CLI**

```bash
supabase migration up
```

## Step 2: Verify Setup (1 minute)

Run the verification script to check everything is set up correctly:

```bash
npm run verify-reddit-dataset
```

You should see:

- ✅ Environment variables are set
- ✅ Database connection successful
- ✅ Dataset table exists
- ⚠️ Dataset is empty (this is expected if you haven't scraped yet)

## Step 3: Scrape Reddit Data (10-15 minutes)

Start scraping posts from r/veteransbenefits:

```bash
# Scrape 500 posts (recommended for first run)
npm run scrape-reddit 500
```

**What happens:**

- Fetches posts from r/veteransbenefits
- Extracts questions and top answers
- Auto-tags posts (disability, C&P, DD-214, etc.)
- Stores in Supabase
- Takes ~10-15 minutes for 500 posts

**Progress indicators:**

- Shows "✓ Stored: [post title]..." for each post
- Shows progress every 10 posts
- Automatically skips duplicates

## Step 4: Verify Data (1 minute)

Run verification again to confirm data was scraped:

```bash
npm run verify-reddit-dataset
```

You should now see:

- ✅ Dataset: [number] posts available
- ✅ Search functionality working

## Step 5: Test AI Agent (1 minute)

1. Start your dev server:

   ```bash
   npm run dev
   ```

2. Navigate to the AI Agent page (usually `/ai-agent`)

3. Ask a question like:
   - "How do I file a disability claim?"
   - "What is a C&P exam?"
   - "How do I get my DD-214?"

4. The AI will now automatically:
   - Search the Reddit dataset for relevant Q&A
   - Include real-world examples in its response
   - Provide more contextual, veteran-informed answers

## That's It! 🎉

Your AI agent is now powered by real Reddit Q&A from r/veteransbenefits.

## Troubleshooting

### "Migration has not been applied"

- Make sure you ran the SQL migration in Step 1
- Check Supabase dashboard → Table Editor → you should see `reddit_qa_dataset` table

### "Dataset is empty"

- Run the scraper: `npm run scrape-reddit 500`
- Wait for it to complete (10-15 minutes)

### "Reddit API error"

- Reddit may rate limit - wait 5 minutes and try again
- Check your internet connection
- Verify Reddit is accessible

### "Missing Supabase credentials"

- Check `.env.local` file exists
- Verify `NEXT_PUBLIC_SUPABASE_URL` is set
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set (not the anon key!)

## Next Steps

- **Weekly Updates**: Run `npm run scrape-reddit 200` weekly to get new posts
- **Monitor Stats**: Use `getDatasetStats()` to track dataset growth
- **Customize Tags**: Edit tag extraction in `scripts/scrape-reddit.ts`

## Need Help?

- See `REDDIT_DATASET_SETUP.md` for detailed documentation
- See `scripts/README-reddit-scraper.md` for scraper details
- Check Supabase logs for database errors
