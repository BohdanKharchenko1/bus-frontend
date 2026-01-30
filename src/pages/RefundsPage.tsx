import { useTranslation } from 'react-i18next';
import LegalPage, { LegalContact, LegalSection } from '../components/partials/LegalPage.tsx';

export default function RefundsPage() {
  const { t } = useTranslation('legal');
  const sections = t('refunds.sections', { returnObjects: true }) as LegalSection[];
  const contact = t('contact', { returnObjects: true }) as LegalContact;

  return (
    <LegalPage
      title={t('refunds.title')}
      intro={t('refunds.intro')}
      lastUpdated={t('lastUpdated')}
      sections={sections}
      contact={contact}
    />
  );
}
