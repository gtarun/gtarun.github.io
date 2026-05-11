import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import HeroBento from './components/labs/HeroBento';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Labs from './Labs';

function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return path;
}

function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <HeroBento />
        <Projects />
        <Testimonials />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
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
    </div>
  );
}

export default function App() {
  const path = useRoute();
  if (path.startsWith('/labs')) return <Labs />;
  return <Home />;
}
