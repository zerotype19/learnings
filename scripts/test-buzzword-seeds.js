// Test script for buzzword generator seed scenarios
// Run with: node scripts/test-buzzword-seeds.js

const seedScenarios = [
  { scenario: "Managers renaming layoffs as talent mobility", expected: "Mobility Washing" },
  { scenario: "Meetings to plan the next meeting", expected: "Calendar Creep" },
  { scenario: "Old product rebranded as AI", expected: "Model Washing" },
  { scenario: "Dashboards refreshed weekly with no insights", expected: "Metric Mirage" },
  { scenario: "Executives reframing problems as opportunities", expected: "Opportunity Theater" },
  { scenario: "Standups all day, zero shipping", expected: "Agile Theater" },
  { scenario: "Renaming bugs as enhancements", expected: "Enhancement Washing" },
  { scenario: "Reorg chaos sold as simplification", expected: "Simplification Spin" },
  { scenario: "Twenty people in 'alignment' meetings", expected: "Alignment Overload" },
  { scenario: "Every plan turned into a framework", expected: "Framework Fever" },
  { scenario: "Interns titled Chief of Staff", expected: "Title Inflation" },
  { scenario: "Pilots that never launch", expected: "Pilot Purgatory" },
  { scenario: "New logo instead of strategy", expected: "Logo Therapy" },
  { scenario: "Process added until nothing ships", expected: "Process Paralysis" },
  { scenario: "Rightsizing used to mask layoffs", expected: "Rightsizing Theater" },
  { scenario: "OKRs rewritten weekly", expected: "Objective Drift" },
  { scenario: "New Slack channels instead of decisions", expected: "Channel Creep" },
  { scenario: "Support rebranded as success with no change", expected: "Success Washing" },
  { scenario: "Roadmap changes every sprint", expected: "Roadmap Roulette" },
  { scenario: "Buying tools to avoid training", expected: "SaaS Bandage" },
  { scenario: "Simple task becomes cross-functional saga", expected: "Complexity Inflation" },
  { scenario: "Only positive metrics reported", expected: "Dashboard Selective" },
  { scenario: "Press release posing as strategy", expected: "PR Strategy" },
  { scenario: "Minor update sold as breakthrough", expected: "Innovation Theater" },
  { scenario: "Mandatory office sold as flexibility", expected: "Flexibility Theater" },
  { scenario: "Renaming layoffs as redeployment", expected: "Redeploy Rhetoric" },
  { scenario: "Endless discovery, no delivery", expected: "Research Loop" },
  { scenario: "Brainstorm replaces commitment", expected: "Ideation Stall" },
  { scenario: "Vendor demo promises everything", expected: "Panacea Pitch" },
  { scenario: "Spreadsheets treated as truth", expected: "Excel Absolutism" }
];

console.log('🎯 Buzzword Generator Seed Scenarios');
console.log('=====================================\n');

seedScenarios.forEach((item, index) => {
  console.log(`${index + 1}. "${item.scenario}"`);
  console.log(`   → Expected: ${item.expected}\n`);
});

console.log(`Total scenarios: ${seedScenarios.length}`);
console.log('\nThese scenarios can be used to test the buzzword generator API endpoints:');
console.log('- POST /api/buzzword/generate');
console.log('- POST /api/buzzword/generate-definition');
console.log('- POST /api/buzzword/generate-example');
