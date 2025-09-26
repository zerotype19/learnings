const fs = require('fs');
const csv = require('csv-parser');

// Cloudflare D1 API configuration
const ACCOUNT_ID = 'your-account-id'; // We'll get this from wrangler
const DATABASE_ID = 'af30f5a0-193d-464f-8019-b82c71bdcfb5';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

async function importTerms() {
  console.log('Starting import of terms_from_list_v2.csv to remote D1...');
  
  const terms = [];
  
  // Read CSV file
  await new Promise((resolve, reject) => {
    fs.createReadStream('terms_from_list_v2.csv')
      .pipe(csv())
      .on('data', (row) => {
        // Skip empty rows
        if (row.term && row.definition) {
          terms.push({
            title: row.term.trim(),
            definition: row.definition.trim(),
            suggested_alternative: row.suggested_alternative ? row.suggested_alternative.trim() : null
          });
        }
      })
      .on('end', resolve)
      .on('error', reject);
  });
  
  console.log(`Found ${terms.length} terms to import`);
  
  // Process terms in batches
  const batchSize = 10;
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < terms.length; i += batchSize) {
    const batch = terms.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(terms.length/batchSize)}...`);
    
    for (const term of batch) {
      try {
        // Create slug from title
        const slug = term.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        
        // Create SQL statement
        const sql = `
          INSERT INTO terms_v2 (
            title, 
            definition, 
            slug, 
            tags, 
            views, 
            created_at, 
            updated_at,
            status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const args = [
          term.title,
          term.definition,
          slug,
          JSON.stringify([]), // Empty tags array
          0, // Initial views
          new Date().toISOString(),
          new Date().toISOString(),
          'published'
        ];
        
        // Execute via wrangler
        const { exec } = require('child_process');
        const command = `npx wrangler d1 execute learnings --remote --command="${sql.replace(/"/g, '\\"')}" --args='${JSON.stringify(args)}'`;
        
        await new Promise((resolve, reject) => {
          exec(command, { cwd: 'apps/api' }, (error, stdout, stderr) => {
            if (error) {
              // Check if it's a duplicate key error
              if (stderr.includes('UNIQUE constraint failed') || stderr.includes('duplicate key')) {
                console.log(`⚠ Skipping duplicate: ${term.title}`);
                resolve();
              } else {
                reject(error);
              }
            } else {
              successCount++;
              console.log(`✓ Imported: ${term.title}`);
              resolve();
            }
          });
        });
        
      } catch (error) {
        errorCount++;
        console.error(`✗ Error importing ${term.title}:`, error.message);
      }
    }
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\nImport complete!`);
  console.log(`✓ Successfully imported: ${successCount} terms`);
  console.log(`✗ Errors: ${errorCount} terms`);
}

// Run the import
importTerms().catch(console.error);
