import { useEffect, useState } from 'react';

/**
 * useScrollSpy
 * Observes a list of element IDs and returns the ID of the section currently in view.
 * - Uses IntersectionObserver with rootMargin to detect near-top alignment.
 */
export function useScrollSpy(sectionIds: string[], options?: { rootMargin?: string; threshold?: number }) {
  const { rootMargin = '0px 0px -65% 0px', threshold = 0.1 } = options || {};
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top));
        if (visible.length > 0) {
          const id = visible[0].target.getAttribute('id');
          if (id) setActiveId(id);
        }
      },
      { root: null, rootMargin, threshold }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin, threshold]);

  return activeId;
}
