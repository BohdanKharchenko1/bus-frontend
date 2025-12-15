import { useEffect } from 'react';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '../src/lib/i18n.ts';
import BookingPage from '../src/pages/BookingPage.tsx';
import { Toaster } from 'sonner';
import { useBookingStore } from './stores/bookingStore.ts';
import i18n from 'i18next';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage.tsx';
import MainPage from './pages/MainPage.tsx';

const queryClient = new QueryClient();

export default function App() {
  const lang = useBookingStore((s) => s.lang);

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/buy_ticket" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-center" richColors={true} />
    </QueryClientProvider>
  );
}
