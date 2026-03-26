'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { CinematicSection } from '@/components/cinematic-section';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Services } from '@/components/services';
import { WhyUs } from '@/components/why-us';
import { Process } from '@/components/process';
import { FAQ } from '@/components/faq';
import { CTABanner } from '@/components/cta-banner';
import { Footer } from '@/components/footer';

export function HomeContent() {
  return (
    <div className="min-h-screen bg-[#F4F8FB]">
      <Navbar />
      <Hero />

     {/*  <CinematicSection id="services" variant="light" showTopWipe={false}>
        <ScrollReveal>
          <Services />
        </ScrollReveal>
      </CinematicSection> */}

      <CinematicSection id="why-us" variant="dark">
        <ScrollReveal>
          <WhyUs />
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
  );
}
