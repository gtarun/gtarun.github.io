import { lazy, Suspense, useEffect, useState } from 'react';
import Nav from './components/Nav';
import HeroConstellationGate from './components/labs/HeroConstellationGate';
import Highlights from './components/Highlights';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Labs = lazy(() => import('./Labs'));

function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return path;
}

function LabsFallback() {
  return (
    <div className="min-h-screen bg-paper text-ink grid place-items-center">
      <div className="flex items-center gap-3 text-sm text-muted">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        Loading labs…
      </div>
    </div>
  );
}

function Home() {
  const isLocal =
    typeof window !== 'undefined' && /^(localhost|127\.|192\.168\.)/.test(window.location.hostname);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <HeroConstellationGate />
        <Highlights />
        <Testimonials />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
      {isLocal && (
        <a
          href="/labs"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, '', '/labs');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="fixed bottom-5 right-5 z-40 rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-ink/70 shadow-md hover:bg-ink hover:text-paper hover:border-ink transition-colors"
        >
          ↗ /labs
        </a>
      )}
    </div>
  );
}

export default function App() {
  const path = useRoute();
  if (path.startsWith('/labs')) {
    return (
      <Suspense fallback={<LabsFallback />}>
        <Labs />
      </Suspense>
    );
  }
  return <Home />;
}
