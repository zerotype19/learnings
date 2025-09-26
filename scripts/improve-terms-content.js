const fs = require('fs');
const path = require('path');

// Configuration
const BATCH_SIZE = 10; // Process 10 terms at a time
const API_URL = 'https://api.learnings.org';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY environment variable is required');
  process.exit(1);
}

// Track progress
let processedCount = 0;
let updatedCount = 0;
let errorCount = 0;

// Function to call OpenAI API
async function callOpenAI(prompt, maxTokens = 500) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a witty, satirical corporate buzzword expert. Create humorous, sharp definitions and examples that mock corporate jargon. Be specific, creative, and avoid generic language. Make each term unique and memorable.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

// Function to improve a single term
async function improveTerm(term) {
  try {
    console.log(`\n🔍 Processing: "${term.title}"`);
    
    // Check what needs improvement
    const needsDefinition = !term.definition || 
      term.definition.length < 20 || 
      term.definition.includes('Replace with') ||
      term.definition.includes('Overused!') ||
      term.definition.endsWith('the') ||
      term.definition.endsWith('a') ||
      term.definition.endsWith('an');

    const needsExamples = !term.examples || 
      term.examples === 'null' || 
      term.examples.trim() === '';

    const needsTags = !term.tags || 
      term.tags === '[]' || 
      term.tags === 'null' || 
      term.tags.trim() === '';

    if (!needsDefinition && !needsExamples && !needsTags) {
      console.log(`✅ "${term.title}" is already complete`);
      return null;
    }

    // Create improvement prompt
    let prompt = `Improve this corporate buzzword entry:\n\n`;
    prompt += `Term: "${term.title}"\n`;
    prompt += `Current Definition: "${term.definition || 'None'}"\n`;
    prompt += `Current Examples: "${term.examples || 'None'}"\n`;
    prompt += `Current Tags: "${term.tags || 'None'}"\n\n`;
    
    prompt += `Please provide:\n`;
    if (needsDefinition) {
      prompt += `1. A witty, satirical definition (2-3 sentences, specific to this term)\n`;
    }
    if (needsExamples) {
      prompt += `2. 2-3 humorous example sentences showing the term in use\n`;
    }
    if (needsTags) {
      prompt += `3. 3-5 specific, differentiated tags (avoid generic ones like "corporate" or "buzzword")\n`;
    }
    
    prompt += `\nFormat your response as JSON:\n`;
    prompt += `{\n`;
    if (needsDefinition) prompt += `  "definition": "your witty definition here",\n`;
    if (needsExamples) prompt += `  "examples": "Example 1\\nExample 2\\nExample 3",\n`;
    if (needsTags) prompt += `  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]\n`;
    prompt += `}`;

    const aiResponse = await callOpenAI(prompt, 800);
    
    // Parse AI response
    let improvements;
    try {
      // Clean up the response to ensure valid JSON
      const cleanedResponse = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      improvements = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error(`❌ Failed to parse AI response for "${term.title}":`, parseError);
      console.log('Raw response:', aiResponse);
      return null;
    }

    // Prepare update object
    const updates = {};
    if (needsDefinition && improvements.definition) {
      updates.definition = improvements.definition;
    }
    if (needsExamples && improvements.examples) {
      updates.examples = improvements.examples;
    }
    if (needsTags && improvements.tags) {
      updates.tags = JSON.stringify(improvements.tags);
    }

    return updates;
  } catch (error) {
    console.error(`❌ Error improving "${term.title}":`, error);
    return null;
  }
}

// Function to update term in database
async function updateTerm(termId, updates) {
  try {
    const updateFields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const updateValues = Object.values(updates);
    updateValues.push(termId);

    const sql = `UPDATE terms_v2 SET ${updateFields} WHERE id = ?`;
    
    // For now, we'll log the SQL - in production you'd execute this against the database
    console.log(`📝 Would update term ${termId}:`);
    console.log(`SQL: ${sql}`);
    console.log(`Values:`, updateValues);
    
    return true;
  } catch (error) {
    console.error(`❌ Error updating term ${termId}:`, error);
    return false;
  }
}

// Function to process a batch of terms
async function processBatch(terms) {
  console.log(`\n🚀 Processing batch of ${terms.length} terms...`);
  
  for (const term of terms) {
    try {
      const improvements = await improveTerm(term);
      
      if (improvements) {
        const success = await updateTerm(term.id, improvements);
        if (success) {
          updatedCount++;
          console.log(`✅ Updated "${term.title}"`);
        } else {
          errorCount++;
        }
      }
      
      processedCount++;
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error processing "${term.title}":`, error);
      errorCount++;
      processedCount++;
    }
  }
}

// Main function
async function main() {
  console.log('🎯 Starting terms content improvement...');
  console.log(`📊 Processing in batches of ${BATCH_SIZE}`);
  
  try {
    // Get terms that need improvement
    console.log('\n📋 Fetching terms that need improvement...');
    
    // For now, let's get a sample of terms to test with
    const sampleTerms = [
      {
        id: '1',
        title: 'Bells and whistles',
        definition: 'These are fancy features added to a product or service to entice prospects.',
        examples: null,
        tags: '[]'
      },
      {
        id: '2', 
        title: 'Best of breed',
        definition: '"Of breed" adds nothing to "best." Just say you\'re the best.',
        examples: null,
        tags: '[]'
      },
      {
        id: '3',
        title: 'Big bang for the buck',
        definition: 'A sleazy fast-talker\'s way of saying this or that product or service has',
        examples: null,
        tags: '[]'
      }
    ];
    
    console.log(`📝 Found ${sampleTerms.length} sample terms to process`);
    
    // Process in batches
    for (let i = 0; i < sampleTerms.length; i += BATCH_SIZE) {
      const batch = sampleTerms.slice(i, i + BATCH_SIZE);
      await processBatch(batch);
      
      console.log(`\n📊 Progress: ${processedCount} processed, ${updatedCount} updated, ${errorCount} errors`);
    }
    
    console.log('\n🎉 Content improvement complete!');
    console.log(`📊 Final stats:`);
    console.log(`   - Processed: ${processedCount}`);
    console.log(`   - Updated: ${updatedCount}`);
    console.log(`   - Errors: ${errorCount}`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main();
