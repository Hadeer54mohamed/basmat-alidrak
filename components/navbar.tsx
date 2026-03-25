'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Code2, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroMode } from '@/components/hero-mode-context';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [showNav, setShowNav] = useState(true);

  const lastScrollRef = useRef(0);
  const { mode, toggleMode } = useHeroMode();
  const isTech = mode === 'tech';

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const prev = lastScrollRef.current;

      setIsScrolled(current > 50);
      setShowNav(current < prev || current < 48);
      lastScrollRef.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const el = visible[0]?.target as HTMLElement | undefined;
        if (el?.id) setActive(`#${el.id}`);
      },
      {
        root: null,
        rootMargin: '-88px 0px -42% 0px',
        threshold: [0, 0.06, 0.12, 0.2, 0.35],
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'الخدمات', href: '#services' },
    { label: 'حلول الأمان', href: '#security' },
    { label: 'العملية', href: '#process' },
    { label: 'التواصل', href: '#contact' },
  ];

  const navBarTint = isScrolled ? 'rgba(6, 26, 64, 0.88)' : 'rgba(6, 26, 64, 0.5)';
  const borderBottom = isTech
    ? '1px solid rgba(59, 130, 246, 0.22)'
    : '1px solid rgba(34, 211, 238, 0.22)';

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-transform duration-300 ease-out ${showNav ? 'translate-y-0' : '-translate-y-full'
        }`}
      style={{
        backgroundColor: navBarTint,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom,
        boxShadow: isScrolled
          ? '0 10px 40px rgba(0, 0, 0, 0.4)'
          : '0 4px 20px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-cyan-500/5 via-transparent to-blue-500/8"
        aria-hidden
      />

      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-sm" />

      <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:h-20 sm:gap-3">
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:flex-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              whileHover={{ scale: 1.06, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              className="h-9 w-9 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/20 shadow-[0_0_16px_rgba(25,211,255,0.18)] sm:h-11 sm:w-11 md:h-12 md:w-12"
            >
              <Image
                src="/logo.png"
                alt="بصمة الإدراك"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <div className="min-w-0 leading-tight">
              <div
                className="font-cairo truncate text-lg font-extrabold sm:text-xl md:text-2xl"
                style={{ color: isTech ? '#93c5fd' : '#67e8f9' }}
              >
                بصمة الإدراك
              </div>

              <div className="font-cairo truncate text-xs text-white/70 sm:text-sm md:text-base">
                Basmat Alidrak
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex md:flex-1 md:justify-center">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`font-cairo text-sm font-medium transition ${active === link.href ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                >
                  {link.label}
                </Link>
                {active === link.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-2 inset-x-0 mx-auto h-0.5 w-full max-w-[100%] rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.75)]"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={toggleMode}
              aria-label={isTech ? 'التبديل إلى وضع الأمان' : 'التبديل إلى وضع التطوير'}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-2 text-white transition hover:bg-white/10 sm:gap-2 sm:px-4"
            >
              {isTech ? (
                <Code2 className="h-4 w-4 shrink-0 text-blue-300" aria-hidden />
              ) : (
                <Shield className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
              )}
              <span className="font-cairo text-[10px] font-semibold sm:hidden">
                {isTech ? 'منصات' : 'أمان'}
              </span>
              <span className="font-cairo hidden text-xs font-semibold sm:inline">
                {isTech ? 'وضع المنصات' : 'وضع الأمان'}
              </span>
            </button>

            <motion.div
              className="relative hidden md:inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              <Link
                href="#contact"
                className="relative overflow-hidden rounded-xl px-5 py-2 font-cairo text-sm font-semibold text-white"
                style={{
                  backgroundImage: isTech
                    ? 'linear-gradient(135deg, #2563eb, #38bdf8)'
                    : 'linear-gradient(135deg, #0891b2, #22d3ee)',
                }}
              >
                <span className="pointer-events-none absolute inset-0 bg-white/10 opacity-20" />
                <span className="relative z-10">ابدأ الآن</span>
              </Link>
            </motion.div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-2 mb-3 space-y-1 rounded-xl border border-white/10 bg-[rgba(6,26,64,0.94)] p-3 shadow-xl backdrop-blur-xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-cairo block rounded-lg px-3 py-2.5 text-sm transition ${active === link.href
                        ? 'bg-white/10 text-white'
                        : 'text-white/85 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <motion.div
                  className="mt-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                >
                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-cairo block rounded-lg py-2.5 text-center text-sm font-semibold text-white"
                    style={{
                      backgroundColor: isTech ? '#2563eb' : '#0891b2',
                    }}
                  >
                    ابدأ الآن
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
