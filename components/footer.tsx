'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, MessageCircle, Mail, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const COLORS = {
  bg: 'from-[#0B1E3A] via-[#0F2A4D] to-[#0B1E3A]',
  text: 'text-[#C7D2FE]/70',
  accent: '#56CCF2',
  accentText: 'text-[#56CCF2]',
  heading: 'text-[#EAF4FF]',
  separator: 'border-[#56CCF2]/10',
  modalHeader: 'bg-gradient-to-r from-[#0B1E3A] to-[#0F2A4D]',
};

const LOGO = {
  src: '/logo.png',
  alt: 'بصمة الإدراك',
  brandName: 'بصمة الإدراك',
  brandSub: 'Basmat Alidrak',
};

const DESCRIPTION =
  'حلول تقنية متقدمة لحماية وتطوير أعمالك الرقمية باستخدام أحدث التقنيات وأفضل معايير الأمان.';

const QUICK_LINKS = [
  { label: 'تطوير الويب', href: '#services' },
  { label: 'الأمان السيبراني', href: '#services' },
  { label: 'الاستضافة', href: '/hosting' },
  { label: 'تواصل معنا', href: '#contact' },
];

const COMPANY_LINKS = [
  { label: 'عن الشركة', href: '#why-us' },
  { label: 'فريقنا', href: '#why-us' },
  { label: 'المشاريع', href: '#process' },
  { label: 'الأسئلة الشائعة', href: '/#faq' },
];

const POLICIES: Record<string, { title: string; content: string[] }> = {
  privacy: {
    title: 'سياسة الخصوصية',
    content: [
      'نحن في بصمة الإدراك نلتزم بحماية خصوصيتك وبياناتك الشخصية وفقاً لأعلى المعايير الدولية.',
      'نقوم بجمع البيانات الضرورية فقط لتقديم خدماتنا وتحسين تجربتك، ولا نشارك بياناتك مع أطراف ثالثة دون موافقتك.',
      'يحق لك طلب حذف بياناتك أو تعديلها في أي وقت عبر التواصل مع فريق الدعم.',
    ],
  },
  terms: {
    title: 'الشروط والأحكام',
    content: [
      'باستخدامك لخدماتنا فإنك توافق على الالتزام بهذه الشروط والأحكام المنظمة لعلاقتنا معك.',
      'نحتفظ بالحق في تعديل أو تحديث هذه الشروط في أي وقت، وسيتم إشعارك بأي تغييرات جوهرية.',
      'يُحظر استخدام خدماتنا في أي نشاط مخالف للقوانين المحلية أو الدولية.',
    ],
  },
};

const CONTACT = {
  instagram: { url: 'https://instagram.com/', label: 'Instagram' },
  facebook: { url: 'https://facebook.com/', label: 'Facebook' },
  whatsapp: { number: '+966500000000', url: 'https://wa.me/966500000000', label: 'WhatsApp' },
  email: 'info@basmat.sa',
  address: 'الرياض، المملكة العربية السعودية',
};

const COPYRIGHT = { brand: 'بصمة الإدراك', year: new Date().getFullYear() };
const CREDIT = { name: 'ENS', url: 'https://ens.eg' };


export function Footer() {
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  const socialLinks = [
    { Icon: Instagram, href: CONTACT.instagram.url, label: CONTACT.instagram.label },
    { Icon: Facebook, href: CONTACT.facebook.url, label: CONTACT.facebook.label },
    { Icon: MessageCircle, href: CONTACT.whatsapp.url, label: CONTACT.whatsapp.label },
  ];

  return (
    <footer className={`relative overflow-hidden bg-gradient-to-br ${COLORS.bg}`}>
      <div
        className="absolute top-0 right-0 left-0 h-px"
        style={{
          background: `linear-gradient(to left, transparent, ${COLORS.accent}40, transparent)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${COLORS.accent}25, transparent 70%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
        <div className="mb-10 grid grid-cols-2 gap-8 sm:mb-14 md:grid-cols-4 md:gap-0">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="group mb-4 inline-flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-12 w-12 overflow-hidden rounded-xl shadow-[0_0_24px_rgba(86,204,242,0.3)] ring-1 ring-[rgba(86,204,242,0.2)]"
              >
                <Image src={LOGO.src} alt={LOGO.alt} width={48} height={48} className="h-full w-full object-cover" />
              </motion.div>
              <div>
                <div className={`font-cairo text-lg font-bold ${COLORS.accentText}`}>{LOGO.brandName}</div>
                <div className="font-cairo text-sm text-[#C7D2FE]/45">{LOGO.brandSub}</div>
              </div>
            </Link>
            <p className={`font-cairo text-sm leading-relaxed ${COLORS.text}`}>{DESCRIPTION}</p>

            {/* أيقونات التواصل الاجتماعي */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(86,204,242,0.2)] bg-[#56CCF2]/[0.06] text-[#56CCF2]/60 transition-colors duration-300 hover:border-[#56CCF2]/40 hover:bg-[#56CCF2]/15 hover:text-[#56CCF2]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="border-transparent md:border-r md:pl-6">
            <h3 className={`font-cairo mb-3 text-sm font-bold sm:mb-4 sm:text-lg ${COLORS.heading}`}>روابط سريعة</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`group relative inline-block font-cairo text-sm transition-colors duration-300 ${COLORS.text} hover:text-[#56CCF2]`}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 right-0 h-px w-0 bg-[#56CCF2] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-transparent md:border-r md:pl-6">
            <h3 className={`font-cairo mb-3 text-sm font-bold sm:mb-4 sm:text-lg ${COLORS.heading}`}>الشركة</h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`group relative inline-block font-cairo text-sm transition-colors duration-300 ${COLORS.text} hover:text-[#56CCF2]`}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 right-0 h-px w-0 bg-[#56CCF2] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
              {Object.entries(POLICIES).map(([key, policy]) => (
                <li key={key}>
                  <button
                    onClick={() => setActivePolicy(key)}
                    className={`group relative inline-block font-cairo text-sm transition-colors duration-300 ${COLORS.text} hover:text-[#56CCF2]`}
                  >
                    {policy.title}
                    <span className="absolute -bottom-1 right-0 h-px w-0 bg-[#56CCF2] transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 md:pl-6">
            <h3 className={`font-cairo mb-3 text-sm font-bold sm:mb-4 sm:text-lg ${COLORS.heading}`}>تواصل معنا</h3>
            <div className={`space-y-3 font-cairo text-sm ${COLORS.text}`}>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 transition-colors duration-300 hover:text-[#56CCF2]"
              >
                <Mail size={18} className="shrink-0 text-[#4FACFE]/70 transition-colors duration-300 hover:text-[#4FACFE]" />
                <span>{CONTACT.email}</span>
              </a>

              <a
                href={CONTACT.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors duration-300 hover:text-[#56CCF2]"
              >
                <MessageCircle size={18} className="shrink-0 text-[#4FACFE]/70 transition-colors duration-300 hover:text-[#4FACFE]" />
                <span dir="ltr">{CONTACT.whatsapp.number}</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#4FACFE]/70" />
                <span>{CONTACT.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t ${COLORS.separator} pt-6 sm:pt-8`}>
          <div className="flex flex-col items-center gap-2 text-center ">
            <p className="font-cairo text-sm text-[#C7D2FE]/45">© {COPYRIGHT.year} {COPYRIGHT.brand}. جميع الحقوق محفوظة</p>
            <p className="font-cairo text-lg font-base text-[#C7D2FE]/35">
              Designed & Developed by{' '}
              <a
                href={CREDIT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#56CCF2]/80 underline-offset-2 transition-colors duration-300 hover:text-[#56CCF2] hover:underline"
              >
                {CREDIT.name}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-20 blur-3xl"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${COLORS.accent}, transparent 70%)` }}
        aria-hidden
      />

      {/* Modal السياسات */}
      <AnimatePresence>
        {activePolicy && POLICIES[activePolicy] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setActivePolicy(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[rgba(86,204,242,0.15)] bg-[#0B1E3A] shadow-2xl max-h-[85vh] sm:max-h-none"
            >
              {/* هيدر المودال */}
              <div className={`flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 ${COLORS.modalHeader}`}>
                <h2 className={`font-cairo text-base font-bold sm:text-lg ${COLORS.heading}`}>
                  {POLICIES[activePolicy].title}
                </h2>
                <button
                  onClick={() => setActivePolicy(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#C7D2FE]/60 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                > 
                  <X size={18} />
                </button>
              </div>

              {/* محتوى المودال */}
              <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6" style={{ maxHeight: 'calc(85vh - 72px)' }}>
                <div className="space-y-4">
                  {POLICIES[activePolicy].content.map((paragraph, i) => (
                    <p key={i} className={`font-cairo text-sm leading-relaxed ${COLORS.text}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}