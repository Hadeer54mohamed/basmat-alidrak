'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Palette,
  Code2,
  Mail,
  Server,
  Gamepad2,
  Smartphone,
  Video,
  Monitor,
} from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [showNav, setShowNav] = useState(true);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > 50);
      setShowNav(current < lastScrollRef.current || current < 48);
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
      { rootMargin: '-88px 0px -42% 0px', threshold: [0, 0.1, 0.2, 0.3] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    {
      label: 'خدمات الويب',
      href: '#services',
      icon: Globe,
      subLinks: [
        { label: 'استضافة المواقع', href: '#hosting', icon: Server },
        { label: 'استضافة الموزعين', href: '#distributor-hosting', icon: Server },
        { label: 'السيرفرات الخاصة', href: '#private-servers', icon: Server },
        { label: 'البريد الإلكتروني', href: '#email-services', icon: Mail },
      ],
    },
    {
      label: 'خدمات التصميم',
      href: '#design-services',
      icon: Palette,
      subLinks: [
        { label: 'تصميم الويب', href: '#web-design', icon: Monitor },
        { label: 'تصميم الألعاب', href: '#game-design', icon: Gamepad2 },
        { label: 'تصميم التطبيقات', href: '#app-design', icon: Smartphone },
        { label: 'تصميم الفيديوهات', href: '#video-design', icon: Video },
      ],
    },
    {
      label: 'البرمجة والتطوير',
      href: '#development',
      icon: Code2,
      subLinks: [
        { label: 'برمجة الألعاب', href: '#game-development', icon: Gamepad2 },
        { label: 'برمجة التطبيقات', href: '#app-development', icon: Smartphone },
        { label: 'برمجة الويب', href: '#web-development', icon: Monitor },
      ],
    },
    {
      label: 'التواصل',
      href: '#contact',
      icon: Mail,
    },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-transform duration-300 ${
        showNav ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* 🔥 Glass + Gradient Layer */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: isScrolled
            ? 'linear-gradient(to bottom, rgba(6,26,64,0.85), rgba(6,26,64,0.65))'
            : 'linear-gradient(to bottom, rgba(6,26,64,0.55), rgba(6,26,64,0.25))',
          borderBottom: '1px solid rgba(59,130,246,0.25)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        }}
      />

      {/* subtle glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 py-1">
        <div className="flex h-20 md:h-24 items-center justify-between">

          {/* Logo */}
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
                className="font-cairo truncate text-base font-extrabold sm:text-lg md:text-xl"
                style={{ color: '#93c5fd' }}
              >
                بصمة الإدراك
              </div>
              <div className="font-cairo truncate text-xs text-white/70 sm:text-sm">
                Basmat Alidrak
              </div>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">

                <div className="flex items-center gap-2 cursor-pointer group">
                  <link.icon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition" />

                  <Link
                    href={link.href}
                    className={`relative text-sm transition ${
                      active === link.href
                        ? 'text-white after:w-full'
                        : 'text-white/70 hover:text-white after:w-0 hover:after:w-full'
                    } after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-blue-400 after:transition-all`}
                  >
                    {link.label}
                  </Link>

                  {link.subLinks && (
                    <ChevronDown className="h-4 w-4 text-white/60 group-hover:rotate-180 transition" />
                  )}
                </div>

                {link.subLinks && (
                  <div className="absolute top-full left-0 min-w-[180px] rounded-lg bg-[rgba(6,26,64,0.95)] p-2 shadow-lg z-50 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded"
                      >
                        <sub.icon className="h-4 w-4 text-blue-300" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">

            {/* CTA */}
            <motion.div
              className="hidden md:inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                href="#contact"
                className="relative overflow-hidden rounded-xl px-5 py-2 text-sm font-semibold text-white"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #2563eb, #38bdf8)',
                }}
              >
                <span className="absolute inset-0 bg-white/10 opacity-20" />
                <span className="relative z-10">ابدأ الآن</span>
              </Link>
            </motion.div>

            {/* Mobile btn */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-2 bg-[rgba(6,26,64,0.95)] p-3 rounded-xl"
            >
              {navLinks.map((link) => (
                <div key={link.href}>

                  <div
                    onClick={() =>
                      link.subLinks
                        ? setOpenMobileMenu(openMobileMenu === link.label ? null : link.label)
                        : setIsMobileMenuOpen(false)
                    }
                    className="flex justify-between items-center px-3 py-2 text-white cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <link.icon className="h-4 w-4 text-blue-400" />
                      {link.label}
                    </div>

                    {link.subLinks && (
                      <ChevronDown
                        className={`transition ${
                          openMobileMenu === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>

                  {link.subLinks && openMobileMenu === link.label && (
                    <div className="pl-4 border-l border-blue-500/20">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex items-center gap-2 px-3 py-2 text-white/80"
                        >
                          <sub.icon className="h-4 w-4 text-blue-300" />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <motion.div className="mt-3">
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center rounded-lg py-2.5 text-sm font-semibold text-white bg-blue-600"
                >
                  ابدأ الآن
                </Link>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}