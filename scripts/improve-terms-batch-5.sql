-- Improve terms content - Batch 5
-- This script adds tags to terms that already have good definitions and examples

-- 1. Smart brevity
UPDATE terms_v2 SET 
  tags = '["communication", "efficiency", "language", "terse", "verbose"]'
WHERE id = 'term_smart-brevity_879';

-- 2. Radical candor
UPDATE terms_v2 SET 
  tags = '["management", "caring", "challenging", "tough-love", "morale"]'
WHERE id = 'term_radical-candor_880';

-- 3. Storyselling
UPDATE terms_v2 SET 
  tags = '["storytelling", "sales", "emotional", "connections", "development"]'
WHERE id = 'term_storyselling_881';

-- 4. Earned-first
UPDATE terms_v2 SET 
  tags = '["marketing", "earned-media", "organic", "reviews", "advertising"]'
WHERE id = 'term_earned-first_882';

-- 5. De-platforming
UPDATE terms_v2 SET 
  tags = '["platform", "buzzword", "software", "universe", "connecting"]'
WHERE id = 'term_de-platforming_883';

-- 6. Dark funnel
UPDATE terms_v2 SET 
  tags = '["acquisition", "tracking", "word-of-mouth", "organic", "valuable"]'
WHERE id = 'term_dark-funnel_884';

-- 7. Owned attention
UPDATE terms_v2 SET 
  tags = '["attention", "control", "channels", "advertising", "effort"]'
WHERE id = 'term_owned-attention_885';

-- 8. Infinite scroll
UPDATE terms_v2 SET 
  tags = '["web-design", "continuous", "bottomless", "engaging", "hours"]'
WHERE id = 'term_infinite-scroll_886';

-- 9. Snackable content
UPDATE terms_v2 SET 
  tags = '["content", "buzzword", "communication", "strategy", "revolutionary"]'
WHERE id = 'term_snackable-content_887';

-- 10. Content velocity
UPDATE terms_v2 SET 
  tags = '["content", "speed", "assembly-line", "publishing", "articles"]'
WHERE id = 'term_content-velocity_888';

-- 11. Customer journey orchestration
UPDATE terms_v2 SET 
  tags = '["coordination", "touchpoints", "experience", "symphony", "instruments"]'
WHERE id = 'term_customer-journey-orchestration_889';

-- 12. Next best action
UPDATE terms_v2 SET 
  tags = '["optimal", "customer", "behavior", "algorithm", "creepy"]'
WHERE id = 'term_next-best-action_890';

-- 13. Omnichannel
UPDATE terms_v2 SET 
  tags = '["marketing", "seamless", "touchpoints", "chatbots", "conversation"]'
WHERE id = 'term_omnichannel_891';

-- 14. Clickstream
UPDATE terms_v2 SET 
  tags = '["path", "website", "clicks", "analysis", "returning"]'
WHERE id = 'term_clickstream_892';

-- 15. Digital exhaust
UPDATE terms_v2 SET 
  tags = '["data", "byproduct", "footprint", "avoiding", "content"]'
WHERE id = 'term_digital-exhaust_893';

-- 16. Edge compute
UPDATE terms_v2 SET 
  tags = '["computing", "latency", "performance", "servers", "locations"]'
WHERE id = 'term_edge-compute_894';

-- 17. Data mesh
UPDATE terms_v2 SET 
  tags = '["decentralized", "architecture", "domain-teams", "truth", "confusing"]'
WHERE id = 'term_data-mesh_895';

-- 18. Self-serve analytics
UPDATE terms_v2 SET 
  tags = '["data", "jargon", "sophisticated", "expensive", "subscription"]'
WHERE id = 'term_self-serve-analytics_896';

-- 19. Data democratization
UPDATE terms_v2 SET 
  tags = '["data", "accessible", "employees", "decisions", "bad-decisions"]'
WHERE id = 'term_data-democratization_897';

-- 20. Insight to action
UPDATE terms_v2 SET 
  tags = '["insights", "business-actions", "efficient", "powerpoint", "minutes"]'
WHERE id = 'term_insight-to-action_898';
