import { useEffect, useState } from 'react';
import i18n from '../lib/i18n.ts';

export default function useCurrency() {
  const [currency, setCurrency] = useState<'UAH' | 'CZK'>('CZK');
  const lang = i18n.language;

  useEffect(() => {
    if (lang === 'ua') {
      setCurrency('UAH');
    } else {
      setCurrency('CZK');
    }
  }, [lang]);

  return {
    currency,
  };
}
