'use client';

import { Zap } from 'lucide-react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

function useNanoCardTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 20 });
  const shadowX = useTransform(x, [-0.5, 0.5], [-12, 12]);
  const shadowY = useTransform(y, [-0.5, 0.5], [-12, 12]);
  const cardGlow = useMotionTemplate`${shadowX}px ${shadowY}px 40px rgba(25, 211, 255, 0.1)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, cardGlow, handleMove, reset };
}

export function CTABanner() {
  const { rotateX, rotateY, cardGlow, handleMove, reset } = useNanoCardTilt();

  return (
    <section className="relative overflow-hidden bg-[#0A1023] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(25,211,255,0.1),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_100%_100%,rgba(11,94,215,0.14),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px]"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute left-0 top-1/3 h-24 w-1 rounded-full bg-cyan-400/20 blur-lg"
        animate={{ x: ['-30%', '130%'] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        aria-hidden
      />

      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-cyan-400/15 blur-sm"
          style={{
            width: 3 + (i % 3) * 2,
            height: 3 + (i % 3) * 2,
            top: `${((i * 13) % 92) + 4}%`,
            left: `${((i * 19) % 92) + 4}%`,
          }}
          animate={{
            x: [0, (i % 4) * 12 * (i % 2 === 0 ? 1 : -1), 0],
            y: [0, (i % 4) * 10 * (i % 3 === 0 ? 1 : -1), 0],
            opacity: [0.25, 0.65, 0.25],
          }}
          transition={{ repeat: Infinity, duration: 5.5 + (i % 4), ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-4xl perspective">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              boxShadow: cardGlow,
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-10 shadow-[0_12px_48px_rgba(6,26,64,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/25 md:px-10 md:py-12"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  'linear-gradient(145deg, rgba(25,211,255,0.08) 0%, transparent 40%, rgba(11,94,215,0.07) 100%)',
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-400/35 to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-cyan-400/0 transition group-hover:opacity-100 group-hover:ring-cyan-400/20" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-cyan-400/[0.04] opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10 text-center" style={{ transform: 'translateZ(20px)' }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 shadow-[0_0_20px_rgba(25,211,255,0.12)]">
                <Zap size={16} className="text-[#19D3FF]" />
                <span className="font-cairo text-sm font-semibold text-[#19D3FF]">ابدأ مشروعك الآن</span>
              </div>

              <h2 className="mb-6 font-cairo text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                هل أنت مستعد لتحويل
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                  عملك الرقمي؟
                </span>
              </h2>

              <p className="mx-auto mb-10 max-w-2xl font-cairo text-lg leading-relaxed text-[#9FB3C8] transition group-hover:text-[#b8c9d9]">
                دعنا نساعدك في بناء حضور رقمي قوي وآمن لعملك
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.a
                  href="#services"
                  className="inline-flex rounded-lg bg-gradient-to-r from-[#0B5ED7] to-cyan-500 px-8 py-4 font-cairo text-lg font-bold text-white shadow-[0_0_28px_rgba(25,211,255,0.2)] transition hover:shadow-[0_0_36px_rgba(25,211,255,0.35)]"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  اطلب استشارة مجانية
                </motion.a>
                <motion.a
                  href="#why-us"
                  className="inline-flex rounded-lg border-2 border-cyan-400/45 bg-transparent px-8 py-4 font-cairo text-lg font-bold text-cyan-200 shadow-[0_0_0_rgba(25,211,255,0)] transition hover:border-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_24px_rgba(25,211,255,0.2)]"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  تعرف على المزيد
                </motion.a>
              </div>

              <p className="mt-10 font-cairo text-sm text-[#9FB3C8]/90">
                استجابة سريعة • دعم فني 24/7 • حلول مخصصة لعملك
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
