-- Improve terms content - Batch 9
-- This script improves definitions, examples, and tags for terms that need enhancement

-- 1. Change agent (needs tags)
UPDATE terms_v2 SET 
  tags = '["corporate", "title", "different", "emails", "paradigms"]'
WHERE id = 'term_change-agent_734';

-- 2. Disconnect (as a noun) - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A vague, overused word that means "problem" but sounds more sophisticated, usually used when you can''t be specific about what''s actually wrong.',
  examples = 'Examples:\n- "There''s a disconnect between our goals and reality." (we have problems)\n- "We need to address this disconnect." (we need to fix something)\n- "The disconnect is causing issues." (something is wrong)',
  tags = '["vague", "overused", "problem", "sophisticated", "specific"]'
WHERE id = 'term_disconnect-as-a-noun_747';

-- 3. Disruptive - needs complete definition and examples
UPDATE terms_v2 SET 
  definition = 'A word used to describe products or business models that change entire industries, usually by people whose products are just slightly different versions of existing things.',
  examples = 'Examples:\n- "Our disruptive technology will change everything." (our slightly different technology might help)\n- "We''re disrupting the market." (we''re trying to compete)\n- "This is truly disruptive." (this is different-ish)',
  tags = '["industry", "change", "different", "compete", "slightly"]'
WHERE id = 'term_disruptive_748';

-- 4. Drop dead date - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A deadline so important that missing it would be catastrophic, usually used as a bluff to motivate people who aren''t moving fast enough.',
  examples = 'Examples:\n- "This is a drop dead date - we can''t miss it." (this deadline is important)\n- "The drop dead date is Friday." (we need this by Friday)\n- "We''re past the drop dead date." (we''re in trouble)',
  tags = '["deadline", "catastrophic", "bluff", "motivate", "trouble"]'
WHERE id = 'term_drop-dead-date_749';

-- 5. Epic (as an adjective) - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'A word used to describe something of heroic, sweeping proportions, usually applied to things that are just slightly better than average.',
  examples = 'Examples:\n- "That was an epic presentation." (that was a good presentation)\n- "We had an epic quarter." (we had a good quarter)\n- "This is epic!" (this is pretty good)',
  tags = '["heroic", "sweeping", "slightly", "better", "average"]'
WHERE id = 'term_epic-as-an-adjective_751';

-- 6. Evangelist - needs definition and examples
UPDATE terms_v2 SET 
  definition = 'Someone who passionately promotes a product or idea, usually self-appointed and more enthusiastic than knowledgeable.',
  examples = 'Examples:\n- "He''s an evangelist for our platform." (he really likes our platform)\n- "We need more evangelists." (we need more people who like us)\n- "She''s our biggest evangelist." (she talks about us a lot)',
  tags = '["passionately", "promotes", "self-appointed", "enthusiastic", "knowledgeable"]'
WHERE id = 'term_evangelist_752';

-- 7. Evolve - needs complete definition and examples
UPDATE terms_v2 SET 
  definition = 'A fancy way to say "change" or "develop" that makes simple progress sound like a natural, inevitable process.',
  examples = 'Examples:\n- "Our strategy is evolving." (our strategy is changing)\n- "We need to evolve with the market." (we need to adapt)\n- "The company is evolving." (the company is changing)',
  tags = '["fancy", "change", "develop", "natural", "inevitable"]'
WHERE id = 'term_evolve_753';
