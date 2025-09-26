const fs = require('fs');

// Large batch of terms to add
const terms = [
  "North Star metric", "Zero-click content", "Quiet quitting", "Product-led growth", "Culture add",
  "Digital twin", "Deep dive", "AI-first", "Cloud-native", "Always-on", "Resilient supply chain",
  "Creator economy", "Asynchronous work", "Continuous discovery", "Test-and-learn", "Fail fast",
  "Modern data stack", "Big bet", "Customer obsession", "Agile at scale", "Hybrid workforce",
  "Virtual-first", "Carbon neutral", "Net zero", "Circular economy", "Data fabric",
  "Composable architecture", "No-code", "Low-code", "Citizen developer", "Infinite loop",
  "Operationalize", "Unlock value", "Unlock growth", "Value creation", "Hypergrowth",
  "Hyperpersonalization", "Smart brevity", "Radical candor", "Storyselling", "Earned-first",
  "De-platforming", "Dark funnel", "Owned attention", "Infinite scroll", "Snackable content",
  "Content velocity", "Customer journey orchestration", "Next best action", "Omnichannel",
  "Clickstream", "Digital exhaust", "Edge compute", "Data mesh", "Self-serve analytics",
  "Data democratization", "Insight to action", "Single source of truth", "Cloud migration",
  "Lift and shift", "Microservices", "Containerization", "API-first", "Platformization",
  "Monetize attention", "Demand capture", "Demand creation", "Dark social", "Attention arbitrage",
  "Influencer flywheel", "Ambidextrous leadership", "Inclusive design", "Experience-led growth",
  "Customer intimacy", "Journey mapping", "Trust gap", "Reputation capital", "Social capital",
  "Return on experience", "Engagement rate", "Attribution modeling", "Incrementality",
  "Media mix modeling", "Multi-touch attribution", "Data clean room", "Identity resolution",
  "Privacy-first", "Consent management", "Value exchange", "Attention economy", "Generative AI",
  "Retrieval augmented generation", "AI copilots", "Synthetic data", "Prompt marketplace",
  "Model collapse", "Alignment tax", "Agentic workflows", "AI governance", "Explainability",
  "Responsible AI", "Ethical AI", "Bias mitigation", "AI hallucination", "Synthetic personas",
  "Voice of customer", "Customer data platform", "Growth audiences", "Always-on audiences",
  "Eligibility model", "Next-gen CRM", "Revenue operations", "RevOps", "Sales enablement",
  "Predictable pipeline", "ABM (account-based marketing)", "Customer-led growth",
  "Community-led growth", "GTM motion", "Category design", "Demand gen", "Product-market fit",
  "Retention curve", "Churn mitigation", "Expansion motion", "Wallet share",
  "Customer lifetime value", "Land and expand", "Consumption-based pricing", "Subscription fatigue",
  "Dynamic pricing", "Smart contracts", "Tokenization", "Web3", "NFT drop", "Digital wallet",
  "Metaverse", "Immersive commerce", "Virtual showroom", "Shoppable content", "Social commerce",
  "Retail media", "Connected TV", "Attention currency", "Commerce media", "Identity graph",
  "Privacy sandbox", "Cookieless future", "Signal loss", "Data portability", "On-demand everything",
  "Frictionless checkout", "Headless commerce", "Buy now pay later", "Embedded finance",
  "Financial inclusion", "Resilient leadership", "Future of work", "Talent marketplace",
  "Fractional executive", "Skills-based hiring", "Reskilling", "Upskilling", "Career cushioning"
];

console.log(`Processing ${terms.length} terms...`);

// Generate SQL for each term
let sql = '-- Add large batch of modern corporate buzzwords\n\n';

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
  
  // Generate witty, satirical definitions and examples
  let definition, example;
  
  // Generate definitions based on term patterns
  if (term.includes('AI') || term.includes('artificial intelligence')) {
    definition = `AI-related corporate buzzword that sounds futuristic but usually means "we're not sure how this works yet."`;
    example = `The CTO announced our new ${term} initiative, which will revolutionize everything except our ability to explain what it actually does.`;
  } else if (term.includes('data') || term.includes('analytics')) {
    definition = `Data-related jargon that makes simple information sound incredibly sophisticated and expensive.`;
    example = `Our ${term} platform transforms basic reporting into a $2M annual subscription service.`;
  } else if (term.includes('customer') || term.includes('user')) {
    definition = `Customer-focused buzzword that makes it sound like you care about people more than profits.`;
    example = `We're implementing ${term} to put customers first, right after we finish optimizing for shareholder value.`;
  } else if (term.includes('growth') || term.includes('scale')) {
    definition = `Growth-related corporate speak that promises exponential results with minimal effort.`;
    example = `Our ${term} strategy will 10x our revenue while reducing costs by 90% and improving employee satisfaction.`;
  } else if (term.includes('digital') || term.includes('virtual')) {
    definition = `Digital transformation buzzword that makes traditional processes sound cutting-edge.`;
    example = `We're going ${term} to modernize our approach to doing things the same way we always have.`;
  } else if (term.includes('work') || term.includes('team')) {
    definition = `Workplace buzzword that makes employment sound like a revolutionary new concept.`;
    example = `Our ${term} initiative will transform how we work, starting with this 47-slide PowerPoint presentation.`;
  } else if (term.includes('value') || term.includes('return')) {
    definition = `Value-related corporate speak that makes basic business concepts sound like rocket science.`;
    example = `We're optimizing our ${term} to maximize shareholder value while minimizing actual value for customers.`;
  } else if (term.includes('content') || term.includes('media')) {
    definition = `Content-related buzzword that makes simple communication sound like a complex strategy.`;
    example = `Our ${term} approach will revolutionize how we tell people things they already know.`;
  } else if (term.includes('platform') || term.includes('ecosystem')) {
    definition = `Platform buzzword that makes basic software sound like a universe of possibilities.`;
    example = `We're building a ${term} that will connect everything, except the things that actually need connecting.`;
  } else if (term.includes('future') || term.includes('next-gen')) {
    definition = `Future-focused buzzword that makes current technology sound outdated.`;
    example = `Our ${term} approach will prepare us for tomorrow, assuming tomorrow looks exactly like today.`;
  } else {
    // Generic witty definition
    definition = `Modern corporate buzzword that sounds important but probably isn't.`;
    example = `The consultant recommended implementing ${term} to optimize our synergies and maximize our paradigm shifts.`;
  }
  
  // Escape single quotes in strings
  const escapedDefinition = definition.replace(/'/g, "''");
  const escapedExample = example.replace(/'/g, "''");
  
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
  '${escapedDefinition}',
  '${escapedExample}',
  '${slug}',
  '[]',
  0,
  '${new Date().toISOString()}',
  '${new Date().toISOString()}',
  'published'
);\n\n`;
}

// Write to file
fs.writeFileSync('add_large_terms_batch.sql', sql);
console.log('SQL file generated: add_large_terms_batch.sql');
console.log(`Generated ${terms.length} INSERT statements`);
