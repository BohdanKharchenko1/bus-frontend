import Navbar from '../components/partials/Navbar.tsx';
import SearchForm from '../components/partials/SearchForm.tsx';
import Table from '../components/partials/Table.tsx';
import PromoSection from '../components/partials/PromoSection.tsx';
import Footer from '../components/partials/Footer.tsx';

export default function MainPage() {
  return (
    <>
      <Navbar />
      <SearchForm />
      <Table />
      <PromoSection />
      <Footer />
    </>
  );
}
