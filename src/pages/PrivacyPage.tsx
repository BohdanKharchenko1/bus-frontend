import { useTranslation } from 'react-i18next';
import LegalPage, { LegalContact, LegalSection } from '../components/partials/LegalPage.tsx';

export default function PrivacyPage() {
  const { t } = useTranslation('legal');
  const sections = t('privacy.sections', { returnObjects: true }) as LegalSection[];
  const contact = t('contact', { returnObjects: true }) as LegalContact;

  return (
    <LegalPage
      title={t('privacy.title')}
      intro={t('privacy.intro')}
      lastUpdated={t('lastUpdated')}
      sections={sections}
      contact={contact}
    />
  );
}
