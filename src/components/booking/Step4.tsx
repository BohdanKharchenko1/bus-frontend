import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { getFreeSeats, getPlan } from '../../api/bus.ts';
import SeatsPlan from '../../components/partials/SeatsPlan.tsx';

interface Step4Props {
  onNext?: () => void;
  onPrevious?: () => void;
}
export default function Step4({ onPrevious, onNext }: Step4Props) {
  const { setBusPlanAndFreeSeats, intervalIdThere, intervalIdBack, bustypeIdThere, bustypeIdBack } =
    useBookingStore(
      useShallow((state) => ({
        setBusPlanAndFreeSeats: state.setBusPlanAndFreeSeats,
        intervalIdThere: state.routeThere?.interval_id,
        intervalIdBack: state.routeBack?.interval_id,
        bustypeIdThere: state.routeThere?.bustype_id,
        bustypeIdBack: state.routeBack?.bustype_id,
      })),
    );
  useEffect(() => {
    if (!intervalIdThere || !bustypeIdThere) return;

    const load = async () => {
      const [freeSeatsThere, freeSeatsBack, busPlanThere, busPlanBack] = await Promise.all([
        getFreeSeats({ interval_id: intervalIdThere }),
        intervalIdBack ? getFreeSeats({ interval_id: intervalIdBack }) : Promise.resolve(null),
        getPlan({ bustype_id: bustypeIdThere, v: 2.0, position: 'h' }),
        bustypeIdBack
          ? getPlan({ bustype_id: bustypeIdBack, v: 2.0, position: 'h' })
          : Promise.resolve(null),
      ]);

      const formattedData = {
        busPlanBack: busPlanBack?.data || null,
        freeSeatsThere: freeSeatsThere.data,
        freeSeatsBack: freeSeatsBack?.data || null,
        busPlanThere: busPlanThere.data,
      };
      console.log(`formatted data ${formattedData}`);

      setBusPlanAndFreeSeats(formattedData);
    };

    load();
  }, [intervalIdThere, intervalIdBack, bustypeIdThere, bustypeIdBack]);

  return (
    <div className="max-w-7xl mx-auto pt-8">
      <button type="button" className="h-6 w-10 bg-blue-400" onClick={onPrevious}>
        Prev
      </button>
      <button type="button" className="h-6 w-10 bg-blue-400" onClick={onNext}>
        Next
      </button>
      <SeatsPlan />
    </div>
  );
}
