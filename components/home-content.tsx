'use client';

import { HeroModeProvider } from '@/components/hero-mode-context';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { CinematicSection } from '@/components/cinematic-section';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Services } from '@/components/services';
import { WhyUs } from '@/components/why-us';
import { Security } from '@/components/security';
import { Process } from '@/components/process';
import { FAQ } from '@/components/faq';
import { CTABanner } from '@/components/cta-banner';
import { Footer } from '@/components/footer';

export function HomeContent() {
  return (
    <HeroModeProvider>
      <div className="min-h-screen bg-[#F4F8FB]">
        <Navbar />
        <Hero />

        <div
          className="pointer-events-none relative z-[5] h-24 w-full bg-gradient-to-b from-[#050a12] via-[#0f172a]/95 to-[#F4F8FB]"
          aria-hidden
        />

        <CinematicSection id="services" variant="light" showTopWipe={false}>
          <ScrollReveal>
            <Services />
          </ScrollReveal>
        </CinematicSection>

        <CinematicSection id="why-us" variant="dark">
          <ScrollReveal>
            <WhyUs />
          </ScrollReveal>
        </CinematicSection>

        <CinematicSection id="security" variant="dark" showTopWipe>
          <ScrollReveal>
            <Security />
          </ScrollReveal>
        </CinematicSection>

        <CinematicSection id="process" variant="light">
          <ScrollReveal>
            <Process />
          </ScrollReveal>
        </CinematicSection>

        <CinematicSection id="faq" variant="light">
          <ScrollReveal>
            <FAQ />
          </ScrollReveal>
        </CinematicSection>

        <CinematicSection id="contact" variant="dark">
          <ScrollReveal>
            <CTABanner />
          </ScrollReveal>
        </CinematicSection>

        <Footer />
      </div>
    </HeroModeProvider>
  );
}
