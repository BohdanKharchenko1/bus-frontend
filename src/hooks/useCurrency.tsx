import { useTranslation } from 'react-i18next';
import { useBookingStore } from '../stores/bookingStore.ts';

export default function useCurrency() {
  const { i18n } = useTranslation();
  const currency = useBookingStore((state) => state.currency);
  return currency ?? (i18n.language === 'ua' ? 'UAH' : 'CZK');
}
