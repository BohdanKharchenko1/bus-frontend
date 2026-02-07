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
      <CardContent className="grid gap-3 px-4 py-3 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:px-5 sm:py-4 lg:px-6 lg:py-4">
        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-start sm:justify-center sm:gap-2">
          <div className="flex flex-col items-start min-w-[64px]">
            <div className="text-[11px] text-gray-500 font-medium">{date}</div>
            <div className="text-lg font-bold leading-tight">{time}</div>
          </div>
          <div className="flex flex-col items-end min-w-[64px] sm:items-start">
            <div className="text-[11px] text-gray-500 font-medium">{t('labels.order')}</div>
            <div className="text-base font-semibold leading-tight">#{order.orderId}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-1">
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

        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-2 sm:text-right">
          <span
            className={`px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] ${statusClass}`}
          >
            {statusLabel}
          </span>
          {order.ticketLink ? (
            <a
              href={order.ticketLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-purple-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-800 sm:px-4 sm:py-2 sm:text-sm"
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
