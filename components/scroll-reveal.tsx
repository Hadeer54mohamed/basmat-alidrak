'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      if (!el) return;

      gsap.set(el, { opacity: 0, y: 40 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    },
    { scope: rootRef, dependencies: [] }
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
