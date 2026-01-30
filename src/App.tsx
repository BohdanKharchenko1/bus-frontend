import './App.css';

import '../src/lib/i18n.ts';
import BookingPage from '../src/pages/BookingPage.tsx';
import { Toaster } from 'sonner';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage.tsx';
import MainPage from './pages/MainPage.tsx';
import TermsPage from './pages/TermsPage.tsx';
import RefundsPage from './pages/RefundsPage.tsx';
import PrivacyPage from './pages/PrivacyPage.tsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/buy_ticket" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refunds" element={<RefundsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <Toaster position="top-center" richColors={true} />
    </>
  );
}
