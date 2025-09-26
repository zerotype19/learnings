const fs = require('fs');
const csv = require('csv-parser');

async function generateSQL() {
  console.log('Generating SQL import statements...');
  
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
  
  // Generate SQL statements
  let sql = '-- Import terms from terms_from_list_v2.csv\n\n';
  
  for (const term of terms) {
    // Create slug from title
    const slug = term.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // Escape single quotes in strings
    const escapedTitle = term.title.replace(/'/g, "''");
    const escapedDefinition = term.definition.replace(/'/g, "''");
    
    sql += `INSERT OR IGNORE INTO terms_v2 (
  title, 
  definition, 
  slug, 
  tags, 
  views, 
  created_at, 
  updated_at,
  status
) VALUES (
  '${escapedTitle}',
  '${escapedDefinition}',
  '${slug}',
  '[]',
  0,
  '${new Date().toISOString()}',
  '${new Date().toISOString()}',
  'published'
);\n\n`;
  }
  
  // Write to file
  fs.writeFileSync('import_terms_v2.sql', sql);
  console.log('SQL file generated: import_terms_v2.sql');
  console.log(`Generated ${terms.length} INSERT statements`);
}

generateSQL().catch(console.error);
