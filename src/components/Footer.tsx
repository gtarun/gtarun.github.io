import { LinkedinLogo, GithubLogo, XLogo, EnvelopeSimple } from '@phosphor-icons/react';
import { profile } from '../data/profile';

const linkClass = 'inline-flex items-center gap-1.5 transition-colors hover:text-ink';

export default function Footer() {
  return (
    <footer className="hairline border-t border-line">
      <div className="container-prose flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 py-10 text-sm text-muted">
        <div>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
        <div className="flex flex-wrap gap-4">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
            <LinkedinLogo size={15} weight="bold" /> LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className={linkClass}>
            <GithubLogo size={15} weight="bold" /> GitHub
          </a>
          <a href={profile.twitter} target="_blank" rel="noreferrer" className={linkClass}>
            <XLogo size={15} weight="bold" /> X / Twitter
          </a>
          <a href={`mailto:${profile.email}`} className={linkClass}>
            <EnvelopeSimple size={15} weight="bold" /> {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
