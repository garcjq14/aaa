import { useState, useEffect, RefObject } from 'react';

type UseInViewOptions = {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function useInView(
  ref: RefObject<Element>,
  options: UseInViewOptions = {}
) {
  const [isInView, setIsInView] = useState(false);
  const { once = false, threshold = 0, rootMargin = '0px' } = options;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else {
          if (!once) {
            setIsInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, once, threshold, rootMargin]);

  return isInView;
} 