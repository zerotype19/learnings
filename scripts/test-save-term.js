// Test script for saving buzzword terms
// Run with: node scripts/test-save-term.js

const API_URL = 'https://api.learnings.org';

async function testSaveTerm() {
  console.log('💾 Testing Save Term Functionality');
  console.log('==================================\n');

  const testData = {
    buzzword: "Test Buzzword",
    definition: "A test buzzword created by the API test script to verify the save functionality works correctly.",
    example: "We need to test buzzword this initiative to ensure everything is working properly.",
    tags: ["test", "buzzword", "generator"],
    scenario: "Testing the save term functionality to ensure it works correctly"
  };

  console.log('Test Data:');
  console.log(`- Buzzword: "${testData.buzzword}"`);
  console.log(`- Definition: "${testData.definition}"`);
  console.log(`- Example: "${testData.example}"`);
  console.log(`- Tags: [${testData.tags.join(', ')}]`);
  console.log(`- Scenario: "${testData.scenario}"`);
  console.log('');

  try {
    console.log('Sending save request...');
    const response = await fetch(`${API_URL}/api/buzzword/save-term`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success!');
      console.log(`- Term ID: ${data.termId}`);
      console.log(`- Slug: ${data.slug}`);
      console.log(`- URL: ${data.url}`);
    } else {
      const error = await response.json();
      console.log(`❌ Error: ${error.error || response.statusText}`);
      console.log(`Status: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Network Error: ${error.message}`);
  }

  console.log('\n🏁 Test completed!');
}

// Run the test
testSaveTerm().catch(console.error);
