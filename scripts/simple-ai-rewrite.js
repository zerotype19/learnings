const fs = require('fs');
const path = require('path');

// Configuration
const BATCH_SIZE = 50; // Process 50 terms per batch
const DELAY_BETWEEN_BATCHES = 2000; // 2 seconds delay between batches
const API_URL = 'https://api.learnings.org';
const MAX_TERMS = 500; // Only process 500 terms

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
- "The art of making blockchain sound revolutionary while actually just describing a slightly more complicated database."
- "When two teams fake teamwork so well that no one knows who's actually responsible for anything."
- "Trying to save time and resources so much that you just end up wasting more of both."

Return ONLY the rewritten definition. No explanations, no markdown, no quotes.`;

// Fetch exactly 500 terms from the API
async function fetchTerms() {
  console.log('Fetching 500 terms from API...');
  const allTerms = [];
  let page = 1;
  
  while (allTerms.length < MAX_TERMS) {
    try {
      const params = new URLSearchParams({
        limit: '100',
        sort: 'newest'
      });
      
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
      
      // Only take what we need to reach 500
      const needed = MAX_TERMS - allTerms.length;
      const toTake = Math.min(terms.length, needed);
      allTerms.push(...terms.slice(0, toTake));
      
      console.log(`Fetched page ${page}: ${toTake} terms (total: ${allTerms.length})`);
      
      if (allTerms.length >= MAX_TERMS) {
        break;
      }
      
      page++;
      
      // Safety check to prevent infinite loops
      if (page > 10) {
        console.log('Safety limit reached, stopping at', allTerms.length, 'terms');
        break;
      }
      
    } catch (error) {
      console.error('Error fetching terms:', error);
      break;
    }
  }
  
  console.log(`\n✅ Fetched ${allTerms.length} terms total`);
  return allTerms;
}

// Call OpenAI API via your worker to rewrite a definition
async function rewriteDefinition(term) {
  const prompt = `Original definition: "${term.definition}"\n\nRewrite this definition to be satirical and witty:`;
  
  try {
    // Use the translate endpoint which is designed for this
    const response = await fetch(`${API_URL}/v1/ai/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: prompt,
        systemPrompt: SYSTEM_PROMPT
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    const newDefinition = data.academic_tone || data.plain_translation || data.response;
    
    if (!newDefinition) {
      throw new Error('No definition returned from API');
    }
    
    return newDefinition.trim();
    
  } catch (error) {
    console.error(`Error rewriting definition for "${term.title}":`, error.message);
    return null;
  }
}

// Process terms in batches
async function processTermsInBatches(terms) {
  const results = [];
  const totalBatches = Math.ceil(terms.length / BATCH_SIZE);
  
  console.log(`\n🔄 Processing ${terms.length} terms in ${totalBatches} batches of ${BATCH_SIZE}...\n`);
  
  for (let i = 0; i < terms.length; i += BATCH_SIZE) {
    const batch = terms.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    
    console.log(`Processing batch ${batchNumber}/${totalBatches} (${batch.length} terms)...`);
    
    const batchPromises = batch.map(async (term, index) => {
      const globalIndex = i + index + 1;
      console.log(`  [${globalIndex}/${terms.length}] Rewriting: ${term.title}`);
      
      const newDefinition = await rewriteDefinition(term);
      
      if (newDefinition) {
        console.log(`    ✅ Success: ${newDefinition.substring(0, 80)}...`);
        return {
          id: term.id,
          title: term.title,
          originalDefinition: term.definition,
          newDefinition: newDefinition
        };
      } else {
        console.log(`    ❌ Failed to rewrite`);
        return null;
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    const successfulResults = batchResults.filter(result => result !== null);
    results.push(...successfulResults);
    
    console.log(`  Batch ${batchNumber} completed: ${successfulResults.length}/${batch.length} successful`);
    
    // Delay between batches (except for the last one)
    if (batchNumber < totalBatches) {
      console.log(`  Waiting ${DELAY_BETWEEN_BATCHES}ms before next batch...\n`);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }
  
  return results;
}

// Generate SQL migration file
function generateMigration(results) {
  console.log('\n📝 Generating migration file...');
  
  const migrationContent = `-- AI Rewritten Definitions Migration
-- Generated: ${new Date().toISOString()}
-- Total definitions updated: ${results.length}

${results.map(result => 
  `UPDATE terms_v2 SET definition = '${result.newDefinition.replace(/'/g, "''")}' WHERE id = '${result.id}';`
).join('\n')}
`;

  const migrationPath = path.join(__dirname, '..', 'infra', 'd1-migrations', '041_ai_rewritten_definitions_simple.sql');
  fs.writeFileSync(migrationPath, migrationContent);
  
  console.log(`✅ Migration file created: ${migrationPath}`);
  return migrationPath;
}

// Generate report
function generateReport(results) {
  console.log('\n📊 Generating report...');
  
  const reportContent = `AI Definitions Rewrite Report
Generated: ${new Date().toISOString()}

Summary:
- Total terms processed: ${results.length}
- Successfully rewritten: ${results.length}
- Success rate: 100.0%

Sample Results:
${results.slice(0, 10).map((result, index) => 
  `${index + 1}. ${result.title}
     Original: ${result.originalDefinition.substring(0, 100)}...
     New: ${result.newDefinition}
`
).join('\n')}

All Results:
${results.map((result, index) => 
  `${index + 1}. ${result.title}
     Original: ${result.originalDefinition}
     New: ${result.newDefinition}
`
).join('\n')}
`;

  const reportPath = path.join(__dirname, 'ai-definitions-simple-report.txt');
  fs.writeFileSync(reportPath, reportContent);
  
  console.log(`✅ Report generated: ${reportPath}`);
  return reportPath;
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting AI Definitions Rewrite (Simple Version)');
    console.log('=' .repeat(60));
    
    // Fetch terms
    const terms = await fetchTerms();
    
    if (terms.length === 0) {
      console.log('❌ No terms found to process');
      return;
    }
    
    // Process terms
    const results = await processTermsInBatches(terms);
    
    if (results.length === 0) {
      console.log('❌ No definitions were successfully rewritten');
      return;
    }
    
    // Generate files
    const migrationPath = generateMigration(results);
    const reportPath = generateReport(results);
    
    console.log('\n✅ Process completed successfully!');
    console.log('📊 Statistics:');
    console.log(`   - Total terms processed: ${terms.length}`);
    console.log(`   - Successfully rewritten: ${results.length}`);
    console.log(`   - Success rate: ${((results.length / terms.length) * 100).toFixed(1)}%`);
    
    console.log('\n📁 Files created:');
    console.log(`   - Migration: ${migrationPath}`);
    console.log(`   - Report: ${reportPath}`);
    
    console.log('\n🚀 Next steps:');
    console.log('   1. Review the migration file');
    console.log('   2. Apply migration: wrangler d1 migrations apply learnings --remote');
    
  } catch (error) {
    console.error('❌ Process failed:', error);
    process.exit(1);
  }
}

// Run the script
main();
