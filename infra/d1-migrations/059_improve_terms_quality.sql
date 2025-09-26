
UPDATE terms_v2 
SET id = 'term_' || slug || '_' || CAST(rowid AS TEXT)
WHERE id IS NULL;



-- Script to improve terms that need better definitions
-- This will be run after we identify which terms need improvement

-- First, let's see which terms need improvement
SELECT 
  id, 
  slug, 
  title, 
  definition,
  examples,
  CASE 
    WHEN LENGTH(definition) < 50 THEN 'SHORT_DEF'
    WHEN LENGTH(examples) < 50 THEN 'SHORT_EX'
    WHEN definition LIKE '%Don''t have a discussion%' THEN 'STYLE_GUIDE'
    WHEN definition LIKE '%Instead of saying%' THEN 'STYLE_GUIDE'
    WHEN definition LIKE '%Convey the idea%' THEN 'STYLE_GUIDE'
    WHEN definition LIKE '%If you''re describing%' THEN 'STYLE_GUIDE'
    ELSE 'GOOD'
  END as quality_issue
FROM terms_v2 
WHERE 
  LENGTH(definition) < 50 
  OR LENGTH(examples) < 50 
  OR definition LIKE '%Don''t have a discussion%'
  OR definition LIKE '%Instead of saying%'
  OR definition LIKE '%Convey the idea%'
  OR definition LIKE '%If you''re describing%'
ORDER BY quality_issue, title;
