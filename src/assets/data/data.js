export const nav = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "create blog",
    url: "/create",
    requiresAuth: true,
  },
  {
    id: 3,
    text: "login",
    url: "/login",
    showIfNotAuth: true,
  },
  {
    id: 4,
    text: "register",
    url: "/register",
    showIfNotAuth: true,
  }
]
export const category = [
  {
    id: 1,
    category: "Life",
    title: "Stay Calm And Surf",
    cover: "../images/category/ca1.png",
  },
  {
    id: 2,
    category: "Fashion",
    title: "Becoming a Dragonfly",
    cover: "../images/category/ca2.png",
  },
  {
    id: 3,
    category: "Travel",
    title: "There's always light at the end of the tunnel",
    cover: "../images/category/ca3.png",
  },
  {
    id: 4,
    category: "Sport",
    title: "Stay Calm And Surf",
    cover: "../images/category/ca4.png",
  },
  {
    id: 5,
    category: "Fun",
    title: "There's always light at the end of the tunnel",
    cover: "../images/category/ca5.png",
  },
  {
    id: 6,
    category: "Health",
    title: "Becoming a Dragonfly",
    cover: "../images/category/ca6.png",
  },
  {
    id: 7,
    category: "Business",
    title: "Stay Calm And Surf",
    cover: "../images/category/ca7.png",
  },
  {
    id: 8,
    category: "Technology",
    title: "There's always light at the end of the tunnel",
    cover: "../images/category/ca8.png",
  },
]
export const blog = [
  {
    id: 1,
    title: "The Art of Mindful Living in a Digital Age",
    desc: "In today's hyperconnected world, finding moments of peace can feel impossible. Mindfulness offers a pathway to reconnect with ourselves amidst constant notifications and digital noise. This practice isn't about escaping modern life but embracing it with greater awareness. Research from the University of Harvard shows that just 10 minutes of daily meditation can reduce stress levels by 30% and improve focus by 25%. More importantly, consistent mindfulness practice has been linked to structural changes in the brain associated with enhanced memory, empathy, and resilience. Many assume mindfulness requires sitting in silence for hours, but practical integration is much more accessible. By creating small pockets of mindfulness throughout your day—whether during your morning coffee, commute, or before sleep—you can transform your relationship with technology and reclaim your attention. Try the 5-5-5 method: five minutes in the morning, five minutes at midday, and five minutes before bed. The key is consistency rather than perfection. Start by noticing your breath, the sensations in your body, and the thoughts that arise without judgment. When distractions come (and they will), gently guide your attention back to your focus point. This simple redirection is the essence of mindfulness practice. Technology itself can be an ally in this journey. Apps like Headspace, Calm, and Insight Timer provide structured guidance for beginners. Device settings that limit notifications during certain hours can create space for greater presence. Even simple reminders on your phone to take three conscious breaths can interrupt autopilot patterns. Over time, this simple practice can lead to profound changes in how you experience everyday life. Practitioners report better relationships, improved decision-making, and a greater sense of joy in ordinary moments. The ultimate goal isn't to achieve some enlightened state but to be more fully present for the life you're already living.",
    category: "Wellness",
    cover: "../images/blogs/b5.jpg",
    date: "March 25, 2025",
  },
  {
    id: 2,
    title: "Sustainable Travel: Exploring the World Responsibly",
    desc: "Travel broadens the mind, but it can also widen our environmental footprint. Sustainable tourism isn't about giving up exploration—it's about traveling more thoughtfully. From carbon-neutral accommodation options to supporting local economies, conscious travelers are redefining what it means to see the world. The statistics are sobering: tourism accounts for about 8% of global greenhouse gas emissions. A single transatlantic flight can generate as much carbon as some people produce in an entire year. Yet travel remains one of our most profound sources of education, connection, and personal growth. Leading destinations are responding to this tension with innovative approaches. Consider Costa Rica, where eco-tourism drives conservation efforts. The country generates 99% of its electricity from renewable sources and has reversed deforestation while building a thriving tourism economy. Slovenia, Europe's green gem, has developed a certification system for sustainable accommodations and experiences, making it easier for visitors to make responsible choices. On an individual level, simple choices make a significant difference: carrying a reusable water bottle eliminates dozens of plastic bottles per trip; choosing public transportation not only reduces emissions but often provides a more authentic local experience; eating at locally-owned restaurants ensures your spending benefits community members. Accommodation choices matter tremendously. Properties like Fogo Island Inn in Canada and Campi ya Kanzi in Kenya demonstrate how tourism can generate economic opportunities while preserving cultural heritage and natural environments. Many hotels now offer carbon offset programs, and platforms like Bookdifferent.com help travelers find certified sustainable options. Slower travel—visiting fewer places for longer periods—reduces the carbon intensity of transportation while allowing deeper engagement with destinations. The most memorable travel experiences often come from deeper engagement with places and people rather than ticking items off a bucket list.",
    category: "Travel",
    cover: "../images/blogs/b3.jpg",
    date: "March 15, 2025",
  },
  {
    id: 3,
    title: "Artificial Intelligence: Promise and Peril in the Machine Learning Era",
    desc: "The rapid evolution of artificial intelligence is reshaping society in ways both exciting and concerning. From healthcare diagnostics that outperform human doctors to autonomous vehicles promising safer roads, AI's potential benefits are extraordinary. Yet significant challenges accompany these advances. In medicine, AI systems can now detect certain cancers from imaging with greater accuracy than experienced radiologists. Companies like DeepMind have demonstrated AI's ability to predict protein folding, potentially revolutionizing drug discovery. Meanwhile, language models like GPT-4 are producing writing virtually indistinguishable from human work, opening new frontiers in education, content creation, and programming assistance. However, bias in algorithms can perpetuate societal inequalities when systems are trained on flawed data. Amazon scrapped an AI recruiting tool that penalized resumes containing the word 'women's' because it was trained on predominantly male resumes. Facial recognition systems have shown alarming disparities in accuracy across different demographic groups, raising serious concerns about their use in law enforcement and security applications. Privacy concerns mount as AI systems require vast amounts of personal information to function effectively. The data powering recommendation engines and predictive models often contains intimate details of our preferences, behaviors, and even health status. As these systems become more integrated into essential services, questions about data ownership, consent, and security grow increasingly urgent. The labor market faces disruption as automation reaches into previously secure professions. The OECD estimates that 14% of jobs across developed economies are highly automatable, with another 32% facing significant changes. This doesn't necessarily mean massive unemployment—historically, technological revolutions have created more jobs than they've eliminated.",
    category: "Technology",
    cover: "../images/blogs/b4.jpg",
    date: "March 10, 2025",
  },
  {
    id: 4,
    title: "Modern Minimalism: Finding Freedom Through Fewer Possessions",
    desc: "Minimalism has evolved beyond stark white rooms and empty spaces. Today's minimalist movement focuses less on aesthetic perfection and more on intentional living. By questioning what truly adds value to our lives, we can create homes and lifestyles that support our wellbeing rather than drain our resources. The average American home contains approximately 300,000 items, from paper clips to furniture. Most households utilize just 40% of their living space, with the remainder dedicated to storing possessions rarely or never used. Despite larger homes—the average American house has nearly tripled in size since the 1950s—storage units represent one of the fastest-growing real estate sectors, highlighting our collective struggle with accumulation. The benefits of minimalism extend beyond tidier spaces. Financial freedom often follows as consumption patterns shift from quantity to quality. Environmental impact decreases dramatically when we buy less and choose durable goods. Perhaps most significantly, mental clarity improves as our spaces become more intentional. Research from Princeton University's Neuroscience Institute indicates that excess physical possessions compete for our attention, effectively creating visual noise that increases stress hormones. Conversely, simplified environments promote focus and calm. Dr. Craig Hassed of Monash University notes that cluttered environments substantially increase cortisol levels, particularly among women. Digital minimalism—applying the same principles to our online lives—can be equally transformative. The average smartphone user touches their device 2,617 times daily and spends over four hours on mobile apps. By curating our digital tools and consumption with the same intentionality we apply to physical possessions, we can reclaim attention for activities that truly matter to us.",
    category: "Lifestyle",
    cover: "../images/blogs/b1.jpg",
    date: "February 28, 2025",
  },
  {
    id: 5,
    title: "The Science of Peak Performance: How Elite Athletes Train Their Minds",
    desc: "The difference between good and great often exists in the six inches between our ears. While physical training remains essential, elite athletes increasingly focus on mental conditioning to gain competitive edges. The field of sports psychology has moved from fringe to mainstream as evidence mounts for the critical role of mental skills in performance outcomes. Visualization techniques used by Olympic competitors activate the same neural pathways as physical practice, effectively allowing athletes to train even while at rest. When basketball players mentally rehearse free throws, brain scans show activation patterns nearly identical to those observed during actual shooting. This neural similarity explains why visualization can improve performance measurably—studies with dart throwers show accuracy improvements of up to 23% through mental practice alone. Mindfulness practices help competitors maintain focus amid distractions and pressure. UFC champion Jon Jones attributes his success partly to meditation practice that allows him to remain calm while thousands scream for his opponent. Research from the University of California found that eight weeks of mindfulness training improved elite shooters' performance under pressure by reducing activation in brain regions associated with distraction. Flow states—those periods of effortless performance where time seems to slow—can be deliberately cultivated through specific approaches to practice and competition. Hungarian psychologist Mihaly Csikszentmihalyi identified key conditions for flow: clear goals, immediate feedback, and a perfect match between challenge and skill level. Athletes like Serena Williams and Stephen Curry describe designing their practice routines specifically to induce flow states.",
    category: "Sports",
    cover: "../images/blogs/b10.jpg",
    date: "February 15, 2025",
  },
  {
    id: 6,
    title: "From Farm to Table: Rediscovering the Joy of Seasonal Eating",
    desc: "Our disconnection from food sources has had profound consequences for both health and environmental sustainability. The average grocery store item travels over 1,500 miles before reaching your plate, while produce varieties are selected for shipping durability rather than nutrition or flavor. The industrialization of our food system, while creating unprecedented abundance, has gradually eroded our relationship with one of life's most fundamental pleasures. Seasonal eating—consuming foods during their natural harvest time—offers a compelling alternative with benefits spanning personal health, environmental sustainability, and culinary enjoyment. When you eat seasonally and locally, you experience fruits and vegetables at their peak nutritional value and taste. Tomatoes harvested in season contain up to four times more vitamin C than their off-season counterparts. Broccoli harvested and eaten fresh contains significantly more glucosinolates—compounds linked to cancer prevention—than broccoli shipped long distances. Beyond nutritional advantages, seasonal eating reconnects us with natural cycles. Throughout human history, our bodies evolved in harmony with seasonal food availability. Some researchers suggest this synchronicity influences our microbiome and metabolic health. Dr. Zach Bush, physician and researcher specializing in the relationship between gut health and chronic disease, argues that seasonal eating provides precisely the microbial diversity our digestive systems require for optimal function. The environmental impact is equally significant: reduced transportation emissions represent just the beginning. Local, seasonal agriculture typically requires fewer chemical interventions as plants grow in their natural climate conditions.",
    category: "Food",
    cover: "../images/blogs/b2.jpg",
    date: "January 30, 2025",
  },
  {
    id: 7,
    title: "How Fiction Shapes Reality: The Unexpected Power of Literature",
    desc: "Stories may be imaginary, but their impact on our minds is very real. Recent neuroscience research reveals that literary fiction activates the same brain regions involved in actual social interactions. This 'neural overlap' helps explain literature's remarkable ability to increase empathy—regular fiction readers consistently score higher on tests of emotional intelligence and perspective-taking. Functional MRI studies conducted at Emory University show that when we read vivid descriptions of actions or sensations, the motor and sensory cortices in our brains light up as if we were experiencing those events ourselves. When characters in novels run through forests, our motor cortex activates. When they smell freshly baked bread, our olfactory processing centers engage. This physiological response helps explain the immersive feeling good fiction creates—we're not just reading about experiences; on a neural level, we're partially living them. Psychologists David Comer Kidd and Emanuele Castano demonstrated that reading literary fiction temporarily enhances our ability to understand others' mental states—a crucial capacity for navigating complex social relationships. Their research, published in Science, showed that literary fiction, with its complex characters and ambiguous situations, seems particularly effective at cultivating this capacity compared to nonfiction or popular fiction. Beyond individual benefits, narratives shape cultural values and historical understanding. From Uncle Tom's Cabin influencing abolitionist movements to dystopian novels warning against authoritarian tendencies, fiction has repeatedly catalyzed social change. George Orwell's '1984' gave us language to discuss surveillance and governmental overreach.",
    category: "Literature",
    cover: "../images/blogs/b7.jpg",
    date: "January 18, 2025",
  },
  {
    id: 8,
    title: "The New Urban Migration: Why Millennials Are Choosing Small Cities",
    desc: "A significant demographic shift is underway as young professionals increasingly bypass traditional metropolitan hubs for smaller cities and towns. This trend, accelerated by remote work possibilities and housing affordability challenges, is reshaping communities across the country and potentially redefining the American dream of homeownership and career success. Cities like Asheville, Burlington, and Boise offer compelling alternatives to coastal megacities: lower living costs, reduced commutes, proximity to nature, and tight-knit communities while still providing cultural amenities and professional opportunities. Demographic data confirms the shift—since 2015, New York, Los Angeles, and Chicago have experienced population declines, while mid-sized cities like Boise, Idaho (up 14.6%), Bend, Oregon (13.3%), and Greenville, South Carolina (11.4%) have seen double-digit growth percentages. The pandemic proved catalytic for a trend already underway, demonstrating that many jobs can be performed from anywhere with good internet, freeing workers from geographic constraints. A survey by Upwork estimates that by 2025, 36.2 million Americans will be working remotely—a 87% increase from pre-pandemic numbers. This location flexibility has allowed knowledge workers to prioritize quality of life factors previously sacrificed for career advancement. Housing plays a central role in this migration—when the median home price in San Francisco exceeds $1.5 million, relocating to where $300,000 buys a comfortable home becomes increasingly attractive.",
    category: "Society",
    cover: "../images/blogs/b9.jpg",
    date: "December 5, 2024",
  },
  {
    id: 9,
    title: "Rethinking Education: How Innovative Schools Are Preparing Students for an Uncertain Future",
    desc: "Traditional education systems designed for the industrial age struggle to prepare students for rapidly evolving futures. With automation replacing routine tasks and careers requiring continuous reinvention, the fundamental question facing educators has shifted from 'What should students know?' to 'What should students be able to do with what they know?' Innovative schools are pioneering approaches centered on skills rather than content memorization. At High Tech High in San Diego, students spend much of their time on interdisciplinary projects addressing real community challenges. A single project might incorporate scientific research, mathematical modeling, historical context, and communication skills—all applied toward meaningful outcomes beyond classroom walls. Assessment focuses on demonstrations of understanding through exhibitions, portfolios, and authentic products rather than standardized tests alone. Project-based learning replaces passive instruction, allowing students to tackle real-world problems while developing critical thinking. At Iowa BIG, a school partnership between several districts and local businesses, students earn core credits by working on community-identified projects. Rather than hypothetical case studies, students collaborate with actual clients, developing solutions for business challenges, environmental issues, or social needs. The approach builds both academic understanding and the 'soft skills' employers consistently identify as lacking in graduates. Competency-based progression means students advance when they've mastered concepts, not when the calendar dictates.",
    category: "Education",
    cover: "../images/blogs/b6.jpg",
    date: "November 22, 2024",
  },
  {
    id: 10,
    title: "The Renaissance of Handmade: Craftsmanship in a Digital World",
    desc: "As screens dominate our professional and personal lives, a countermovement has emerged: the revival of traditional crafts and handmaking. This isn't merely nostalgia but a response to deeper psychological and cultural needs. Working with physical materials—whether through woodworking, ceramics, textile arts, or culinary creation—engages our senses in ways digital work cannot. The statistics tell a compelling story: Etsy, the handmade marketplace, reported over $13.5 billion in sales in 2021, up from just $5 billion in 2019. Enrollment in craft classes has surged, with organizations like the Penland School of Craft reporting waitlists for the first time in decades. Pinterest searches for 'pottery ideas' increased 444% in a single year. What's driving this return to making? The tangible results provide satisfaction distinct from virtual accomplishments. Psychologist Mihaly Csikszentmihalyi's research on flow states—those experiences of complete absorption in a challenging activity—suggests that crafting activities are particularly effective at inducing this optimal psychological state. When shaping clay on a potter's wheel or joining wood with precise joinery, we enter a focused state that technology use rarely produces. Neuroscience supports this intuition: crafting activities stimulate multiple brain regions, reduce stress hormones, and often induce those flow states associated with wellbeing.",
    category: "Arts",
    cover: "../images/blogs/b8.jpg",
    date: "November 7, 2024",
  },
]

// Comments data structure - stores comments for each blog post
export const comments = [
  {
    id: 1,
    blogId: 1,
    username: "MindfulTech",
    text: "This article really resonated with me. I've been practicing mindfulness for 6 months and it's transformed my relationship with technology.",
    date: "April 20, 2023",
  },
  {
    id: 2,
    blogId: 1,
    username: "ZenSeeker",
    text: "I appreciate the practical tips here. The 5-5-5 method is simple but effective. I'm going to try implementing it starting tomorrow.",
    date: "April 22, 2023",
  },
  {
    id: 3,
    blogId: 2,
    username: "EcoTraveler",
    text: "Great article! I've been trying to travel more sustainably. One tip I'd add is to use train travel when possible instead of flying for shorter distances.",
    date: "March 25, 2023",
  },
  {
    id: 4,
    blogId: 3,
    username: "TechEthicist",
    text: "The balance of optimism and caution here is refreshing. Too often AI discussions swing to extremes. We need thoughtful governance as suggested.",
    date: "March 15, 2023",
  },
  {
    id: 5,
    blogId: 4,
    username: "MinimalLiving",
    text: "I started my minimalist journey last year and can confirm the mental clarity benefits. It's not just about owning less, but about being intentional.",
    date: "March 2, 2023",
  },
  {
    id: 6,
    blogId: 5,
    username: "SportsPsych",
    text: "As a sports psychologist, I use these techniques with my clients daily. Visualization is particularly powerful when done consistently.",
    date: "February 18, 2023",
  },
  {
    id: 7,
    blogId: 6,
    username: "LocalChef",
    text: "I've been running a farm-to-table restaurant for 5 years, and the difference in flavor between seasonal and out-of-season produce is remarkable.",
    date: "February 3, 2023",
  },
  {
    id: 8,
    blogId: 7,
    username: "BookWorm",
    text: "I've never considered the neuroscience behind fiction reading. Explains why I feel so connected to characters in well-written novels!",
    date: "January 20, 2023",
  },
  {
    id: 9, 
    blogId: 7,
    username: "LiteraryProfessor",
    text: "Fascinating article. I teach literature at university level and will be sharing these insights with my students to explain why fiction matters.",
    date: "January 21, 2023",
  },
  {
    id: 10,
    blogId: 8,
    username: "UrbanPlanner",
    text: "As someone working in urban planning, I've witnessed this trend firsthand. The challenge now is helping these smaller cities develop infrastructure to support growth.",
    date: "December 8, 2022",
  },
  {
    id: 11,
    blogId: 9,
    username: "FutureEducator",
    text: "This resonates with my experience in education. The traditional model is increasingly out of sync with what students need to thrive in the modern world.",
    date: "November 25, 2022",
  },
  {
    id: 12,
    blogId: 9,
    username: "TechInnovator",
    text: "I've worked with schools implementing project-based learning. The difference in student engagement and real-world problem-solving is night and day.",
    date: "November 26, 2022",
  },
  {
    id: 13,
    blogId: 10,
    username: "WoodWorker",
    text: "I rediscovered woodworking during the pandemic and haven't looked back. The satisfaction of creating something tangible can't be matched by digital work.",
    date: "November 10, 2022",
  },
  {
    id: 14,
    blogId: 10,
    username: "DigitalArtist",
    text: "Even as someone who works primarily in digital media, I've found myself craving tactile creation. There's something deeply human about working with physical materials.",
    date: "November 12, 2022",
  },
]
