-- Improve terms content - Batch 12
-- This script adds tags to terms that already have good definitions and examples

-- 1. Trust gap
UPDATE terms_v2 SET 
  tags = '["difference", "companies", "customers", "credibility", "relationships"]'
WHERE id = 'term_trust-gap_917';

-- 2. Reputation capital
UPDATE terms_v2 SET 
  tags = '["reputation", "brand", "goodwill", "measurable", "debt"]'
WHERE id = 'term_reputation-capital_918';

-- 3. Agentic workflows
UPDATE terms_v2 SET 
  tags = '["workplace", "revolutionary", "powerpoint", "buzzword", "employment"]'
WHERE id = 'term_agentic-workflows_939';

-- 4. AI governance
UPDATE terms_v2 SET 
  tags = '["ai", "futuristic", "uncertain", "buzzword", "technology"]'
WHERE id = 'term_ai-governance_940';

-- 5. Explainability
UPDATE terms_v2 SET 
  tags = '["ai", "understand", "decisions", "transparency", "jargon"]'
WHERE id = 'term_explainability_941';

-- 6. Responsible AI
UPDATE terms_v2 SET 
  tags = '["ai", "futuristic", "uncertain", "buzzword", "technology"]'
WHERE id = 'term_responsible-ai_942';

-- 7. Ethical AI
UPDATE terms_v2 SET 
  tags = '["ai", "futuristic", "uncertain", "buzzword", "technology"]'
WHERE id = 'term_ethical-ai_943';

-- 8. Bias mitigation
UPDATE terms_v2 SET 
  tags = '["bias", "ai", "discrimination", "diverse", "racist"]'
WHERE id = 'term_bias-mitigation_944';

-- 9. AI hallucination
UPDATE terms_v2 SET 
  tags = '["ai", "futuristic", "uncertain", "buzzword", "technology"]'
WHERE id = 'term_ai-hallucination_945';

-- 10. Synthetic personas
UPDATE terms_v2 SET 
  tags = '["ai", "fictional", "testing", "mannequins", "personality"]'
WHERE id = 'term_synthetic-personas_946';

-- 11. Voice of customer
UPDATE terms_v2 SET 
  tags = '["customer", "buzzword", "care", "profits", "shareholder"]'
WHERE id = 'term_voice-of-customer_947';

-- 12. Customer data platform
UPDATE terms_v2 SET 
  tags = '["data", "jargon", "sophisticated", "expensive", "subscription"]'
WHERE id = 'term_customer-data-platform_948';

-- 13. Growth audiences
UPDATE terms_v2 SET 
  tags = '["customer", "segments", "marketing", "expansion", "avoid"]'
WHERE id = 'term_growth-audiences_949';

-- 14. Always-on audiences
UPDATE terms_v2 SET 
  tags = '["customer", "segments", "marketing", "emails", "dreams"]'
WHERE id = 'term_always-on-audiences_950';

-- 15. Eligibility model
UPDATE terms_v2 SET 
  tags = '["system", "customers", "qualify", "offers", "complex"]'
WHERE id = 'term_eligibility-model_951';

-- 16. Next-gen CRM
UPDATE terms_v2 SET 
  tags = '["next-generation", "crm", "advanced", "ai", "behavior"]'
WHERE id = 'term_next-gen-crm_952';

-- 17. Revenue operations
UPDATE terms_v2 SET 
  tags = '["strategic", "alignment", "revenue", "lifecycle", "confusing"]'
WHERE id = 'term_revenue-operations_953';

-- 18. RevOps
UPDATE terms_v2 SET 
  tags = '["revenue", "operations", "alignment", "sales", "problem"]'
WHERE id = 'term_revops_954';

-- 19. Sales enablement
UPDATE terms_v2 SET 
  tags = '["sales", "tools", "content", "training", "selling"]'
WHERE id = 'term_sales-enablement_955';

-- 20. Predictable pipeline
UPDATE terms_v2 SET 
  tags = '["sales", "pipeline", "forecastable", "revenue", "predictions"]'
WHERE id = 'term_predictable-pipeline_956';
