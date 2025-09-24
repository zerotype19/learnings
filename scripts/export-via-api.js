const fs = require('fs');
const path = require('path');

// Export terms via the API instead of direct database access
async function exportTerms() {
  try {
    console.log('Fetching terms from API...');
    
    const apiUrl = 'https://api.learnings.org/api/terms';
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    const terms = data.items || [];
    
    console.log(`Found ${terms.length} terms`);
    
    if (terms.length === 0) {
      console.log('No terms found.');
      return;
    }
    
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
    
    terms.forEach(term => {
      const values = headers.map(header => {
        let value = term[header];
        
        // Handle tags array (convert from JSON array to readable format)
        if (header === 'tags' && Array.isArray(value)) {
          value = value.join('; ');
        }
        
        return escapeCsvValue(value);
      });
      
      csvLines.push(values.join(','));
    });
    
    const csvContent = csvLines.join('\n');
    
    // Write to file
    const outputFile = path.join(__dirname, '..', 'terms_export.csv');
    fs.writeFileSync(outputFile, csvContent);
    
    console.log(`✅ Exported ${terms.length} terms to: ${outputFile}`);
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
    console.error('Error exporting terms:', error.message);
    process.exit(1);
  }
}

// Run the export
exportTerms();
