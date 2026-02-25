import { useTranslation } from 'react-i18next';

export default function useCurrency() {
  const { i18n } = useTranslation();
  return i18n.language === 'ua' ? 'UAH' : 'CZK';
}
