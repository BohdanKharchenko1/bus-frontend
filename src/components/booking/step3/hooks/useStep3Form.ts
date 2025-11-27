import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStep3Schema, Step3FormValues } from '../schema/step3Schema';
import { RouteItemType } from '../../../../types/routes.ts';

type UseStep3FormParams = {
  needOrderData: boolean;
  needMiddleName: boolean;
  needBirthDate: boolean;
  routeBack?: RouteItemType;
  discounts?: number[][];
  name?: (string | undefined)[];
  surname?: (string | undefined)[];
  phone?: string | undefined;
  email?: string | undefined;
  baggage?: string[][];
};

export const useStep3Form = ({
  needOrderData,
  routeBack,
  discounts,
  name,
  surname,
  phone,
  email,
  needMiddleName,
  needBirthDate,
  baggage,
}: UseStep3FormParams) => {
  const schema = useMemo(
    () => createStep3Schema(needOrderData),
    [needOrderData, needMiddleName, needBirthDate],
  );

  const defaultDiscountsThere = discounts?.[0] ?? [];
  const defaultDiscountsBack = discounts?.[1] ?? [];
  const defaultBaggageThere = baggage?.[0] ?? [];
  const defaultBaggageBack = baggage?.[1] ?? [];

  const form = useForm<Step3FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      discounts: routeBack
        ? [defaultDiscountsThere, defaultDiscountsBack]
        : [defaultDiscountsThere],
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      baggage: routeBack ? [defaultBaggageBack, defaultBaggageThere] : [defaultBaggageThere],
    },
  });

  return { form, schema };
};
