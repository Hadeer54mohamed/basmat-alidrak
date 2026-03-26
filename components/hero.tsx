'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Code2 } from 'lucide-react';


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

const copy = {
  line1: 'انطلق نحو',
  line2: 'حلول رقمية ذكية',
  accent: 'بأمان وابتكار للمستقبل',
  sub:
    'في بصمة الإدراك، نحول أفكارك إلى منصات رقمية قوية وتجارب استثنائية، تجمع بين الأداء العالي، الأمان السيبراني، والتصميم الحديث لتنمو أعمالك بثقة.',
};

function Particles({ count }: { count: number }) {
  const color = 'rgba(59,130,246,0.45)';
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

function HudRings() {
  const stroke = 'rgba(59,130,246,0.25)';
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
  const { particleCount, lowEndDevice } = useHeroPerf();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.35]);
  const floatParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const c = copy;

  return (
    <section ref={heroRef} className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden pt-10">
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
          background: 'radial-gradient(circle at 70% 30%, rgba(59,130,246,0.25), transparent 60%)',
        }}
      />
      <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale, y: heroY }}>
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            ref={(el) => {
              if (el) el.playbackRate = 0.3; // خليناه ابطاء
            }}
          >
            <source src="/scroll.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/85 via-[#0b5ed7]/35 to-[#19d3ff]/25"
            aria-hidden
          />
        </div>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/25 via-transparent to-black/55"
        aria-hidden
      />

      <Particles count={particleCount} />
      {!lowEndDevice && <HudRings />}

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
              <Code2 className="h-4 w-4 text-blue-300" aria-hidden />
              <span className="font-cairo text-sm text-white/90">
                منصات رقمية · تطوير · سحابة
              </span>
            </motion.div>

            <div className="relative min-h-[7.25rem] sm:min-h-[8.75rem]">
              <motion.div
                initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
                className="font-cairo text-[clamp(2rem,6.75vw,4.5rem)] font-extrabold leading-[1.06] tracking-tight text-white"
                style={{
                  textShadow: '0 10px 60px rgba(0,0,0,0.6)',
                }}
              >
                <span className="block">{c.line1}</span>
                <motion.span
                  className="block bg-gradient-to-l bg-clip-text text-transparent pb-4"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #93c5fd, #e0f2fe, #38bdf8, #93c5fd)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  {c.line2}
                </motion.span>
                <span className="mt-2 block text-[clamp(0.95rem,3vw,1.55rem)] font-semibold text-[#C7D2FE]">
                  {c.accent}
                </span>
              </motion.div>
            </div>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-stretch">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="hidden w-px shrink-0 rounded-full sm:block bg-gradient-to-b from-blue-400/90 via-blue-300/50 to-transparent shadow-[0_0_24px_rgb(59,130,246,0.6)]"
                aria-hidden
              />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="font-cairo max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
                style={{ textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}
              >
                {c.sub}
              </motion.p>
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
                  background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
                }}
              >
                <span className="relative z-10">ابدأ مشروعك</span>

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

          <motion.div
            className="relative mx-auto w-full max-w-md sm:max-w-lg lg:mx-0 mt-30"
            style={{ y: floatParallax }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.05, rotateY: 6 }}
              style={{
                transformStyle: 'preserve-3d',
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-1 shadow-2xl backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.25)]"
            >
              <div className="relative aspect-[4/4] w-full overflow-hidden rounded-xl ">
                <Image
                  src="/service-web-dev.jpg"
                  alt="لوحة تحليلات"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 512px"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
              <div className="px-4 py-3 text-center">
                <p className="font-cairo text-sm text-white/80 font-bold">
                  نساعدك في تطوير أعمالك الرقمية باستخدام أحدث التقنيات.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
