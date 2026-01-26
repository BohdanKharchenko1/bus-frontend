import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cancelTicket } from '../../api/bus.ts';
import { useBookingStore } from '../../stores/bookingStore.ts';
import BuyTicketButton from './step5/components/BuyTicketButton.tsx';
import useCreateNewOrder from './step5/hooks/useCreateNewOrder.ts';
import useTicketStream from './step5/hooks/useTicketStream.ts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { buildOrderSummary } from './step5/utils/orderSummary.ts';
import OrderTimer from './step5/components/OrderTimer.tsx';

type Step5Props = {
  onPrevious?: () => void;
};

export default function Step5({ onPrevious }: Step5Props) {
  const { t } = useTranslation('step5');
  const newOrder = useBookingStore((s) => s.newOrder);
  const resetNewOrder = useBookingStore((s) => s.resetNewOrder);
  const orderId = newOrder?.order_id;
  const ticket = useBookingStore((s) => s.ticket);

  const handleReturn = async () => {
    if (newOrder?.order_id) {
      await cancelTicket({ order_id: newOrder.order_id });
    }
    resetNewOrder();
    onPrevious?.();
  };

  useCreateNewOrder();
  useTicketStream({ orderId });

  const handleDownloadTicket = async () => {
    if (!ticket?.link) return;
    const filename = ticket.orderId ? `ticket-${ticket.orderId}` : 'ticket';

    try {
      const response = await fetch(ticket.link, { credentials: 'include' });
      if (!response.ok) {
        throw new Error('Ticket download failed');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(ticket.link, '_blank');
    }
  };

  const summary = useMemo(
    () =>
      buildOrderSummary(newOrder, {
        emptyValue: t('empty_value'),
        autoSeat: t(' auto_seat'),
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
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl md:text-3xl text-center">{t('title')}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-slate-600">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-wrap gap-2 text-base">
              <span className="font-medium text-slate-700">{row.label}:</span>
              <span className="text-slate-600">{row.value}</span>
            </div>
          ))}
          {!ticket?.link && <OrderTimer reservation_until={newOrder?.reservation_until} />}
        </CardContent>

        <CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-lg sm:text-2xl font-semibold text-slate-900">
            {t('total_label')}: {summary.totalDisplay}
          </div>
          {!ticket?.link ? (
            <BuyTicketButton
              label={t('continue_button')}
              className="w-full sm:w-64 h-12 sm:h-12 text-center rounded-lg bg-purple-700 text-white font-semibold text-base sm:text-lg hover:bg-purple-800 active:scale-[0.97] transition-all"
            />
          ) : (
            <Button
              type="button"
              onClick={handleDownloadTicket}
              className="w-full sm:w-64 h-12 sm:h-12 text-center rounded-lg bg-purple-700 text-white font-semibold text-base sm:text-lg hover:bg-purple-800 active:scale-[0.97] transition-all"
            >
              {t('download_button')}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
