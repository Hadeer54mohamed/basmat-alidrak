'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#0A1023', borderTop: '1px solid rgba(25, 211, 255, 0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link href="#" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.png"
                  alt="بصمة الإدراك"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <div>
                <div className="font-cairo font-bold" style={{ color: '#19D3FF' }}>بصمة</div>
                <div className="font-cairo text-xs" style={{ color: '#9FB3C8' }}>الإدراك</div>
              </div>
            </Link>
            <p className="font-cairo text-sm leading-relaxed mb-4" style={{ color: '#9FB3C8' }}>
              حلول تقنية متكاملة لدعم نمو عملك الرقمي بأمان وكفاءة
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-cairo font-bold mb-4" style={{ color: '#FFFFFF' }}>الخدمات</h3>
            <div className="space-y-2">
              {['تطوير الويب', 'الاستضافة', 'الأمان', 'الدعم الفني'].map((link, i) => (
                <Link
                  key={i}
                  href="#"
                  className="font-cairo text-sm block transition-colors hover:text-blue-400"
                  style={{ color: '#9FB3C8' }}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-cairo font-bold mb-4" style={{ color: '#FFFFFF' }}>الشركة</h3>
            <div className="space-y-2">
              {['عن الشركة', 'فريقنا', 'المشاريع', 'المدونة'].map((link, i) => (
                <Link
                  key={i}
                  href="#"
                  className="font-cairo text-sm block transition-colors hover:text-blue-400"
                  style={{ color: '#9FB3C8' }}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-cairo font-bold mb-4" style={{ color: '#FFFFFF' }}>التواصل</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail size={18} style={{ color: '#19D3FF' }} />
                <a href="mailto:info@basmat.sa" className="font-cairo text-sm" style={{ color: '#9FB3C8' }}>
                  info@basmat.sa
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} style={{ color: '#19D3FF' }} />
                <a href="tel:+966500000000" className="font-cairo text-sm" style={{ color: '#9FB3C8' }}>
                  +966 50 000 0000
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} style={{ color: '#19D3FF' }} />
                <span className="font-cairo text-sm" style={{ color: '#9FB3C8' }}>الرياض، السعودية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(25, 211, 255, 0.1)', paddingTop: '2rem' }}>
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            {[
              { icon: Facebook, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Twitter, href: '#' },
            ].map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(25, 211, 255, 0.1)',
                    border: '1px solid rgba(25, 211, 255, 0.3)',
                    color: '#19D3FF'
                  }}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          {/* Bottom text */}
          <div className="text-center">
            <p className="font-cairo text-sm" style={{ color: '#9FB3C8' }}>
              © {currentYear} بصمة الإدراك. جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
