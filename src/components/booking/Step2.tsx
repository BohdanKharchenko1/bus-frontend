import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { getRoutes } from '../../api/bus.ts';
import RouteItem from '../../components/partials/RouteItem.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

interface Step2Props {
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function Step2({ onPrevious, onNext }: Step2Props) {
  const { t } = useTranslation('step2');
  const { city_from_id, city_to_id, dateFrom, dateTo, passengerCount, allRoutes, setAllRoutes } =
    useBookingStore(
      useShallow((state) => ({
        city_from_id: state.from?.point_id,
        city_to_id: state.to?.point_id,
        dateFrom: state.startDate,
        dateTo: state.endDate,
        passengerCount: state.passengerCount,
        allRoutes: state.allRoutes,
        setAllRoutes: state.setAllRoutes,
      })),
    );
  useEffect(() => {
    const fetchRoutes = async () => {
      const res: AxiosResponse = await getRoutes({
        id_from: city_from_id,
        id_to: city_to_id,
        date: format(dateFrom, 'yyyy-MM-dd'),
      });
      if (res) setAllRoutes(res.data);
      console.log('res:', res);
    };
    fetchRoutes();
  }, [city_from_id, city_to_id, dateFrom, setAllRoutes]);

  return (
    <div className="max-w-7xl mx-auto pt-8">
      <button type="button" className="h-6 w-10 bg-blue-400" onClick={onPrevious}>
        Prev
      </button>
      <button type="button" className="h-6 w-10 bg-blue-400" onClick={onNext}>
        Next
      </button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 mx-auto">
          {Array.isArray(allRoutes) &&
            allRoutes.map((route) => <RouteItem key={route.route_id} route={route} />)}
        </CardContent>
      </Card>
    </div>
  );
}
