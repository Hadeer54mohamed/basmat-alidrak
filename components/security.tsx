'use client';

import type { LucideIcon } from 'lucide-react';
import { Shield, Lock, Eye, Zap } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  { icon: Shield, title: 'حماية شاملة', description: 'نظام حماية متعدد الطبقات ضد جميع التهديدات' },
  { icon: Lock, title: 'تشفير متقدم', description: 'تشفير من الدرجة العسكرية لجميع البيانات' },
  { icon: Eye, title: 'مراقبة 24/7', description: 'مراقبة مستمرة والكشف الفوري عن التهديدات' },
  { icon: Zap, title: 'استجابة سريعة', description: 'فريق أمني متخصص للاستجابة الفورية' },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const shadowX = useTransform(x, [-0.5, 0.5], [-14, 14]);
  const shadowY = useTransform(y, [-0.5, 0.5], [-14, 14]);
  const cardGlow = useMotionTemplate`${shadowX}px ${shadowY}px 36px rgba(25, 211, 255, 0.08)`;

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="perspective"
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', boxShadow: cardGlow }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_8px_32px_rgba(6,26,64,0.25)] backdrop-blur-xl transition-all duration-300 will-change-transform hover:border-cyan-400/25"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              'linear-gradient(145deg, rgba(25,211,255,0.07) 0%, transparent 42%, rgba(11,94,215,0.06) 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-400/35 to-transparent" />

        <div
          className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 shadow-[0_0_22px_rgba(25,211,255,0.18)] transition group-hover:scale-110 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_28px_rgba(25,211,255,0.28)]"
          style={{ transform: 'translateZ(12px)' }}
        >
          <Icon size={24} className="text-cyan-300" />
        </div>

        <h3
          className="relative z-10 mb-2 font-cairo text-lg font-bold text-white transition group-hover:text-cyan-300"
          style={{ transform: 'translateZ(18px)' }}
        >
          {feature.title}
        </h3>

        <p
          className="relative z-10 font-cairo text-sm leading-relaxed text-white/60"
          style={{ transform: 'translateZ(14px)' }}
        >
          {feature.description}
        </p>

        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-cyan-400/0 transition group-hover:opacity-100 group-hover:ring-cyan-400/20" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-cyan-400/[0.04] opacity-0 transition group-hover:opacity-100" />
      </motion.div>
    </motion.div>
  );
}

export function Security() {
  return (
    <section className="relative overflow-hidden bg-[#0A1023] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(25,211,255,0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_80%,rgba(11,94,215,0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px]"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute left-0 top-1/4 h-32 w-1.5 rounded-full bg-cyan-400/25 blur-xl"
        animate={{ x: ['-40%', '120%'] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="font-cairo mb-3 text-xs font-semibold tracking-[0.18em] text-cyan-400/80">
            الأمان السيبراني
          </p>
          <h2 className="font-cairo mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              حلول الأمان والحماية
            </span>
          </h2>
          <p className="font-cairo mx-auto max-w-2xl text-lg text-[#9FB3C8]">
            نحمي بيانات عملك بأحدث تقنيات الأمان السيبراني
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
