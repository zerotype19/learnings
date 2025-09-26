const fs = require('fs');

// Comprehensive witty definitions for all remaining terms
const improvedDefinitions = {
  "800-pound gorilla": {
    definition: "A dominant company or force in an industry that everyone is afraid to challenge, even though they're usually just a regular company with better marketing and more money to throw around.",
    examples: "Examples:\n- \"Google is the 800-pound gorilla in search, but that doesn't mean they're invincible.\"\n- \"We can't compete with the 800-pound gorilla, so let's find a different market.\"\n- \"The 800-pound gorilla in the room is that our product is terrible.\""
  },
  "Around": {
    definition: "A corporate way of making simple prepositions sound more sophisticated, usually used to avoid being direct about what you're actually discussing.",
    examples: "Examples:\n- \"Let's have a discussion around the budget issues.\"\n- \"We need to think around the customer experience problem.\"\n- \"I'm not sure what you mean by 'around' - can you be more specific?\""
  },
  "Awesome": {
    definition: "A word that has been so overused in corporate settings that it now means absolutely nothing. Everything is 'awesome' until it's not, and then it's 'challenging.'",
    examples: "Examples:\n- \"That's an awesome idea!\" (translation: I'm not listening)\n- \"The awesome thing about this project is...\" (translation: there's nothing awesome about it)\n- \"We had an awesome meeting!\" (translation: we accomplished nothing)\""
  },
  "Baked in": {
    definition: "A corporate way of saying something is already included or accounted for, usually used to avoid admitting you forgot to plan for it in the first place.",
    examples: "Examples:\n- \"The costs are baked into the budget, so we don't need to worry about them.\"\n- \"The risks are baked into our assumptions.\"\n- \"We've baked in enough time for this project to fail twice.\""
  },
  "Balls in the air": {
    definition: "A colorful metaphor for juggling multiple projects, tasks, or responsibilities simultaneously, often used to sound busy rather than organized.",
    examples: "Examples:\n- \"I've got 47 balls in the air right now, but I'm managing.\"\n- \"We need to keep all these balls in the air until the end of the quarter.\"\n- \"The balls are dropping faster than I can pick them up.\""
  },
  "Best practice": {
    definition: "A supposedly superior way of doing something that everyone talks about but no one actually follows, usually because it's too expensive or time-consuming.",
    examples: "Examples:\n- \"We should follow best practices for this implementation.\"\n- \"Best practices suggest we need 6 months for this project.\"\n- \"Best practices are great in theory, but we need to ship by Friday.\""
  },
  "Bleeding edge": {
    definition: "Technology or ideas that are so new and untested that they're likely to cause more problems than they solve, but sound impressive in presentations.",
    examples: "Examples:\n- \"We're using bleeding-edge technology for this project.\"\n- \"The bleeding edge is where you get cut, but also where you find the future.\"\n- \"Our bleeding-edge solution is bleeding money.\""
  },
  "Boil it down": {
    definition: "To simplify something complex, which usually means removing all the important details and creating a version that's so simplified it's useless.",
    examples: "Examples:\n- \"Let's boil it down to the essentials.\"\n- \"We need to boil this down to a one-page summary.\"\n- \"After boiling it down, we realized we had nothing left.\""
  },
  "Bottom line": {
    definition: "The most important point or result, usually the one that involves money, because apparently nothing else matters in corporate America.",
    examples: "Examples:\n- \"The bottom line is we need to increase revenue.\"\n- \"Let's focus on the bottom line and worry about everything else later.\"\n- \"The bottom line is that the bottom line is all that matters.\""
  },
  "Brainstorm": {
    definition: "A meeting where people come up with ideas that will never be implemented, but everyone feels creative and productive for an hour.",
    examples: "Examples:\n- \"Let's brainstorm some solutions to this problem.\"\n- \"We need to brainstorm new ways to increase engagement.\"\n- \"After brainstorming for 3 hours, we decided to do what we were already doing.\""
  },
  "Break the mold": {
    definition: "To do something different or innovative, which in corporate terms usually means doing the same thing but with a different PowerPoint template.",
    examples: "Examples:\n- \"We need to break the mold with this new initiative.\"\n- \"This approach will break the mold in our industry.\"\n- \"We broke the mold, but now we can't figure out how to put it back together.\""
  },
  "Bring to the table": {
    definition: "To contribute something valuable, usually used when someone wants to sound important but doesn't actually have anything useful to offer.",
    examples: "Examples:\n- \"What can you bring to the table for this project?\"\n- \"We need someone who can bring fresh ideas to the table.\"\n- \"I'm bringing my extensive experience of doing nothing to the table.\""
  },
  "Bubble up": {
    definition: "To escalate an issue to higher levels of management, usually because the people at the bottom can't solve it and the people at the top don't want to.",
    examples: "Examples:\n- \"This needs to bubble up to the executive team.\"\n- \"Let's bubble this up and see what leadership thinks.\"\n- \"Everything bubbles up eventually, usually as a crisis.\""
  },
  "Buy-in": {
    definition: "Getting people to pretend they support your terrible idea so they can't blame you when it fails, which it inevitably will.",
    examples: "Examples:\n- \"We need buy-in from all stakeholders before proceeding.\"\n- \"Getting buy-in is the hardest part of any project.\"\n- \"We have buy-in, but no one actually believes in this idea.\""
  },
  "Call it a day": {
    definition: "To stop working, usually because you've reached your limit of pretending to be productive or because you've run out of things to pretend to work on.",
    examples: "Examples:\n- \"Let's call it a day and pick this up tomorrow.\"\n- \"I'm calling it a day - this project is going nowhere.\"\n- \"We called it a day, but the problems will still be there tomorrow.\""
  },
  "Circle back": {
    definition: "A corporate way of saying 'I'll forget about this until you remind me again.' The art of appearing busy while doing absolutely nothing productive.",
    examples: "Examples:\n- \"Let me circle back on that after I finish my coffee.\"\n- \"We'll circle back to this in Q4 when we have more bandwidth.\"\n- \"I need to circle back with the stakeholders on this decision.\""
  },
  "Close the loop": {
    definition: "To complete a process or follow up on something, which sounds simple but usually involves 47 different people and systems that don't talk to each other.",
    examples: "Examples:\n- \"We need to close the loop on this customer complaint.\"\n- \"Let's close the loop and make sure everyone is aligned.\"\n- \"Closing the loop is harder than opening Pandora's box.\""
  },
  "Core competency": {
    definition: "The one thing your company is actually good at, which you'll ignore in favor of shiny new distractions that will probably fail.",
    examples: "Examples:\n- \"Our core competency is customer service, so let's focus on AI.\"\n- \"We need to stick to our core competencies.\"\n- \"Our core competency is finding new ways to avoid our core competencies.\""
  },
  "Cutting edge": {
    definition: "Technology or ideas that are supposedly advanced but are usually just expensive ways to do the same thing you were already doing.",
    examples: "Examples:\n- \"We're using cutting-edge technology for this project.\"\n- \"The cutting edge is where you get cut, but also where you find the future.\"\n- \"Our cutting-edge solution is cutting into our budget.\""
  },
  "Deep dive": {
    definition: "To spend hours researching something that could have been explained in a 30-second Google search, but we need to make it sound like we're doing serious analytical work.",
    examples: "Examples:\n- \"Let's do a deep dive into why our coffee machine keeps breaking.\"\n- \"We need to deep dive into the data to understand why sales are down.\"\n- \"The deep dive revealed that we've been overthinking a simple problem.\""
  },
  "Deliverable": {
    definition: "Something that you're supposed to produce, usually a document or presentation that no one will read but everyone will pretend is important.",
    examples: "Examples:\n- \"What are the deliverables for this project?\"\n- \"We need to deliver the deliverable by the deadline.\"\n- \"The deliverable was delivered, but it was undeliverable.\""
  },
  "Disrupt": {
    definition: "To completely change an industry, which in corporate terms usually means making a small improvement and calling it revolutionary.",
    examples: "Examples:\n- \"We're going to disrupt the market with this new product.\"\n- \"Disruption is the key to innovation.\"\n- \"We disrupted everything, including our own business model.\""
  },
  "Drill down": {
    definition: "To investigate something thoroughly, usually after you realize you have no idea what you're talking about. The corporate version of 'let me Google that for you.'",
    examples: "Examples:\n- \"We need to drill down into the customer complaints to find the root cause.\"\n- \"Let's drill down on why the project is behind schedule.\"\n- \"After drilling down, we discovered the problem was obvious from the start.\""
  },
  "Drop the ball": {
    definition: "To make a mistake or fail to follow through on something, usually because you were too busy pretending to be productive to actually do your job.",
    examples: "Examples:\n- \"I dropped the ball on that project, but it wasn't my fault.\"\n- \"We can't afford to drop the ball on this initiative.\"\n- \"The ball was dropped so many times it's now a pancake.\""
  },
  "Due diligence": {
    definition: "The process of thoroughly investigating something before making a decision, which in corporate terms usually means doing the minimum research required to cover your ass.",
    examples: "Examples:\n- \"We need to do our due diligence before investing in this company.\"\n- \"Due diligence revealed that the company was a scam.\"\n- \"Our due diligence was due, but we didn't do it.\""
  },
  "Ecosystem": {
    definition: "A complex network of interconnected things, which in corporate terms usually means a bunch of stuff that doesn't work together but sounds impressive when you talk about it.",
    examples: "Examples:\n- \"We need to build an ecosystem around our product.\"\n- \"The ecosystem is evolving, but we're not sure how.\"\n- \"Our ecosystem is more like a food chain, and we're at the bottom.\""
  },
  "Elevator pitch": {
    definition: "A 30-second explanation of your idea that sounds amazing but falls apart when you think about it for more than 30 seconds.",
    examples: "Examples:\n- \"Can you give me your elevator pitch for this project?\"\n- \"The elevator pitch is great, but the reality is different.\"\n- \"My elevator pitch is so good, I can't get off the elevator.\""
  },
  "End-to-end": {
    definition: "A complete solution that handles everything from start to finish, which is great until it breaks and you can't figure out which part is causing the problem.",
    examples: "Examples:\n- \"We need an end-to-end solution for this problem.\"\n- \"Our end-to-end approach covers everything.\"\n- \"The end-to-end solution ended up being end-to-end chaos.\""
  },
  "Fast track": {
    definition: "To expedite a process, which in corporate terms usually means skipping important steps and hoping nothing goes wrong.",
    examples: "Examples:\n- \"We need to fast track this project to meet the deadline.\"\n- \"Fast tracking is great until you hit a wall.\"\n- \"We fast tracked it so fast, we're not sure where we are.\""
  },
  "Game changer": {
    definition: "Something that's supposed to revolutionize everything but usually just changes the font on the website or adds a new button that no one uses.",
    examples: "Examples:\n- \"This new feature is a game changer for our product.\"\n- \"We need a game changer to stay competitive.\"\n- \"The game changer changed the game, but not in our favor.\""
  },
  "Get on the same page": {
    definition: "To ensure everyone understands and agrees on something, which is impossible but we'll try anyway because it sounds good in meetings.",
    examples: "Examples:\n- \"We need to get everyone on the same page about this project.\"\n- \"Let's get on the same page before we proceed.\"\n- \"We're all on the same page, but it's the wrong page.\""
  },
  "Go the extra mile": {
    definition: "To do more than what's required, which in corporate terms usually means doing your job plus everyone else's job for the same pay.",
    examples: "Examples:\n- \"We need to go the extra mile for our customers.\"\n- \"Going the extra mile is what sets us apart.\"\n- \"I went the extra mile, but I'm still at the same salary.\""
  },
  "Green light": {
    definition: "Approval to proceed with something, usually given by someone who doesn't understand the project but has the authority to say yes.",
    examples: "Examples:\n- \"We got the green light to proceed with the project.\"\n- \"The green light means we can start spending money.\"\n- \"We got the green light, but we're still stuck in traffic.\""
  },
  "Hard stop": {
    definition: "A firm end time due to another commitment, which is corporate speak for 'I have somewhere more important to be' or 'I've reached my limit of pretending to care.'",
    examples: "Examples:\n- \"I have a hard stop at 3 PM for another meeting.\"\n- \"We need to respect everyone's hard stops in this meeting.\"\n- \"My hard stop is whenever I can't take any more corporate jargon.\""
  },
  "Heads up": {
    definition: "A warning or notification about something, usually given at the last minute when it's too late to do anything about it.",
    examples: "Examples:\n- \"Just a heads up, the deadline has been moved up.\"\n- \"I wanted to give you a heads up about the changes.\"\n- \"The heads up came after we hit our heads on the wall.\""
  },
  "Hit the ground running": {
    definition: "To start working immediately and effectively, which is great until you realize you don't know where you're running to or why.",
    examples: "Examples:\n- \"We need to hit the ground running on this project.\"\n- \"The new team member hit the ground running.\"\n- \"We hit the ground running, but the ground was moving.\""
  },
  "In the weeds": {
    definition: "Overwhelmed by detail or excessive work, usually because no one planned properly and now you're drowning in the consequences of poor decision-making.",
    examples: "Examples:\n- \"I'm getting too in the weeds on this project - let me step back.\"\n- \"We're all in the weeds trying to meet this unrealistic deadline.\"\n- \"Being in the weeds is better than being in the boardroom explaining why we failed.\""
  },
  "Kick the can down the road": {
    definition: "To postpone dealing with a problem, usually because you don't want to deal with it and hope it will magically solve itself.",
    examples: "Examples:\n- \"We're just kicking the can down the road on this issue.\"\n- \"Kicking the can down the road is not a solution.\"\n- \"We've kicked the can so far down the road, we can't see it anymore.\""
  },
  "Low-hanging fruit": {
    definition: "The easiest tasks that make you look productive without actually solving any real problems. Usually involves changing font colors or moving buttons around.",
    examples: "Examples:\n- \"Let's focus on the low-hanging fruit first before tackling the real issues.\"\n- \"This is low-hanging fruit - we can knock it out in an hour.\"\n- \"We're picking all the low-hanging fruit to show quick wins.\""
  },
  "Move the needle": {
    definition: "To make a tiny, barely measurable improvement while acting like you've revolutionized the industry. The art of making 0.1% growth sound like a breakthrough.",
    examples: "Examples:\n- \"This initiative will really move the needle on customer satisfaction.\"\n- \"We need something that moves the needle, not just incremental improvements.\"\n- \"How do we move the needle on revenue this quarter?\""
  },
  "No-brainer": {
    definition: "A decision that's so obvious that only a corporate committee could make it complicated, usually by overthinking it and creating 47 different options.",
    examples: "Examples:\n- \"This is a no-brainer - we should definitely do it.\"\n- \"The no-brainer became a brain teaser after the meeting.\"\n- \"It's a no-brainer, but we need to think about it for 6 months.\""
  },
  "On the same page": {
    definition: "In agreement about something, which is rare in corporate settings because everyone has their own agenda and interpretation of what 'agreement' means.",
    examples: "Examples:\n- \"We need to make sure everyone is on the same page.\"\n- \"Are we all on the same page about this project?\"\n- \"We're on the same page, but it's a different book.\""
  },
  "Out of the box": {
    definition: "Thinking creatively or unconventionally, which is great until you realize the box exists for a reason and your creative ideas are actually terrible.",
    examples: "Examples:\n- \"We need to think outside the box for this problem.\"\n- \"His outside-the-box thinking is revolutionary.\"\n- \"We thought outside the box, but we're still in the same room.\""
  },
  "Paradigm shift": {
    definition: "A fundamental change in thinking or approach, which in corporate terms usually means the same old ideas with new buzzwords and a different PowerPoint template.",
    examples: "Examples:\n- \"This represents a paradigm shift in our industry.\"\n- \"We need a paradigm shift to stay competitive.\"\n- \"The paradigm shifted, but we're still in the same place.\""
  },
  "Push the envelope": {
    definition: "To go beyond normal limits or boundaries, which in corporate terms usually means doing something slightly different and calling it revolutionary.",
    examples: "Examples:\n- \"We need to push the envelope with this new initiative.\"\n- \"Pushing the envelope is what drives innovation.\"\n- \"We pushed the envelope so hard, it ripped.\""
  },
  "Quick win": {
    definition: "A small accomplishment that you celebrate like you just cured cancer, usually involving updating a spreadsheet or changing a font color.",
    examples: "Examples:\n- \"Let's focus on some quick wins to build momentum.\"\n- \"This is a quick win we can implement immediately.\"\n- \"The quick win was so quick, we missed it.\""
  },
  "Raise the bar": {
    definition: "To increase standards or expectations, which in corporate terms usually means making everyone work harder for the same pay while management takes credit.",
    examples: "Examples:\n- \"We need to raise the bar for our team's performance.\"\n- \"Raising the bar is what drives excellence.\"\n- \"We raised the bar so high, no one can reach it.\""
  },
  "Reinvent the wheel": {
    definition: "To create something that already exists, usually because you don't know it exists or because you think your version will be better (it won't).",
    examples: "Examples:\n- \"We don't need to reinvent the wheel here.\"\n- \"Sometimes you have to reinvent the wheel to make it better.\"\n- \"We reinvented the wheel, but it's still round.\""
  },
  "Run with it": {
    definition: "To proceed with an idea or plan, usually given by someone who doesn't understand the implications but wants to sound decisive.",
    examples: "Examples:\n- \"I like the idea - let's run with it.\"\n- \"We're going to run with this approach and see what happens.\"\n- \"We ran with it, but we're not sure where we're going.\""
  },
  "Silver bullet": {
    definition: "A simple solution to a complex problem, which doesn't exist but everyone keeps looking for it because it sounds easier than actually solving the problem.",
    examples: "Examples:\n- \"We need to find the silver bullet for this issue.\"\n- \"There's no silver bullet, but we keep looking for one.\"\n- \"The silver bullet turned out to be made of lead.\""
  },
  "Stakeholder": {
    definition: "Someone who has an interest in a project but no actual responsibility for its success, which makes them perfect for giving opinions and criticism.",
    examples: "Examples:\n- \"We need to get buy-in from all stakeholders.\"\n- \"The stakeholders have concerns about the timeline.\"\n- \"Stakeholders are great at staking claims but not at taking responsibility.\""
  },
  "Think outside the box": {
    definition: "To think creatively or unconventionally, which is great until you realize the box exists for a reason and your creative ideas are actually terrible.",
    examples: "Examples:\n- \"We need to think outside the box for this problem.\"\n- \"His outside-the-box thinking is revolutionary.\"\n- \"We thought outside the box, but we're still in the same room.\""
  },
  "Touch base": {
    definition: "To have a brief conversation or check-in, which in corporate terms usually means having a long, unproductive meeting that accomplishes nothing.",
    examples: "Examples:\n- \"Let's touch base next week about the project.\"\n- \"I wanted to touch base with you about the changes.\"\n- \"We touched base, but we're still not on the same page.\""
  },
  "Value add": {
    definition: "Something that supposedly makes your product or service better but is usually just a checkbox on a feature list that no one actually uses.",
    examples: "Examples:\n- \"This feature is a real value add for our customers.\"\n- \"We need to focus on value adds that differentiate us.\"\n- \"The value add added no value, but it sounded good in the presentation.\""
  },
  "Win-win": {
    definition: "A situation where everyone pretends to be happy, but someone is definitely losing and it's probably you.",
    examples: "Examples:\n- \"This deal is a win-win for both parties.\"\n- \"We need to find a win-win solution to this problem.\"\n- \"It's a win-win, but I'm not sure who's winning what.\""
  },
  "Zero-sum game": {
    definition: "A situation where one person's gain is another person's loss, which describes most corporate politics and budget negotiations.",
    examples: "Examples:\n- \"This is a zero-sum game - someone has to lose.\"\n- \"We need to avoid making this a zero-sum game.\"\n- \"In a zero-sum game, everyone loses except the person who made the rules.\""
  }
};

// Function to generate tags
function generateTags(term) {
  const tags = ['corporate', 'buzzword'];
  
  if (term.includes('synergy') || term.includes('synergistic')) tags.push('synergy');
  if (term.includes('strategic') || term.includes('strategy')) tags.push('strategy');
  if (term.includes('pivot') || term.includes('change')) tags.push('change');
  if (term.includes('growth') || term.includes('scale')) tags.push('growth');
  if (term.includes('team') || term.includes('cross')) tags.push('collaboration');
  if (term.includes('quick') || term.includes('fast')) tags.push('urgency');
  if (term.includes('deep') || term.includes('drill')) tags.push('analysis');
  if (term.includes('win') || term.includes('success')) tags.push('success');
  if (term.includes('future') || term.includes('forward')) tags.push('future');
  if (term.includes('value') || term.includes('add')) tags.push('value');
  if (term.includes('digital') || term.includes('tech')) tags.push('technology');
  if (term.includes('data') || term.includes('analytics')) tags.push('data');
  if (term.includes('customer') || term.includes('client')) tags.push('customer');
  if (term.includes('leadership') || term.includes('management')) tags.push('leadership');
  if (term.includes('innovation') || term.includes('disrupt')) tags.push('innovation');
  
  return JSON.stringify(tags);
}

// Generate SQL updates
const sqlUpdates = Object.entries(improvedDefinitions).map(([term, data]) => {
  const slug = term.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  const tags = generateTags(term);
  
  return `UPDATE terms_v2 
SET 
  definition = '${data.definition.replace(/'/g, "''")}',
  examples = '${data.examples.replace(/'/g, "''")}',
  tags = '${tags}',
  updated_at = CURRENT_TIMESTAMP
WHERE slug = '${slug}';`;
}).join('\n\n');

const migrationFile = `infra/d1-migrations/062_improve_all_remaining_terms.sql`;
fs.writeFileSync(migrationFile, sqlUpdates);

console.log(`Generated migration file: ${migrationFile}`);
console.log(`Processed ${Object.keys(improvedDefinitions).length} terms successfully!`);
console.log('\nSample improvements:');
Object.entries(improvedDefinitions).slice(0, 5).forEach(([term, data]) => {
  console.log(`\n${term}:`);
  console.log(`Definition: ${data.definition.substring(0, 100)}...`);
});
