export const profile = {
  name: 'Tarun Gupta',
  title: 'Director of Product & Engineering',
  pronouns: 'He/Him',
  location: 'Mandi, Himachal Pradesh, India',
  available: true,
  availableLabel: 'Open to senior leadership roles',
  email: 'soul.tarun@gmail.com',
  resumeUrl:
    'https://docs.google.com/document/d/1UZgFi1NLCUT751FuGSapy8DfT7TAH7bshKP_HZrQyY4/view?usp=sharing',
  linkedin: 'https://www.linkedin.com/in/tarungupta003/',
  github: 'https://github.com/gtarun',
  twitter: 'https://twitter.com/tarungupta003',
  whatsapp: 'https://wa.me/919999999999',

  hero: {
    headline: 'Building, leading & scaling SaaS products that matter.',
    sub: 'I run product & engineering for high-growth SaaS, AI, and growth-marketing platforms. From 0→1 launches to platform scale, I help teams ship intuitive products customers love and businesses depend on.',
  },

  about: {
    paragraphs: [
      "13+ years across web, mobile, and platform engineering — shipping for marketers, educators, and businesses worldwide. From a 30,000-student university ERP to a global growth-marketing platform used by Adobe, Nike, Salesforce, Uber, and Amazon.",
      "I work at the messy intersection of product, engineering, and team — turning ambitious visions into products customers love and that businesses can scale. Currently leading engineering at Masters' Union and Outgrow, while shipping side products in AI and conversational software.",
      "When I'm not building, you'll find me trekking in the Himalayas \u{1F3D4}️, playing chess ♟️, or thinking about how to use AI as a foil — not a driver.",
    ],
  },

  projects: [
    {
      key: 'outgrow',
      name: 'Outgrow',
      tag: 'Growth marketing platform',
      copy: 'No-code interactive content — quizzes, calculators, recommendation tools — used by Adobe, Nike, Salesforce, Uber, Amazon. Led engineering for 10+ years, scaling from Tech Lead to Director.',
      meta: 'May 2016 — Present',
      url: 'https://outgrow.co',
      role: 'Director of Engineering',
    },
    {
      key: 'coachlms',
      name: 'Coach LMS',
      tag: 'Learning platform · Masters’ Union',
      copy: 'The digital backbone of the student journey at Masters’ Union — coursework, AI-personalized learning, CV building, and placement workflow for thousands of MBA candidates.',
      meta: 'Sep 2022 — Present',
      url: 'https://coachlms.org',
      role: 'Director of Engineering',
    },
    {
      key: 'chatbotbuilder',
      name: 'ChatBotBuilder',
      tag: 'Conversational AI · No-code',
      copy: 'Ship AI chatbots in under 30 minutes. Multi-model — Claude + OpenAI — for support, sales, and marketing teams from SMB to enterprise.',
      meta: 'Founder · Side project',
      url: 'https://chatbotbuilder.net',
      role: 'Founder & Engineer',
    },
    {
      key: 'omniengage',
      name: 'Omniengage',
      tag: 'Omnichannel marketing automation',
      copy: 'Cross-channel campaigns across email, SMS, push, web, WhatsApp, and Messenger — with AI-powered design and multivariate testing built in.',
      meta: 'Side product',
      url: 'https://omniengage.co',
      role: 'Engineering & Product',
    },
  ],

  testimonials: [
    {
      quote: 'Add a quote here — a peer, manager, or report describing how it is to work with you. Keep it 1–2 sentences. Specific outcomes hit harder than adjectives.',
      name: 'Name Surname',
      role: 'Title, Company',
    },
    {
      quote: 'Add a second quote. The most credible ones come from people you reported to or who reported to you, not just collaborators.',
      name: 'Name Surname',
      role: 'Title, Company',
    },
    {
      quote: 'Third quote. Mix engineering peers with product/business stakeholders — it shows range.',
      name: 'Name Surname',
      role: 'Title, Company',
    },
    {
      quote: 'Fourth quote. Numbers in quotes (“shipped X in Y weeks”) work better than vibes.',
      name: 'Name Surname',
      role: 'Title, Company',
    },
    {
      quote: 'Fifth quote. End on the highest-status name if you have one.',
      name: 'Name Surname',
      role: 'Title, Company',
    },
  ],

  experience: [
    {
      company: "Masters' Union",
      role: 'Director of Engineering',
      period: 'Sep 2022 — Present',
      blurb:
        "Spearheaded Coach LMS development for India’s leading new-age business school. Integrated AI tools across personalized learning, CV building, and placement — owning the full digital journey from coursework to job offer.",
    },
    {
      company: 'Outgrow',
      role: 'Director of Engineering',
      period: 'Sep 2021 — Present · Promoted from Tech Lead (Jun 2017)',
      blurb:
        'Led site-wide engineering on a growth-marketing platform serving global brands. Frontend (Angular), backend (Node.js + MongoDB), Linux infra, and CRM integrations across the marketing stack.',
    },
    {
      company: 'VenturePact',
      role: 'Senior Software Engineer',
      period: 'Aug 2013 — Jun 2017',
      blurb:
        'Managed client engagements across PHP, .NET, and Node.js. Owned AWS, DNS, and hosting operations for the marketplace platform and client websites.',
    },
    {
      company: 'Lovely Professional University',
      role: 'Project Officer · Software Developer',
      period: 'Jun 2012 — Jun 2014',
      blurb:
        'Built the University Management System for 30,000+ students and 3,500+ staff. Awarded "Best IT Innovation in Higher Education" at the INDIA 3.0 IT Innovation Awards by NASSCOM and CNBC TV18.',
    },
    {
      company: 'smartData Enterprises',
      role: 'Software Associate',
      period: 'Jan 2012 — Jun 2012',
      blurb:
        'Client-facing development across PHP, CakePHP, Drupal, and WordPress. First role out of the MCA program.',
    },
  ],

  education: [
    {
      school: "Masters' Union",
      degree: 'Executive MBA · PGP Rise',
      period: 'Sep 2024 — Nov 2025',
    },
    {
      school: 'Lovely Professional University',
      degree: "Master’s in Computer Application · 8.9 CGPA",
      period: '2009 — 2012',
    },
    {
      school: 'CT Institute of Management & IT, Jalandhar',
      degree: "Bachelor’s in Computer Application · 81%",
      period: '2006 — 2009',
    },
  ],

  skills: [
    'Engineering Leadership',
    '0→1 Product Delivery',
    'AI / LLM Integration',
    'Platform Scale',
    'MERN / MEAN Stack',
    'Node.js',
    'React',
    'TypeScript',
    'AWS / Linux',
    'Growth Platforms',
    'Team Leadership',
    'System Architecture',
  ],
};

export type Profile = typeof profile;
