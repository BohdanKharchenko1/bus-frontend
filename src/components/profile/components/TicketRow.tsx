import { useTranslation } from 'react-i18next';
import { Order } from '../../../types/user.ts';
import { Card, CardContent } from '../../ui/card.tsx';
import { formatDateParts, statusStyles } from '../utils/dashboardUtils.ts';

export default function TicketRow({ order }: { order: Order }) {
  const { t } = useTranslation('profile');
  const statusClass = statusStyles[order.status] ?? 'bg-slate-100 text-slate-600';
  const statusLabel = t(`status.${order.status}`, order.status);
  const hasRoute = Boolean(order.pointFrom || order.pointTo);
  const routeFrom = order.pointFrom ?? '-';
  const routeTo = order.pointTo ?? '-';
  const { date, time } = formatDateParts(order.createdAt ?? order.updatedAt);

  return (
    <Card className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden bg-stone-100">
      <CardContent className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-center sm:justify-between sm:gap-1">
            <div className="flex flex-col items-center min-w-[64px]">
              <div className="text-[11px] text-gray-500 font-medium">{date}</div>
              <div className="text-lg font-bold">{time}</div>
            </div>
            <div className="flex flex-col items-center min-w-[64px]">
              <div className="text-[11px] text-gray-500 font-medium">{t('labels.order')}</div>
              <div className="text-base font-semibold">#{order.orderId}</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:justify-between sm:h-full">
            {hasRoute ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-purple-700" />
                  <span className="font-semibold text-sm sm:text-base">{routeFrom}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-700" />
                  <span className="font-semibold text-sm sm:text-base">{routeTo}</span>
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-500 font-medium">{t('route.unknown')}</div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:items-end sm:text-right">
          <span
            className={`self-start sm:self-end rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${statusClass}`}
          >
            {statusLabel}
          </span>
          {order.ticketLink ? (
            <a
              href={order.ticketLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-800"
            >
              {t('actions.openTicket')}
            </a>
          ) : (
            <span className="text-xs font-medium text-slate-400">
              {t('actions.ticketUnavailable')}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
