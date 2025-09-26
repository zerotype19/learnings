const fs = require('fs');

// Comprehensive definitions for all the generic terms
const termDefinitions = {
  "ABM (account-based marketing)": {
    definition: "A marketing strategy that treats individual accounts as markets of one, focusing on high-value prospects with personalized campaigns.",
    example: "Our ABM strategy targets Fortune 500 companies with custom content, which means we send 47 personalized emails to the same person."
  },
  "API-first": {
    definition: "A development approach that prioritizes building APIs before user interfaces, making everything programmable and integrable.",
    example: "We're API-first, which means our product is so developer-friendly that even our marketing team needs a computer science degree to use it."
  },
  "Alignment tax": {
    definition: "The cost of ensuring everyone agrees on a decision, often measured in meeting hours and compromised solutions.",
    example: "The alignment tax on this project was 47 hours of meetings to decide whether to use blue or navy blue buttons."
  },
  "Always-on": {
    definition: "A marketing or operational approach that runs continuously without breaks, like a 24/7 digital presence.",
    example: "Our always-on marketing strategy means we're constantly bothering customers, even at 3 AM on Sundays."
  },
  "Always-on audiences": {
    definition: "Customer segments that are continuously targeted with marketing messages, never getting a moment's peace.",
    example: "Our always-on audiences receive 47 emails per day, ensuring they never forget we exist, even in their dreams."
  },
  "Ambidextrous leadership": {
    definition: "Leadership style that can handle both exploration (new ideas) and exploitation (existing processes) simultaneously.",
    example: "Our ambidextrous leader can innovate and execute at the same time, which is why we have 47 half-finished projects."
  },
  "Attention arbitrage": {
    definition: "The practice of buying cheap attention and selling it at a premium, like a stock trader for human focus.",
    example: "Our attention arbitrage strategy involves buying TikTok ads and hoping people remember our brand when they're not scrolling."
  },
  "Attention currency": {
    definition: "The idea that human attention is a valuable commodity that can be traded, measured, and monetized.",
    example: "In the attention economy, your 15-second TikTok view is worth more than your 2-hour Netflix binge, apparently."
  },
  "Attention economy": {
    definition: "An economic system where human attention is the primary scarce resource being competed for by businesses.",
    example: "In the attention economy, we're all just trying to be the shiniest object in a room full of shiny objects."
  },
  "Attribution modeling": {
    definition: "The process of determining which marketing touchpoints contributed to a conversion, like detective work for sales.",
    example: "Our attribution modeling shows that the customer saw our ad 47 times before buying, proving persistence pays off."
  },
  "Bias mitigation": {
    definition: "Efforts to reduce unfair bias in AI systems, ensuring algorithms don't discriminate against certain groups.",
    example: "Our bias mitigation strategy involves training AI on diverse data, then hoping it doesn't learn to be racist from the internet."
  },
  "Big bet": {
    definition: "A significant investment or strategic decision with high potential returns but also high risk of failure.",
    example: "Our big bet on blockchain was so big that when it failed, we had to explain to investors why we spent $2M on digital monkeys."
  },
  "Buy now pay later": {
    definition: "A payment method that allows customers to purchase items and pay for them in installments over time.",
    example: "Buy now pay later means you can get that $500 gadget today and figure out how to pay for it when you're broke next month."
  },
  "Carbon neutral": {
    definition: "Achieving net zero carbon emissions by balancing emissions with carbon removal or offsetting activities.",
    example: "We're carbon neutral because we planted 47 trees to offset the emissions from our 47-person team's daily Starbucks runs."
  },
  "Career cushioning": {
    definition: "The practice of maintaining backup job options while staying in your current role, like having a safety net.",
    example: "Career cushioning means keeping your LinkedIn profile updated and your resume ready, just in case your boss discovers you're not actually working."
  },
  "Category design": {
    definition: "The process of creating a new market category and positioning your company as the leader of that category.",
    example: "Our category design strategy involves inventing new buzzwords and hoping they catch on, like 'cloud-native AI-first blockchain-enabled synergy optimization.'"
  },
  "Churn mitigation": {
    definition: "Strategies to reduce customer cancellations and retain existing customers, like relationship counseling for businesses.",
    example: "Our churn mitigation includes sending 'We miss you' emails to customers who haven't used our product in 47 days."
  },
  "Circular economy": {
    definition: "An economic system that eliminates waste by reusing, recycling, and regenerating materials in a closed loop.",
    example: "In our circular economy, we recycle everything except our failed business strategies, which we just rebrand and try again."
  },
  "Citizen developer": {
    definition: "Non-technical employees who create applications using low-code or no-code platforms, like DIY software development.",
    example: "Our citizen developers built the company intranet using drag-and-drop tools, and now it looks like a 2005 MySpace page."
  },
  "Clickstream": {
    definition: "The path a user takes through a website, recorded as a sequence of clicks and page views.",
    example: "Our clickstream analysis shows users spend 47 seconds on our homepage before clicking 'back' and never returning."
  },
  "Cloud migration": {
    definition: "The process of moving applications, data, and infrastructure from on-premises to cloud-based systems.",
    example: "Our cloud migration was so successful that we now have 47 different cloud accounts and no idea where anything is stored."
  },
  "Cloud-native": {
    definition: "Applications designed specifically for cloud environments, taking advantage of cloud scalability and services.",
    example: "Our cloud-native app scales automatically, which is great until the bill arrives and we realize we've been charged for 47 million API calls."
  },
  "Composable architecture": {
    definition: "A software architecture approach where applications are built from reusable, modular components that can be combined flexibly.",
    example: "Our composable architecture means we can mix and match components, like building a house with LEGO blocks, if LEGO blocks cost $10,000 each."
  },
  "Connected TV": {
    definition: "Television sets that can connect to the internet and stream content, like smart TVs and streaming devices.",
    example: "Connected TV advertising means we can show ads to people who are already paying to avoid ads, which is peak capitalism."
  },
  "Consent management": {
    definition: "The process of obtaining, storing, and managing user consent for data collection and processing, like permission slips for privacy.",
    example: "Our consent management system asks users to agree to 47 pages of terms, then tracks their every click anyway."
  },
  "Consumption-based pricing": {
    definition: "A pricing model where customers pay based on how much they use a service, like a utility bill for software.",
    example: "Our consumption-based pricing means the more successful you are, the more you pay us, which is like a success tax."
  },
  "Containerization": {
    definition: "A method of packaging applications and their dependencies into lightweight, portable containers for consistent deployment.",
    example: "Containerization means our app runs the same everywhere, except when it doesn't, which is most of the time."
  },
  "Content velocity": {
    definition: "The speed at which content is created, published, and distributed, like a content assembly line.",
    example: "Our content velocity is so high that we're publishing 47 articles per day, most of which are about content velocity."
  },
  "Continuous discovery": {
    definition: "An ongoing process of learning about customers and their needs through regular research and experimentation.",
    example: "Our continuous discovery process involves asking customers what they want, then building something completely different."
  },
  "Creator economy": {
    definition: "An economic system where individuals create content and monetize their audience through various platforms and tools.",
    example: "The creator economy means anyone can become an influencer by posting 47 videos of themselves eating cereal."
  },
  "Culture add": {
    definition: "Hiring people who bring new perspectives and diversity to company culture, rather than just fitting in.",
    example: "We're looking for culture adds, which means we want people who are different, but not too different, and definitely not weird."
  },
  "Customer intimacy": {
    definition: "A business strategy focused on building deep, personal relationships with customers to understand their needs.",
    example: "Our customer intimacy strategy involves knowing our customers so well that we can predict their next purchase, which is probably therapy."
  },
  "Customer journey orchestration": {
    definition: "The coordination of all touchpoints and interactions across a customer's entire experience with a brand.",
    example: "Our customer journey orchestration ensures every interaction is perfectly timed, like a symphony, if the symphony was 47 different instruments playing different songs."
  },
  "Customer obsession": {
    definition: "A business philosophy that prioritizes customer needs and satisfaction above all else, like customer worship.",
    example: "Our customer obsession means we'll do anything to make customers happy, except actually listen to their feedback."
  },
  "Dark funnel": {
    definition: "Customer acquisition channels that are difficult to track and measure, like word-of-mouth and organic discovery.",
    example: "Our dark funnel includes customers who found us through their cousin's friend's Instagram story, which is impossible to track but somehow our most valuable segment."
  },
  "Dark social": {
    definition: "Social media sharing that happens through private channels like messaging apps, making it hard to track.",
    example: "Dark social is where people actually share content, unlike public social media where everyone just posts selfies and food photos."
  },
  "Data clean room": {
    definition: "A secure environment where companies can analyze data together without sharing raw data, like a privacy-safe data collaboration space.",
    example: "Our data clean room is so secure that even we don't know what data we're analyzing, which makes the insights very mysterious."
  },
  "Data democratization": {
    definition: "Making data accessible to all employees, not just data scientists, so everyone can make data-driven decisions.",
    example: "Data democratization means everyone can access the data, but no one knows how to interpret it, so we all just make the same bad decisions."
  },
  "Data fabric": {
    definition: "A unified data management architecture that provides consistent data access across different systems and locations.",
    example: "Our data fabric connects everything, which is great until one thread breaks and the whole thing unravels like a cheap sweater."
  },
  "Data mesh": {
    definition: "A decentralized data architecture where data is owned and managed by domain teams rather than a central data team.",
    example: "Our data mesh means every team has their own data, which is like having 47 different versions of the truth, all equally confusing."
  },
  "Data portability": {
    definition: "The ability to move data from one system to another, giving users control over their information.",
    example: "Data portability means you can take your data with you, but only if you can figure out how to export it from our 47-step process."
  },
  "Demand capture": {
    definition: "Marketing strategies that target customers who are already looking for solutions, like fishing where the fish are.",
    example: "Our demand capture strategy involves showing up when people search for our product, which is like being the only restaurant in a food court."
  },
  "Demand creation": {
    definition: "Marketing strategies that generate new demand for products or services that customers didn't know they needed.",
    example: "Our demand creation strategy involves convincing people they need a product they've never heard of, which is like selling ice to Eskimos, but with more PowerPoint slides."
  },
  "Demand gen": {
    definition: "Short for demand generation, the process of creating interest and demand for products or services.",
    example: "Our demand gen team creates so much demand that we can't keep up with it, which is a good problem to have, apparently."
  },
  "Digital exhaust": {
    definition: "Data generated as a byproduct of digital activities, like the digital footprint we leave behind.",
    example: "Our digital exhaust includes every click, scroll, and pause, creating a detailed map of how people avoid our content."
  },
  "Digital twin": {
    definition: "A digital replica of a physical object, process, or system that can be used for simulation and analysis.",
    example: "Our digital twin is so accurate that it even simulates our real-world tendency to miss deadlines and overpromise on features."
  },
  "Digital wallet": {
    definition: "A digital version of a physical wallet that stores payment information and enables mobile payments.",
    example: "Our digital wallet is so secure that even we can't access it, which is great for security but terrible for customer service."
  },
  "Dynamic pricing": {
    definition: "A pricing strategy that adjusts prices based on demand, time, or other factors, like surge pricing for everything.",
    example: "Our dynamic pricing means the same product costs different amounts depending on the weather, your mood, and whether Mercury is in retrograde."
  },
  "Earned-first": {
    definition: "A marketing approach that prioritizes earned media (organic mentions, reviews) over paid advertising.",
    example: "Our earned-first strategy relies on people talking about us organically, which works great when people actually like our product."
  },
  "Edge compute": {
    definition: "Computing that happens closer to where data is generated, reducing latency and improving performance.",
    example: "Our edge compute strategy puts processing power everywhere, which is great until we have to maintain 47 different servers in 47 different locations."
  },
  "Eligibility model": {
    definition: "A system that determines which customers qualify for specific offers, products, or services.",
    example: "Our eligibility model is so complex that even our AI doesn't understand it, which is why we have a 47-person team to explain it to customers."
  },
  "Embedded finance": {
    definition: "Financial services integrated into non-financial platforms, like banking within a shopping app.",
    example: "Our embedded finance means you can get a loan while buying groceries, which is convenient until you realize you're paying 47% interest on a bag of chips."
  },
  "Engagement rate": {
    definition: "A metric that measures how actively users interact with content, like a popularity contest for posts.",
    example: "Our engagement rate is so low that we're considering paying people to like our posts, which is basically what influencers do anyway."
  },
  "Expansion motion": {
    definition: "Strategies to grow revenue from existing customers by selling additional products or services.",
    example: "Our expansion motion involves convincing customers to buy more stuff they don't need, which is like being a really good salesperson at a car dealership."
  },
  "Explainability": {
    definition: "The ability to understand and explain how AI systems make decisions, like transparency for algorithms.",
    example: "Our AI's explainability is so good that it can tell you exactly why it made a decision, in 47 pages of technical jargon that no one can understand."
  },
  "Fail fast": {
    definition: "A philosophy of quickly testing ideas and learning from failures, like rapid experimentation with built-in failure.",
    example: "Our fail fast approach means we try 47 different strategies per week, fail at 46 of them, and call it innovation."
  },
  "Financial inclusion": {
    definition: "Efforts to provide financial services to underserved populations who lack access to traditional banking.",
    example: "Our financial inclusion initiative brings banking to everyone, including people who don't want it, which is very inclusive of us."
  },
  "Fractional executive": {
    definition: "A part-time executive who works for multiple companies, like a consultant but with a fancier title.",
    example: "Our fractional executive works 47 hours per week across 47 different companies, which is like being a full-time executive but with 47 different business cards."
  },
  "Frictionless checkout": {
    definition: "A streamlined payment process that minimizes steps and barriers to completing a purchase.",
    example: "Our frictionless checkout is so smooth that customers don't even realize they've spent $500 until they check their bank account."
  },
  "GTM motion": {
    definition: "Short for go-to-market motion, the strategy for launching and selling a product or service.",
    example: "Our GTM motion involves launching products so fast that we often forget to tell customers what they actually do."
  },
  "Growth audiences": {
    definition: "Customer segments identified for growth marketing efforts, like target groups for expansion campaigns.",
    example: "Our growth audiences include people who have never heard of us, people who have heard of us but don't care, and people who actively avoid us."
  },
  "Headless commerce": {
    definition: "An e-commerce architecture that separates the frontend presentation from the backend commerce functionality.",
    example: "Our headless commerce platform is so decoupled that the frontend and backend don't even know they're supposed to work together."
  },
  "Hyperpersonalization": {
    definition: "The practice of tailoring experiences to individual users at an extremely granular level, like personalization on steroids.",
    example: "Our hyperpersonalization is so advanced that we know you prefer your coffee with exactly 2.3 sugars and a side of existential dread."
  },
  "Identity graph": {
    definition: "A database that connects different identifiers to create a unified view of a customer across devices and channels.",
    example: "Our identity graph is so comprehensive that we know you're the same person whether you're on your phone, laptop, or your neighbor's WiFi."
  },
  "Identity resolution": {
    definition: "The process of matching different identifiers to determine they belong to the same person or entity.",
    example: "Our identity resolution is so accurate that we can identify you even when you're using a fake name and your cousin's credit card."
  },
  "Immersive commerce": {
    definition: "Shopping experiences that use virtual or augmented reality to create engaging, interactive buying experiences.",
    example: "Our immersive commerce lets you try on clothes in virtual reality, which is great until you realize the virtual clothes don't fit your real body."
  },
  "Inclusive design": {
    definition: "Design approach that considers the needs of people with diverse abilities and backgrounds from the start.",
    example: "Our inclusive design means everyone can use our product, including people who don't want to use it, which is very inclusive of us."
  },
  "Incrementality": {
    definition: "The additional value generated by a marketing campaign beyond what would have happened naturally.",
    example: "Our incrementality analysis shows that our $2M campaign generated $47 in additional sales, which is a great return on investment if you're bad at math."
  },
  "Infinite loop": {
    definition: "A programming concept where code runs continuously without end, often unintentionally causing system crashes.",
    example: "Our infinite loop is so efficient that it processes the same data forever, which is great for job security but terrible for performance."
  },
  "Infinite scroll": {
    definition: "A web design pattern where content loads continuously as users scroll, like a bottomless pit of information.",
    example: "Our infinite scroll is so engaging that users spend 47 hours scrolling through content they don't even want to see."
  },
  "Influencer flywheel": {
    definition: "A self-reinforcing cycle where influencer content drives engagement, which attracts more influencers, creating a virtuous cycle.",
    example: "Our influencer flywheel is so powerful that one TikTok video can generate 47 million views and exactly 3 sales."
  },
  "Insight to action": {
    definition: "The process of converting data insights into concrete business actions and decisions.",
    example: "Our insight to action process is so efficient that we can turn any data into a PowerPoint presentation in under 47 minutes."
  },
  "Journey mapping": {
    definition: "A visualization of the customer experience across all touchpoints, like a roadmap of user interactions.",
    example: "Our journey mapping shows that customers go through 47 steps to buy a $5 product, which explains why they just go to Amazon instead."
  },
  "Land and expand": {
    definition: "A sales strategy that starts with a small deal and grows into larger opportunities within the same account.",
    example: "Our land and expand strategy is so successful that we start by selling a $47 product and end up with a $47,000 contract."
  },
  "Lift and shift": {
    definition: "Moving applications to the cloud without modification, like taking your old furniture to a new house.",
    example: "Our lift and shift migration was so successful that we moved everything to the cloud, including our 2005 PowerPoint presentations."
  },
  "Low-code": {
    definition: "A development approach that uses visual interfaces and minimal coding to build applications quickly.",
    example: "Our low-code platform is so easy to use that even our marketing team can build apps, which explains why our app store looks like a digital art project from a kindergarten class."
  },
  "Media mix modeling": {
    definition: "Statistical analysis that determines the optimal allocation of marketing spend across different channels.",
    example: "Our media mix modeling shows that we should spend 47% of our budget on channels that don't work, which is very scientific."
  },
  "Metaverse": {
    definition: "A virtual world where people can interact, work, and play in digital environments, like Second Life but with more corporate buzzwords.",
    example: "Our metaverse strategy involves building a virtual office where employees can have meetings in a digital conference room that looks exactly like our real conference room, but with worse coffee."
  },
  "Microservices": {
    definition: "An architecture where applications are built as a collection of small, independent services that communicate over APIs.",
    example: "Our microservices architecture is so distributed that we have 47 different services, each responsible for a single function, like a Swiss watch made by 47 different people who've never met."
  },
  "Model collapse": {
    definition: "A phenomenon where AI models trained on AI-generated data become less diverse and more repetitive over time.",
    example: "Our AI model collapsed so completely that it now only generates content about AI model collapse, which is very meta but not very useful."
  },
  "Monetize attention": {
    definition: "The practice of converting user attention into revenue through advertising, subscriptions, or other means.",
    example: "Our attention monetization strategy is so effective that we can turn a 15-second scroll into a $47 purchase, which is like digital alchemy."
  },
  "Multi-touch attribution": {
    definition: "A method of assigning credit to multiple marketing touchpoints that influenced a customer's decision to purchase.",
    example: "Our multi-touch attribution shows that the customer saw our ad 47 times, clicked it once, and bought the product because their mom told them to."
  },
  "NFT drop": {
    definition: "The release of a collection of non-fungible tokens, often with hype and limited availability to create demand.",
    example: "Our NFT drop was so successful that we sold 47 digital images of corporate buzzwords for $47,000 each, proving that people will buy anything if you call it art."
  },
  "Net zero": {
    definition: "Achieving a balance between greenhouse gas emissions produced and removed from the atmosphere.",
    example: "We're net zero because we offset our emissions by planting trees, which is great until we realize we need to plant 47 million trees to offset our 47-person team's daily commute."
  },
  "Next best action": {
    definition: "The optimal next step to take with a customer based on their behavior, preferences, and current context.",
    example: "Our next best action algorithm is so accurate that it knows you want to buy a product before you even know you want to buy it, which is either very helpful or very creepy."
  },
  "Next-gen CRM": {
    definition: "A next-generation customer relationship management system with advanced features like AI and automation.",
    example: "Our next-gen CRM is so advanced that it can predict customer behavior, which is great until it predicts that all our customers are about to leave us."
  },
  "No-code": {
    definition: "A development approach that allows users to create applications without writing any code, using visual interfaces instead.",
    example: "Our no-code platform is so easy that even our CEO can build apps, which explains why our app store is full of productivity tools that don't actually increase productivity."
  },
  "North Star metric": {
    definition: "The single most important metric that guides all business decisions and measures overall success.",
    example: "Our North Star metric is customer satisfaction, which is why we measure it 47 times per day and still don't know if our customers are actually satisfied."
  },
  "Omnichannel": {
    definition: "A marketing approach that provides a seamless experience across all customer touchpoints and channels.",
    example: "Our omnichannel strategy is so seamless that customers can start a conversation on our website and finish it in our app, which is great until they realize they're talking to 47 different chatbots."
  },
  "On-demand everything": {
    definition: "A business model that provides products or services immediately when requested, like instant gratification as a service.",
    example: "Our on-demand everything service delivers anything you want in 47 minutes, including things you didn't know you wanted, which is very convenient but terrible for impulse control."
  },
  "Operationalize": {
    definition: "The process of putting a strategy or idea into practice through systematic implementation and execution.",
    example: "We operationalized our innovation strategy by creating 47 committees to discuss innovation, which is very operational but not very innovative."
  },
  "Owned attention": {
    definition: "Customer attention that you control directly through your own channels, rather than paying for it through advertising.",
    example: "Our owned attention strategy involves creating content so engaging that people voluntarily give us their time, which is like free advertising but with more effort."
  },
  "Platformization": {
    definition: "The process of transforming a product into a platform that other businesses can build upon and integrate with.",
    example: "Our platformization strategy involves building so many APIs that other companies can build entire businesses on top of our platform, which is great until they build a better version of our product."
  },
  "Predictable pipeline": {
    definition: "A sales pipeline with consistent, forecastable revenue generation through systematic processes and metrics.",
    example: "Our predictable pipeline is so reliable that we can forecast revenue 47 quarters in advance, which is great until the market changes and our predictions become completely wrong."
  },
  "Privacy sandbox": {
    definition: "A controlled environment for testing privacy-preserving technologies without affecting real user data.",
    example: "Our privacy sandbox is so secure that even we can't access the data, which is great for privacy but terrible for debugging when things go wrong."
  },
  "Privacy-first": {
    definition: "A design philosophy that prioritizes user privacy from the ground up, rather than adding it as an afterthought.",
    example: "Our privacy-first approach means we collect no data, which is great for privacy but terrible for personalization, so we just show everyone the same generic content."
  },
  "Product-market fit": {
    definition: "The degree to which a product satisfies a strong market demand, indicating the product is ready for scale.",
    example: "Our product-market fit is so perfect that customers are literally begging us to take their money, which is great until we realize we can't handle the demand."
  },
  "Prompt marketplace": {
    definition: "A platform where users can buy, sell, and share AI prompts for various tasks and applications.",
    example: "Our prompt marketplace is so successful that people are paying $47 for prompts that just say 'make this sound professional,' which is either genius or proof that people will buy anything."
  },
  "Quiet quitting": {
    definition: "The practice of doing the minimum required work without going above and beyond, like professional coasting.",
    example: "Quiet quitting means doing exactly what your job description says and nothing more, which is apparently revolutionary in a world where overworking is the norm."
  },
  "Radical candor": {
    definition: "A management approach that combines caring personally with challenging directly, like tough love for the workplace.",
    example: "Our radical candor approach means telling employees exactly what we think of their work, which is great for performance but terrible for office morale."
  },
  "Reputation capital": {
    definition: "The value derived from a company's reputation and brand recognition, like goodwill but more measurable.",
    example: "Our reputation capital is so valuable that people trust us even when we make mistakes, which is great until we make so many mistakes that our reputation capital becomes reputation debt."
  },
  "Resilient leadership": {
    definition: "Leadership that can adapt and thrive in uncertain, changing environments, like being a good captain in a storm.",
    example: "Our resilient leadership is so adaptable that we can pivot from any strategy to any other strategy in 47 minutes, which is great for agility but terrible for consistency."
  },
  "Resilient supply chain": {
    definition: "A supply chain designed to withstand disruptions and quickly recover from shocks, like having backup plans for your backup plans.",
    example: "Our resilient supply chain is so robust that we can handle any disruption, except the one disruption we didn't plan for, which is the one that always happens."
  },
  "Reskilling": {
    definition: "The process of learning new skills to adapt to changing job requirements, like professional evolution.",
    example: "Our reskilling program teaches employees new skills so they can do jobs that don't exist yet, which is very forward-thinking but also very confusing."
  },
  "Retention curve": {
    definition: "A graph showing how customer retention changes over time, like a popularity contest for products.",
    example: "Our retention curve is so steep that customers leave faster than we can acquire new ones, which is great for churn metrics but terrible for revenue."
  },
  "Retrieval augmented generation": {
    definition: "An AI technique that combines information retrieval with text generation to produce more accurate and contextual responses.",
    example: "Our retrieval augmented generation is so advanced that it can find the right information and generate the right response, which is great until it finds the wrong information and generates the wrong response."
  },
  "Return on experience": {
    definition: "A metric that measures the value generated from customer experience investments, like ROI but for feelings.",
    example: "Our return on experience is so high that customers are willing to pay more for our product just because it makes them feel good, which is like selling happiness but with more spreadsheets."
  },
  "RevOps": {
    definition: "Short for revenue operations, the alignment of sales, marketing, and customer success to optimize revenue generation.",
    example: "Our RevOps team is so aligned that sales, marketing, and customer success all agree on one thing: that the other teams are the problem."
  },
  "Revenue operations": {
    definition: "The strategic alignment of people, processes, and technology to optimize revenue generation across the customer lifecycle.",
    example: "Our revenue operations are so optimized that we can generate revenue from customers who don't even know they're our customers, which is very efficient but also very confusing."
  },
  "Sales enablement": {
    definition: "The process of providing sales teams with the tools, content, and training needed to sell more effectively.",
    example: "Our sales enablement is so comprehensive that our sales team has 47 different tools, which is great until they spend more time learning tools than actually selling."
  },
  "Signal loss": {
    definition: "The reduction in data quality and tracking accuracy due to privacy changes and cookie restrictions.",
    example: "Our signal loss is so significant that we can't track anything anymore, which is great for privacy but terrible for marketing, so we just guess what customers want."
  },
  "Single source of truth": {
    definition: "A centralized data repository that serves as the authoritative source for all business information.",
    example: "Our single source of truth is so reliable that everyone trusts it completely, which is great until it's wrong and everyone makes bad decisions based on bad data."
  },
  "Skills-based hiring": {
    definition: "A hiring approach that focuses on specific skills and abilities rather than traditional credentials or experience.",
    example: "Our skills-based hiring is so effective that we hire people based on what they can do, not where they went to school, which is great until we realize that skills can be faked but degrees are harder to forge."
  },
  "Smart brevity": {
    definition: "A communication style that conveys maximum information in minimum words, like efficiency for language.",
    example: "Smart brevity means saying more with less, which is great until you realize that brevity without smartness is just being terse, and smartness without brevity is just being verbose."
  },
  "Smart contracts": {
    definition: "Self-executing contracts with terms written directly into code, like legal agreements that enforce themselves.",
    example: "Our smart contracts are so smart that they can execute themselves, which is great until they execute themselves in ways we didn't intend, and then we can't stop them."
  },
  "Social capital": {
    definition: "The value derived from social networks and relationships, like networking but with more economic theory.",
    example: "Our social capital is so valuable that we can get anything done through our network, which is great until we realize that our network is just other people who also can't get anything done."
  },
  "Social commerce": {
    definition: "The practice of selling products directly through social media platforms, like shopping but with more likes.",
    example: "Our social commerce is so successful that people buy products just because their friends liked them, which is great for sales but terrible for rational decision-making."
  },
  "Storyselling": {
    definition: "The practice of using storytelling techniques in sales to create emotional connections and drive purchases.",
    example: "Our storyselling is so effective that customers buy products based on the story we tell, not the product itself, which is great for sales but terrible for product development."
  },
  "Subscription fatigue": {
    definition: "The exhaustion consumers feel from managing multiple subscription services, like death by a thousand monthly charges.",
    example: "Subscription fatigue is so real that people are canceling subscriptions to save money, then immediately signing up for new ones, which is like a digital version of a shopping addiction."
  },
  "Synthetic personas": {
    definition: "AI-generated fictional characters used for testing and development, like digital mannequins for user experience design.",
    example: "Our synthetic personas are so realistic that they have more personality than our real customers, which is great for testing but terrible for understanding actual human behavior."
  },
  "Talent marketplace": {
    definition: "A platform that connects skilled workers with project opportunities, like Uber but for professional services.",
    example: "Our talent marketplace is so successful that people can find work anywhere, which is great for flexibility but terrible for job security, so everyone is constantly looking for their next gig."
  },
  "Test-and-learn": {
    definition: "A methodology of rapid experimentation to validate ideas and learn from results, like scientific method for business.",
    example: "Our test-and-learn approach means we try 47 different strategies per week, learn that 46 of them don't work, and call it innovation."
  },
  "Tokenization": {
    definition: "The process of converting rights to an asset into a digital token, like digitizing ownership.",
    example: "Our tokenization strategy is so successful that we've turned everything into tokens, including our office furniture, which is great for liquidity but terrible for actually sitting down."
  },
  "Trust gap": {
    definition: "The difference between what companies say they do and what customers actually experience, like a credibility chasm.",
    example: "Our trust gap is so wide that customers don't believe anything we say, which is great for setting low expectations but terrible for building relationships."
  },
  "Upskilling": {
    definition: "The process of learning additional skills to advance in your current role, like professional development.",
    example: "Our upskilling program teaches employees so many new skills that they become overqualified for their jobs, which is great for their careers but terrible for our retention rates."
  },
  "Value creation": {
    definition: "The process of generating value for customers, stakeholders, and the business through products, services, or processes.",
    example: "Our value creation is so effective that we create value for everyone except ourselves, which is great for our customers but terrible for our profit margins."
  },
  "Value exchange": {
    definition: "A transaction where both parties receive something of value, like a fair trade but in business.",
    example: "Our value exchange is so balanced that customers get exactly what they pay for, which is great for fairness but terrible for upselling, so we just raise prices instead."
  },
  "Virtual showroom": {
    definition: "A digital space where customers can explore and interact with products in a virtual environment.",
    example: "Our virtual showroom is so immersive that customers can try on clothes in virtual reality, which is great until they realize that virtual clothes don't protect them from real weather."
  },
  "Virtual-first": {
    definition: "A business model or approach that prioritizes digital interactions over physical ones, like remote work but for everything.",
    example: "Our virtual-first approach means everything happens online, which is great for efficiency but terrible for human connection, so we just send more emojis to compensate."
  },
  "Wallet share": {
    definition: "The percentage of a customer's total spending in a category that goes to your company, like market share but for individual customers.",
    example: "Our wallet share is so high that customers spend 47% of their income on our products, which is great for revenue but terrible for their financial health."
  },
  "Web3": {
    definition: "A vision of the internet based on blockchain technology, emphasizing decentralization and user ownership, like the internet but with more buzzwords.",
    example: "Web3 is so revolutionary that it will change everything, except it's been 'about to change everything' for 47 years, and we're still not sure what it actually does."
  }
};

// Generate SQL to update all the generic definitions
let sql = '-- Update generic definitions with specific, witty definitions\n\n';

for (const [term, content] of Object.entries(termDefinitions)) {
  // Escape single quotes in strings
  const escapedTitle = term.replace(/'/g, "''");
  const escapedDefinition = content.definition.replace(/'/g, "''");
  const escapedExample = content.example.replace(/'/g, "''");
  
  sql += `UPDATE terms_v2 
SET 
  definition = '${escapedDefinition}',
  examples = '${escapedExample}',
  updated_at = '${new Date().toISOString()}'
WHERE title = '${escapedTitle}';

`;
}

// Write to file
fs.writeFileSync('update_specific_definitions.sql', sql);
console.log('SQL file generated: update_specific_definitions.sql');
console.log(`Generated ${Object.keys(termDefinitions).length} UPDATE statements with specific definitions`);
