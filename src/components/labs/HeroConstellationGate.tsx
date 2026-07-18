import { useSimpleExperience } from '../../lib/useSimpleExperience';
import HeroConstellation from './HeroConstellation';
import HeroConstellationStatic from './HeroConstellationStatic';

/**
 * Entry point for the constellation hero — decides once per mount whether
 * the visitor gets the full scroll-driven 3D flythrough or the static
 * fallback (reduced-motion preference, or a viewport too narrow for a
 * pinned 700vh scrubbed scene to make sense).
 */
export default function HeroConstellationGate() {
  const simple = useSimpleExperience();
  return simple ? <HeroConstellationStatic /> : <HeroConstellation />;
}
