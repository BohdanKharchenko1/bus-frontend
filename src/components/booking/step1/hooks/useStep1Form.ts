import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step1FormValues, step1Schema } from '../schema/step1Schema';
import { Point } from '../../../partials/SearchableInput';

type UseStep1FormParams = {
  from?: Point;
  to?: Point;
  startDate?: string;
  endDate?: string | null;
  passengerCount?: number;
};

export const useStep1Form = ({
  from,
  to,
  startDate,
  endDate,
  passengerCount,
}: UseStep1FormParams) => {
  const form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      from: from ?? undefined,
      to: to ?? undefined,
      startDate: startDate || '',
      endDate: endDate || null,
      passengerCount: passengerCount,
    },
  });

  return { form };
};
