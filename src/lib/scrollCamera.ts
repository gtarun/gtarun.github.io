import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type CameraWaypoint = {
  /** Unique key, typically matching the section id it belongs to */
  key: string;
  position: [number, number, number];
  target: [number, number, number];
};

/**
 * Drives a mutable ref with the current scroll-interpolated camera
 * position/target, computed via GSAP ScrollTrigger against a trigger
 * element (not React state — avoids re-rendering the R3F tree every frame).
 * Consume the ref inside a useFrame loop and lerp toward it there.
 */
export function useScrollCamera(
  triggerRef: React.RefObject<HTMLElement>,
  waypoints: CameraWaypoint[],
  onActiveChange?: (key: string, index: number) => void
) {
  const stateRef = useRef({
    position: [...waypoints[0].position] as [number, number, number],
    target: [...waypoints[0].target] as [number, number, number],
  });

  useEffect(() => {
    if (!triggerRef.current || waypoints.length < 2) return;

    let lastIndex = -1;

    const ctx = gsap.context(() => {
      const proxy = { t: 0 };
      const segments = waypoints.length - 1;

      gsap.to(proxy, {
        t: segments,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
        onUpdate: () => {
          const i = Math.min(Math.floor(proxy.t), segments - 1);
          const localT = proxy.t - i;
          const a = waypoints[i];
          const b = waypoints[i + 1] ?? a;

          stateRef.current.position = [
            gsap.utils.interpolate(a.position[0], b.position[0], localT),
            gsap.utils.interpolate(a.position[1], b.position[1], localT),
            gsap.utils.interpolate(a.position[2], b.position[2], localT),
          ];
          stateRef.current.target = [
            gsap.utils.interpolate(a.target[0], b.target[0], localT),
            gsap.utils.interpolate(a.target[1], b.target[1], localT),
            gsap.utils.interpolate(a.target[2], b.target[2], localT),
          ];

          // Nearest waypoint "owns" this scroll range — fires only on change,
          // so the React overlay above doesn't re-render every scroll tick.
          const nearest = Math.round(proxy.t);
          if (nearest !== lastIndex && onActiveChange) {
            lastIndex = nearest;
            onActiveChange(waypoints[nearest].key, nearest);
          }
        },
      });
    }, triggerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRef, waypoints]);

  return stateRef;
}
