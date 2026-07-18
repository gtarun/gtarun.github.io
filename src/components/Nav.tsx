import { profile } from '../data/profile';
import { PRESS } from '../lib/motion';

const links = [
  { label: 'Resume', href: profile.resumeUrl, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, external: false },
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'WhatsApp', href: profile.whatsapp, external: true },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4">
      <div className="flex w-full max-w-[1080px] items-center justify-between rounded-full border border-white/10 bg-black/50 px-4 py-2.5 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)] backdrop-blur-lg sm:px-5">
        <a href="#top" className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-white text-black text-sm font-semibold">
            TG
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-medium text-white">{profile.name}</span>
            <span className="text-xs text-white/50">{profile.title}</span>
          </div>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noreferrer' : undefined}
              className={`rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white hover:text-black transition-colors ${PRESS}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
