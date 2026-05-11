import { motion } from 'framer-motion';
import { profile } from '../../data/profile';

type Tile = {
  key: string;
  name?: string;
  tag?: string;
  metric?: string;
  url?: string;
  bg: string;
  fg: string;
  accent: string;
  area: string; // grid-area name for desktop layout
  type?: 'product' | 'portrait';
};

const tiles: Tile[] = [
  {
    key: 'portrait',
    type: 'portrait',
    bg: '#0f0f10',
    fg: '#fbfaf6',
    accent: '#ff6b35',
    area: 'portrait',
  },
  {
    key: 'outgrow',
    name: 'Outgrow',
    tag: 'Growth marketing platform · 10 years',
    metric: 'Adobe · Nike · Salesforce · Uber · Amazon',
    url: 'https://outgrow.co',
    bg: '#0f172a',
    fg: '#fbfaf6',
    accent: '#ff6b35',
    area: 'outgrow',
    type: 'product',
  },
  {
    key: 'coachlms',
    name: 'Coach LMS',
    tag: "Masters' Union · LMS",
    metric: 'AI-personalized learning + placement',
    url: 'https://coachlms.org',
    bg: '#fef3e2',
    fg: '#0f0f10',
    accent: '#c2410c',
    area: 'coach',
    type: 'product',
  },
  {
    key: 'chatbotbuilder',
    name: 'ChatBotBuilder',
    tag: 'Conversational AI · No-code',
    metric: 'Ship a bot in < 30 minutes',
    url: 'https://chatbotbuilder.net',
    bg: '#312e81',
    fg: '#fbfaf6',
    accent: '#a78bfa',
    area: 'bot',
    type: 'product',
  },
  {
    key: 'omniengage',
    name: 'Omniengage',
    tag: 'Omnichannel marketing automation',
    metric: 'Email · SMS · Push · WhatsApp · Web · Messenger',
    url: 'https://omniengage.co',
    bg: '#c2410c',
    fg: '#fbfaf6',
    accent: '#fde68a',
    area: 'omni',
    type: 'product',
  },
];

function PortraitTile({ t, i }: { t: Tile; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + i * 0.06, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border border-black/5 shadow-[0_2px_30px_-12px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-shadow"
      style={{ background: t.bg, color: t.fg, gridArea: t.area }}
    >
      <img
        src="/avatar.jpeg"
        alt={profile.name}
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to roles
        </div>
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.18em]"
            style={{ color: t.accent }}
          >
            {profile.location}
          </div>
          <div className="font-display text-[36px] leading-[1.0] tracking-tightish mt-2 text-white">
            {profile.name}
          </div>
          <div className="text-[13px] text-white/80 mt-1">
            {profile.title}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductTile({ t, i }: { t: Tile; i: number }) {
  return (
    <motion.a
      href={t.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/5 p-5 sm:p-6 shadow-[0_2px_30px_-12px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-shadow"
      style={{
        background: t.bg,
        color: t.fg,
        gridArea: t.area,
        minHeight: '160px',
      }}
    >
      <div>
        <div
          className="text-[10px] uppercase tracking-[0.18em] opacity-80"
          style={{ color: t.accent }}
        >
          {t.tag}
        </div>
        <div className="font-display text-[32px] sm:text-[36px] leading-[1.0] tracking-tightish mt-2">
          {t.name}
        </div>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="text-[12px] opacity-75 leading-snug max-w-[80%]">
          {t.metric}
        </div>
        <div
          className="grid h-8 w-8 place-items-center rounded-full transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{ background: t.accent, color: t.bg }}
        >
          <span aria-hidden className="text-sm">↗</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function HeroBento() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="container-prose relative z-10 grid grid-cols-1 lg:grid-cols-12 items-start gap-10 pt-16 pb-20 sm:pt-24 sm:pb-24">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-ink/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{profile.availableLabel}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-[44px] leading-[1.02] tracking-tighter2 sm:text-[56px] lg:text-[64px]"
          >
            Building, leading & scaling{' '}
            <span className="serif-italic">SaaS&nbsp;products</span> that
            matter.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-[520px] text-base sm:text-lg leading-relaxed text-ink/75"
          >
            {profile.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-accent transition-colors"
            >
              View resume <span aria-hidden>→</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <div
            className="grid gap-3 sm:gap-4"
            style={{
              gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
              gridTemplateRows: 'auto auto auto',
              gridTemplateAreas: `
                "portrait portrait outgrow  outgrow  outgrow  outgrow"
                "portrait portrait coach    coach    bot      bot"
                "omni     omni    omni      omni     omni     omni"
              `,
            }}
          >
            {tiles.map((t, i) =>
              t.type === 'portrait' ? (
                <PortraitTile key={t.key} t={t} i={i} />
              ) : (
                <ProductTile key={t.key} t={t} i={i} />
              )
            )}
          </div>
          <p className="mt-4 text-xs text-ink/50">
            Click any product tile to visit the live site.
          </p>
        </div>
      </div>
    </section>
  );
}
