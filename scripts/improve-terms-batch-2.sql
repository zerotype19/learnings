-- Improve terms content - Batch 2
-- This script improves definitions, examples, and tags for terms that need enhancement

-- 1. Guru
UPDATE terms_v2 SET 
  definition = 'A self-proclaimed expert who knows slightly more than you do about a topic, usually self-appointed and always overconfident in their abilities.',
  examples = 'Examples:\n- "I''m a social media guru." (I know how to post on Facebook)\n- "Our marketing guru will handle this." (our marketing person who thinks they''re smart)\n- "He''s a productivity guru." (he read a book about getting things done)',
  tags = '["self-proclaimed", "expert", "overconfident", "knowledge", "pretentious"]'
WHERE id = 'term_guru_764';

-- 2. Holistic
UPDATE terms_v2 SET 
  definition = 'A word used to make basic, common-sense approaches sound sophisticated and comprehensive, usually when you can''t think of anything more specific to say.',
  examples = 'Examples:\n- "We take a holistic approach to customer service." (we try to help customers)\n- "Our holistic strategy covers all aspects." (our strategy covers things)\n- "We need a holistic solution." (we need a solution that works)',
  tags = '["comprehensive", "sophisticated", "vague", "approach", "strategy"]'
WHERE id = 'term_holistic_765';

-- 3. Human capital
UPDATE terms_v2 SET 
  definition = 'A dehumanizing way to refer to employees that reduces people to economic assets, making it easier to treat them like commodities rather than human beings.',
  examples = 'Examples:\n- "We''re investing in our human capital." (we''re training our employees)\n- "Our human capital is our greatest asset." (our employees are important)\n- "We need to optimize our human capital." (we need to make our employees more efficient)',
  tags = '["dehumanizing", "employees", "assets", "commodities", "economic"]'
WHERE id = 'term_human-capital_766';

-- 4. Ideation
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "thinking" that makes the simple act of having ideas sound like a formal business process requiring special skills and expensive consultants.',
  examples = 'Examples:\n- "We''re in the ideation phase." (we''re thinking about ideas)\n- "Our ideation session was productive." (our brainstorming meeting went well)\n- "We need more ideation around this problem." (we need to think more about this)',
  tags = '["thinking", "fancy", "formal", "process", "consultants"]'
WHERE id = 'term_ideation_767';

-- 5. Impact (as a verb)
UPDATE terms_v2 SET 
  definition = 'A grammatically incorrect way to use "impact" as a verb when you could just say "affect" or "influence" like a normal person who speaks English properly.',
  examples = 'Examples:\n- "This will impact our bottom line." (this will affect our profits)\n- "We need to impact customer satisfaction." (we need to improve customer satisfaction)\n- "The changes will impact everyone." (the changes will affect everyone)',
  tags = '["grammar", "incorrect", "verb", "affect", "influence"]'
WHERE id = 'term_impact-as-a-verb_768';

-- 6. In light of the fact that
UPDATE terms_v2 SET 
  definition = 'A wordy, pretentious way to say "because" that makes simple explanations sound more complex and important than they actually are.',
  examples = 'Examples:\n- "In light of the fact that sales are down, we need to act." (because sales are down, we need to act)\n- "In light of the fact that the market changed, we''re pivoting." (because the market changed, we''re pivoting)\n- "In light of the fact that costs are rising, we''re cutting back." (because costs are rising, we''re cutting back)',
  tags = '["wordy", "pretentious", "because", "complex", "unnecessary"]'
WHERE id = 'term_in-light-of-the-fact-that_769';

-- 7. Innovative
UPDATE terms_v2 SET 
  definition = 'A meaningless adjective that has been so overused in marketing that it now means absolutely nothing and should be banned from all product descriptions.',
  examples = 'Examples:\n- "Our innovative solution will revolutionize the industry." (our solution is new-ish)\n- "We''re an innovative company." (we try to be creative sometimes)\n- "This innovative approach will change everything." (this approach might work)',
  tags = '["meaningless", "overused", "marketing", "banned", "adjective"]'
WHERE id = 'term_innovative_770';

-- 8. Killer app
UPDATE terms_v2 SET 
  definition = 'An application that is supposedly so amazing it will "kill" the competition, usually said about apps that are mediocre at best and forgotten within months.',
  examples = 'Examples:\n- "This is the killer app we''ve been waiting for." (this app is pretty good)\n- "Our killer app will dominate the market." (our app might do okay)\n- "We need to find the next killer app." (we need to find something that works)',
  tags = '["application", "competition", "mediocre", "forgotten", "overstatement"]'
WHERE id = 'term_killer-app_771';

-- 9. Knowledge transfer
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "teaching" that makes the simple act of sharing information sound like a complex business process requiring special training and documentation.',
  examples = 'Examples:\n- "We need to complete the knowledge transfer." (we need to teach them)\n- "The knowledge transfer session was successful." (the training went well)\n- "We''re implementing a knowledge transfer program." (we''re starting a training program)',
  tags = '["teaching", "fancy", "complex", "training", "documentation"]'
WHERE id = 'term_knowledge-transfer_772';

-- 10. Laser focus
UPDATE terms_v2 SET 
  definition = 'A dramatic way to say "focus" that suggests regular focus isn''t enough and you need some kind of high-tech, precision targeting system to pay attention to something.',
  examples = 'Examples:\n- "We need laser focus on this project." (we need to focus on this project)\n- "Our laser focus will ensure success." (our focus will help us succeed)\n- "Let''s maintain laser focus on the goal." (let''s keep focusing on the goal)',
  tags = '["dramatic", "focus", "precision", "high-tech", "attention"]'
WHERE id = 'term_laser-focus_773';

-- 11. Leaders
UPDATE terms_v2 SET 
  definition = 'A word that has been so overused in corporate settings that everyone is now a "leader" of something, making the term completely meaningless and devoid of actual leadership.',
  examples = 'Examples:\n- "We''re all leaders in our own way." (we all have jobs)\n- "Our team is full of leaders." (our team has employees)\n- "We need more leaders in this organization." (we need more people who can manage things)',
  tags = '["overused", "meaningless", "leadership", "corporate", "everyone"]'
WHERE id = 'term_leaders_774';

-- 12. Level playing field
UPDATE terms_v2 SET 
  definition = 'A sports metaphor used in business to describe fair competition, usually said by people who have never played sports and don''t understand that playing fields are never actually level.',
  examples = 'Examples:\n- "We need a level playing field for all vendors." (we need fair competition)\n- "The market should be a level playing field." (the market should be fair)\n- "This creates a level playing field for everyone." (this makes things fair)',
  tags = '["sports", "metaphor", "fair", "competition", "business"]'
WHERE id = 'term_level-playing-field_776';

-- 13. Leverage (as a verb)
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "use" that makes simple actions sound more strategic and important, usually used when you''re not actually leveraging anything significant.',
  examples = 'Examples:\n- "We''ll leverage our relationships." (we''ll use our connections)\n- "Let''s leverage this opportunity." (let''s take advantage of this)\n- "We need to leverage our resources." (we need to use what we have)',
  tags = '["fancy", "use", "strategic", "important", "resources"]'
WHERE id = 'term_leverage-as-a-verb_777';

-- 14. Luddite
UPDATE terms_v2 SET 
  definition = 'A derogatory term for someone who doesn''t immediately embrace every new technology, usually used by tech enthusiasts who can''t understand why everyone doesn''t want to live in a digital dystopia.',
  examples = 'Examples:\n- "Don''t be a Luddite, embrace the new system." (don''t resist change)\n- "He''s such a Luddite about social media." (he doesn''t use social media)\n- "We can''t let Luddites hold us back." (we can''t let people who don''t like technology slow us down)',
  tags = '["derogatory", "technology", "resistance", "change", "digital"]'
WHERE id = 'term_luddite_778';

-- 15. Magic bullet
UPDATE terms_v2 SET 
  definition = 'A mythical solution that will solve all problems instantly, usually promised by consultants and salespeople who know such things don''t exist but hope you don''t.',
  examples = 'Examples:\n- "This software is the magic bullet for productivity." (this software might help)\n- "We need to find the magic bullet for growth." (we need to find what works)\n- "There''s no magic bullet for this problem." (this problem is complex)',
  tags = '["mythical", "solution", "instant", "consultants", "salespeople"]'
WHERE id = 'term_magic-bullet_779';

-- 16. Make hay while the sun shines
UPDATE terms_v2 SET 
  definition = 'A farming metaphor used in business to mean "take advantage of good conditions," usually said by people who have never farmed and don''t understand that hay-making is more complex than this phrase suggests.',
  examples = 'Examples:\n- "We need to make hay while the sun shines." (we need to take advantage of this opportunity)\n- "The market is good, so let''s make hay." (the market is good, so let''s act)\n- "Make hay while the sun shines, as they say." (take advantage of good conditions)',
  tags = '["farming", "metaphor", "opportunity", "conditions", "business"]'
WHERE id = 'term_make-hay-while-the-sun-shines_780';

-- 17. Maximize
UPDATE terms_v2 SET 
  definition = 'A word that suggests you can get the absolute most out of something, usually used when you can''t actually maximize anything and just want to sound like you''re being strategic.',
  examples = 'Examples:\n- "We need to maximize our ROI." (we need to improve our returns)\n- "Let''s maximize our efficiency." (let''s be more efficient)\n- "We''re maximizing our potential." (we''re trying to do better)',
  tags = '["absolute", "strategic", "improve", "efficiency", "potential"]'
WHERE id = 'term_maximize_781';

-- 18. Methodology
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "method" that makes simple processes sound like complex, scientific procedures requiring special expertise and expensive consultants.',
  examples = 'Examples:\n- "Our methodology is proven." (our method works)\n- "We follow a rigorous methodology." (we have a process)\n- "The methodology needs to be documented." (the process needs to be written down)',
  tags = '["fancy", "method", "complex", "scientific", "consultants"]'
WHERE id = 'term_methodology_782';

-- 19. Most unique
UPDATE terms_v2 SET 
  definition = 'A grammatically incorrect phrase that shows the speaker doesn''t understand that "unique" means "one of a kind" and cannot be modified by "most" or any other degree.',
  examples = 'Examples:\n- "This is the most unique solution." (this is a unique solution)\n- "We offer the most unique experience." (we offer a unique experience)\n- "This is the most unique product on the market." (this is a unique product)',
  tags = '["grammar", "incorrect", "unique", "one-of-a-kind", "modification"]'
WHERE id = 'term_most-unique_783';

-- 20. My bad
UPDATE terms_v2 SET 
  definition = 'A casual, dismissive way to apologize that trivializes mistakes and makes serious errors sound like minor inconveniences, usually used when you''ve messed up something important.',
  examples = 'Examples:\n- "My bad, I forgot the meeting." (I''m sorry I missed the meeting)\n- "My bad, the report is late." (I''m sorry the report is late)\n- "My bad, I deleted the file." (I''m sorry I deleted the file)',
  tags = '["casual", "dismissive", "apology", "trivialize", "mistakes"]'
WHERE id = 'term_my-bad_784';
