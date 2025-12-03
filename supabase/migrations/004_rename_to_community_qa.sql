-- Migration: Rename reddit_qa_dataset to community_qa_dataset
-- Description: Renames table and associated database objects to align with Command rebrand
-- This migration maintains all functionality while using more generic "community" branding

-- ============================================================================
-- UP MIGRATION
-- ============================================================================

-- 1. Rename the main table
ALTER TABLE IF EXISTS reddit_qa_dataset
  RENAME TO community_qa_dataset;

-- 2. Rename all indexes
ALTER INDEX IF EXISTS idx_reddit_qa_post_id
  RENAME TO idx_community_qa_post_id;

ALTER INDEX IF EXISTS idx_reddit_qa_title
  RENAME TO idx_community_qa_title;

ALTER INDEX IF EXISTS idx_reddit_qa_question
  RENAME TO idx_community_qa_question;

ALTER INDEX IF EXISTS idx_reddit_qa_answer
  RENAME TO idx_community_qa_answer;

ALTER INDEX IF EXISTS idx_reddit_qa_tags
  RENAME TO idx_community_qa_tags;

ALTER INDEX IF EXISTS idx_reddit_qa_upvotes
  RENAME TO idx_community_qa_upvotes;

ALTER INDEX IF EXISTS idx_reddit_qa_created_at
  RENAME TO idx_community_qa_created_at;

-- 3. Rename the trigger
ALTER TRIGGER IF EXISTS update_reddit_qa_updated_at ON community_qa_dataset
  RENAME TO update_community_qa_updated_at;

-- 4. Update RLS policy (drop old, create new with updated name)
DROP POLICY IF EXISTS "Public read access to Reddit Q&A dataset" ON community_qa_dataset;

CREATE POLICY "Public read access to community Q&A dataset"
  ON community_qa_dataset FOR SELECT
  USING (true);

-- 5. Replace the search function with updated table reference
DROP FUNCTION IF EXISTS search_reddit_qa(TEXT, INTEGER);

CREATE OR REPLACE FUNCTION search_community_qa(search_query TEXT, result_limit INTEGER DEFAULT 5)
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
    c.id,
    c.title,
    c.question,
    c.answer,
    c.upvotes,
    c.url,
    (
      ts_rank(to_tsvector('english', c.title), plainto_tsquery('english', search_query)) * 2 +
      ts_rank(to_tsvector('english', c.question), plainto_tsquery('english', search_query)) * 1.5 +
      ts_rank(to_tsvector('english', COALESCE(c.answer, '')), plainto_tsquery('english', search_query)) * 1.0
    )::REAL as relevance_score
  FROM community_qa_dataset c
  WHERE
    to_tsvector('english', c.title || ' ' || c.question || ' ' || COALESCE(c.answer, '')) @@ plainto_tsquery('english', search_query)
  ORDER BY relevance_score DESC, c.upvotes DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

-- Add comment to document the table purpose
COMMENT ON TABLE community_qa_dataset IS 'Stores questions and answers from veteran communities (e.g., r/veteransbenefits) for AI agent context';

-- ============================================================================
-- DOWN MIGRATION (Rollback)
-- ============================================================================
-- To rollback this migration, run the following SQL:
--
-- -- 1. Rename table back
-- ALTER TABLE IF EXISTS community_qa_dataset
--   RENAME TO reddit_qa_dataset;
--
-- -- 2. Rename indexes back
-- ALTER INDEX IF EXISTS idx_community_qa_post_id
--   RENAME TO idx_reddit_qa_post_id;
--
-- ALTER INDEX IF EXISTS idx_community_qa_title
--   RENAME TO idx_reddit_qa_title;
--
-- ALTER INDEX IF EXISTS idx_community_qa_question
--   RENAME TO idx_reddit_qa_question;
--
-- ALTER INDEX IF EXISTS idx_community_qa_answer
--   RENAME TO idx_reddit_qa_answer;
--
-- ALTER INDEX IF EXISTS idx_community_qa_tags
--   RENAME TO idx_reddit_qa_tags;
--
-- ALTER INDEX IF EXISTS idx_community_qa_upvotes
--   RENAME TO idx_reddit_qa_upvotes;
--
-- ALTER INDEX IF EXISTS idx_community_qa_created_at
--   RENAME TO idx_reddit_qa_created_at;
--
-- -- 3. Rename trigger back
-- ALTER TRIGGER IF EXISTS update_community_qa_updated_at ON reddit_qa_dataset
--   RENAME TO update_reddit_qa_updated_at;
--
-- -- 4. Update RLS policy back
-- DROP POLICY IF EXISTS "Public read access to community Q&A dataset" ON reddit_qa_dataset;
--
-- CREATE POLICY "Public read access to Reddit Q&A dataset"
--   ON reddit_qa_dataset FOR SELECT
--   USING (true);
--
-- -- 5. Replace function back
-- DROP FUNCTION IF EXISTS search_community_qa(TEXT, INTEGER);
--
-- CREATE OR REPLACE FUNCTION search_reddit_qa(search_query TEXT, result_limit INTEGER DEFAULT 5)
-- RETURNS TABLE (
--   id UUID,
--   title TEXT,
--   question TEXT,
--   answer TEXT,
--   upvotes INTEGER,
--   url TEXT,
--   relevance_score REAL
-- ) AS $$
-- BEGIN
--   RETURN QUERY
--   SELECT
--     r.id,
--     r.title,
--     r.question,
--     r.answer,
--     r.upvotes,
--     r.url,
--     (
--       ts_rank(to_tsvector('english', r.title), plainto_tsquery('english', search_query)) * 2 +
--       ts_rank(to_tsvector('english', r.question), plainto_tsquery('english', search_query)) * 1.5 +
--       ts_rank(to_tsvector('english', COALESCE(r.answer, '')), plainto_tsquery('english', search_query)) * 1.0
--     )::REAL as relevance_score
--   FROM reddit_qa_dataset r
--   WHERE
--     to_tsvector('english', r.title || ' ' || r.question || ' ' || COALESCE(r.answer, '')) @@ plainto_tsquery('english', search_query)
--   ORDER BY relevance_score DESC, r.upvotes DESC
--   LIMIT result_limit;
-- END;
-- $$ LANGUAGE plpgsql;
