-- Import term variations using different slug patterns
-- This allows multiple definitions for the same term without schema changes

-- Disable foreign key constraints temporarily
PRAGMA foreign_keys=OFF;

-- Insert variations with unique slugs
INSERT INTO terms_v2 (
  id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
) VALUES 
-- Actionable Items
('term_actionable-items-alt', 'actionable-items-alt', 'Actionable Items', 'A task or action that needs to be performed by an individual or team; essentially a to-do list.', 'Let''s create a list of actionable items from today''s meeting.', '["corporate","buzzword","project"]', 'published', 0, 711, 1758804000000, 1758804000000),

-- ASAP
('term_asap-alt', 'asap-alt', 'ASAP', 'Acronym for ''as soon as possible''; used to indicate urgency.', 'I need this report ASAP for the board meeting tomorrow.', '["corporate","buzzword","time"]', 'published', 0, 712, 1758804000000, 1758804000000),

-- Backburner
('term_backburner-alt', 'backburner-alt', 'Backburner', 'To de-prioritize a task and revisit later.', 'We''ll put the website redesign on the backburner until Q2.', '["corporate","buzzword","project"]', 'published', 0, 713, 1758804000000, 1758804000000),

-- Baked In
('term_baked-in-alt', 'baked-in-alt', 'Baked In', 'Already included as part of a plan, model, or roadmap.', 'The cost savings are already baked into our budget projections.', '["corporate","buzzword","business"]', 'published', 0, 714, 1758804000000, 1758804000000),

-- Balls in the Air
('term_balls-in-the-air-alt', 'balls-in-the-air-alt', 'Balls in the Air', 'Managing several activities or tasks simultaneously; similar to ''too much on the plate.''', 'I have too many balls in the air right now to take on another project.', '["corporate","buzzword","project"]', 'published', 0, 715, 1758804000000, 1758804000000),

-- Bandwidth (Alternative definition)
('term_bandwidth-alt', 'bandwidth-alt', 'Bandwidth', 'The capacity to take on additional work in terms of time, resources, or energy.', 'I don''t have the bandwidth to handle this additional request.', '["corporate","buzzword","project"]', 'published', 0, 716, 1758804000000, 1758804000000),

-- Bleeding Edge
('term_bleeding-edge-alt', 'bleeding-edge-alt', 'Bleeding Edge', 'Describes the newest, most innovative product, idea, or technology.', 'This new AI technology is bleeding edge - very experimental.', '["corporate","buzzword","strategy"]', 'published', 0, 717, 1758804000000, 1758804000000),

-- Blue Sky Thinking
('term_blue-sky-thinking-alt', 'blue-sky-thinking-alt', 'Blue Sky Thinking', 'Creative brainstorming without constraints; thinking out of the box.', 'Let''s do some blue sky thinking about future possibilities.', '["corporate","buzzword","strategy"]', 'published', 0, 718, 1758804000000, 1758804000000),

-- Boil the Ocean
('term_boil-the-ocean-alt', 'boil-the-ocean-alt', 'Boil the Ocean', 'Taking on an overly ambitious or impossible task.', 'Don''t try to boil the ocean - focus on one thing at a time.', '["corporate","buzzword","project"]', 'published', 0, 719, 1758804000000, 1758804000000),

-- Brain Dump
('term_brain-dump-alt', 'brain-dump-alt', 'Brain Dump', 'Writing down all ideas quickly, often during or after a brainstorming session.', 'Let me do a quick brain dump of all my ideas for this campaign.', '["corporate","buzzword","project"]', 'published', 0, 720, 1758804000000, 1758804000000);

-- Re-enable foreign key constraints
PRAGMA foreign_keys=ON;

-- Update the search index
INSERT INTO terms_fts(terms_fts) VALUES('rebuild');
