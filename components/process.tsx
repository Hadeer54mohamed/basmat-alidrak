'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Step = {
  number: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  { number: 1, title: 'تحليل الاحتياجات', description: 'نفهم احتياجات عملك وأهدافك الرقمية' },
  { number: 2, title: 'التخطيط', description: 'نضع خطة مفصلة وواضحة لتحقيق أهدافك' },
  { number: 3, title: 'التطوير', description: 'نبني حلولك بأحدث التقنيات' },
  { number: 4, title: 'الاختبار', description: 'نختبر كل شيء ونتأكد من الأمان' },
  { number: 5, title: 'الإطلاق', description: 'نطلق منتجك ونوفر دعماً مستمراً' },
];

/** مسار بيزير مزدوج بانحناء متعاكس لإحساس تدفق بيانات خفيف */
function buildWavyFlowPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 4) return `M ${x1} ${y1} L ${x2} ${y2}`;

  const nScale = Math.min(18, len * 0.22);
  const px = (-dy / len) * nScale;
  const py = (dx / len) * nScale;

  const c1x = x1 + (mx - x1) * 0.55 + px;
  const c1y = y1 + (my - y1) * 0.55 + py;
  const c2x = x1 + (mx - x1) * 0.45 + px * 0.35;
  const c2y = y1 + (my - y1) * 0.45 + py * 0.35;

  const c3x = mx + (x2 - mx) * 0.45 - px * 0.35;
  const c3y = my + (y2 - my) * 0.45 - py * 0.35;
  const c4x = mx + (x2 - mx) * 0.55 - px;
  const c4y = my + (y2 - my) * 0.55 - py;

  return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${mx} ${my} C ${c3x} ${c3y}, ${c4x} ${c4y}, ${x2} ${y2}`;
}

const StepCard = ({ step }: { step: Step }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 22 });
  const shadowX = useTransform(x, [-0.5, 0.5], [-22, 22]);
  const shadowY = useTransform(y, [-0.5, 0.5], [-22, 22]);
  const cardShadow = useMotionTemplate`${shadowX}px ${shadowY}px 36px rgba(11, 94, 215, 0.14), 0 0 28px rgba(25, 211, 255, 0.07)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        boxShadow: cardShadow,
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="perspective relative group w-full max-w-[280px] cursor-pointer overflow-hidden rounded-2xl border border-[rgba(11,94,215,0.14)] bg-white/75 p-6 shadow-[0_4px_24px_rgba(6,26,64,0.06)] backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-cyan-400/35 hover:shadow-[0_8px_40px_rgba(25,211,255,0.12)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          background:
            'linear-gradient(135deg, rgba(25,211,255,0.06) 0%, transparent 45%, rgba(11,94,215,0.05) 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-400/40 to-transparent" />

      <motion.div
        className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-[#19D3FF]/70 shadow-[0_0_8px_rgba(25,211,255,0.6)]"
        animate={{ x: ['-20%', '20%'], y: ['-20%', '20%'], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, repeatType: 'mirror', duration: 3 + step.number * 0.2 }}
      />
      <motion.div
        className="absolute left-4 bottom-8 h-1 w-1 rounded-full bg-[#0B5ED7]/50"
        animate={{ x: ['10%', '-10%'], y: ['10%', '-10%'] }}
        transition={{ repeat: Infinity, repeatType: 'mirror', duration: 2 + step.number * 0.2 }}
      />

      <div
        className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B5ED7] to-cyan-500 font-cairo text-2xl font-bold text-white shadow-[0_0_24px_rgba(25,211,255,0.25)] transition-all duration-300 group-hover:shadow-[0_0_32px_rgba(25,211,255,0.4)]"
      >
        {step.number}
      </div>

      <h3 className="relative z-10 mb-2 font-cairo text-xl font-extrabold text-[#061A40] transition-colors duration-300 group-hover:text-[#0B5ED7]">
        {step.title}
      </h3>

      <p className="relative z-10 font-cairo text-sm leading-relaxed text-[#9FB3C8]">{step.description}</p>

      <motion.div
        className="relative z-10 mx-auto mt-4 flex justify-center text-cyan-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 + step.number * 0.1, type: 'spring', stiffness: 120 }}
      >
        <CheckCircle2 size={28} />
      </motion.div>
    </motion.div>
  );
};

type ConnectorPath = { d: string; key: string };

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<ConnectorPath[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const measureConnectors = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const t = track.getBoundingClientRect();
    const next: ConnectorPath[] = [];

    for (let i = 0; i < steps.length - 1; i++) {
      const a = cardRefs.current[i];
      const b = cardRefs.current[i + 1];
      if (!a || !b) continue;

      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();

      const x1 = ar.left + ar.width / 2 - t.left;
      const y1 = ar.top + ar.height / 2 - t.top;
      const x2 = br.left + br.width / 2 - t.left;
      const y2 = br.top + br.height / 2 - t.top;

      next.push({ d: buildWavyFlowPath(x1, y1, x2, y2), key: `flow-${i}` });
    }

    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    measureConnectors();
    const track = trackRef.current;
    if (!track) return undefined;

    const ro = new ResizeObserver(() => measureConnectors());
    ro.observe(track);

    window.addEventListener('resize', measureConnectors);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureConnectors);
    };
  }, [measureConnectors]);

  return (
    <section className="relative overflow-hidden bg-[#F4F8FB] px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_0%,rgba(11,94,215,0.09),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(25,211,255,0.06),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(11,94,215,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,94,215,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="font-cairo mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B5ED7]/80">
            مسار التنفيذ
          </p>
          <h2 className="font-cairo mb-4 text-3xl font-bold text-[#061A40] sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-[#0B5ED7] via-cyan-600 to-[#19D3FF] bg-clip-text text-transparent">
              عملية العمل لدينا
            </span>
          </h2>
          <p className="font-cairo mx-auto max-w-3xl text-lg text-[#9FB3C8]">
            خطوات واضحة ومتصلة لتحويل فكرتك إلى واقع بطريقة مبتكرة وسينمائية
          </p>
        </div>

        <div
          ref={trackRef}
          className="relative flex flex-col items-center gap-12 md:flex-row md:flex-wrap md:justify-center md:items-stretch md:gap-x-6 md:gap-y-14 lg:gap-x-8"
        >
          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id="process-flow-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#19D3FF" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#0B5ED7" stopOpacity="1" />
                <stop offset="100%" stopColor="#19D3FF" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            {paths.map((p, i) => (
              <g key={p.key}>
                <motion.path
                  d={p.d}
                  stroke="rgba(25, 211, 255, 0.35)"
                  strokeWidth={5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.9 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    pathLength: { duration: 1.05, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.35, delay: i * 0.1 },
                  }}
                  style={{
                    filter:
                      hoverIndex === i || hoverIndex === i + 1
                        ? 'drop-shadow(0 0 14px rgba(25,211,255,0.55))'
                        : 'none',
                    transition: 'filter 0.2s',
                  }}
                />
                <motion.path
                  d={p.d}
                  stroke="url(#process-flow-line)"
                  strokeWidth={2.5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="6 14"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  animate={{ strokeDashoffset: [0, -56] }}
                  transition={{
                    pathLength: { duration: 1.05, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.35, delay: i * 0.1 },
                    strokeDashoffset: { repeat: Infinity, duration: 2.4, ease: 'linear', delay: 0.6 + i * 0.08 },
                  }}
                  style={{
                    filter:
                      hoverIndex === i || hoverIndex === i + 1
                        ? 'drop-shadow(0 0 12px rgba(11,94,215,0.45))'
                        : 'none',
                    transition: 'filter 0.2s',
                  }}
                />
              </g>
            ))}
          </svg>

          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="relative z-[2] flex w-full justify-center md:w-auto md:max-w-[min(100%,280px)]"
            >
              <StepCard step={step} />
            </div>
          ))}
        </div>
      </div>

      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + (i % 3) * 2,
            height: 3 + (i % 3) * 2,
            backgroundColor: i % 2 === 0 ? 'rgba(25,211,255,0.2)' : 'rgba(11,94,215,0.12)',
            boxShadow: i % 2 === 0 ? '0 0 12px rgba(25,211,255,0.25)' : 'none',
            top: `${i * 9 + 6}%`,
            left: `${i * 8 + 2}%`,
          }}
          animate={{ x: [0, (i + 1) * 40], y: [0, -(i + 1) * 22] }}
          transition={{ repeat: Infinity, repeatType: 'mirror', duration: 7 + i * 0.4 }}
        />
      ))}
    </section>
  );
}