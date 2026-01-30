import Navbar from '../components/partials/Navbar.tsx';
import BookingWizard from '../components/booking/BookingWizard.tsx';
import Footer from '../components/partials/Footer.tsx';

export default function BookingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 pb-10 sm:pb-12">
        <BookingWizard />
      </div>
      <Footer />
    </div>
  );
}
