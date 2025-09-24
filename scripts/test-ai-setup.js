// Test script to verify AI rewrite setup
const fs = require('fs');

console.log('🧪 Testing AI Rewrite Setup');
console.log('============================');
console.log('');

// Check OpenAI API key
if (process.env.OPENAI_API_KEY) {
  console.log('✅ OPENAI_API_KEY is set');
  console.log(`   Key starts with: ${process.env.OPENAI_API_KEY.substring(0, 8)}...`);
} else {
  console.log('❌ OPENAI_API_KEY is not set');
  console.log('   Please set it with: export OPENAI_API_KEY="your-key-here"');
  process.exit(1);
}

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.log('❌ Not in project root directory');
  process.exit(1);
}

console.log('✅ Project directory confirmed');

// Check if API is accessible
async function testAPI() {
  try {
    const response = await fetch('https://api.learnings.org/api/terms?limit=1');
    if (response.ok) {
      console.log('✅ API is accessible');
      const data = await response.json();
      console.log(`   Found ${data.items?.length || 0} terms in test query`);
    } else {
      console.log('❌ API is not accessible');
      console.log(`   Status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ API test failed:', error.message);
  }
}

// Test OpenAI API
async function testOpenAI() {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'user', content: 'Say "test successful" if you can read this.' }
        ],
        max_tokens: 10
      })
    });
    
    if (response.ok) {
      console.log('✅ OpenAI API is accessible');
    } else {
      console.log('❌ OpenAI API test failed');
      console.log(`   Status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ OpenAI API test failed:', error.message);
  }
}

async function runTests() {
  await testAPI();
  await testOpenAI();
  
  console.log('');
  console.log('🚀 Setup looks good! You can now run:');
  console.log('   node scripts/ai-rewrite-definitions.js');
}

runTests().catch(console.error);
