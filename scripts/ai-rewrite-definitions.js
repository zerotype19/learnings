const fs = require('fs');
const path = require('path');

// Configuration
const BATCH_SIZE = 10; // Process terms in batches to avoid rate limits
const DELAY_BETWEEN_BATCHES = 2000; // 2 seconds delay between batches
const API_URL = 'https://api.learnings.org';

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('Please set OPENAI_API_KEY environment variable');
  process.exit(1);
}

// System prompt for generating witty definitions
const SYSTEM_PROMPT = `You are a satirical corporate culture critic who writes witty, funny definitions for corporate buzzwords. 

Your task is to rewrite corporate buzzword definitions to be:
1. Satirical and humorous
2. Expose the absurdity and meaninglessness of corporate jargon
3. Be genuinely funny and memorable
4. Maintain a consistent satirical tone
5. Be insightful about corporate culture
6. Keep definitions concise (1-2 sentences max)
7. Use wit, irony, and clever wordplay

Examples of good satirical definitions:
- "The art of making blockchain sound revolutionary while actually just describing a slightly more complicated way to lose money."
- "When two departments pretend to work together so smoothly that even they can't tell who's responsible for the failure."
- "A plan so flexible it changes every time someone asks about it, making it impossible to actually build anything."

Return ONLY the rewritten definition. No explanations, no quotes, just the definition text.`;

// Fetch all terms from the API
async function fetchAllTerms() {
  console.log('Fetching all terms from API...');
  const allTerms = [];
  let cursor = null;
  let page = 1;
  
  while (true) {
    try {
      const params = new URLSearchParams({
        limit: '100',
        sort: 'newest'
      });
      
      if (cursor) {
        params.set('cursor', cursor);
      }
      
      const response = await fetch(`${API_URL}/api/terms?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      const terms = data.items || [];
      
      if (terms.length === 0) {
        break;
      }
      
      allTerms.push(...terms);
      console.log(`Fetched page ${page}: ${terms.length} terms (total: ${allTerms.length})`);
      
      cursor = data.nextCursor;
      if (!cursor) {
        break;
      }
      
      page++;
    } catch (error) {
      console.error('Error fetching terms:', error);
      break;
    }
  }
  
  console.log(`Total terms fetched: ${allTerms.length}`);
  return allTerms;
}

// Call OpenAI API to rewrite a definition
async function rewriteDefinition(term) {
  const prompt = `Original definition: "${term.definition}"\n\nRewrite this definition to be satirical and witty:`;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.8
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    const newDefinition = data.choices[0].message.content.trim();
    
    // Clean up the response (remove quotes if present)
    return newDefinition.replace(/^["']|["']$/g, '');
  } catch (error) {
    console.error(`Error rewriting definition for "${term.title}":`, error);
    return null;
  }
}

// Process terms in batches
async function processTermsInBatches(terms) {
  const results = [];
  const totalBatches = Math.ceil(terms.length / BATCH_SIZE);
  
  console.log(`Processing ${terms.length} terms in ${totalBatches} batches of ${BATCH_SIZE}...`);
  
  for (let i = 0; i < terms.length; i += BATCH_SIZE) {
    const batch = terms.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    
    console.log(`\nProcessing batch ${batchNumber}/${totalBatches} (${batch.length} terms)...`);
    
    // Process batch concurrently
    const batchPromises = batch.map(async (term) => {
      console.log(`  Rewriting: ${term.title}`);
      const newDefinition = await rewriteDefinition(term);
      
      if (newDefinition) {
        return {
          id: term.id,
          title: term.title,
          slug: term.slug,
          originalDefinition: term.definition,
          newDefinition: newDefinition
        };
      }
      
      return null;
    });
    
    const batchResults = await Promise.all(batchPromises);
    const validResults = batchResults.filter(result => result !== null);
    
    results.push(...validResults);
    console.log(`  Batch ${batchNumber} completed: ${validResults.length}/${batch.length} successful`);
    
    // Delay between batches to avoid rate limits
    if (i + BATCH_SIZE < terms.length) {
      console.log(`  Waiting ${DELAY_BETWEEN_BATCHES}ms before next batch...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }
  
  return results;
}

// Generate SQL migration
function generateMigration(results) {
  console.log(`\nGenerating migration for ${results.length} updated definitions...`);
  
  const migrationContent = `-- Migration: AI-rewritten definitions with satirical content
-- Generated on: ${new Date().toISOString()}
-- Total definitions updated: ${results.length}

-- Update definitions with AI-generated satirical content
${results.map(result => {
  const escapedDefinition = result.newDefinition.replace(/'/g, "''");
  return `UPDATE terms_v2 SET definition = '${escapedDefinition}' WHERE id = '${result.id}';`;
}).join('\n')}
`;

  const migrationFileName = `040_ai_rewritten_definitions`;
  const migrationPath = path.join(__dirname, '..', 'infra', 'd1-migrations', `${migrationFileName}.sql`);
  
  fs.writeFileSync(migrationPath, migrationContent);
  
  console.log(`Migration file created: ${migrationPath}`);
  return migrationPath;
}

// Generate summary report
function generateReport(results) {
  const reportPath = path.join(__dirname, '..', 'ai-definitions-report.txt');
  
  const report = `AI Definition Rewrite Report
Generated: ${new Date().toISOString()}
Total definitions updated: ${results.length}

DEFINITIONS UPDATED:
${results.map((result, index) => `
${index + 1}. ${result.title} (${result.slug})
   Original: ${result.originalDefinition}
   New: ${result.newDefinition}
`).join('\n')}
`;
  
  fs.writeFileSync(reportPath, report);
  console.log(`Report generated: ${reportPath}`);
}

// Main execution
async function main() {
  try {
    console.log('Starting AI definition rewrite process...\n');
    
    // Fetch all terms
    const terms = await fetchAllTerms();
    if (terms.length === 0) {
      console.error('No terms found to process');
      return;
    }
    
    // Process terms in batches
    const results = await processTermsInBatches(terms);
    
    if (results.length === 0) {
      console.error('No definitions were successfully rewritten');
      return;
    }
    
    // Generate migration
    const migrationPath = generateMigration(results);
    
    // Generate report
    generateReport(results);
    
    console.log(`\n✅ Process completed successfully!`);
    console.log(`📊 Statistics:`);
    console.log(`   - Total terms processed: ${terms.length}`);
    console.log(`   - Successfully rewritten: ${results.length}`);
    console.log(`   - Success rate: ${((results.length / terms.length) * 100).toFixed(1)}%`);
    console.log(`\n📁 Files created:`);
    console.log(`   - Migration: ${migrationPath}`);
    console.log(`   - Report: ai-definitions-report.txt`);
    console.log(`\n🚀 Next steps:`);
    console.log(`   1. Review the migration file`);
    console.log(`   2. Apply migration: wrangler d1 migrations apply learnings --remote`);
    
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

// Run the script
main();
