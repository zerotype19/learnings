-- Migration: Replace all terms with corporate_buzzwords_500_varied.csv
-- Generated on: 2025-09-24T16:08:39.184Z

-- Disable foreign key constraints temporarily
PRAGMA foreign_keys=OFF;

-- Clear existing data
DELETE FROM votes;
DELETE FROM term_aliases;
DELETE FROM term_links;
DELETE FROM terms_v2;

-- Insert new terms
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-paradigm',
    'crypto-paradigm',
    'Crypto Paradigm',
    'Crypto Paradigm sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Our roadmap hinges on embracing crypto paradigm ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    1,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-synergy',
    'seamless-synergy',
    'Seamless Synergy',
    'Seamless Synergy sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The Q4 offsite is focused entirely on seamless synergy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    2,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-integration',
    'lean-integration',
    'Lean Integration',
    'More of a mantra than a method, Lean Integration thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights lean integration as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    3,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-blueprint',
    'dynamic-blueprint',
    'Dynamic Blueprint',
    'Dynamic Blueprint sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Leadership wants KPIs tied directly to dynamic blueprint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    4,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-metric',
    'future-proof-metric',
    'Future-Proof Metric',
    'When someone says Future-Proof Metric, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The investor deck highlights future-proof metric as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    5,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-paradigm',
    'smart-paradigm',
    'Smart Paradigm',
    'Despite its futuristic vibe, Smart Paradigm often results in the same status quo under a trendier label.',
    'We must double down on smart paradigm before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    6,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-solution',
    'virtual-solution',
    'Virtual Solution',
    'Teams invoke Virtual Solution to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on virtual solution.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    7,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-framework',
    'strategic-framework',
    'Strategic Framework',
    'Strategic Framework promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on strategic framework before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    8,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-transformation',
    'cross-transformation',
    'Cross Transformation',
    'No meeting is complete until someone suggests Cross Transformation as the next big move.',
    'The investor deck highlights cross transformation as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    9,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-enablement',
    'hybrid-enablement',
    'Hybrid Enablement',
    'Hybrid Enablement sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The Q4 offsite is focused entirely on hybrid enablement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    10,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-pipeline',
    'cross-pipeline',
    'Cross Pipeline',
    'Despite its futuristic vibe, Cross Pipeline often results in the same status quo under a trendier label.',
    'We must double down on cross pipeline before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    11,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-pipeline',
    'holistic-pipeline',
    'Holistic Pipeline',
    'Holistic Pipeline promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Our roadmap hinges on embracing holistic pipeline ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    12,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-synergy',
    'dynamic-synergy',
    'Dynamic Synergy',
    'Dynamic Synergy sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The investor deck highlights dynamic synergy as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    13,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-orchestration',
    'smart-orchestration',
    'Smart Orchestration',
    'When someone says Smart Orchestration, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on smart orchestration before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    14,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-architecture',
    'cloud-architecture',
    'Cloud Architecture',
    'Think of Cloud Architecture as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on cloud architecture.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    15,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-strategy',
    'strategic-strategy',
    'Strategic Strategy',
    'Strategic Strategy is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on strategic strategy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    16,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-paradigm',
    'disruptive-paradigm',
    'Disruptive Paradigm',
    'No meeting is complete until someone suggests Disruptive Paradigm as the next big move.',
    'Our roadmap hinges on embracing disruptive paradigm ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    17,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-strategy',
    'crypto-strategy',
    'Crypto Strategy',
    'Despite its futuristic vibe, Crypto Strategy often results in the same status quo under a trendier label.',
    'Leadership wants KPIs tied directly to crypto strategy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    18,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-orchestration',
    'predictive-orchestration',
    'Predictive Orchestration',
    'Predictive Orchestration is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Our roadmap hinges on embracing predictive orchestration ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    19,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-strategy',
    'smart-strategy',
    'Smart Strategy',
    'Despite its futuristic vibe, Smart Strategy often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing smart strategy ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    20,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-solution',
    'strategic-solution',
    'Strategic Solution',
    'Think of Strategic Solution as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on strategic solution.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    21,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-strategy',
    'holistic-strategy',
    'Holistic Strategy',
    'Despite its futuristic vibe, Holistic Strategy often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on holistic strategy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    22,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-framework',
    'seamless-framework',
    'Seamless Framework',
    'More of a mantra than a method, Seamless Framework thrives in quarterly reports and keynote speeches.',
    'We must double down on seamless framework before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    23,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-engagement',
    'future-proof-engagement',
    'Future-Proof Engagement',
    'When someone says Future-Proof Engagement, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Our roadmap hinges on embracing future-proof engagement ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    24,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-pipeline',
    'hyper-pipeline',
    'Hyper Pipeline',
    'Executives use Hyper Pipeline to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing hyper pipeline ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    25,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-orchestration',
    'next-gen-orchestration',
    'Next-Gen Orchestration',
    'Think of Next-Gen Orchestration as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on next-gen orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    26,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-solution',
    'omni-solution',
    'Omni Solution',
    'Omni Solution promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on omni solution before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    27,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-architecture',
    'agile-architecture',
    'Agile Architecture',
    'When someone says Agile Architecture, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on agile architecture before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    28,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-mindset',
    'predictive-mindset',
    'Predictive Mindset',
    'No meeting is complete until someone suggests Predictive Mindset as the next big move.',
    'The investor deck highlights predictive mindset as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    29,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-playbook',
    'crypto-playbook',
    'Crypto Playbook',
    'Crypto Playbook promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to crypto playbook.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    30,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-initiative',
    'zero-trust-initiative',
    'Zero-Trust Initiative',
    'Think of Zero-Trust Initiative as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on zero-trust initiative.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    31,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-loop',
    'hyper-loop',
    'Hyper Loop',
    'No meeting is complete until someone suggests Hyper Loop as the next big move.',
    'We must double down on hyper loop before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    32,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-alignment',
    'strategic-alignment',
    'Strategic Alignment',
    'Strategic Alignment promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on strategic alignment before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    33,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-alignment',
    'meta-alignment',
    'Meta Alignment',
    'Meta Alignment promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to meta alignment.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    34,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-paradigm',
    'hyper-paradigm',
    'Hyper Paradigm',
    'Hyper Paradigm is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Our roadmap hinges on embracing hyper paradigm ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    35,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-playbook',
    'smart-playbook',
    'Smart Playbook',
    'More of a mantra than a method, Smart Playbook thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights smart playbook as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    36,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-ecosystem',
    'neural-ecosystem',
    'Neural Ecosystem',
    'No meeting is complete until someone suggests Neural Ecosystem as the next big move.',
    'The Q4 offsite is focused entirely on neural ecosystem.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    37,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-engagement',
    'holistic-engagement',
    'Holistic Engagement',
    'When someone says Holistic Engagement, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Our roadmap hinges on embracing holistic engagement ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    38,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-experience',
    'seamless-experience',
    'Seamless Experience',
    'No meeting is complete until someone suggests Seamless Experience as the next big move.',
    'We must double down on seamless experience before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    39,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-orchestration',
    'strategic-orchestration',
    'Strategic Orchestration',
    'No meeting is complete until someone suggests Strategic Orchestration as the next big move.',
    'Leadership wants KPIs tied directly to strategic orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    40,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-alignment',
    'synergy-alignment',
    'Synergy Alignment',
    'Executives use Synergy Alignment to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights synergy alignment as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    41,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-ecosystem',
    'meta-ecosystem',
    'Meta Ecosystem',
    'More of a mantra than a method, Meta Ecosystem thrives in quarterly reports and keynote speeches.',
    'The Q4 offsite is focused entirely on meta ecosystem.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    42,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-playbook',
    'scalable-playbook',
    'Scalable Playbook',
    'Despite its futuristic vibe, Scalable Playbook often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing scalable playbook ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    43,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-enablement',
    'future-proof-enablement',
    'Future-Proof Enablement',
    'Teams invoke Future-Proof Enablement to suggest momentum, even when standing still.',
    'Leadership wants KPIs tied directly to future-proof enablement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    44,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-optimization',
    'zero-trust-optimization',
    'Zero-Trust Optimization',
    'Teams invoke Zero-Trust Optimization to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on zero-trust optimization.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    45,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-alignment',
    'lean-alignment',
    'Lean Alignment',
    'When someone says Lean Alignment, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on lean alignment before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    46,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-orchestration',
    'meta-orchestration',
    'Meta Orchestration',
    'Teams invoke Meta Orchestration to suggest momentum, even when standing still.',
    'Our roadmap hinges on embracing meta orchestration ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    47,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-blueprint',
    'zero-trust-blueprint',
    'Zero-Trust Blueprint',
    'Zero-Trust Blueprint is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Our roadmap hinges on embracing zero-trust blueprint ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    48,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-pipeline',
    'scalable-pipeline',
    'Scalable Pipeline',
    'Despite its futuristic vibe, Scalable Pipeline often results in the same status quo under a trendier label.',
    'The investor deck highlights scalable pipeline as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    49,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-paradigm',
    'dynamic-paradigm',
    'Dynamic Paradigm',
    'Dynamic Paradigm promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to dynamic paradigm.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    50,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-experience',
    'quantum-experience',
    'Quantum Experience',
    'Quantum Experience promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on quantum experience before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    51,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-orchestration',
    'hyper-orchestration',
    'Hyper Orchestration',
    'More of a mantra than a method, Hyper Orchestration thrives in quarterly reports and keynote speeches.',
    'The Q4 offsite is focused entirely on hyper orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    52,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-orchestration',
    'future-proof-orchestration',
    'Future-Proof Orchestration',
    'Future-Proof Orchestration is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to future-proof orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    53,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-orchestration',
    'synergy-orchestration',
    'Synergy Orchestration',
    'When someone says Synergy Orchestration, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Leadership wants KPIs tied directly to synergy orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    54,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-mindset',
    'synergy-mindset',
    'Synergy Mindset',
    'Synergy Mindset is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The investor deck highlights synergy mindset as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    55,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-architecture',
    'transformational-architecture',
    'Transformational Architecture',
    'Transformational Architecture promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to transformational architecture.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    56,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-enablement',
    'frictionless-enablement',
    'Frictionless Enablement',
    'Frictionless Enablement is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The investor deck highlights frictionless enablement as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    57,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-blueprint',
    'transformational-blueprint',
    'Transformational Blueprint',
    'When someone says Transformational Blueprint, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on transformational blueprint before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    58,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-framework',
    'frictionless-framework',
    'Frictionless Framework',
    'More of a mantra than a method, Frictionless Framework thrives in quarterly reports and keynote speeches.',
    'Leadership wants KPIs tied directly to frictionless framework.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    59,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-synergy',
    'circular-synergy',
    'Circular Synergy',
    'Despite its futuristic vibe, Circular Synergy often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing circular synergy ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    60,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-blueprint',
    'frictionless-blueprint',
    'Frictionless Blueprint',
    'More of a mantra than a method, Frictionless Blueprint thrives in quarterly reports and keynote speeches.',
    'Leadership wants KPIs tied directly to frictionless blueprint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    61,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-ecosystem',
    'hyper-ecosystem',
    'Hyper Ecosystem',
    'Despite its futuristic vibe, Hyper Ecosystem often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on hyper ecosystem.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    62,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-loop',
    'disruptive-loop',
    'Disruptive Loop',
    'Executives use Disruptive Loop to inspire confidence, while the rest of the team quietly Googles it.',
    'Leadership wants KPIs tied directly to disruptive loop.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    63,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-transformation',
    'neural-transformation',
    'Neural Transformation',
    'Neural Transformation is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on neural transformation before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    64,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-integration',
    'smart-integration',
    'Smart Integration',
    'Despite its futuristic vibe, Smart Integration often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on smart integration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    65,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-alignment',
    'next-gen-alignment',
    'Next-Gen Alignment',
    'Executives use Next-Gen Alignment to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing next-gen alignment ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    66,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-playbook',
    'meta-playbook',
    'Meta Playbook',
    'More of a mantra than a method, Meta Playbook thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights meta playbook as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    67,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-metric',
    'zero-trust-metric',
    'Zero-Trust Metric',
    'No meeting is complete until someone suggests Zero-Trust Metric as the next big move.',
    'Leadership wants KPIs tied directly to zero-trust metric.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    68,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-loop',
    'agile-loop',
    'Agile Loop',
    'Teams invoke Agile Loop to suggest momentum, even when standing still.',
    'Our roadmap hinges on embracing agile loop ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    69,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-synergy',
    'meta-synergy',
    'Meta Synergy',
    'Think of Meta Synergy as corporate poetry: pretty words, little substance.',
    'We must double down on meta synergy before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    70,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-synergy',
    'cross-synergy',
    'Cross Synergy',
    'More of a mantra than a method, Cross Synergy thrives in quarterly reports and keynote speeches.',
    'We must double down on cross synergy before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    71,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-experience',
    'crypto-experience',
    'Crypto Experience',
    'More of a mantra than a method, Crypto Experience thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing crypto experience ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    72,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-initiative',
    'personalized-initiative',
    'Personalized Initiative',
    'Executives use Personalized Initiative to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing personalized initiative ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    73,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-experience',
    'frictionless-experience',
    'Frictionless Experience',
    'Frictionless Experience sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Our roadmap hinges on embracing frictionless experience ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    74,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-engagement',
    'zero-trust-engagement',
    'Zero-Trust Engagement',
    'No meeting is complete until someone suggests Zero-Trust Engagement as the next big move.',
    'The Q4 offsite is focused entirely on zero-trust engagement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    75,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-playbook',
    'circular-playbook',
    'Circular Playbook',
    'More of a mantra than a method, Circular Playbook thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights circular playbook as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    76,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-architecture',
    'hyper-architecture',
    'Hyper Architecture',
    'Despite its futuristic vibe, Hyper Architecture often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on hyper architecture.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    77,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-mindset',
    'omni-mindset',
    'Omni Mindset',
    'Think of Omni Mindset as corporate poetry: pretty words, little substance.',
    'The investor deck highlights omni mindset as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    78,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-mindset',
    'cloud-mindset',
    'Cloud Mindset',
    'Despite its futuristic vibe, Cloud Mindset often results in the same status quo under a trendier label.',
    'Leadership wants KPIs tied directly to cloud mindset.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    79,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-paradigm',
    'omni-paradigm',
    'Omni Paradigm',
    'When someone says Omni Paradigm, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on omni paradigm.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    80,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-blueprint',
    'synergy-blueprint',
    'Synergy Blueprint',
    'Synergy Blueprint sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The investor deck highlights synergy blueprint as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    81,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-synergy',
    'hyper-synergy',
    'Hyper Synergy',
    'Executives use Hyper Synergy to inspire confidence, while the rest of the team quietly Googles it.',
    'We must double down on hyper synergy before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    82,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-paradigm',
    'future-proof-paradigm',
    'Future-Proof Paradigm',
    'Future-Proof Paradigm is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to future-proof paradigm.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    83,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-pipeline',
    'agile-pipeline',
    'Agile Pipeline',
    'Think of Agile Pipeline as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to agile pipeline.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    84,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-optimization',
    'future-proof-optimization',
    'Future-Proof Optimization',
    'Think of Future-Proof Optimization as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to future-proof optimization.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    85,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-integration',
    'frictionless-integration',
    'Frictionless Integration',
    'Despite its futuristic vibe, Frictionless Integration often results in the same status quo under a trendier label.',
    'We must double down on frictionless integration before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    86,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-blueprint',
    'meta-blueprint',
    'Meta Blueprint',
    'Meta Blueprint is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on meta blueprint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    87,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-optimization',
    'frictionless-optimization',
    'Frictionless Optimization',
    'More of a mantra than a method, Frictionless Optimization thrives in quarterly reports and keynote speeches.',
    'We must double down on frictionless optimization before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    88,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-alignment',
    'agile-alignment',
    'Agile Alignment',
    'Agile Alignment is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The investor deck highlights agile alignment as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    89,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-roadmap',
    'frictionless-roadmap',
    'Frictionless Roadmap',
    'More of a mantra than a method, Frictionless Roadmap thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing frictionless roadmap ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    90,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-integration',
    'agile-integration',
    'Agile Integration',
    'Agile Integration sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The Q4 offsite is focused entirely on agile integration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    91,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-pipeline',
    'meta-pipeline',
    'Meta Pipeline',
    'Meta Pipeline promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on meta pipeline before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    92,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-optimization',
    'disruptive-optimization',
    'Disruptive Optimization',
    'Teams invoke Disruptive Optimization to suggest momentum, even when standing still.',
    'We must double down on disruptive optimization before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    93,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-pipeline',
    'strategic-pipeline',
    'Strategic Pipeline',
    'Think of Strategic Pipeline as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on strategic pipeline.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    94,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-initiative',
    'holistic-initiative',
    'Holistic Initiative',
    'Despite its futuristic vibe, Holistic Initiative often results in the same status quo under a trendier label.',
    'The investor deck highlights holistic initiative as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    95,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-framework',
    'cloud-framework',
    'Cloud Framework',
    'No meeting is complete until someone suggests Cloud Framework as the next big move.',
    'The investor deck highlights cloud framework as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    96,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-metric',
    'hyper-metric',
    'Hyper Metric',
    'Hyper Metric is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The investor deck highlights hyper metric as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    97,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-metric',
    'crypto-metric',
    'Crypto Metric',
    'When someone says Crypto Metric, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on crypto metric.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    98,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-playbook',
    'hybrid-playbook',
    'Hybrid Playbook',
    'Hybrid Playbook is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to hybrid playbook.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    99,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-framework',
    'smart-framework',
    'Smart Framework',
    'Smart Framework is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on smart framework before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    100,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-initiative',
    'predictive-initiative',
    'Predictive Initiative',
    'When someone says Predictive Initiative, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Leadership wants KPIs tied directly to predictive initiative.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    101,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-architecture',
    'crypto-architecture',
    'Crypto Architecture',
    'When someone says Crypto Architecture, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Our roadmap hinges on embracing crypto architecture ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    102,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-optimization',
    'personalized-optimization',
    'Personalized Optimization',
    'Personalized Optimization is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The investor deck highlights personalized optimization as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    103,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-mindset',
    'disruptive-mindset',
    'Disruptive Mindset',
    'Disruptive Mindset is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to disruptive mindset.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    104,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-synergy',
    'omni-synergy',
    'Omni Synergy',
    'Teams invoke Omni Synergy to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on omni synergy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    105,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-optimization',
    'holistic-optimization',
    'Holistic Optimization',
    'No meeting is complete until someone suggests Holistic Optimization as the next big move.',
    'We must double down on holistic optimization before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    106,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-strategy',
    'transformational-strategy',
    'Transformational Strategy',
    'When someone says Transformational Strategy, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on transformational strategy before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    107,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-blueprint',
    'seamless-blueprint',
    'Seamless Blueprint',
    'No meeting is complete until someone suggests Seamless Blueprint as the next big move.',
    'The Q4 offsite is focused entirely on seamless blueprint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    108,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-journey',
    'omni-journey',
    'Omni Journey',
    'When someone says Omni Journey, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The investor deck highlights omni journey as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    109,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-journey',
    'disruptive-journey',
    'Disruptive Journey',
    'Teams invoke Disruptive Journey to suggest momentum, even when standing still.',
    'The investor deck highlights disruptive journey as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    110,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-roadmap',
    'neural-roadmap',
    'Neural Roadmap',
    'Neural Roadmap promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on neural roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    111,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-journey',
    'transformational-journey',
    'Transformational Journey',
    'Transformational Journey promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to transformational journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    112,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-paradigm',
    'cloud-paradigm',
    'Cloud Paradigm',
    'Despite its futuristic vibe, Cloud Paradigm often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on cloud paradigm.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    113,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-journey',
    'synergy-journey',
    'Synergy Journey',
    'Synergy Journey promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on synergy journey before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    114,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-enablement',
    'next-gen-enablement',
    'Next-Gen Enablement',
    'Despite its futuristic vibe, Next-Gen Enablement often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on next-gen enablement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    115,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-metric',
    'strategic-metric',
    'Strategic Metric',
    'Executives use Strategic Metric to inspire confidence, while the rest of the team quietly Googles it.',
    'We must double down on strategic metric before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    116,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-synergy',
    'holistic-synergy',
    'Holistic Synergy',
    'Despite its futuristic vibe, Holistic Synergy often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on holistic synergy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    117,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-engagement',
    'cloud-engagement',
    'Cloud Engagement',
    'Cloud Engagement is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Our roadmap hinges on embracing cloud engagement ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    118,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-transformation',
    'agile-transformation',
    'Agile Transformation',
    'Despite its futuristic vibe, Agile Transformation often results in the same status quo under a trendier label.',
    'The investor deck highlights agile transformation as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    119,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-orchestration',
    'frictionless-orchestration',
    'Frictionless Orchestration',
    'More of a mantra than a method, Frictionless Orchestration thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing frictionless orchestration ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    120,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-strategy',
    'zero-trust-strategy',
    'Zero-Trust Strategy',
    'Zero-Trust Strategy is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to zero-trust strategy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    121,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-touchpoint',
    'zero-trust-touchpoint',
    'Zero-Trust Touchpoint',
    'Despite its futuristic vibe, Zero-Trust Touchpoint often results in the same status quo under a trendier label.',
    'The investor deck highlights zero-trust touchpoint as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    122,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-synergy',
    'future-proof-synergy',
    'Future-Proof Synergy',
    'Think of Future-Proof Synergy as corporate poetry: pretty words, little substance.',
    'We must double down on future-proof synergy before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    123,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-touchpoint',
    'cloud-touchpoint',
    'Cloud Touchpoint',
    'No meeting is complete until someone suggests Cloud Touchpoint as the next big move.',
    'The Q4 offsite is focused entirely on cloud touchpoint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    124,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-pipeline',
    'circular-pipeline',
    'Circular Pipeline',
    'Despite its futuristic vibe, Circular Pipeline often results in the same status quo under a trendier label.',
    'We must double down on circular pipeline before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    125,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-solution',
    'disruptive-solution',
    'Disruptive Solution',
    'No meeting is complete until someone suggests Disruptive Solution as the next big move.',
    'The investor deck highlights disruptive solution as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    126,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-solution',
    'zero-trust-solution',
    'Zero-Trust Solution',
    'Zero-Trust Solution sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The Q4 offsite is focused entirely on zero-trust solution.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    127,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-paradigm',
    'frictionless-paradigm',
    'Frictionless Paradigm',
    'Teams invoke Frictionless Paradigm to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on frictionless paradigm.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    128,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-loop',
    'crypto-loop',
    'Crypto Loop',
    'Despite its futuristic vibe, Crypto Loop often results in the same status quo under a trendier label.',
    'The investor deck highlights crypto loop as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    129,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-mindset',
    'holistic-mindset',
    'Holistic Mindset',
    'Holistic Mindset promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on holistic mindset.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    130,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-loop',
    'predictive-loop',
    'Predictive Loop',
    'Predictive Loop promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to predictive loop.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    131,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-alignment',
    'cross-alignment',
    'Cross Alignment',
    'Teams invoke Cross Alignment to suggest momentum, even when standing still.',
    'The investor deck highlights cross alignment as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    132,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-solution',
    'cloud-solution',
    'Cloud Solution',
    'Executives use Cloud Solution to inspire confidence, while the rest of the team quietly Googles it.',
    'The Q4 offsite is focused entirely on cloud solution.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    133,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-alignment',
    'dynamic-alignment',
    'Dynamic Alignment',
    'Executives use Dynamic Alignment to inspire confidence, while the rest of the team quietly Googles it.',
    'Leadership wants KPIs tied directly to dynamic alignment.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    134,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-engagement',
    'seamless-engagement',
    'Seamless Engagement',
    'Seamless Engagement sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The Q4 offsite is focused entirely on seamless engagement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    135,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-optimization',
    'synergy-optimization',
    'Synergy Optimization',
    'Despite its futuristic vibe, Synergy Optimization often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on synergy optimization.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    136,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-experience',
    'lean-experience',
    'Lean Experience',
    'Teams invoke Lean Experience to suggest momentum, even when standing still.',
    'Leadership wants KPIs tied directly to lean experience.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    137,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-journey',
    'agile-journey',
    'Agile Journey',
    'More of a mantra than a method, Agile Journey thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights agile journey as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    138,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-pipeline',
    'lean-pipeline',
    'Lean Pipeline',
    'When someone says Lean Pipeline, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on lean pipeline before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    139,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-experience',
    'virtual-experience',
    'Virtual Experience',
    'More of a mantra than a method, Virtual Experience thrives in quarterly reports and keynote speeches.',
    'Leadership wants KPIs tied directly to virtual experience.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    140,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-synergy',
    'personalized-synergy',
    'Personalized Synergy',
    'No meeting is complete until someone suggests Personalized Synergy as the next big move.',
    'Leadership wants KPIs tied directly to personalized synergy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    141,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-experience',
    'future-proof-experience',
    'Future-Proof Experience',
    'Teams invoke Future-Proof Experience to suggest momentum, even when standing still.',
    'The investor deck highlights future-proof experience as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    142,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-ecosystem',
    'next-gen-ecosystem',
    'Next-Gen Ecosystem',
    'Next-Gen Ecosystem promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Our roadmap hinges on embracing next-gen ecosystem ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    143,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-alignment',
    'neural-alignment',
    'Neural Alignment',
    'No meeting is complete until someone suggests Neural Alignment as the next big move.',
    'Leadership wants KPIs tied directly to neural alignment.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    144,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-pipeline',
    'zero-trust-pipeline',
    'Zero-Trust Pipeline',
    'Executives use Zero-Trust Pipeline to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing zero-trust pipeline ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    145,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-transformation',
    'disruptive-transformation',
    'Disruptive Transformation',
    'Disruptive Transformation is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on disruptive transformation.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    146,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-enablement',
    'holistic-enablement',
    'Holistic Enablement',
    'When someone says Holistic Enablement, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on holistic enablement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    147,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-transformation',
    'predictive-transformation',
    'Predictive Transformation',
    'Predictive Transformation promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on predictive transformation before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    148,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-roadmap',
    'hybrid-roadmap',
    'Hybrid Roadmap',
    'Hybrid Roadmap promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on hybrid roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    149,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-playbook',
    'strategic-playbook',
    'Strategic Playbook',
    'No meeting is complete until someone suggests Strategic Playbook as the next big move.',
    'We must double down on strategic playbook before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    150,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-synergy',
    'frictionless-synergy',
    'Frictionless Synergy',
    'Frictionless Synergy promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The investor deck highlights frictionless synergy as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    151,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-experience',
    'omni-experience',
    'Omni Experience',
    'Omni Experience is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on omni experience.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    152,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-mindset',
    'crypto-mindset',
    'Crypto Mindset',
    'Executives use Crypto Mindset to inspire confidence, while the rest of the team quietly Googles it.',
    'Leadership wants KPIs tied directly to crypto mindset.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    153,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-alignment',
    'seamless-alignment',
    'Seamless Alignment',
    'Seamless Alignment is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on seamless alignment before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    154,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-roadmap',
    'smart-roadmap',
    'Smart Roadmap',
    'Smart Roadmap promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The investor deck highlights smart roadmap as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    155,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-enablement',
    'neural-enablement',
    'Neural Enablement',
    'No meeting is complete until someone suggests Neural Enablement as the next big move.',
    'The investor deck highlights neural enablement as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    156,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-journey',
    'frictionless-journey',
    'Frictionless Journey',
    'Teams invoke Frictionless Journey to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on frictionless journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    157,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-experience',
    'zero-trust-experience',
    'Zero-Trust Experience',
    'No meeting is complete until someone suggests Zero-Trust Experience as the next big move.',
    'Leadership wants KPIs tied directly to zero-trust experience.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    158,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-synergy',
    'cloud-synergy',
    'Cloud Synergy',
    'Cloud Synergy is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on cloud synergy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    159,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-metric',
    'lean-metric',
    'Lean Metric',
    'Think of Lean Metric as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to lean metric.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    160,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-integration',
    'scalable-integration',
    'Scalable Integration',
    'Scalable Integration sounds like the future but usually translates into another layer of PowerPoint slides.',
    'We must double down on scalable integration before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    161,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-integration',
    'next-gen-integration',
    'Next-Gen Integration',
    'Next-Gen Integration sounds like the future but usually translates into another layer of PowerPoint slides.',
    'We must double down on next-gen integration before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    162,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-strategy',
    'hybrid-strategy',
    'Hybrid Strategy',
    'Executives use Hybrid Strategy to inspire confidence, while the rest of the team quietly Googles it.',
    'The Q4 offsite is focused entirely on hybrid strategy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    163,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-solution',
    'neural-solution',
    'Neural Solution',
    'When someone says Neural Solution, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Leadership wants KPIs tied directly to neural solution.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    164,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-experience',
    'strategic-experience',
    'Strategic Experience',
    'Strategic Experience sounds like the future but usually translates into another layer of PowerPoint slides.',
    'We must double down on strategic experience before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    165,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-solution',
    'predictive-solution',
    'Predictive Solution',
    'More of a mantra than a method, Predictive Solution thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing predictive solution ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    166,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-initiative',
    'hybrid-initiative',
    'Hybrid Initiative',
    'Hybrid Initiative sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The Q4 offsite is focused entirely on hybrid initiative.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    167,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-strategy',
    'personalized-strategy',
    'Personalized Strategy',
    'Despite its futuristic vibe, Personalized Strategy often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing personalized strategy ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    168,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-loop',
    'neural-loop',
    'Neural Loop',
    'Teams invoke Neural Loop to suggest momentum, even when standing still.',
    'Leadership wants KPIs tied directly to neural loop.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    169,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-solution',
    'cross-solution',
    'Cross Solution',
    'Think of Cross Solution as corporate poetry: pretty words, little substance.',
    'Our roadmap hinges on embracing cross solution ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    170,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-alignment',
    'hyper-alignment',
    'Hyper Alignment',
    'Teams invoke Hyper Alignment to suggest momentum, even when standing still.',
    'We must double down on hyper alignment before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    171,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-engagement',
    'meta-engagement',
    'Meta Engagement',
    'Meta Engagement promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to meta engagement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    172,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-metric',
    'cross-metric',
    'Cross Metric',
    'No meeting is complete until someone suggests Cross Metric as the next big move.',
    'The investor deck highlights cross metric as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    173,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-mindset',
    'lean-mindset',
    'Lean Mindset',
    'When someone says Lean Mindset, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on lean mindset before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    174,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-transformation',
    'hyper-transformation',
    'Hyper Transformation',
    'When someone says Hyper Transformation, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on hyper transformation.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    175,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-ecosystem',
    'holistic-ecosystem',
    'Holistic Ecosystem',
    'Executives use Holistic Ecosystem to inspire confidence, while the rest of the team quietly Googles it.',
    'The Q4 offsite is focused entirely on holistic ecosystem.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    176,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-ecosystem',
    'predictive-ecosystem',
    'Predictive Ecosystem',
    'More of a mantra than a method, Predictive Ecosystem thrives in quarterly reports and keynote speeches.',
    'The Q4 offsite is focused entirely on predictive ecosystem.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    177,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-framework',
    'agile-framework',
    'Agile Framework',
    'Executives use Agile Framework to inspire confidence, while the rest of the team quietly Googles it.',
    'The Q4 offsite is focused entirely on agile framework.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    178,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-journey',
    'smart-journey',
    'Smart Journey',
    'Smart Journey promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Our roadmap hinges on embracing smart journey ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    179,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-orchestration',
    'quantum-orchestration',
    'Quantum Orchestration',
    'No meeting is complete until someone suggests Quantum Orchestration as the next big move.',
    'Leadership wants KPIs tied directly to quantum orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    180,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-initiative',
    'meta-initiative',
    'Meta Initiative',
    'Think of Meta Initiative as corporate poetry: pretty words, little substance.',
    'We must double down on meta initiative before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    181,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-roadmap',
    'next-gen-roadmap',
    'Next-Gen Roadmap',
    'When someone says Next-Gen Roadmap, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on next-gen roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    182,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-orchestration',
    'zero-trust-orchestration',
    'Zero-Trust Orchestration',
    'Think of Zero-Trust Orchestration as corporate poetry: pretty words, little substance.',
    'The investor deck highlights zero-trust orchestration as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    183,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-transformation',
    'synergy-transformation',
    'Synergy Transformation',
    'More of a mantra than a method, Synergy Transformation thrives in quarterly reports and keynote speeches.',
    'Leadership wants KPIs tied directly to synergy transformation.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    184,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-optimization',
    'virtual-optimization',
    'Virtual Optimization',
    'Executives use Virtual Optimization to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights virtual optimization as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    185,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-loop',
    'virtual-loop',
    'Virtual Loop',
    'Think of Virtual Loop as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to virtual loop.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    186,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-touchpoint',
    'personalized-touchpoint',
    'Personalized Touchpoint',
    'No meeting is complete until someone suggests Personalized Touchpoint as the next big move.',
    'The investor deck highlights personalized touchpoint as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    187,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-roadmap',
    'predictive-roadmap',
    'Predictive Roadmap',
    'Predictive Roadmap promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on predictive roadmap before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    188,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-journey',
    'personalized-journey',
    'Personalized Journey',
    'Despite its futuristic vibe, Personalized Journey often results in the same status quo under a trendier label.',
    'We must double down on personalized journey before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    189,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-framework',
    'cross-framework',
    'Cross Framework',
    'Think of Cross Framework as corporate poetry: pretty words, little substance.',
    'The investor deck highlights cross framework as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    190,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-paradigm',
    'predictive-paradigm',
    'Predictive Paradigm',
    'Executives use Predictive Paradigm to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights predictive paradigm as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    191,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-engagement',
    'scalable-engagement',
    'Scalable Engagement',
    'Teams invoke Scalable Engagement to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on scalable engagement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    192,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-transformation',
    'quantum-transformation',
    'Quantum Transformation',
    'Quantum Transformation sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The Q4 offsite is focused entirely on quantum transformation.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    193,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-pipeline',
    'frictionless-pipeline',
    'Frictionless Pipeline',
    'Teams invoke Frictionless Pipeline to suggest momentum, even when standing still.',
    'We must double down on frictionless pipeline before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    194,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-ecosystem',
    'virtual-ecosystem',
    'Virtual Ecosystem',
    'No meeting is complete until someone suggests Virtual Ecosystem as the next big move.',
    'Our roadmap hinges on embracing virtual ecosystem ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    195,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-transformation',
    'frictionless-transformation',
    'Frictionless Transformation',
    'No meeting is complete until someone suggests Frictionless Transformation as the next big move.',
    'We must double down on frictionless transformation before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    196,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-synergy',
    'agile-synergy',
    'Agile Synergy',
    'No meeting is complete until someone suggests Agile Synergy as the next big move.',
    'Our roadmap hinges on embracing agile synergy ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    197,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-optimization',
    'smart-optimization',
    'Smart Optimization',
    'Think of Smart Optimization as corporate poetry: pretty words, little substance.',
    'The investor deck highlights smart optimization as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    198,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-ecosystem',
    'circular-ecosystem',
    'Circular Ecosystem',
    'Circular Ecosystem promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to circular ecosystem.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    199,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-roadmap',
    'crypto-roadmap',
    'Crypto Roadmap',
    'Think of Crypto Roadmap as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to crypto roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    200,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-ecosystem',
    'synergy-ecosystem',
    'Synergy Ecosystem',
    'Think of Synergy Ecosystem as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on synergy ecosystem.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    201,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-playbook',
    'disruptive-playbook',
    'Disruptive Playbook',
    'Disruptive Playbook is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on disruptive playbook before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    202,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-pipeline',
    'dynamic-pipeline',
    'Dynamic Pipeline',
    'Teams invoke Dynamic Pipeline to suggest momentum, even when standing still.',
    'Our roadmap hinges on embracing dynamic pipeline ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    203,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-mindset',
    'zero-trust-mindset',
    'Zero-Trust Mindset',
    'Despite its futuristic vibe, Zero-Trust Mindset often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing zero-trust mindset ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    204,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-alignment',
    'disruptive-alignment',
    'Disruptive Alignment',
    'Despite its futuristic vibe, Disruptive Alignment often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing disruptive alignment ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    205,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-initiative',
    'crypto-initiative',
    'Crypto Initiative',
    'No meeting is complete until someone suggests Crypto Initiative as the next big move.',
    'The Q4 offsite is focused entirely on crypto initiative.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    206,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-engagement',
    'predictive-engagement',
    'Predictive Engagement',
    'Think of Predictive Engagement as corporate poetry: pretty words, little substance.',
    'Our roadmap hinges on embracing predictive engagement ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    207,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-architecture',
    'zero-trust-architecture',
    'Zero-Trust Architecture',
    'Despite its futuristic vibe, Zero-Trust Architecture often results in the same status quo under a trendier label.',
    'The investor deck highlights zero-trust architecture as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    208,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-framework',
    'hybrid-framework',
    'Hybrid Framework',
    'Despite its futuristic vibe, Hybrid Framework often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on hybrid framework.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    209,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-initiative',
    'quantum-initiative',
    'Quantum Initiative',
    'Despite its futuristic vibe, Quantum Initiative often results in the same status quo under a trendier label.',
    'The investor deck highlights quantum initiative as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    210,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-touchpoint',
    'neural-touchpoint',
    'Neural Touchpoint',
    'Executives use Neural Touchpoint to inspire confidence, while the rest of the team quietly Googles it.',
    'Leadership wants KPIs tied directly to neural touchpoint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    211,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-optimization',
    'cloud-optimization',
    'Cloud Optimization',
    'Cloud Optimization sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The investor deck highlights cloud optimization as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    212,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-architecture',
    'circular-architecture',
    'Circular Architecture',
    'Executives use Circular Architecture to inspire confidence, while the rest of the team quietly Googles it.',
    'The Q4 offsite is focused entirely on circular architecture.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    213,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-enablement',
    'scalable-enablement',
    'Scalable Enablement',
    'Scalable Enablement promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to scalable enablement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    214,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-optimization',
    'crypto-optimization',
    'Crypto Optimization',
    'Crypto Optimization is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Our roadmap hinges on embracing crypto optimization ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    215,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-architecture',
    'synergy-architecture',
    'Synergy Architecture',
    'Think of Synergy Architecture as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on synergy architecture.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    216,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-solution',
    'next-gen-solution',
    'Next-Gen Solution',
    'No meeting is complete until someone suggests Next-Gen Solution as the next big move.',
    'We must double down on next-gen solution before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    217,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-loop',
    'strategic-loop',
    'Strategic Loop',
    'Executives use Strategic Loop to inspire confidence, while the rest of the team quietly Googles it.',
    'The Q4 offsite is focused entirely on strategic loop.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    218,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-playbook',
    'omni-playbook',
    'Omni Playbook',
    'Omni Playbook sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Leadership wants KPIs tied directly to omni playbook.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    219,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-architecture',
    'virtual-architecture',
    'Virtual Architecture',
    'No meeting is complete until someone suggests Virtual Architecture as the next big move.',
    'The investor deck highlights virtual architecture as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    220,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-blueprint',
    'hyper-blueprint',
    'Hyper Blueprint',
    'More of a mantra than a method, Hyper Blueprint thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing hyper blueprint ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    221,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-solution',
    'dynamic-solution',
    'Dynamic Solution',
    'Despite its futuristic vibe, Dynamic Solution often results in the same status quo under a trendier label.',
    'Leadership wants KPIs tied directly to dynamic solution.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    222,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-architecture',
    'smart-architecture',
    'Smart Architecture',
    'When someone says Smart Architecture, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on smart architecture before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    223,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-mindset',
    'agile-mindset',
    'Agile Mindset',
    'Agile Mindset is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on agile mindset.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    224,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-initiative',
    'neural-initiative',
    'Neural Initiative',
    'Neural Initiative sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Our roadmap hinges on embracing neural initiative ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    225,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-touchpoint',
    'future-proof-touchpoint',
    'Future-Proof Touchpoint',
    'Think of Future-Proof Touchpoint as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on future-proof touchpoint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    226,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-mindset',
    'strategic-mindset',
    'Strategic Mindset',
    'More of a mantra than a method, Strategic Mindset thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights strategic mindset as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    227,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-optimization',
    'transformational-optimization',
    'Transformational Optimization',
    'Transformational Optimization promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on transformational optimization before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    228,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-synergy',
    'neural-synergy',
    'Neural Synergy',
    'Think of Neural Synergy as corporate poetry: pretty words, little substance.',
    'The investor deck highlights neural synergy as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    229,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-framework',
    'future-proof-framework',
    'Future-Proof Framework',
    'Think of Future-Proof Framework as corporate poetry: pretty words, little substance.',
    'The investor deck highlights future-proof framework as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    230,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-ecosystem',
    'omni-ecosystem',
    'Omni Ecosystem',
    'More of a mantra than a method, Omni Ecosystem thrives in quarterly reports and keynote speeches.',
    'The Q4 offsite is focused entirely on omni ecosystem.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    231,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-optimization',
    'quantum-optimization',
    'Quantum Optimization',
    'Teams invoke Quantum Optimization to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on quantum optimization.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    232,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-loop',
    'cross-loop',
    'Cross Loop',
    'Executives use Cross Loop to inspire confidence, while the rest of the team quietly Googles it.',
    'Leadership wants KPIs tied directly to cross loop.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    233,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-metric',
    'agile-metric',
    'Agile Metric',
    'More of a mantra than a method, Agile Metric thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing agile metric ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    234,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-optimization',
    'agile-optimization',
    'Agile Optimization',
    'Think of Agile Optimization as corporate poetry: pretty words, little substance.',
    'Our roadmap hinges on embracing agile optimization ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    235,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-integration',
    'predictive-integration',
    'Predictive Integration',
    'When someone says Predictive Integration, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on predictive integration before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    236,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-touchpoint',
    'quantum-touchpoint',
    'Quantum Touchpoint',
    'Quantum Touchpoint promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to quantum touchpoint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    237,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-enablement',
    'quantum-enablement',
    'Quantum Enablement',
    'Executives use Quantum Enablement to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing quantum enablement ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    238,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-transformation',
    'next-gen-transformation',
    'Next-Gen Transformation',
    'Executives use Next-Gen Transformation to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights next-gen transformation as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    239,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-touchpoint',
    'dynamic-touchpoint',
    'Dynamic Touchpoint',
    'Despite its futuristic vibe, Dynamic Touchpoint often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on dynamic touchpoint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    240,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-alignment',
    'transformational-alignment',
    'Transformational Alignment',
    'More of a mantra than a method, Transformational Alignment thrives in quarterly reports and keynote speeches.',
    'Leadership wants KPIs tied directly to transformational alignment.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    241,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-pipeline',
    'disruptive-pipeline',
    'Disruptive Pipeline',
    'More of a mantra than a method, Disruptive Pipeline thrives in quarterly reports and keynote speeches.',
    'We must double down on disruptive pipeline before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    242,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-mindset',
    'smart-mindset',
    'Smart Mindset',
    'More of a mantra than a method, Smart Mindset thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights smart mindset as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    243,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-roadmap',
    'virtual-roadmap',
    'Virtual Roadmap',
    'Despite its futuristic vibe, Virtual Roadmap often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on virtual roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    244,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-initiative',
    'next-gen-initiative',
    'Next-Gen Initiative',
    'Next-Gen Initiative is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Our roadmap hinges on embracing next-gen initiative ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    245,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-roadmap',
    'personalized-roadmap',
    'Personalized Roadmap',
    'Executives use Personalized Roadmap to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights personalized roadmap as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    246,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-strategy',
    'cloud-strategy',
    'Cloud Strategy',
    'Cloud Strategy is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on cloud strategy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    247,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-solution',
    'smart-solution',
    'Smart Solution',
    'When someone says Smart Solution, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The investor deck highlights smart solution as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    248,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-synergy',
    'disruptive-synergy',
    'Disruptive Synergy',
    'Disruptive Synergy is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on disruptive synergy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    249,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-mindset',
    'next-gen-mindset',
    'Next-Gen Mindset',
    'Next-Gen Mindset is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on next-gen mindset before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    250,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-experience',
    'next-gen-experience',
    'Next-Gen Experience',
    'Teams invoke Next-Gen Experience to suggest momentum, even when standing still.',
    'We must double down on next-gen experience before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    251,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-architecture',
    'cross-architecture',
    'Cross Architecture',
    'Executives use Cross Architecture to inspire confidence, while the rest of the team quietly Googles it.',
    'Leadership wants KPIs tied directly to cross architecture.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    252,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-engagement',
    'strategic-engagement',
    'Strategic Engagement',
    'No meeting is complete until someone suggests Strategic Engagement as the next big move.',
    'The investor deck highlights strategic engagement as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    253,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-orchestration',
    'hybrid-orchestration',
    'Hybrid Orchestration',
    'More of a mantra than a method, Hybrid Orchestration thrives in quarterly reports and keynote speeches.',
    'We must double down on hybrid orchestration before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    254,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-pipeline',
    'crypto-pipeline',
    'Crypto Pipeline',
    'No meeting is complete until someone suggests Crypto Pipeline as the next big move.',
    'The investor deck highlights crypto pipeline as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    255,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-strategy',
    'quantum-strategy',
    'Quantum Strategy',
    'Teams invoke Quantum Strategy to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on quantum strategy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    256,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-orchestration',
    'agile-orchestration',
    'Agile Orchestration',
    'When someone says Agile Orchestration, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on agile orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    257,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-engagement',
    'hybrid-engagement',
    'Hybrid Engagement',
    'Hybrid Engagement promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on hybrid engagement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    258,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-solution',
    'frictionless-solution',
    'Frictionless Solution',
    'When someone says Frictionless Solution, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on frictionless solution before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    259,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-playbook',
    'virtual-playbook',
    'Virtual Playbook',
    'Despite its futuristic vibe, Virtual Playbook often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing virtual playbook ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    260,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-paradigm',
    'next-gen-paradigm',
    'Next-Gen Paradigm',
    'Think of Next-Gen Paradigm as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to next-gen paradigm.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    261,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-initiative',
    'lean-initiative',
    'Lean Initiative',
    'Despite its futuristic vibe, Lean Initiative often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing lean initiative ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    262,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-orchestration',
    'crypto-orchestration',
    'Crypto Orchestration',
    'Teams invoke Crypto Orchestration to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on crypto orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    263,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-playbook',
    'future-proof-playbook',
    'Future-Proof Playbook',
    'Despite its futuristic vibe, Future-Proof Playbook often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing future-proof playbook ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    264,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-journey',
    'hybrid-journey',
    'Hybrid Journey',
    'No meeting is complete until someone suggests Hybrid Journey as the next big move.',
    'Leadership wants KPIs tied directly to hybrid journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    265,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-initiative',
    'seamless-initiative',
    'Seamless Initiative',
    'Seamless Initiative is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on seamless initiative before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    266,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-paradigm',
    'personalized-paradigm',
    'Personalized Paradigm',
    'Personalized Paradigm is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on personalized paradigm before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    267,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-experience',
    'smart-experience',
    'Smart Experience',
    'No meeting is complete until someone suggests Smart Experience as the next big move.',
    'We must double down on smart experience before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    268,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-pipeline',
    'cloud-pipeline',
    'Cloud Pipeline',
    'When someone says Cloud Pipeline, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The investor deck highlights cloud pipeline as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    269,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-ecosystem',
    'future-proof-ecosystem',
    'Future-Proof Ecosystem',
    'Despite its futuristic vibe, Future-Proof Ecosystem often results in the same status quo under a trendier label.',
    'The investor deck highlights future-proof ecosystem as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    270,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-metric',
    'quantum-metric',
    'Quantum Metric',
    'Quantum Metric is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Our roadmap hinges on embracing quantum metric ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    271,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-experience',
    'personalized-experience',
    'Personalized Experience',
    'Personalized Experience is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Our roadmap hinges on embracing personalized experience ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    272,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-solution',
    'transformational-solution',
    'Transformational Solution',
    'When someone says Transformational Solution, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on transformational solution.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    273,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-orchestration',
    'transformational-orchestration',
    'Transformational Orchestration',
    'Despite its futuristic vibe, Transformational Orchestration often results in the same status quo under a trendier label.',
    'We must double down on transformational orchestration before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    274,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-pipeline',
    'smart-pipeline',
    'Smart Pipeline',
    'Executives use Smart Pipeline to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights smart pipeline as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    275,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-synergy',
    'crypto-synergy',
    'Crypto Synergy',
    'More of a mantra than a method, Crypto Synergy thrives in quarterly reports and keynote speeches.',
    'The Q4 offsite is focused entirely on crypto synergy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    276,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-experience',
    'holistic-experience',
    'Holistic Experience',
    'Holistic Experience is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to holistic experience.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    277,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-journey',
    'strategic-journey',
    'Strategic Journey',
    'More of a mantra than a method, Strategic Journey thrives in quarterly reports and keynote speeches.',
    'Leadership wants KPIs tied directly to strategic journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    278,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-framework',
    'dynamic-framework',
    'Dynamic Framework',
    'Think of Dynamic Framework as corporate poetry: pretty words, little substance.',
    'Our roadmap hinges on embracing dynamic framework ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    279,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-engagement',
    'crypto-engagement',
    'Crypto Engagement',
    'No meeting is complete until someone suggests Crypto Engagement as the next big move.',
    'Leadership wants KPIs tied directly to crypto engagement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    280,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-metric',
    'cloud-metric',
    'Cloud Metric',
    'Despite its futuristic vibe, Cloud Metric often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing cloud metric ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    281,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-journey',
    'cloud-journey',
    'Cloud Journey',
    'Think of Cloud Journey as corporate poetry: pretty words, little substance.',
    'We must double down on cloud journey before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    282,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-framework',
    'neural-framework',
    'Neural Framework',
    'Neural Framework sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The Q4 offsite is focused entirely on neural framework.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    283,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-framework',
    'quantum-framework',
    'Quantum Framework',
    'Quantum Framework sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Leadership wants KPIs tied directly to quantum framework.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    284,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-experience',
    'cloud-experience',
    'Cloud Experience',
    'Cloud Experience promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on cloud experience.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    285,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-transformation',
    'scalable-transformation',
    'Scalable Transformation',
    'Executives use Scalable Transformation to inspire confidence, while the rest of the team quietly Googles it.',
    'We must double down on scalable transformation before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    286,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-enablement',
    'predictive-enablement',
    'Predictive Enablement',
    'More of a mantra than a method, Predictive Enablement thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights predictive enablement as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    287,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-ecosystem',
    'frictionless-ecosystem',
    'Frictionless Ecosystem',
    'Frictionless Ecosystem promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on frictionless ecosystem.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    288,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-journey',
    'future-proof-journey',
    'Future-Proof Journey',
    'Executives use Future-Proof Journey to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights future-proof journey as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    289,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-synergy',
    'synergy-synergy',
    'Synergy Synergy',
    'Synergy Synergy sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Leadership wants KPIs tied directly to synergy synergy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    290,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-metric',
    'dynamic-metric',
    'Dynamic Metric',
    'Despite its futuristic vibe, Dynamic Metric often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing dynamic metric ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    291,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-paradigm',
    'seamless-paradigm',
    'Seamless Paradigm',
    'Seamless Paradigm sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The investor deck highlights seamless paradigm as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    292,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-solution',
    'quantum-solution',
    'Quantum Solution',
    'Despite its futuristic vibe, Quantum Solution often results in the same status quo under a trendier label.',
    'We must double down on quantum solution before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    293,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-framework',
    'transformational-framework',
    'Transformational Framework',
    'Think of Transformational Framework as corporate poetry: pretty words, little substance.',
    'The investor deck highlights transformational framework as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    294,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-blueprint',
    'virtual-blueprint',
    'Virtual Blueprint',
    'More of a mantra than a method, Virtual Blueprint thrives in quarterly reports and keynote speeches.',
    'The Q4 offsite is focused entirely on virtual blueprint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    295,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-orchestration',
    'circular-orchestration',
    'Circular Orchestration',
    'Despite its futuristic vibe, Circular Orchestration often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on circular orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    296,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-solution',
    'meta-solution',
    'Meta Solution',
    'More of a mantra than a method, Meta Solution thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights meta solution as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    297,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-paradigm',
    'synergy-paradigm',
    'Synergy Paradigm',
    'Think of Synergy Paradigm as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to synergy paradigm.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    298,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-architecture',
    'predictive-architecture',
    'Predictive Architecture',
    'Think of Predictive Architecture as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to predictive architecture.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    299,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-architecture',
    'neural-architecture',
    'Neural Architecture',
    'Neural Architecture sounds like the future but usually translates into another layer of PowerPoint slides.',
    'We must double down on neural architecture before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    300,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-engagement',
    'omni-engagement',
    'Omni Engagement',
    'Omni Engagement is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on omni engagement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    301,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-transformation',
    'circular-transformation',
    'Circular Transformation',
    'When someone says Circular Transformation, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on circular transformation.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    302,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-strategy',
    'seamless-strategy',
    'Seamless Strategy',
    'Despite its futuristic vibe, Seamless Strategy often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing seamless strategy ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    303,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-initiative',
    'transformational-initiative',
    'Transformational Initiative',
    'Transformational Initiative sounds like the future but usually translates into another layer of PowerPoint slides.',
    'We must double down on transformational initiative before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    304,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-loop',
    'scalable-loop',
    'Scalable Loop',
    'Scalable Loop promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The investor deck highlights scalable loop as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    305,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-integration',
    'transformational-integration',
    'Transformational Integration',
    'No meeting is complete until someone suggests Transformational Integration as the next big move.',
    'The Q4 offsite is focused entirely on transformational integration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    306,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-metric',
    'frictionless-metric',
    'Frictionless Metric',
    'When someone says Frictionless Metric, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Leadership wants KPIs tied directly to frictionless metric.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    307,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-strategy',
    'future-proof-strategy',
    'Future-Proof Strategy',
    'Future-Proof Strategy sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The Q4 offsite is focused entirely on future-proof strategy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    308,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-alignment',
    'personalized-alignment',
    'Personalized Alignment',
    'Executives use Personalized Alignment to inspire confidence, while the rest of the team quietly Googles it.',
    'We must double down on personalized alignment before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    309,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-synergy',
    'quantum-synergy',
    'Quantum Synergy',
    'Think of Quantum Synergy as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on quantum synergy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    310,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-integration',
    'crypto-integration',
    'Crypto Integration',
    'When someone says Crypto Integration, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on crypto integration before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    311,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-loop',
    'circular-loop',
    'Circular Loop',
    'Despite its futuristic vibe, Circular Loop often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing circular loop ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    312,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-alignment',
    'smart-alignment',
    'Smart Alignment',
    'More of a mantra than a method, Smart Alignment thrives in quarterly reports and keynote speeches.',
    'Leadership wants KPIs tied directly to smart alignment.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    313,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-roadmap',
    'synergy-roadmap',
    'Synergy Roadmap',
    'Despite its futuristic vibe, Synergy Roadmap often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing synergy roadmap ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    314,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-mindset',
    'seamless-mindset',
    'Seamless Mindset',
    'Executives use Seamless Mindset to inspire confidence, while the rest of the team quietly Googles it.',
    'The Q4 offsite is focused entirely on seamless mindset.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    315,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-framework',
    'lean-framework',
    'Lean Framework',
    'Lean Framework is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to lean framework.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    316,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-roadmap',
    'quantum-roadmap',
    'Quantum Roadmap',
    'Quantum Roadmap sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The Q4 offsite is focused entirely on quantum roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    317,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-strategy',
    'omni-strategy',
    'Omni Strategy',
    'Omni Strategy promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on omni strategy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    318,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-integration',
    'hybrid-integration',
    'Hybrid Integration',
    'Think of Hybrid Integration as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to hybrid integration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    319,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-pipeline',
    'predictive-pipeline',
    'Predictive Pipeline',
    'When someone says Predictive Pipeline, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Our roadmap hinges on embracing predictive pipeline ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    320,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-integration',
    'disruptive-integration',
    'Disruptive Integration',
    'Teams invoke Disruptive Integration to suggest momentum, even when standing still.',
    'We must double down on disruptive integration before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    321,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-journey',
    'scalable-journey',
    'Scalable Journey',
    'Scalable Journey promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to scalable journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    322,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-strategy',
    'lean-strategy',
    'Lean Strategy',
    'No meeting is complete until someone suggests Lean Strategy as the next big move.',
    'The investor deck highlights lean strategy as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    323,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-initiative',
    'virtual-initiative',
    'Virtual Initiative',
    'More of a mantra than a method, Virtual Initiative thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights virtual initiative as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    324,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-transformation',
    'meta-transformation',
    'Meta Transformation',
    'Teams invoke Meta Transformation to suggest momentum, even when standing still.',
    'Leadership wants KPIs tied directly to meta transformation.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    325,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-blueprint',
    'crypto-blueprint',
    'Crypto Blueprint',
    'When someone says Crypto Blueprint, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Leadership wants KPIs tied directly to crypto blueprint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    326,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-integration',
    'cloud-integration',
    'Cloud Integration',
    'Think of Cloud Integration as corporate poetry: pretty words, little substance.',
    'Our roadmap hinges on embracing cloud integration ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    327,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-journey',
    'holistic-journey',
    'Holistic Journey',
    'Holistic Journey promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to holistic journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    328,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-journey',
    'seamless-journey',
    'Seamless Journey',
    'Teams invoke Seamless Journey to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on seamless journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    329,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-synergy',
    'zero-trust-synergy',
    'Zero-Trust Synergy',
    'Zero-Trust Synergy sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Our roadmap hinges on embracing zero-trust synergy ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    330,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-transformation',
    'virtual-transformation',
    'Virtual Transformation',
    'Virtual Transformation is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The investor deck highlights virtual transformation as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    331,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-touchpoint',
    'meta-touchpoint',
    'Meta Touchpoint',
    'Meta Touchpoint is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on meta touchpoint before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    332,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-playbook',
    'cross-playbook',
    'Cross Playbook',
    'More of a mantra than a method, Cross Playbook thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights cross playbook as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    333,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-initiative',
    'cross-initiative',
    'Cross Initiative',
    'More of a mantra than a method, Cross Initiative thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing cross initiative ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    334,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-touchpoint',
    'omni-touchpoint',
    'Omni Touchpoint',
    'Omni Touchpoint sounds like the future but usually translates into another layer of PowerPoint slides.',
    'We must double down on omni touchpoint before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    335,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-synergy',
    'lean-synergy',
    'Lean Synergy',
    'Despite its futuristic vibe, Lean Synergy often results in the same status quo under a trendier label.',
    'We must double down on lean synergy before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    336,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-loop',
    'omni-loop',
    'Omni Loop',
    'Executives use Omni Loop to inspire confidence, while the rest of the team quietly Googles it.',
    'We must double down on omni loop before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    337,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-synergy',
    'predictive-synergy',
    'Predictive Synergy',
    'Executives use Predictive Synergy to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing predictive synergy ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    338,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-metric',
    'scalable-metric',
    'Scalable Metric',
    'More of a mantra than a method, Scalable Metric thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights scalable metric as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    339,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-transformation',
    'zero-trust-transformation',
    'Zero-Trust Transformation',
    'Zero-Trust Transformation promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to zero-trust transformation.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    340,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-blueprint',
    'future-proof-blueprint',
    'Future-Proof Blueprint',
    'Executives use Future-Proof Blueprint to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing future-proof blueprint ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    341,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-touchpoint',
    'predictive-touchpoint',
    'Predictive Touchpoint',
    'When someone says Predictive Touchpoint, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on predictive touchpoint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    342,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-orchestration',
    'dynamic-orchestration',
    'Dynamic Orchestration',
    'Think of Dynamic Orchestration as corporate poetry: pretty words, little substance.',
    'The investor deck highlights dynamic orchestration as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    343,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-paradigm',
    'zero-trust-paradigm',
    'Zero-Trust Paradigm',
    'No meeting is complete until someone suggests Zero-Trust Paradigm as the next big move.',
    'The investor deck highlights zero-trust paradigm as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    344,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-integration',
    'quantum-integration',
    'Quantum Integration',
    'Quantum Integration promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on quantum integration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    345,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-strategy',
    'dynamic-strategy',
    'Dynamic Strategy',
    'Dynamic Strategy sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The investor deck highlights dynamic strategy as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    346,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-journey',
    'predictive-journey',
    'Predictive Journey',
    'Think of Predictive Journey as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to predictive journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    347,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-integration',
    'circular-integration',
    'Circular Integration',
    'Think of Circular Integration as corporate poetry: pretty words, little substance.',
    'Our roadmap hinges on embracing circular integration ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    348,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-loop',
    'zero-trust-loop',
    'Zero-Trust Loop',
    'More of a mantra than a method, Zero-Trust Loop thrives in quarterly reports and keynote speeches.',
    'Leadership wants KPIs tied directly to zero-trust loop.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    349,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-ecosystem',
    'dynamic-ecosystem',
    'Dynamic Ecosystem',
    'More of a mantra than a method, Dynamic Ecosystem thrives in quarterly reports and keynote speeches.',
    'We must double down on dynamic ecosystem before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    350,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-framework',
    'holistic-framework',
    'Holistic Framework',
    'Despite its futuristic vibe, Holistic Framework often results in the same status quo under a trendier label.',
    'Leadership wants KPIs tied directly to holistic framework.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    351,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-strategy',
    'next-gen-strategy',
    'Next-Gen Strategy',
    'Next-Gen Strategy promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The investor deck highlights next-gen strategy as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    352,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-alignment',
    'virtual-alignment',
    'Virtual Alignment',
    'Despite its futuristic vibe, Virtual Alignment often results in the same status quo under a trendier label.',
    'We must double down on virtual alignment before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    353,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-roadmap',
    'omni-roadmap',
    'Omni Roadmap',
    'More of a mantra than a method, Omni Roadmap thrives in quarterly reports and keynote speeches.',
    'The Q4 offsite is focused entirely on omni roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    354,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-metric',
    'circular-metric',
    'Circular Metric',
    'Executives use Circular Metric to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing circular metric ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    355,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-synergy',
    'hybrid-synergy',
    'Hybrid Synergy',
    'No meeting is complete until someone suggests Hybrid Synergy as the next big move.',
    'Our roadmap hinges on embracing hybrid synergy ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    356,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-enablement',
    'smart-enablement',
    'Smart Enablement',
    'Teams invoke Smart Enablement to suggest momentum, even when standing still.',
    'Leadership wants KPIs tied directly to smart enablement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    357,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-mindset',
    'dynamic-mindset',
    'Dynamic Mindset',
    'Dynamic Mindset is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The investor deck highlights dynamic mindset as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    358,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-solution',
    'crypto-solution',
    'Crypto Solution',
    'Crypto Solution promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Our roadmap hinges on embracing crypto solution ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    359,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-engagement',
    'neural-engagement',
    'Neural Engagement',
    'Neural Engagement sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Leadership wants KPIs tied directly to neural engagement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    360,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-metric',
    'next-gen-metric',
    'Next-Gen Metric',
    'When someone says Next-Gen Metric, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Our roadmap hinges on embracing next-gen metric ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    361,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_crypto-enablement',
    'crypto-enablement',
    'Crypto Enablement',
    'Crypto Enablement promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to crypto enablement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    362,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-alignment',
    'cloud-alignment',
    'Cloud Alignment',
    'Cloud Alignment sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Our roadmap hinges on embracing cloud alignment ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    363,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-integration',
    'hyper-integration',
    'Hyper Integration',
    'Executives use Hyper Integration to inspire confidence, while the rest of the team quietly Googles it.',
    'Leadership wants KPIs tied directly to hyper integration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    364,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-playbook',
    'neural-playbook',
    'Neural Playbook',
    'Neural Playbook is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on neural playbook before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    365,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-integration',
    'virtual-integration',
    'Virtual Integration',
    'Virtual Integration is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to virtual integration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    366,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-roadmap',
    'scalable-roadmap',
    'Scalable Roadmap',
    'Scalable Roadmap is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The investor deck highlights scalable roadmap as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    367,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-touchpoint',
    'frictionless-touchpoint',
    'Frictionless Touchpoint',
    'Despite its futuristic vibe, Frictionless Touchpoint often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on frictionless touchpoint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    368,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-paradigm',
    'cross-paradigm',
    'Cross Paradigm',
    'Despite its futuristic vibe, Cross Paradigm often results in the same status quo under a trendier label.',
    'Leadership wants KPIs tied directly to cross paradigm.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    369,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-optimization',
    'seamless-optimization',
    'Seamless Optimization',
    'Executives use Seamless Optimization to inspire confidence, while the rest of the team quietly Googles it.',
    'Leadership wants KPIs tied directly to seamless optimization.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    370,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-framework',
    'disruptive-framework',
    'Disruptive Framework',
    'Disruptive Framework promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The investor deck highlights disruptive framework as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    371,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-initiative',
    'smart-initiative',
    'Smart Initiative',
    'Despite its futuristic vibe, Smart Initiative often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing smart initiative ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    372,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-mindset',
    'neural-mindset',
    'Neural Mindset',
    'When someone says Neural Mindset, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on neural mindset before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    373,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-synergy',
    'virtual-synergy',
    'Virtual Synergy',
    'Virtual Synergy promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The investor deck highlights virtual synergy as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    374,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-blueprint',
    'omni-blueprint',
    'Omni Blueprint',
    'Despite its futuristic vibe, Omni Blueprint often results in the same status quo under a trendier label.',
    'The investor deck highlights omni blueprint as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    375,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-roadmap',
    'zero-trust-roadmap',
    'Zero-Trust Roadmap',
    'Zero-Trust Roadmap promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The investor deck highlights zero-trust roadmap as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    376,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-framework',
    'omni-framework',
    'Omni Framework',
    'Omni Framework promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to omni framework.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    377,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-orchestration',
    'cloud-orchestration',
    'Cloud Orchestration',
    'When someone says Cloud Orchestration, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Leadership wants KPIs tied directly to cloud orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    378,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-alignment',
    'zero-trust-alignment',
    'Zero-Trust Alignment',
    'Think of Zero-Trust Alignment as corporate poetry: pretty words, little substance.',
    'We must double down on zero-trust alignment before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    379,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-initiative',
    'circular-initiative',
    'Circular Initiative',
    'Circular Initiative promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on circular initiative.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    380,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-strategy',
    'predictive-strategy',
    'Predictive Strategy',
    'Think of Predictive Strategy as corporate poetry: pretty words, little substance.',
    'The investor deck highlights predictive strategy as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    381,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-enablement',
    'virtual-enablement',
    'Virtual Enablement',
    'When someone says Virtual Enablement, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The investor deck highlights virtual enablement as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    382,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-strategy',
    'disruptive-strategy',
    'Disruptive Strategy',
    'Executives use Disruptive Strategy to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights disruptive strategy as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    383,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-framework',
    'circular-framework',
    'Circular Framework',
    'No meeting is complete until someone suggests Circular Framework as the next big move.',
    'We must double down on circular framework before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    384,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-blueprint',
    'hybrid-blueprint',
    'Hybrid Blueprint',
    'Despite its futuristic vibe, Hybrid Blueprint often results in the same status quo under a trendier label.',
    'Leadership wants KPIs tied directly to hybrid blueprint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    385,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-alignment',
    'future-proof-alignment',
    'Future-Proof Alignment',
    'Future-Proof Alignment promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The investor deck highlights future-proof alignment as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    386,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_zero-trust-enablement',
    'zero-trust-enablement',
    'Zero-Trust Enablement',
    'Think of Zero-Trust Enablement as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to zero-trust enablement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    387,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-integration',
    'meta-integration',
    'Meta Integration',
    'More of a mantra than a method, Meta Integration thrives in quarterly reports and keynote speeches.',
    'We must double down on meta integration before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    388,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-optimization',
    'lean-optimization',
    'Lean Optimization',
    'Lean Optimization sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The investor deck highlights lean optimization as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    389,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-playbook',
    'seamless-playbook',
    'Seamless Playbook',
    'Seamless Playbook is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to seamless playbook.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    390,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-mindset',
    'quantum-mindset',
    'Quantum Mindset',
    'Executives use Quantum Mindset to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights quantum mindset as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    391,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-enablement',
    'cloud-enablement',
    'Cloud Enablement',
    'More of a mantra than a method, Cloud Enablement thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights cloud enablement as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    392,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-initiative',
    'hyper-initiative',
    'Hyper Initiative',
    'Hyper Initiative is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on hyper initiative before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    393,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-roadmap',
    'hyper-roadmap',
    'Hyper Roadmap',
    'When someone says Hyper Roadmap, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Leadership wants KPIs tied directly to hyper roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    394,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-paradigm',
    'transformational-paradigm',
    'Transformational Paradigm',
    'No meeting is complete until someone suggests Transformational Paradigm as the next big move.',
    'The Q4 offsite is focused entirely on transformational paradigm.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    395,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-blueprint',
    'cloud-blueprint',
    'Cloud Blueprint',
    'More of a mantra than a method, Cloud Blueprint thrives in quarterly reports and keynote speeches.',
    'The investor deck highlights cloud blueprint as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    396,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-pipeline',
    'omni-pipeline',
    'Omni Pipeline',
    'When someone says Omni Pipeline, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on omni pipeline.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    397,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-pipeline',
    'seamless-pipeline',
    'Seamless Pipeline',
    'Think of Seamless Pipeline as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to seamless pipeline.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    398,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-touchpoint',
    'transformational-touchpoint',
    'Transformational Touchpoint',
    'Executives use Transformational Touchpoint to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing transformational touchpoint ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    399,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-pipeline',
    'next-gen-pipeline',
    'Next-Gen Pipeline',
    'More of a mantra than a method, Next-Gen Pipeline thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing next-gen pipeline ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    400,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-paradigm',
    'neural-paradigm',
    'Neural Paradigm',
    'Think of Neural Paradigm as corporate poetry: pretty words, little substance.',
    'The investor deck highlights neural paradigm as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    401,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-roadmap',
    'transformational-roadmap',
    'Transformational Roadmap',
    'More of a mantra than a method, Transformational Roadmap thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing transformational roadmap ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    402,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-touchpoint',
    'cross-touchpoint',
    'Cross Touchpoint',
    'Despite its futuristic vibe, Cross Touchpoint often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on cross touchpoint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    403,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-blueprint',
    'disruptive-blueprint',
    'Disruptive Blueprint',
    'Think of Disruptive Blueprint as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on disruptive blueprint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    404,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-initiative',
    'scalable-initiative',
    'Scalable Initiative',
    'More of a mantra than a method, Scalable Initiative thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing scalable initiative ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    405,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-enablement',
    'seamless-enablement',
    'Seamless Enablement',
    'No meeting is complete until someone suggests Seamless Enablement as the next big move.',
    'We must double down on seamless enablement before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    406,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-engagement',
    'next-gen-engagement',
    'Next-Gen Engagement',
    'No meeting is complete until someone suggests Next-Gen Engagement as the next big move.',
    'The Q4 offsite is focused entirely on next-gen engagement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    407,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-roadmap',
    'holistic-roadmap',
    'Holistic Roadmap',
    'When someone says Holistic Roadmap, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Leadership wants KPIs tied directly to holistic roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    408,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-blueprint',
    'neural-blueprint',
    'Neural Blueprint',
    'Teams invoke Neural Blueprint to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on neural blueprint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    409,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-transformation',
    'future-proof-transformation',
    'Future-Proof Transformation',
    'Future-Proof Transformation sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Leadership wants KPIs tied directly to future-proof transformation.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    410,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-transformation',
    'holistic-transformation',
    'Holistic Transformation',
    'Teams invoke Holistic Transformation to suggest momentum, even when standing still.',
    'We must double down on holistic transformation before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    411,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-roadmap',
    'dynamic-roadmap',
    'Dynamic Roadmap',
    'Teams invoke Dynamic Roadmap to suggest momentum, even when standing still.',
    'Leadership wants KPIs tied directly to dynamic roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    412,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-architecture',
    'frictionless-architecture',
    'Frictionless Architecture',
    'Teams invoke Frictionless Architecture to suggest momentum, even when standing still.',
    'We must double down on frictionless architecture before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    413,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-architecture',
    'lean-architecture',
    'Lean Architecture',
    'Teams invoke Lean Architecture to suggest momentum, even when standing still.',
    'The Q4 offsite is focused entirely on lean architecture.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    414,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-experience',
    'dynamic-experience',
    'Dynamic Experience',
    'Dynamic Experience promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Our roadmap hinges on embracing dynamic experience ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    415,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-blueprint',
    'smart-blueprint',
    'Smart Blueprint',
    'Smart Blueprint sounds like the future but usually translates into another layer of PowerPoint slides.',
    'The investor deck highlights smart blueprint as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    416,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-solution',
    'personalized-solution',
    'Personalized Solution',
    'No meeting is complete until someone suggests Personalized Solution as the next big move.',
    'The investor deck highlights personalized solution as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    417,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-architecture',
    'disruptive-architecture',
    'Disruptive Architecture',
    'Think of Disruptive Architecture as corporate poetry: pretty words, little substance.',
    'We must double down on disruptive architecture before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    418,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-ecosystem',
    'transformational-ecosystem',
    'Transformational Ecosystem',
    'When someone says Transformational Ecosystem, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on transformational ecosystem before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    419,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-journey',
    'meta-journey',
    'Meta Journey',
    'More of a mantra than a method, Meta Journey thrives in quarterly reports and keynote speeches.',
    'Leadership wants KPIs tied directly to meta journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    420,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-enablement',
    'omni-enablement',
    'Omni Enablement',
    'Omni Enablement is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Our roadmap hinges on embracing omni enablement ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    421,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-blueprint',
    'circular-blueprint',
    'Circular Blueprint',
    'Circular Blueprint is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The investor deck highlights circular blueprint as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    422,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-touchpoint',
    'lean-touchpoint',
    'Lean Touchpoint',
    'Executives use Lean Touchpoint to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights lean touchpoint as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    423,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-solution',
    'seamless-solution',
    'Seamless Solution',
    'Despite its futuristic vibe, Seamless Solution often results in the same status quo under a trendier label.',
    'Leadership wants KPIs tied directly to seamless solution.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    424,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-pipeline',
    'transformational-pipeline',
    'Transformational Pipeline',
    'More of a mantra than a method, Transformational Pipeline thrives in quarterly reports and keynote speeches.',
    'We must double down on transformational pipeline before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    425,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-optimization',
    'hyper-optimization',
    'Hyper Optimization',
    'Executives use Hyper Optimization to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing hyper optimization ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    426,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-roadmap',
    'circular-roadmap',
    'Circular Roadmap',
    'Executives use Circular Roadmap to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing circular roadmap ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    427,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-loop',
    'dynamic-loop',
    'Dynamic Loop',
    'Executives use Dynamic Loop to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing dynamic loop ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    428,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-playbook',
    'quantum-playbook',
    'Quantum Playbook',
    'When someone says Quantum Playbook, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on quantum playbook.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    429,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-transformation',
    'personalized-transformation',
    'Personalized Transformation',
    'Executives use Personalized Transformation to inspire confidence, while the rest of the team quietly Googles it.',
    'Our roadmap hinges on embracing personalized transformation ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    430,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-blueprint',
    'quantum-blueprint',
    'Quantum Blueprint',
    'Executives use Quantum Blueprint to inspire confidence, while the rest of the team quietly Googles it.',
    'We must double down on quantum blueprint before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    431,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-architecture',
    'hybrid-architecture',
    'Hybrid Architecture',
    'More of a mantra than a method, Hybrid Architecture thrives in quarterly reports and keynote speeches.',
    'The Q4 offsite is focused entirely on hybrid architecture.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    432,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-optimization',
    'dynamic-optimization',
    'Dynamic Optimization',
    'Despite its futuristic vibe, Dynamic Optimization often results in the same status quo under a trendier label.',
    'Leadership wants KPIs tied directly to dynamic optimization.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    433,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_strategic-ecosystem',
    'strategic-ecosystem',
    'Strategic Ecosystem',
    'Executives use Strategic Ecosystem to inspire confidence, while the rest of the team quietly Googles it.',
    'We must double down on strategic ecosystem before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    434,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-experience',
    'hyper-experience',
    'Hyper Experience',
    'Despite its futuristic vibe, Hyper Experience often results in the same status quo under a trendier label.',
    'The investor deck highlights hyper experience as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    435,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-mindset',
    'hybrid-mindset',
    'Hybrid Mindset',
    'Think of Hybrid Mindset as corporate poetry: pretty words, little substance.',
    'Our roadmap hinges on embracing hybrid mindset ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    436,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-loop',
    'hybrid-loop',
    'Hybrid Loop',
    'Hybrid Loop promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on hybrid loop.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    437,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-integration',
    'seamless-integration',
    'Seamless Integration',
    'When someone says Seamless Integration, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The Q4 offsite is focused entirely on seamless integration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    438,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-engagement',
    'agile-engagement',
    'Agile Engagement',
    'Despite its futuristic vibe, Agile Engagement often results in the same status quo under a trendier label.',
    'Leadership wants KPIs tied directly to agile engagement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    439,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-enablement',
    'synergy-enablement',
    'Synergy Enablement',
    'Think of Synergy Enablement as corporate poetry: pretty words, little substance.',
    'Leadership wants KPIs tied directly to synergy enablement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    440,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-integration',
    'personalized-integration',
    'Personalized Integration',
    'No meeting is complete until someone suggests Personalized Integration as the next big move.',
    'The investor deck highlights personalized integration as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    441,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-journey',
    'virtual-journey',
    'Virtual Journey',
    'Think of Virtual Journey as corporate poetry: pretty words, little substance.',
    'The investor deck highlights virtual journey as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    442,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-journey',
    'circular-journey',
    'Circular Journey',
    'Circular Journey promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to circular journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    443,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-metric',
    'smart-metric',
    'Smart Metric',
    'Despite its futuristic vibe, Smart Metric often results in the same status quo under a trendier label.',
    'We must double down on smart metric before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    444,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-alignment',
    'circular-alignment',
    'Circular Alignment',
    'Executives use Circular Alignment to inspire confidence, while the rest of the team quietly Googles it.',
    'The Q4 offsite is focused entirely on circular alignment.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    445,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_frictionless-playbook',
    'frictionless-playbook',
    'Frictionless Playbook',
    'Frictionless Playbook is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to frictionless playbook.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    446,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-blueprint',
    'scalable-blueprint',
    'Scalable Blueprint',
    'Scalable Blueprint sounds like the future but usually translates into another layer of PowerPoint slides.',
    'We must double down on scalable blueprint before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    447,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-metric',
    'disruptive-metric',
    'Disruptive Metric',
    'When someone says Disruptive Metric, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Leadership wants KPIs tied directly to disruptive metric.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    448,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-initiative',
    'agile-initiative',
    'Agile Initiative',
    'When someone says Agile Initiative, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on agile initiative before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    449,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-ecosystem',
    'disruptive-ecosystem',
    'Disruptive Ecosystem',
    'No meeting is complete until someone suggests Disruptive Ecosystem as the next big move.',
    'We must double down on disruptive ecosystem before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    450,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_synergy-engagement',
    'synergy-engagement',
    'Synergy Engagement',
    'Think of Synergy Engagement as corporate poetry: pretty words, little substance.',
    'Our roadmap hinges on embracing synergy engagement ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    451,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-enablement',
    'dynamic-enablement',
    'Dynamic Enablement',
    'Dynamic Enablement is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on dynamic enablement.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    452,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-framework',
    'virtual-framework',
    'Virtual Framework',
    'Think of Virtual Framework as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on virtual framework.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    453,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-pipeline',
    'hybrid-pipeline',
    'Hybrid Pipeline',
    'Teams invoke Hybrid Pipeline to suggest momentum, even when standing still.',
    'Our roadmap hinges on embracing hybrid pipeline ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    454,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-engagement',
    'virtual-engagement',
    'Virtual Engagement',
    'Virtual Engagement sounds like the future but usually translates into another layer of PowerPoint slides.',
    'We must double down on virtual engagement before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    455,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-solution',
    'hybrid-solution',
    'Hybrid Solution',
    'More of a mantra than a method, Hybrid Solution thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing hybrid solution ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    456,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-strategy',
    'meta-strategy',
    'Meta Strategy',
    'Think of Meta Strategy as corporate poetry: pretty words, little substance.',
    'The Q4 offsite is focused entirely on meta strategy.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    457,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-orchestration',
    'disruptive-orchestration',
    'Disruptive Orchestration',
    'Executives use Disruptive Orchestration to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights disruptive orchestration as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    458,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-journey',
    'cross-journey',
    'Cross Journey',
    'Despite its futuristic vibe, Cross Journey often results in the same status quo under a trendier label.',
    'The investor deck highlights cross journey as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    459,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_circular-touchpoint',
    'circular-touchpoint',
    'Circular Touchpoint',
    'When someone says Circular Touchpoint, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'The investor deck highlights circular touchpoint as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    460,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-enablement',
    'cross-enablement',
    'Cross Enablement',
    'Teams invoke Cross Enablement to suggest momentum, even when standing still.',
    'We must double down on cross enablement before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    461,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-playbook',
    'holistic-playbook',
    'Holistic Playbook',
    'Teams invoke Holistic Playbook to suggest momentum, even when standing still.',
    'We must double down on holistic playbook before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    462,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-ecosystem',
    'scalable-ecosystem',
    'Scalable Ecosystem',
    'Teams invoke Scalable Ecosystem to suggest momentum, even when standing still.',
    'The investor deck highlights scalable ecosystem as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    463,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-playbook',
    'agile-playbook',
    'Agile Playbook',
    'Agile Playbook is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on agile playbook.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    464,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-initiative',
    'cloud-initiative',
    'Cloud Initiative',
    'When someone says Cloud Initiative, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'We must double down on cloud initiative before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    465,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_seamless-loop',
    'seamless-loop',
    'Seamless Loop',
    'Seamless Loop promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on seamless loop before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    466,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-optimization',
    'hybrid-optimization',
    'Hybrid Optimization',
    'Despite its futuristic vibe, Hybrid Optimization often results in the same status quo under a trendier label.',
    'The Q4 offsite is focused entirely on hybrid optimization.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    467,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-ecosystem',
    'cross-ecosystem',
    'Cross Ecosystem',
    'Cross Ecosystem is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on cross ecosystem before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    468,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_disruptive-roadmap',
    'disruptive-roadmap',
    'Disruptive Roadmap',
    'Disruptive Roadmap sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Leadership wants KPIs tied directly to disruptive roadmap.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    469,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-solution',
    'hyper-solution',
    'Hyper Solution',
    'When someone says Hyper Solution, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Our roadmap hinges on embracing hyper solution ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    470,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-ecosystem',
    'agile-ecosystem',
    'Agile Ecosystem',
    'Agile Ecosystem is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Our roadmap hinges on embracing agile ecosystem ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    471,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_holistic-architecture',
    'holistic-architecture',
    'Holistic Architecture',
    'More of a mantra than a method, Holistic Architecture thrives in quarterly reports and keynote speeches.',
    'Our roadmap hinges on embracing holistic architecture ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    472,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-playbook',
    'transformational-playbook',
    'Transformational Playbook',
    'Transformational Playbook sounds like the future but usually translates into another layer of PowerPoint slides.',
    'Our roadmap hinges on embracing transformational playbook ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    473,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_meta-metric',
    'meta-metric',
    'Meta Metric',
    'Teams invoke Meta Metric to suggest momentum, even when standing still.',
    'Leadership wants KPIs tied directly to meta metric.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    474,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-paradigm',
    'virtual-paradigm',
    'Virtual Paradigm',
    'Think of Virtual Paradigm as corporate poetry: pretty words, little substance.',
    'We must double down on virtual paradigm before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    475,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-blueprint',
    'agile-blueprint',
    'Agile Blueprint',
    'Agile Blueprint promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Our roadmap hinges on embracing agile blueprint ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    476,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_dynamic-initiative',
    'dynamic-initiative',
    'Dynamic Initiative',
    'Dynamic Initiative is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The investor deck highlights dynamic initiative as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    477,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-roadmap',
    'agile-roadmap',
    'Agile Roadmap',
    'Executives use Agile Roadmap to inspire confidence, while the rest of the team quietly Googles it.',
    'We must double down on agile roadmap before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    478,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-transformation',
    'smart-transformation',
    'Smart Transformation',
    'When someone says Smart Transformation, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Our roadmap hinges on embracing smart transformation ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    479,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hybrid-transformation',
    'hybrid-transformation',
    'Hybrid Transformation',
    'Hybrid Transformation promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'We must double down on hybrid transformation before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    480,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-transformation',
    'cloud-transformation',
    'Cloud Transformation',
    'Teams invoke Cloud Transformation to suggest momentum, even when standing still.',
    'We must double down on cloud transformation before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    481,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-transformation',
    'omni-transformation',
    'Omni Transformation',
    'Despite its futuristic vibe, Omni Transformation often results in the same status quo under a trendier label.',
    'The investor deck highlights omni transformation as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    482,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_quantum-architecture',
    'quantum-architecture',
    'Quantum Architecture',
    'Executives use Quantum Architecture to inspire confidence, while the rest of the team quietly Googles it.',
    'The investor deck highlights quantum architecture as our competitive edge.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    483,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_transformational-loop',
    'transformational-loop',
    'Transformational Loop',
    'Transformational Loop is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'The Q4 offsite is focused entirely on transformational loop.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    484,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cross-engagement',
    'cross-engagement',
    'Cross Engagement',
    'Cross Engagement is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on cross engagement before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    485,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_future-proof-loop',
    'future-proof-loop',
    'Future-Proof Loop',
    'More of a mantra than a method, Future-Proof Loop thrives in quarterly reports and keynote speeches.',
    'The Q4 offsite is focused entirely on future-proof loop.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    486,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_personalized-playbook',
    'personalized-playbook',
    'Personalized Playbook',
    'Executives use Personalized Playbook to inspire confidence, while the rest of the team quietly Googles it.',
    'The Q4 offsite is focused entirely on personalized playbook.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    487,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-engagement',
    'smart-engagement',
    'Smart Engagement',
    'No meeting is complete until someone suggests Smart Engagement as the next big move.',
    'Our roadmap hinges on embracing smart engagement ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    488,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-blueprint',
    'next-gen-blueprint',
    'Next-Gen Blueprint',
    'When someone says Next-Gen Blueprint, it’s often code for ‘we don’t really know what this means, but it sounds innovative.’',
    'Leadership wants KPIs tied directly to next-gen blueprint.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    489,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_agile-paradigm',
    'agile-paradigm',
    'Agile Paradigm',
    'More of a mantra than a method, Agile Paradigm thrives in quarterly reports and keynote speeches.',
    'We must double down on agile paradigm before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    490,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_virtual-strategy',
    'virtual-strategy',
    'Virtual Strategy',
    'Virtual Strategy is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'We must double down on virtual strategy before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    491,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_next-gen-playbook',
    'next-gen-playbook',
    'Next-Gen Playbook',
    'Next-Gen Playbook promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'Leadership wants KPIs tied directly to next-gen playbook.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    492,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_predictive-alignment',
    'predictive-alignment',
    'Predictive Alignment',
    'Executives use Predictive Alignment to inspire confidence, while the rest of the team quietly Googles it.',
    'Leadership wants KPIs tied directly to predictive alignment.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    493,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_hyper-strategy',
    'hyper-strategy',
    'Hyper Strategy',
    'Despite its futuristic vibe, Hyper Strategy often results in the same status quo under a trendier label.',
    'Our roadmap hinges on embracing hyper strategy ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    494,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_cloud-ecosystem',
    'cloud-ecosystem',
    'Cloud Ecosystem',
    'Cloud Ecosystem promises sweeping change, though in practice it’s usually just a rebrand of existing processes.',
    'The Q4 offsite is focused entirely on cloud ecosystem.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    495,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_scalable-experience',
    'scalable-experience',
    'Scalable Experience',
    'No meeting is complete until someone suggests Scalable Experience as the next big move.',
    'Leadership wants KPIs tied directly to scalable experience.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    496,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_smart-loop',
    'smart-loop',
    'Smart Loop',
    'Smart Loop sounds like the future but usually translates into another layer of PowerPoint slides.',
    'We must double down on smart loop before the next board meeting.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    497,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_neural-journey',
    'neural-journey',
    'Neural Journey',
    'Neural Journey is a shiny phrase that tends to generate more steering committees than real outcomes.',
    'Leadership wants KPIs tied directly to neural journey.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    498,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_omni-orchestration',
    'omni-orchestration',
    'Omni Orchestration',
    'No meeting is complete until someone suggests Omni Orchestration as the next big move.',
    'Leadership wants KPIs tied directly to omni orchestration.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    499,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );
INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    'term_lean-roadmap',
    'lean-roadmap',
    'Lean Roadmap',
    'No meeting is complete until someone suggests Lean Roadmap as the next big move.',
    'Our roadmap hinges on embracing lean roadmap ASAP.',
    '["corporate","strategy","management","buzzword"]',
    'published',
    0,
    500,
    '2025-09-24 03:30:00',
    '2025-09-24 03:30:00'
  );

-- Add some sample votes for the new terms
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_crypto-paradigm', 'sample_user_1', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_seamless-synergy', 'sample_user_2', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_lean-integration', 'sample_user_3', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_dynamic-blueprint', 'sample_user_4', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_future-proof-metric', 'sample_user_5', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_smart-paradigm', 'sample_user_6', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_virtual-solution', 'sample_user_7', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_strategic-framework', 'sample_user_8', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_cross-transformation', 'sample_user_9', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_hybrid-enablement', 'sample_user_10', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_cross-pipeline', 'sample_user_11', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_holistic-pipeline', 'sample_user_12', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_dynamic-synergy', 'sample_user_13', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_smart-orchestration', 'sample_user_14', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_cloud-architecture', 'sample_user_15', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_strategic-strategy', 'sample_user_16', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_disruptive-paradigm', 'sample_user_17', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_crypto-strategy', 'sample_user_18', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_predictive-orchestration', 'sample_user_19', 'up', 1758730119188);
INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('term_smart-strategy', 'sample_user_20', 'up', 1758730119188);

-- Re-enable foreign key constraints
PRAGMA foreign_keys=ON;
