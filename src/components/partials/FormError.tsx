import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FormError {
  error?: FieldError;
}
export default function FormError({ error }: FormError) {
  const { t } = useTranslation();

  return <p className="text-sm text-red-500 mt-0.5">{error?.message ? t(error.message) : ''}</p>;
}
