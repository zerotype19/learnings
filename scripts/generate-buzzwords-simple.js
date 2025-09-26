const fs = require('fs');

const buzzwords = [
  "Circle back", "Low-hanging fruit", "Boil the ocean", "Pivot hard", "Move the needle",
  "Open the kimono", "Secret sauce", "Leverage synergies", "Ping me", "Thought shower",
  "Deep dive", "Quick win", "Blue-sky thinking", "Run it up the flagpole", "Herding cats",
  "Deckware", "Ping-pong priorities", "Zoom fatigue", "Spray and pray", "Take it offline",
  "Peel the onion", "Buy-in", "Sandbox it", "Table stakes", "Eat our own dog food",
  "Growth hacking", "Actionize", "Rightsize", "Drill down", "Win-win",
  "Core competency", "Double click", "Tiger team", "Brain dump", "Elevator pitch",
  "Strategic imperative", "Happy path", "Ecosystem play", "Thought leadership", "Level set",
  "Stakeholdering", "Business as usual", "Gold plating", "Hard stop", "Going forward",
  "Big rock", "Out of pocket", "Value-add", "Ideation session", "Seamless integration",
  "Mission-critical", "Capacity planning", "One-throat to choke", "Circle of trust", "Quick and dirty",
  "Pushback", "Ballpark it", "Holistic solutioning", "Core vs. explore", "Cross-functional",
  "Dynamic equilibrium", "Synergistic alignment", "Herd immunity (in biz talk)", "Ideate", "One-pager",
  "Move fast and break things", "Strategic north star", "Paradigm shift", "Bandwidth check", "Operationalize",
  "The ask", "White space", "Incentivize", "Seamless onboarding", "Socialize an idea",
  "Strategic clarity", "Competitive moat", "Boil it down", "Out of scope", "Align the org",
  "Business driver", "Pain point", "Game-changer", "Incentive alignment", "Key takeaway",
  "Iterate fast", "End-to-end solution", "Big bet", "Fail fast", "Test and learn",
  "Growth mindset", "Waterfall to agile", "Cross-pollinate", "Scale up", "Hard pivot",
  "Robust solution", "Leading edge", "Right-sizing", "Open loop", "Close the loop",
  "Best-in-class", "Re-baseline", "Workstream", "Thought partner", "Value prop",
  "Strategic lens", "Hypercare", "Work smarter, not harder", "Hit the ground running", "Close alignment",
  "Digital native", "Synergy capture", "Operational excellence", "Make it pop", "Nail it and scale it",
  "Outside the box", "Optics check", "Heavy lift", "Get alignment", "Strategic handshake",
  "In the weeds", "Future state", "Near-term wins", "Deck farming", "Pre-read",
  "Enterprise-wide", "Roll up your sleeves", "Change agent", "Value unlock", "The delta",
  "Red team it", "Put a pin in it", "Action item", "Greenfield opportunity", "Over the wall",
  "Swim lane", "Strategic pillar", "Hitting singles and doubles", "Unicorn thinking", "Business hygiene",
  "Land and expand", "Bake it in", "All-hands", "Back-channeling", "Transformational",
  "North Star metric", "New normal", "Future-proof", "Shock to the system", "Rinse and repeat"
];

function createSlug(term) {
  return term.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

function generateDefinition(term) {
  const definitions = {
    "Circle back": "A corporate way of saying 'I'll forget about this until you remind me again.' The art of appearing busy while doing absolutely nothing productive.",
    "Low-hanging fruit": "The easiest tasks that make you look productive without actually solving any real problems. Usually involves changing font colors or moving buttons around.",
    "Boil the ocean": "An impossible task that sounds impressive but is actually just a fancy way of saying 'we have no idea what we're doing.'",
    "Pivot hard": "To dramatically change direction while pretending you had a plan all along. Usually involves burning through money and confusing everyone.",
    "Move the needle": "To make a tiny, barely measurable improvement while acting like you've revolutionized the industry.",
    "Open the kimono": "A creepy way of saying 'let me show you our internal processes.' Somehow this phrase survived the #MeToo era.",
    "Secret sauce": "The mysterious ingredient that makes everything work, which is usually just 'working really hard' or 'having good luck.'",
    "Leverage synergies": "To combine two things that don't work separately and somehow make them not work together either.",
    "Ping me": "A passive-aggressive way of saying 'I'm too lazy to walk to your desk, so send me an email instead.'",
    "Thought shower": "A brainstorming session where everyone showers you with terrible ideas while you pretend to take notes.",
    "Deep dive": "To spend hours researching something that could have been explained in a 30-second Google search.",
    "Quick win": "A small accomplishment that you celebrate like you just cured cancer, usually involving updating a spreadsheet.",
    "Blue-sky thinking": "Imagining solutions to problems that don't exist while ignoring the actual problems that do exist.",
    "Run it up the flagpole": "To ask for permission from someone who doesn't understand the project but has the authority to say no.",
    "Herding cats": "Trying to manage a group of people who all think they're the smartest person in the room (spoiler: they're not).",
    "Deckware": "Beautiful PowerPoint presentations that look impressive but contain zero actionable information.",
    "Ping-pong priorities": "When management changes the project focus so often that you feel like you're in a never-ending game of table tennis.",
    "Zoom fatigue": "The exhaustion that comes from pretending to pay attention in virtual meetings while actually checking your phone.",
    "Spray and pray": "A marketing strategy where you throw money at every channel and hope something sticks, like a drunk person throwing darts.",
    "Take it offline": "A meeting escape phrase meaning 'let's discuss this when we're not pretending to care in front of everyone else.'"
  };
  
  return definitions[term] || `A corporate buzzword that sounds important but usually means nothing. Examples:\n- "We need to ${term.toLowerCase()} on this initiative."\n- "The ${term.toLowerCase()} approach will drive results."\n- "Let's ${term.toLowerCase()} to move forward."`;
}

function generateExamples(term) {
  const examples = {
    "Circle back": "Examples:\n- \"Let me circle back on that after I finish my coffee.\"\n- \"We'll circle back to this in Q4 when we have more bandwidth.\"\n- \"I need to circle back with the stakeholders on this decision.\"",
    "Low-hanging fruit": "Examples:\n- \"Let's focus on the low-hanging fruit first before tackling the real issues.\"\n- \"This is low-hanging fruit - we can knock it out in an hour.\"\n- \"We're picking all the low-hanging fruit to show quick wins.\"",
    "Boil the ocean": "Examples:\n- \"Don't try to boil the ocean with this project - keep it simple.\"\n- \"We're not trying to boil the ocean here, just solve one problem.\"\n- \"That approach would boil the ocean - let's be more focused.\"",
    "Pivot hard": "Examples:\n- \"We need to pivot hard away from this failing strategy.\"\n- \"The market changed, so we're pivoting hard to B2C.\"\n- \"Let's pivot hard and focus on our core competencies.\"",
    "Move the needle": "Examples:\n- \"This initiative will really move the needle on customer satisfaction.\"\n- \"We need something that moves the needle, not just incremental improvements.\"\n- \"How do we move the needle on revenue this quarter?\""
  };
  
  return examples[term] || `Examples:\n- "We need to ${term.toLowerCase()} on this initiative."\n- "The ${term.toLowerCase()} approach will drive results."\n- "Let's ${term.toLowerCase()} to move forward."`;
}

function generateTags(term) {
  const tags = ['corporate', 'buzzword'];
  if (term.includes('synergy')) tags.push('synergy');
  if (term.includes('strategic')) tags.push('strategy');
  if (term.includes('pivot')) tags.push('change');
  if (term.includes('growth')) tags.push('growth');
  if (term.includes('team')) tags.push('collaboration');
  if (term.includes('quick') || term.includes('fast')) tags.push('urgency');
  if (term.includes('deep') || term.includes('drill')) tags.push('analysis');
  if (term.includes('win') || term.includes('success')) tags.push('success');
  if (term.includes('future')) tags.push('future');
  if (term.includes('value')) tags.push('value');
  return JSON.stringify(tags);
}

const sqlStatements = buzzwords.map(term => {
  const slug = createSlug(term);
  const definition = generateDefinition(term);
  const examples = generateExamples(term);
  const tags = generateTags(term);
  
  return `INSERT INTO terms_v2 (id, slug, title, definition, examples, tags, status, created_at, updated_at)
VALUES (
  'term_${slug.replace(/-/g, '_')}',
  '${slug}',
  '${term.replace(/'/g, "''")}',
  '${definition.replace(/'/g, "''")}',
  '${examples.replace(/'/g, "''")}',
  '${tags}',
  'published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);`;
}).join('\n\n');

const migrationFile = `infra/d1-migrations/057_add_corporate_buzzwords.sql`;
fs.writeFileSync(migrationFile, sqlStatements);

console.log(`Generated migration file: ${migrationFile}`);
console.log(`Processed ${buzzwords.length} terms successfully!`);
