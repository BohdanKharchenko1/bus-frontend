import { useTranslation } from 'react-i18next';
import LegalPage, { LegalContact, LegalSection } from '../components/partials/LegalPage.tsx';

export default function TermsPage() {
  const { t } = useTranslation('legal');
  const sections = t('terms.sections', { returnObjects: true }) as LegalSection[];
  const contact = t('contact', { returnObjects: true }) as LegalContact;

  return (
    <LegalPage
      title={t('terms.title')}
      intro={t('terms.intro')}
      lastUpdated={t('lastUpdated')}
      sections={sections}
      contact={contact}
    />
  );
}
