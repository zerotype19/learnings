-- Improve terms content - Batch 8
-- This script adds tags to terms that already have good definitions and examples

-- 1. Future of work
UPDATE terms_v2 SET 
  tags = '["workplace", "revolutionary", "powerpoint", "buzzword", "employment"]'
WHERE id = 'term_future-of-work_999';

-- 2. Talent marketplace
UPDATE terms_v2 SET 
  tags = '["platform", "skilled", "workers", "flexibility", "job-security"]'
WHERE id = 'term_talent-marketplace_1000';

-- 3. Fractional executive
UPDATE terms_v2 SET 
  tags = '["part-time", "executive", "multiple", "consultant", "business-cards"]'
WHERE id = 'term_fractional-executive_1001';

-- 4. Skills-based hiring
UPDATE terms_v2 SET 
  tags = '["hiring", "skills", "abilities", "credentials", "faked"]'
WHERE id = 'term_skills-based-hiring_1002';

-- 5. Reskilling
UPDATE terms_v2 SET 
  tags = '["learning", "skills", "adapting", "evolution", "forward-thinking"]'
WHERE id = 'term_reskilling_1003';

-- 6. Upskilling
UPDATE terms_v2 SET 
  tags = '["learning", "skills", "advance", "development", "overqualified"]'
WHERE id = 'term_upskilling_1004';

-- 7. Career cushioning
UPDATE terms_v2 SET 
  tags = '["backup", "job-options", "safety-net", "linkedin", "resume"]'
WHERE id = 'term_career-cushioning_1005';
