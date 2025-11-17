import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';
import { getRoutes } from '../../api/bus.ts';
import RouteItem from '../../components/partials/RouteItem.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { RouteError, RouteItemType } from '@/types/routes.ts';

interface Step2Props {
  onPrevious?: () => void;
  onNext?: () => void;
}

const renderRoutes = (
  data: RouteItemType[] | RouteError | undefined,
  direction: 'there' | 'back',
) => {
  if (!data) return null;
  if ('error' in data)
    return (
      <div className="text-center py-8 text-gray-500 text-lg">
        <span className="block text-2xl font-semibold text-gray-700">No routes found</span>
        <span className="mt-1 block">Try selecting a different date.</span>
      </div>
    );

  return data.map((route) => (
    <RouteItem key={route.route_id} route={route} direction={direction} />
  ));
};

export default function Step2({ onPrevious, onNext }: Step2Props) {
  const { t } = useTranslation('step2');
  const {
    city_from_id,
    city_to_id,
    dateFrom,
    dateTo,
    passengerCount,
    allRoutesThere,
    allRoutesBack,
    setAllRoutes,
  } = useBookingStore(
    useShallow((state) => ({
      city_from_id: state.from?.point_id,
      city_to_id: state.to?.point_id,
      dateFrom: state.startDate,
      dateTo: state.endDate,
      passengerCount: state.passengerCount,
      allRoutesThere: state.allRoutesThere,
      allRoutesBack: state.allRoutesBack,
      setAllRoutes: state.setAllRoutes,
    })),
  );
  const [direction, setDirection] = useState<'there' | 'back'>('there');
  useEffect(() => {
    const fetchRoutes = async () => {
      let resBack: AxiosResponse | null = null;

      const resThere = await getRoutes({
        id_from: city_from_id,
        id_to: city_to_id,
        date: format(dateFrom, 'yyyy-MM-dd'),
      });

      if (dateTo) {
        resBack = await getRoutes({
          id_from: city_to_id,
          id_to: city_from_id,
          date: format(dateTo, 'yyyy-MM-dd'),
        });
      }

      setAllRoutes(resThere.data, resBack?.data ?? []);
    };
    fetchRoutes();
  }, [city_from_id, city_to_id, dateFrom, setAllRoutes]);
  const handleNext = () => {
    if (direction === 'there' && dateTo) {
      setDirection('back');
      return;
    }
    onNext?.();
  };

  const handlePrevious = () => {
    if (direction === 'back') {
      setDirection('there');
      return;
    }

    onPrevious?.();
  };

  return (
    <div className="max-w-7xl mx-auto pt-8">
      <Card>
        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={handlePrevious}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium
               hover:bg-gray-300 active:scale-[0.97] transition-all"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2 rounded-lg bg-purple-700 text-white font-medium
               hover:bg-purple-800 active:scale-[0.97] transition-all"
          >
            Next →
          </button>
        </div>

        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl ">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 ">
          {direction === 'there'
            ? renderRoutes(allRoutesThere, 'there')
            : renderRoutes(allRoutesBack, 'back')}
        </CardContent>
      </Card>
    </div>
  );
}
