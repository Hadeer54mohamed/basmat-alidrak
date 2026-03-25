'use client';

import Image from 'next/image';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Code2, Server, Shield } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'تطوير الويب',
    description: 'مواقع وتطبيقات ويب حديثة بأعلى معايير الأداء والتجربة',
    image: '/service-web-dev.jpg'
  },
  {
    icon: Server,
    title: 'الاستضافة الآمنة',
    description: 'بنية تحتية قوية وسريعة مع ضمان استقرار عالي',
    image: '/service-hosting.jpg'
  },
  {
    icon: Shield,
    title: 'حماية البيانات',
    description: 'أنظمة أمان متقدمة لحماية بياناتك من التهديدات',
    image: '/service-security.jpg'
  },
];



const ServiceCard = ({ service, index }: any) => {
  const Icon = service.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  const lightX = useSpring(useTransform(x, [-0.5, 0.5], ['30%', '70%']), {
    stiffness: 150,
    damping: 20,
  });
  const lightY = useSpring(useTransform(y, [-0.5, 0.5], ['30%', '70%']), {
    stiffness: 150,
    damping: 20,
  });

  const lightGradient = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(255,255,255,0.18), transparent 60%)`;

  const handleMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    x.set(px - 0.5);
    y.set(py - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="perspective"
    >
      
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 will-change-transform"
      >
        {/* Image */}
        <motion.div
          className="relative h-56 overflow-hidden"
          style={{ transform: 'translateZ(20px)' }}
        >          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B1A] via-transparent to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="p-6 relative" style={{ transform: "translateZ(50px)" }}>
          
          <div className="mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/20 shadow-[0_0_20px_rgba(25,211,255,0.2)] group-hover:scale-110 transition">
              <Icon size={22} className="text-cyan-300" />
            </div>
          </div>

          <h3 className="font-cairo text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition">
            {service.title}
          </h3>

          <p className="font-cairo text-sm leading-relaxed text-white/60">
            {service.description}
          </p>
        </div>

        {/* Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none border border-cyan-400/30 rounded-2xl" />
      </motion.div>
    </motion.div>
  );
};

export function Services() {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#070B1A] overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(25,211,255,0.15),transparent_60%)] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            خدماتنا الرئيسية
          </h2>

          <p className="font-cairo text-lg max-w-2xl mx-auto text-white/60">
            حلول تقنية متقدمة لدعم وتحسين أداء أعمالك الرقمية
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}