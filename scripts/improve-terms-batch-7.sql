-- Improve terms content - Batch 7
-- This script adds tags to terms that already have good definitions and examples

-- 1. Community-led growth
UPDATE terms_v2 SET 
  tags = '["growth", "exponential", "minimal-effort", "revenue", "satisfaction"]'
WHERE id = 'term_community-led-growth_959';

-- 2. GTM motion
UPDATE terms_v2 SET 
  tags = '["go-to-market", "strategy", "launching", "selling", "customers"]'
WHERE id = 'term_gtm-motion_960';

-- 3. Category design
UPDATE terms_v2 SET 
  tags = '["market", "category", "positioning", "buzzwords", "synergy"]'
WHERE id = 'term_category-design_961';

-- 4. Demand gen
UPDATE terms_v2 SET 
  tags = '["demand", "generation", "interest", "team", "problem"]'
WHERE id = 'term_demand-gen_962';

-- 5. Product-market fit
UPDATE terms_v2 SET 
  tags = '["product", "market", "demand", "scale", "begging"]'
WHERE id = 'term_product-market-fit_963';

-- 6. Retention curve
UPDATE terms_v2 SET 
  tags = '["retention", "graph", "popularity", "churn", "revenue"]'
WHERE id = 'term_retention-curve_964';

-- 7. Churn mitigation
UPDATE terms_v2 SET 
  tags = '["churn", "retention", "counseling", "emails", "miss-you"]'
WHERE id = 'term_churn-mitigation_965';

-- 8. Expansion motion
UPDATE terms_v2 SET 
  tags = '["expansion", "revenue", "customers", "salesperson", "dealership"]'
WHERE id = 'term_expansion-motion_966';

-- 9. Wallet share
UPDATE terms_v2 SET 
  tags = '["wallet", "spending", "market-share", "income", "financial-health"]'
WHERE id = 'term_wallet-share_967';

-- 10. Customer lifetime value
UPDATE terms_v2 SET 
  tags = '["value", "corporate-speak", "shareholder", "customers", "rocket-science"]'
WHERE id = 'term_customer-lifetime-value_968';

-- 11. Land and expand
UPDATE terms_v2 SET 
  tags = '["sales", "strategy", "small-deal", "opportunities", "contract"]'
WHERE id = 'term_land-and-expand_969';

-- 12. Consumption-based pricing
UPDATE terms_v2 SET 
  tags = '["pricing", "consumption", "utility", "success", "tax"]'
WHERE id = 'term_consumption-based-pricing_970';

-- 13. Subscription fatigue
UPDATE terms_v2 SET 
  tags = '["subscription", "exhaustion", "monthly", "addiction", "digital"]'
WHERE id = 'term_subscription-fatigue_971';

-- 14. Dynamic pricing
UPDATE terms_v2 SET 
  tags = '["pricing", "demand", "surge", "weather", "mercury"]'
WHERE id = 'term_dynamic-pricing_972';

-- 15. Smart contracts
UPDATE terms_v2 SET 
  tags = '["contracts", "self-executing", "legal", "code", "intend"]'
WHERE id = 'term_smart-contracts_973';

-- 16. Tokenization
UPDATE terms_v2 SET 
  tags = '["tokenization", "rights", "digital", "ownership", "furniture"]'
WHERE id = 'term_tokenization_974';

-- 17. Web3
UPDATE terms_v2 SET 
  tags = '["web3", "blockchain", "decentralization", "buzzwords", "revolutionary"]'
WHERE id = 'term_web3_975';

-- 18. NFT drop
UPDATE terms_v2 SET 
  tags = '["nft", "collection", "hype", "limited", "art"]'
WHERE id = 'term_nft-drop_976';

-- 19. Digital wallet
UPDATE terms_v2 SET 
  tags = '["digital", "wallet", "payment", "secure", "customer-service"]'
WHERE id = 'term_digital-wallet_977';

-- 20. Metaverse
UPDATE terms_v2 SET 
  tags = '["metaverse", "virtual", "digital", "second-life", "coffee"]'
WHERE id = 'term_metaverse_978';
