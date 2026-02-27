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
  const reservationConfirmed = useBookingStore((s) => s.reservationConfirmed);

  const handleReturn = async () => {
    if (newOrder?.order_id && !ticket && !reservationConfirmed) {
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
        </CardContent>

        <CardFooter className="pt-2">
          {!ticket?.link ? (
            <div className="w-full rounded-2xl  border-slate-200 p-4 sm:p-5 shadow-sm">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {t('total_label')}: {summary.totalDisplay}
                </div>
                <OrderTimer reservation_until={newOrder?.reservation_until} />
              </div>
              {reservationConfirmed ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900">
                  <p className="text-base font-semibold">{t('reservation_success_title')}</p>
                  <p className="mt-1 text-sm">{t('reservation_success_text')}</p>
                </div>
              ) : (
                <BuyTicketButton
                  payNowLabel={t('continue_button')}
                  payOnBoardLabel={t('pay_on_board_button')}
                  containerClassName="grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
                  payNowClassName="w-full h-12 sm:h-14 text-center rounded-xl bg-purple-700 text-white font-semibold text-base sm:text-lg hover:bg-purple-800 active:scale-[0.97] transition-all"
                  payOnBoardClassName="w-full h-12 sm:h-14 text-center rounded-xl border border-purple-300 bg-white text-purple-700 font-semibold text-base sm:text-lg hover:bg-purple-50 active:scale-[0.97] transition-all"
                />
              )}
            </div>
          ) : (
            <div className="w-full rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 sm:p-5 shadow-sm">
              <div className="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {t('total_label')}: {summary.totalDisplay}
              </div>
              <Button
                type="button"
                onClick={handleDownloadTicket}
                className="w-full h-12 text-center rounded-xl bg-purple-700 text-white font-semibold text-base sm:text-lg hover:bg-purple-800 active:scale-[0.97] transition-all"
              >
                {t('download_button')}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
