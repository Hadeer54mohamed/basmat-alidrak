'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const reasons = [
  { title: 'خبرة عالية', description: 'فريق محترف بخبرات تقنية عميقة' },
  { title: 'حلول مخصصة', description: 'نحتاج احتياجات عملك الفريدة' },
  { title: 'دعم مستمر', description: 'دعم فني متواصل وسريع الاستجابة' },
  { title: 'أسعار منافسة', description: 'أفضل قيمة لاستثمارك التقني' },
];

type ParticleConfig = {
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
};

function Particle({ size, x, y, delay, duration }: ParticleConfig) {
  return (
    <motion.div
      className="absolute rounded-full bg-cyan-400/20"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: x,
        top: y,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.3, 0] }}
      transition={{ repeat: Infinity, duration, delay }}
    />
  );
}

function LightStreak() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
      style={{
        background:
          'linear-gradient(120deg, rgba(25,211,255,0.15) 0%, rgba(25,211,255,0) 50%, rgba(25,211,255,0.15) 100%)',
      }}
    />
  );
}

function Counter({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let current = 0;
        const interval = setInterval(() => {
          current += value / 30;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(interval);
          } else {
            setDisplayValue(Math.floor(current));
          }
        }, 30);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-cairo text-4xl font-bold mb-2 text-[#0B5ED7]">{displayValue}+</div>
      <p className="font-cairo text-sm text-[#9FB3C8]">{label}</p>
    </div>
  );
}

export function WhyUs() {
  const [particles, setParticles] = useState<ParticleConfig[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }, () => ({
        size: randomInt(4, 12),
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 2,
      })),
    );
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#0A1023] overflow-hidden">
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(25,211,255,0.05),transparent_60%)] pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <motion.div
        className="absolute top-1/4 left-0 w-2 h-32 bg-cyan-400/30 rounded-full blur-xl"
        animate={{ x: ['-50%', '150%'] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-1 h-24 bg-blue-400/20 rounded-full blur-lg"
        animate={{ x: ['50%', '-150%'] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
      />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative h-96 rounded-lg overflow-hidden ring-1 ring-cyan-400/15"
          initial={{ opacity: 0, y: 32, scale: 1.04 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ transform: 'translateZ(30px)' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              e.currentTarget.style.transform = `translateZ(30px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(30px) rotateX(0deg) rotateY(0deg)';
            }}
          >
            <Image src="/why-us-team.jpg" alt="فريقنا" fill className="object-cover" />
            <LightStreak />
          </motion.div>
        </motion.div>

        <div>
          <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white relative overflow-hidden">
            لماذا تختار <br />
            <span className="relative text-[#19D3FF]">
              بصمة الإدراك
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-300/50 via-blue-400/40 to-cyan-300/50 blur-xl"
                style={{ zIndex: -1 }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              />
            </span>
          </h2>

          <p className="font-cairo text-lg mb-8 leading-relaxed text-[#9FB3C8]">
            نحن نقدم حلولاً تقنية متكاملة مع فريق محترف مكرس لنجاح عملك
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                className="flex gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-cyan-400/10"
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle2 size={24} className="text-[#19D3FF] flex-shrink-0" />
                <div>
                  <h3 className="font-cairo font-bold text-white">{reason.title}</h3>
                  <p className="font-cairo text-xs mt-1 text-[#9FB3C8]">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: 'rgba(11, 94, 215, 0.2)' }}>
            <Counter value={50} label="مشروع منجز" />
            <Counter value={30} label="عميل راضي" />
            <Counter value={5} label="سنوات خبرة" />
          </div>
        </div>
      </div>
    </section>
  );
}
