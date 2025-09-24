const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'corporate_buzzwords_500_new.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV (simple parser for this specific format)
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0].split(',').map(h => h.trim());

console.log('Headers:', headers);

// Process each data row
const terms = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  
  // Simple CSV parsing (handles quoted fields)
  const fields = [];
  let current = '';
  let inQuotes = false;
  
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  
  if (fields.length >= 11) {
    const [id, slug, title, definition, short_def, examples, tags, status, views, seq, created_at, updated_at] = fields;
    
    // Parse tags (remove quotes and split by semicolon)
    const tagArray = tags
      .replace(/^"|"$/g, '') // Remove surrounding quotes
      .split(';')
      .map(t => t.trim())
      .filter(t => t);
    
    terms.push({
      id,
      slug,
      title,
      definition,
      examples,
      tags: JSON.stringify(tagArray),
      status,
      views: parseInt(views) || 0,
      seq: parseInt(seq) || 0,
      created_at,
      updated_at
    });
  }
}

console.log(`Processed ${terms.length} terms`);

// Generate SQL INSERT statements
const sqlStatements = terms.map(term => {
  return `INSERT OR IGNORE INTO terms_v2 (
    id, slug, title, definition, examples, tags, 
    status, views, seq, created_at, updated_at
  ) VALUES (
    '${term.id}',
    '${term.slug}',
    '${term.title.replace(/'/g, "''")}',
    '${term.definition.replace(/'/g, "''")}',
    '${term.examples.replace(/'/g, "''")}',
    '${term.tags}',
    '${term.status}',
    ${term.views},
    ${term.seq},
    '${term.created_at}',
    '${term.updated_at}'
  );`;
});

// Write to SQL file
const sqlContent = `-- Import 500 new corporate buzzwords from CSV
-- Generated on ${new Date().toISOString()}

PRAGMA foreign_keys=ON;

${sqlStatements.join('\n\n')}

-- Update sequence numbers to be sequential
UPDATE terms_v2 SET seq = (
  SELECT COUNT(*) FROM terms_v2 t2 
  WHERE t2.created_at <= terms_v2.created_at
) WHERE id LIKE 'term_%';

-- Add some sample votes for engagement
INSERT OR IGNORE INTO votes (id, term_id, user_fingerprint, reaction, created_at)
SELECT 
  'vote_' || substr(hex(randomblob(16)), 1, 8),
  t.id,
  'csv_import_500_' || substr(hex(randomblob(8)), 1, 8),
  CASE (random() % 3)
    WHEN 0 THEN 'cringe'
    WHEN 1 THEN 'heard1000x' 
    ELSE 'chefskiss'
  END,
  strftime('%s','now')*1000
FROM terms_v2 t 
WHERE t.id LIKE 'term_%' AND t.created_at >= '2025-09-24 03:00:00'
LIMIT 100;
`;

const outputPath = path.join(__dirname, '..', 'infra', 'd1-migrations', '034_import_500_new_buzzwords.sql');
fs.writeFileSync(outputPath, sqlContent);

console.log(`Generated SQL file: ${outputPath}`);
console.log(`Total terms to import: ${terms.length}`);

// Show first few terms as preview
console.log('\nPreview of first 5 terms:');
terms.slice(0, 5).forEach(term => {
  console.log(`- ${term.title} (${term.slug})`);
});

// Show some stats
const statusCounts = {};
const tagCounts = {};

terms.forEach(term => {
  statusCounts[term.status] = (statusCounts[term.status] || 0) + 1;
  
  try {
    const tagsArray = JSON.parse(term.tags);
    tagsArray.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  } catch (e) {
    // Ignore parsing errors
  }
});

console.log('\n📈 Statistics:');
console.log('Status distribution:', statusCounts);
console.log('Top 10 tags:', Object.entries(tagCounts)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 10)
  .map(([tag, count]) => `${tag} (${count})`)
  .join(', '));
