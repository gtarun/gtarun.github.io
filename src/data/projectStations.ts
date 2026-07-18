import { profile } from './profile';

export type ProjectStation = {
  key: string;
  position: [number, number, number];
  color: string;
  logo: string;
};

// Hand-placed around the skill sphere so the camera flythrough reads as a
// deliberate path rather than a random walk — roughly alternating left/right
// and up/down so consecutive projects don't overlap on screen.
const STATION_LAYOUT: Record<string, { position: [number, number, number]; color: string; logo: string }> = {
  outgrow: { position: [3.2, 0.6, -1.0], color: '#ff6b35', logo: '/logos/outgrow.png' },
  coachlms: { position: [-3.0, -0.5, 0.6], color: '#f59e0b', logo: '/logos/coachlms.svg' },
  chatbotbuilder: { position: [2.2, -1.4, 1.8], color: '#a78bfa', logo: '/logos/chatbotbuilder.png' },
  omniengage: { position: [-2.4, 1.3, -1.6], color: '#fb923c', logo: '/logos/omniengage.png' },
};

export const projectStations: ProjectStation[] = profile.projects.map((p) => ({
  key: p.key,
  ...STATION_LAYOUT[p.key],
}));
