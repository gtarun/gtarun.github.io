import { motion } from 'framer-motion';
import { profile } from '../data/profile';

const ctas = [
  { label: 'Email', href: `mailto:${profile.email}`, sub: profile.email },
  { label: 'LinkedIn', href: profile.linkedin, sub: '@tarungupta003' },
  { label: 'WhatsApp', href: profile.whatsapp, sub: 'Quick chat' },
  { label: 'Resume', href: profile.resumeUrl, sub: 'Google Doc' },
];

export default function Contact() {
  return (
    <section id="contact" className="hairline border-t border-line">
      <div className="container-prose py-24 sm:py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.18em] text-muted"
        >
          Let's build something meaningful 🚀
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-3 mx-auto max-w-[860px] font-display text-[44px] sm:text-[68px] leading-[1.05] tracking-tighter2"
        >
          Got a 0→1 product or a team that needs to ship? <span className="serif-italic">Let's talk.</span>
        </motion.h2>

        <div className="mt-12 mx-auto grid max-w-3xl grid-cols-1 sm:grid-cols-2 gap-3">
          {ctas.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-line bg-cream/30 px-5 py-4 hover:bg-ink hover:text-paper transition-colors"
            >
              <div className="text-left">
                <div className="text-sm font-medium">{c.label}</div>
                <div className="text-xs opacity-70">{c.sub}</div>
              </div>
              <span className="opacity-60 transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
