-- Improve terms content - Batch 11
-- This script adds tags to terms that already have good definitions and examples

-- 1. Feedforward
UPDATE terms_v2 SET 
  tags = '["euphemism", "feedback", "positive", "future-focused", "buzzwords"]'
WHERE id = 'term_feedforward_842';

-- 2. North Star metric
UPDATE terms_v2 SET 
  tags = '["metric", "important", "decisions", "success", "satisfaction"]'
WHERE id = 'term_north-star-metric_843';

-- 3. Zero-click content
UPDATE terms_v2 SET 
  tags = '["content", "buzzword", "communication", "strategy", "revolutionary"]'
WHERE id = 'term_zero-click-content_844';

-- 4. Quiet quitting
UPDATE terms_v2 SET 
  tags = '["minimum", "work", "coasting", "revolutionary", "overworking"]'
WHERE id = 'term_quiet-quitting_845';

-- 5. Product-led growth
UPDATE terms_v2 SET 
  tags = '["growth", "exponential", "minimal-effort", "revenue", "satisfaction"]'
WHERE id = 'term_product-led-growth_846';

-- 6. Culture add
UPDATE terms_v2 SET 
  tags = '["hiring", "perspectives", "diversity", "culture", "different"]'
WHERE id = 'term_culture-add_847';

-- 7. Digital twin
UPDATE terms_v2 SET 
  tags = '["digital", "replica", "simulation", "analysis", "deadlines"]'
WHERE id = 'term_digital-twin_848';

-- 8. Carbon neutral
UPDATE terms_v2 SET 
  tags = '["carbon", "emissions", "offsetting", "trees", "starbucks"]'
WHERE id = 'term_carbon-neutral_864';

-- 9. Net zero
UPDATE terms_v2 SET 
  tags = '["emissions", "balance", "atmosphere", "trees", "commute"]'
WHERE id = 'term_net-zero_865';

-- 10. Circular economy
UPDATE terms_v2 SET 
  tags = '["economic", "waste", "reusing", "recycling", "strategies"]'
WHERE id = 'term_circular-economy_866';

-- 11. Data fabric
UPDATE terms_v2 SET 
  tags = '["data", "management", "architecture", "access", "sweater"]'
WHERE id = 'term_data-fabric_867';

-- 12. Composable architecture
UPDATE terms_v2 SET 
  tags = '["software", "architecture", "reusable", "modular", "lego"]'
WHERE id = 'term_composable-architecture_868';

-- 13. No-code
UPDATE terms_v2 SET 
  tags = '["development", "code", "visual", "interfaces", "productivity"]'
WHERE id = 'term_no-code_869';

-- 14. Low-code
UPDATE terms_v2 SET 
  tags = '["development", "visual", "coding", "marketing", "kindergarten"]'
WHERE id = 'term_low-code_870';

-- 15. Citizen developer
UPDATE terms_v2 SET 
  tags = '["non-technical", "employees", "applications", "diy", "myspace"]'
WHERE id = 'term_citizen-developer_871';

-- 16. Infinite loop
UPDATE terms_v2 SET 
  tags = '["programming", "continuously", "crashes", "efficient", "performance"]'
WHERE id = 'term_infinite-loop_872';

-- 17. Operationalize
UPDATE terms_v2 SET 
  tags = '["strategy", "implementation", "execution", "committees", "innovation"]'
WHERE id = 'term_operationalize_873';

-- 18. Unlock value
UPDATE terms_v2 SET 
  tags = '["value", "corporate-speak", "shareholder", "customers", "rocket-science"]'
WHERE id = 'term_unlock-value_874';

-- 19. Unlock growth
UPDATE terms_v2 SET 
  tags = '["growth", "exponential", "minimal-effort", "revenue", "satisfaction"]'
WHERE id = 'term_unlock-growth_875';

-- 20. Value creation
UPDATE terms_v2 SET 
  tags = '["value", "customers", "stakeholders", "business", "profit-margins"]'
WHERE id = 'term_value-creation_876';
