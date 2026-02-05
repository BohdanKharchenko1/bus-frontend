import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBookingStore } from '../../stores/bookingStore';
import { useShallow } from 'zustand/react/shallow';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useRoutesLoader } from './step2/hooks/useRoutesLoader';
import RoutesList from './step2/components/RoutesList';
import { toast } from 'sonner';
import { Spinner } from '../../components/ui/spinner.tsx';

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

  const { isLoading } = useRoutesLoader({
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
    if (direction === 'there' && !routeThere) {
      toast.error(t('errors.selectRoute'));
      return;
    }

    if (direction === 'back' && !routeBack) {
      if (routeThere) {
        onNext?.();
      } else {
        toast.error(t('errors.selectRoute'));
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
    <div className="max-w-7xl mx-auto pt-8 px-0">
      <Card>
        <CardHeader className="pb-4 p">
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="order-2 sm:order-none w-full sm:w-32 px-4 py-2 text-center rounded-lg bg-gray-200 text-gray-700 font-medium text-sm sm:text-base
               hover:bg-gray-300 active:scale-[0.97] transition-all"
            >
              ← {t('previous')}
            </button>

            <CardTitle className="order-1 sm:order-none text-xl sm:text-2xl md:text-3xl text-center">
              {t('title')}
            </CardTitle>

            <button
              type="button"
              onClick={handleNext}
              className="order-3 sm:order-none w-full sm:w-32 px-5 py-2 text-center rounded-lg bg-purple-700 text-white font-medium text-sm sm:text-base
               hover:bg-purple-800 active:scale-[0.97] transition-all"
            >
              {t('next')} →
            </button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-6">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <Spinner className="size-12 text-purple-600" />
            </div>
          ) : direction === 'there' ? (
            <RoutesList data={allRoutesThere} direction="there" />
          ) : (
            <RoutesList data={allRoutesBack} direction="back" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
