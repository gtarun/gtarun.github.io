import { motion } from 'framer-motion';
import { ArrowRight, EnvelopeSimple } from '@phosphor-icons/react';
import ShaderGradient from './ShaderGradient';
import ProductStack from './ProductStack';
import { profile } from '../data/profile';
import { EASE_OUT, PRESS } from '../lib/motion';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ minHeight: 'min(92vh, 920px)' }}
    >
      <div className="absolute inset-0 -z-10">
        <ShaderGradient />
      </div>

      <div className="container-prose relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-10 pt-20 pb-20 sm:pt-28 sm:pb-24">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
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
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.05 }}
            className="mt-6 font-display text-[44px] leading-[1.02] tracking-tighter2 sm:text-[60px] md:text-[72px]"
          >
            Building, leading & scaling{' '}
            <span className="serif-italic">SaaS&nbsp;products</span> that
            matter.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
            className="mt-6 max-w-[560px] text-base sm:text-lg leading-relaxed text-ink/75"
          >
            {profile.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-accent transition-colors ${PRESS}`}
            >
              View resume
              <ArrowRight size={16} weight="bold" aria-hidden />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className={`inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-5 py-2.5 text-sm font-medium text-ink hover:bg-ink hover:text-paper transition-colors ${PRESS}`}
            >
              <EnvelopeSimple size={16} weight="bold" aria-hidden /> Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.3 }}
          className="md:col-span-5 relative h-[380px] sm:h-[460px] md:h-[520px]"
        >
          <ProductStack />
          <div className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-ink/45">
            Hover · Click · Drag mouse to tilt
          </div>
        </motion.div>
      </div>
    </section>
  );
}
