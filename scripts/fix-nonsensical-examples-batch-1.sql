-- Fix Nonsensical Examples - Batch 1
-- This script fixes examples that don't make grammatical sense

-- 1. Make it pop
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We need to make this design pop with more vibrant colors."\n- "The new logo really makes our brand pop."\n- "Let''s make this presentation pop with some animations."'
WHERE id = 'term_make_it_pop_v114';

-- 2. Business driver
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Customer satisfaction is our main business driver."\n- "We need to identify the key business drivers for growth."\n- "The business driver behind this decision is cost reduction."'
WHERE id = 'term_business_driver_v81';

-- 3. North Star metric
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Our North Star metric is monthly active users."\n- "We need to align all teams around our North Star metric."\n- "The North Star metric guides all our strategic decisions."'
WHERE id = 'term_north_star_metric_v146';

-- 4. Win-win
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "This partnership is a win-win for both companies."\n- "We need to find a win-win solution for this negotiation."\n- "The new policy creates a win-win situation for everyone."'
WHERE id = 'term_win_win_v30';

-- 5. Align the org
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We need to align the org around our new strategy."\n- "The CEO is trying to align the org with company values."\n- "Aligning the org will take months of meetings and PowerPoint slides."'
WHERE id = 'term_align_the_org_v80';

-- 6. Waterfall to agile
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We''re transitioning from waterfall to agile development."\n- "The waterfall to agile transformation is taking longer than expected."\n- "Moving from waterfall to agile requires changing our entire process."'
WHERE id = 'term_waterfall_to_agile_v92';

-- 7. Seamless integration
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "The seamless integration of our systems took six months and three consultants."\n- "We promise seamless integration, but expect some hiccups."\n- "Seamless integration is never as seamless as the sales team claims."'
WHERE id = 'term_seamless_integration_v50';

-- 8. Optics check
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We need to do an optics check before announcing the layoffs."\n- "The optics check revealed this decision looks terrible."\n- "Running an optics check is just corporate speak for damage control."'
WHERE id = 'term_optics_check_v117';

-- 9. Ecosystem play
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Our new ecosystem play involves partnering with 47 different companies."\n- "The ecosystem play strategy sounds impressive in board meetings."\n- "This ecosystem play is really just throwing spaghetti at the wall."'
WHERE id = 'term_ecosystem_play_v38';

-- 10. White space
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We identified white space in the market for premium cat food."\n- "The white space analysis shows opportunities in underserved segments."\n- "This white space is probably empty because no one wants it."'
WHERE id = 'term_white_space_v72';

-- 11. Pushback
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We''re getting pushback from the engineering team on this timeline."\n- "The pushback from customers is stronger than we expected."\n- "Any pushback just means they don''t understand our vision."'
WHERE id = 'term_pushback_v56';

-- 12. Rightsize
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We need to rightsize the organization to improve efficiency."\n- "The rightsizing initiative will eliminate redundant positions."\n- "Rightsizing is just a fancy way of saying we''re firing people."'
WHERE id = 'term_rightsize_v28';

-- 13. Open loop
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We have an open loop on the customer feedback process."\n- "The open loop in our workflow is causing delays."\n- "This open loop is really just an excuse for not finishing things."'
WHERE id = 'term_open_loop_v99';

-- 14. Level set
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Let''s level set on expectations before we start this project."\n- "We need to level set with the team about the new requirements."\n- "Level setting is just making sure everyone is equally confused."'
WHERE id = 'term_level_set_v40';

-- 15. Hard stop
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Friday is a hard stop for this project - no extensions."\n- "We have a hard stop at 5 PM for the client presentation."\n- "Hard stops are just soft suggestions that get ignored anyway."'
WHERE id = 'term_hard_stop_v44';
