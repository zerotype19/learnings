-- Enhance Snarkiness - Batch 2
-- This script makes definitions more snarky, pretentious, and less corporate

-- 1. Action item
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "thing we''ll never actually do" that makes procrastination sound like a sophisticated project management technique, usually followed by creating 47 more action items.',
  examples = 'Examples:\n- "Let''s add this as an action item." (let''s add this to the list of things we''ll ignore)\n- "We have 47 action items from this meeting." (we have 47 things we''ll never accomplish)\n- "Action items are our top priority." (action items are things we pretend to care about)',
  tags = '["euphemism", "procrastination", "sophisticated", "ignore", "accomplish"]'
WHERE id = 'term_action_item_v133';

-- 2. Gain traction
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "finally working" that makes basic functionality sound like a revolutionary breakthrough, usually used when something stops being completely broken.',
  examples = 'Examples:\n- "Our initiative is gaining traction." (our initiative finally works sometimes)\n- "We need to gain traction on this project." (we need to stop failing so hard)\n- "Traction is our key metric." (not being terrible is our key metric)',
  tags = '["euphemism", "working", "revolutionary", "broken", "terrible"]'
WHERE id = 'term_gain-traction';

-- 3. Cadence
UPDATE terms_v2 SET 
  definition = 'A pretentious way of saying "schedule" that makes basic time management sound like a sophisticated business process, usually used to justify why meetings happen at random intervals.',
  examples = 'Examples:\n- "We need to establish a cadence." (we need to pick a day for meetings)\n- "Our cadence is bi-weekly." (our meetings happen whenever we remember)\n- "The cadence is working well." (the meetings are still pointless but at least they''re regular)',
  tags = '["pretentious", "schedule", "sophisticated", "meetings", "pointless"]'
WHERE id = 'term_cadence';

-- 4. Triangulate
UPDATE terms_v2 SET 
  definition = 'A corporate way of saying "guess based on multiple wrong sources" that makes wild speculation sound like scientific analysis, usually used when you have no actual data.',
  examples = 'Examples:\n- "Let''s triangulate this data." (let''s make up numbers based on other made-up numbers)\n- "We need to triangulate our findings." (we need to confirm our guesses with more guesses)\n- "Triangulation will give us clarity." (making up more stuff will somehow make things clearer)',
  tags = '["guess", "speculation", "scientific", "data", "clarity"]'
WHERE id = 'term_triangulate';

-- 5. Gantt chart
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "wishful thinking" that makes unrealistic timelines sound like sophisticated project management, usually created by people who have never actually completed a project on time.',
  examples = 'Examples:\n- "The Gantt chart shows we''re on track." (the Gantt chart shows we''re delusional)\n- "We need to update the Gantt chart." (we need to move all the dates back again)\n- "The Gantt chart is our roadmap." (the Gantt chart is our fantasy)',
  tags = '["euphemism", "wishful", "unrealistic", "delusional", "fantasy"]'
WHERE id = 'term_gantt-chart';

-- 6. Herding cats
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "trying to manage people who don''t want to be managed" that makes organizational dysfunction sound like a cute metaphor, usually used by managers who can''t actually lead.',
  examples = 'Examples:\n- "Managing this team is like herding cats." (managing this team is impossible because I''m terrible at it)\n- "We''re herding cats on this project." (we''re failing because nobody knows what they''re doing)\n- "Herding cats is our specialty." (failing at management is our specialty)',
  tags = '["euphemism", "managed", "dysfunction", "impossible", "failing"]'
WHERE id = 'term_herding_cats_v15';

-- 7. Hypothesis
UPDATE terms_v2 SET 
  definition = 'A corporate way of saying "wild guess" that makes baseless speculation sound like scientific methodology, usually used when you have no idea what you''re talking about.',
  examples = 'Examples:\n- "Our hypothesis is that customers will love this." (our wild guess is that customers won''t hate this)\n- "We need to test this hypothesis." (we need to see if our random guess is right)\n- "The hypothesis proved correct." (our random guess happened to be right this time)',
  tags = '["wild-guess", "speculation", "scientific", "baseless", "random"]'
WHERE id = 'term_hypothesis';

-- 8. Benchmark
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "comparing ourselves to people who are actually good" that makes mediocrity sound like competitive analysis, usually used to justify why we''re not as terrible as we could be.',
  examples = 'Examples:\n- "Let''s benchmark against industry leaders." (let''s see how much better everyone else is)\n- "Our benchmarks show we''re competitive." (our benchmarks show we''re not the worst)\n- "Benchmarking will improve our performance." (benchmarking will remind us how bad we are)',
  tags = '["euphemism", "comparing", "mediocrity", "competitive", "worst"]'
WHERE id = 'term_benchmark';

-- 9. Blue Sky Thinking
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "wasting time on impossible ideas" that makes pointless brainstorming sound like innovative strategy, usually followed by doing nothing because the ideas are completely unrealistic.',
  examples = 'Examples:\n- "Let''s do some blue sky thinking." (let''s waste time on ideas we''ll never implement)\n- "Blue sky thinking will inspire us." (blue sky thinking will remind us how limited we are)\n- "We need more blue sky thinking." (we need more ways to avoid doing actual work)',
  tags = '["euphemism", "wasting", "pointless", "unrealistic", "limited"]'
WHERE id = 'term_blue_sky_thinking_v2_1758806025007';

-- 10. Stand-up
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "daily status meeting" that makes boring updates sound like an agile methodology, usually involving people standing around awkwardly while nothing gets accomplished.',
  examples = 'Examples:\n- "Our daily stand-up is at 9 AM." (our daily waste of time is at 9 AM)\n- "Stand-ups keep us aligned." (stand-ups remind us how little we''ve done)\n- "The stand-up was productive." (the stand-up was slightly less pointless than usual)',
  tags = '["euphemism", "status", "boring", "awkward", "pointless"]'
WHERE id = 'term_stand-up';

-- 11. Swim lane
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "not my problem" that makes avoiding responsibility sound like organizational structure, usually used when someone wants to pass the buck to another department.',
  examples = 'Examples:\n- "That''s not in my swim lane." (that''s not my problem, talk to someone else)\n- "We need to stay in our swim lanes." (we need to avoid helping each other)\n- "Swim lanes prevent confusion." (swim lanes prevent collaboration)',
  tags = '["euphemism", "problem", "responsibility", "structure", "collaboration"]'
WHERE id = 'term_swim_lane_v136';
