'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const accent = 'text-[#56CCF2]';
const accentIcon = 'text-[#4FACFE]';
const muted = 'text-[#C7D2FE]/75';
const heading = 'font-cairo font-bold text-[#EAF4FF]';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0B1E3A] via-[#0F2A4D] to-[#0B1E3A]">
     

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(47,128,237,0.12), transparent 55%)',
        }}
        aria-hidden
      />

     

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.06, rotate: 4 }}
                className="h-12 w-12 overflow-hidden rounded-xl shadow-[0_0_28px_rgba(86,204,242,0.35)] ring-1 ring-[rgba(86,204,242,0.25)]"
              >
                <Image src="/logo.png" alt="logo" width={48} height={48} />
              </motion.div>

              <div>
                <div className={`font-cairo text-xl font-bold ${accent}`}>بصمة الإدراك</div>
                <div className="font-cairo text-sm text-[#C7D2FE]/55">Basmat Alidrak</div>
              </div>
            </Link>

            <p className={`font-cairo text-sm leading-relaxed ${muted}`}>
              حلول تقنية متقدمة لحماية وتطوير أعمالك الرقمية باستخدام أحدث التقنيات.
            </p>
          </div>

          <div>
            <h3 className={`mb-4 ${heading}`}>الخدمات</h3>
            {[
              { label: 'تطوير الويب', href: '#services' },
              { label: 'الأمان السيبراني', href: '#services' },
              { label: 'الاستضافة', href: '#services' },
              { label: 'تواصل معنا ', href: '#contact' },
            ].map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`mb-2 block font-cairo text-sm ${muted} transition hover:text-[#56CCF2] hover:opacity-100`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h3 className={`mb-4 ${heading}`}>الشركة</h3>
            {[
              { label: 'عن الشركة', href: '#why-us' },
              { label: 'فريقنا', href: '#why-us' },
              { label: 'المشاريع', href: '#process' },
              { label: 'الأسئلة الشائعة', href: '#faq' },
            ].map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`mb-2 block font-cairo text-sm ${muted} transition hover:text-[#56CCF2] hover:opacity-100`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h3 className={`mb-4 ${heading}`}>التواصل</h3>

            <div className={`space-y-3 font-cairo text-sm ${muted}`}>
              <a
                href="mailto:info@basmat.sa"
                className="flex items-center gap-2 transition hover:text-[#56CCF2]"
              >
                <Mail size={18} className={`shrink-0 ${accentIcon}`} />
                <span>info@basmat.sa</span>
              </a>

              <a href="tel:+966500000000" className="flex items-center gap-2 transition hover:text-[#56CCF2]">
                <Phone size={18} className={`shrink-0 ${accentIcon}`} />
                <span dir="ltr">+966 50 000 0000</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin size={18} className={`mt-0.5 shrink-0 ${accentIcon}`} />
                <span>الرياض، السعودية</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(86,204,242,0.12)] pt-8">
          <div className="mb-6 flex justify-center gap-4">
            {[Facebook, Linkedin, Twitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(86,204,242,0.28)] bg-[#56CCF2]/[0.08] text-[#56CCF2] shadow-none transition hover:border-[#56CCF2]/50 hover:bg-[#56CCF2]/15 hover:shadow-[0_0_20px_rgba(86,204,242,0.2)]"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          <div className="space-y-2 text-center">
            <p className="font-cairo text-sm text-[#C7D2FE]/50">
              © {currentYear} بصمة الإدراك. جميع الحقوق محفوظة
            </p>

            <p className="font-cairo text-sm text-[#C7D2FE]/40">
              Designed & Developed by{' '}
              <a
                href="https://ens.eg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#56CCF2] underline-offset-2 transition hover:text-[#4FACFE] hover:underline"
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
