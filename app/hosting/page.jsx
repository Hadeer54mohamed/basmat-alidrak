'use client';

import { useMemo, useEffect, useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Server, ShieldCheck, Shield, Clock, HardDrive, Database, Headset } from 'lucide-react';

function useHostingPerf() {
  const [particleCount, setParticleCount] = useState(18);
  const [lowEnd, setLowEnd] = useState(false);

  useEffect(() => {
    const w = window.innerWidth;
    const cores = navigator.hardwareConcurrency ?? 8;
    const conn = navigator.connection;
    const saveData = Boolean(conn?.saveData);
    const low = w < 768 || saveData || cores <= 4;
    setLowEnd(low);
    setParticleCount(low ? 12 : 18);
  }, []);

  return { particleCount, lowEnd };
}

function Particles({ count }) {
  const color = 'rgba(59,130,246,0.4)';
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (i * 37) % 100,
        y: (i * 23) % 100,
        d: 3 + (i % 5),
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
  const stroke = 'rgba(59,130,246,0.2)';
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -left-[8%] top-[22%] h-[min(38vw,280px)] w-[min(38vw,280px)] rounded-full border-2"
        style={{ borderColor: stroke }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-[5%] bottom-[15%] h-[min(32vw,240px)] w-[min(32vw,240px)] rounded-full border"
        style={{ borderColor: stroke }}
        animate={{ rotate: -360 }}
        transition={{ duration: 95, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pointer-events-none absolute left-[15%] bottom-[10%] h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3.2, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute right-[20%] top-[35%] h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)]"
        animate={{ scale: [1, 2, 1], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
    </>
  );
}

const standardImageOne = '/service-hosting.jpg';
const standardImageTwo = '/service-security.jpg';

const tags = ['SSD', 'أداء عالي', 'دعم 24/7', 'نسخ احتياطي'];

const features = [
  { icon: HardDrive, text: 'خوادم SSD سريعة' },
  { icon: ShieldCheck, text: 'حماية DDoS متقدمة' },
  { icon: Headset, text: 'دعم فني 24/7' },
  { icon: Database, text: 'نسخ احتياطي يومي' },
  { icon: Server, text: 'لوحة تحكم سهلة' },
  { icon: Clock, text: 'إعداد نطاقات متعددة' },
];

const progressBars = [
  { title: 'الاعتمادية', percent: 98 },
  { title: 'الأداء', percent: 95 },
];

const hostingPlans = [
  {
    title: 'استضافة أساسية',
    price: 'SAR 99/شهر',
    features: ['مساحة 10GB', 'نطاق واحد', 'دعم 24/7', 'نسخ احتياطي أسبوعي'],
    icon: Server,
  },
  {
    title: 'استضافة متقدمة',
    price: 'SAR 249/شهر',
    features: ['مساحة 50GB', '5 نطاقات', 'دعم VIP 24/7', 'نسخ احتياطي يومي'],
    icon: Database,
  },
  {
    title: 'استضافة آمنة',
    price: 'SAR 499/شهر',
    features: ['مساحة 100GB', 'نطاقات غير محدودة', 'حماية DDoS', 'نسخ احتياطي يومي + تشفير SSL'],
    icon: Shield,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HostingDetailsPage() {
  const { particleCount, lowEnd } = useHostingPerf();

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0B1E3A] via-[#0F2A4D] to-[#0B1E3A] text-[#EAF4FF]">
        <div
          className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.4), transparent 70%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-40 h-[400px] w-[400px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)' }}
          aria-hidden
        />

        <Particles count={particleCount} />
        {!lowEnd && <HudRings />}

        {/* Video Banner */}
        <motion.div
          className="relative w-full overflow-hidden"
          style={{ height: 'clamp(260px, 40vw, 400px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            ref={(el) => {
              if (el) el.playbackRate = 0.3;
            }}
          >
            <source src="/scroll.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3A] via-[#0B1E3A]/40 to-transparent" />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                <Server className="h-4 w-4 text-cyan-300" />
                <span className="font-cairo text-sm text-white/80">خدمات الاستضافة</span>
              </div>
              <h1 className="font-cairo text-3xl font-bold text-white md:text-5xl" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
                استضافة مواقع موثوقة وآمنة
              </h1>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Tags */}
          <motion.div
            className="mb-14 flex flex-wrap justify-center gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={fadeUp}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-1.5 font-cairo text-sm text-cyan-300 backdrop-blur-sm transition hover:bg-cyan-400/20"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Overview */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              className="mb-8 text-center font-cairo text-2xl font-bold md:text-3xl"
            >
              لمحة عن الخدمة
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                'نقدم لك استضافة مواقع عالية الأداء مع حماية قوية للبيانات، خوادم SSD سريعة، ودعم فني متواصل لضمان استمرارية عملك.',
                'إدارة سهلة للنطاقات والبريد الإلكتروني، لوحة تحكم احترافية، ونسخ احتياطي يومي للحفاظ على بياناتك بأمان.',
              ].map((text, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <p className="font-cairo text-sm leading-relaxed text-[#C7D2FE]/90 md:text-base">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features + Progress */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              className="mb-8 text-center font-cairo text-2xl font-bold md:text-3xl"
            >
              مميزات استضافة المواقع
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="grid grid-cols-2 gap-4">
                {features.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={fadeUp}
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:border-cyan-400/30 hover:bg-cyan-400/5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300 transition group-hover:bg-cyan-400/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-cairo text-sm text-[#C7D2FE]">{feat.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-col justify-center gap-6">
                {progressBars.map((prog, i) => (
                  <motion.div key={i} custom={i + 2} variants={fadeUp}>
                    <div className="mb-2 flex justify-between">
                      <span className="font-cairo text-sm font-semibold">{prog.title}</span>
                      <span className="font-cairo text-sm text-cyan-300">{prog.percent}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-l from-cyan-400 to-blue-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${prog.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="mb-16 grid gap-6 md:grid-cols-2">
            {[standardImageOne, standardImageTwo].map((img, i) => (
              <motion.div
                key={i}
                className="group overflow-hidden rounded-xl border border-white/10 shadow-lg"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                <Image
                  src={img}
                  alt={i === 0 ? 'خدمات الاستضافة' : 'بنية تحتية قوية'}
                  width={690}
                  height={328}
                  className="w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>

          {/* Closing Text */}
          <motion.div
            className="mx-auto mb-16 max-w-3xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="mb-3 font-cairo text-sm leading-relaxed text-[#C7D2FE]/90 md:text-base">
              مع خططنا المختلفة، يمكن لجميع العملاء بدء مواقعهم بسهولة مع أعلى معايير الأمان.
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="font-cairo text-sm leading-relaxed text-[#C7D2FE]/90 md:text-base">
              نوفر كل ما تحتاجه لإطلاق موقعك بسرعة وموثوقية، مع دعم مستمر لتلبية احتياجاتك الرقمية.
            </motion.p>
          </motion.div>

          {/* Hosting Plans */}
          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {hostingPlans.map((plan, i) => {
              const PlanIcon = plan.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-cyan-400/15 bg-white/[0.04] px-6 py-8 shadow-[0_12px_48px_rgba(11,30,58,0.45)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/35"
                >
                  <div className="mb-4 flex items-center justify-center text-[#56CCF2]">
                    <PlanIcon size={36} />
                  </div>
                  <h3 className="mb-2 text-center font-cairo text-xl font-bold text-[#EAF4FF]">{plan.title}</h3>
                  <p className="mb-4 text-center font-cairo text-sm text-[#C7D2FE]">{plan.price}</p>
                  <ul className="mb-6 space-y-2 font-cairo text-sm text-[#C7D2FE]/85">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[#56CCF2]">•</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.a
                    href="#contact"
                    className="mt-auto inline-flex rounded-lg bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] px-6 py-2 font-cairo text-sm font-bold text-white shadow-[0_0_28px_rgba(86,204,242,0.25)] transition hover:shadow-[0_0_36px_rgba(86,204,242,0.35)]"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  >
                    اختر الخطة
                  </motion.a>
                </motion.div>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="pb-4 text-center">
            <motion.a
              href="#contact"
              className="inline-flex rounded-lg bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] px-10 py-3 font-cairo text-sm font-bold text-white shadow-[0_0_28px_rgba(86,204,242,0.25)] transition hover:shadow-[0_0_36px_rgba(86,204,242,0.35)]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              اطلب استشارة مجانية
            </motion.a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
