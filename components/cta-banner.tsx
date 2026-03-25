'use client';

import { Zap } from 'lucide-react';

export function CTABanner() {
  return (
    <div className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#0A1023' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            backgroundColor: 'rgba(25, 211, 255, 0.1)',
            border: '1px solid rgba(25, 211, 255, 0.3)'
          }}
        >
          <Zap size={16} style={{ color: '#19D3FF' }} />
          <span className="font-cairo text-sm" style={{ color: '#19D3FF' }}>ابدأ مشروعك الآن</span>
        </div>

        {/* Heading */}
        <h2 className="font-cairo text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#FFFFFF' }}>
          هل أنت مستعد لتحويل<br />
          <span style={{ color: '#19D3FF' }}>عملك الرقمي؟</span>
        </h2>

        {/* Description */}
        <p className="font-cairo text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#9FB3C8' }}>
          دعنا نساعدك في بناء حضور رقمي قوي وآمن لعملك
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            className="px-8 py-4 text-white rounded-lg font-cairo font-bold text-lg transition-all hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
            style={{ backgroundColor: '#0B5ED7' }}
          >
            اطلب استشارة مجانية
          </button>
          <button 
            className="px-8 py-4 rounded-lg font-cairo font-bold text-lg transition-all hover:scale-105"
            style={{ 
              border: '2px solid #0B5ED7',
              color: '#0B5ED7',
              backgroundColor: 'transparent'
            }}
          >
            تعرف على المزيد
          </button>
        </div>

        {/* Bottom text */}
        <p className="font-cairo text-sm mt-10" style={{ color: '#9FB3C8' }}>
          استجابة سريعة • دعم فني 24/7 • حلول مخصصة لعملك
        </p>
      </div>
    </div>
  );
}
