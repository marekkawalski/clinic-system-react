import Hero from '@/features/homepage/components/hero-section/Hero.tsx';
import FeaturesSection from '@/features/homepage/components/features-section/FeaturesSection.tsx';
import Footer from '@/shared/components/footer/Footer.tsx';

export default function Homepage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <Footer />
    </>
  );
}
