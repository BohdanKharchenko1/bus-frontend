import { Step3FormValues } from '../schema/step3Schema';
import { BaggageItem } from '@/types/routes.ts';

export type DiscountOption = {
  discount_id: number | string;
  discount_name: string;
  discount_price: number;
  currency?: string;
};

export type DiscountGroup = {
  discounts: DiscountOption[];
} | null;

type PriceConfig = {
  discountsThere?: DiscountGroup;
  discountsBack?: DiscountGroup;
  baggageThere?: BaggageItem[];
  baggageBack?: BaggageItem[];
};

export const calculateTotalPrice = (
  values: Step3FormValues,
  { discountsThere, discountsBack, baggageBack, baggageThere }: PriceConfig,
) => {
  if (!values?.discounts) return 0;

  let price = 0;

  values.discounts.forEach((discountRow, routeIndex) => {
    const discountList = routeIndex === 0 ? discountsThere?.discounts : discountsBack?.discounts;
    if (!discountList) return;

    discountRow.forEach((selectedId) => {
      const match = discountList.find(
        (discount) => String(discount.discount_id) === String(selectedId),
      );

      if (match) {
        price += match.discount_price;
      }
    });
  });

  if (values.baggage) {
    values.baggage.forEach((baggageRow, routeIndex) => {
      const selectedIds = baggageRow?.length ? String(baggageRow).split(',').filter(Boolean) : [];

      const baggageList = routeIndex === 0 ? baggageThere : baggageBack;
      if (!Array.isArray(baggageList)) return;
      console.log('type:', typeof baggageList);

      selectedIds.forEach((id) => {
        const bagMatch = baggageList.find((b) => String(b.baggage_id) === String(id));
        if (bagMatch) {
          price += Number(bagMatch.price ?? 0);
        }
      });
    });
  }

  return Math.round(price * 100) / 100;
};
