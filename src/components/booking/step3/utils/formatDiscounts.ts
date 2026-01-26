import { DiscountResponse, RouteItemType } from '../../../../types/routes.ts';
import i18n from 'i18next';

export default function formatDiscounts(
  route: RouteItemType | undefined,
  discounts: DiscountResponse,
) {
  if (!discounts) {
    return null;
  }
  if (!route) {
    return null;
  }
  const defaultTicket = {
    discount_id: 0,
    discount_price: route.price_one_way,
    currency: route.currency,
    discount_name: i18n.t('step3:default_ticket'),
  };

  discounts.discounts.unshift(defaultTicket);
  return discounts;
}
