'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { ArrowLeft, Code2, Shield } from 'lucide-react';
import { useHeroMode, type HeroMode } from '@/components/hero-mode-context';

const TECH_BG =
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=85';
const SEC_BG =
  'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1920&q=85';
const TECH_CARD =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=82';
const SEC_CARD =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82";

const BLOB_RADIUS = 200;
const MODE_TRANSITION = 1;

/** أقل جزيئات على الشاشات الضيقة / أجهزة ضعيفة / توفير بيانات */
function useHeroPerf() {
  const [particleCount, setParticleCount] = useState(20);
  const [lowEndDevice, setLowEndDevice] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const cores = navigator.hardwareConcurrency ?? 8;
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      const saveData = Boolean(conn?.saveData);
      const narrow = w < 768;
      const lowCpu = cores <= 4;
      const low = narrow || saveData || lowCpu;
      setLowEndDevice(low);
      setParticleCount(low ? 14 : 20);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return { particleCount, lowEndDevice };
}

const copy: Record<
  HeroMode,
  { line1: string; line2: string; accent: string; sub: string; accentRgb: string }
> = {
  tech: {
    line1: 'حلول رقمية',
    line2: 'متكاملة',
    accent: 'للمستقبل',
    sub:
      'نبني منصات ويب وتجارب رقمية عالية الأداء، مع بنية تحتية سحابية مرنة وقابلة للنمو مع عملك.',
    accentRgb: '59 130 246',
  },
  security: {
    line1: 'أمان سيبراني',
    line2: 'متقدم',
    accent: 'للبيانات الحساسة',
    sub:
      'نحمي بنيتك التحتية والبيانات بمراقبة مستمرة، تشفير قوي، واستجابة سريعة أمام التهديدات.',
    accentRgb: '34 211 238',
  },
};

function Particles({ mode, count }: { mode: HeroMode; count: number }) {
  const color = mode === 'tech' ? 'rgba(59,130,246,0.45)' : 'rgba(34,211,238,0.5)';
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (i * 37) % 100,
        y: (i * 23) % 100,
        d: 4 + (i % 5),
        dur: 14 + (i % 9),
        delay: (i % 7) * 0.4,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden" aria-hidden>
      {nodes.map((n, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: n.d,
            height: n.d,
            background: color,
            boxShadow: `0 0 ${n.d * 2}px ${color}`,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.1, 1, 0.1],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: n.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: n.delay,
          }}
        />
      ))}
    </div>
  );
}

function HudRings({ mode }: { mode: HeroMode }) {
  const stroke = mode === 'tech' ? 'rgba(59,130,246,0.25)' : 'rgba(34,211,238,0.3)';
  return (
    <>
      <motion.div
        className="absolute -left-[8%] top-[18%] h-[min(42vw,320px)] w-[min(42vw,320px)] rounded-full border-2"
        style={{ borderColor: stroke }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -right-[5%] bottom-[12%] h-[min(36vw,280px)] w-[min(36vw,280px)] rounded-full border"
        style={{ borderColor: stroke }}
        animate={{ rotate: -360 }}
        transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-[12%] bottom-[8%] h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.45)]"
        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.2, repeat: Infinity }}
      />
    </>
  );
}

export function Hero() {
  const { mode } = useHeroMode();
  const { particleCount, lowEndDevice } = useHeroPerf();
  const heroRef = useRef<HTMLElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [finePointer, setFinePointer] = useState(true);

  const enableCustomCursor = finePointer && !reduceMotion && !lowEndDevice;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 28, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 280, damping: 28, mass: 0.4 });

  const maskImage = useMotionTemplate`radial-gradient(circle ${BLOB_RADIUS}px at ${sx}px ${sy}px, white 99%, transparent 100%)`;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.35]);
  const floatParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const otherMode: HeroMode = mode === 'tech' ? 'security' : 'tech';
  const otherSrc = otherMode === 'tech' ? TECH_BG : SEC_BG;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ptr = window.matchMedia('(pointer: fine)');
    setReduceMotion(mq.matches);
    setFinePointer(ptr.matches);
    const onChange = () => setReduceMotion(mq.matches);
    const onPtr = () => setFinePointer(ptr.matches);
    mq.addEventListener('change', onChange);
    ptr.addEventListener('change', onPtr);
    return () => {
      mq.removeEventListener('change', onChange);
      ptr.removeEventListener('change', onPtr);
    };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(r.width / 2);
    my.set(r.height / 2);
  }, [mx, my]);

  const onMove = useCallback(
    (clientX: number, clientY: number) => {
      const el = heroRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(clientX - r.left);
      my.set(clientY - r.top);
    },
    [mx, my]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enableCustomCursor) return;
      onMove(e.clientX, e.clientY);
    },
    [enableCustomCursor, onMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!enableCustomCursor) return;
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    },
    [enableCustomCursor, onMove]
  );

  const c = copy[mode];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`relative h-[100dvh] min-h-[600px] w-full overflow-hidden ${
        enableCustomCursor ? 'cursor-none' : 'cursor-default'
      }`}
    >
      <h1 id="hero-page-title" className="sr-only">
        بصمة الإدراك — حلول رقمية وأمن سيبراني متكامل
      </h1>
      <motion.div
        className="absolute inset-0 z-[2]"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background:
            mode === 'tech'
              ? 'radial-gradient(circle at 70% 30%, rgba(59,130,246,0.25), transparent 60%)'
              : 'radial-gradient(circle at 30% 70%, rgba(34,211,238,0.25), transparent 60%)',
        }}
      />
      {/* z: background stack */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale, y: heroY }}>
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: mode === 'tech' ? 1 : 0 }}
          transition={{ duration: MODE_TRANSITION, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image src={TECH_BG} alt="" fill priority className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/85 via-[#0b5ed7]/35 to-[#19d3ff]/25"
            aria-hidden
          />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: mode === 'security' ? 1 : 0 }}
          transition={{ duration: MODE_TRANSITION, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image src={SEC_BG} alt="" fill priority className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0 bg-gradient-to-tl from-[#020617]/90 via-[#0f172a]/70 to-cyan-900/35"
            aria-hidden
          />
        </motion.div>
      </motion.div>

      {/* Blob: other mode preview */}
      {enableCustomCursor && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          <div className="absolute inset-0">
            <Image src={otherSrc} alt="" fill className="object-cover" sizes="100vw" />
            <div
              className={`absolute inset-0 ${otherMode === 'tech'
                ? 'bg-gradient-to-br from-[#0a1628]/80 via-[#0b5ed7]/30 to-[#19d3ff]/20'
                : 'bg-gradient-to-tl from-[#020617]/85 via-[#0f172a]/65 to-cyan-900/30'
                }`}
              aria-hidden
            />
          </div>
        </motion.div>
      )}

      {/* Readability overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/25 via-transparent to-black/55"
        aria-hidden
      />

      <Particles mode={mode} count={particleCount} />
      {!lowEndDevice && <HudRings mode={mode} />}

      {/* Cursor follower */}
      {enableCustomCursor && (
        <motion.div
          className="h-6 w-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md" style={{
            x: sx,
            y: sy,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}

      {/* Content */}
      <motion.div
        className="relative z-[20] flex h-full flex-col justify-center px-4 pb-28 pt-24 sm:px-8 lg:px-12"
        style={{ opacity: contentOpacity }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md"
            >
              {mode === 'tech' ? (
                <Code2 className="h-4 w-4 text-blue-300" aria-hidden />
              ) : (
                <Shield className="h-4 w-4 text-cyan-300" aria-hidden />
              )}
              <span className="font-cairo text-sm text-white/90">
                {mode === 'tech' ? 'منصات رقمية · تطوير · سحابة' : 'حماية · مراقبة · امتثال'}
              </span>
            </motion.div>

            <div className="relative min-h-[8.5rem] sm:min-h-[10rem]" aria-hidden>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: MODE_TRANSITION, ease: [0.4, 0, 0.2, 1] }}
                  className="font-cairo text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight text-white"
                  style={{
                    textShadow: '0 10px 60px rgba(0,0,0,0.6)',
                  }}
                >
                  <span className="block">{c.line1}</span>
                  <motion.span
                    className="block bg-gradient-to-l bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        mode === 'tech'
                          ? 'linear-gradient(90deg, #93c5fd, #e0f2fe, #38bdf8, #93c5fd)'
                          : 'linear-gradient(90deg, #22d3ee, #a5f3fc, #67e8f9, #22d3ee)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    {c.line2}
                  </motion.span>
                  <span className="mt-1 block text-[clamp(1.1rem,3.5vw,1.85rem)] font-semibold text-white/90">
                    {c.accent}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-stretch">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={`hidden w-px shrink-0 rounded-full sm:block ${mode === 'tech'
                  ? 'bg-gradient-to-b from-blue-400/90 via-blue-300/50 to-transparent shadow-[0_0_24px_rgb(59,130,246,0.6)]'
                  : 'bg-gradient-to-b from-cyan-400/90 via-cyan-300/50 to-transparent shadow-[0_0_24px_rgb(34,211,238,0.55)]'
                  }`}
                aria-hidden
              />
              <AnimatePresence mode="wait">
                <motion.p
                  key={mode + '-sub'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.65 }}
                  className="font-cairo max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
                  style={{ textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}
                >
                  {c.sub}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.75 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="#contact"
                className="relative overflow-hidden font-cairo inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-base font-semibold text-white group"
                style={{
                  background:
                    mode === 'tech'
                      ? 'linear-gradient(135deg, #2563eb, #38bdf8)'
                      : 'linear-gradient(135deg, #0891b2, #22d3ee)',
                }}
              >
                <span className="relative z-10">ابدأ مشروعك</span>

                {/* shine */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <span className="absolute -left-full top-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-full transition-all duration-700" />
                </span>
              </Link>
              <Link
                href="#services"
                className="font-cairo inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                استكشف الخدمات
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </Link>
            </motion.div>
          </div>

          {/* Floating card */}
          <motion.div
            className="relative mx-auto w-full max-w-sm lg:mx-0"
            style={{ y: floatParallax }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode + '-card'}
                initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: MODE_TRANSITION, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.05, rotateY: 6 }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className={`group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-1 shadow-2xl backdrop-blur-xl ${mode === 'tech'
                  ? 'shadow-[0_0_60px_rgba(59,130,246,0.25)]'
                  : 'shadow-[0_0_60px_rgba(34,211,238,0.3)]'
                  }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={mode === 'tech' ? TECH_CARD : SEC_CARD}
                    alt={mode === 'tech' ? 'لوحة تحليلات' : 'لوحة أمان'}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    aria-hidden
                  />
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-white/90">
                    <span className="font-cairo font-medium">
                      {mode === 'tech' ? 'تحليلات مباشرة' : 'حالة الأمان'}
                    </span>
                    <span className="rounded bg-white/15 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                      {mode === 'tech' ? 'LIVE' : 'SECURE'}
                    </span>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="font-cairo text-sm text-white/80">
                    {mode === 'tech'
                      ? 'لوحات تحكم وتكامل APIs لرؤية أوضح لأداء منصتك.'
                      : 'مراقبة التهديدات، سجلات التدقيق، وتنبيهات فورية.'}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
     {/*  <motion.div
  className="absolute bottom-8 left-1/2 z-[25] -translate-x-1/2 cursor-pointer"
  style={{ opacity: contentOpacity }}
  onClick={() => {
    const section = document.querySelector('#services');
    section?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  <motion.div
    animate={{ y: [0, 8, 0] }}
    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    className="flex h-11 w-7 items-start justify-center rounded-full border-2 border-white/35 pt-2"
  >
    <motion.span
      className="h-2 w-1 rounded-full bg-white/80"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </motion.div>
</motion.div> */}

    </section>
  );
}
