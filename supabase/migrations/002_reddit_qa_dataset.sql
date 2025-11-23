-- Migration: Reddit Q&A Dataset for AI Agent
-- Description: Creates table to store scraped questions and answers from r/veteransbenefits

-- Reddit Q&A Dataset Table
-- Stores questions and answers from r/veteransbenefits for AI agent context
CREATE TABLE IF NOT EXISTS reddit_qa_dataset (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reddit_post_id TEXT NOT NULL UNIQUE, -- Reddit post ID to prevent duplicates
  title TEXT NOT NULL, -- Post title (question)
  question TEXT NOT NULL, -- Post body/question content
  answer TEXT, -- Top answer or combined answers
  all_answers JSONB, -- All answers/comments as JSON array
  upvotes INTEGER DEFAULT 0, -- Post upvotes (relevance indicator)
  comment_count INTEGER DEFAULT 0, -- Number of comments/answers
  author TEXT, -- Reddit username (optional, for attribution)
  subreddit TEXT NOT NULL DEFAULT 'veteransbenefits',
  url TEXT, -- Link to original Reddit post
  created_at_reddit TIMESTAMP WITH TIME ZONE, -- When post was created on Reddit
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- When we scraped it
  tags TEXT[], -- Tags/categories for easier searching (e.g., ['disability', 'c&p', 'dd-214'])
  metadata JSONB, -- Additional metadata (flair, awards, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient searching
CREATE INDEX IF NOT EXISTS idx_reddit_qa_post_id ON reddit_qa_dataset(reddit_post_id);
CREATE INDEX IF NOT EXISTS idx_reddit_qa_title ON reddit_qa_dataset USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_reddit_qa_question ON reddit_qa_dataset USING gin(to_tsvector('english', question));
CREATE INDEX IF NOT EXISTS idx_reddit_qa_answer ON reddit_qa_dataset USING gin(to_tsvector('english', answer));
CREATE INDEX IF NOT EXISTS idx_reddit_qa_tags ON reddit_qa_dataset USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_reddit_qa_upvotes ON reddit_qa_dataset(upvotes DESC);
CREATE INDEX IF NOT EXISTS idx_reddit_qa_created_at ON reddit_qa_dataset(created_at_reddit DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE reddit_qa_dataset ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow public read access (this is public Reddit data)
CREATE POLICY "Public read access to Reddit Q&A dataset"
  ON reddit_qa_dataset FOR SELECT
  USING (true);

-- Function to update updated_at timestamp
CREATE TRIGGER update_reddit_qa_updated_at BEFORE UPDATE ON reddit_qa_dataset
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function for full-text search (to be used by AI agent)
CREATE OR REPLACE FUNCTION search_reddit_qa(search_query TEXT, result_limit INTEGER DEFAULT 5)
RETURNS TABLE (
  id UUID,
  title TEXT,
  question TEXT,
  answer TEXT,
  upvotes INTEGER,
  url TEXT,
  relevance_score REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.title,
    r.question,
    r.answer,
    r.upvotes,
    r.url,
    (
      ts_rank(to_tsvector('english', r.title), plainto_tsquery('english', search_query)) * 2 +
      ts_rank(to_tsvector('english', r.question), plainto_tsquery('english', search_query)) * 1.5 +
      ts_rank(to_tsvector('english', COALESCE(r.answer, '')), plainto_tsquery('english', search_query)) * 1.0
    )::REAL as relevance_score
  FROM reddit_qa_dataset r
  WHERE
    to_tsvector('english', r.title || ' ' || r.question || ' ' || COALESCE(r.answer, '')) @@ plainto_tsquery('english', search_query)
  ORDER BY relevance_score DESC, r.upvotes DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

