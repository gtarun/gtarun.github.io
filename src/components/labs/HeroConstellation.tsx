import { Fragment, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, EnvelopeSimple } from '@phosphor-icons/react';
import SkillConstellation from './SkillConstellation';
import { profile } from '../../data/profile';
import { projectStations } from '../../data/projectStations';
import { useScrollCamera, type CameraWaypoint } from '../../lib/scrollCamera';
import { PRESS, EASE_OUT } from '../../lib/motion';

const SEGMENTS = 2 + projectStations.length + 1; // hero, skills, N projects, end
const TRACK_VH = SEGMENTS * 100;

function buildWaypoints(): CameraWaypoint[] {
  // `lookAt` always projects the target point to the exact center of the
  // screen — so as long as target === station.position, the logo plaque
  // is glued to screen-center no matter where the camera sits, regardless
  // of any camera-only offset. Translating position AND target by the same
  // left-shift keeps the original per-station framing (distance, angle,
  // height) intact while panning the whole view so the station renders
  // right-of-center, clear of the left-aligned text panel.
  const PROJECT_PAN = 1.6;
  const projectWaypoints: CameraWaypoint[] = projectStations.map((s) => ({
    key: s.key,
    position: [s.position[0] * 0.55 - PROJECT_PAN, s.position[1] * 0.55, s.position[2] * 0.55 + 1.4],
    target: [s.position[0] - PROJECT_PAN, s.position[1], s.position[2]],
  }));

  // The hero copy lives in a left-aligned text column — pan the whole rig
  // left (camera + target move together) so the sphere renders shifted to
  // the right of frame instead of centered on top of the text, and pull
  // back slightly so it reads as a background element, not competing with
  // the copy for attention.
  return [
    { key: 'hero', position: [-4.9, 0, 7.8], target: [-4.9, 0, 0] },
    { key: 'skills', position: [-3.9, 0.4, 2.8], target: [-4.9, 0.15, 0.2] },
    ...projectWaypoints,
    { key: 'end', position: [-4.7, 0.2, 6.8], target: [-4.7, 0, 0] },
  ];
}

const WAYPOINTS = buildWaypoints();

function ProjectPanel({ station }: { station: (typeof profile.projects)[number] }) {
  return (
    <motion.div
      key={station.key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="max-w-md"
    >
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#ff8a4a]">{station.tag}</div>
      <div className="mt-2 font-display text-[36px] leading-[1.0] tracking-tightish text-white sm:text-[44px]">
        {station.name}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">{station.copy}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-white/50">
        <span>{station.role}</span>
        <span aria-hidden>·</span>
        <span>{station.meta}</span>
      </div>
      <a
        href={station.url}
        target="_blank"
        rel="noreferrer"
        className={`mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors ${PRESS}`}
      >
        Visit {station.name} <ArrowUpRight size={16} weight="bold" aria-hidden />
      </a>
    </motion.div>
  );
}

export default function HeroConstellation() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState('hero');
  const cameraRef = useScrollCamera(scrollTrackRef, WAYPOINTS, (key) => setActiveKey(key));

  const activeProject = useMemo(
    () => profile.projects.find((p) => p.key === activeKey),
    [activeKey]
  );

  return (
    <Fragment>
    <section ref={scrollTrackRef} className="relative bg-[#0a0a0b]" style={{ height: `${TRACK_VH}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <SkillConstellation cameraRef={cameraRef} activeKey={activeKey} />

        <div className="container-prose relative z-10 flex h-full flex-col justify-center gap-6 text-white">
          <AnimatePresence mode="wait">
            {activeKey === 'hero' && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>{profile.availableLabel}</span>
                </div>

                <h1 className="max-w-2xl font-display text-[44px] leading-[1.02] tracking-tighter2 sm:text-[60px] md:text-[72px]">
                  Building, leading &{' '}
                  <span className="serif-italic">scaling</span> SaaS products
                  that matter.
                </h1>

                <p className="max-w-[560px] text-base leading-relaxed text-white/70 sm:text-lg">
                  {profile.hero.sub}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-[#ff5722] hover:text-white transition-colors ${PRESS}`}
                  >
                    View resume <ArrowRight size={16} weight="bold" aria-hidden />
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className={`inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors ${PRESS}`}
                  >
                    <EnvelopeSimple size={16} weight="bold" aria-hidden /> Get in touch
                  </a>
                </div>
              </motion.div>
            )}

            {activeKey === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="max-w-lg"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#ff8a4a]">
                  13+ years, one network
                </div>
                <div className="mt-2 font-display text-[36px] leading-[1.0] tracking-tightish sm:text-[44px]">
                  Every skill, one graph.
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  {profile.skills.length} disciplines that show up together on
                  every product I've shipped — from engineering leadership to
                  the AI/LLM work underneath it.
                </p>
              </motion.div>
            )}

            {activeProject && <ProjectPanel key={activeProject.key} station={activeProject} />}

            {activeKey === 'end' && (
              <motion.div
                key="end"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="max-w-lg"
              >
                <div className="font-display text-[32px] leading-[1.05] tracking-tightish sm:text-[40px]">
                  That's the constellation. Here's the rest of the story.
                </div>
                <p className="mt-3 text-sm text-white/60">
                  Keep scrolling for testimonials, experience, and how to
                  reach me.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {activeKey === 'hero' && (
            <div className="absolute bottom-8 left-0 text-[10px] uppercase tracking-[0.18em] text-white/40">
              Scroll — camera flies through the skill constellation
            </div>
          )}
        </div>
      </div>
    </section>

      {/* Seam: fades the pinned scene's black into the paper theme below,
          so the transition back to the 2D sections isn't a hard cut. */}
      <div className="h-[24vh] bg-gradient-to-b from-[#0a0a0b] to-paper" aria-hidden="true" />
    </Fragment>
  );
}
