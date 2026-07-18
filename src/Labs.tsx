import { useState } from 'react';
import HeroOriginal from './components/labs/HeroOriginal';
import HeroCrystal from './components/labs/HeroCrystal';
import HeroBento from './components/labs/HeroBento';
import HeroConstellationGate from './components/labs/HeroConstellationGate';
import HeroConstellationStatic from './components/labs/HeroConstellationStatic';
import Nav from './components/Nav';
import Highlights from './components/Highlights';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

type Variant = 'bento' | 'crystal' | 'original' | 'constellation';

const VARIANTS: { key: Variant; label: string; sub: string }[] = [
  {
    key: 'constellation',
    label: 'C · Skill Constellation (scrollytelling)',
    sub: 'Phase 1 scaffold: scroll drives the camera through a 3D skill-node graph via GSAP ScrollTrigger. Idle-rotates, mouse-parallax, hover to label a node.',
  },
  {
    key: 'bento',
    label: 'B · Product Bento (no 3D in hero)',
    sub: 'Designer-grade 2D bento with brand colors per product. Most credible for a Director portfolio.',
  },
  {
    key: 'crystal',
    label: 'A · Glass Crystal centerpiece',
    sub: 'Single dramatic 3D object with real refraction. Apple-keynote vibe. Mouse-parallax tilt.',
  },
  {
    key: 'original',
    label: 'Current · Floating Card Stack',
    sub: 'What is on / right now. The one you said looks like business cards.',
  },
];

export default function Labs() {
  const [variant, setVariant] = useState<Variant>('constellation');
  const [forceStatic, setForceStatic] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />

      <div className="sticky top-[64px] z-20 bg-paper/85 backdrop-blur-md hairline">
        <div className="container-prose flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">
              Labs · Hero variants
            </span>
            <span className="text-sm text-ink/70">
              {VARIANTS.find((v) => v.key === variant)?.sub}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {variant === 'constellation' && (
              <button
                onClick={() => setForceStatic((s) => !s)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  forceStatic
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-paper border-line text-ink/80 hover:bg-cream/50'
                }`}
              >
                {forceStatic ? 'Static fallback: ON' : 'Preview static fallback'}
              </button>
            )}
            {VARIANTS.map((v) => (
              <button
                key={v.key}
                onClick={() => setVariant(v.key)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  variant === v.key
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-paper border-line text-ink/80 hover:bg-cream/50'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main>
        {variant === 'constellation' &&
          (forceStatic ? <HeroConstellationStatic /> : <HeroConstellationGate />)}
        {variant === 'bento' && <HeroBento />}
        {variant === 'crystal' && <HeroCrystal />}
        {variant === 'original' && <HeroOriginal />}

        <div className="hairline border-t border-line">
          <Highlights />
          <Testimonials />
          <About />
          <Experience />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
