import { motion } from 'framer-motion';
import { EASE_OUT } from '../lib/motion';

type HighlightTile = {
  key: string;
  kicker: string;
  title: string;
  body: string;
  meta?: string;
  href?: string;
  bg: string;
  fg: string;
  accent: string;
  span: string; // tailwind col-span class for lg
};

const tiles: HighlightTile[] = [
  {
    key: 'award',
    kicker: 'Award · Higher Education',
    title: 'Best IT Innovation',
    body:
      'INDIA 3.0 IT Innovation Awards — NASSCOM × CNBC TV18. For building the University Management System used by 30,000+ students and 3,500+ staff at Lovely Professional University.',
    meta: 'NASSCOM · CNBC TV18',
    bg: '#0f172a',
    fg: '#fbfaf6',
    accent: '#ff6b35',
    span: 'lg:col-span-3',
  },
  {
    key: 'mba',
    kicker: 'Education',
    title: 'Executive MBA',
    body:
      "PGP Rise at Masters' Union — the leading new-age business school in India. Built for senior leaders shipping at the intersection of product, technology, and growth.",
    meta: 'Sep 2024 — Nov 2025',
    bg: '#fbfaf6',
    fg: '#0f0f10',
    accent: '#0f172a',
    span: 'lg:col-span-3',
  },
  {
    key: 'principle',
    kicker: 'How I think about AI',
    title: 'Assistant. Foil. Driver.',
    body:
      'Three modes for AI in creative work. Most people only use mode 1 (Assistant). Mode 2 — AI as Foil that argues against your idea so you sharpen it — is the most underused, and the most valuable for leaders.',
    meta: 'Read the post →',
    href: 'https://www.linkedin.com/in/tarungupta003/recent-activity/',
    bg: '#fef3e2',
    fg: '#0f0f10',
    accent: '#c2410c',
    span: 'lg:col-span-3',
  },
  {
    key: 'grown',
    kicker: "Leaders I've grown",
    title: 'Reports now leading at',
    body:
      'Direct reports who reported to me have gone on to Tech Lead, Staff Engineer, Engineering Manager, and Product leadership roles at companies they joined after working with me.',
    meta: 'Wayfair · Rogers · Unilever · Payrails · Pareto.AI · Accenture',
    bg: '#312e81',
    fg: '#fbfaf6',
    accent: '#a78bfa',
    span: 'lg:col-span-3',
  },
  {
    key: 'stats',
    kicker: 'By the numbers',
    title: '13y · 4 products · 26 recs',
    body:
      'Thirteen years across product & engineering. Four shipping products in production today. Twenty-six recommendations from teammates, reports, and clients across a decade.',
    meta: 'Outgrow · Coach LMS · ChatBotBuilder · Omniengage',
    bg: '#c2410c',
    fg: '#fbfaf6',
    accent: '#fde68a',
    span: 'lg:col-span-6',
  },
];

function Tile({ t, i }: { t: HighlightTile; i: number }) {
  const Wrapper = t.href ? motion.a : motion.div;
  const linkProps = t.href
    ? { href: t.href, target: '_blank', rel: 'noreferrer' as const }
    : {};
  return (
    <Wrapper
      {...linkProps}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={t.href ? { scale: 0.97 } : undefined}
      transition={{ duration: 0.5, delay: i * 0.05, ease: EASE_OUT }}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-black/5 p-6 sm:p-7 shadow-[0_2px_30px_-12px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-shadow ${t.span}`}
      style={{ background: t.bg, color: t.fg, minHeight: '220px' }}
    >
      <div>
        <div
          className="text-[10px] uppercase tracking-[0.18em] opacity-80"
          style={{ color: t.accent }}
        >
          {t.kicker}
        </div>
        <div className="font-display text-[28px] sm:text-[34px] leading-[1.05] tracking-tightish mt-2">
          {t.title}
        </div>
        <p className="mt-4 max-w-prose text-[14px] sm:text-[15px] leading-relaxed opacity-85">
          {t.body}
        </p>
      </div>
      {t.meta && (
        <div className="mt-6 flex items-end justify-between gap-3">
          <div className="text-[12px] opacity-75 leading-snug max-w-[80%]">
            {t.meta}
          </div>
          {t.href && (
            <div
              className="grid h-9 w-9 place-items-center rounded-full transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ background: t.accent, color: t.bg }}
            >
              <span aria-hidden className="text-sm">↗</span>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
}

export default function Highlights() {
  return (
    <section id="highlights" className="container-prose py-20 sm:py-28">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">
            Beyond the products
          </p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tightish">
            Awards, thinking, and the people I've grown.
          </h2>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-6 auto-rows-fr gap-4 sm:gap-5 items-stretch">
        {tiles.map((t, i) => (
          <Tile key={t.key} t={t} i={i} />
        ))}
      </div>
    </section>
  );
}
