-- Improve terms content - Batch 1
-- This script improves definitions, examples, and tags for terms that need enhancement

-- 1. Bells and whistles
UPDATE terms_v2 SET 
  definition = 'Unnecessary features that make a product look impressive but serve no real purpose, like a sports car with a built-in espresso machine.',
  examples = 'Examples:\n- "Our new software has all the bells and whistles you need!" (translation: it''s bloated and slow)\n- "We''re adding some bells and whistles to make it more appealing." (translation: we''re overcomplicating it)\n- "The basic version works fine, but the premium has bells and whistles." (translation: pay more for stuff you don''t need)',
  tags = '["features", "unnecessary", "bloat", "marketing", "premium"]'
WHERE id = 'term_bells-and-whistles_727';

-- 2. Best of breed
UPDATE terms_v2 SET 
  definition = 'A pretentious way to say "the best" that somehow makes you sound less confident. If you''re truly the best, just say it without the unnecessary canine metaphor.',
  examples = 'Examples:\n- "We''re the best of breed in our industry." (just say "we''re the best")\n- "Our best-of-breed solution will revolutionize your workflow." (our solution is good)\n- "We pride ourselves on being best of breed." (we think we''re good)',
  tags = '["pretentious", "redundant", "confidence", "metaphor", "industry"]'
WHERE id = 'term_best-of-breed_728';

-- 3. Best regards
UPDATE terms_v2 SET 
  definition = 'The corporate email equivalent of "thoughts and prayers" - a polite way to end a message that means absolutely nothing and is used by everyone.',
  examples = 'Examples:\n- "I''ll get back to you soon. Best regards, John" (I''ll forget about this)\n- "Thanks for your time. Best regards, Sarah" (I''m being polite but don''t care)\n- "Looking forward to our meeting. Best regards, Mike" (I''m not looking forward to it)',
  tags = '["email", "polite", "meaningless", "corporate", "signature"]'
WHERE id = 'term_best-regards_729';

-- 4. Big bang for the buck
UPDATE terms_v2 SET 
  definition = 'A sleazy salesperson''s way of promising maximum value with minimum investment, usually while hiding the fact that you''re getting exactly what you pay for.',
  examples = 'Examples:\n- "This software gives you big bang for the buck!" (it''s cheap and cheaply made)\n- "We deliver big bang for the buck on every project." (we cut corners)\n- "You''ll get maximum big bang for your buck with us." (we''re not expensive)',
  tags = '["sales", "value", "cheap", "promise", "sleazy"]'
WHERE id = 'term_big-bang-for-the-buck_730';

-- 5. Brain surgery
UPDATE terms_v2 SET 
  definition = 'A phrase used to dismiss complex tasks as simple, usually by people who have never performed brain surgery and underestimate both the task and actual brain surgery.',
  examples = 'Examples:\n- "This isn''t brain surgery, just follow the instructions." (it''s actually quite complex)\n- "Come on, it''s not brain surgery!" (it might be harder than you think)\n- "We need someone who can handle this - it''s not brain surgery." (it''s actually quite difficult)',
  tags = '["dismissive", "complexity", "underestimate", "difficulty", "metaphor"]'
WHERE id = 'term_brain-surgery_731';

-- 6. Brick and mortar
UPDATE terms_v2 SET 
  definition = 'Physical business locations that exist in the real world, as opposed to the digital realm where most corporate buzzwords are born and thrive.',
  examples = 'Examples:\n- "Our brick and mortar stores are struggling." (our physical locations are failing)\n- "We''re expanding our brick and mortar presence." (we''re opening more physical stores)\n- "The brick and mortar model is outdated." (physical stores are old-fashioned)',
  tags = '["physical", "retail", "traditional", "location", "real-world"]'
WHERE id = 'term_brick-and-mortar_732';

-- 7. Champion (as a verb)
UPDATE terms_v2 SET 
  definition = 'To aggressively support or promote something, usually while pretending you''re not just doing your job. A corporate way to make "support" sound more heroic.',
  examples = 'Examples:\n- "I''ll champion this initiative!" (I''ll support it, I guess)\n- "We need someone to champion this project." (we need someone to actually work on it)\n- "She''s been championing our cause." (she''s been talking about it a lot)',
  tags = '["verb", "support", "heroic", "corporate", "promotion"]'
WHERE id = 'term_champion-as-a-verb_733';

-- 8. Check the box
UPDATE terms_v2 SET 
  definition = 'To complete a task with minimal effort, usually just to satisfy a requirement rather than actually accomplish anything meaningful.',
  examples = 'Examples:\n- "We just need to check the box on this compliance requirement." (we''ll do the bare minimum)\n- "I''ll check the box and move on." (I''ll do it quickly and forget about it)\n- "This is just a check-the-box exercise." (this is pointless but required)',
  tags = '["minimal", "compliance", "requirement", "pointless", "effort"]'
WHERE id = 'term_check-the-box_735';

-- 9. Circular file
UPDATE terms_v2 SET 
  definition = 'A euphemistic way to refer to the trash can, used by people who think "wastebasket" is too direct or who enjoy unnecessary corporate speak.',
  examples = 'Examples:\n- "I''ll put this in the circular file." (I''m throwing it away)\n- "That proposal went straight to the circular file." (it was rejected and discarded)\n- "We''re implementing a new circular file system." (we''re getting new trash cans)',
  tags = '["euphemism", "waste", "rejection", "indirect", "corporate"]'
WHERE id = 'term_circular-file_736';

-- 10. Compelling
UPDATE terms_v2 SET 
  definition = 'A word that has been so overused in corporate presentations that it now means "I can''t think of a better adjective" and should be banned from all business communications.',
  examples = 'Examples:\n- "This is a compelling opportunity." (this is an opportunity)\n- "We have a compelling value proposition." (we have a value proposition)\n- "The data tells a compelling story." (the data tells a story)',
  tags = '["overused", "generic", "banned", "presentation", "meaningless"]'
WHERE id = 'term_compelling_737';

-- 11. Competitive advantage
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "we''re better than our competitors" without actually providing evidence or specifics about how or why you''re better.',
  examples = 'Examples:\n- "Our competitive advantage is our people." (we have employees)\n- "We maintain our competitive advantage through innovation." (we try to be creative)\n- "Our competitive advantage is our customer service." (we answer phones)',
  tags = '["vague", "competition", "advantage", "generic", "unspecific"]'
WHERE id = 'term_competitive-advantage_738';

-- 12. Content is king
UPDATE terms_v2 SET 
  definition = 'A massively overused metaphor that suggests content is the most important thing, usually said by people who produce terrible content and need to justify their existence.',
  examples = 'Examples:\n- "Content is king, so we need more content." (we need to fill space)\n- "In our industry, content is king." (we don''t know what else to do)\n- "Remember, content is king." (please ignore our terrible content)',
  tags = '["overused", "metaphor", "content", "justification", "terrible"]'
WHERE id = 'term_content-is-king_739';

-- 13. Contrarian
UPDATE terms_v2 SET 
  definition = 'Someone who disagrees with popular opinion, usually for the sake of being different rather than having a valid reason. Often used to justify bad ideas.',
  examples = 'Examples:\n- "I''m a contrarian, so I think we should do the opposite." (I like to disagree)\n- "As a contrarian, I believe this will fail." (I''m pessimistic)\n- "We need a contrarian perspective on this." (we need someone to disagree)',
  tags = '["disagree", "different", "pessimistic", "justification", "opposition"]'
WHERE id = 'term_contrarian_740';

-- 14. Core competencies
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "the things we''re good at" that makes basic skills sound like a strategic advantage. Usually used when you can''t think of anything else to say.',
  examples = 'Examples:\n- "Our core competencies include customer service." (we''re good at helping customers)\n- "We''re focusing on our core competencies." (we''re doing what we know)\n- "Our core competencies set us apart." (we''re good at some things)',
  tags = '["skills", "strategic", "basic", "advantage", "corporate"]'
WHERE id = 'term_core-competencies_741';

-- 15. Corporate culture
UPDATE terms_v2 SET 
  definition = 'The shared values, beliefs, and behaviors of a company, usually described in ways that sound inspiring but are completely disconnected from reality.',
  examples = 'Examples:\n- "Our corporate culture values innovation." (we say we like new ideas)\n- "We have a strong corporate culture." (we have some rules)\n- "Corporate culture is our competitive advantage." (we have employees who work here)',
  tags = '["values", "beliefs", "disconnected", "reality", "inspirational"]'
WHERE id = 'term_corporate-culture_742';

-- 16. Cross-training
UPDATE terms_v2 SET 
  definition = 'Teaching employees to do multiple jobs, usually so you can pay them less and work them harder while calling it "professional development."',
  examples = 'Examples:\n- "We''re implementing cross-training to increase flexibility." (we want fewer employees)\n- "Cross-training helps employees grow." (we want them to do more work)\n- "Our cross-training program is comprehensive." (we make everyone do everything)',
  tags = '["training", "multiple", "flexibility", "cost-cutting", "development"]'
WHERE id = 'term_cross-training_743';

-- 17. Dialog (as a verb)
UPDATE terms_v2 SET 
  definition = 'A pretentious way to say "talk" that makes simple conversation sound like a formal business process. Just say "talk" - it''s shorter and clearer.',
  examples = 'Examples:\n- "We need to dialog about this issue." (we need to talk about this)\n- "Let''s dialog with the stakeholders." (let''s talk to them)\n- "I''ll dialog with the team." (I''ll talk to them)',
  tags = '["pretentious", "talk", "formal", "unnecessary", "corporate"]'
WHERE id = 'term_dialog-as-a-verb_745';

-- 18. Disambiguate
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "clarify" that makes you sound smarter but doesn''t actually make you smarter. Just say "clarify" - everyone will understand.',
  examples = 'Examples:\n- "We need to disambiguate the requirements." (we need to clarify them)\n- "Let me disambiguate this for you." (let me explain this)\n- "The document needs disambiguation." (the document needs clarification)',
  tags = '["fancy", "clarify", "pretentious", "unnecessary", "smarter"]'
WHERE id = 'term_disambiguate_746';
