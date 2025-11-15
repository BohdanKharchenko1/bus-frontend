import Navbar from '../components/partials/Navbar.tsx';
import BookingWizard from '../components/booking/BookingWizard.tsx';
import Footer from '../components/partials/Footer.tsx';

export default function BookingPage() {
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <BookingWizard />
      <Footer />
    </div>
  );
}
