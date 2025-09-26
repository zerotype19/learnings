// Test script for buzzword generator API
// Run with: node scripts/test-buzzword-api.js

const API_URL = 'https://api.learnings.org';

async function testBuzzwordGeneration() {
  console.log('🎯 Testing Buzzword Generator API');
  console.log('==================================\n');

  const testScenarios = [
    "Managers renaming layoffs as talent mobility",
    "Meetings to plan the next meeting", 
    "Old product rebranded as AI",
    "Dashboards refreshed weekly with no insights",
    "Executives reframing problems as opportunities"
  ];

  for (let i = 0; i < testScenarios.length; i++) {
    const scenario = testScenarios[i];
    console.log(`Test ${i + 1}: "${scenario}"`);
    
    try {
      const response = await fetch(`${API_URL}/api/buzzword/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario,
          tone: 'snarky',
          format: 'surprise',
          edge: 'safe'
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Generated: "${data.buzzword}"`);
        if (data.why) {
          console.log(`   Why: ${data.why}`);
        }
      } else {
        const error = await response.json();
        console.log(`❌ Error: ${error.error || response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ Network Error: ${error.message}`);
    }
    
    console.log(''); // Empty line for readability
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('🏁 Test completed!');
}

// Run the test
testBuzzwordGeneration().catch(console.error);
