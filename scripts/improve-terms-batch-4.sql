-- Improve terms content - Batch 4
-- This script adds tags to terms that already have good definitions and examples

-- 1. AI-first
UPDATE terms_v2 SET 
  tags = '["ai", "futuristic", "uncertain", "buzzword", "technology"]'
WHERE id = 'term_ai-first_849';

-- 2. Cloud-native
UPDATE terms_v2 SET 
  tags = '["cloud", "scalability", "applications", "services", "expensive"]'
WHERE id = 'term_cloud-native_850';

-- 3. Always-on
UPDATE terms_v2 SET 
  tags = '["continuous", "marketing", "24-7", "bothering", "digital"]'
WHERE id = 'term_always-on_851';

-- 4. Resilient supply chain
UPDATE terms_v2 SET 
  tags = '["supply-chain", "disruptions", "backup", "robust", "unplanned"]'
WHERE id = 'term_resilient-supply-chain_852';

-- 5. Creator economy
UPDATE terms_v2 SET 
  tags = '["content", "monetization", "influencers", "platforms", "cereal"]'
WHERE id = 'term_creator-economy_853';

-- 6. Asynchronous work
UPDATE terms_v2 SET 
  tags = '["workplace", "revolutionary", "powerpoint", "buzzword", "employment"]'
WHERE id = 'term_asynchronous-work_854';

-- 7. Continuous discovery
UPDATE terms_v2 SET 
  tags = '["learning", "customers", "research", "experimentation", "different"]'
WHERE id = 'term_continuous-discovery_855';

-- 8. Test-and-learn
UPDATE terms_v2 SET 
  tags = '["experimentation", "validation", "scientific", "innovation", "failure"]'
WHERE id = 'term_test-and-learn_856';

-- 9. Fail fast
UPDATE terms_v2 SET 
  tags = '["philosophy", "testing", "failure", "rapid", "innovation"]'
WHERE id = 'term_fail-fast_857';

-- 10. Modern data stack
UPDATE terms_v2 SET 
  tags = '["data", "jargon", "sophisticated", "expensive", "subscription"]'
WHERE id = 'term_modern-data-stack_858';

-- 11. Big bet
UPDATE terms_v2 SET 
  tags = '["investment", "strategic", "high-risk", "blockchain", "monkeys"]'
WHERE id = 'term_big-bet_859';

-- 12. Customer obsession
UPDATE terms_v2 SET 
  tags = '["philosophy", "customer", "satisfaction", "worship", "feedback"]'
WHERE id = 'term_customer-obsession_860';

-- 13. Agile at scale
UPDATE terms_v2 SET 
  tags = '["growth", "exponential", "minimal-effort", "revenue", "satisfaction"]'
WHERE id = 'term_agile-at-scale_861';

-- 14. Hybrid workforce
UPDATE terms_v2 SET 
  tags = '["workplace", "revolutionary", "powerpoint", "buzzword", "employment"]'
WHERE id = 'term_hybrid-workforce_862';

-- 15. Virtual-first
UPDATE terms_v2 SET 
  tags = '["digital", "remote", "efficiency", "connection", "emojis"]'
WHERE id = 'term_virtual-first_863';
