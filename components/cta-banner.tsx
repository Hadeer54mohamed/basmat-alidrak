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
  const cardGlow = useMotionTemplate`${shadowX}px ${shadowY}px 40px rgba(86, 204, 242, 0.12), 0 0 28px rgba(47, 128, 237, 0.08)`;

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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1E3A] via-[#0F2A4D] to-[#0B1E3A] px-4 py-12 sm:px-6 md:py-24 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(25,211,255,0.05),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute left-0 top-1/4 h-32 w-2 rounded-full bg-[#56CCF2]/30 blur-xl"
        animate={{ x: ['-50%', '150%'] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-1/3 right-0 h-24 w-1 rounded-full bg-[#2F80ED]/20 blur-lg"
        animate={{ x: ['50%', '-150%'] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        aria-hidden
      />

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-[#56CCF2]/20 blur-[1px]"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            top: `${((i * 13) % 92) + 4}%`,
            left: `${((i * 19) % 92) + 4}%`,
          }}
          animate={{
            x: [0, (i % 4) * 12 * (i % 2 === 0 ? 1 : -1), 0],
            y: [0, (i % 4) * 10 * (i % 3 === 0 ? 1 : -1), 0],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ repeat: Infinity, duration: 5.5 + (i % 4), ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-5xl perspective">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
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
            className="group relative overflow-hidden rounded-xl border border-[rgba(86,204,242,0.18)] bg-white/[0.04] px-4 py-6 shadow-[0_12px_48px_rgba(11,30,58,0.45)] ring-1 ring-[rgba(86,204,242,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-[#56CCF2]/35 md:px-6 md:py-8"
>
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  'linear-gradient(145deg, rgba(86,204,242,0.1) 0%, transparent 42%, rgba(47,128,237,0.08) 100%)',
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#56CCF2]/40 to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-[#56CCF2]/0 transition group-hover:opacity-100 group-hover:ring-[#56CCF2]/25" />
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-[#56CCF2]/[0.05] opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10 text-center" style={{ transform: 'translateZ(20px)' }}>
  {/* Badge */}
  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#56CCF2]/30 bg-[#56CCF2]/10 px-4 py-2 shadow-[0_0_20px_rgba(86,204,242,0.15)]">
    <Zap size={16} className="text-[#4FACFE]" />
    <span className="font-cairo text-xs font-semibold text-[#56CCF2]">ابدأ مشروعك الآن</span>
  </div>

  {/* Main Title */}
  <h2 className="mb-6 font-cairo text-2xl font-bold leading-tight text-[#EAF4FF] md:text-4xl">
    هل أنت مستعد لتحويل
    <br />
    <span className="relative inline-block text-[#56CCF2]">
      عملك الرقمي؟
      <motion.span
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#56CCF2]/45 via-[#2F80ED]/35 to-[#56CCF2]/45 blur-xl"
        animate={{ x: ['-30%', '30%'] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
        aria-hidden
      />
    </span>
  </h2>

  {/* Paragraph */}
  <p className="mx-auto mb-10 max-w-2xl font-cairo text-xs leading-relaxed text-[#C7D2FE] transition group-hover:text-[#DCE4FE] md:text-sm">
    دعنا نساعدك في بناء حضور رقمي قوي وآمن لعملك
  </p>

  {/* Buttons */}
  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
    <motion.a
      href="#services"
      className="inline-flex rounded-lg bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] px-8 py-3.5 font-cairo text-sm font-bold text-white shadow-[0_0_28px_rgba(86,204,242,0.25)] transition hover:shadow-[0_0_36px_rgba(86,204,242,0.35)] md:text-base"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    >
      اطلب استشارة مجانية
    </motion.a>
    <motion.a
      href="#why-us"
      className="inline-flex rounded-lg border-2 border-[#56CCF2]/45 bg-transparent px-8 py-3.5 font-cairo text-sm font-bold text-[#EAF4FF] shadow-none transition hover:border-[#56CCF2] hover:bg-[#56CCF2]/10 hover:shadow-[0_0_24px_rgba(86,204,242,0.2)] md:text-base"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    >
      تعرف على المزيد
    </motion.a>
  </div>

  {/* Footer Text */}
  <p className="mt-10 font-cairo text-[11px] text-[#C7D2FE]/95">
    استجابة سريعة • دعم فني 24/7 • حلول مخصصة لعملك
  </p>
</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
