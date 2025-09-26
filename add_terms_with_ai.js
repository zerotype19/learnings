const fs = require('fs');

// Terms to add
const terms = [
  "Act your wage",
  "Balls in the air", 
  "Push the envelope",
  "Effective accelerationism",
  "Change agent",
  "Deliverables",
  "Bleeding edge",
  "Mission critical",
  "Idea harvesting",
  "Spidey sense",
  "Pain point",
  "Hardcore",
  "PIP (performance improvement plan)",
  "RTO (return to office)",
  "Offboarding",
  "Hero culture",
  "Leading via influence",
  "Paradigm shift",
  "Actionable insights",
  "Inflection point",
  "Portfolio agility",
  "Proximity bias",
  "Prompt engineering",
  "Feedforward"
];

// Generate SQL for each term
let sql = '-- Add new terms with AI-generated definitions and examples\n\n';

for (const term of terms) {
  // Create slug from title
  const slug = term
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  // Escape single quotes in strings
  const escapedTitle = term.replace(/'/g, "''");
  
  // For now, we'll add placeholder definitions and examples
  // The AI generation will be done via the API after insertion
  const placeholderDefinition = `AI-generated definition for "${term}" - to be updated via API`;
  const placeholderExample = `AI-generated example for "${term}" - to be updated via API`;
  
  sql += `INSERT OR IGNORE INTO terms_v2 (
  title, 
  definition, 
  examples,
  slug, 
  tags, 
  views, 
  created_at, 
  updated_at,
  status
) VALUES (
  '${escapedTitle}',
  '${placeholderDefinition}',
  '${placeholderExample}',
  '${slug}',
  '[]',
  0,
  '${new Date().toISOString()}',
  '${new Date().toISOString()}',
  'published'
);\n\n`;
}

// Write to file
fs.writeFileSync('add_new_terms.sql', sql);
console.log('SQL file generated: add_new_terms.sql');
console.log(`Generated ${terms.length} INSERT statements`);
