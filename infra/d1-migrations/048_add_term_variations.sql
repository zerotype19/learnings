-- Add support for term variations
-- This allows multiple definitions for the same term

-- Add a variation field to track different definitions of the same term
ALTER TABLE terms_v2 ADD COLUMN variation INTEGER DEFAULT 1;
ALTER TABLE terms_v2 ADD COLUMN base_term TEXT;

-- Create an index for better performance on base_term lookups
CREATE INDEX IF NOT EXISTS idx_terms_base_term ON terms_v2(base_term);

-- Update existing terms to have base_term = title and variation = 1
UPDATE terms_v2 SET base_term = title, variation = 1 WHERE base_term IS NULL;

-- Create a view for easier querying of term variations
CREATE VIEW IF NOT EXISTS term_variations AS
SELECT 
  base_term,
  title,
  slug,
  definition,
  examples,
  tags,
  variation,
  views,
  created_at
FROM terms_v2 
WHERE status = 'published'
ORDER BY base_term, variation;
