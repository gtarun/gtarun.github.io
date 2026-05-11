import { motion } from 'framer-motion';

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
  gridArea: string;
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
    gridArea: 'award',
  },
  {
    key: 'principle',
    kicker: 'How I think about AI',
    title: 'Assistant. Foil. Driver.',
    body:
      'Three modes for AI in any creative work. Most people only use mode 1. Mode 2 — AI as foil that argues against your idea so you sharpen it — is the most underused, and the most valuable.',
    meta: 'Read the post →',
    href: 'https://www.linkedin.com/in/tarungupta003/recent-activity/',
    bg: '#fef3e2',
    fg: '#0f0f10',
    accent: '#c2410c',
    gridArea: 'principle',
  },
  {
    key: 'grown',
    kicker: "Leaders I've grown",
    title: 'Reports now leading at',
    body:
      "Direct reports who reported to me are now Tech Leads, Staff Engineers, and Product leaders.",
    meta: 'Wayfair · Rogers · Unilever · Payrails · Pareto.AI',
    bg: '#312e81',
    fg: '#fbfaf6',
    accent: '#a78bfa',
    gridArea: 'grown',
  },
  {
    key: 'mba',
    kicker: 'Education',
    title: 'Executive MBA',
    body: 'PGP Rise at Masters’ Union — the leading new-age business school in India.',
    meta: 'Sep 2024 — Nov 2025',
    bg: '#fbfaf6',
    fg: '#0f0f10',
    accent: '#0f172a',
    gridArea: 'mba',
  },
  {
    key: 'stats',
    kicker: 'Operating numbers',
    title: '13y · 4 products · 26 recs',
    body:
      'Thirteen years across product & engineering. Four shipping products in production. Twenty-six recommendations from teammates, reports, and clients spanning a decade.',
    meta: 'Outgrow · Coach LMS · ChatBotBuilder · Omniengage',
    bg: '#c2410c',
    fg: '#fbfaf6',
    accent: '#fde68a',
    gridArea: 'stats',
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
      transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/5 p-6 sm:p-7 shadow-[0_2px_30px_-12px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-shadow"
      style={{
        background: t.bg,
        color: t.fg,
        gridArea: t.gridArea,
        minHeight: '220px',
      }}
    >
      <div>
        <div
          className="text-[10px] uppercase tracking-[0.18em] opacity-80"
          style={{ color: t.accent }}
        >
          {t.kicker}
        </div>
        <div className="font-display text-[32px] sm:text-[40px] leading-[1.0] tracking-tightish mt-2">
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

      <div
        className="mt-12 grid gap-4 sm:gap-5"
        style={{
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          gridTemplateAreas: `
            "award award award award mba   mba"
            "award award award award grown grown"
            "principle principle principle stats stats stats"
          `,
        }}
      >
        {tiles.map((t, i) => (
          <Tile key={t.key} t={t} i={i} />
        ))}
      </div>
    </section>
  );
}
