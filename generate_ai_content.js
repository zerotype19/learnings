const fs = require('fs');

// Terms that were just added
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

// Generate SQL to update definitions and examples
let sql = '-- Update terms with AI-generated definitions and examples\n\n';

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
  
  switch (term) {
    case "Act your wage":
      definition = "The passive-aggressive corporate philosophy that suggests employees should only work as hard as their salary justifies, often used to justify minimal effort or quiet quitting.";
      example = "When Sarah was asked to stay late for the third time this week, she replied, 'I'm going to act my wage and head home at 5 PM sharp.'";
      break;
      
    case "Balls in the air":
      definition = "A colorful metaphor for juggling multiple projects, tasks, or responsibilities simultaneously, often used to sound busy rather than organized.";
      example = "The manager proudly announced, 'I've got 47 balls in the air right now,' while secretly hoping no one would ask for specifics on any of them.";
      break;
      
    case "Push the envelope":
      definition = "Corporate speak for 'try something new' or 'take risks,' often used to sound innovative while actually meaning 'do more with less.'";
      example = "The CEO's quarterly message: 'We need to push the envelope on cost-cutting initiatives while maintaining our commitment to excellence and employee satisfaction.'";
      break;
      
    case "Effective accelerationism":
      definition = "A tech philosophy that advocates for rapid technological advancement, often used to justify reckless AI development or questionable business practices.";
      example = "The startup's motto: 'We're practicing effective accelerationism by releasing our AI product in beta to 10 million users without proper safety testing.'";
      break;
      
    case "Change agent":
      definition = "A corporate title for someone whose job is to make other people's jobs different, usually without asking them first.";
      example = "Meet our new Change Agent, whose primary responsibility is to 'facilitate transformation' by sending weekly emails about 'evolving paradigms.'";
      break;
      
    case "Deliverables":
      definition = "Corporate jargon for 'things you promised to do,' often used to make simple tasks sound more important than they actually are.";
      example = "The project manager's status update: 'Our key deliverables this quarter include deliverables for the deliverables initiative and a deliverable on deliverable optimization.'";
      break;
      
    case "Bleeding edge":
      definition = "A more dramatic way of saying 'cutting edge,' used to describe technology that's so new it might actually cause you to bleed from frustration.";
      example = "Our bleeding-edge AI platform is so advanced that it crashes every 15 minutes, but that's just the price of innovation.";
      break;
      
    case "Mission critical":
      definition = "A term used to describe tasks that are absolutely essential, usually applied to things that are actually just mildly important.";
      example = "The CEO declared that updating the office coffee machine was mission critical to maintaining team morale and productivity.";
      break;
      
    case "Idea harvesting":
      definition = "The corporate practice of collecting ideas from employees, usually to ignore them completely while claiming to value innovation.";
      example = "The quarterly idea harvesting session yielded 200 brilliant suggestions, all of which were immediately filed under 'Future Considerations (Never).'";
      break;
      
    case "Spidey sense":
      definition = "Corporate slang for intuition or gut feeling, often used to justify decisions made without actual data or analysis.";
      example = "The manager's hiring decision was based entirely on his 'spidey sense' that the candidate 'felt right' for the role.";
      break;
      
    case "Pain point":
      definition = "Business jargon for 'problem,' used to make customer complaints sound more sophisticated and marketable.";
      example = "Our customer's primary pain point is that our product doesn't work, which we've rebranded as a 'user experience optimization opportunity.'";
      break;
      
    case "Hardcore":
      definition = "Corporate slang for 'intense' or 'serious,' often used by middle-aged executives trying to sound cool and edgy.";
      example = "The 45-year-old VP announced, 'We're going hardcore on this Q4 push,' while adjusting his reading glasses.";
      break;
      
    case "PIP (performance improvement plan)":
      definition = "A corporate euphemism for 'you're about to be fired,' disguised as a helpful development opportunity.";
      example = "HR called it a 'Performance Improvement Plan,' but everyone knew it was really a 'Please Improve or Pack' notice.";
      break;
      
    case "RTO (return to office)":
      definition = "Corporate mandate requiring employees to return to physical office spaces, often implemented without considering employee preferences or productivity data.";
      example = "The CEO's RTO announcement: 'We're a family, and families eat dinner together in the same room, even if that room has fluorescent lighting and no windows.'";
      break;
      
    case "Offboarding":
      definition = "Corporate HR speak for 'firing someone,' made to sound like a gentle process of helping them exit the company.";
      example = "The offboarding process includes a 47-slide PowerPoint presentation about 'new opportunities' and a company-branded stress ball.";
      break;
      
    case "Hero culture":
      definition = "A toxic workplace dynamic where employees are expected to work excessive hours and sacrifice personal time to 'save the day' for the company.";
      example = "Our hero culture means that the employee who works 80-hour weeks gets a pizza party, while the one who maintains work-life balance gets labeled as 'not committed.'";
      break;
      
    case "Leading via influence":
      definition = "A management technique where you try to get people to do things without actually having the authority to tell them to do it.";
      example = "The project manager's strategy of 'leading via influence' mostly involved sending passive-aggressive emails and hoping for the best.";
      break;
      
    case "Paradigm shift":
      definition = "Corporate buzzword for 'change,' used to make routine updates sound revolutionary and groundbreaking.";
      example = "The company announced a 'paradigm shift' in their approach to coffee breaks, which meant moving the break room 50 feet to the left.";
      break;
      
    case "Actionable insights":
      definition = "Business jargon for 'useful information,' often used to describe data that everyone already knew but now has a fancy name.";
      example = "The quarterly report provided actionable insights revealing that 'customers prefer products that actually work' and 'employees like being paid on time.'";
      break;
      
    case "Inflection point":
      definition = "Corporate speak for 'important moment,' used to make routine business decisions sound more significant and strategic.";
      example = "The CEO declared this meeting an 'inflection point' in company history, right before announcing that the office would switch from blue pens to black pens.";
      break;
      
    case "Portfolio agility":
      definition = "Business jargon for 'being able to change direction quickly,' often used to justify constant pivoting and lack of focus.";
      example = "Our portfolio agility allows us to pivot from AI to blockchain to NFTs to whatever's trending on LinkedIn this week.";
      break;
      
    case "Proximity bias":
      definition = "The tendency to favor employees who are physically present in the office, often leading to unfair advantages for those who can afford to be there.";
      example = "The proximity bias was evident when the remote worker's brilliant idea was credited to the person sitting next to the manager in the office.";
      break;
      
    case "Prompt engineering":
      definition = "The art of crafting the perfect question to get AI to do what you want, often requiring more skill than the actual task itself.";
      example = "The prompt engineering workshop taught employees how to ask ChatGPT to 'write a professional email that sounds like I care about this project.'";
      break;
      
    case "Feedforward":
      definition = "A corporate euphemism for 'feedback,' made to sound more positive and future-focused than the traditional term.";
      example = "Instead of giving feedback, we now provide 'feedforward' - same criticism, but with a more optimistic spin and 47% more buzzwords.";
      break;
      
    default:
      definition = `A corporate buzzword that sounds important but probably isn't.`;
      example = `Example usage: "We need to leverage our ${term} to optimize synergies."`;
  }
  
  // Escape single quotes in strings
  const escapedDefinition = definition.replace(/'/g, "''");
  const escapedExample = example.replace(/'/g, "''");
  
  sql += `UPDATE terms_v2 
SET 
  definition = '${escapedDefinition}',
  examples = '${escapedExample}',
  updated_at = '${new Date().toISOString()}'
WHERE title = '${escapedTitle}';

`;
}

// Write to file
fs.writeFileSync('update_ai_content.sql', sql);
console.log('SQL file generated: update_ai_content.sql');
console.log(`Generated ${terms.length} UPDATE statements with witty definitions and examples`);
