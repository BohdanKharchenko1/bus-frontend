import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step1FormValues, step1Schema } from '../schema/step1Schema';
import { Point } from '../../../partials/SearchableInput';
import i18n from 'i18next';

type UseStep1FormParams = {
  from?: Point;
  to?: Point;
  startDate?: string;
  endDate?: string | null;
  passengerCount?: number;
  currency?: Step1FormValues['currency'];
};

export const useStep1Form = ({
  from,
  to,
  startDate,
  endDate,
  passengerCount,
  currency,
}: UseStep1FormParams) => {
  const defaultCurrency = i18n.language === 'ua' ? 'UAH' : 'CZK';

  const form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      from: from ?? undefined,
      to: to ?? undefined,
      startDate: startDate || '',
      endDate: endDate || null,
      passengerCount: passengerCount,
      currency: currency ?? defaultCurrency,
    },
  });

  return { form };
};
