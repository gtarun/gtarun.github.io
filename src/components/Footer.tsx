import { profile } from '../data/profile';

const linkClass = 'transition-colors hover:text-ink';

export default function Footer() {
  return (
    <footer className="hairline border-t border-line">
      <div className="container-prose flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 py-10 text-sm text-muted">
        <div>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
        <div className="flex flex-wrap gap-4">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className={linkClass}>
            GitHub
          </a>
          <a href={profile.twitter} target="_blank" rel="noreferrer" className={linkClass}>
            X / Twitter
          </a>
          <a href={`mailto:${profile.email}`} className={linkClass}>
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
