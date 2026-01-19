import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cancelTicket } from '../../api/bus.ts';
import { useBookingStore } from '../../stores/bookingStore.ts';
import BuyTicketButton from './step5/components/BuyTicketButton.tsx';
import useCreateNewOrder from './step5/hooks/useCreateNewOrder.ts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { buildOrderSummary } from './step5/utils/orderSummary.ts';

type Step5Props = {
  onPrevious?: () => void;
};

export default function Step5({ onPrevious }: Step5Props) {
  const { t } = useTranslation('step5');
  const newOrder = useBookingStore((s) => s.newOrder);
  const resetNewOrder = useBookingStore((s) => s.resetNewOrder);

  const handleReturn = async () => {
    if (newOrder?.order_id) {
      await cancelTicket({ order_id: newOrder.order_id });
    }
    resetNewOrder();
    onPrevious?.();
  };

  useCreateNewOrder();

  const summary = useMemo(
    () =>
      buildOrderSummary(newOrder, {
        emptyValue: t('empty_value'),
        autoSeat: t('auto_seat'),
        outbound: t('outbound'),
        returnTrip: t('return'),
      }),
    [newOrder, t],
  );

  const rows = [
    { label: t('route_label'), value: summary.routeLabel },
    { label: t('date_label'), value: summary.dateLabel },
    { label: t('passengers_label'), value: summary.passengersValue },
    { label: t('seats_label'), value: summary.seatsValue },
  ];

  return (
    <div className="max-w-7xl mx-auto pt-8">
      <div className="flex items-center">
        <Button
          type="button"
          variant="secondary"
          onClick={handleReturn}
          className="w-32 h-auto px-5 py-2 text-center rounded-lg bg-gray-200 text-gray-700 font-medium text-base hover:bg-gray-300 active:scale-[0.97] transition-all"
        >
          ← {t('previous_button')}
        </Button>
      </div>

      <Card className="mt-6 max-w-2xl mx-auto w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl md:text-3xl text-center">{t('title')}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-slate-600">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-wrap gap-2 text-base">
              <span className="font-medium text-slate-700">{row.label}:</span>
              <span className="text-slate-600">{row.value}</span>
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-4">
          <div className="text-xl md:text-2xl font-semibold text-slate-900">
            {t('total_label')}: {summary.totalDisplay}
          </div>
          <BuyTicketButton
            label={t('continue_button')}
            className="w-32 px-5 py-2 text-center rounded-lg bg-purple-700 text-white font-medium hover:bg-purple-800 active:scale-[0.97] transition-all"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
