'use client';

import { Shield, Lock, Eye, Zap } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'حماية شاملة',
    description: 'نظام حماية متعدد الطبقات ضد جميع التهديدات'
  },
  {
    icon: Lock,
    title: 'تشفير متقدم',
    description: 'تشفير من الدرجة العسكرية لجميع البيانات'
  },
  {
    icon: Eye,
    title: 'مراقبة 24/7',
    description: 'مراقبة مستمرة والكشف الفوري عن التهديدات'
  },
  {
    icon: Zap,
    title: 'استجابة سريعة',
    description: 'فريق أمني متخصص للاستجابة الفورية'
  },
];

export function Security() {
  return (
    <div className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0A1023' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            حلول الأمان والحماية
          </h2>
          <p className="font-cairo text-lg max-w-2xl mx-auto" style={{ color: '#9FB3C8' }}>
            نحمي بيانات عملك بأحدث تقنيات الأمان السيبراني
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: 'rgba(11, 94, 215, 0.15)',
                  border: '1px solid rgba(25, 211, 255, 0.3)',
                }}
              >
                <div className="p-3 rounded-lg w-fit mb-4" style={{ backgroundColor: 'rgba(11, 94, 215, 0.3)' }}>
                  <Icon size={28} style={{ color: '#19D3FF' }} />
                </div>
                <h3 className="font-cairo text-lg font-bold mb-2" style={{ color: '#FFFFFF' }}>
                  {feature.title}
                </h3>
                <p className="font-cairo text-sm leading-relaxed" style={{ color: '#9FB3C8' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
