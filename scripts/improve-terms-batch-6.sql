-- Improve terms content - Batch 6
-- This script adds tags to terms that already have good definitions and examples

-- 1. Social capital
UPDATE terms_v2 SET 
  tags = '["networks", "relationships", "economic", "networking", "value"]'
WHERE id = 'term_social-capital_919';

-- 2. Return on experience
UPDATE terms_v2 SET 
  tags = '["metric", "customer", "experience", "feelings", "happiness"]'
WHERE id = 'term_return-on-experience_920';

-- 3. Engagement rate
UPDATE terms_v2 SET 
  tags = '["metric", "users", "interaction", "popularity", "influencers"]'
WHERE id = 'term_engagement-rate_921';

-- 4. Attribution modeling
UPDATE terms_v2 SET 
  tags = '["marketing", "touchpoints", "conversion", "detective", "persistence"]'
WHERE id = 'term_attribution-modeling_922';

-- 5. Incrementality
UPDATE terms_v2 SET 
  tags = '["value", "campaign", "naturally", "investment", "math"]'
WHERE id = 'term_incrementality_923';

-- 6. Media mix modeling
UPDATE terms_v2 SET 
  tags = '["statistical", "allocation", "marketing", "scientific", "channels"]'
WHERE id = 'term_media-mix-modeling_924';

-- 7. Multi-touch attribution
UPDATE terms_v2 SET 
  tags = '["credit", "marketing", "touchpoints", "decision", "mom"]'
WHERE id = 'term_multi-touch-attribution_925';

-- 8. Data clean room
UPDATE terms_v2 SET 
  tags = '["secure", "environment", "privacy", "collaboration", "mysterious"]'
WHERE id = 'term_data-clean-room_926';

-- 9. Identity resolution
UPDATE terms_v2 SET 
  tags = '["matching", "identifiers", "person", "accurate", "fake-name"]'
WHERE id = 'term_identity-resolution_927';

-- 10. Privacy-first
UPDATE terms_v2 SET 
  tags = '["design", "philosophy", "privacy", "personalization", "generic"]'
WHERE id = 'term_privacy-first_928';

-- 11. Consent management
UPDATE terms_v2 SET 
  tags = '["consent", "storing", "privacy", "permission-slips", "tracking"]'
WHERE id = 'term_consent-management_929';

-- 12. Value exchange
UPDATE terms_v2 SET 
  tags = '["transaction", "value", "fair-trade", "balanced", "upselling"]'
WHERE id = 'term_value-exchange_930';

-- 13. Attention economy
UPDATE terms_v2 SET 
  tags = '["economic", "attention", "scarce", "competed", "shiny-objects"]'
WHERE id = 'term_attention-economy_931';

-- 14. Generative AI
UPDATE terms_v2 SET 
  tags = '["ai", "futuristic", "uncertain", "buzzword", "technology"]'
WHERE id = 'term_generative-ai_932';

-- 15. Retrieval augmented generation (RAG)
UPDATE terms_v2 SET 
  tags = '["ai", "retrieval", "generation", "accurate", "contextual"]'
WHERE id = 'term_retrieval-augmented-generation_933';

-- 16. AI copilots
UPDATE terms_v2 SET 
  tags = '["ai", "futuristic", "uncertain", "buzzword", "technology"]'
WHERE id = 'term_ai-copilots_934';

-- 17. Synthetic data
UPDATE terms_v2 SET 
  tags = '["data", "jargon", "sophisticated", "expensive", "subscription"]'
WHERE id = 'term_synthetic-data_935';

-- 18. Prompt marketplace
UPDATE terms_v2 SET 
  tags = '["platform", "ai", "prompts", "buying", "selling"]'
WHERE id = 'term_prompt-marketplace_936';

-- 19. Model collapse
UPDATE terms_v2 SET 
  tags = '["ai", "models", "diverse", "repetitive", "meta"]'
WHERE id = 'term_model-collapse_937';

-- 20. Alignment tax
UPDATE terms_v2 SET 
  tags = '["cost", "agreement", "meetings", "compromised", "buttons"]'
WHERE id = 'term_alignment-tax_938';
