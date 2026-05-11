import { motion } from 'framer-motion';
import { profile } from '../data/profile';

export default function About() {
  return (
    <section id="about" className="hairline border-t border-line">
      <div className="container-prose py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">
              About
            </p>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tightish">
              The short version.
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 overflow-hidden rounded-2xl border border-line"
            >
              <img
                src="/avatar.jpeg"
                alt={profile.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <div className="mt-4 text-sm text-muted">
              {profile.location}
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="space-y-5 text-[17px] leading-relaxed text-ink/85">
              {profile.about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <div className="mt-10">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">
                Strengths
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line bg-cream/40 px-3 py-1 text-sm text-ink/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
