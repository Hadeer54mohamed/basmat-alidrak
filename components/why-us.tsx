'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const reasons = [
  { title: 'خبرة عالية', description: 'فريق محترف بخبرات تقنية عميقة' },
  { title: 'حلول مخصصة', description: 'نحتاج احتياجات عملك الفريدة' },
  { title: 'دعم مستمر', description: 'دعم فني متواصل وسريع الاستجابة' },
  { title: 'أسعار منافسة', description: 'أفضل قيمة لاستثمارك التقني' },
];

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
      <div className="font-cairo text-4xl font-bold mb-2" style={{ color: '#0B5ED7' }}>
        {displayValue}+
      </div>
      <p className="font-cairo text-sm" style={{ color: '#9FB3C8' }}>
        {label}
      </p>
    </div>
  );
}

export function WhyUs() {
  return (
    <div className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0A1023' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            className="relative h-96 rounded-lg overflow-hidden order-2 md:order-1 ring-1 ring-cyan-400/15"
            initial={{ opacity: 0, y: 32, scale: 1.04 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/why-us-team.jpg"
                alt="فريقنا"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <div className="order-1 md:order-2">
            <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
              لماذا تختار<br />
              <span style={{ color: '#19D3FF' }}>بصمة الإدراك</span>
            </h2>

            <p className="font-cairo text-lg mb-8 leading-relaxed" style={{ color: '#9FB3C8' }}>
              نحن نقدم حلولاً تقنية متكاملة مع فريق محترف مكرس لنجاح عملك
            </p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2 size={24} style={{ color: '#19D3FF', flexShrink: 0 }} />
                  <div>
                    <h3 className="font-cairo font-bold" style={{ color: '#FFFFFF' }}>
                      {reason.title}
                    </h3>
                    <p className="font-cairo text-xs mt-1" style={{ color: '#9FB3C8' }}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: 'rgba(11, 94, 215, 0.2)' }}>
              <Counter value={50} label="مشروع منجز" />
              <Counter value={30} label="عميل راضي" />
              <Counter value={5} label="سنوات خبرة" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
