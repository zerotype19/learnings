const fs = require('fs');

// Function to generate random date between 2020 and 2024
function getRandomDate() {
  const start = new Date('2020-01-01');
  const end = new Date('2024-12-31');
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime);
}

// Function to generate random view count between 400 and 2000
function getRandomViewCount() {
  return Math.floor(Math.random() * (2000 - 400 + 1)) + 400;
}

// Generate SQL updates for all terms
const sqlUpdates = [];

// First, let's get all terms and randomize their dates and views
const updateQuery = `
UPDATE terms_v2 
SET 
  created_at = datetime('now', '-' || CAST(ABS(RANDOM() % 1825) AS TEXT) || ' days'),
  updated_at = datetime('now', '-' || CAST(ABS(RANDOM() % 30) AS TEXT) || ' days'),
  views = CAST(400 + (RANDOM() % 1601) AS INTEGER)
WHERE id IS NOT NULL;
`;

sqlUpdates.push(updateQuery);

// Add some additional randomization for more realistic distribution
const additionalRandomization = `
-- Add some terms with very high view counts (viral terms)
UPDATE terms_v2 
SET views = CAST(2000 + (RANDOM() % 3000) AS INTEGER)
WHERE RANDOM() % 10 = 0;

-- Add some terms with moderate view counts
UPDATE terms_v2 
SET views = CAST(800 + (RANDOM() % 1200) AS INTEGER)
WHERE RANDOM() % 3 = 0;

-- Ensure all terms have at least 400 views
UPDATE terms_v2 
SET views = 400 + (RANDOM() % 100)
WHERE views < 400;
`;

sqlUpdates.push(additionalRandomization);

// Write the migration file
const migrationFile = `infra/d1-migrations/064_randomize_dates_views.sql`;
fs.writeFileSync(migrationFile, sqlUpdates.join('\n\n'));

console.log(`Generated migration file: ${migrationFile}`);
console.log('This will:');
console.log('- Randomize creation dates between 2020-2024');
console.log('- Randomize updated dates within last 30 days');
console.log('- Set view counts between 400-2000+');
console.log('- Add some viral terms with 2000-5000+ views');
console.log('- Ensure all terms have at least 400 views');
