-- Improve terms content - Batch 13
-- This script adds tags to terms that already have good definitions and examples

-- 1. Financial inclusion
UPDATE terms_v2 SET 
  tags = '["financial", "services", "underserved", "banking", "inclusive"]'
WHERE id = 'term_financial-inclusion_997';

-- 2. Resilient leadership
UPDATE terms_v2 SET 
  tags = '["leadership", "adapt", "thrive", "uncertain", "pivot"]'
WHERE id = 'term_resilient-leadership_998';
