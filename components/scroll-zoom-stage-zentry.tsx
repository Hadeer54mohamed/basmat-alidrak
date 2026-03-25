'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CLIP_START =
  'polygon(12% 8%, 88% 4%, 94% 72%, 90% 96%, 10% 92%, 6% 28%)';
const CLIP_END = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

const POSTER =
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=85';

type ScrollZoomStageZentryProps = {
  className?: string;
};

/**
 * مشهد بأسلوب Zentry: طبقات، خطوط ضوء، نصوص مربوطة بالتمرير.
 * يعتمد على Lenis من `SmoothScroll` فقط (لا تكرار مثيل Lenis).
 */
export function ScrollZoomStageZentry({ className = '' }: ScrollZoomStageZentryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const streakARef = useRef<HTMLDivElement>(null);
  const streakBRef = useRef<HTMLDivElement>(null);
  const streakCRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const frame = frameRef.current;
      const video = videoRef.current;
      const vignette = vignetteRef.current;
      const grain = grainRef.current;
      const a = streakARef.current;
      const b = streakBRef.current;
      const c = streakCRef.current;
      const glow = glowRef.current;
      const textRoot = textRef.current;
      if (!section || !frame || !video || !vignette || !grain || !a || !b || !c || !glow || !textRoot) {
        return;
      }

      const lines = textRoot.querySelectorAll<HTMLElement>('[data-zentry-line]');

      const st = {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35,
        invalidateOnRefresh: true,
      };

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: st,
      });

      tl.fromTo(
        frame,
        { scale: 0.78, clipPath: CLIP_START, transformOrigin: '50% 45%' },
        { scale: 1, clipPath: CLIP_END, duration: 1 },
        0
      )
        .fromTo(
          video,
          { scale: 1.12, filter: 'blur(10px) brightness(0.85)' },
          { scale: 1, filter: 'blur(0px) brightness(1)', duration: 1 },
          0
        )
        .fromTo(vignette, { opacity: 0.35 }, { opacity: 0.75, duration: 1 }, 0)
        .fromTo(grain, { opacity: 0.04 }, { opacity: 0.12, duration: 1 }, 0)
        .fromTo(glow, { opacity: 0.15, scale: 0.9 }, { opacity: 0.55, scale: 1.15, duration: 1 }, 0)
        .fromTo(a, { xPercent: -18, rotate: -6 }, { xPercent: 22, rotate: 4, duration: 1 }, 0.02)
        .fromTo(b, { xPercent: 14, rotate: 8 }, { xPercent: -26, rotate: -3, duration: 1 }, 0.04)
        .fromTo(c, { xPercent: -8, yPercent: -5 }, { xPercent: 18, yPercent: 8, duration: 1 }, 0.06);

      lines.forEach((line, i) => {
        tl.fromTo(
          line,
          { y: 40 + i * 14, opacity: 0.12, letterSpacing: '0.28em' },
          { y: 0, opacity: 1, letterSpacing: '0.02em', duration: 0.45, ease: 'none' },
          0.08 + i * 0.14
        );
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[105vh] w-full overflow-hidden bg-[#070B1A] ${className}`.trim()}
      aria-label="مشهد سينمائي متعدد الطبقات"
    >
      <div className="sticky top-0 flex h-[100dvh] min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#070B1A] px-3 py-5 sm:px-6 md:px-10">
        {/* نفس خلفية وخطوط قسم الخدمات */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(25,211,255,0.15),transparent_60%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
          aria-hidden
        />

        <div
          ref={frameRef}
          className="relative z-[1] h-[min(80vh,840px)] w-full max-w-6xl overflow-hidden rounded-2xl shadow-[0_0_80px_-20px_rgba(25,211,255,0.2)] ring-1 ring-cyan-400/20 sm:h-[min(84vh,900px)] md:max-w-7xl"
          style={{ willChange: 'clip-path, transform' }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={POSTER}
          >
            <source src="/scroll.mp4" type="video/mp4" />
          </video>

          {/* تظليل يتماشى مع لوحة الخدمات */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#070B1A]/90 via-transparent to-[#061A40]/85" />

          {/* وهج (نفس ألوان السيان في البطاقات) */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(120%,900px)] w-[min(140%,1200px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(25,211,255,0.22)_0%,transparent_58%)] mix-blend-screen blur-2xl"
            aria-hidden
          />

          {/* خطوط ضوء بدرجات السيان مثل هوية القسم */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen" aria-hidden>
            <div
              ref={streakARef}
              className="absolute -left-1/4 top-[-20%] h-[140%] w-[45%] opacity-60"
              style={{
                background:
                  'linear-gradient(102deg, transparent 38%, rgba(34,211,238,0.2) 50%, transparent 62%)',
                filter: 'blur(1px)',
              }}
            />
            <div
              ref={streakBRef}
              className="absolute -right-[15%] top-[-10%] h-[130%] w-[38%] opacity-45"
              style={{
                background:
                  'linear-gradient(118deg, transparent 42%, rgba(59,130,246,0.22) 51%, transparent 60%)',
                filter: 'blur(2px)',
              }}
            />
            <div
              ref={streakCRef}
              className="absolute left-[20%] top-[30%] h-[80%] w-[25%] opacity-35"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.1) 45%, transparent 100%)',
                filter: 'blur(8px)',
              }}
            />
          </div>

          {/* حبيبات خفيفة */}
          <div
            ref={grainRef}
            className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />

          <div
            ref={vignetteRef}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,11,26,0.65)_100%)]"
            aria-hidden
          />

          {/* نصوص متحركة — خط Cairo مثل عناوين الخدمات */}
          <div
            ref={textRef}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p
              data-zentry-line
              className="font-cairo mb-2 text-xs font-semibold text-cyan-300 sm:text-sm"
            >
              بصمة الإدراك
            </p>
            <h2
              data-zentry-line
              className="font-cairo max-w-lg text-2xl font-bold leading-tight sm:max-w-2xl sm:text-4xl md:text-5xl"
            >
              <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                تجربة رقمية
              </span>
              <span className="mt-1 block text-white drop-shadow-[0_0_28px_rgba(0,0,0,0.65)]">
                تتوسع مع كل تمريرة
              </span>
            </h2>
            <p
              data-zentry-line
              className="font-cairo mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
            >
              طبقات عمق، وهج، وحركة مربوطة بالتمرير — بسلاسة على مستوى الموقع.
            </p>
          </div>

          <div className="absolute bottom-5 left-0 right-0 px-4 text-center sm:bottom-8">
            <p className="font-cairo text-xs font-medium text-white/40 sm:text-sm">
              مرّر ببطء — المشهد يتفاعل مع موضع التمرير
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
