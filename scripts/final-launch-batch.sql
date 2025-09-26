-- Final Launch Batch - Last Pass for Launch Readiness
-- This script enhances the final terms to meet snarkiness threshold

-- 1. Dry powder
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "money we''re not spending" that makes hoarding cash sound like sophisticated financial strategy, usually used when companies want to avoid investing in anything useful.',
  examples = 'Examples:\n- "We need to keep some dry powder." (we need to hoard money and not spend it on anything)\n- "Dry powder gives us flexibility." (hoarding money makes us feel powerful)\n- "Our dry powder is strategic." (our money hoarding is somehow strategic)',
  tags = '["euphemism", "money", "hoarding", "sophisticated", "strategic"]'
WHERE id = 'term_dry-powder';

-- 2. Roadmap
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "wishful thinking" that makes unrealistic plans sound like sophisticated strategy, usually created by people who have never actually completed a project on time.',
  examples = 'Examples:\n- "What''s the roadmap?" (what''s the fantasy timeline?)\n- "The roadmap shows we''re on track." (the roadmap shows we''re delusional)\n- "We need to update the roadmap." (we need to move all the dates back again)',
  tags = '["euphemism", "wishful", "unrealistic", "sophisticated", "delusional"]'
WHERE id = 'term_roadmap';

-- 3. Context
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "excuse" that makes justification sound like sophisticated explanation, usually used when someone wants to explain why they screwed up.',
  examples = 'Examples:\n- "Let me provide some context." (let me make up an excuse)\n- "The context is important." (my excuse is important)\n- "We need more context." (we need more excuses)',
  tags = '["euphemism", "excuse", "justification", "sophisticated", "screwed-up"]'
WHERE id = 'term_context';

-- 4. Rocket science
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "not that hard" that makes simple tasks sound like they require advanced degrees, usually used by people who can''t actually do the simple task.',
  examples = 'Examples:\n- "This isn''t rocket science." (this isn''t that hard, but I can''t do it)\n- "We need rocket science for this." (we need to overcomplicate this simple thing)\n- "Rocket science would be easier." (this simple task is somehow harder than rocket science)',
  tags = '["euphemism", "simple", "advanced", "degrees", "overcomplicate"]'
WHERE id = 'term_rocket-science';

-- 5. In the pipeline
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "maybe someday" that makes wishful thinking sound like a strategic plan, usually used when people want to avoid admitting nothing is actually happening.',
  examples = 'Examples:\n- "We have deals in the pipeline." (we have deals that may or may not happen)\n- "The pipeline looks strong." (the pipeline looks like wishful thinking)\n- "Pipeline management is key." (managing our fantasies is key)',
  tags = '["euphemism", "maybe", "wishful", "strategic", "fantasies"]'
WHERE id = 'term_in-the-pipeline';

-- 6. Pick your brain
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "waste your time" that makes bothering people sound like a collaborative strategy, usually used when someone wants free advice without paying for it.',
  examples = 'Examples:\n- "Can I pick your brain?" (can I waste your time for free?)\n- "Brain picking will help." (wasting your time will somehow help me)\n- "We need to pick more brains." (we need to waste more people''s time)',
  tags = '["euphemism", "waste", "bothering", "collaborative", "free"]'
WHERE id = 'term_pick-your-brain';

-- 7. Material
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "important" that makes basic significance sound like sophisticated financial analysis, usually used when someone wants to sound smart about obvious things.',
  examples = 'Examples:\n- "This change is material." (this change is important, obviously)\n- "Materiality is key." (importance is key, obviously)\n- "We need to assess materiality." (we need to assess importance, obviously)',
  tags = '["euphemism", "important", "significance", "sophisticated", "obvious"]'
WHERE id = 'term_material';

-- 8. Broken record
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "annoying" that makes repetitive behavior sound like a communication strategy, usually used by people who keep saying the same thing because nobody is listening.',
  examples = 'Examples:\n- "I sound like a broken record." (I keep saying the same thing because you''re not listening)\n- "Don''t be a broken record." (don''t be annoying by repeating yourself)\n- "Broken records are effective." (being annoying is somehow effective)',
  tags = '["euphemism", "annoying", "repetitive", "communication", "listening"]'
WHERE id = 'term_broken-record';

-- 9. You're crushing it
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "doing your job" that makes basic competence sound like exceptional performance, usually used by managers who have low standards and want to sound encouraging.',
  examples = 'Examples:\n- "You''re crushing it!" (you''re doing your job, which is surprising)\n- "Keep crushing it!" (keep doing your job, which is surprising)\n- "Crushing it is our standard." (doing your job is our standard, which is sad)',
  tags = '["euphemism", "job", "competence", "exceptional", "encouraging"]'
WHERE id = 'term_youre-crushing-it';

-- 10. Ownership mindset
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "blame yourself" that makes taking responsibility sound like a sophisticated leadership philosophy, usually used when management wants to avoid taking responsibility for their own failures.',
  examples = 'Examples:\n- "We need an ownership mindset." (we need people to blame themselves for our failures)\n- "Ownership mindset drives results." (blaming yourself drives results, apparently)\n- "Ownership is key." (self-blame is key, apparently)',
  tags = '["euphemism", "blame", "responsibility", "sophisticated", "failures"]'
WHERE id = 'term_ownership-mindset';

-- 11. Buckets
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "categories" that makes basic organization sound like sophisticated analysis, usually used when people want to sound smart about putting things in groups.',
  examples = 'Examples:\n- "Let''s organize into buckets." (let''s organize into categories, obviously)\n- "These buckets make sense." (these categories make sense, obviously)\n- "Bucket analysis is key." (categorization is key, obviously)',
  tags = '["euphemism", "categories", "organization", "sophisticated", "obvious"]'
WHERE id = 'term_buckets';

-- 12. On my radar
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "I''m aware of it" that makes basic knowledge sound like sophisticated monitoring, usually used when people want to sound important about knowing things.',
  examples = 'Examples:\n- "This is on my radar." (I know about this, obviously)\n- "Radar management is key." (knowing things is key, obviously)\n- "We need better radar." (we need to know more things, obviously)',
  tags = '["euphemism", "aware", "knowledge", "sophisticated", "obvious"]'
WHERE id = 'term_on-my-radar';

-- 13. Backburner
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "never" that makes procrastination sound like strategic prioritization, usually used when people want to avoid admitting they''ll never actually do something.',
  examples = 'Examples:\n- "We''ll put this on the backburner." (we''ll never do this)\n- "Backburner items are important." (things we''ll never do are important, apparently)\n- "Backburner management is key." (managing things we''ll never do is key, apparently)',
  tags = '["euphemism", "never", "procrastination", "strategic", "important"]'
WHERE id = 'term_backburner_v2_1758806025002';

-- 14. Optics
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "how it looks" that makes basic appearance sound like sophisticated public relations, usually used when people want to sound smart about obvious things.',
  examples = 'Examples:\n- "The optics are terrible." (this looks bad, obviously)\n- "We need to manage optics." (we need to manage how things look, obviously)\n- "Optics are everything." (appearance is everything, apparently)',
  tags = '["euphemism", "looks", "appearance", "sophisticated", "obvious"]'
WHERE id = 'term_optics';

-- 15. Apologies
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "sorry" that makes basic apologies sound like sophisticated communication, usually used when people want to sound formal about admitting they screwed up.',
  examples = 'Examples:\n- "Apologies for the confusion." (sorry for screwing up)\n- "We offer our apologies." (we''re sorry for screwing up)\n- "Apologies are important." (saying sorry is important, obviously)',
  tags = '["euphemism", "sorry", "apologies", "sophisticated", "screwed-up"]'
WHERE id = 'term_apologies';
