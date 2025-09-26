const fs = require('fs');
const path = require('path');

// List of buzzwords to add
const buzzwords = [
  "Circle back",
  "Low-hanging fruit", 
  "Boil the ocean",
  "Pivot hard",
  "Move the needle",
  "Open the kimono",
  "Secret sauce",
  "Leverage synergies",
  "Ping me",
  "Thought shower",
  "Deep dive",
  "Quick win",
  "Blue-sky thinking",
  "Run it up the flagpole",
  "Herding cats",
  "Deckware",
  "Ping-pong priorities",
  "Zoom fatigue",
  "Spray and pray",
  "Take it offline",
  "Peel the onion",
  "Buy-in",
  "Sandbox it",
  "Table stakes",
  "Eat our own dog food",
  "Growth hacking",
  "Actionize",
  "Rightsize",
  "Drill down",
  "Win-win",
  "Core competency",
  "Double click",
  "Tiger team",
  "Brain dump",
  "Elevator pitch",
  "Strategic imperative",
  "Happy path",
  "Ecosystem play",
  "Thought leadership",
  "Level set",
  "Stakeholdering",
  "Business as usual",
  "Gold plating",
  "Hard stop",
  "Going forward",
  "Big rock",
  "Out of pocket",
  "Value-add",
  "Ideation session",
  "Seamless integration",
  "Mission-critical",
  "Capacity planning",
  "One-throat to choke",
  "Circle of trust",
  "Quick and dirty",
  "Pushback",
  "Ballpark it",
  "Holistic solutioning",
  "Core vs. explore",
  "Cross-functional",
  "Dynamic equilibrium",
  "Synergistic alignment",
  "Herd immunity (in biz talk)",
  "Ideate",
  "One-pager",
  "Move fast and break things",
  "Strategic north star",
  "Paradigm shift",
  "Bandwidth check",
  "Operationalize",
  "The ask",
  "White space",
  "Incentivize",
  "Seamless onboarding",
  "Socialize an idea",
  "Strategic clarity",
  "Competitive moat",
  "Boil it down",
  "Out of scope",
  "Align the org",
  "Business driver",
  "Pain point",
  "Game-changer",
  "Incentive alignment",
  "Key takeaway",
  "Iterate fast",
  "End-to-end solution",
  "Big bet",
  "Fail fast",
  "Test and learn",
  "Growth mindset",
  "Waterfall to agile",
  "Cross-pollinate",
  "Scale up",
  "Hard pivot",
  "Robust solution",
  "Leading edge",
  "Right-sizing",
  "Open loop",
  "Close the loop",
  "Best-in-class",
  "Re-baseline",
  "Workstream",
  "Thought partner",
  "Value prop",
  "Strategic lens",
  "Hypercare",
  "Work smarter, not harder",
  "Hit the ground running",
  "Close alignment",
  "Digital native",
  "Synergy capture",
  "Operational excellence",
  "Make it pop",
  "Nail it and scale it",
  "Outside the box",
  "Optics check",
  "Heavy lift",
  "Get alignment",
  "Strategic handshake",
  "In the weeds",
  "Future state",
  "Near-term wins",
  "Deck farming",
  "Pre-read",
  "Enterprise-wide",
  "Roll up your sleeves",
  "Change agent",
  "Value unlock",
  "The delta",
  "Red team it",
  "Put a pin in it",
  "Action item",
  "Greenfield opportunity",
  "Over the wall",
  "Swim lane",
  "Strategic pillar",
  "Hitting singles and doubles",
  "Unicorn thinking",
  "Business hygiene",
  "Land and expand",
  "Bake it in",
  "All-hands",
  "Back-channeling",
  "Transformational",
  "North Star metric",
  "New normal",
  "Future-proof",
  "Shock to the system",
  "Rinse and repeat"
];

// Function to generate AI definition and examples
async function generateDefinition(term) {
  const prompt = `You are a corporate buzzword expert. Define the term "${term}" in a witty, satirical way that exposes how corporate jargon is often meaningless or pretentious. 

Requirements:
1. Write a definition that's funny but accurate about how this term is actually used in corporate settings
2. Include 3 specific examples of how this term is used in real corporate contexts
3. Keep the tone sarcastic and revealing about corporate culture
4. Make it clear this is corporate jargon that often lacks substance
5. Format examples as: "Examples:\n- \"[example 1]\"\n- \"[example 2]\"\n- \"[example 3]\""

Return only the definition and examples, nothing else.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.8
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error(`Error generating definition for "${term}":`, error);
    return `A corporate buzzword that sounds important but usually means nothing. Examples:\n- "We need to ${term.toLowerCase()} on this initiative."\n- "The ${term.toLowerCase()} approach will drive results."\n- "Let's ${term.toLowerCase()} to move forward."`;
  }
}

// Function to create slug from term
function createSlug(term) {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

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
  
  return JSON.stringify(tags);
}

// Main function to process all terms
async function main() {
  console.log(`Processing ${buzzwords.length} buzzwords...`);
  
  const results = [];
  
  for (let i = 0; i < buzzwords.length; i++) {
    const term = buzzwords[i];
    console.log(`Processing ${i + 1}/${buzzwords.length}: ${term}`);
    
    const slug = createSlug(term);
    const definition = await generateDefinition(term);
    const tags = generateTags(term);
    
    results.push({
      id: `term_${slug.replace(/-/g, '_')}`,
      slug,
      title: term,
      definition,
      examples: definition.includes('Examples:') ? definition.split('Examples:')[1].trim() : '',
      tags,
      status: 'published'
    });
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Generate SQL migration
  const sqlContent = results.map(term => {
    const cleanDefinition = term.definition.replace(/Examples:.*$/s, '').trim();
    return `INSERT INTO terms_v2 (id, slug, title, definition, examples, tags, status, created_at, updated_at)
VALUES (
  '${term.id}',
  '${term.slug}',
  '${term.title.replace(/'/g, "''")}',
  '${cleanDefinition.replace(/'/g, "''")}',
  '${term.examples.replace(/'/g, "''")}',
  '${term.tags}',
  '${term.status}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);`;
  }).join('\n\n');

  const migrationFile = `infra/d1-migrations/057_add_corporate_buzzwords_ai.sql`;
  fs.writeFileSync(migrationFile, sqlContent);
  
  console.log(`\nGenerated migration file: ${migrationFile}`);
  console.log(`Processed ${results.length} terms successfully!`);
}

// Run the script
main().catch(console.error);
