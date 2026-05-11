import { motion } from 'framer-motion';
import { profile } from '../data/profile';

export default function Experience() {
  return (
    <section id="experience" className="hairline border-t border-line">
      <div className="container-prose py-20 sm:py-28">
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">
          Experience
        </p>
        <h2 className="font-display text-4xl sm:text-5xl tracking-tightish">
          Where I've shipped.
        </h2>

        <ol className="mt-12 divide-y divide-line border-y border-line">
          {profile.experience.map((e, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 py-7"
            >
              <div className="md:col-span-3 text-sm text-muted">
                {e.period}
              </div>
              <div className="md:col-span-9">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl tracking-tightish">
                    {e.company}
                  </h3>
                  <span className="text-sm text-ink/70">{e.role}</span>
                </div>
                <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink/80">
                  {e.blurb}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {profile.education.map((ed) => (
            <div
              key={ed.school}
              className="rounded-2xl border border-line bg-cream/30 p-5"
            >
              <div className="text-xs uppercase tracking-[0.16em] text-muted">
                {ed.period}
              </div>
              <div className="mt-2 font-display text-xl tracking-tightish">
                {ed.school}
              </div>
              <div className="mt-1 text-sm text-ink/75">{ed.degree}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
