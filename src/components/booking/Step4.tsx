import { useShallow } from 'zustand/react/shallow';
import { useBookingStore } from '../../stores/bookingStore';
import SeatsPlan from '../partials/SeatsPlan';
import { useSeatsLoader } from './step4/hooks/useSeatsLoader';
import { Spinner } from '../../components/ui/spinner.tsx';

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

  const { isLoading } = useSeatsLoader({
    intervalIdThere,
    intervalIdBack,
    bustypeIdThere,
    bustypeIdBack,
    setBusPlanAndFreeSeats,
  });

  return (
    <div className="max-w-7xl mx-auto pt-8">
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner className="size-12 text-purple-600" />
        </div>
      ) : (
        <SeatsPlan onNext={onNext} onPrevious={onPrevious} />
      )}
    </div>
  );
}
