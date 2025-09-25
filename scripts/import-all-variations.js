#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// CSV data provided by user
const csvData = `term,definition
Actionable Items,"A task or action that needs to be performed by an individual or team; essentially a to-do list."
ASAP,"Acronym for 'as soon as possible'; used to indicate urgency."
Backburner,"To de-prioritize a task and revisit later."
Baked In,"Already included as part of a plan, model, or roadmap."
Balls in the Air,"Managing several activities or tasks simultaneously; similar to 'too much on the plate.'"
Bandwidth,"The capacity to take on additional work in terms of time, resources, or energy."
Bleeding Edge,"Describes the newest, most innovative product, idea, or technology."
Blue Sky Thinking,"Creative brainstorming without constraints; thinking out of the box."
Boil the Ocean,"Taking on an overly ambitious or impossible task."
Brain Dump,"Writing down all ideas quickly, often during or after a brainstorming session."
Break Down the Silos,"Collaborating across teams to remove barriers and improve efficiency."
Bring to the Table,"Skills, expertise, or ideas someone contributes to a project or team."
Circle Back,"Revisit or follow up on a topic later."
Core Competencies,"The most prominent skills or strengths of an employee or organization."
Deck,"A presentation, usually in PowerPoint or Google Slides format."
Deep Dive,"A thorough exploration or detailed analysis of a subject."
Deliverables,"The outputs, tasks, or responsibilities assigned to an individual or team."
Drink the Kool-Aid,"Blindly agreeing with or following an idea or philosophy."
Ducks in a Row,"Getting organized and making necessary preparations."
Evangelist,"A strong brand advocate who promotes a company or product."
Game Changer,"A plan, idea, or product that creates a significant competitive advantage."
Get on Board,"Agree with or support a plan, strategy, or idea."
Good to Go,"Confirmation that a task or project is complete and ready to proceed."
Hard Stop,"A firm end time due to another commitment or conflict."
Headwinds,"Challenges or obstacles that slow progress or growth."
Herding Cats,"Managing a group that is difficult or impossible to control."
Jump the Shark,"The point where something declines in quality or appeal after peak popularity."
Laser Focus,"Extreme, unwavering concentration on a task."
Leverage,"Use resources, skills, or situations to gain an advantage."
Low-Hanging Fruit,"Easy tasks or opportunities that produce quick results."
Make Hay While the Sun Shines,"Take advantage of an opportunity while it lasts."
Move the Goalposts,"Change requirements or objectives during a project."
Move the Needle,"Make a noticeable, measurable impact."
Ninja,"A highly skilled professional or expert; sometimes replaced with 'guru' or 'thought leader.'"
One-Pager,"A concise one-page summary of a proposal, plan, or report."
Over the Wall,"Passing responsibility or information to another group, often without proper follow-up."
Pain Point,"A key problem or challenge faced by a business or customer."
Paradigm Shift,"A fundamental change in approach or perspective."
Park It,"Put an idea or project on hold until conditions change."
Push the Envelope,"Go beyond expectations; deliver exceptional work."
Resonate,"Relate strongly to someone's ideas, suggestions, or situation."
Reinvent the Wheel,"Redo something that has already been done; start again unnecessarily."
Run Up the Flagpole,"Present an idea to get feedback or approval."
Skin in the Game,"Having a personal stake in the outcome of a project or event."
Synergy,"Positive results from collaboration between teams or organizations."
Touch Base,"Briefly connect or discuss something with someone."
Throw Under the Bus,"Blame a teammate or colleague unexpectedly."
Traction,"Evidence of momentum, popularity, or progress."
Trim the Fat,"Cut unnecessary costs, steps, or processes."
White Paper,"A detailed report on a specific subject or issue."
Silver Bullet,"A simple, seemingly perfect solution to a complex problem."
Take it Offline,"Discuss a topic later or in a smaller, private setting."
Social Proof,"When people follow others' actions to conform with norms or expectations."
Thought Leadership,"Recognition as an authority in a field by providing valuable insights."
Sync,"Ensure information is consistent and up-to-date across teams or systems."
Pushback,"Resistance or opposition to an idea or proposal."
Pipeline,"A system for tracking potential clients, leads, or projects."
Have in One's Back Pocket,"Something prepared in advance but not yet revealed."
Loop In,"Include someone in a conversation or project."
FYI,"For Your Information; used when sharing an update or detail."
Win-Win,"An outcome beneficial to all parties involved."
Unpack,"Analyze or explain something in detail."
Above and Beyond,"Going further than what is required or expected."
Hop on a Call,"Start or join a phone or video meeting."
Level Up,"Improve or advance to the next stage of performance."
Out of Pocket,"Unavailable or unreachable; can also mean covering costs personally."
Ping You,"Send a quick message or notification."
On My Radar,"Be aware of or monitoring something."
Think Outside the Box,"Encourage creative, unconventional problem-solving."
Synergize,"Collaborate effectively to achieve better results together."
Let's Table This,"Postpone or put aside a discussion."
Put a Pin in It,"Pause a topic with the intent to revisit later."
Get Ducks in a Row,"Organize details or tasks thoroughly before starting."
Open the Kimono,"Share sensitive or private information openly."
Throw It Up and See What Sticks,"Test ideas to see which ones succeed."
Boots on the Ground,"People physically present and working on a task."
Anti-Perks,"Employee benefits that sound good but are unappealing or demotivating."
Bare Minimum Monday,"An idea encouraging lighter workloads on Mondays to reduce burnout."
Boomerang Employees,"Workers who leave a company and later return."
Career Cushioning,"Preparing for potential job loss while staying in the current role."
Coffee Badging,"Casual self-promotion during informal moments like coffee breaks."
Digital Employee Experience (DEX),"Improving how employees interact with workplace technology."
Elevator Pitch,"A short, persuasive speech designed to spark interest quickly."
MVP,"Minimum Viable Product; the simplest product version that can be released."
Reverse Mentoring,"Younger or less experienced employees mentoring senior colleagues."
USP,"Unique Selling Proposition; what makes a product better than competitors."
Office Peacocking,"Showcasing skills or achievements prominently for attention."
Quiet Quitting,"Doing only the required work without extra effort or engagement."
Side Gig,"A job or project pursued in addition to one's primary employment."
Touchpoint,"Any interaction between a company and its customers."
Disruptive Innovation,"Innovation that creates a new market or disrupts an existing one."
Pivot,"Change strategy or direction, often in startups."
Voluntold,"Being assigned to 'volunteer' for something."
Throw it Up and See What Sticks,"Trying multiple ideas to see which ones succeed."`;

// Parse CSV data
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Parse CSV line handling quoted fields
    const values = parseCSVLine(line);
    if (values.length >= 2) {
      rows.push({
        term: values[0].trim(),
        definition: values[1].trim()
      });
    }
  }
  
  return rows;
}

// Parse a single CSV line handling quoted fields with commas
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

// Generate slug from term
function generateSlug(term) {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Generate tags based on term content
function generateTags(term, definition) {
  const tags = ['corporate', 'buzzword'];
  
  const termLower = term.toLowerCase();
  const defLower = definition.toLowerCase();
  
  // Add category tags based on content
  if (defLower.includes('meeting') || defLower.includes('discussion') || termLower.includes('meeting') || termLower.includes('call')) {
    tags.push('meeting');
  }
  if (defLower.includes('project') || defLower.includes('task') || defLower.includes('work') || defLower.includes('deliverable')) {
    tags.push('project');
  }
  if (defLower.includes('management') || defLower.includes('manager') || defLower.includes('boss') || defLower.includes('leadership')) {
    tags.push('management');
  }
  if (defLower.includes('business') || defLower.includes('company') || defLower.includes('organization') || defLower.includes('market')) {
    tags.push('business');
  }
  if (defLower.includes('team') || defLower.includes('group') || defLower.includes('collaboration') || defLower.includes('synergy')) {
    tags.push('team');
  }
  if (defLower.includes('strategy') || defLower.includes('plan') || defLower.includes('approach') || defLower.includes('innovation')) {
    tags.push('strategy');
  }
  if (defLower.includes('communication') || defLower.includes('email') || defLower.includes('message') || defLower.includes('pitch')) {
    tags.push('communication');
  }
  if (defLower.includes('time') || defLower.includes('deadline') || defLower.includes('schedule') || defLower.includes('urgent')) {
    tags.push('time');
  }
  if (defLower.includes('employee') || defLower.includes('workplace') || defLower.includes('career') || defLower.includes('job')) {
    tags.push('workplace');
  }
  if (defLower.includes('customer') || defLower.includes('client') || defLower.includes('user') || defLower.includes('experience')) {
    tags.push('customer');
  }
  
  return tags;
}

// Generate example based on term
function generateExample(term) {
  const examples = {
    'Actionable Items': 'Let\'s create a list of actionable items from today\'s meeting.',
    'ASAP': 'I need this report ASAP for the board meeting tomorrow.',
    'Backburner': 'We\'ll put the website redesign on the backburner until Q2.',
    'Baked In': 'The cost savings are already baked into our budget projections.',
    'Balls in the Air': 'I have too many balls in the air right now to take on another project.',
    'Bandwidth': 'I don\'t have the bandwidth to handle this additional request.',
    'Bleeding Edge': 'This new AI technology is bleeding edge - very experimental.',
    'Blue Sky Thinking': 'Let\'s do some blue sky thinking about future possibilities.',
    'Boil the Ocean': 'Don\'t try to boil the ocean - focus on one thing at a time.',
    'Brain Dump': 'Let me do a quick brain dump of all my ideas for this campaign.',
    'Break Down the Silos': 'We need to break down the silos between departments.',
    'Bring to the Table': 'What unique skills does Sarah bring to the table?',
    'Circle Back': 'Let\'s circle back on this topic after we have more data.',
    'Core Competencies': 'Our core competencies are in data analytics and customer service.',
    'Deck': 'Can you send me the deck from yesterday\'s presentation?',
    'Deep Dive': 'We need to do a deep dive into the customer feedback data.',
    'Deliverables': 'What are the key deliverables for this project phase?',
    'Drink the Kool-Aid': 'She\'s really drinking the Kool-Aid on this new management philosophy.',
    'Ducks in a Row': 'Let\'s get our ducks in a row before the client meeting.',
    'Evangelist': 'John is our biggest product evangelist - he loves talking about it.',
    'Game Changer': 'This new technology could be a real game changer for our industry.',
    'Get on Board': 'We need everyone to get on board with this new process.',
    'Good to Go': 'The proposal is good to go - ready for client presentation.',
    'Hard Stop': 'I have a hard stop at 3 PM for another meeting.',
    'Headwinds': 'We\'re facing strong headwinds in the current market conditions.',
    'Herding Cats': 'Managing this cross-functional team is like herding cats.',
    'Jump the Shark': 'This product line has jumped the shark - time to pivot.',
    'Laser Focus': 'We need laser focus on our top priorities this quarter.',
    'Leverage': 'How can we leverage our existing relationships to grow the business?',
    'Low-Hanging Fruit': 'Let\'s focus on the low-hanging fruit first to show quick wins.',
    'Make Hay While the Sun Shines': 'We need to make hay while the sun shines in this market.',
    'Move the Goalposts': 'Every time we get close to the target, they move the goalposts.',
    'Move the Needle': 'This campaign should really move the needle on our sales numbers.',
    'Ninja': 'Sarah is a ninja when it comes to data analysis.',
    'One-Pager': 'Can you create a one-pager summarizing the proposal?',
    'Over the Wall': 'We can\'t just throw this over the wall to the development team.',
    'Pain Point': 'What\'s the biggest pain point our customers are experiencing?',
    'Paradigm Shift': 'This represents a paradigm shift in how we approach customer service.',
    'Park It': 'Let\'s park this idea until we have more budget.',
    'Push the Envelope': 'We need to push the envelope on innovation to stay competitive.',
    'Resonate': 'This message really resonates with our target audience.',
    'Reinvent the Wheel': 'We don\'t need to reinvent the wheel - there are existing solutions.',
    'Run Up the Flagpole': 'Let me run this idea up the flagpole and see what leadership thinks.',
    'Skin in the Game': 'Everyone needs to have skin in the game for this project to succeed.',
    'Synergy': 'The synergy between our teams will drive better results.',
    'Touch Base': 'Let\'s touch base next week to see how the project is going.',
    'Throw Under the Bus': 'Don\'t throw me under the bus when the client asks about the delay.',
    'Traction': 'We\'re finally gaining traction with our new product launch.',
    'Trim the Fat': 'We need to trim the fat from this budget to make it work.',
    'White Paper': 'The white paper on market trends was very insightful.',
    'Silver Bullet': 'There\'s no silver bullet for this complex problem.',
    'Take it Offline': 'Let\'s take this discussion offline after the meeting.',
    'Social Proof': 'We need more social proof to build credibility with customers.',
    'Thought Leadership': 'Our CEO is recognized as a thought leader in the industry.',
    'Sync': 'Let\'s sync up on this project to make sure we\'re aligned.',
    'Pushback': 'We\'re getting pushback from the sales team on this new process.',
    'Pipeline': 'What\'s in our sales pipeline for next quarter?',
    'Have in One\'s Back Pocket': 'I have a few ideas in my back pocket for this situation.',
    'Loop In': 'Let\'s loop in the legal team on this contract.',
    'FYI': 'FYI, the meeting has been moved to 2 PM.',
    'Win-Win': 'This proposal is a win-win for both parties.',
    'Unpack': 'Let\'s unpack this issue and understand the root cause.',
    'Above and Beyond': 'Sarah went above and beyond to help with this project.',
    'Hop on a Call': 'Can we hop on a call to discuss this further?',
    'Level Up': 'It\'s time to level up our marketing strategy.',
    'Out of Pocket': 'I\'ll be out of pocket next week for vacation.',
    'Ping You': 'I\'ll ping you when I have the updated numbers.',
    'On My Radar': 'This issue is on my radar - I\'m monitoring it closely.',
    'Think Outside the Box': 'We need to think outside the box to solve this problem.',
    'Synergize': 'Let\'s synergize our efforts to achieve better results.',
    'Let\'s Table This': 'Let\'s table this discussion until we have more information.',
    'Put a Pin in It': 'Let\'s put a pin in this topic and revisit it later.',
    'Get Ducks in a Row': 'We need to get our ducks in a row before the presentation.',
    'Open the Kimono': 'It\'s time to open the kimono and share our financial data.',
    'Throw It Up and See What Sticks': 'Let\'s throw some ideas up and see what sticks.',
    'Boots on the Ground': 'We need boots on the ground in the new market.',
    'Anti-Perks': 'Free pizza on Fridays feels like an anti-perk when you work 60 hours.',
    'Bare Minimum Monday': 'I\'m embracing bare minimum Monday to avoid burnout.',
    'Boomerang Employees': 'We\'re seeing more boomerang employees returning after trying other companies.',
    'Career Cushioning': 'Many employees are career cushioning by updating their resumes.',
    'Coffee Badging': 'He\'s always coffee badging during our team meetings.',
    'Digital Employee Experience (DEX)': 'Our DEX initiative is improving workplace technology.',
    'Elevator Pitch': 'Can you give me your elevator pitch for this product?',
    'MVP': 'Let\'s focus on building an MVP first, then iterate.',
    'Reverse Mentoring': 'Our reverse mentoring program pairs senior execs with junior employees.',
    'USP': 'What\'s our USP compared to the competition?',
    'Office Peacocking': 'His office peacocking is getting a bit excessive.',
    'Quiet Quitting': 'Quiet quitting is becoming more common in the workplace.',
    'Side Gig': 'My side gig as a consultant brings in extra income.',
    'Touchpoint': 'Every customer touchpoint should reflect our brand values.',
    'Disruptive Innovation': 'This represents disruptive innovation in our industry.',
    'Pivot': 'We need to pivot our strategy based on market feedback.',
    'Voluntold': 'I was voluntold to lead the company picnic committee.',
    'Throw it Up and See What Sticks': 'Let\'s throw some ideas up and see what sticks.'
  };
  
  return examples[term] || `Example usage of "${term}" in a corporate context.`;
}

// Main function
function main() {
  console.log('🚀 Generating comprehensive variations migration...');
  
  // Parse CSV data
  const terms = parseCSV(csvData);
  console.log(`📊 Parsed ${terms.length} terms from CSV data`);
  
  // Generate SQL migration
  const migrationContent = generateMigration(terms);
  
  // Write migration file
  const migrationPath = path.join(__dirname, '..', 'infra', 'd1-migrations', '053_import_all_variations.sql');
  fs.writeFileSync(migrationPath, migrationContent);
  
  console.log(`✅ Migration file created: ${migrationPath}`);
  console.log(`📝 Generated SQL for ${terms.length} term variations`);
  
  // Generate report
  const reportPath = path.join(__dirname, 'all-variations-report.txt');
  const report = generateReport(terms);
  fs.writeFileSync(reportPath, report);
  
  console.log(`📋 Report generated: ${reportPath}`);
  console.log('🎉 All variations migration preparation complete!');
}

// Generate SQL migration
function generateMigration(terms) {
  let sql = `-- Import all term variations with unique slugs
-- Generated on ${new Date().toISOString()}
-- Total terms: ${terms.length}
-- Each term gets a unique slug with '-alt' suffix to allow multiple definitions

-- Disable foreign key constraints temporarily
PRAGMA foreign_keys=OFF;

`;

  // Get the next sequence number (assuming we have 711 existing terms)
  const startSeq = 712;
  
  terms.forEach((term, index) => {
    const id = `term_${generateSlug(term.term)}_alt_${Date.now()}_${index}`;
    const slug = `${generateSlug(term.term)}-alt`;
    const tags = generateTags(term.term, term.definition);
    const example = generateExample(term.term);
    const seq = startSeq + index;
    const now = Date.now();
    
    sql += `INSERT INTO terms_v2 (
  id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
) VALUES (
  '${id}',
  '${slug}',
  '${term.term.replace(/'/g, "''")}',
  '${term.definition.replace(/'/g, "''")}',
  '${example.replace(/'/g, "''")}',
  '${JSON.stringify(tags)}',
  'published',
  0,
  ${seq},
  ${now},
  ${now}
);

`;
  });

  sql += `
-- Re-enable foreign key constraints
PRAGMA foreign_keys=ON;

-- Update the search index
INSERT INTO terms_fts(terms_fts) VALUES('rebuild');
`;

  return sql;
}

// Generate report
function generateReport(terms) {
  let report = `All Variations Import Report
Generated: ${new Date().toISOString()}
Total Terms: ${terms.length}

This import adds alternative definitions for existing terms using unique slugs.
Each term will have:
- Original definition (original slug)
- Alternative definition (slug with '-alt' suffix)

TERMS TO BE ADDED AS VARIATIONS:
`;

  terms.forEach((term, index) => {
    const slug = `${generateSlug(term.term)}-alt`;
    report += `\n${index + 1}. ${term.term} (Alternative)\n`;
    report += `   Slug: ${slug}\n`;
    report += `   Definition: ${term.definition}\n`;
    report += `   Example: ${generateExample(term.term)}\n`;
  });

  report += `\n\nBENEFITS OF THIS APPROACH:
- Users can see multiple perspectives on the same term
- Different levels of snark or seriousness
- More comprehensive coverage of corporate jargon
- Better search results with multiple definitions
- Maintains existing functionality while adding depth
- No schema changes required - uses existing table structure

NEXT STEPS:
1. Apply this migration to add all variations
2. Update frontend to group variations by base term
3. Update term detail page to show all variations
4. Update search to group variations together`;

  return report;
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { parseCSV, generateSlug, generateTags, generateExample };
