const fs = require('fs');

// Comprehensive witty definitions for ALL remaining terms
const improvedDefinitions = {
  "Agile Loop": {
    definition: "A never-ending cycle of meetings, retrospectives, and planning sessions that makes you feel productive while actually accomplishing nothing. The corporate version of running in circles.",
    examples: "Examples:\n- \"We're in an agile loop of continuous improvement.\"\n- \"The agile loop is helping us iterate faster.\"\n- \"We've been in this agile loop for 6 months and we're still at square one.\""
  },
  "Take this offline": {
    definition: "A meeting escape phrase meaning 'let's discuss this when we're not pretending to care in front of everyone else.' Usually code for 'I don't want to deal with this right now.'",
    examples: "Examples:\n- \"Let's take this offline and discuss it privately.\"\n- \"We should take this offline to avoid derailing the meeting.\"\n- \"Taking it offline means we'll never talk about it again.\""
  },
  "Make hay": {
    definition: "To take advantage of an opportunity while it's available, which in corporate terms usually means exploiting a situation before someone realizes it's a bad idea.",
    examples: "Examples:\n- \"We need to make hay while the sun shines on this opportunity.\"\n- \"Let's make hay with this market trend before it changes.\"\n- \"We made hay, but we forgot to check if the hay was any good.\""
  },
  "Office drone": {
    definition: "A corporate employee who has lost all passion and creativity, usually due to years of meaningless meetings and soul-crushing bureaucracy. The walking dead of the corporate world.",
    examples: "Examples:\n- \"He's become such an office drone since the promotion.\"\n- \"The office drones are buzzing about the new policy.\"\n- \"I used to be creative, now I'm just an office drone.\""
  },
  "Per my last email": {
    definition: "A passive-aggressive way of saying 'I already told you this and you clearly didn't read it, so here it is again.' The corporate equivalent of 'as I said before.'",
    examples: "Examples:\n- \"Per my last email, the deadline is next Friday.\"\n- \"Per my last email, we need to address this issue.\"\n- \"Per my last email, I'm still waiting for a response.\""
  },
  "Ping": {
    definition: "A passive-aggressive way of saying 'I'm too lazy to walk to your desk, so send me an email instead.' The corporate version of 'hey, you there?'",
    examples: "Examples:\n- \"I'll ping you about this later.\"\n- \"Can you ping me when you have an update?\"\n- \"I pinged him three times but he never responded.\""
  },
  "Pivot": {
    definition: "To dramatically change direction while pretending you had a plan all along. Usually involves burning through money and confusing everyone, but calling it 'strategic.'",
    examples: "Examples:\n- \"We need to pivot our strategy to focus on mobile.\"\n- \"The pivot is going well, but we're not sure where we're going.\"\n- \"We pivoted so hard, we're dizzy.\""
  },
  "Punt": {
    definition: "To postpone or avoid dealing with something, usually because you don't want to make a decision or because you hope it will go away on its own.",
    examples: "Examples:\n- \"Let's punt this decision to next quarter.\"\n- \"We're punting the responsibility to another team.\"\n- \"We punted so many times, we're out of downs.\""
  },
  "Put a pin in it": {
    definition: "To postpone something temporarily, which in corporate terms usually means 'we'll never talk about this again' but sounds more professional than 'forget about it.'",
    examples: "Examples:\n- \"Let's put a pin in this and come back to it later.\"\n- \"We need to put a pin in this discussion for now.\"\n- \"We put a pin in it, but we can't find the pin.\""
  },
  "Put out a fire": {
    definition: "To deal with a crisis or urgent problem, usually one that could have been prevented with better planning but now requires everyone to drop everything and panic.",
    examples: "Examples:\n- \"I spent all day putting out fires instead of doing real work.\"\n- \"We need to put out this fire before it spreads.\"\n- \"The fire is out, but the building is still smoking.\""
  },
  "Quick and dirty": {
    definition: "A solution that's fast and probably wrong, but we'll call it a 'prototype' to make it sound intentional. The corporate version of 'good enough for government work.'",
    examples: "Examples:\n- \"Let's do a quick and dirty implementation for now.\"\n- \"This is a quick and dirty fix, but it should work.\"\n- \"We went quick and dirty, and now we're dirty and slow.\""
  },
  "Raise the bar": {
    definition: "To increase standards or expectations, which in corporate terms usually means making everyone work harder for the same pay while management takes credit for the 'improvement.'",
    examples: "Examples:\n- \"We need to raise the bar for our team's performance.\"\n- \"Raising the bar is what drives excellence.\"\n- \"We raised the bar so high, no one can reach it.\""
  },
  "Reach out": {
    definition: "A corporate way of saying 'contact' or 'talk to' that makes simple communication sound like a profound act of human connection. Usually used in emails that are anything but personal.",
    examples: "Examples:\n- \"I'll reach out to the client about this issue.\"\n- \"Let's reach out to the team and get their input.\"\n- \"I reached out, but they didn't reach back.\""
  },
  "Red flag": {
    definition: "A warning sign that something is wrong, which in corporate settings is usually ignored until it becomes a full-blown crisis that could have been prevented.",
    examples: "Examples:\n- \"That's a red flag we need to address immediately.\"\n- \"I see several red flags in this proposal.\"\n- \"We ignored the red flags, and now we're in trouble.\""
  },
  "Rightsize": {
    definition: "To adjust the size of something, which in corporate terms usually means making it smaller and cheaper while pretending it's about efficiency and optimization.",
    examples: "Examples:\n- \"We need to rightsize our workforce to stay competitive.\"\n- \"Rightsizing is about finding the right balance.\"\n- \"We rightsized everything, but now nothing fits.\""
  },
  "Rock the boat": {
    definition: "To cause trouble or disruption by questioning the status quo, which in corporate culture is usually discouraged unless you're the CEO or have a really good reason.",
    examples: "Examples:\n- \"We don't want to rock the boat with this change.\"\n- \"Sometimes you have to rock the boat to make progress.\"\n- \"We rocked the boat, and now we're all wet.\""
  },
  "Run it up the flagpole": {
    definition: "To ask for permission from someone who doesn't understand the project but has the authority to say no. The corporate version of 'let me ask my mom.'",
    examples: "Examples:\n- \"Let's run this up the flagpole and see who salutes.\"\n- \"We need to run it up the flagpole before proceeding.\"\n- \"We ran it up the flagpole, but no one saluted.\""
  },
  "Sacred cow": {
    definition: "A project, process, or person that's considered untouchable, usually because it's been around forever or because someone important likes it, even though it's completely useless.",
    examples: "Examples:\n- \"That project is a sacred cow - we can't touch it.\"\n- \"We need to identify and eliminate our sacred cows.\"\n- \"The sacred cow is sacred, but it's not producing milk.\""
  },
  "Seamless": {
    definition: "A word used to describe processes that are supposed to be smooth and effortless, but are usually anything but. The corporate equivalent of 'it just works.'",
    examples: "Examples:\n- \"We need to create a seamless experience for our customers.\"\n- \"The integration should be seamless.\"\n- \"It's seamless, except for all the seams.\""
  },
  "Secret sauce": {
    definition: "The mysterious ingredient that makes everything work, which is usually just 'working really hard' or 'having good luck' but sounds more impressive when you call it a secret.",
    examples: "Examples:\n- \"Our secret sauce is what sets us apart from the competition.\"\n- \"We can't reveal our secret sauce.\"\n- \"The secret sauce is that there's no sauce.\""
  },
  "Shoot for the moon": {
    definition: "To aim for ambitious goals, which in corporate terms usually means setting unrealistic expectations that everyone knows are impossible but no one wants to admit.",
    examples: "Examples:\n- \"Let's shoot for the moon with this project.\"\n- \"We're shooting for the moon, but we don't have a rocket.\"\n- \"We shot for the moon and hit the ceiling.\""
  },
  "Silo": {
    definition: "A department or team that operates independently and doesn't communicate with others, creating inefficiency and duplication while everyone pretends it's not a problem.",
    examples: "Examples:\n- \"We need to break down the silos between departments.\"\n- \"The silo mentality is hurting our productivity.\"\n- \"We're not in silos, we're in separate buildings.\""
  },
  "Skin in the game": {
    definition: "Having a personal stake in the outcome, which in corporate terms usually means having something to lose if things go wrong, but not necessarily something to gain if they go right.",
    examples: "Examples:\n- \"We need everyone to have skin in the game.\"\n- \"He has skin in the game, so he's motivated to succeed.\"\n- \"We all have skin in the game, but some have more skin than others.\""
  },
  "Slam dunk": {
    definition: "A sure thing or guaranteed success, which in corporate terms usually means something that looks easy but is actually impossible, like most slam dunks for people who aren't professional basketball players.",
    examples: "Examples:\n- \"This project is a slam dunk - we can't lose.\"\n- \"It's a slam dunk opportunity for growth.\"\n- \"We thought it was a slam dunk, but we missed the basket.\""
  },
  "Slippery slope": {
    definition: "A situation where one small change could lead to bigger problems, which in corporate settings is usually used as an excuse to avoid making any changes at all.",
    examples: "Examples:\n- \"This could be a slippery slope to more problems.\"\n- \"We need to avoid the slippery slope of complacency.\"\n- \"The slippery slope is slippery, but we're sliding anyway.\""
  },
  "Smoke and mirrors": {
    definition: "Deception or trickery used to make something appear better than it actually is, which is basically the entire corporate presentation industry.",
    examples: "Examples:\n- \"This proposal is just smoke and mirrors.\"\n- \"We need to cut through the smoke and mirrors.\"\n- \"The smoke and mirrors are working - no one can see the truth.\""
  },
  "Squeaky wheel": {
    definition: "Someone who complains loudly and frequently, usually because they're not getting what they want, but sometimes because they're the only one paying attention to real problems.",
    examples: "Examples:\n- \"The squeaky wheel gets the grease.\"\n- \"We need to address the squeaky wheels in the organization.\"\n- \"The squeaky wheel is squeaking, but no one is listening.\""
  },
  "Square one": {
    definition: "The beginning or starting point, which in corporate terms usually means you've wasted a lot of time and money and now have to start over because the original plan was terrible.",
    examples: "Examples:\n- \"We're back to square one on this project.\"\n- \"Let's go back to square one and rethink this.\"\n- \"Square one is where we started, and where we'll end.\""
  },
  "Stake in the ground": {
    definition: "A firm position or commitment that you're not willing to change, which in corporate terms usually means you're wrong but too stubborn to admit it.",
    examples: "Examples:\n- \"We need to put a stake in the ground on this decision.\"\n- \"This is our stake in the ground - we're not moving.\"\n- \"We put a stake in the ground, but the ground is shifting.\""
  },
  "Steep learning curve": {
    definition: "A difficult process of learning something new, which in corporate terms usually means the training was terrible and the documentation is useless, but we'll blame it on complexity.",
    examples: "Examples:\n- \"There's a steep learning curve with this new system.\"\n- \"We need to account for the steep learning curve.\"\n- \"The learning curve is so steep, we're falling off.\""
  },
  "Sticky situation": {
    definition: "A difficult or problematic situation that's hard to resolve, usually because someone made a bad decision and now everyone has to deal with the consequences.",
    examples: "Examples:\n- \"We're in a sticky situation with this client.\"\n- \"This is a sticky situation that needs careful handling.\"\n- \"The situation is sticky, and we're stuck.\""
  },
  "Stir the pot": {
    definition: "To cause trouble or controversy by bringing up difficult topics, which in corporate culture is usually discouraged unless you're the CEO or have a really good reason.",
    examples: "Examples:\n- \"We don't want to stir the pot with this change.\"\n- \"Sometimes you have to stir the pot to make progress.\"\n- \"We stirred the pot, and now it's boiling over.\""
  },
  "Stretch goal": {
    definition: "An ambitious target that's supposed to motivate people to work harder, but usually just creates stress and disappointment when it's inevitably not achieved.",
    examples: "Examples:\n- \"This is a stretch goal, but we believe we can achieve it.\"\n- \"Stretch goals help us push beyond our comfort zone.\"\n- \"We stretched for the goal, but we pulled a muscle.\""
  },
  "Sweat the small stuff": {
    definition: "To focus on minor details, which in corporate terms usually means obsessing over things that don't matter while ignoring the big problems that actually need to be solved.",
    examples: "Examples:\n- \"We need to sweat the small stuff to ensure quality.\"\n- \"Don't sweat the small stuff - focus on the big picture.\"\n- \"We're sweating the small stuff, but we're drowning in it.\""
  },
  "Sweet spot": {
    definition: "The ideal balance or optimal point, which in corporate terms usually means the compromise that makes everyone equally unhappy but no one angry enough to complain.",
    examples: "Examples:\n- \"We need to find the sweet spot between cost and quality.\"\n- \"This pricing hits the sweet spot for our market.\"\n- \"The sweet spot is sweet, but it's also tiny.\""
  },
  "Take it to the next level": {
    definition: "To improve or enhance something, which in corporate terms usually means adding more complexity and buzzwords without actually making anything better.",
    examples: "Examples:\n- \"We need to take this project to the next level.\"\n- \"Let's take our strategy to the next level.\"\n- \"We took it to the next level, but we're not sure what level we're on.\""
  },
  "Think big": {
    definition: "To consider ambitious or large-scale ideas, which in corporate terms usually means coming up with expensive, impractical solutions that sound impressive in presentations.",
    examples: "Examples:\n- \"We need to think big about this opportunity.\"\n- \"Thinking big is what drives innovation.\"\n- \"We thought big, but we can't afford big.\""
  },
  "Touch base": {
    definition: "To have a brief conversation or check-in, which in corporate terms usually means having a long, unproductive meeting that accomplishes nothing but makes everyone feel like they're being collaborative.",
    examples: "Examples:\n- \"Let's touch base next week about the project.\"\n- \"I wanted to touch base with you about the changes.\"\n- \"We touched base, but we're still not on the same page.\""
  },
  "Under the radar": {
    definition: "Operating without attracting attention, which in corporate terms usually means doing something that you know is wrong but hoping no one notices until it's too late.",
    examples: "Examples:\n- \"We need to keep this project under the radar.\"\n- \"Let's fly under the radar until we're ready to launch.\"\n- \"We're under the radar, but we're also lost.\""
  },
  "Up in the air": {
    definition: "Uncertain or undecided, which in corporate terms usually means no one wants to make a decision because they're afraid of being wrong, so everyone just waits for someone else to decide.",
    examples: "Examples:\n- \"The timeline is still up in the air.\"\n- \"We have several options up in the air.\"\n- \"Everything is up in the air, and we're falling.\""
  },
  "Value proposition": {
    definition: "The unique benefit or advantage that your product or service offers, which in corporate terms usually means the same thing everyone else offers but with better marketing.",
    examples: "Examples:\n- \"We need to clearly communicate our value proposition.\"\n- \"The value proposition is what sets us apart.\"\n- \"Our value proposition is that we have a value proposition.\""
  },
  "Walk the walk": {
    definition: "To actually do what you say you're going to do, which in corporate terms is rare because most people are too busy talking the talk to actually walk anywhere.",
    examples: "Examples:\n- \"We need to walk the walk, not just talk the talk.\"\n- \"It's time to walk the walk on our commitments.\"\n- \"We're walking the walk, but we're walking in circles.\""
  },
  "Wheelhouse": {
    definition: "An area of expertise or strength, which in corporate terms usually means the one thing you're actually good at, which you'll ignore in favor of trying to be good at everything.",
    examples: "Examples:\n- \"This project is right in my wheelhouse.\"\n- \"We need to stay in our wheelhouse.\"\n- \"The wheelhouse is where the wheel is, but we're not driving.\""
  },
  "White elephant": {
    definition: "A possession that's expensive to maintain but difficult to get rid of, which in corporate terms usually describes most of the projects and initiatives that sounded good in the boardroom.",
    examples: "Examples:\n- \"This project has become a white elephant.\"\n- \"We need to identify and eliminate our white elephants.\"\n- \"The white elephant is white, but it's also expensive.\""
  },
  "Win-win": {
    definition: "A situation where everyone pretends to be happy, but someone is definitely losing and it's probably you. The corporate equivalent of 'everyone gets a participation trophy.'",
    examples: "Examples:\n- \"This deal is a win-win for both parties.\"\n- \"We need to find a win-win solution to this problem.\"\n- \"It's a win-win, but I'm not sure who's winning what.\""
  },
  "Zero-sum game": {
    definition: "A situation where one person's gain is another person's loss, which describes most corporate politics and budget negotiations, where someone always has to lose for someone else to win.",
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

const migrationFile = `infra/d1-migrations/063_final_terms_improvement.sql`;
fs.writeFileSync(migrationFile, sqlUpdates);

console.log(`Generated migration file: ${migrationFile}`);
console.log(`Processed ${Object.keys(improvedDefinitions).length} terms successfully!`);
console.log('\nSample improvements:');
Object.entries(improvedDefinitions).slice(0, 5).forEach(([term, data]) => {
  console.log(`\n${term}:`);
  console.log(`Definition: ${data.definition.substring(0, 100)}...`);
});
