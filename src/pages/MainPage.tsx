import Navbar from '../components/partials/Navbar.tsx';
import PromoSection from '../components/partials/PromoSection.tsx';
import Footer from '../components/partials/Footer.tsx';
import Header from '../components/partials/Header.tsx';
import About from '../components/partials/About.tsx';
import Reviews from '../components/partials/Reviews.tsx';
import Services from '../components/partials/Services.tsx';
import Step1 from '../components/booking/Step1.tsx';
import { useBookingStore } from '../stores/bookingStore.ts';

export default function MainPage() {
  const nextStep = useBookingStore((s) => s.nextStep);
  return (
    <>
      <Navbar />

      {/* HEADER */}
      <div className="relative">
        <Header />

        <div
          className="
            relative z-30
            -mt-72 sm:-mt-72 md:-mt-72 lg:-mt-48
          "
        >
          <Step1 onNext={nextStep} shouldRedirect={true} />
        </div>
      </div>

      <div className="relative z-10 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24">
        <Services />
      </div>

      <About />
      <Reviews />
      <PromoSection />
      <Footer />
    </>
  );
}
