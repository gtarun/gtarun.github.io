import { useEffect, useState } from 'react';

/**
 * True when the full scroll-driven 3D experience should be swapped for a
 * static fallback: reduced-motion preference, or a narrow viewport where a
 * pinned 700vh camera flythrough doesn't translate (no room to read the
 * overlay copy next to the scene, touch scroll fights the scrub).
 */
export function useSimpleExperience(mobileBreakpoint = 768) {
  const [simple, setSimple] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);

    const evaluate = () => setSimple(motionQuery.matches || widthQuery.matches);
    evaluate();

    motionQuery.addEventListener('change', evaluate);
    widthQuery.addEventListener('change', evaluate);
    return () => {
      motionQuery.removeEventListener('change', evaluate);
      widthQuery.removeEventListener('change', evaluate);
    };
  }, [mobileBreakpoint]);

  return simple;
}
