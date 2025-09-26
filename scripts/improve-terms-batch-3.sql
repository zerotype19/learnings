-- Improve terms content - Batch 3
-- This script improves definitions, examples, and tags for terms that need enhancement

-- 1. Solutions
UPDATE terms_v2 SET 
  definition = 'The most overused and meaningless word in corporate vocabulary, used to describe everything from products to services to problems, making it completely devoid of any actual meaning.',
  examples = 'Examples:\n- "We provide comprehensive solutions." (we do stuff)\n- "Our solution will solve your problem." (our thing might help)\n- "We''re a solutions company." (we''re a company that does things)',
  tags = '["overused", "meaningless", "corporate", "vocabulary", "everything"]'
WHERE id = 'term_solutions_808';

-- 2. Soup to nuts
UPDATE terms_v2 SET 
  definition = 'A folksy way to say "comprehensive" that makes you sound like a country bumpkin trying to sound sophisticated, usually used by people who have never actually made soup or cracked nuts.',
  examples = 'Examples:\n- "We handle everything soup to nuts." (we do everything)\n- "Our service is soup to nuts." (our service is complete)\n- "We''ll take care of you soup to nuts." (we''ll handle everything)',
  tags = '["folksy", "comprehensive", "country", "sophisticated", "complete"]'
WHERE id = 'term_soup-to-nuts_809';

-- 3. State of the art
UPDATE terms_v2 SET 
  definition = 'A phrase that used to mean cutting-edge technology but now just means "we bought some computers" and is used to describe everything from software to office furniture.',
  examples = 'Examples:\n- "Our state-of-the-art system will revolutionize your workflow." (our new system might help)\n- "We use state-of-the-art technology." (we use computers)\n- "This is state-of-the-art equipment." (this is new equipment)',
  tags = '["cutting-edge", "technology", "computers", "equipment", "new"]'
WHERE id = 'term_state-of-the-art_810';

-- 4. Strategic plan
UPDATE terms_v2 SET 
  definition = 'A document that outlines what a company plans to do, usually written by consultants who charge $500 an hour to create something that gets filed away and never looked at again.',
  examples = 'Examples:\n- "Our strategic plan calls for growth." (we want to get bigger)\n- "The strategic plan is comprehensive." (the plan covers things)\n- "We need to follow our strategic plan." (we need to do what we planned)',
  tags = '["document", "consultants", "expensive", "filed-away", "unused"]'
WHERE id = 'term_strategic-plan_811';

-- 5. Strike while the iron is hot
UPDATE terms_v2 SET 
  definition = 'A blacksmithing metaphor used in business to mean "act quickly while conditions are good," usually said by people who have never worked with hot metal and don''t understand the actual skill involved.',
  examples = 'Examples:\n- "We need to strike while the iron is hot." (we need to act quickly)\n- "The market is good, so let''s strike while the iron is hot." (the market is good, so let''s act)\n- "Strike while the iron is hot, as they say." (act while conditions are good)',
  tags = '["blacksmithing", "metaphor", "quickly", "conditions", "business"]'
WHERE id = 'term_strike-while-the-iron-is-hot_812';

-- 6. Take strides
UPDATE terms_v2 SET 
  definition = 'A way to say "we''re improving" that implies you started from a terrible position and are now just barely adequate, like congratulating someone for learning to walk.',
  examples = 'Examples:\n- "We''re taking strides in customer service." (our customer service is getting better)\n- "The company is taking strides toward profitability." (the company is losing less money)\n- "We''ve taken great strides this quarter." (we did better than before)',
  tags = '["improving", "terrible", "adequate", "walking", "better"]'
WHERE id = 'term_take-strides_813';

-- 7. Take to the next level
UPDATE terms_v2 SET 
  definition = 'A way to say "we''re improving" that implies you were already good and are now getting even better, like congratulating someone for learning to run after they already knew how to walk.',
  examples = 'Examples:\n- "We''re taking this to the next level." (we''re making it better)\n- "Our team is taking performance to the next level." (our team is doing better)\n- "This will take us to the next level." (this will make us better)',
  tags = '["improving", "good", "better", "running", "performance"]'
WHERE id = 'term_take-to-the-next-level_814';

-- 8. Task (as a verb)
UPDATE terms_v2 SET 
  definition = 'A grammatically incorrect way to use "task" as a verb when you could just say "assign" or "give" like a normal person who speaks English properly.',
  examples = 'Examples:\n- "I''ll task you with this project." (I''ll assign you this project)\n- "We need to task someone with this." (we need to assign someone to this)\n- "She was tasked with the report." (she was assigned the report)',
  tags = '["grammar", "incorrect", "assign", "give", "verb"]'
WHERE id = 'term_task-as-a-verb_815';

-- 9. Thought leader
UPDATE terms_v2 SET 
  definition = 'A self-proclaimed expert who thinks they have original ideas but usually just repackages other people''s thoughts and presents them as groundbreaking insights.',
  examples = 'Examples:\n- "He''s a thought leader in the industry." (he talks a lot about the industry)\n- "Our CEO is a thought leader." (our CEO gives speeches)\n- "We need more thought leaders." (we need more people who talk)',
  tags = '["self-proclaimed", "expert", "repackaged", "insights", "speeches"]'
WHERE id = 'term_thought-leader_816';

-- 10. Value-added
UPDATE terms_v2 SET 
  definition = 'A phrase that suggests your product or service has extra value, usually used when the "value" is something that should be included anyway, like customer service or basic functionality.',
  examples = 'Examples:\n- "Our value-added services include support." (we help customers)\n- "This is a value-added feature." (this is a feature)\n- "We provide value-added solutions." (we do things that help)',
  tags = '["extra", "value", "included", "service", "functionality"]'
WHERE id = 'term_value-added_817';

-- 11. Valued partner
UPDATE terms_v2 SET 
  definition = 'A corporate euphemism for "we need you but don''t want to pay you what you''re worth," usually followed by "but" and a list of reasons why you''re not actually valued.',
  examples = 'Examples:\n- "You''re a valued partner, but we need to cut costs." (we like you but won''t pay)\n- "As a valued partner, we''d like to discuss terms." (we want to pay less)\n- "Our valued partners are important to us." (we need you but won''t treat you well)',
  tags = '["euphemism", "needed", "underpaid", "but", "valued"]'
WHERE id = 'term_valued-partner_818';

-- 12. Viral
UPDATE terms_v2 SET 
  definition = 'A word used to describe content that spreads quickly, usually by people who have never created anything that actually went viral and are just hoping their mediocre content will somehow catch on.',
  examples = 'Examples:\n- "This video went viral." (this video got a lot of views)\n- "We need to create viral content." (we need to create popular content)\n- "Our campaign went viral." (our campaign got attention)',
  tags = '["content", "spreads", "hoping", "mediocre", "popular"]'
WHERE id = 'term_viral_819';

-- 13. White Paper
UPDATE terms_v2 SET 
  definition = 'A pretentious way to describe a long, boring document that nobody reads, usually written to make simple information sound complex and important.',
  examples = 'Examples:\n- "We published a white paper on the topic." (we wrote a long document)\n- "Our white paper explains the process." (our document describes things)\n- "The white paper is comprehensive." (the document is long)',
  tags = '["pretentious", "boring", "unread", "complex", "important"]'
WHERE id = 'term_white-paper_820';

-- 14. With all due respect
UPDATE terms_v2 SET 
  definition = 'A polite way to say "you''re wrong and I''m about to tell you why" that makes insults sound respectful and professional.',
  examples = 'Examples:\n- "With all due respect, that won''t work." (that won''t work)\n- "With all due respect, I disagree." (I disagree)\n- "With all due respect, that''s not accurate." (that''s wrong)',
  tags = '["polite", "wrong", "insult", "respectful", "professional"]'
WHERE id = 'term_with-all-due-respect_822';

-- 15. World class
UPDATE terms_v2 SET 
  definition = 'A bold claim that suggests your product or service is among the best in the world, usually made by companies that are barely competitive in their local market.',
  examples = 'Examples:\n- "We provide world-class service." (we provide good service)\n- "Our product is world-class." (our product is good)\n- "We''re a world-class company." (we''re a good company)',
  tags = '["bold", "claim", "best", "barely", "competitive"]'
WHERE id = 'term_world-class_823';

-- 16. Wordsmith (as a verb)
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "edit" that makes the simple act of fixing typos sound like a creative art form requiring special skills and expensive consultants.',
  examples = 'Examples:\n- "We need to wordsmith this copy." (we need to edit this text)\n- "Let''s wordsmith the proposal." (let''s edit the proposal)\n- "She''s wordsmithing the document." (she''s editing the document)',
  tags = '["fancy", "edit", "typos", "creative", "consultants"]'
WHERE id = 'term_wordsmith-as-a-verb_824';

-- 17. Act your wage (already has good content, just needs tags)
UPDATE terms_v2 SET 
  tags = '["passive-aggressive", "corporate", "philosophy", "salary", "minimal-effort"]'
WHERE id = 'term_act-your-wage_826';

-- 18. Effective accelerationism (already has good content, just needs tags)
UPDATE terms_v2 SET 
  tags = '["tech", "philosophy", "rapid", "advancement", "reckless"]'
WHERE id = 'term_effective-accelerationism_827';

-- 19. Deliverables (already has good content, just needs tags)
UPDATE terms_v2 SET 
  tags = '["corporate", "jargon", "promised", "tasks", "important"]'
WHERE id = 'term_deliverables_828';

-- 20. Idea harvesting (already has good content, just needs tags)
UPDATE terms_v2 SET 
  tags = '["corporate", "collecting", "ignoring", "innovation", "suggestions"]'
WHERE id = 'term_idea-harvesting_829';
