import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { PRESS } from '../../lib/motion';

/**
 * No-WebGL fallback for reduced-motion / small-viewport visitors — same
 * copy and palette as the 3D constellation hero, but a static CSS dot field
 * instead of a mounted Canvas + ScrollTrigger rig.
 */
export default function HeroConstellationStatic() {
  return (
    <section
      className="relative overflow-hidden bg-[#0a0a0b] text-white"
      style={{ minHeight: 'min(92vh, 920px)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 20% 30%, #ff8a4a 100%, transparent), radial-gradient(1.5px 1.5px at 65% 20%, #ff5722 100%, transparent), radial-gradient(1px 1px at 80% 60%, #ff8a4a 100%, transparent), radial-gradient(1.5px 1.5px at 35% 75%, #ff5722 100%, transparent), radial-gradient(1px 1px at 90% 85%, #ff8a4a 100%, transparent), radial-gradient(1px 1px at 10% 90%, #ff5722 100%, transparent)',
          backgroundSize: '100% 100%',
        }}
      />

      <div className="container-prose relative z-10 flex min-h-[inherit] flex-col justify-center gap-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-sm text-white/70"
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
          className="max-w-2xl font-display text-[40px] leading-[1.05] tracking-tighter2 sm:text-[56px]"
        >
          Building, leading & <span className="serif-italic">scaling</span>{' '}
          SaaS products that matter.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-[520px] text-base leading-relaxed text-white/70"
        >
          {profile.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-wrap items-center gap-3"
        >
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-[#ff5722] hover:text-white transition-colors ${PRESS}`}
          >
            View resume <span aria-hidden>→</span>
          </a>
          <a
            href={`mailto:${profile.email}`}
            className={`inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors ${PRESS}`}
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
