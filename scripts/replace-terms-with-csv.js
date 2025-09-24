const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvFile = 'corporate_buzzwords_500_varied.csv';
const csvPath = path.join(__dirname, '..', csvFile);

if (!fs.existsSync(csvPath)) {
  console.error(`CSV file not found: ${csvPath}`);
  console.log('Please ensure the corporate_buzzwords_500_varied.csv file is in the project root directory.');
  process.exit(1);
}

console.log('Reading CSV file...');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.trim().split('\n');
const header = lines[0].split(',');
const dataLines = lines.slice(1);

// Simple CSV parser that handles quoted fields with commas
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

console.log(`Found ${dataLines.length} terms in CSV file`);

// Generate SQL migration
const migrationContent = `-- Migration: Replace all terms with corporate_buzzwords_500_varied.csv
-- Generated on: ${new Date().toISOString()}

-- Disable foreign key constraints temporarily
PRAGMA foreign_keys=OFF;

-- Clear existing data
DELETE FROM votes;
DELETE FROM term_aliases;
DELETE FROM term_links;
DELETE FROM terms_v2;

-- Insert new terms
${dataLines.map((line, index) => {
  const values = parseCSVLine(line);
  
  // Parse the CSV values
  const id = values[0] || `term_${index + 1}`;
  const slug = values[1] || `term-${index + 1}`;
  const title = values[2] || `Term ${index + 1}`;
  const definition = values[3] || 'No definition available';
  const examples = values[5] || '';
  const tags = values[6] || 'corporate';
  const status = values[7] || 'published';
  const views = parseInt(values[8]) || 0;
  const seq = index + 1; // Generate unique sequence numbers
  const createdAt = values[10] || new Date().toISOString().replace('T', ' ').replace('Z', '');
  const updatedAt = values[11] || new Date().toISOString().replace('T', ' ').replace('Z', '');

  // Convert tags from semicolon-separated to JSON array
  const tagsArray = tags.split(';').map(tag => tag.trim()).filter(tag => tag);
  const tagsJson = JSON.stringify(tagsArray);

  return `INSERT INTO terms_v2 (
    id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
  ) VALUES (
    '${id}',
    '${slug}',
    '${title.replace(/'/g, "''")}',
    '${definition.replace(/'/g, "''")}',
    '${examples.replace(/'/g, "''")}',
    '${tagsJson}',
    '${status}',
    ${views},
    ${seq},
    '${createdAt}',
    '${updatedAt}'
  );`;
}).join('\n')}

-- Add some sample votes for the new terms
${dataLines.slice(0, 20).map((line, index) => {
  const values = parseCSVLine(line);
  const termId = values[0] || `term_${index + 1}`;
  
  return `INSERT INTO votes (term_id, user_fingerprint, reaction, created_at) VALUES ('${termId}', 'sample_user_${index + 1}', 'up', ${Date.now()});`;
}).join('\n')}

-- Re-enable foreign key constraints
PRAGMA foreign_keys=ON;
`;

// Write migration file
const migrationFileName = `038_replace_terms_with_varied_fixed_csv`;
const migrationPath = path.join(__dirname, '..', 'infra', 'd1-migrations', `${migrationFileName}.sql`);

fs.writeFileSync(migrationPath, migrationContent);

console.log(`Migration file created: ${migrationPath}`);
console.log(`Ready to apply migration with: wrangler d1 migrations apply --remote`);
