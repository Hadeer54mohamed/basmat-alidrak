'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code2, Server, Shield } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'تطوير الويب',
    description: 'مواقع ويب حديثة وتطبيقات ويب متقدمة مع أفضل التقنيات',
    image: '/service-web-dev.jpg'
  },
  {
    icon: Server,
    title: 'الاستضافة الآمنة',
    description: 'خوادم موثوقة وسريعة مع ضمان 99.9% متاحية',
    image: '/service-hosting.jpg'
  },
  {
    icon: Shield,
    title: 'حماية البيانات',
    description: 'حلول أمان شاملة لحماية بيانات عملك من التهديدات',
    image: '/service-security.jpg'
  },
];

export function Services() {
  return (
    <div className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4F8FB' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#061A40' }}>
            خدماتنا الرئيسية
          </h2>
          <p className="font-cairo text-lg max-w-2xl mx-auto" style={{ color: '#9FB3C8' }}>
            نقدم حلولاً تقنية متكاملة لتطوير ونمو عملك الرقمي
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(11, 94, 215, 0.15)',
                }}
              >
                {/* Image */}
                <motion.div
                  className="relative h-56 w-full overflow-hidden bg-gradient-to-br"
                  style={{ backgroundImage: 'linear-gradient(135deg, #0B5ED7, #19D3FF)' }}
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(11, 94, 215, 0.1)' }}>
                      <Icon size={24} style={{ color: '#0B5ED7' }} />
                    </div>
                  </div>
                  <h3 className="font-cairo text-xl font-bold mb-3" style={{ color: '#061A40' }}>
                    {service.title}
                  </h3>
                  <p className="font-cairo text-sm leading-relaxed" style={{ color: '#9FB3C8' }}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
