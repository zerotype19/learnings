const fs = require('fs');
const path = require('path');

// Process the JSON export from wrangler d1 and convert to CSV
const jsonFile = path.join(__dirname, '..', 'terms_export.json');

if (!fs.existsSync(jsonFile)) {
  console.error('terms_export.json not found. Please run the export query first.');
  process.exit(1);
}

try {
  const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  
  // Extract the results from the wrangler output
  const results = jsonData[0]?.results || [];
  
  if (results.length === 0) {
    console.log('No terms found in export.');
    return;
  }
  
  console.log(`Processing ${results.length} terms...`);
  
  // Convert to CSV format
  const headers = [
    'id',
    'slug', 
    'title',
    'definition',
    'short_def',
    'examples',
    'tags',
    'status',
    'views',
    'seq',
    'created_at',
    'updated_at'
  ];
  
  // Escape CSV values
  function escapeCsvValue(value) {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }
  
  // Create CSV content
  const csvLines = [headers.join(',')];
  
  results.forEach(row => {
    const values = headers.map(header => {
      let value = row[header];
      
      // Handle tags array (convert from JSON string to readable format)
      if (header === 'tags' && value) {
        try {
          const tagsArray = JSON.parse(value);
          value = tagsArray.join('; ');
        } catch (e) {
          // Keep as is if not valid JSON
        }
      }
      
      return escapeCsvValue(value);
    });
    
    csvLines.push(values.join(','));
  });
  
  const csvContent = csvLines.join('\n');
  
  // Write to file
  const outputFile = path.join(__dirname, '..', 'terms_export.csv');
  fs.writeFileSync(outputFile, csvContent);
  
  console.log(`✅ Exported ${results.length} terms to: ${outputFile}`);
  console.log(`📊 File size: ${(csvContent.length / 1024).toFixed(2)} KB`);
  
  // Show preview of first few rows
  console.log('\n📋 Preview (first 3 terms):');
  const previewLines = csvLines.slice(0, 4); // Header + 3 rows
  previewLines.forEach((line, i) => {
    if (i === 0) {
      console.log(`Header: ${line.substring(0, 100)}...`);
    } else {
      const parts = line.split(',');
      console.log(`${i}. ${parts[2]} (${parts[1]}) - ${parts[4]?.substring(0, 50)}...`);
    }
  });
  
} catch (error) {
  console.error('Error processing export:', error.message);
  process.exit(1);
}
