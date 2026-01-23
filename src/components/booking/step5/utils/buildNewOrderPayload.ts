import { useBookingStore } from '../../../../stores/bookingStore';

const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 10);
};

export const buildNewOrderPayload = () => {
  const state = useBookingStore.getState();
  const formattedDiscounts = state.discounts?.map((row) =>
    row.map((val) => (val === 0 ? undefined : val)),
  );
  return {
    date: state.endDate
      ? [formatDate(state.routeThere?.date_from), formatDate(state.routeBack?.date_from)]
      : [formatDate(state.routeThere?.date_from)],
    interval_id: state.routeBack
      ? [state.routeThere?.interval_id, state.routeBack.interval_id]
      : [state.routeThere?.interval_id],

    seat: state.seat ?? [],
    name: state.name,
    surname: state.surname,
    discount_id: formattedDiscounts ?? [],

    baggage: state.baggage,

    phone: state.phone ?? '',
    email: state.email ?? '',
    lang: state.lang ?? 'en',
  };
};
