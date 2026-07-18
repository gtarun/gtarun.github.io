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
    <header className="sticky top-0 z-30 w-full bg-paper/80 backdrop-blur-md hairline">
      <div className="container-prose flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper font-semibold">
            TG
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-medium">{profile.name}</span>
            <span className="text-xs text-muted">{profile.title}</span>
          </div>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noreferrer' : undefined}
              className={`rounded-full px-3 py-1.5 text-sm text-ink/80 hover:bg-ink hover:text-paper transition-colors ${PRESS}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
