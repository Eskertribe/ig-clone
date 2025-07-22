import { useEffect, useRef } from 'react';

export function useOnScreen(callback: () => void, once = true) {
  const ref = useRef<HTMLDivElement | null>(null);
  const called = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!called.current || !once)) {
          callback();
          called.current = true;
        }
      },
      { threshold: 0.5 } // The element has to be at least 50% visible to count
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback, once]);

  return ref;
}
