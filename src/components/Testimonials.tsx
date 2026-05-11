import { motion } from 'framer-motion';
import { profile } from '../data/profile';

export default function Testimonials() {
  return (
    <section id="testimonials" className="hairline border-t border-line">
      <div className="container-prose py-20 sm:py-28">
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">
          Testimonials
        </p>
        <h2 className="font-display text-4xl sm:text-5xl tracking-tightish">
          What people say.
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {profile.testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: (i % 2) * 0.05 }}
              className={`rounded-2xl border border-line bg-cream/30 p-6 sm:p-7 ${
                i === 4 ? 'md:col-span-2' : ''
              }`}
            >
              <blockquote className="font-display text-2xl sm:text-[26px] leading-snug tracking-tightish text-ink/90">
                <span className="serif text-accent">“</span>
                {t.quote}
                <span className="serif text-accent">”</span>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper text-xs font-semibold">
                  {t.name
                    .split(' ')
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
