-- Improve terms content - Batch 14
-- This script improves definitions, examples, and tags for terms that need enhancement

-- 1. Execute - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "do" or "carry out" that makes simple actions sound more important and strategic than they actually are.',
  examples = 'Examples:\n- "We need to execute this plan." (we need to do this plan)\n- "Let''s execute the strategy." (let''s carry out the strategy)\n- "This will execute automatically." (this will happen automatically)',
  tags = '["fancy", "do", "carry-out", "important", "strategic"]'
WHERE id = 'term_execute_754';

-- 2. Fish or cut bait - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A fishing metaphor that means "make a decision" but sounds more folksy and dramatic, usually said by people who have never actually fished.',
  examples = 'Examples:\n- "It''s time to fish or cut bait." (it''s time to decide)\n- "We need to fish or cut bait on this." (we need to make a decision)\n- "Fish or cut bait, as they say." (make a decision)',
  tags = '["fishing", "metaphor", "decision", "folksy", "dramatic"]'
WHERE id = 'term_fish-or-cut-bait_755';

-- 3. Frictionless - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A word that means "smooth" or "easy" but sounds more technical and impressive, usually used to describe experiences that are actually quite friction-filled.',
  examples = 'Examples:\n- "Our frictionless experience is amazing." (our smooth experience is good)\n- "We provide frictionless service." (we provide easy service)\n- "This is completely frictionless." (this is very smooth)',
  tags = '["smooth", "easy", "technical", "impressive", "friction-filled"]'
WHERE id = 'term_frictionless_756';

-- 4. Functionality - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "features" or "capabilities" that makes basic product functions sound more sophisticated and important than they actually are.',
  examples = 'Examples:\n- "This functionality is essential." (this feature is important)\n- "We need more functionality." (we need more features)\n- "The functionality is comprehensive." (the features are complete)',
  tags = '["fancy", "features", "capabilities", "sophisticated", "important"]'
WHERE id = 'term_functionality_757';

-- 5. Get on board - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A phrase that means "agree" or "support" but sounds more enthusiastic and team-oriented, usually used when you want people to stop disagreeing with you.',
  examples = 'Examples:\n- "We need everyone to get on board." (we need everyone to agree)\n- "Are you on board with this?" (do you agree with this?)\n- "Let''s get on board together." (let''s agree together)',
  tags = '["agree", "support", "enthusiastic", "team-oriented", "disagreeing"]'
WHERE id = 'term_get-on-board_758';

-- 6. Give 110% - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A mathematically impossible phrase that means "work very hard" but sounds more dramatic and committed than just saying "work hard."',
  examples = 'Examples:\n- "We need to give 110% on this project." (we need to work very hard)\n- "She always gives 110%." (she always works very hard)\n- "Give 110% and we''ll succeed." (work very hard and we''ll succeed)',
  tags = '["mathematically", "impossible", "work", "hard", "dramatic"]'
WHERE id = 'term_give-110_759';
