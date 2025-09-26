const fs = require('fs');

const buzzwords = [
  "Circle back", "Low-hanging fruit", "Boil the ocean", "Pivot hard", "Move the needle",
  "Open the kimono", "Secret sauce", "Leverage synergies", "Ping me", "Thought shower",
  "Deep dive", "Quick win", "Blue-sky thinking", "Run it up the flagpole", "Herding cats",
  "Deckware", "Ping-pong priorities", "Zoom fatigue", "Spray and pray", "Take it offline",
  "Peel the onion", "Buy-in", "Sandbox it", "Table stakes", "Eat our own dog food",
  "Growth hacking", "Actionize", "Rightsize", "Drill down", "Win-win",
  "Core competency", "Double click", "Tiger team", "Brain dump", "Elevator pitch",
  "Strategic imperative", "Happy path", "Ecosystem play", "Thought leadership", "Level set",
  "Stakeholdering", "Business as usual", "Gold plating", "Hard stop", "Going forward",
  "Big rock", "Out of pocket", "Value-add", "Ideation session", "Seamless integration",
  "Mission-critical", "Capacity planning", "One-throat to choke", "Circle of trust", "Quick and dirty",
  "Pushback", "Ballpark it", "Holistic solutioning", "Core vs. explore", "Cross-functional",
  "Dynamic equilibrium", "Synergistic alignment", "Herd immunity (in biz talk)", "Ideate", "One-pager",
  "Move fast and break things", "Strategic north star", "Paradigm shift", "Bandwidth check", "Operationalize",
  "The ask", "White space", "Incentivize", "Seamless onboarding", "Socialize an idea",
  "Strategic clarity", "Competitive moat", "Boil it down", "Out of scope", "Align the org",
  "Business driver", "Pain point", "Game-changer", "Incentive alignment", "Key takeaway",
  "Iterate fast", "End-to-end solution", "Big bet", "Fail fast", "Test and learn",
  "Growth mindset", "Waterfall to agile", "Cross-pollinate", "Scale up", "Hard pivot",
  "Robust solution", "Leading edge", "Right-sizing", "Open loop", "Close the loop",
  "Best-in-class", "Re-baseline", "Workstream", "Thought partner", "Value prop",
  "Strategic lens", "Hypercare", "Work smarter, not harder", "Hit the ground running", "Close alignment",
  "Digital native", "Synergy capture", "Operational excellence", "Make it pop", "Nail it and scale it",
  "Outside the box", "Optics check", "Heavy lift", "Get alignment", "Strategic handshake",
  "In the weeds", "Future state", "Near-term wins", "Deck farming", "Pre-read",
  "Enterprise-wide", "Roll up your sleeves", "Change agent", "Value unlock", "The delta",
  "Red team it", "Put a pin in it", "Action item", "Greenfield opportunity", "Over the wall",
  "Swim lane", "Strategic pillar", "Hitting singles and doubles", "Unicorn thinking", "Business hygiene",
  "Land and expand", "Bake it in", "All-hands", "Back-channeling", "Transformational",
  "North Star metric", "New normal", "Future-proof", "Shock to the system", "Rinse and repeat"
];

function createSlug(term) {
  return term.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

function generateDefinition(term) {
  const definitions = {
    "Circle back": "A corporate way of saying 'I'll forget about this until you remind me again.' The art of appearing busy while doing absolutely nothing productive.",
    "Low-hanging fruit": "The easiest tasks that make you look productive without actually solving any real problems. Usually involves changing font colors or moving buttons around.",
    "Boil the ocean": "An impossible task that sounds impressive but is actually just a fancy way of saying 'we have no idea what we're doing.'",
    "Pivot hard": "To dramatically change direction while pretending you had a plan all along. Usually involves burning through money and confusing everyone.",
    "Move the needle": "To make a tiny, barely measurable improvement while acting like you've revolutionized the industry.",
    "Open the kimono": "A creepy way of saying 'let me show you our internal processes.' Somehow this phrase survived the #MeToo era.",
    "Secret sauce": "The mysterious ingredient that makes everything work, which is usually just 'working really hard' or 'having good luck.'",
    "Leverage synergies": "To combine two things that don't work separately and somehow make them not work together either.",
    "Ping me": "A passive-aggressive way of saying 'I'm too lazy to walk to your desk, so send me an email instead.'",
    "Thought shower": "A brainstorming session where everyone showers you with terrible ideas while you pretend to take notes.",
    "Deep dive": "To spend hours researching something that could have been explained in a 30-second Google search.",
    "Quick win": "A small accomplishment that you celebrate like you just cured cancer, usually involving updating a spreadsheet.",
    "Blue-sky thinking": "Imagining solutions to problems that don't exist while ignoring the actual problems that do exist.",
    "Run it up the flagpole": "To ask for permission from someone who doesn't understand the project but has the authority to say no.",
    "Herding cats": "Trying to manage a group of people who all think they're the smartest person in the room (spoiler: they're not).",
    "Deckware": "Beautiful PowerPoint presentations that look impressive but contain zero actionable information.",
    "Ping-pong priorities": "When management changes the project focus so often that you feel like you're in a never-ending game of table tennis.",
    "Zoom fatigue": "The exhaustion that comes from pretending to pay attention in virtual meetings while actually checking your phone.",
    "Spray and pray": "A marketing strategy where you throw money at every channel and hope something sticks, like a drunk person throwing darts.",
    "Take it offline": "A meeting escape phrase meaning 'let's discuss this when we're not pretending to care in front of everyone else.'",
    "Peel the onion": "To slowly reveal layers of complexity while pretending this was the plan all along, not just poor initial planning.",
    "Buy-in": "Getting people to pretend they support your terrible idea so they can't blame you when it fails.",
    "Sandbox it": "To test something in a safe environment, which in corporate terms means 'let's waste time on this until we forget about it.'",
    "Table stakes": "The minimum requirements that everyone already has, but we'll act like they're revolutionary innovations.",
    "Eat our own dog food": "To use your own product, which sounds gross but is actually a good idea that most companies ignore.",
    "Growth hacking": "Marketing tactics that sound clever but are usually just spam with better branding.",
    "Actionize": "To turn a noun into a verb because saying 'take action' is apparently too simple for corporate America.",
    "Rightsize": "To fire people while pretending it's about efficiency, not cost-cutting.",
    "Drill down": "To investigate something thoroughly, usually after you realize you have no idea what you're talking about.",
    "Win-win": "A situation where everyone pretends to be happy, but someone is definitely losing.",
    "Core competency": "The one thing your company is actually good at, which you'll ignore in favor of shiny new distractions.",
    "Double click": "To investigate further, because apparently single-clicking isn't thorough enough for corporate culture.",
    "Tiger team": "A group of people who think they're special because they have a cool name, but they're just regular employees.",
    "Brain dump": "To share all your random thoughts at once because organizing them would require actual effort.",
    "Elevator pitch": "A 30-second explanation of your idea that sounds amazing but falls apart when you think about it for more than 30 seconds.",
    "Strategic imperative": "Something that's supposedly critical to the business but is actually just the CEO's pet project.",
    "Happy path": "The ideal scenario that never happens in real life, but we'll plan for it anyway.",
    "Ecosystem play": "A business strategy that sounds sophisticated but usually means 'we'll figure it out as we go.'",
    "Thought leadership": "Writing articles that nobody reads to establish yourself as an expert in things you don't actually understand.",
    "Level set": "To make sure everyone is equally confused about what we're supposed to be doing.",
    "Stakeholdering": "The art of managing people who have opinions but no actual responsibility for the outcome.",
    "Business as usual": "The way things have always been done, which is usually the problem we're trying to solve.",
    "Gold plating": "Adding unnecessary features to make something look more valuable than it actually is.",
    "Hard stop": "A firm deadline that will be extended three times before anyone actually meets it.",
    "Going forward": "A phrase that means 'from now on' but somehow makes everything sound more official and important.",
    "Big rock": "A major project that will consume all your time and probably fail, but at least it sounds important.",
    "Out of pocket": "Not available, usually because you're doing something more important than attending this meeting.",
    "Value-add": "Something that supposedly makes your product better but is usually just a checkbox on a feature list.",
    "Ideation session": "A meeting where people come up with ideas that will never be implemented, but everyone feels creative.",
    "Seamless integration": "A technical process that will definitely have bugs and require extensive troubleshooting.",
    "Mission-critical": "Something that's supposedly essential to the business but is usually just someone's pet project.",
    "Capacity planning": "Trying to predict how much work you can handle before everything falls apart.",
    "One-throat to choke": "Having a single person responsible for everything, which is great until that person quits.",
    "Circle of trust": "A group of people who won't tell anyone about your terrible decisions.",
    "Quick and dirty": "A solution that's fast and probably wrong, but we'll call it a 'prototype' to make it sound intentional.",
    "Pushback": "Resistance to your ideas, which you'll interpret as 'they don't understand the vision.'",
    "Ballpark it": "To make a wild guess and present it as an educated estimate.",
    "Holistic solutioning": "Solving problems by creating bigger problems, but using fancy words to make it sound smart.",
    "Core vs. explore": "The eternal struggle between doing what works and trying new things that probably won't work.",
    "Cross-functional": "Working with people from other departments who have no idea what you're talking about.",
    "Dynamic equilibrium": "A fancy way of saying 'things are constantly changing but somehow staying the same.'",
    "Synergistic alignment": "Getting everyone to pretend they're working toward the same goal when they're actually all doing their own thing.",
    "Herd immunity (in biz talk)": "When enough people believe in a bad idea that it becomes impossible to question it.",
    "Ideate": "To think of ideas, because apparently 'brainstorm' wasn't pretentious enough.",
    "One-pager": "A document that's supposed to fit on one page but will inevitably become a 47-slide PowerPoint presentation.",
    "Move fast and break things": "A philosophy that works great for startups and terribly for everything else.",
    "Strategic north star": "A guiding principle that sounds inspiring but is usually just a vague statement that means nothing.",
    "Paradigm shift": "A fundamental change in thinking that's usually just the same old ideas with new buzzwords.",
    "Bandwidth check": "Asking if someone has time to do something, because apparently 'are you busy?' is too direct.",
    "Operationalize": "To turn a concept into reality, which sounds simple but usually involves months of meetings.",
    "The ask": "What you want someone to do, but saying 'the request' would be too straightforward.",
    "White space": "An area of opportunity that's probably empty for a good reason.",
    "Incentivize": "To motivate people with rewards, which works great until you run out of money.",
    "Seamless onboarding": "A process for new employees that's supposed to be smooth but usually involves 47 different systems and passwords.",
    "Socialize an idea": "To share your thoughts with others, because apparently 'discuss' wasn't corporate enough.",
    "Strategic clarity": "Having a clear understanding of what you're trying to achieve, which is rarer than unicorns.",
    "Competitive moat": "An advantage that protects your business, which is usually just being first to market.",
    "Boil it down": "To simplify something complex, which usually means removing all the important details.",
    "Out of scope": "Something that's not your problem, which you'll discover after you've already started working on it.",
    "Align the org": "Getting everyone to pretend they're working toward the same goal when they're actually all doing their own thing.",
    "Business driver": "Something that supposedly motivates business decisions, which is usually just the CEO's mood.",
    "Pain point": "A problem that customers have, which you'll solve by creating a different problem.",
    "Game-changer": "Something that's supposed to revolutionize everything but usually just changes the font on the website.",
    "Incentive alignment": "Making sure everyone's rewards are tied to the same goals, which is impossible but sounds good in theory.",
    "Key takeaway": "The most important point from a meeting, which is usually 'we need another meeting.'",
    "Iterate fast": "To make quick changes based on feedback, which usually means changing everything every week.",
    "End-to-end solution": "A complete solution that handles everything, which is great until it breaks and you can't figure out why.",
    "Big bet": "A major investment in something that will either make you rich or bankrupt, with no middle ground.",
    "Fail fast": "A philosophy that encourages quick failures, which is great until you fail at everything.",
    "Test and learn": "To experiment with different approaches, which is code for 'we have no idea what we're doing.'",
    "Growth mindset": "A belief that you can improve through effort, which is great until you realize some people are just better at things.",
    "Waterfall to agile": "Changing from a structured approach to a chaotic one, but calling it 'agile' makes it sound intentional.",
    "Cross-pollinate": "To share ideas between different teams, which usually results in everyone getting confused.",
    "Scale up": "To grow your business, which sounds simple but usually involves hiring people who don't know what they're doing.",
    "Hard pivot": "To completely change direction, which is great until you realize you're just going in circles.",
    "Robust solution": "A solution that's supposed to be strong and reliable, which usually means it's overcomplicated and fragile.",
    "Leading edge": "Being at the forefront of innovation, which usually means you're the first to make mistakes.",
    "Right-sizing": "Adjusting the size of something, which usually means making it smaller and cheaper.",
    "Open loop": "A process that's not complete, which is usually a euphemism for 'we forgot to finish this.'",
    "Close the loop": "To complete a process, which sounds simple but usually involves 47 different people and systems.",
    "Best-in-class": "The best example of something, which is usually just the only example you've seen.",
    "Re-baseline": "To reset expectations, which usually means admitting you were wrong about everything.",
    "Workstream": "A flow of work, which is just a fancy way of saying 'project' but with more syllables.",
    "Thought partner": "Someone who helps you think through problems, which is great until they start thinking for you.",
    "Value prop": "The value proposition, which is usually just a list of features that don't actually matter.",
    "Strategic lens": "A way of looking at things strategically, which is usually just overthinking simple problems.",
    "Hypercare": "Intensive support for a new system, which is code for 'we know this is going to break.'",
    "Work smarter, not harder": "A philosophy that sounds great until you realize that working hard is often the only way to get things done.",
    "Hit the ground running": "To start working immediately, which usually means you'll hit the ground and then figure out how to run.",
    "Close alignment": "Being very close to agreement, which is great until someone changes their mind.",
    "Digital native": "Someone who grew up with technology, which is great until they can't figure out how to use a printer.",
    "Synergy capture": "Getting value from working together, which usually means one person does all the work.",
    "Operational excellence": "Being really good at operations, which is great until you realize operations are boring.",
    "Make it pop": "To make something more visually appealing, which usually means adding colors that hurt your eyes.",
    "Nail it and scale it": "To do something perfectly and then grow it, which is great until you realize you can't do anything perfectly.",
    "Outside the box": "Thinking creatively, which is great until you realize the box exists for a reason.",
    "Optics check": "Making sure something looks good to outsiders, which usually means hiding the truth.",
    "Heavy lift": "A difficult task, which is usually difficult because no one planned it properly.",
    "Get alignment": "To get everyone to agree, which is impossible but we'll try anyway.",
    "Strategic handshake": "A formal agreement that sounds important but is usually just a way to avoid making real decisions.",
    "In the weeds": "Getting into details, which is great until you realize you're lost in the details.",
    "Future state": "How things will be in the future, which is usually just wishful thinking.",
    "Near-term wins": "Small victories that you can achieve soon, which are great until you realize they don't matter.",
    "Deck farming": "Creating lots of presentations, which is great until you realize no one reads them.",
    "Pre-read": "Reading something before a meeting, which is great until you realize no one actually reads it.",
    "Enterprise-wide": "Affecting the entire company, which is great until you realize you can't control the entire company.",
    "Roll up your sleeves": "To get ready to work hard, which is great until you realize you're not actually going to work hard.",
    "Change agent": "Someone who's supposed to drive change, which is great until they realize no one wants to change.",
    "Value unlock": "To release value that's trapped somewhere, which is great until you realize there's no value to unlock.",
    "The delta": "The difference between two things, which is great until you realize the difference is everything.",
    "Red team it": "To have someone try to break your idea, which is great until they actually break it.",
    "Put a pin in it": "To postpone something, which is great until you realize you'll never unpin it.",
    "Action item": "Something that needs to be done, which is great until you realize no one will do it.",
    "Greenfield opportunity": "A chance to start fresh, which is great until you realize you don't know how to start fresh.",
    "Over the wall": "To hand something off to another team, which is great until you realize they don't know what to do with it.",
    "Swim lane": "A specific area of responsibility, which is great until you realize no one knows where the lanes are.",
    "Strategic pillar": "A fundamental part of your strategy, which is great until you realize your strategy is built on sand.",
    "Hitting singles and doubles": "Making small, consistent progress, which is great until you realize you need a home run.",
    "Unicorn thinking": "Believing in impossible things, which is great until you realize they're impossible.",
    "Business hygiene": "Keeping your business clean and organized, which is great until you realize it's impossible.",
    "Land and expand": "To get a small customer and then grow with them, which is great until you realize they don't want to grow.",
    "Bake it in": "To make something a permanent part of the process, which is great until you realize it's a bad process.",
    "All-hands": "A meeting with everyone, which is great until you realize no one is listening.",
    "Back-channeling": "Communicating through unofficial channels, which is great until you realize it's the only way to get things done.",
    "Transformational": "Something that changes everything, which is great until you realize it changes everything for the worse.",
    "North Star metric": "The most important measurement, which is great until you realize you can't measure it.",
    "New normal": "How things will be from now on, which is great until you realize it's not normal at all.",
    "Future-proof": "Making something that will work in the future, which is great until you realize the future is unpredictable.",
    "Shock to the system": "Something that disrupts everything, which is great until you realize you can't control the disruption.",
    "Rinse and repeat": "To do the same thing over and over, which is great until you realize it's not working."
  };
  
  return definitions[term] || `A corporate buzzword that sounds important but usually means nothing. Examples:\n- "We need to ${term.toLowerCase()} on this initiative."\n- "The ${term.toLowerCase()} approach will drive results."\n- "Let's ${term.toLowerCase()} to move forward."`;
}

function generateExamples(term) {
  const examples = {
    "Circle back": "Examples:\n- \"Let me circle back on that after I finish my coffee.\"\n- \"We'll circle back to this in Q4 when we have more bandwidth.\"\n- \"I need to circle back with the stakeholders on this decision.\"",
    "Low-hanging fruit": "Examples:\n- \"Let's focus on the low-hanging fruit first before tackling the real issues.\"\n- \"This is low-hanging fruit - we can knock it out in an hour.\"\n- \"We're picking all the low-hanging fruit to show quick wins.\"",
    "Boil the ocean": "Examples:\n- \"Don't try to boil the ocean with this project - keep it simple.\"\n- \"We're not trying to boil the ocean here, just solve one problem.\"\n- \"That approach would boil the ocean - let's be more focused.\"",
    "Pivot hard": "Examples:\n- \"We need to pivot hard away from this failing strategy.\"\n- \"The market changed, so we're pivoting hard to B2C.\"\n- \"Let's pivot hard and focus on our core competencies.\"",
    "Move the needle": "Examples:\n- \"This initiative will really move the needle on customer satisfaction.\"\n- \"We need something that moves the needle, not just incremental improvements.\"\n- \"How do we move the needle on revenue this quarter?\""
  };
  
  return examples[term] || `Examples:\n- "We need to ${term.toLowerCase()} on this initiative."\n- "The ${term.toLowerCase()} approach will drive results."\n- "Let's ${term.toLowerCase()} to move forward."`;
}

function generateTags(term) {
  const tags = ['corporate', 'buzzword'];
  if (term.includes('synergy')) tags.push('synergy');
  if (term.includes('strategic')) tags.push('strategy');
  if (term.includes('pivot')) tags.push('change');
  if (term.includes('growth')) tags.push('growth');
  if (term.includes('team')) tags.push('collaboration');
  if (term.includes('quick') || term.includes('fast')) tags.push('urgency');
  if (term.includes('deep') || term.includes('drill')) tags.push('analysis');
  if (term.includes('win') || term.includes('success')) tags.push('success');
  if (term.includes('future')) tags.push('future');
  if (term.includes('value')) tags.push('value');
  return JSON.stringify(tags);
}

const sqlStatements = buzzwords.map((term, index) => {
  const baseSlug = createSlug(term);
  const slug = `${baseSlug}-v${index + 1}`;
  const definition = generateDefinition(term);
  const examples = generateExamples(term);
  const tags = generateTags(term);
  
  return `INSERT INTO terms_v2 (id, slug, title, definition, examples, tags, status, created_at, updated_at)
VALUES (
  'term_${slug.replace(/-/g, '_')}',
  '${slug}',
  '${term.replace(/'/g, "''")}',
  '${definition.replace(/'/g, "''")}',
  '${examples.replace(/'/g, "''")}',
  '${tags}',
  'published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);`;
}).join('\n\n');

const migrationFile = `infra/d1-migrations/058_add_corporate_buzzwords_safe.sql`;
fs.writeFileSync(migrationFile, sqlStatements);

console.log(`Generated migration file: ${migrationFile}`);
console.log(`Processed ${buzzwords.length} terms successfully!`);
