const fs = require('fs');
const path = require('path');

// This script will be run via wrangler d1 to export terms data
// We'll use wrangler d1 execute to run a query and then process the results

console.log('Exporting terms table to CSV...');

// First, let's create a SQL query to export all terms
const exportQuery = `
SELECT 
  id,
  slug,
  title,
  definition,
  short_def,
  examples,
  tags,
  status,
  views,
  seq,
  created_at,
  updated_at
FROM terms_v2 
WHERE status = 'published'
ORDER BY seq ASC, created_at ASC;
`;

// Write the query to a temporary file
const queryFile = path.join(__dirname, '..', 'temp_export_query.sql');
fs.writeFileSync(queryFile, exportQuery);

console.log('Query file created. Run this command to export:');
console.log(`cd apps/api && npx wrangler d1 execute learnings --remote --file=../../temp_export_query.sql --output=json > ../../terms_export.json`);
console.log('');
console.log('Then run: node scripts/process-export.js');
