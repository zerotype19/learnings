-- Improve terms content - Batch 10 (Fixed)
-- This script improves definitions, examples, and tags for terms that need enhancement

-- 1. Going forward - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A redundant phrase that can usually be eliminated, used to make simple statements sound more formal and important than they actually are.',
  examples = 'Examples:\n- "Going forward, we will hire 10 people." (we will hire 10 people)\n- "Going forward, we need to improve." (we need to improve)\n- "Going forward, this is our strategy." (this is our strategy)',
  tags = '["redundant", "eliminated", "formal", "important", "simple"]'
WHERE id = 'term_going-forward_760';

-- 2. Good to go - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A slangy way to say "ready" that makes simple confirmation sound more casual and energetic than it actually is.',
  examples = 'Examples:\n- "We''re good to go on this project." (we''re ready)\n- "Everything is good to go." (everything is ready)\n- "Are you good to go?" (are you ready?)',
  tags = '["slangy", "ready", "casual", "energetic", "confirmation"]'
WHERE id = 'term_good-to-go_761';

-- 3. Grow the business - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A phrase that makes business development sound like farming, usually used by people who have never grown anything more complex than a houseplant.',
  examples = 'Examples:\n- "We need to grow the business." (we need to expand)\n- "Our goal is to grow the business." (our goal is to expand)\n- "Let''s grow the business together." (let''s expand together)',
  tags = '["farming", "business", "development", "houseplant", "expand"]'
WHERE id = 'term_grow-the-business_762';

-- 4. Guesstimate - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A made-up word that combines "guess" and "estimate" to make wild speculation sound more professional and calculated than it actually is.',
  examples = 'Examples:\n- "My guesstimate is 47%." (I think it''s around 47%)\n- "Can you give me a guesstimate?" (can you guess?)\n- "This is just a guesstimate." (this is a rough guess)',
  tags = '["made-up", "guess", "estimate", "speculation", "professional"]'
WHERE id = 'term_guesstimate_763';

-- 5. Next steps - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A harmless-looking phrase that escalates word count and makes simple action items sound more formal and important than they actually are.',
  examples = 'Examples:\n- "What are our next steps?" (what do we do next?)\n- "Let''s discuss next steps." (let''s talk about what to do)\n- "Here are the next steps." (here''s what to do next)',
  tags = '["harmless", "word-count", "action-items", "formal", "important"]'
WHERE id = 'term_next-steps_785';

-- 6. Ninja - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A self-proclaimed expert who knows slightly more than you do about a topic, usually self-appointed and always overconfident in their abilities.',
  examples = 'Examples:\n- "I''m a social media ninja." (I know how to post on Facebook)\n- "Our marketing ninja will handle this." (our marketing person who thinks they''re smart)\n- "He''s a productivity ninja." (he read a book about getting things done)',
  tags = '["self-proclaimed", "expert", "overconfident", "knowledge", "pretentious"]'
WHERE id = 'term_ninja_786';

-- 7. One throat to choke - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A violent metaphor meaning you are the only place your client needs to go for answers, usually said by people who have never actually choked anyone.',
  examples = 'Examples:\n- "We''re your one throat to choke." (we handle everything)\n- "You need one throat to choke." (you need one contact)\n- "We provide one throat to choke." (we centralize everything)',
  tags = '["violent", "metaphor", "client", "answers", "contact"]'
WHERE id = 'term_one-throat-to-choke_787';

-- 8. Open the kimono - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A culturally inappropriate metaphor for sharing secrets or proprietary information, usually said by people who have never worn a kimono.',
  examples = 'Examples:\n- "Let''s open the kimono on this." (let''s share information)\n- "We need to open the kimono." (we need to be transparent)\n- "Time to open the kimono." (time to share details)',
  tags = '["culturally", "inappropriate", "metaphor", "secrets", "transparent"]'
WHERE id = 'term_open-the-kimono_788';

-- 9. Optimize - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'An overused term that means "improve" but sounds more technical and sophisticated, usually used when you can''t actually optimize anything.',
  examples = 'Examples:\n- "We need to optimize our process." (we need to improve our process)\n- "Let''s optimize this workflow." (let''s improve this workflow)\n- "This will optimize our results." (this will improve our results)',
  tags = '["overused", "improve", "technical", "sophisticated", "results"]'
WHERE id = 'term_optimize_789';

-- 10. Outside the box - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A tired phrase that ironically alerts people that you have no creativity, since truly creative people don''t need to announce their creativity.',
  examples = 'Examples:\n- "We need to think outside the box." (we need to be creative)\n- "This is outside the box thinking." (this is creative thinking)\n- "Let''s go outside the box." (let''s be creative)',
  tags = '["tired", "phrase", "creativity", "announce", "creative"]'
WHERE id = 'term_outside-the-box_790';

-- 11. Preplan - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A redundant word that combines "pre" and "plan" to make early-stage planning sound more formal and important than it actually is.',
  examples = 'Examples:\n- "We need to preplan this project." (we need to plan early)\n- "Let''s preplan our strategy." (let''s plan ahead)\n- "This requires preplanning." (this requires advance planning)',
  tags = '["redundant", "pre", "plan", "early-stage", "formal"]'
WHERE id = 'term_preplan_791';

-- 12. Preschedule - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A redundant word that combines "pre" and "schedule" to make advance scheduling sound more formal and important than it actually is.',
  examples = 'Examples:\n- "We need to preschedule this meeting." (we need to schedule in advance)\n- "Let''s preschedule our calls." (let''s schedule ahead)\n- "This requires prescheduling." (this requires advance scheduling)',
  tags = '["redundant", "pre", "schedule", "advance", "formal"]'
WHERE id = 'term_preschedule_792';

-- 13. Preso - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A slangy abbreviation for "presentation" that makes you sound more casual and hip than you actually are, usually used by people who think "presentation" is too formal.',
  examples = 'Examples:\n- "I''ll send you the preso." (I''ll send you the presentation)\n- "The preso went well." (the presentation went well)\n- "Can you review the preso?" (can you review the presentation?)',
  tags = '["slangy", "abbreviation", "presentation", "casual", "hip"]'
WHERE id = 'term_preso_793';

-- 14. Price point - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "price" that makes simple cost information sound more sophisticated and analytical than it actually is.',
  examples = 'Examples:\n- "What''s the price point?" (what''s the price?)\n- "We need to adjust our price point." (we need to change our price)\n- "This price point is too high." (this price is too high)',
  tags = '["fancy", "price", "sophisticated", "analytical", "cost"]'
WHERE id = 'term_price-point_794';

-- 15. Proactive - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A word that means "taking initiative" but sounds more professional and strategic, usually used when you''re just doing your job.',
  examples = 'Examples:\n- "We need to be more proactive." (we need to take initiative)\n- "She''s very proactive." (she takes initiative)\n- "This is a proactive approach." (this takes initiative)',
  tags = '["initiative", "professional", "strategic", "job", "approach"]'
WHERE id = 'term_proactive_795';

-- 16. Quite frankly - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A phrase that means "I''m about to be honest" but actually means "I''m about to be rude" or "I''m about to say something you won''t like."',
  examples = 'Examples:\n- "Quite frankly, this won''t work." (this won''t work)\n- "Quite frankly, I disagree." (I disagree)\n- "Quite frankly, this is terrible." (this is terrible)',
  tags = '["honest", "rude", "disagree", "terrible", "frankly"]'
WHERE id = 'term_quite-frankly_797';

-- 17. Radio silent - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A phrase that means "not responding" but sounds more dramatic and mysterious, usually used when someone just isn''t answering their phone.',
  examples = 'Examples:\n- "He''s gone radio silent." (he''s not responding)\n- "We''re getting radio silence." (we''re not getting responses)\n- "The client went radio silent." (the client stopped responding)',
  tags = '["responding", "dramatic", "mysterious", "phone", "client"]'
WHERE id = 'term_radio-silent_798';

-- 18. Rationalization - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A euphemism for getting fired that makes job loss sound like a logical business decision rather than what it actually is.',
  examples = 'Examples:\n- "We''re doing some rationalization." (we''re firing people)\n- "The rationalization affected 47 people." (47 people were fired)\n- "This is part of our rationalization." (this is part of our layoffs)',
  tags = '["euphemism", "fired", "job-loss", "logical", "layoffs"]'
WHERE id = 'term_rationalization_800';
