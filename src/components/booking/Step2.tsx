import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBookingStore } from '../../stores/bookingStore';
import { useShallow } from 'zustand/react/shallow';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useRoutesLoader } from './step2/hooks/useRoutesLoader';
import RoutesList from './step2/components/RoutesList';

interface Step2Props {
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function Step2({ onPrevious, onNext }: Step2Props) {
  const { t } = useTranslation('step2');
  const {
    city_from_id,
    city_to_id,
    dateFrom,
    dateTo,
    allRoutesThere,
    allRoutesBack,
    setAllRoutes,
    routeBack,
    routeThere,
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
      routeBack: state.routeBack,
      routeThere: state.routeThere,
    })),
  );
  const [direction, setDirection] = useState<'there' | 'back'>('there');

  useRoutesLoader({
    cityFromId: city_from_id,
    cityToId: city_to_id,
    dateFrom,
    dateTo,
    setAllRoutes,
  });
  const handleNext = () => {
    if (direction === 'there' && dateTo) {
      setDirection('back');
      return;
    }

    if (direction === 'back' && !routeBack) {
      if (routeThere) {
        onNext?.();
      } else {
        return;
      }
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
          {direction === 'there' ? (
            <RoutesList data={allRoutesThere} direction="there" />
          ) : (
            <RoutesList data={allRoutesBack} direction="back" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
