'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A1023] overflow-hidden">

      {/* 🔷 Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1200 120" className="w-full h-16">
          <path
            d="M0,0V46.29c47.79,22,103.59,29,158,17C230,47,284,5,339,0s109,21,164,41,109,41,164,41,109-21,164-41,109-41,164-41,109,21,164,41V0Z"
            fill="#0A1023"
          />
        </svg>
      </div>

      {/* 🔵 Animated Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(25,211,255,0.25), transparent 60%)',
        }}
      />

      {/* 🔲 Grid overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="h-12 w-12 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(25,211,255,0.4)]"
              >
                <Image src="/logo.png" alt="logo" width={48} height={48} />
              </motion.div>

              <div>
                <div className="text-cyan-300 font-bold text-xl">بصمة الإدراك</div>
                <div className="text-white/50 text-sm">Basmat Alidrak</div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed">
              حلول تقنية متقدمة لحماية وتطوير أعمالك الرقمية باستخدام أحدث التقنيات.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-4">الخدمات</h3>
            {['تطوير الويب', 'الأمان السيبراني', 'الاستضافة', 'الدعم الفني'].map((item, i) => (
              <Link
                key={i}
                href="#"
                className="block text-white/60 hover:text-cyan-300 transition hover:translate-x-1 mb-2"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4">الشركة</h3>
            {['عن الشركة', 'فريقنا', 'المشاريع', 'المدونة'].map((item, i) => (
              <Link
                key={i}
                href="#"
                className="block text-white/60 hover:text-cyan-300 transition hover:translate-x-1 mb-2"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">التواصل</h3>

            <div className="space-y-3 text-white/60">
              <div className="flex items-center gap-2 hover:text-cyan-300 transition">
                <Mail size={18} className="text-cyan-400" />
                <span>info@basmat.sa</span>
              </div>

              <div className="flex items-center gap-2 hover:text-cyan-300 transition">
                <Phone size={18} className="text-cyan-400" />
                <span>+966 50 000 0000</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-cyan-400" />
                <span>الرياض، السعودية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cyan-400/10 pt-8">

          {/* Social */}
          <div className="flex justify-center gap-5 mb-6">
            {[Facebook, Linkedin, Twitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Bottom */}
          <div className="text-center space-y-2">
            <p className="text-white/40 text-sm">
              © {currentYear} بصمة الإدراك. جميع الحقوق محفوظة
            </p>

            <p className="text-white/30 text-base">
              Designed & Developed by{' '}
              <a
                href="https://ens.eg"
                target="_blank"
                className="text-cyan-300 hover:underline"
              >
                ENS
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}