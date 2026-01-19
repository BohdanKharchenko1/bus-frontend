import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../../components/ui/card.tsx';
import { RouteItemType } from '../../types/routes.ts';
import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';

type RouteItemProps = {
  route: RouteItemType;
  direction: 'there' | 'back';
};

export default function RouteItem({ route, direction }: RouteItemProps) {
  const { t } = useTranslation('step2');
  const { setRoute, routeThere, routeBack } = useBookingStore(
    useShallow((state) => ({
      setRoute: state.setRoute,
      routeThere: state.routeThere,
      routeBack: state.routeBack,
    })),
  );

  const handleClick = (route: RouteItemType, direction: 'there' | 'back') => {
    if (isSelected) {
      setRoute(undefined, direction);
    } else {
      setRoute(route, direction);
    }
  };

    const isSelected =
      direction === 'there'
        ? routeThere?.route_id === route.route_id
        : routeBack?.route_id === route.route_id;
  return (
    <Card className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden bg-stone-100">
      <CardContent className="flex flex-col gap-6 px-4 py-4 sm:flex-row sm:justify-between sm:gap-8 sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-16">
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-center sm:justify-between sm:gap-0 sm:relative sm:h-full">
            <div className="flex flex-col items-center min-w-[72px]">
              <div className="text-xs sm:text-sm text-gray-500 font-medium">
                {new Date(route.date_from).toLocaleDateString()}
              </div>
              <div className="text-xl sm:text-2xl font-bold">{route.time_from}</div>
            </div>

            <div className="flex flex-col items-center flex-1 sm:flex-none">
              <div className="text-sm sm:text-lg font-medium text-gray-400">{route.time_in_way}</div>
            </div>

            <div className="flex flex-col items-center min-w-[72px]">
              <div className="text-xs sm:text-sm text-gray-500 font-medium">
                {new Date(route.date_to).toLocaleDateString()}
              </div>
              <div className="text-xl sm:text-2xl font-bold">{route.time_to}</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:justify-between sm:h-full">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-4 border-purple-700"></div>
                <span className="font-bold text-base sm:text-lg">{route.point_from}</span>
              </div>
              <div className="text-gray-500 font-medium text-left text-sm sm:text-base">
                {route.station_from}
              </div>
            </div>

            <div className="mt-6 sm:mt-[5rem] flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-700"></div>
                <span className="font-bold text-base sm:text-lg">{route.point_to}</span>
              </div>
              <div className="text-gray-500 font-medium text-left text-sm sm:text-base">
                {route.station_to}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
          <div className="flex flex-row items-baseline gap-2">
            <div className="text-gray-500 font-semibold text-sm sm:text-base">{t('priceLabel')}</div>
            <div className="text-lg sm:text-xl align-text-bottom whitespace-nowrap font-bold">
              {route.price_one_way} {route.currency}
            </div>
          </div>
          <button
            onClick={() => handleClick(route, direction)}
            className={
              `w-full sm:w-auto font-bold text-sm sm:text-base text-white px-6 sm:px-10 py-3 rounded-md transition ` +
              (isSelected ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-700 hover:bg-purple-800')
            }
          >
            {isSelected ? t('selectedButton') : t('bookButton')}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
