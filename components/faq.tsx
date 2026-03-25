'use client';

import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    question: 'كم تستغرق عملية تطوير الموقع؟',
    answer: 'تختلف مدة المشروع حسب التعقيد، عادة ما تتراوح بين 4-12 أسبوعاً.'
  },
  {
    question: 'هل توفرون دعماً بعد الإطلاق؟',
    answer: 'نعم، نوفر دعماً فنياً شاملاً 24/7 مع صيانة دورية وتحديثات أمنية.'
  },
  {
    question: 'ما هي تكاليف خدماتكم؟',
    answer: 'نقدم عروض مخصصة لكل عميل حسب احتياجات المشروع والميزات المطلوبة.'
  },
  {
    question: 'هل تعملون مع شركات صغيرة؟',
    answer: 'نعم، نتعاون مع جميع أحجام الشركات من الناشئة إلى المؤسسات الكبيرة.'
  },
  {
    question: 'كيف تضمنون أمان البيانات؟',
    answer: 'نستخدم تشفير متقدم ونسخ احتياطية دورية وجدران نارية وتدقيق أمني منتظم.'
  },
];

function FAQItem({ item, index }: { item: typeof faqItems[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-right rounded-lg transition-all duration-300 flex items-center justify-between gap-4"
        style={{
          backgroundColor: isOpen ? 'rgba(11, 94, 215, 0.1)' : '#FFFFFF',
          border: `1px solid ${isOpen ? 'rgba(11, 94, 215, 0.3)' : 'rgba(11, 94, 215, 0.15)'}`,
        }}
      >
        <ChevronDown
          size={20}
          style={{
            color: '#0B5ED7',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 300ms'
          }}
        />
        <h3 className="font-cairo font-bold text-base sm:text-lg flex-1" style={{ color: '#061A40' }}>
          {item.question}
        </h3>
      </button>

      {isOpen && (
        <div className="p-6 rounded-b-lg" style={{ backgroundColor: '#F4F8FB', borderLeft: '1px solid rgba(11, 94, 215, 0.15)', borderRight: '1px solid rgba(11, 94, 215, 0.15)', borderBottom: '1px solid rgba(11, 94, 215, 0.15)' }}>
          <p className="font-cairo text-sm sm:text-base leading-relaxed" style={{ color: '#9FB3C8' }}>
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <div className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4F8FB' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#061A40' }}>
            الأسئلة الشائعة
          </h2>
          <p className="font-cairo text-lg" style={{ color: '#9FB3C8' }}>
            إجابات لأكثر الأسئلة التي يطرحها عملاؤنا
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem key={index} item={item} index={index} />
          ))}
        </div>

        {/* Contact CTA */}
        <div 
          className="mt-12 p-8 rounded-lg text-center transition-all"
          style={{
            backgroundColor: 'rgba(11, 94, 215, 0.1)',
            border: '1px solid rgba(11, 94, 215, 0.2)'
          }}
        >
          <h3 className="font-cairo text-xl font-bold mb-3" style={{ color: '#061A40' }}>
            لم تجد الإجابة التي تبحث عنها؟
          </h3>
          <p className="font-cairo mb-4" style={{ color: '#9FB3C8' }}>
            تواصل معنا مباشرة وسيجيب فريقنا على جميع أسئلتك
          </p>
          <button 
            className="px-8 py-2 text-white rounded-lg font-cairo font-semibold transition-all hover:shadow-lg"
            style={{ backgroundColor: '#0B5ED7' }}
          >
            تواصل معنا
          </button>
        </div>
      </div>
    </div>
  );
}
