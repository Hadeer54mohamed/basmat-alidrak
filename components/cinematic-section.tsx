'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

type CinematicSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Light sections get soft top gradient wipe */
  variant?: 'light' | 'dark';
  showTopWipe?: boolean;
  style?: React.CSSProperties;
};

export function CinematicSection({
  children,
  className = '',
  id,
  variant = 'light',
  showTopWipe = true,
  style,
}: CinematicSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.35 });
  const yDecor = useTransform(smooth, [0, 1], ['8%', '-8%']);
  const yContent = useTransform(smooth, [0, 1], ['4%', '-4%']);
  const sectionOpacity = useTransform(smooth, [0, 0.15, 0.85, 1], [0.92, 1, 1, 0.94]);
  const sectionScale = useTransform(smooth, [0, 0.2, 0.8, 1], [0.985, 1, 1, 0.992]);

  const wipeFrom =
    variant === 'light'
      ? 'from-[#F4F8FB] via-[#F4F8FB]/70'
      : 'from-[#0A1023] via-[#0A1023]/70';

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity: sectionOpacity, scale: sectionScale, ...style }}
      className={`relative overflow-hidden ${className}`}
    >
      {showTopWipe && (
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b ${wipeFrom} to-transparent`}
          aria-hidden
        />
      )}
      <motion.div
        className="pointer-events-none absolute -inset-[20%] z-0 opacity-[0.07]"
        style={{ y: yDecor }}
        aria-hidden
      >
        <div
          className={`absolute inset-0 ${
            variant === 'light'
              ? 'bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(11,94,215,0.35),transparent)]'
              : 'bg-[radial-gradient(ellipse_70%_60%_at_20%_30%,rgba(25,211,255,0.2),transparent)]'
          }`}
        />
      </motion.div>
      <motion.div className="relative z-[2]" style={{ y: yContent }}>
        {children}
      </motion.div>
    </motion.section>
  );
}
