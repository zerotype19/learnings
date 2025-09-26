const fs = require('fs');
const path = require('path');

// Configuration
const BATCH_SIZE = 5; // Process 5 terms at a time to avoid rate limits
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
            content: 'You are a witty, satirical corporate buzzword expert. Create humorous, sharp definitions and examples that mock corporate jargon. Be specific, creative, and avoid generic language. Make each term unique and memorable. Always respond with valid JSON only.'
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

// Function to fetch terms that need improvement
async function fetchTermsNeedingImprovement(limit = 20) {
  try {
    console.log('📋 Fetching terms that need improvement...');
    
    // Get terms missing examples, tags, or with incomplete definitions
    const response = await fetch(`${API_URL}/api/terms?limit=${limit}&sort=random`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const terms = data.items || [];
    
    // Filter terms that need improvement
    const needsImprovement = terms.filter(term => {
      const needsDefinition = !term.definition || 
        term.definition.length < 30 || 
        term.definition.includes('Replace with') ||
        term.definition.includes('Overused!') ||
        term.definition.endsWith('the') ||
        term.definition.endsWith('a') ||
        term.definition.endsWith('an') ||
        term.definition.includes('...');

      const needsExamples = !term.examples || 
        term.examples === 'null' || 
        term.examples.trim() === '';

      const needsTags = !term.tags || 
        term.tags.length === 0 || 
        (Array.isArray(term.tags) && term.tags.length === 0) ||
        term.tags.includes('corporate') && term.tags.includes('buzzword') && term.tags.length <= 2;

      return needsDefinition || needsExamples || needsTags;
    });
    
    console.log(`📊 Found ${needsImprovement.length} terms needing improvement out of ${terms.length} fetched`);
    return needsImprovement;
  } catch (error) {
    console.error('❌ Error fetching terms:', error);
    return [];
  }
}

// Function to improve a single term
async function improveTerm(term) {
  try {
    console.log(`\n🔍 Processing: "${term.title}"`);
    
    // Check what needs improvement
    const needsDefinition = !term.definition || 
      term.definition.length < 30 || 
      term.definition.includes('Replace with') ||
      term.definition.includes('Overused!') ||
      term.definition.endsWith('the') ||
      term.definition.endsWith('a') ||
      term.definition.endsWith('an') ||
      term.definition.includes('...');

    const needsExamples = !term.examples || 
      term.examples === 'null' || 
      term.examples.trim() === '';

    const needsTags = !term.tags || 
      term.tags.length === 0 || 
      (Array.isArray(term.tags) && term.tags.length === 0) ||
      (Array.isArray(term.tags) && term.tags.includes('corporate') && term.tags.includes('buzzword') && term.tags.length <= 2);

    if (!needsDefinition && !needsExamples && !needsTags) {
      console.log(`✅ "${term.title}" is already complete`);
      return null;
    }

    // Create improvement prompt
    let prompt = `Improve this corporate buzzword entry. Be witty, satirical, and specific:\n\n`;
    prompt += `Term: "${term.title}"\n`;
    prompt += `Current Definition: "${term.definition || 'None'}"\n`;
    prompt += `Current Examples: "${term.examples || 'None'}"\n`;
    prompt += `Current Tags: "${Array.isArray(term.tags) ? term.tags.join(', ') : term.tags || 'None'}"\n\n`;
    
    prompt += `Please provide ONLY a JSON response with:\n`;
    if (needsDefinition) {
      prompt += `- "definition": A witty, satirical definition (2-3 sentences, specific to this term)\n`;
    }
    if (needsExamples) {
      prompt += `- "examples": 2-3 humorous example sentences (separate with \\n)\n`;
    }
    if (needsTags) {
      prompt += `- "tags": 3-5 specific, differentiated tags (avoid generic "corporate" or "buzzword")\n`;
    }
    
    prompt += `\nExample format:\n`;
    prompt += `{\n`;
    if (needsDefinition) prompt += `  "definition": "A witty definition here",\n`;
    if (needsExamples) prompt += `  "examples": "Example 1\\nExample 2\\nExample 3",\n`;
    if (needsTags) prompt += `  "tags": ["specific-tag1", "specific-tag2", "specific-tag3"]\n`;
    prompt += `}`;

    const aiResponse = await callOpenAI(prompt, 600);
    
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
      console.log(`📝 New definition: ${improvements.definition.substring(0, 100)}...`);
    }
    if (needsExamples && improvements.examples) {
      updates.examples = improvements.examples;
      console.log(`📝 New examples: ${improvements.examples.substring(0, 100)}...`);
    }
    if (needsTags && improvements.tags) {
      updates.tags = improvements.tags;
      console.log(`📝 New tags: ${improvements.tags.join(', ')}`);
    }

    return updates;
  } catch (error) {
    console.error(`❌ Error improving "${term.title}":`, error);
    return null;
  }
}

// Function to update term via API
async function updateTerm(termId, updates) {
  try {
    // For now, we'll create SQL statements that can be executed manually
    // In a full implementation, you'd call an API endpoint to update the term
    
    const updateFields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const updateValues = Object.values(updates);
    updateValues.push(termId);

    const sql = `UPDATE terms_v2 SET ${updateFields} WHERE id = ?`;
    
    // Write to a file for manual execution
    const sqlFile = path.join(__dirname, 'term-updates.sql');
    const sqlStatement = `-- Update for term ID ${termId}\n${sql};\n-- Values: ${JSON.stringify(updateValues)}\n\n`;
    
    fs.appendFileSync(sqlFile, sqlStatement);
    
    console.log(`📝 SQL written to term-updates.sql for term ${termId}`);
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
    // Clear previous SQL file
    const sqlFile = path.join(__dirname, 'term-updates.sql');
    if (fs.existsSync(sqlFile)) {
      fs.unlinkSync(sqlFile);
    }
    
    // Get terms that need improvement
    const terms = await fetchTermsNeedingImprovement(50); // Get 50 terms to start
    
    if (terms.length === 0) {
      console.log('✅ No terms need improvement!');
      return;
    }
    
    console.log(`📝 Found ${terms.length} terms needing improvement`);
    
    // Process in batches
    for (let i = 0; i < terms.length; i += BATCH_SIZE) {
      const batch = terms.slice(i, i + BATCH_SIZE);
      await processBatch(batch);
      
      console.log(`\n📊 Progress: ${processedCount} processed, ${updatedCount} updated, ${errorCount} errors`);
      
      // Break if we've processed enough for now
      if (processedCount >= 20) {
        console.log('🛑 Stopping after 20 terms to avoid rate limits');
        break;
      }
    }
    
    console.log('\n🎉 Content improvement complete!');
    console.log(`📊 Final stats:`);
    console.log(`   - Processed: ${processedCount}`);
    console.log(`   - Updated: ${updatedCount}`);
    console.log(`   - Errors: ${errorCount}`);
    console.log(`\n📁 SQL statements written to: ${sqlFile}`);
    console.log('💡 Run these SQL statements against your D1 database to apply the updates');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main();
