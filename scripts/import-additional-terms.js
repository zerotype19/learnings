#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// CSV data provided by user
const csvData = `term,definition
Above my paygrade,"Outside the scope of your responsibility; needs to be addressed by someone higher up."
Action item,"A task that must be completed, usually arising from a meeting."
Back burner,"A task or responsibility to revisit later."
Bandwidth,"Time and energy available to take on new work."
Brain dump,"Putting all the thoughts in your head onto paper or sharing knowledge quickly."
Break down silos,"Remove barriers between teams or departments to improve efficiency."
Bring to the table,"Skills or expertise a person offers to a company or project."
Buy-in,"Getting employees or stakeholders to willingly support a plan or policy."
Churn,"The rate at which employees or customers leave a business."
Clock watcher,"An employee who constantly checks the time, waiting for the day to end."
Core competency,"An organization's or individual's key strength or area of expertise."
Deep dive,"A thorough, detailed analysis of a topic."
Deliverable,"Something that must be produced as part of a project."
Drill down,"Analyze something in greater detail."
Drink the Kool-Aid,"Blindly follow questionable ideas or principles."
Ducks in a row,"Get everything organized and under control."
Dumpster fire,"A catastrophically bad situation."
Fire drill,"An urgent, unexpected task requiring immediate action."
Flesh out,"Provide additional detail or information."
Game changer,"A new element that significantly alters the situation."
Go to market,"How a company delivers products and services to customers."
Hard stop,"A firm end time due to another commitment."
Herding cats,"Trying to manage a difficult, uncontrollable group."
Hot desking,"Shared desks available on a first-come, first-serve basis."
In the weeds,"Overwhelmed by detail or excessive work."
Circle back,"Reconnect on a topic at a later time."
Take this offline,"Discuss privately or outside of a meeting."
Low-hanging fruit,"Easy, high-impact opportunities."
Make hay,"Take advantage of an opportunity while it lasts."
Micromanager,"A boss who excessively observes and controls workers."
Move the goalposts,"Change rules midstream to make success harder for others."
Move the needle,"Make noticeable, meaningful progress."
Office drone,"An employee stuck in repetitive, mundane work."
One-on-one,"A regular meeting between two people, usually manager and employee."
Pain point,"A problem or frustration faced by customers or employees."
Per my last email,"Polite way of saying the question was already answered earlier."
Ping,"Send a brief message or notification."
Pivot,"Strategically shift direction or focus."
Punt,"Postpone or delay a decision or task."
Put a pin in it,"Pause a topic with the intent to revisit later."
Put out a fire,"Fix an urgent problem quickly."
Reinvent the wheel,"Recreate something that already exists, often unnecessarily."
Run it up the flagpole,"Test an idea to see if it gains support."
Run the numbers,"Perform financial or numerical calculations."
Sidebar,"An off-topic or smaller discussion during a meeting."
Slide deck,"A presentation, usually in PowerPoint."
Stand-up,"A brief daily meeting to share goals and progress."
Think outside the box,"Generate unconventional or creative ideas."
Throw under the bus,"Blame someone else to avoid consequences."
Top-down,"Leadership makes decisions that cascade down to employees."
Touch base,"Have a quick update conversation."
Touchpoint,"An interaction between a company and a customer."
Trim the fat,"Remove unnecessary costs or steps."
Voluntold,"Being told to 'volunteer' for something."
Watercooler,"Casual workplace conversations or gossip."
30,000-foot view,"Consider the big picture rather than the details."
Alignment,"Shared understanding of a goal or plan."
Close the loop,"Wrap up a process or decision with a firm conclusion."
Disrupt,"Introduce something new or innovative to change the status quo."
Double-click,"Dig deeper into a topic or issue."
Download,"Share or pass along information to others."
EOD,"End of day; often ambiguous without a time zone."
Full disclosure,"Completely admit relevant information."
Ideate,"Generate new ideas through brainstorming."
Leverage,"Use resources or relationships to maximum advantage."
Mind meld,"Share ideas and perspectives collaboratively."
Mission critical,"Essential to achieving success."
Offline,"Discuss later or outside the current meeting."
Out of pocket,"Unavailable or unreachable; sometimes refers to paying personally."
Piggyback,"Build on an existing idea or effort."
Scale,"Expand a process, team, or business effectively."
Seamless,"Smooth and efficient experience or process."
Synergy,"Combined effort producing better results than individuals alone."
Table this,"Postpone or set aside a discussion or decision."
Utilize,"Formal jargon for 'use.'"
2.0,"A newer, improved version of something."
80/20,"Achieve the majority of impact with minimal effort."
Actionable,"Something clear enough to act upon."
Add value,"Contribute something meaningful or useful."
Agenda,"List of topics for a meeting."
Align upon,"Reach agreement on a topic."
Apologies,"A polite way of saying 'sorry' in professional contexts."
ASAP,"As soon as possible."
At the end of the day,"The most important final consideration."
Back-channeling,"Private conversations to influence outcomes."
Ball in your court,"Responsibility for the next move is yours."
Bellwether,"An early indicator of future trends."
Benchmark,"A standard or point of comparison."
Best practice,"Most trusted or accepted way of doing something."
Bite the bullet,"Do something unpleasant but necessary."
Blessing,"Approval from someone in authority."
Blocking and tackling,"Basic tasks required to get work done."
Blue ocean,"A new, competition-free market space."
Blue sky thinking,"Creative brainstorming without constraints."
Boil the ocean,"Overcomplicate something unnecessarily."
Broken record,"Repeating the same point to annoyance."
Buckets,"Categories for organizing information."
Business case,"The reasoning for why something makes business sense."
Cadence,"The regular rhythm or frequency of meetings or work."
Call to action,"A prompt directing someone toward a next step."
Can of worms,"A small issue that could spiral into something bigger."
Canary in the coal mine,"An early warning of danger."
Champion,"A person who advocates for or drives a project."
Chime in,"Add comments or input in a discussion."
COB,"Close of business, usually 5:00 PM."
Context,"Background information needed for understanding."
Critical path,"Essential sequence of tasks in a project."
CYA,"Cover your ass — protect yourself from blame."
Deck,"A presentation, usually a slide deck."
Delta,"The difference between two things."
Derisk,"Take steps to reduce uncertainty or risk."
Direct reports,"Employees who report directly to a manager."
Dry powder,"Reserves of money or resources."
Drop the ball,"Fail to deliver on expectations."
Due diligence,"Thoroughly research or verify something."
Elephant in the room,"An obvious, unspoken issue."
Engage,"Involve or participate actively."
ETA,"Estimated time of arrival."
Executive summary,"Concise overview of the most important points."
Flight risk,"An employee likely to quit soon."
Framework,"A structured way of organizing or analyzing something."
FTE,"Full-time employee."
FYI,"For your information."
Gantt chart,"A visual timeline of tasks and deadlines."
Get the ball rolling,"Start an activity or initiative."
Golden handcuffs,"Being stuck in a high-paying job you don't want to leave."
Granular,"Detailed and specific."
Gut feel,"An instinctive reaction."
Hard copy,"A physical paper version of a document."
Headwinds,"Factors that slow progress."
HiPPO,"Highest Paid Person's Opinion."
Hit the ground running,"Start contributing immediately."
Hypothesis,"An educated guess to be tested."
In the loop,"Being kept informed."
In the pipeline,"Tasks, deals, or projects that are upcoming."
In your wheelhouse,"An area of expertise."
Incentivize,"Give someone a reason or reward to act."
Iterate,"Refine something through multiple versions."
Key takeaway,"The main point or conclusion."
Level set,"Ensure everyone has the same understanding."
Light a fire under,"Motivate or pressure someone to act."
Lipstick on a pig,"Make something bad look superficially better."
Loop in,"Include someone in a conversation."
Macro,"Broad external factors affecting decisions."
Material,"Significant enough to affect outcomes."
MECE,"Mutually exclusive, collectively exhaustive categorization."
Net-net,"The final result after all factors."
On board,"In agreement with a plan or decision."
On my radar,"Something being monitored."
On the same page,"Having a shared understanding."
OOO,"Out of office."
Open the floodgates,"Allowing overwhelming activity to begin."
Optics,"How something appears to others."
Optionality,"Having multiple choices or paths."
Order of magnitude,"The scale or size of something."
Ownership mindset,"Taking full responsibility for outcomes."
Paradigm shift,"A fundamental change in thinking."
Pencil in,"Tentatively schedule something."
Pick your brain,"Ask for someone's advice or ideas."
Plenary,"A meeting with everyone involved."
POC,"Point of contact."
POV,"Point of view or opinion."
Pressure test,"Stress-test an idea or assumption."
Roadmap,"A plan or timeline of milestones."
Rocket science,"Something very difficult (often sarcastic)."
ROI,"Return on investment."
Runway,"How much time/resources remain before running out."
Scalable,"Able to expand without proportional effort."
Scope,"Boundaries of a project."
Shiny object,"Attractive distraction from core work."
Skeletons in the closet,"Hidden problems that emerge later."
Skunkworks,"Small group secretly working on innovation."
Slippery slope,"One action that could trigger worse consequences."
Socialize,"Float an idea around to gain buy-in."
Span of control,"Number of people a manager oversees."
Strawman,"A draft version for discussion."
Swim lane,"An individual's role or responsibility."
Synthesize,"Summarize into a coherent whole."
Table stakes,"The bare minimum required to compete."
Technical debt,"The future cost of hasty, imperfect solutions."
Timebox,"Set a time limit for a task."
Too many cooks in the kitchen,"Too many people involved, slowing progress."
Top of mind,"The most important or urgent consideration."
Tour of duty,"A set period of work on a role or mission."
Traction,"Evidence of progress or acceptance."
Triangulate,"Estimate by combining multiple data points."
Two cents,"Sharing your opinion."
Unpack,"Explain in more detail."
Value add,"Something that increases worth or impact."
Value proposition,"The core reason something is attractive to customers."
Whiteboarding,"Brainstorming using a physical or virtual whiteboard."
Wheelhouse,"An area of expertise."
Wrap your head around,"Understand something complex."
YTD,"Year to date, since January 1."
You're crushing it,"Performing exceptionally well or exceeding goals."
Bleeding edge,"Beyond cutting edge; newest innovations."
Lots of moving parts,"A project with many interdependent components."
Empower,"Give someone authority or confidence to act."
Jump the shark,"Decline while trying too hard to stay relevant."
Core values,"Standards or beliefs that guide a company."
Thought shower,"Group brainstorming session."
Tiger team,"Specialized group assembled to solve a challenge."
SWAT team,"A tactical project group assigned to implement solutions."
Key takeaways,"Most important lessons or conclusions from a session."
Gain traction,"When an idea or project begins to show momentum."
Aha moment,"A sudden realization or breakthrough."
Silver bullet,"A simple, effective solution to a complex problem."
Food chain,"The hierarchy of roles within an organization."
Knee deep,"Stuck in a tough or overwhelming situation."
Table the conversation,"Pause a discussion, possibly indefinitely."`;

// Parse CSV data
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Parse CSV line handling quoted fields
    const values = parseCSVLine(line);
    if (values.length >= 2) {
      rows.push({
        term: values[0].trim(),
        definition: values[1].trim()
      });
    }
  }
  
  return rows;
}

// Parse a single CSV line handling quoted fields with commas
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

// Generate slug from term
function generateSlug(term) {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Generate tags based on term content
function generateTags(term, definition) {
  const tags = ['corporate', 'buzzword'];
  
  const termLower = term.toLowerCase();
  const defLower = definition.toLowerCase();
  
  // Add category tags based on content
  if (defLower.includes('meeting') || defLower.includes('discussion') || termLower.includes('meeting')) {
    tags.push('meeting');
  }
  if (defLower.includes('project') || defLower.includes('task') || defLower.includes('work')) {
    tags.push('project');
  }
  if (defLower.includes('management') || defLower.includes('manager') || defLower.includes('boss')) {
    tags.push('management');
  }
  if (defLower.includes('business') || defLower.includes('company') || defLower.includes('organization')) {
    tags.push('business');
  }
  if (defLower.includes('team') || defLower.includes('group') || defLower.includes('collaboration')) {
    tags.push('team');
  }
  if (defLower.includes('strategy') || defLower.includes('plan') || defLower.includes('approach')) {
    tags.push('strategy');
  }
  if (defLower.includes('communication') || defLower.includes('email') || defLower.includes('message')) {
    tags.push('communication');
  }
  if (defLower.includes('time') || defLower.includes('deadline') || defLower.includes('schedule')) {
    tags.push('time');
  }
  
  return tags;
}

// Generate example based on term
function generateExample(term) {
  const examples = {
    'Above my paygrade': 'I can\'t approve that budget increase - that\'s above my paygrade.',
    'Action item': 'Let\'s add "review the quarterly report" as an action item for next week.',
    'Back burner': 'We\'ll put the new website redesign on the back burner for now.',
    'Bandwidth': 'I don\'t have the bandwidth to take on another project this month.',
    'Brain dump': 'Let me do a quick brain dump of all the ideas I have for this campaign.',
    'Break down silos': 'We need to break down silos between marketing and sales to improve lead quality.',
    'Bring to the table': 'What unique skills does Sarah bring to the table for this project?',
    'Buy-in': 'We need to get buy-in from the executive team before moving forward.',
    'Churn': 'Our customer churn rate has increased by 15% this quarter.',
    'Clock watcher': 'John is such a clock watcher - he leaves exactly at 5 PM every day.',
    'Core competency': 'Our core competency is in data analytics and machine learning.',
    'Deep dive': 'Let\'s do a deep dive into the customer feedback data to find patterns.',
    'Deliverable': 'The main deliverable for this phase is a comprehensive market analysis.',
    'Drill down': 'We need to drill down into the sales numbers to understand the decline.',
    'Drink the Kool-Aid': 'She\'s really drinking the Kool-Aid on this new management philosophy.',
    'Ducks in a row': 'Let\'s get our ducks in a row before the board meeting next week.',
    'Dumpster fire': 'The product launch was a complete dumpster fire.',
    'Fire drill': 'Sorry for the fire drill, but we need this report by end of day.',
    'Flesh out': 'Can you flesh out the details of your proposal for the client meeting?',
    'Game changer': 'This new AI tool could be a real game changer for our productivity.',
    'Go to market': 'What\'s our go-to-market strategy for the new product line?',
    'Hard stop': 'I have a hard stop at 3 PM for another meeting.',
    'Herding cats': 'Managing this cross-functional team is like herding cats.',
    'Hot desking': 'With hot desking, you can sit anywhere in the office that\'s available.',
    'In the weeds': 'I\'m getting too in the weeds on this project - let me step back.',
    'Circle back': 'Let\'s circle back on this topic after we have more data.',
    'Take this offline': 'This is getting too detailed - let\'s take this offline.',
    'Low-hanging fruit': 'Let\'s focus on the low-hanging fruit first to show quick wins.',
    'Make hay': 'We need to make hay while the market conditions are favorable.',
    'Micromanager': 'My last boss was such a micromanager - she checked in every hour.',
    'Move the goalposts': 'Every time we get close to the target, they move the goalposts.',
    'Move the needle': 'This new marketing campaign should really move the needle on sales.',
    'Office drone': 'After 10 years of the same routine, I feel like an office drone.',
    'One-on-one': 'Let\'s schedule a one-on-one to discuss your career development.',
    'Pain point': 'What\'s the biggest pain point our customers are experiencing?',
    'Per my last email': 'Per my last email, the deadline is next Friday.',
    'Ping': 'I\'ll ping you when I have the updated numbers.',
    'Pivot': 'We need to pivot our strategy based on the market feedback.',
    'Punt': 'Let\'s punt this decision to next quarter when we have more budget.',
    'Put a pin in it': 'Let\'s put a pin in this discussion and revisit it next week.',
    'Put out a fire': 'I spent all morning putting out fires instead of working on my project.',
    'Reinvent the wheel': 'We don\'t need to reinvent the wheel - there are existing solutions.',
    'Run it up the flagpole': 'Let me run this idea up the flagpole and see what leadership thinks.',
    'Run the numbers': 'Can you run the numbers on this proposal and see if it\'s viable?',
    'Sidebar': 'Quick sidebar - did you see the email about the office party?',
    'Slide deck': 'I\'ll send you the slide deck from yesterday\'s presentation.',
    'Stand-up': 'Our daily stand-up is at 9 AM - what did you accomplish yesterday?',
    'Think outside the box': 'We need to think outside the box to solve this problem.',
    'Throw under the bus': 'Don\'t throw me under the bus when the client asks about the delay.',
    'Top-down': 'This is a top-down decision from the executive team.',
    'Touch base': 'Let\'s touch base next week to see how the project is going.',
    'Touchpoint': 'Every customer touchpoint should reflect our brand values.',
    'Trim the fat': 'We need to trim the fat from this budget to make it work.',
    'Voluntold': 'I was voluntold to lead the company picnic committee.',
    'Watercooler': 'The watercooler talk is that there might be layoffs coming.',
    '30,000-foot view': 'Let\'s step back and look at the 30,000-foot view of this situation.',
    'Alignment': 'We need better alignment between the sales and marketing teams.',
    'Close the loop': 'Let\'s close the loop on this project and document the lessons learned.',
    'Disrupt': 'Our new technology will disrupt the entire industry.',
    'Double-click': 'Let\'s double-click on that point and explore it further.',
    'Download': 'Can you download me on what happened in the meeting?',
    'EOD': 'I need this report by EOD today.',
    'Full disclosure': 'Full disclosure - I have a conflict of interest in this decision.',
    'Ideate': 'Let\'s ideate some creative solutions to this challenge.',
    'Leverage': 'We need to leverage our existing relationships to grow the business.',
    'Mind meld': 'Let\'s do a mind meld session to align on our strategy.',
    'Mission critical': 'This project is mission critical to our Q4 goals.',
    'Offline': 'Let\'s discuss this offline after the meeting.',
    'Out of pocket': 'I\'ll be out of pocket next week for vacation.',
    'Piggyback': 'Can we piggyback on the marketing campaign they\'re running?',
    'Scale': 'We need to scale this process to handle 10x more customers.',
    'Seamless': 'The new system provides a seamless experience for users.',
    'Synergy': 'The synergy between our teams will drive better results.',
    'Table this': 'Let\'s table this discussion until we have more information.',
    'Utilize': 'We should utilize our existing resources more effectively.',
    '2.0': 'This is our marketing strategy 2.0 - completely revamped.',
    '80/20': 'Let\'s apply the 80/20 rule and focus on our top customers.',
    'Actionable': 'These insights are actionable - we can implement them immediately.',
    'Add value': 'How does this proposal add value to our customers?',
    'Agenda': 'What\'s on the agenda for today\'s team meeting?',
    'Align upon': 'We need to align upon our priorities before moving forward.',
    'Apologies': 'Apologies for the confusion - let me clarify the requirements.',
    'ASAP': 'I need this report ASAP for the board meeting.',
    'At the end of the day': 'At the end of the day, we need to focus on profitability.',
    'Back-channeling': 'There\'s been a lot of back-channeling about the reorganization.',
    'Ball in your court': 'The ball is in your court - what\'s your decision?',
    'Bellwether': 'This company is a bellwether for the entire industry.',
    'Benchmark': 'Let\'s benchmark our performance against industry standards.',
    'Best practice': 'This approach follows industry best practices.',
    'Bite the bullet': 'We need to bite the bullet and make the tough decision.',
    'Blessing': 'I have the blessing of leadership to proceed with this initiative.',
    'Blocking and tackling': 'Let\'s focus on the blocking and tackling to get this done.',
    'Blue ocean': 'We\'re looking for blue ocean opportunities in the market.',
    'Blue sky thinking': 'Let\'s do some blue sky thinking about future possibilities.',
    'Boil the ocean': 'Don\'t try to boil the ocean - focus on one thing at a time.',
    'Broken record': 'I sound like a broken record, but we need to stay focused.',
    'Buckets': 'Let\'s organize these ideas into different buckets.',
    'Business case': 'What\'s the business case for this investment?',
    'Cadence': 'We need to establish a regular cadence for these meetings.',
    'Call to action': 'The call to action in our email campaign needs to be stronger.',
    'Can of worms': 'This policy change could open up a can of worms.',
    'Canary in the coal mine': 'This customer complaint is a canary in the coal mine.',
    'Champion': 'We need a champion for this initiative at the executive level.',
    'Chime in': 'Feel free to chime in with your thoughts on this proposal.',
    'COB': 'I need this by COB today.',
    'Context': 'Let me provide some context for this decision.',
    'Critical path': 'What\'s the critical path for completing this project on time?',
    'CYA': 'I\'m sending this email to CYA in case there are questions later.',
    'Deck': 'Can you send me the deck from yesterday\'s presentation?',
    'Delta': 'What\'s the delta between our current and target performance?',
    'Derisk': 'We need to derisk this investment by getting more data.',
    'Direct reports': 'I have 8 direct reports on my team.',
    'Dry powder': 'We need to keep some dry powder for unexpected opportunities.',
    'Drop the ball': 'Don\'t drop the ball on this important client meeting.',
    'Due diligence': 'We need to do our due diligence before making this acquisition.',
    'Elephant in the room': 'The elephant in the room is our declining market share.',
    'Engage': 'We need to better engage our employees in the decision-making process.',
    'ETA': 'What\'s the ETA on the project completion?',
    'Executive summary': 'The executive summary should highlight the key findings.',
    'Flight risk': 'Sarah is a flight risk - we need to address her concerns.',
    'Framework': 'Let\'s use this framework to analyze the situation.',
    'FTE': 'We need to hire 3 more FTEs for this project.',
    'FYI': 'FYI, the meeting has been moved to 2 PM.',
    'Gantt chart': 'The Gantt chart shows we\'re behind schedule on phase 2.',
    'Get the ball rolling': 'Let\'s get the ball rolling on this initiative.',
    'Golden handcuffs': 'The high salary is like golden handcuffs - I can\'t afford to leave.',
    'Granular': 'We need to get more granular with our analysis.',
    'Gut feel': 'My gut feel is that this approach won\'t work.',
    'Hard copy': 'Can you print me a hard copy of the contract?',
    'Headwinds': 'We\'re facing strong headwinds in the current market.',
    'HiPPO': 'The HiPPO wants to go with option A, regardless of the data.',
    'Hit the ground running': 'The new hire needs to hit the ground running on this project.',
    'Hypothesis': 'Our hypothesis is that customers will pay more for convenience.',
    'In the loop': 'Keep me in the loop on any developments.',
    'In the pipeline': 'We have several deals in the pipeline for next quarter.',
    'In your wheelhouse': 'This project is right in your wheelhouse.',
    'Incentivize': 'We need to incentivize better performance with bonuses.',
    'Iterate': 'Let\'s iterate on this design based on user feedback.',
    'Key takeaway': 'The key takeaway from the meeting is that we need to act fast.',
    'Level set': 'Let\'s level set on expectations for this project.',
    'Light a fire under': 'We need to light a fire under the development team.',
    'Lipstick on a pig': 'This redesign is just lipstick on a pig - the core issues remain.',
    'Loop in': 'Let\'s loop in the legal team on this contract.',
    'Macro': 'The macro economic factors are affecting our business.',
    'Material': 'This change is material enough to require board approval.',
    'MECE': 'Let\'s organize this data using MECE principles.',
    'Net-net': 'Net-net, this decision will save us $50K annually.',
    'On board': 'Is everyone on board with this new process?',
    'On my radar': 'This issue is on my radar - I\'m monitoring it closely.',
    'On the same page': 'Let\'s make sure we\'re all on the same page.',
    'OOO': 'I\'m OOO next week for vacation.',
    'Open the floodgates': 'This policy change could open the floodgates for complaints.',
    'Optics': 'The optics of this decision are terrible for our brand.',
    'Optionality': 'We need to maintain optionality in our approach.',
    'Order of magnitude': 'This is an order of magnitude larger than our previous projects.',
    'Ownership mindset': 'We need everyone to have an ownership mindset.',
    'Paradigm shift': 'This represents a paradigm shift in how we do business.',
    'Pencil in': 'Let\'s pencil in a meeting for next Tuesday.',
    'Pick your brain': 'Can I pick your brain about this marketing strategy?',
    'Plenary': 'The plenary session will include all stakeholders.',
    'POC': 'Who\'s the POC for this project?',
    'POV': 'What\'s your POV on this proposal?',
    'Pressure test': 'Let\'s pressure test this assumption with some data.',
    'Roadmap': 'What\'s the roadmap for rolling out this new feature?',
    'Rocket science': 'This isn\'t rocket science - we just need to execute better.',
    'ROI': 'What\'s the expected ROI on this investment?',
    'Runway': 'We have 6 months of runway before we need more funding.',
    'Scalable': 'This solution needs to be scalable to handle growth.',
    'Scope': 'The scope of this project has expanded significantly.',
    'Shiny object': 'Don\'t get distracted by shiny objects - stay focused.',
    'Skeletons in the closet': 'Every company has skeletons in the closet.',
    'Skunkworks': 'The skunkworks team is working on some innovative ideas.',
    'Slippery slope': 'This policy change could be a slippery slope.',
    'Socialize': 'Let\'s socialize this idea with the team before presenting it.',
    'Span of control': 'My span of control is too wide - I need more managers.',
    'Strawman': 'This is just a strawman proposal for discussion.',
    'Swim lane': 'That\'s not in my swim lane - talk to the marketing team.',
    'Synthesize': 'Can you synthesize the key points from all the research?',
    'Table stakes': 'These features are table stakes - everyone has them.',
    'Technical debt': 'We have a lot of technical debt to address.',
    'Timebox': 'Let\'s timebox this discussion to 30 minutes.',
    'Too many cooks in the kitchen': 'There are too many cooks in the kitchen on this project.',
    'Top of mind': 'This issue is top of mind for the executive team.',
    'Tour of duty': 'My tour of duty in this role is 2 years.',
    'Traction': 'We\'re finally gaining traction with our new product.',
    'Triangulate': 'Let\'s triangulate this data with other sources.',
    'Two cents': 'Here\'s my two cents on the situation.',
    'Unpack': 'Let\'s unpack this issue and understand the root cause.',
    'Value add': 'What\'s the value add of this new feature?',
    'Value proposition': 'Our value proposition needs to be clearer.',
    'Whiteboarding': 'Let\'s do some whiteboarding to brainstorm solutions.',
    'Wheelhouse': 'This project is right in my wheelhouse.',
    'Wrap your head around': 'It took me a while to wrap my head around this concept.',
    'YTD': 'Our YTD performance is 15% above target.',
    'You\'re crushing it': 'You\'re crushing it on this project - great work!',
    'Bleeding edge': 'This technology is bleeding edge - very experimental.',
    'Lots of moving parts': 'This project has lots of moving parts to coordinate.',
    'Empower': 'We need to empower our employees to make decisions.',
    'Jump the shark': 'This product line has jumped the shark - time to pivot.',
    'Core values': 'Our core values guide every decision we make.',
    'Thought shower': 'Let\'s do a thought shower to generate ideas.',
    'Tiger team': 'We\'ve assembled a tiger team to solve this crisis.',
    'SWAT team': 'The SWAT team will implement the emergency response plan.',
    'Key takeaways': 'Here are the key takeaways from today\'s meeting.',
    'Gain traction': 'Our new initiative is finally gaining traction.',
    'Aha moment': 'I had an aha moment about the solution during the meeting.',
    'Silver bullet': 'There\'s no silver bullet for this complex problem.',
    'Food chain': 'In the corporate food chain, I\'m pretty low on the totem pole.',
    'Knee deep': 'I\'m knee deep in this project and can\'t take on anything else.',
    'Table the conversation': 'Let\'s table the conversation until we have more data.'
  };
  
  return examples[term] || `Example usage of "${term}" in a corporate context.`;
}

// Main function
function main() {
  console.log('🚀 Starting import of additional terms...');
  
  // Parse CSV data
  const terms = parseCSV(csvData);
  console.log(`📊 Parsed ${terms.length} terms from CSV data`);
  
  // Generate SQL migration
  const migrationContent = generateMigration(terms);
  
  // Write migration file
  const migrationPath = path.join(__dirname, '..', 'infra', 'd1-migrations', '044_import_additional_terms.sql');
  fs.writeFileSync(migrationPath, migrationContent);
  
  console.log(`✅ Migration file created: ${migrationPath}`);
  console.log(`📝 Generated SQL for ${terms.length} terms`);
  
  // Generate report
  const reportPath = path.join(__dirname, 'additional-terms-report.txt');
  const report = generateReport(terms);
  fs.writeFileSync(reportPath, report);
  
  console.log(`📋 Report generated: ${reportPath}`);
  console.log('🎉 Import preparation complete!');
  console.log('\nNext steps:');
  console.log('1. Review the migration file');
  console.log('2. Apply the migration: cd apps/api && wrangler d1 migrations apply learnings --remote');
  console.log('3. Verify the import was successful');
}

// Generate SQL migration
function generateMigration(terms) {
  let sql = `-- Import additional corporate buzzwords
-- Generated on ${new Date().toISOString()}
-- Total terms: ${terms.length}

-- Disable foreign key constraints temporarily
PRAGMA foreign_keys=OFF;

`;

  // Get the next sequence number (assuming we have 500 existing terms)
  const startSeq = 501;
  
  terms.forEach((term, index) => {
    const id = `term_${generateSlug(term.term)}`;
    const slug = generateSlug(term.term);
    const tags = generateTags(term.term, term.definition);
    const example = generateExample(term.term);
    const seq = startSeq + index;
    const now = Date.now();
    
    sql += `INSERT INTO terms_v2 (
  id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
) VALUES (
  '${id}',
  '${slug}',
  '${term.term.replace(/'/g, "''")}',
  '${term.definition.replace(/'/g, "''")}',
  '${example.replace(/'/g, "''")}',
  '${JSON.stringify(tags)}',
  'published',
  0,
  ${seq},
  ${now},
  ${now}
);

`;
  });

  sql += `
-- Re-enable foreign key constraints
PRAGMA foreign_keys=ON;

-- Update the search index
INSERT INTO terms_fts(terms_fts) VALUES('rebuild');
`;

  return sql;
}

// Generate report
function generateReport(terms) {
  let report = `Additional Terms Import Report
Generated: ${new Date().toISOString()}
Total Terms: ${terms.length}

TERMS BY CATEGORY:
`;

  // Categorize terms
  const categories = {
    'Meeting & Communication': [],
    'Project Management': [],
    'Management & Leadership': [],
    'Business Strategy': [],
    'Team & Collaboration': [],
    'Time & Deadlines': [],
    'Other': []
  };

  terms.forEach(term => {
    const tags = generateTags(term.term, term.definition);
    if (tags.includes('meeting') || tags.includes('communication')) {
      categories['Meeting & Communication'].push(term.term);
    } else if (tags.includes('project')) {
      categories['Project Management'].push(term.term);
    } else if (tags.includes('management')) {
      categories['Management & Leadership'].push(term.term);
    } else if (tags.includes('strategy') || tags.includes('business')) {
      categories['Business Strategy'].push(term.term);
    } else if (tags.includes('team')) {
      categories['Team & Collaboration'].push(term.term);
    } else if (tags.includes('time')) {
      categories['Time & Deadlines'].push(term.term);
    } else {
      categories['Other'].push(term.term);
    }
  });

  Object.entries(categories).forEach(([category, termList]) => {
    if (termList.length > 0) {
      report += `\n${category} (${termList.length} terms):\n`;
      termList.forEach(term => {
        report += `  - ${term}\n`;
      });
    }
  });

  report += `\nSAMPLE TERMS:\n`;
  terms.slice(0, 10).forEach(term => {
    report += `\n${term.term}:\n`;
    report += `  Definition: ${term.definition}\n`;
    report += `  Example: ${generateExample(term.term)}\n`;
    report += `  Tags: ${generateTags(term.term, term.definition).join(', ')}\n`;
  });

  return report;
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { parseCSV, generateSlug, generateTags, generateExample };
