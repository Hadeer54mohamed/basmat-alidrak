'use client';

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  { question: 'كم تستغرق عملية تطوير الموقع؟', answer: 'تختلف مدة المشروع حسب التعقيد، عادة ما تتراوح بين 4-12 أسبوعاً.' },
  { question: 'هل توفرون دعماً بعد الإطلاق؟', answer: 'نعم، نوفر دعماً فنياً شاملاً 24/7 مع صيانة دورية وتحديثات أمنية.' },
  { question: 'ما هي تكاليف خدماتكم؟', answer: 'نقدم عروض مخصصة لكل عميل حسب احتياجات المشروع والميزات المطلوبة.' },
  { question: 'هل تعملون مع شركات صغيرة؟', answer: 'نعم، نتعاون مع جميع أحجام الشركات من الناشئة إلى المؤسسات الكبيرة.' },
  { question: 'كيف تضمنون أمان البيانات؟', answer: 'نستخدم تشفير متقدم ونسخ احتياطية دورية وجدران نارية وتدقيق أمني منتظم.' },
  { question: 'هل يمكن تعديل الموقع بعد الإطلاق؟', answer: 'نعم، يمكننا تعديل الموقع وإضافة ميزات جديدة حسب احتياجاتك المستقبلية.' },
];

function useNanoCardTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const shadowX = useTransform(x, [-0.5, 0.5], [-14, 14]);
  const shadowY = useTransform(y, [-0.5, 0.5], [-14, 14]);
  const cardGlow = useMotionTemplate`${shadowX}px ${shadowY}px 36px rgba(11, 94, 215, 0.14), 0 0 28px rgba(25, 211, 255, 0.07)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, cardGlow, handleMove, reset, transformStyle: 'preserve-3d' as const };
}

const nanoCardLayers = (
  <>
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.45]"
      style={{
        background:
          'linear-gradient(135deg, rgba(25,211,255,0.06) 0%, transparent 45%, rgba(11,94,215,0.05) 100%)',
      }}
    />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-400/40 to-transparent" />
  </>
);

const nanoHoverOverlays = (
  <>
    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-cyan-400/0 transition group-hover:opacity-100 group-hover:ring-cyan-400/30" />
    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-cyan-400/[0.06] opacity-0 transition group-hover:opacity-100" />
  </>
);

function FAQItem({ item, index }: { item: (typeof faqItems)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { rotateX, rotateY, cardGlow, handleMove, reset, transformStyle } = useNanoCardTilt();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="perspective w-full sm:w-[48%]"
    >
      <motion.div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle, boxShadow: cardGlow }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[rgba(11,94,215,0.14)] bg-white/75 shadow-[0_4px_24px_rgba(6,26,64,0.06)] backdrop-blur-md transition-all duration-300 will-change-transform hover:border-cyan-400/35 hover:shadow-[0_8px_40px_rgba(25,211,255,0.12)]"
      >
        {nanoCardLayers}
        {nanoHoverOverlays}

        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={false}
          animate={{ opacity: isOpen ? 0.5 : 0 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#19D3FF]/60 shadow-[0_0_6px_rgba(25,211,255,0.35)]"
              style={{
                top: `${10 + i * 25}%`,
                left: `${10 + i * 25}%`,
              }}
              animate={{
                x: [0, 12 + i * 2, 0],
                y: [0, -8 - i, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.4, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>

        <div className="relative z-10 flex items-center justify-between p-4 sm:p-5" style={{ transform: 'translateZ(14px)' }}>
          <h3 className="font-cairo text-base font-bold text-[#061A40] transition-colors duration-300 group-hover:text-[#0B5ED7] sm:text-lg">
            {item.question}
          </h3>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={20} className="text-cyan-500 transition group-hover:text-[#0B5ED7]" />
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
              animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              exit={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="relative overflow-hidden border-t border-[#0B5ED7]/18 bg-[#F5FAFC]/90 px-4 pb-4 pt-3 font-cairo text-xs leading-relaxed text-[#3D5266] sm:px-5 sm:pb-5 sm:text-sm"
              style={{ transform: 'translateZ(10px)' }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sky-100/50 via-cyan-100/60 to-sky-100/50"
                animate={{ x: [0, 14, 0], opacity: [0.35, 0.55, 0.35] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <span className="relative z-10">{item.answer}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function FAQContactCard() {
  const { rotateX, rotateY, cardGlow, handleMove, reset, transformStyle } = useNanoCardTilt();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="perspective mt-8 w-full"
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle, boxShadow: cardGlow }}
        className="group relative overflow-hidden rounded-2xl border border-[rgba(11,94,215,0.14)] bg-white/75 p-6 text-center shadow-[0_4px_24px_rgba(6,26,64,0.06)] backdrop-blur-md transition-all duration-300 will-change-transform hover:border-cyan-400/35 hover:shadow-[0_8px_40px_rgba(25,211,255,0.12)] sm:p-8"
      >
        {nanoCardLayers}
        {nanoHoverOverlays}

        <div className="relative z-10 flex flex-col items-center gap-3" style={{ transform: 'translateZ(16px)' }}>
          <h3 className="font-cairo text-xl font-extrabold text-[#061A40] transition-colors duration-300 group-hover:text-[#0B5ED7]">
            لم تجد الإجابة التي تبحث عنها؟
          </h3>
          <p className="text-center text-base text-[#677482] transition-colors duration-300 group-hover:text-[#061A40]/80">
            تواصل معنا مباشرة وسيجيب فريقنا على جميع أسئلتك
          </p>
          <a
            href="#contact"
            className="inline-flex rounded-lg bg-gradient-to-r from-[#0B5ED7] to-cyan-500 px-8 py-2.5 font-cairo text-sm font-semibold text-white shadow-[0_0_24px_rgba(25,211,255,0.2)] transition hover:shadow-[0_0_32px_rgba(25,211,255,0.35)]"
          >
            تواصل معنا
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section className="relative overflow-hidden bg-[#F4F8FB] px-4 py-5 sm:px-6 md:py-8 lg:px-8">
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

      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
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

      <div className="relative z-10 mx-auto flex max-w-5xl flex-wrap justify-between gap-y-4">
        <div className="mb-6 w-full text-center">
          <p className="font-cairo mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B5ED7]/80">
            مركز المساعدة
          </p>
          <h2 className="font-cairo mb-2 text-2xl font-bold text-[#061A40] sm:text-3xl md:text-4xl">
            <span className="bg-gradient-to-r from-[#0B5ED7] via-cyan-600 to-[#19D3FF] bg-clip-text text-transparent">
              الأسئلة الشائعة
            </span>
          </h2>
          <p className="font-cairo mx-auto max-w-3xl text-base text-[#677482] sm:text-lg">
            إجابات لأكثر الأسئلة التي يطرحها عملاؤنا بطريقة تفاعلية وعصرية
          </p>
        </div>

        {faqItems.map((item, index) => (
          <FAQItem key={item.question} item={item} index={index} />
        ))}

        <FAQContactCard />
      </div>
    </section>
  );
}
