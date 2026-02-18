import { useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturedCoursesSection from '../components/FeaturedCoursesSection';
import EbookStoreSection from '../components/EbookStoreSection';
import WhyChooseSection from '../components/WhyChooseSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingOffersSection from '../components/PricingOffersSection';
import WhatsAppBanner from '../components/WhatsAppBanner';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';

type Page = 'home' | 'downloads' | 'download-gate';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const coursesRef = useRef<HTMLDivElement>(null);
  const ebooksRef = useRef<HTMLDivElement>(null);

  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToEbooks = () => {
    ebooksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative">
      <Header onNavigate={onNavigate} />
      <main>
        <HeroSection onViewCourses={scrollToCourses} onBuyEbooks={scrollToEbooks} />
        <div ref={coursesRef}>
          <FeaturedCoursesSection />
        </div>
        <div ref={ebooksRef}>
          <EbookStoreSection />
        </div>
        <WhyChooseSection />
        <TestimonialsSection />
        <PricingOffersSection />
        <WhatsAppBanner />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
