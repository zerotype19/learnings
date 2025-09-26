-- Enhance Snarkiness - Batch 1
-- This script makes definitions more snarky, pretentious, and less corporate

-- 1. Core values
UPDATE terms_v2 SET 
  definition = 'A list of meaningless platitudes that companies post on their walls while simultaneously doing the exact opposite of everything they claim to believe in.',
  examples = 'Examples:\n- "Our core values include integrity, transparency, and respect." (while we fire people via email and hide our financial problems)\n- "We live our core values every day." (except when they conflict with quarterly profits)\n- "Our core values guide every decision." (especially the decision to ignore them when convenient)',
  tags = '["platitudes", "meaningless", "hypocrisy", "walls", "profits"]'
WHERE id = 'term_core-values';

-- 2. Break down silos
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "force people to work together" that makes organizational dysfunction sound like a strategic initiative, usually followed by creating 47 new committees that don''t actually communicate.',
  examples = 'Examples:\n- "We need to break down silos between departments." (we need to force people to attend more meetings)\n- "Breaking down silos will improve collaboration." (breaking down silos will create more confusion)\n- "Our silo-breaking initiative is working." (our silo-breaking initiative created 12 new silos)',
  tags = '["euphemism", "dysfunction", "committees", "meetings", "confusion"]'
WHERE id = 'term_break-down-silos';

-- 3. Table stakes
UPDATE terms_v2 SET 
  definition = 'A pretentious way of saying "the bare minimum" that makes basic requirements sound like sophisticated business strategy, usually used to justify why your product costs 10x more than it should.',
  examples = 'Examples:\n- "These features are table stakes." (these features are the bare minimum we can get away with)\n- "We need to meet the table stakes." (we need to not be completely terrible)\n- "Table stakes aren''t enough to compete." (being adequate isn''t enough, apparently)',
  tags = '["pretentious", "minimum", "strategy", "costs", "adequate"]'
WHERE id = 'term_table_stakes_v24';

-- 4. Span of control
UPDATE terms_v2 SET 
  definition = 'A corporate way of saying "how many people you can micromanage" that makes organizational hierarchy sound like a scientific measurement, usually used to justify why managers need more managers.',
  examples = 'Examples:\n- "My span of control is too wide." (I can''t micromanage enough people)\n- "We need to adjust our span of control." (we need to hire more middle managers)\n- "The optimal span of control is 7." (the optimal number of people to annoy is 7)',
  tags = '["micromanage", "hierarchy", "scientific", "managers", "annoy"]'
WHERE id = 'term_span-of-control';

-- 5. Tiger team
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "people who actually work" that makes competent employees sound like a special forces unit, usually assembled when management realizes they''ve been hiring idiots.',
  examples = 'Examples:\n- "We''ve assembled a tiger team." (we''ve found people who can actually do their jobs)\n- "The tiger team will solve this crisis." (the tiger team will fix what we broke)\n- "Our tiger team is unstoppable." (our tiger team is the only reason we haven''t gone bankrupt)',
  tags = '["euphemism", "competent", "special-forces", "idiots", "bankrupt"]'
WHERE id = 'term_tiger_team_v33';

-- 6. Actionable items
UPDATE terms_v2 SET 
  definition = 'A pretentious way of saying "things to do" that makes a simple to-do list sound like a sophisticated business process, usually followed by creating 47 more meetings to discuss the actionable items.',
  examples = 'Examples:\n- "Let''s create actionable items." (let''s make a list of things we won''t do)\n- "These are our actionable items." (these are things we''ll forget about by tomorrow)\n- "We need more actionable items." (we need more things to not accomplish)',
  tags = '["pretentious", "to-do", "sophisticated", "meetings", "accomplish"]'
WHERE id = 'term_actionable-items';

-- 7. Technical debt
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "we built it wrong the first time" that makes poor engineering decisions sound like a sophisticated financial concept, usually used to justify why everything is broken.',
  examples = 'Examples:\n- "We have a lot of technical debt." (we built everything wrong and now it''s falling apart)\n- "Technical debt is slowing us down." (our terrible code is making everything impossible)\n- "We need to address our technical debt." (we need to rebuild everything from scratch)',
  tags = '["euphemism", "wrong", "engineering", "broken", "rebuild"]'
WHERE id = 'term_technical-debt';

-- 8. Champion
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "person who gets blamed when things go wrong" that makes being a scapegoat sound like a leadership position, usually assigned to the most optimistic person in the room.',
  examples = 'Examples:\n- "We need a champion for this project." (we need someone to blame when this fails)\n- "She''s our champion for this initiative." (she''s our designated scapegoat)\n- "The champion will drive results." (the champion will take the fall when we don''t)',
  tags = '["euphemism", "blamed", "scapegoat", "leadership", "optimistic"]'
WHERE id = 'term_champion';

-- 9. Sidebar
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "wasting time" that makes pointless digressions sound like a sophisticated meeting technique, usually used when people want to avoid the actual agenda.',
  examples = 'Examples:\n- "Quick sidebar." (let''s waste 20 minutes talking about nothing)\n- "Can we do a sidebar on this?" (can we avoid doing any real work?)\n- "That''s a sidebar for later." (that''s something we''ll never discuss again)',
  tags = '["euphemism", "wasting", "digressions", "meeting", "agenda"]'
WHERE id = 'term_sidebar';

-- 10. Ball in your court
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "I''m done with this problem" that makes passing responsibility sound like a sports metaphor, usually used when someone wants to avoid making a decision.',
  examples = 'Examples:\n- "The ball is in your court." (I''m done with this, it''s your problem now)\n- "We''ll put the ball in their court." (we''ll make them deal with our mess)\n- "The ball has been in their court for weeks." (they''ve been ignoring our problems for weeks)',
  tags = '["euphemism", "responsibility", "sports", "decision", "ignoring"]'
WHERE id = 'term_ball-in-your-court';
