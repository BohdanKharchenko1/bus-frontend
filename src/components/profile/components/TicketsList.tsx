import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card.tsx';
import { Spinner } from '../../ui/spinner.tsx';
import { Order } from '../../../types/user.ts';
import { getTimeValue } from '../utils/dashboardUtils.ts';
import TicketRow from './TicketRow.tsx';

type TicketsListProps = {
  orders: Order[];
  isLoading: boolean;
};

export default function TicketsList({ orders, isLoading }: TicketsListProps) {
  const { t } = useTranslation('profile');
  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => getTimeValue(b.createdAt) - getTimeValue(a.createdAt)),
    [orders],
  );

  return (
    <div className="w-full max-w-6xl">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl md:text-3xl">{t('title')}</CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Spinner className="size-8 text-purple-600" />
            </div>
          ) : sortedOrders.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
              {t('empty')}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {sortedOrders.map((order) => (
                <TicketRow key={order.id} order={order} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
