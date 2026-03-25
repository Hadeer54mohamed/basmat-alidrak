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

  return { rotateX, rotateY, cardGlow, handleMove, reset, transformStyle: 'preserve-3d' as const };
}

const nanoCardLayers = (
  <>
    <div
      className="pointer-events-none absolute inset-0 opacity-50"
      style={{
        background:
          'linear-gradient(145deg, rgba(25,211,255,0.07) 0%, transparent 42%, rgba(11,94,215,0.06) 100%)',
      }}
    />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-400/35 to-transparent" />
  </>
);

const nanoHoverOverlays = (
  <>
    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-cyan-400/0 transition group-hover:opacity-100 group-hover:ring-cyan-400/20" />
    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-cyan-400/[0.04] opacity-0 transition group-hover:opacity-100" />
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
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_8px_32px_rgba(6,26,64,0.25)] backdrop-blur-xl transition-all duration-300 will-change-transform hover:border-cyan-400/25"
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
              className="absolute h-1 w-1 rounded-full bg-cyan-400/70"
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

        <div className="relative z-10 flex items-center justify-between p-6" style={{ transform: 'translateZ(14px)' }}>
          <h3 className="font-cairo text-lg font-bold text-gray-100 transition group-hover:text-cyan-200 sm:text-xl">
            {item.question}
          </h3>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={22} className="text-cyan-400 transition group-hover:text-cyan-300" />
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
              className="relative overflow-hidden border-t border-white/10 px-6 pb-6 font-cairo text-sm text-gray-300 sm:text-base"
              style={{ transform: 'translateZ(10px)' }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/15 to-blue-500/10"
                animate={{ x: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
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
      className="perspective mt-16 w-full"
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle, boxShadow: cardGlow }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-10 text-center shadow-[0_8px_32px_rgba(6,26,64,0.25)] backdrop-blur-xl transition-all duration-300 will-change-transform hover:border-cyan-400/25"
      >
        {nanoCardLayers}
        {nanoHoverOverlays}

        <div className="relative z-10 flex flex-col items-center gap-4" style={{ transform: 'translateZ(16px)' }}>
          <h3 className="font-cairo text-2xl font-extrabold text-white transition group-hover:text-cyan-300">
            لم تجد الإجابة التي تبحث عنها؟
          </h3>
          <p className="text-center text-lg text-gray-300 transition group-hover:text-gray-200">
            تواصل معنا مباشرة وسيجيب فريقنا على جميع أسئلتك
          </p>
          <a
            href="#contact"
            className="inline-flex rounded-lg bg-gradient-to-r from-[#0B5ED7] to-cyan-500 px-10 py-3 font-cairo font-semibold text-white shadow-[0_0_24px_rgba(25,211,255,0.2)] transition hover:shadow-[0_0_32px_rgba(25,211,255,0.35)]"
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
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-[#0f172a] to-gray-900 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-500/20"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              top: `${((i * 17) % 100) + (i % 7)}%`,
              left: `${((i * 23) % 100) + (i % 5)}%`,
            }}
            animate={{
              x: [0, (i % 5) * 28, 0],
              y: [0, -(i % 4) * 18, 0],
            }}
            transition={{ repeat: Infinity, repeatType: 'mirror', duration: 6 + (i % 5) }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-wrap justify-between gap-y-6">
        <div className="mb-12 w-full text-center">
          <h2 className="mb-4 font-cairo text-4xl font-extrabold text-cyan-400 sm:text-5xl md:text-6xl">
            الأسئلة الشائعة
          </h2>
          <p className="font-cairo text-lg text-gray-300 sm:text-xl">
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
