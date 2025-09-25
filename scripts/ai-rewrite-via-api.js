const fs = require('fs');
const path = require('path');

// Configuration
const BATCH_SIZE = 100; // Process 100 terms per batch
const DELAY_BETWEEN_BATCHES = 3000; // 3 seconds delay between batches
const API_URL = 'https://api.learnings.org';

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
  const MAX_TERMS = 500; // Process all 500 terms
  
  while (allTerms.length < MAX_TERMS) {
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
        console.log('No more terms available');
        break;
      }
      
      // Only add terms up to our limit
      const remainingSlots = MAX_TERMS - allTerms.length;
      const termsToAdd = terms.slice(0, remainingSlots);
      allTerms.push(...termsToAdd);
      
      console.log(`Fetched page ${page}: ${terms.length} terms (added ${termsToAdd.length}, total: ${allTerms.length})`);
      
      // Check if we've reached our limit
      if (allTerms.length >= MAX_TERMS) {
        console.log(`Reached limit of ${MAX_TERMS} terms`);
        break;
      }
      
      cursor = data.nextCursor;
      if (!cursor) {
        console.log('No more pages available');
        break;
      }
      
      page++;
      
      // Safety check to prevent infinite loops
      if (page > 20) {
        console.log('Safety limit reached (20 pages), stopping');
        break;
      }
    } catch (error) {
      console.error('Error fetching terms:', error);
      break;
    }
  }
  
  console.log(`Total terms fetched: ${allTerms.length}`);
  return allTerms;
}

// Call OpenAI API via your worker to rewrite a definition
async function rewriteDefinition(term) {
  try {
    // Use the translate endpoint which is designed for this
    const response = await fetch(`${API_URL}/v1/ai/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: term.definition
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    
    // The translate endpoint returns an object with academic_tone, plain_translation, optional_framework
    // We'll use the plain_translation as our witty definition
    const newDefinition = data.plain_translation || data.academic_tone || term.definition;
    
    if (!newDefinition) {
      throw new Error('No content returned from API');
    }
    
    // Clean up the response (remove quotes if present)
    return newDefinition.trim().replace(/^["']|["']$/g, '');
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
    
    // Process batch sequentially to avoid overwhelming the API
    for (let j = 0; j < batch.length; j++) {
      const term = batch[j];
      console.log(`  [${j + 1}/${batch.length}] Rewriting: ${term.title}`);
      
      const newDefinition = await rewriteDefinition(term);
      
      if (newDefinition) {
        results.push({
          id: term.id,
          title: term.title,
          slug: term.slug,
          originalDefinition: term.definition,
          newDefinition: newDefinition
        });
        console.log(`    ✅ Success: ${newDefinition.substring(0, 60)}...`);
      } else {
        console.log(`    ❌ Failed to rewrite`);
      }
      
      // Small delay between individual requests
      if (j < batch.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`  Batch ${batchNumber} completed: ${results.length - (i)}/${batch.length} successful`);
    
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

  const migrationFileName = `040_ai_rewritten_definitions_via_api`;
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
    console.log('Starting AI definition rewrite process via API...\n');
    
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
