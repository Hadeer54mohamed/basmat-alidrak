'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CLIP_START =
  'polygon(14% 10%, 86% 6%, 92% 78%, 88% 94%, 12% 90%, 8% 32%)';
const CLIP_END = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

const DEMO_MEDIA =
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=85';

type ScrollZoomStageProps = {
  className?: string;
};

/** نسخة بسيطة: التمرير الناعم من `SmoothScroll` (Lenis) فقط — بدون تكرار Lenis هنا */
export function ScrollZoomStage({ className = '' }: ScrollZoomStageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const frame = frameRef.current;
      const overlay = overlayRef.current;
      const video = videoRef.current;
      if (!section || !frame || !overlay || !video) return;

      gsap.fromTo(
        frame,
        { scale: 0.85, clipPath: CLIP_START, transformOrigin: '50% 50%' },
        {
          scale: 1,
          clipPath: CLIP_END,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        overlay,
        { y: -24, opacity: 0.9 },
        {
          y: 0,
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        video,
        { filter: 'blur(8px)' },
        {
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[170vh] w-full bg-[#050a12] ${className}`.trim()}
      aria-label="مشهد تكبير مرتبط بالتمرير"
    >
      <div className="sticky top-0 flex h-[100dvh] min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#050a12] px-3 py-6 sm:px-5 md:px-8">
        <div
          ref={frameRef}
          className="relative h-[min(78vh,820px)] w-full max-w-6xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:h-[min(82vh,880px)] md:max-w-7xl"
          style={{ willChange: 'clip-path, transform' }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={DEMO_MEDIA}
          >
            <source src="/scroll.mp4" type="video/mp4" />
          </video>

          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050a12]/90 via-transparent to-[#050a12]/50"
          />

          <div className="absolute bottom-6 left-0 right-0 px-4 text-center sm:bottom-10">
            <p className="text-xs font-medium tracking-wide text-white/70">
              تمرير سلس — تكبير سينمائي (GSAP + Lenis عبر الموقع)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
