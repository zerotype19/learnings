-- Fix Nonsensical Examples - Batch 2
-- This script fixes examples that don't make grammatical sense

-- 1. Incentive alignment
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We need better incentive alignment between sales and marketing."\n- "The incentive alignment program will reward collaborative behavior."\n- "Incentive alignment is crucial for driving the right behaviors."'
WHERE id = 'term_incentive_alignment_v84';

-- 2. Ping me
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Just ping me when you have the report ready."\n- "Can you ping me with the meeting details?"\n- "I''ll ping you once I get approval from leadership."'
WHERE id = 'term_ping_me_v9';

-- 3. All-hands
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We have an all-hands meeting every Friday at 3 PM."\n- "The all-hands announcement about the merger was well received."\n- "All-hands meetings are great for alignment, terrible for productivity."'
WHERE id = 'term_all_hands_v143';

-- 4. Put a pin in it
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Let''s put a pin in the budget discussion until next quarter."\n- "We need to put a pin in this feature request for now."\n- "Putting a pin in it is corporate speak for ''we''ll never do this.''"'
WHERE id = 'term_put_a_pin_in_it_v132';

-- 5. Going forward
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Going forward, we''ll use the new approval process."\n- "The strategy going forward is to focus on core markets."\n- "Going forward, all meetings will be 30 minutes or less."'
WHERE id = 'term_going_forward_v45';

-- 6. Take it offline
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Let''s take this discussion offline after the meeting."\n- "We should take the budget concerns offline."\n- "Taking it offline is code for ''this is too sensitive for everyone to hear.''"'
WHERE id = 'term_take_it_offline_v20';

-- 7. Peel the onion
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We need to peel the onion on this customer complaint."\n- "The investigation revealed more layers as we peeled the onion."\n- "Peeling the onion just means we didn''t plan properly from the start."'
WHERE id = 'term_peel_the_onion_v21';

-- 8. Ideation session
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "We''re having an ideation session to brainstorm new features."\n- "The ideation session generated 47 ideas, zero of which we''ll implement."\n- "Ideation sessions are great for creativity, terrible for getting work done."'
WHERE id = 'term_ideation_session_v49';

-- 9. Herd immunity
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Once enough people believe in this strategy, we''ll have herd immunity against criticism."\n- "Herd immunity means everyone agrees to ignore the obvious problems."\n- "We''ve achieved herd immunity on this terrible decision."'
WHERE id = 'term_herd_immunity_in_biz_talk_v63';

-- 10. Pre-read
UPDATE terms_v2 SET 
  examples = 'Examples:\n- "Please do a pre-read of the board materials before the meeting."\n- "The pre-read documents are 47 pages of dense corporate speak."\n- "Pre-reads are required, but no one actually reads them."'
WHERE id = 'term_pre_read_v125';
