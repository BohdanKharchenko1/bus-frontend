import { useEffect } from 'react';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '../src/lib/i18n.ts';
import BookingPage from '../src/pages/BookingPage.tsx';
import { Toaster } from 'sonner';
import { useBookingStore } from './stores/bookingStore.ts';
import i18n from 'i18next';

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
      <BookingPage />

      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-center" richColors={true} />
    </QueryClientProvider>
  );
}
