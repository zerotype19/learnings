const fs = require('fs');

// Pre-written witty definitions for common terms that need improvement
const improvedDefinitions = {
  "Back burner": {
    definition: "A corporate euphemism for 'we'll pretend to care about this later' while actually hoping everyone forgets about it. The art of making procrastination sound strategic.",
    examples: "Examples:\n- \"Let's put the employee satisfaction survey on the back burner until Q4.\"\n- \"We'll move the diversity initiative to the back burner while we focus on revenue.\"\n- \"The back burner is where good ideas go to die a slow, forgotten death.\""
  },
  "Bandwidth": {
    definition: "A pretentious way of saying 'I'm too busy' or 'I don't want to do this' while making it sound like a technical limitation. Because apparently 'time' wasn't corporate enough.",
    examples: "Examples:\n- \"I don't have the bandwidth to attend another meeting about meetings.\"\n- \"We need to check everyone's bandwidth before assigning more projects.\"\n- \"My bandwidth is maxed out, but I can squeeze in one more pointless task.\""
  },
  "Deep dive": {
    definition: "To spend hours researching something that could have been explained in a 30-second Google search, but we need to make it sound like we're doing serious analytical work.",
    examples: "Examples:\n- \"Let's do a deep dive into why our coffee machine keeps breaking.\"\n- \"We need to deep dive into the data to understand why sales are down.\"\n- \"The deep dive revealed that we've been overthinking a simple problem.\""
  },
  "Drill down": {
    definition: "To investigate something thoroughly, usually after you realize you have no idea what you're talking about. The corporate version of 'let me Google that for you.'",
    examples: "Examples:\n- \"We need to drill down into the customer complaints to find the root cause.\"\n- \"Let's drill down on why the project is behind schedule.\"\n- \"After drilling down, we discovered the problem was obvious from the start.\""
  },
  "Drink the Kool-Aid": {
    definition: "To blindly follow questionable ideas or principles, usually because someone with a fancy title said so. A reference to the Jonestown tragedy that somehow became acceptable office slang.",
    examples: "Examples:\n- \"She's really drinking the Kool-Aid on this new management philosophy.\"\n- \"I'm not drinking the Kool-Aid on this 'agile transformation' nonsense.\"\n- \"The whole team drank the Kool-Aid and now we're all miserable.\""
  },
  "Ducks in a row": {
    definition: "To get everything organized and under control, which in corporate terms means creating 47 different spreadsheets and still being completely disorganized.",
    examples: "Examples:\n- \"Let's get our ducks in a row before the board meeting next week.\"\n- \"We need to have all our ducks in a row before launching this initiative.\"\n- \"My ducks are scattered all over the pond, but I'm working on it.\""
  },
  "Dumpster fire": {
    definition: "A catastrophically bad situation that everyone saw coming but no one wanted to address until it was too late. The corporate equivalent of a train wreck.",
    examples: "Examples:\n- \"The product launch was a complete dumpster fire from day one.\"\n- \"This project is a dumpster fire, but we're committed to seeing it through.\"\n- \"We turned a small problem into a full-blown dumpster fire.\""
  },
  "Flesh out": {
    definition: "To provide additional detail or information, usually because your initial idea was so vague that no one understood what you were talking about.",
    examples: "Examples:\n- \"Can you flesh out the details of your proposal for the client meeting?\"\n- \"We need to flesh out this strategy before presenting it to leadership.\"\n- \"The idea is good, but it needs more flesh to be viable.\""
  },
  "Hard stop": {
    definition: "A firm end time due to another commitment, which is corporate speak for 'I have somewhere more important to be' or 'I've reached my limit of pretending to care.'",
    examples: "Examples:\n- \"I have a hard stop at 3 PM for another meeting.\"\n- \"We need to respect everyone's hard stops in this meeting.\"\n- \"My hard stop is whenever I can't take any more corporate jargon.\""
  },
  "In the weeds": {
    definition: "Overwhelmed by detail or excessive work, usually because no one planned properly and now you're drowning in the consequences of poor decision-making.",
    examples: "Examples:\n- \"I'm getting too in the weeds on this project - let me step back.\"\n- \"We're all in the weeds trying to meet this unrealistic deadline.\"\n- \"Being in the weeds is better than being in the boardroom explaining why we failed.\""
  },
  "Low-hanging fruit": {
    definition: "The easiest tasks that make you look productive without actually solving any real problems. Usually involves changing font colors or moving buttons around.",
    examples: "Examples:\n- \"Let's focus on the low-hanging fruit first before tackling the real issues.\"\n- \"This is low-hanging fruit - we can knock it out in an hour.\"\n- \"We're picking all the low-hanging fruit to show quick wins.\""
  },
  "Move the needle": {
    definition: "To make a tiny, barely measurable improvement while acting like you've revolutionized the industry. The art of making 0.1% growth sound like a breakthrough.",
    examples: "Examples:\n- \"This initiative will really move the needle on customer satisfaction.\"\n- \"We need something that moves the needle, not just incremental improvements.\"\n- \"How do we move the needle on revenue this quarter?\""
  },
  "Circle back": {
    definition: "A corporate way of saying 'I'll forget about this until you remind me again.' The art of appearing busy while doing absolutely nothing productive.",
    examples: "Examples:\n- \"Let me circle back on that after I finish my coffee.\"\n- \"We'll circle back to this in Q4 when we have more bandwidth.\"\n- \"I need to circle back with the stakeholders on this decision.\""
  },
  "Boil the ocean": {
    definition: "An impossible task that sounds impressive but is actually just a fancy way of saying 'we have no idea what we're doing.'",
    examples: "Examples:\n- \"Don't try to boil the ocean with this project - keep it simple.\"\n- \"We're not trying to boil the ocean here, just solve one problem.\"\n- \"That approach would boil the ocean - let's be more focused.\""
  },
  "Pivot hard": {
    definition: "To dramatically change direction while pretending you had a plan all along. Usually involves burning through money and confusing everyone.",
    examples: "Examples:\n- \"We need to pivot hard away from this failing strategy.\"\n- \"The market changed, so we're pivoting hard to B2C.\"\n- \"Let's pivot hard and focus on our core competencies.\""
  }
};

// Function to generate tags
function generateTags(term) {
  const tags = ['corporate', 'buzzword'];
  
  if (term.includes('synergy') || term.includes('synergistic')) tags.push('synergy');
  if (term.includes('strategic') || term.includes('strategy')) tags.push('strategy');
  if (term.includes('pivot') || term.includes('change')) tags.push('change');
  if (term.includes('growth') || term.includes('scale')) tags.push('growth');
  if (term.includes('team') || term.includes('cross')) tags.push('collaboration');
  if (term.includes('quick') || term.includes('fast')) tags.push('urgency');
  if (term.includes('deep') || term.includes('drill')) tags.push('analysis');
  if (term.includes('win') || term.includes('success')) tags.push('success');
  if (term.includes('future') || term.includes('forward')) tags.push('future');
  if (term.includes('value') || term.includes('add')) tags.push('value');
  if (term.includes('digital') || term.includes('tech')) tags.push('technology');
  if (term.includes('data') || term.includes('analytics')) tags.push('data');
  if (term.includes('customer') || term.includes('client')) tags.push('customer');
  if (term.includes('leadership') || term.includes('management')) tags.push('leadership');
  if (term.includes('innovation') || term.includes('disrupt')) tags.push('innovation');
  
  return JSON.stringify(tags);
}

// Generate SQL updates
const sqlUpdates = Object.entries(improvedDefinitions).map(([term, data]) => {
  const slug = term.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  const tags = generateTags(term);
  
  return `UPDATE terms_v2 
SET 
  definition = '${data.definition.replace(/'/g, "''")}',
  examples = '${data.examples.replace(/'/g, "''")}',
  tags = '${tags}',
  updated_at = CURRENT_TIMESTAMP
WHERE slug = '${slug}';`;
}).join('\n\n');

const migrationFile = `infra/d1-migrations/061_improve_common_terms.sql`;
fs.writeFileSync(migrationFile, sqlUpdates);

console.log(`Generated migration file: ${migrationFile}`);
console.log(`Processed ${Object.keys(improvedDefinitions).length} terms successfully!`);
console.log('\nSample improvements:');
Object.entries(improvedDefinitions).forEach(([term, data]) => {
  console.log(`\n${term}:`);
  console.log(`Definition: ${data.definition.substring(0, 100)}...`);
});
