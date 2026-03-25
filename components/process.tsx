'use client';

import { CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'تحليل الاحتياجات',
    description: 'نفهم احتياجات عملك وأهدافك الرقمية'
  },
  {
    number: 2,
    title: 'التخطيط',
    description: 'نضع خطة مفصلة وواضحة لتحقيق أهدافك'
  },
  {
    number: 3,
    title: 'التطوير',
    description: 'نبني حلولك بأحدث التقنيات'
  },
  {
    number: 4,
    title: 'الاختبار',
    description: 'نختبر كل شيء ونتأكد من الأمان'
  },
  {
    number: 5,
    title: 'الإطلاق',
    description: 'نطلق منتجك ونوفر دعماً مستمراً'
  },
];

export function Process() {
  return (
    <div className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4F8FB' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#061A40' }}>
            عملية العمل لدينا
          </h2>
          <p className="font-cairo text-lg max-w-2xl mx-auto" style={{ color: '#9FB3C8' }}>
            خطوات بسيطة وواضحة لتحويل فكرتك إلى واقع
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div 
            className="hidden md:block absolute top-12 left-0 right-0 h-1"
            style={{ backgroundColor: 'rgba(11, 94, 215, 0.2)' }}
          />

          {/* Steps */}
          <div className="grid md:grid-cols-5 gap-6 md:gap-4 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                {/* Number circle */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-cairo font-bold text-lg"
                  style={{ backgroundColor: '#0B5ED7', color: '#FFFFFF' }}
                >
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="font-cairo font-bold text-lg mb-2" style={{ color: '#061A40' }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-cairo text-sm" style={{ color: '#9FB3C8' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
