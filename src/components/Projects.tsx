import { motion } from 'framer-motion';

type ProjectTile = {
  key: string;
  name: string;
  tag: string;
  blurb: string;
  role: string;
  period: string;
  details: string[];
  url: string;
  bg: string;
  fg: string;
  accent: string;
  span: string; // tailwind col-span class
};

const projects: ProjectTile[] = [
  {
    key: 'outgrow',
    name: 'Outgrow',
    tag: 'Growth marketing platform',
    blurb:
      'No-code interactive content — quizzes, calculators, recommendation tools — that helps marketers capture qualified leads and boost conversions.',
    role: 'Director of Engineering',
    period: 'May 2016 — Present · 10+ yrs · Promoted from Tech Lead',
    details: [
      'Site-wide engineering across Angular FE + Node/MongoDB BE',
      'Linux infra & deployment pipelines',
      'Marketing-stack integrations across major CRMs',
      'Customers include Adobe · Nike · Salesforce · Uber · Amazon',
    ],
    url: 'https://outgrow.co',
    bg: '#0f172a',
    fg: '#fbfaf6',
    accent: '#ff6b35',
    span: 'lg:col-span-2',
  },
  {
    key: 'coachlms',
    name: 'Coach LMS',
    tag: "Masters' Union · Learning Platform",
    blurb:
      "The digital backbone of the student journey at Masters' Union — coursework, AI-personalized learning, CV building, and placement workflow for thousands of MBA candidates.",
    role: 'Director of Engineering',
    period: 'Sep 2022 — Present',
    details: [
      'Spearheaded LMS development from scratch',
      'AI tools for personalised learning + job search',
      'Owns the full digital path from coursework → offer letter',
    ],
    url: 'https://coachlms.org',
    bg: '#fef3e2',
    fg: '#0f0f10',
    accent: '#c2410c',
    span: 'lg:col-span-1',
  },
  {
    key: 'chatbotbuilder',
    name: 'ChatBotBuilder',
    tag: 'Conversational AI · No-code',
    blurb:
      'Ship AI chatbots in under 30 minutes. Multi-model — Claude + OpenAI — for support, sales, and marketing teams from SMB to enterprise.',
    role: 'Founder & Engineer',
    period: 'Side project',
    details: [
      'Multi-model: Claude + OpenAI',
      'No-code visual builder',
      'Tiered pricing from $25/mo to Enterprise',
    ],
    url: 'https://chatbotbuilder.net',
    bg: '#312e81',
    fg: '#fbfaf6',
    accent: '#a78bfa',
    span: 'lg:col-span-1',
  },
  {
    key: 'omniengage',
    name: 'Omniengage',
    tag: 'Omnichannel marketing automation',
    blurb:
      'Cross-channel campaigns across email, SMS, push, web, WhatsApp, and Messenger — with AI-powered design and multivariate testing built in.',
    role: 'Engineering & Product',
    period: 'Side product',
    details: [
      'Channels: Email · SMS · Push · WhatsApp · Web · Messenger',
      'AI-powered campaign design',
      'A/B + multivariate workflow testing',
    ],
    url: 'https://omniengage.co',
    bg: '#c2410c',
    fg: '#fbfaf6',
    accent: '#fde68a',
    span: 'lg:col-span-2',
  },
];

function Tile({ p, i }: { p: ProjectTile; i: number }) {
  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/5 p-7 sm:p-8 shadow-[0_2px_30px_-12px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-shadow ${p.span}`}
      style={{ background: p.bg, color: p.fg, minHeight: '320px' }}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div
            className="text-[10px] uppercase tracking-[0.18em] opacity-80"
            style={{ color: p.accent }}
          >
            {p.tag}
          </div>
          <div className="text-[10px] uppercase tracking-[0.16em] opacity-60 whitespace-nowrap">
            {p.period}
          </div>
        </div>
        <div className="font-display text-[42px] sm:text-[52px] leading-[1.0] tracking-tightish mt-3">
          {p.name}
        </div>
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed opacity-85">
          {p.blurb}
        </p>
      </div>

      <div className="mt-6">
        <ul className="space-y-1.5 text-[13px] opacity-80">
          {p.details.map((d) => (
            <li key={d} className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-[7px] inline-block h-[3px] w-[10px] flex-none rounded-full"
                style={{ background: p.accent }}
              />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-end justify-between gap-3">
          <div className="text-[12px] opacity-70">{p.role}</div>
          <div
            className="grid h-9 w-9 place-items-center rounded-full transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            style={{ background: p.accent, color: p.bg }}
          >
            <span aria-hidden className="text-sm">↗</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="container-prose py-20 sm:py-28">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">
            Selected work
          </p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tightish">
            Products I've built & led.
          </h2>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {projects.map((p, i) => (
          <Tile key={p.key} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
