import { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { getBaggage, getDiscount } from '../../../../api/bus.ts';
import { DiscountResponse, RouteItemType } from '../../../../types/routes.ts';
import { Step3FormValues } from '../schema/step3Schema';
import { BookingState } from '../../../../stores/bookingStore.ts';
import formatDiscounts from '../utils/formatDiscounts.ts';
import i18n from 'i18next';

type UseDiscountsLoaderParams = {
  form: UseFormReturn<Step3FormValues>;
  passengerCount: number;
  routeThere?: RouteItemType;
  routeBack?: RouteItemType;
  discountsThere?: DiscountResponse;
  discountsBack?: DiscountResponse;
  currency?: string;
  saveBaggageAndDiscounts: (payload: Partial<BookingState>) => void;
};

export const useDiscountsLoader = ({
  form,
  passengerCount,
  routeThere,
  routeBack,
  saveBaggageAndDiscounts,
  discountsThere,
  discountsBack,
  currency,
}: UseDiscountsLoaderParams) => {
  const prevThereId = useRef<number | undefined>(routeThere?.route_id);
  const prevBackId = useRef<number | undefined>(routeBack?.route_id);
  const lang = i18n.language;

  useEffect(() => {
    const load = async () => {
      const [resThere, resBack, bagThere, bagBack] = await Promise.all([
        routeThere
          ? getDiscount({ interval_id: routeThere.interval_id, currency: currency, lang: lang })
          : null,
        routeBack ? getDiscount({ interval_id: routeBack.interval_id }) : null,
        routeThere
          ? getBaggage({ interval_id: routeThere.interval_id, currency: currency, lang: lang })
          : null,
        routeBack ? getBaggage({ interval_id: routeBack.interval_id }) : null,
      ]);
      const prevThereChanged = resThere?.data.route_id !== discountsThere?.route_id;
      const prevBackChanged = resBack?.data.route_id !== discountsBack?.route_id;
      saveBaggageAndDiscounts({
        discountsThere: formatDiscounts(routeThere, resThere?.data) ?? null,
        discountsBack: formatDiscounts(routeBack, resBack?.data) ?? null,
        baggageThere: bagThere?.data ?? null,
        baggageBack: bagBack?.data ?? null,
      });

      const current = form.getValues('discounts');
      const next = [...current];

      console.log(prevThereId.current + '+' + routeThere?.route_id);
      if (routeThere && prevThereChanged) {
        next[0] = Array.from({ length: passengerCount }, () =>
          Number(resThere?.data?.discounts[0]?.discount_id),
        );

        prevThereId.current = routeThere.route_id;
      }

      console.log(next[0]);
      if (routeBack && prevBackChanged) {
        next[1] = Array.from({ length: passengerCount }, () =>
          Number(resBack?.data?.discounts[0]?.discount_id),
        );

        prevBackId.current = routeBack.route_id;
      }

      form.setValue('discounts', next);
    };

    load();
  }, [routeThere?.route_id, routeBack?.route_id, passengerCount, form, saveBaggageAndDiscounts]);
};
