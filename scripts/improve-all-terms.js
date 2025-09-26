const fs = require('fs');

// Function to generate AI definition and examples
async function generateDefinition(term) {
  const prompt = `You are a corporate buzzword expert writing for a satirical website called "Learnings Dot Org." 

Define the term "${term}" in a witty, satirical way that exposes how corporate jargon is often meaningless, pretentious, or overused. 

Requirements:
1. Write a definition that's funny but accurate about how this term is actually used in corporate settings
2. Include 3 specific examples of how this term is used in real corporate contexts
3. Keep the tone sarcastic and revealing about corporate culture
4. Make it clear this is corporate jargon that often lacks substance
5. Format examples as: "Examples:\n- \"[example 1]\"\n- \"[example 2]\"\n- \"[example 3]\""
6. Be creative and witty - this is for a humor website
7. Make it at least 100 characters long
8. Focus on the absurdity and pretentiousness of corporate language

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
        max_tokens: 600,
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

// Sample terms that need improvement (we'll process in batches)
const sampleTerms = [
  "Back burner", "Bandwidth", "Deep dive", "Drill down", "Drink the Kool-Aid",
  "Ducks in a row", "Dumpster fire", "Flesh out", "Hard stop", "In the weeds"
];

// Main function to process terms
async function main() {
  console.log('Starting to improve term definitions...');
  
  const results = [];
  
  for (let i = 0; i < sampleTerms.length; i++) {
    const term = sampleTerms[i];
    console.log(`Processing ${i + 1}/${sampleTerms.length}: ${term}`);
    
    const definition = await generateDefinition(term);
    const tags = generateTags(term);
    
    // Split definition and examples
    const parts = definition.split('Examples:');
    const def = parts[0].trim();
    const examples = parts[1] ? 'Examples:' + parts[1].trim() : '';
    
    results.push({
      term,
      definition: def,
      examples,
      tags
    });
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Generate SQL updates
  const sqlUpdates = results.map(result => {
    const slug = result.term.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
    return `UPDATE terms_v2 
SET 
  definition = '${result.definition.replace(/'/g, "''")}',
  examples = '${result.examples.replace(/'/g, "''")}',
  tags = '${result.tags}',
  updated_at = CURRENT_TIMESTAMP
WHERE slug = '${slug}';`;
  }).join('\n\n');
  
  const migrationFile = `infra/d1-migrations/060_improve_sample_terms.sql`;
  fs.writeFileSync(migrationFile, sqlUpdates);
  
  console.log(`\nGenerated migration file: ${migrationFile}`);
  console.log(`Processed ${results.length} terms successfully!`);
  console.log('\nSample improvements:');
  results.forEach(result => {
    console.log(`\n${result.term}:`);
    console.log(`Definition: ${result.definition.substring(0, 100)}...`);
  });
}

// Run the script
main().catch(console.error);
