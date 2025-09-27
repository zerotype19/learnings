-- Fix Nonsensical Examples - Batch 3
-- This script fixes examples that don't make grammatical sense

-- 1. Change agent
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Sarah is our change agent for the digital transformation."\n- "We need a change agent to drive the culture shift."\n- "Being a change agent means everyone will resist everything you do."'
WHERE id = 'term_change_agent_v128';

-- 2. Core competency
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Our core competency is customer service, but we''re focusing on AI instead."\n- "We need to identify our core competencies before expanding."\n- "Core competencies are what you''re good at but will ignore for shiny new things."'
WHERE id = 'term_core_competency_v31';

-- 3. Growth mindset
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We''re fostering a growth mindset across the organization."\n- "The growth mindset training will help employees embrace challenges."\n- "Growth mindset is great until you realize some people are just naturally better."'
WHERE id = 'term_growth_mindset_v91';

-- 4. Strategic lens
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Let''s view this through a strategic lens before making decisions."\n- "The strategic lens reveals opportunities we hadn''t considered."\n- "Strategic lens is just corporate speak for overthinking simple problems."'
WHERE id = 'term_strategic_lens_v106';

-- 5. New normal
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Remote work is the new normal for our organization."\n- "We need to adapt to the new normal of virtual meetings."\n- "The new normal is never actually normal, just different."'
WHERE id = 'term_new_normal_v147';

-- 6. Gold plating
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "The team is gold plating the feature instead of focusing on core functionality."\n- "We need to avoid gold plating and stick to the requirements."\n- "Gold plating makes things look fancy but adds no real value."'
WHERE id = 'term_gold_plating_v43';

-- 7. Roll up your sleeves
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "It''s time to roll up your sleeves and get this project done."\n- "The team rolled up their sleeves and tackled the problem head-on."\n- "Rolling up your sleeves sounds productive but usually just means more meetings."'
WHERE id = 'term_roll_up_your_sleeves_v127';

-- 8. Game-changer
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "This new technology will be a game-changer for our industry."\n- "The partnership is a game-changer for our market position."\n- "Game-changers are usually just minor improvements with big marketing budgets."'
WHERE id = 'term_game_changer_v83';

-- 9. Scale up
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We need to scale up our operations to meet demand."\n- "The company is scaling up by hiring 100 new employees."\n- "Scaling up sounds easy until you realize you need competent people."'
WHERE id = 'term_scale_up_v94';

-- 10. Deep dive
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Let''s do a deep dive into the customer feedback data."\n- "The deep dive revealed some interesting patterns in user behavior."\n- "Deep dives are just fancy ways of saying ''we should have researched this earlier.''"'
WHERE id = 'term_deep_dive_v11';

-- 11. The delta
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "What''s the delta between our current performance and target?"\n- "The delta analysis shows we''re 15% behind schedule."\n- "The delta is corporate speak for ''the difference,'' which is usually everything."'
WHERE id = 'term_the_delta_v130';

-- 12. One-pager
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Can you create a one-pager summarizing the proposal?"\n- "The one-pager should highlight the key benefits and costs."\n- "One-pagers inevitably become 47-slide PowerPoint presentations."'
WHERE id = 'term_one_pager_v65';

-- 13. Shock to the system
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "The new policy will be a shock to the system for many employees."\n- "We need a shock to the system to break out of our complacency."\n- "Shocks to the system are great until you realize you can''t control the chaos."'
WHERE id = 'term_shock_to_the_system_v149';

-- 14. Cross-pollinate
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We need to cross-pollinate ideas between the marketing and engineering teams."\n- "The cross-pollination of best practices will benefit everyone."\n- "Cross-pollination usually results in everyone getting confused about everything."'
WHERE id = 'term_cross_pollinate_v93';

-- 15. Unicorn thinking
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We need unicorn thinking to solve this impossible problem."\n- "Unicorn thinking will help us find innovative solutions."\n- "Unicorn thinking is great until you realize unicorns don''t exist."'
WHERE id = 'term_unicorn_thinking_v139';
