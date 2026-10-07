import { useEffect, useRef, useCallback } from 'react';

/**
 * High-performance scroll hook — RAF-throttled, passive listener.
 * Returns nothing; calls onScroll(progress 0-1, scrollY) each frame.
 */
export function useScrollProgress(onScroll) {
  const rafRef = useRef(null);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    rafRef.current = requestAnimationFrame(() => {
      const doc = document.documentElement;
      const scrollY = window.scrollY;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? scrollY / max : 0;
      onScroll(progress, scrollY);
      ticking.current = false;
    });
  }, [onScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);
}

/**
 * Intersection Observer hook — triggers callback when element enters viewport.
 */
export function useInView(ref, options = {}) {
  const { threshold = 0.15, once = true } = options;
  const inViewRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        inViewRef.current = true;
        if (once) obs.disconnect();
      }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold, once]);

  return inViewRef;
}
