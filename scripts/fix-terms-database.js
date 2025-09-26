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
7. If the term is already good, keep it but make it more satirical

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
  if (term.includes('digital') || term.includes('tech')) tags.push('technology');
  if (term.includes('data') || term.includes('analytics')) tags.push('data');
  if (term.includes('customer') || term.includes('client')) tags.push('customer');
  if (term.includes('leadership') || term.includes('management')) tags.push('leadership');
  if (term.includes('innovation') || term.includes('disrupt')) tags.push('innovation');
  
  return JSON.stringify(tags);
}

// Function to check if definition needs improvement
function needsImprovement(definition, examples) {
  if (!definition || definition.length < 50) return true;
  if (!examples || examples.length < 50) return true;
  if (definition.includes("Don't have a discussion") || definition.includes("Instead of saying")) return true;
  if (definition.includes("Convey the idea") || definition.includes("If you're describing")) return true;
  return false;
}

// Main function to process all terms
async function main() {
  console.log('Starting comprehensive terms database fix...');
  
  // First, let's get all terms from the database
  console.log('Fetching all terms from database...');
  
  // For now, let's create a script that will update the null IDs and improve definitions
  const updateStatements = [];
  
  // Generate unique IDs for null entries
  const nullIdUpdate = `
UPDATE terms_v2 
SET id = 'term_' || slug || '_' || CAST(rowid AS TEXT)
WHERE id IS NULL;
`;
  
  updateStatements.push(nullIdUpdate);
  
  // Create a script to improve definitions for terms that need it
  const improvementScript = `
-- Script to improve terms that need better definitions
-- This will be run after we identify which terms need improvement

-- First, let's see which terms need improvement
SELECT 
  id, 
  slug, 
  title, 
  definition,
  examples,
  CASE 
    WHEN LENGTH(definition) < 50 THEN 'SHORT_DEF'
    WHEN LENGTH(examples) < 50 THEN 'SHORT_EX'
    WHEN definition LIKE '%Don''t have a discussion%' THEN 'STYLE_GUIDE'
    WHEN definition LIKE '%Instead of saying%' THEN 'STYLE_GUIDE'
    WHEN definition LIKE '%Convey the idea%' THEN 'STYLE_GUIDE'
    WHEN definition LIKE '%If you''re describing%' THEN 'STYLE_GUIDE'
    ELSE 'GOOD'
  END as quality_issue
FROM terms_v2 
WHERE 
  LENGTH(definition) < 50 
  OR LENGTH(examples) < 50 
  OR definition LIKE '%Don''t have a discussion%'
  OR definition LIKE '%Instead of saying%'
  OR definition LIKE '%Convey the idea%'
  OR definition LIKE '%If you''re describing%'
ORDER BY quality_issue, title;
`;

  updateStatements.push(improvementScript);
  
  // Write the improvement script
  const improvementFile = `infra/d1-migrations/059_improve_terms_quality.sql`;
  fs.writeFileSync(improvementFile, updateStatements.join('\n\n'));
  
  console.log(`Generated improvement script: ${improvementFile}`);
  console.log('Next steps:');
  console.log('1. Run the script to identify terms needing improvement');
  console.log('2. Use AI to generate better definitions for those terms');
  console.log('3. Update the database with improved content');
}

// Run the script
main().catch(console.error);
