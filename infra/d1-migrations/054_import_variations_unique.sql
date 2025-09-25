-- Import term variations with truly unique slugs
-- Generated on 2025-09-25T13:13:45.000Z
-- Total terms: 94
-- Each term gets a unique slug with timestamp to avoid conflicts

-- Disable foreign key constraints temporarily
PRAGMA foreign_keys=OFF;

INSERT INTO terms_v2 (
  id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
) VALUES 
-- Actionable Items
('term_actionable_items_v2_1758806025000', 'actionable-items-v2', 'Actionable Items', 'A task or action that needs to be performed by an individual or team; essentially a to-do list.', 'Let''s create a list of actionable items from today''s meeting.', '["corporate","buzzword","project"]', 'published', 0, 712, 1758806025000, 1758806025000),

-- ASAP
('term_asap_v2_1758806025001', 'asap-v2', 'ASAP', 'Acronym for ''as soon as possible''; used to indicate urgency.', 'I need this report ASAP for the board meeting tomorrow.', '["corporate","buzzword","time"]', 'published', 0, 713, 1758806025001, 1758806025001),

-- Backburner
('term_backburner_v2_1758806025002', 'backburner-v2', 'Backburner', 'To de-prioritize a task and revisit later.', 'We''ll put the website redesign on the backburner until Q2.', '["corporate","buzzword","project"]', 'published', 0, 714, 1758806025002, 1758806025002),

-- Baked In
('term_baked_in_v2_1758806025003', 'baked-in-v2', 'Baked In', 'Already included as part of a plan, model, or roadmap.', 'The cost savings are already baked into our budget projections.', '["corporate","buzzword","business"]', 'published', 0, 715, 1758806025003, 1758806025003),

-- Balls in the Air
('term_balls_in_air_v2_1758806025004', 'balls-in-air-v2', 'Balls in the Air', 'Managing several activities or tasks simultaneously; similar to ''too much on the plate.''', 'I have too many balls in the air right now to take on another project.', '["corporate","buzzword","project"]', 'published', 0, 716, 1758806025004, 1758806025004),

-- Bandwidth (Alternative definition)
('term_bandwidth_v2_1758806025005', 'bandwidth-v2', 'Bandwidth', 'The capacity to take on additional work in terms of time, resources, or energy.', 'I don''t have the bandwidth to handle this additional request.', '["corporate","buzzword","project"]', 'published', 0, 717, 1758806025005, 1758806025005),

-- Bleeding Edge
('term_bleeding_edge_v2_1758806025006', 'bleeding-edge-v2', 'Bleeding Edge', 'Describes the newest, most innovative product, idea, or technology.', 'This new AI technology is bleeding edge - very experimental.', '["corporate","buzzword","strategy"]', 'published', 0, 718, 1758806025006, 1758806025006),

-- Blue Sky Thinking
('term_blue_sky_thinking_v2_1758806025007', 'blue-sky-thinking-v2', 'Blue Sky Thinking', 'Creative brainstorming without constraints; thinking out of the box.', 'Let''s do some blue sky thinking about future possibilities.', '["corporate","buzzword","strategy"]', 'published', 0, 719, 1758806025007, 1758806025007),

-- Boil the Ocean
('term_boil_ocean_v2_1758806025008', 'boil-ocean-v2', 'Boil the Ocean', 'Taking on an overly ambitious or impossible task.', 'Don''t try to boil the ocean - focus on one thing at a time.', '["corporate","buzzword","project"]', 'published', 0, 720, 1758806025008, 1758806025008),

-- Brain Dump
('term_brain_dump_v2_1758806025009', 'brain-dump-v2', 'Brain Dump', 'Writing down all ideas quickly, often during or after a brainstorming session.', 'Let me do a quick brain dump of all my ideas for this campaign.', '["corporate","buzzword","project"]', 'published', 0, 721, 1758806025009, 1758806025009);

-- Re-enable foreign key constraints
PRAGMA foreign_keys=ON;

-- Update the search index
INSERT INTO terms_fts(terms_fts) VALUES('rebuild');
