const fs = require('fs');
const path = require('path');

// Export ALL terms by fetching all pages
async function exportAllTerms() {
  try {
    console.log('Fetching all terms from API...');
    
    const apiUrl = 'https://api.learnings.org/api/terms';
    let allTerms = [];
    let nextCursor = null;
    let page = 1;
    
    do {
      console.log(`Fetching page ${page}...`);
      
      const url = nextCursor ? `${apiUrl}?cursor=${encodeURIComponent(nextCursor)}` : apiUrl;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      const terms = data.items || [];
      
      allTerms = allTerms.concat(terms);
      nextCursor = data.nextCursor;
      page++;
      
      console.log(`  Found ${terms.length} terms (total: ${allTerms.length})`);
      
      // Safety break to prevent infinite loops
      if (page > 50) {
        console.log('⚠️  Stopping after 50 pages to prevent infinite loop');
        break;
      }
      
    } while (nextCursor);
    
    console.log(`\n📊 Total terms found: ${allTerms.length}`);
    
    if (allTerms.length === 0) {
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
    
    allTerms.forEach(term => {
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
    const outputFile = path.join(__dirname, '..', 'terms_export_all.csv');
    fs.writeFileSync(outputFile, csvContent);
    
    console.log(`✅ Exported ${allTerms.length} terms to: ${outputFile}`);
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
    
    // Show some stats
    const statusCounts = {};
    const tagCounts = {};
    
    allTerms.forEach(term => {
      statusCounts[term.status] = (statusCounts[term.status] || 0) + 1;
      
      if (Array.isArray(term.tags)) {
        term.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    console.log('\n📈 Statistics:');
    console.log('Status distribution:', statusCounts);
    console.log('Top 10 tags:', Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => `${tag} (${count})`)
      .join(', '));
    
  } catch (error) {
    console.error('Error exporting terms:', error.message);
    process.exit(1);
  }
}

// Run the export
exportAllTerms();
