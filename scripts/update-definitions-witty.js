const fs = require('fs');
const path = require('path');

// Witty and funny definitions for corporate buzzwords
const wittyDefinitions = {
  'crypto-paradigm': 'The art of making blockchain sound revolutionary while actually just describing a slightly more complicated way to lose money.',
  'seamless-synergy': 'When two departments pretend to work together so smoothly that even they can\'t tell who\'s responsible for the failure.',
  'lean-integration': 'The process of cutting corners so aggressively that you end up with a circle.',
  'dynamic-blueprint': 'A plan so flexible it changes every time someone asks about it, making it impossible to actually build anything.',
  'future-proof-metric': 'A measurement so forward-thinking that it becomes obsolete before you finish calculating it.',
  'smart-paradigm': 'A fancy way of saying "we\'re going to do the same thing but with more PowerPoint slides."',
  'virtual-solution': 'The digital equivalent of thoughts and prayers - it sounds helpful but doesn\'t actually solve anything.',
  'strategic-framework': 'A beautifully crafted excuse for why we\'re not doing what we said we would do.',
  'cross-transformation': 'The corporate equivalent of a midlife crisis, but with more meetings and less sports cars.',
  'hybrid-enablement': 'Making two broken systems work together by duct-taping them and hoping nobody notices.',
  'cross-pipeline': 'A process so convoluted that by the time anything reaches the end, it\'s completely unrecognizable.',
  'holistic-pipeline': 'A pipeline that considers the emotional well-being of every stakeholder, except the people who actually have to use it.',
  'dynamic-synergy': 'When two teams work together so dynamically that they create twice as much chaos as they would alone.',
  'smart-orchestration': 'The art of making simple tasks sound incredibly complex so you can justify hiring more consultants.',
  'cloud-architecture': 'Building your house in the sky because the ground is too mainstream.',
  'strategic-strategy': 'A strategy so strategic that it strategies itself into strategic oblivion.',
  'disruptive-paradigm': 'Breaking things so thoroughly that even the people who built them can\'t fix them.',
  'crypto-strategy': 'A plan so secure that not even the people who made it understand what it does.',
  'predictive-orchestration': 'Crystal ball management - predicting the future so accurately that you\'re always wrong.',
  'smart-strategy': 'A strategy so intelligent it outsmarts itself and becomes counterproductive.',
  'agile-orchestration': 'Moving so fast that you break things before you even know what you\'re building.',
  'circular-ecosystem': 'A system so perfectly circular that it goes nowhere but looks really impressive on paper.',
  'cloud-mindset': 'Thinking so far above the ground that you forget how gravity works.',
  'crypto-playbook': 'A playbook so encrypted that even the players don\'t know what game they\'re playing.',
  'dynamic-optimization': 'Optimizing so dynamically that the optimization process needs its own optimization.',
  'frictionless-blueprint': 'A plan so smooth that it slides right off the table and into the trash.',
  'holistic-framework': 'A framework so comprehensive that it includes everything except a way to actually use it.',
  'hybrid-integration': 'Mixing oil and water, but with more buzzwords and less actual mixing.',
  'hyper-roadmap': 'A roadmap so fast that it arrives at its destination before you finish reading it.',
  'lean-metric': 'A measurement so lean it disappears when you try to use it.',
  'neural-loop': 'A loop so intelligent it gets stuck thinking about itself and never actually loops.',
  'neural-touchpoint': 'The point where artificial intelligence meets artificial stupidity.',
  'next-gen-playbook': 'A playbook so next-generation that it\'s already obsolete by the time you print it.',
  'omni-framework': 'A framework that does everything except the one thing you actually need it to do.',
  'predictive-journey': 'A journey so predictable that you know exactly where you\'re going to get lost.',
  'scalable-journey': 'A journey that scales so well it becomes a journey about scaling journeys.',
  'smart-alignment': 'Aligning so intelligently that everything points in different directions.',
  'smart-enablement': 'Enabling things so smartly that they become too smart for their own good.',
  'synergy-orchestration': 'Conducting an orchestra where every musician is playing a different song.',
  'virtual-loop': 'A loop so virtual it exists only in the cloud of your imagination.',
  'zero-trust-enablement': 'Enabling trust by not trusting anyone, including yourself.',
  'zero-trust-loop': 'A loop so suspicious it doesn\'t even trust its own beginning.',
  'zero-trust-transformation': 'Transforming so distrustfully that you end up exactly where you started.',
  'agile-architecture': 'Building so fast that the architecture changes while you\'re still drawing it.',
  'circular-initiative': 'An initiative so circular it goes nowhere but looks really busy doing it.',
  'circular-transformation': 'Transforming in circles until you\'re dizzy and nothing has changed.',
  'cloud-ecosystem': 'An ecosystem so high in the clouds that it rains buzzwords instead of solutions.',
  'cloud-paradigm': 'A paradigm so lofty that it floats away before you can implement it.',
  'cloud-solution': 'A solution so ethereal that it evaporates when you try to touch it.',
  'cross-touchpoint': 'The point where two things touch so awkwardly that everyone pretends it didn\'t happen.',
  'future-proof-touchpoint': 'A touchpoint so future-proof that it\'s already outdated.',
  'holistic-ecosystem': 'An ecosystem so complete that it includes everything except a way to navigate it.',
  'holistic-enablement': 'Enabling everything so holistically that nothing actually gets enabled.',
  'holistic-synergy': 'Synergy so complete that it synergizes itself into non-existence.',
  'hybrid-roadmap': 'A roadmap that can\'t decide which direction to go, so it goes everywhere.',
  'hybrid-strategy': 'A strategy so hybrid it\'s not sure what it\'s supposed to be.',
  'hyper-architecture': 'Architecture so fast that it builds itself before you can design it.',
  'hyper-ecosystem': 'An ecosystem so intense that it hyperventilates just thinking about itself.',
  'hyper-orchestration': 'Orchestrating so fast that the music becomes a blur of corporate noise.',
  'hyper-transformation': 'Transforming so rapidly that you end up exactly where you started.',
  'meta-strategy': 'A strategy about strategies that strategizes about strategizing.',
  'neural-blueprint': 'A blueprint so intelligent it designs itself into a corner.',
  'next-gen-roadmap': 'A roadmap so advanced that it leads to a future that doesn\'t exist yet.',
  'personalized-playbook': 'A playbook customized so specifically that only one person can use it.',
  'predictive-ecosystem': 'An ecosystem so predictive it knows it\'s going to fail before it starts.',
  'quantum-integration': 'Integrating at the quantum level where everything is both working and broken simultaneously.',
  'quantum-playbook': 'A playbook that exists in multiple states until you try to read it.',
  'quantum-strategy': 'A strategy so quantum it\'s both brilliant and nonsensical at the same time.',
  'scalable-engagement': 'Engaging so scalably that you lose track of who you\'re engaging with.',
  'seamless-integration': 'Integrating so seamlessly that you can\'t tell where one thing ends and another begins.',
  'seamless-journey': 'A journey so smooth that you don\'t realize you\'re going in circles.',
  'strategic-loop': 'A loop so strategic it loops back to the beginning before you finish the strategy.',
  'strategic-solution': 'A solution so strategic that it solves problems you didn\'t know you had.',
  'synergy-ecosystem': 'An ecosystem where everything synergizes so much that nothing actually works.',
  'transformational-solution': 'A solution that transforms the problem into a different, more complex problem.',
  'virtual-blueprint': 'A blueprint so virtual it exists only in the metaverse of corporate imagination.',
  'virtual-framework': 'A framework so ethereal that it passes through reality without leaving a trace.'
};

// Read current terms from database via API
async function fetchCurrentTerms() {
  const apiUrl = 'https://api.learnings.org';
  
  try {
    const response = await fetch(`${apiUrl}/api/terms?limit=1000`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Failed to fetch terms:', error);
    return [];
  }
}

// Generate SQL migration to update definitions
async function generateMigration() {
  console.log('Fetching current terms...');
  const terms = await fetchCurrentTerms();
  
  if (terms.length === 0) {
    console.error('No terms found to update');
    return;
  }
  
  console.log(`Found ${terms.length} terms to update`);
  
  const migrationContent = `-- Migration: Update term definitions with witty and funny content
-- Generated on: ${new Date().toISOString()}

-- Update definitions with witty content
${terms.map(term => {
  const wittyDef = wittyDefinitions[term.slug] || wittyDefinitions[term.title.toLowerCase().replace(/\s+/g, '-')];
  
  if (wittyDef) {
    return `UPDATE terms_v2 SET definition = '${wittyDef.replace(/'/g, "''")}' WHERE id = '${term.id}';`;
  }
  
  // Generate a generic witty definition if not in our list
  const genericWitty = `A corporate buzzword so perfectly meaningless that it means everything and nothing simultaneously. It's the linguistic equivalent of a participation trophy - everyone gets one, but nobody knows what to do with it.`;
  
  return `UPDATE terms_v2 SET definition = '${genericWitty.replace(/'/g, "''")}' WHERE id = '${term.id}';`;
}).filter(Boolean).join('\n')}
`;

  // Write migration file
  const migrationFileName = `039_update_definitions_witty`;
  const migrationPath = path.join(__dirname, '..', 'infra', 'd1-migrations', `${migrationFileName}.sql`);
  
  fs.writeFileSync(migrationPath, migrationContent);
  
  console.log(`Migration file created: ${migrationPath}`);
  console.log(`Ready to apply migration with: wrangler d1 migrations apply --remote`);
}

// Run the script
generateMigration().catch(console.error);
