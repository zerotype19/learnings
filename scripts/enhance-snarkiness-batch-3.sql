-- Enhance Snarkiness - Batch 3
-- This script makes definitions more snarky, pretentious, and less corporate

-- 1. Boil the Ocean
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "trying to do everything at once" that makes poor planning sound like ambitious strategy, usually used when someone wants to avoid making actual decisions.',
  examples = 'Examples:\n- "Don''t try to boil the ocean." (don''t try to do everything because you''ll fail at all of it)\n- "We''re boiling the ocean on this project." (we''re failing spectacularly at this project)\n- "Boiling the ocean is our specialty." (failing at everything is our specialty)',
  tags = '["euphemism", "planning", "ambitious", "decisions", "failing"]'
WHERE id = 'term_boil_ocean_v2_1758806025008';

-- 2. Capacity planning
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "guessing how much work we can handle" that makes wild speculation sound like sophisticated resource management, usually done by people who have never actually managed resources.',
  examples = 'Examples:\n- "We need to do capacity planning." (we need to guess how much we can screw up)\n- "Capacity planning will help us." (guessing will somehow make us better)\n- "Our capacity planning is accurate." (our guessing is slightly less wrong than usual)',
  tags = '["euphemism", "guessing", "speculation", "resources", "accurate"]'
WHERE id = 'term_capacity_planning_v52';

-- 3. Loop in
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "bothering someone else" that makes interrupting people sound like a collaborative strategy, usually used when you want to share the blame for your terrible decisions.',
  examples = 'Examples:\n- "Let''s loop in the legal team." (let''s bother the legal team with our problems)\n- "We need to loop in more people." (we need to bother more people with our mess)\n- "Looping in will help." (bothering people will somehow make things better)',
  tags = '["euphemism", "bothering", "interrupting", "collaborative", "blame"]'
WHERE id = 'term_loop-in';

-- 4. Key takeaways
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "things we learned" that makes basic comprehension sound like sophisticated analysis, usually followed by forgetting everything within 24 hours.',
  examples = 'Examples:\n- "Here are our key takeaways." (here are things we''ll forget by tomorrow)\n- "The key takeaways are important." (the things we''ll ignore are important)\n- "We need to act on these takeaways." (we need to pretend we''ll act on these takeaways)',
  tags = '["euphemism", "learned", "comprehension", "analysis", "forget"]'
WHERE id = 'term_key-takeaways';

-- 5. Framework
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "way of thinking" that makes basic organization sound like a sophisticated methodology, usually created by consultants who charge $500/hour to tell you things you already know.',
  examples = 'Examples:\n- "Let''s use this framework." (let''s use this expensive way of thinking)\n- "The framework will guide us." (the expensive way of thinking will guide us)\n- "We need a new framework." (we need to pay consultants more money)',
  tags = '["euphemism", "thinking", "organization", "methodology", "consultants"]'
WHERE id = 'term_framework';

-- 6. Timebox
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "setting a deadline" that makes basic time management sound like an agile methodology, usually used when meetings are running too long and people want to leave.',
  examples = 'Examples:\n- "Let''s timebox this discussion." (let''s set a deadline so we can stop talking)\n- "Timeboxing will keep us focused." (deadlines will force us to pretend to care)\n- "We need to timebox everything." (we need deadlines for everything because we''re terrible at time management)',
  tags = '["euphemism", "deadline", "time-management", "agile", "focused"]'
WHERE id = 'term_timebox';

-- 7. Fire drill
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "crisis we created" that makes poor planning sound like an emergency, usually caused by someone who forgot to do their job and now needs everyone else to fix it.',
  examples = 'Examples:\n- "Sorry for the fire drill." (sorry for the crisis I created)\n- "We have a fire drill." (we have a crisis because someone screwed up)\n- "Fire drills are common here." (crises are common because we''re terrible at planning)',
  tags = '["euphemism", "crisis", "planning", "emergency", "screwed-up"]'
WHERE id = 'term_fire-drill';

-- 8. Get the ball rolling
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "start doing something" that makes basic action sound like a strategic initiative, usually used when people have been talking about doing something for months without actually doing it.',
  examples = 'Examples:\n- "Let''s get the ball rolling." (let''s finally start doing something)\n- "We need to get the ball rolling." (we need to stop talking and start doing)\n- "The ball is rolling." (we''re finally doing something instead of just talking about it)',
  tags = '["euphemism", "start", "action", "strategic", "talking"]'
WHERE id = 'term_get-the-ball-rolling';

-- 9. Baked In
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "already included" that makes basic accounting sound like sophisticated financial planning, usually used when someone wants to avoid taking responsibility for budget decisions.',
  examples = 'Examples:\n- "The costs are baked in." (the costs are already included because we forgot to budget for them)\n- "We have savings baked in." (we have savings that may or may not actually exist)\n- "Everything is baked in." (everything is included because we have no idea what we''re doing)',
  tags = '["euphemism", "included", "accounting", "financial", "budget"]'
WHERE id = 'term_baked_in_v2_1758806025003';

-- 10. Flight risk
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "employee who wants to quit" that makes poor management sound like a risk assessment, usually used when managers realize they''ve been treating people terribly.',
  examples = 'Examples:\n- "Sarah is a flight risk." (Sarah wants to quit because we''ve been terrible to her)\n- "We need to address flight risks." (we need to stop being terrible to people)\n- "Flight risks are increasing." (more people want to quit because we''re getting worse)',
  tags = '["euphemism", "quit", "management", "risk-assessment", "terrible"]'
WHERE id = 'term_flight-risk';
