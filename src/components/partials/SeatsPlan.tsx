import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card.tsx';
import { Row, SeatCell } from '../../types/routes.ts';
import { toast } from 'sonner';

interface SeatPlanProps {
  onPrevious?: () => void;
  onNext?: () => void;
}
export default function SeatsPlan({ onPrevious, onNext }: SeatPlanProps) {
  const {
    freeSeatsThere,
    freeSeatsBack,
    busPlanThere,
    busPlanBack,
    passengerCount,
    setSeat,
    seat,
    routeBack,
    routeThere,
  } = useBookingStore(
    useShallow((state) => ({
      freeSeatsThere: state.freeSeatsThere,
      freeSeatsBack: state.freeSeatsBack,
      busPlanThere: state.busPlanThere,
      busPlanBack: state.busPlanBack,
      passengerCount: state.passengerCount,
      seat: state.seat,
      setSeat: state.setSeat,
      routeBack: state.routeBack,
      routeThere: state.routeThere,
    })),
  );

  const [seatsChosen, setSeatsChosen] = useState<string[][]>(seat);
  const [direction, setDirection] = useState<'there' | 'back'>('there');
  const index = direction === 'there' ? 0 : 1;

  useEffect(() => {
    if (!routeThere) setDirection('back');
  }, [routeThere]);

  const rows: Row[] | null =
    direction === 'there'
      ? (busPlanThere?.floors?.[0].row ?? null)
      : (busPlanBack?.floors?.[0].row ?? null);

  const freeSeats: string[] =
    direction === 'there'
      ? (freeSeatsThere?.[0]?.free_seat?.filter((s) => s.seat_free).map((s) => s.seat_number) ?? [])
      : (freeSeatsBack?.[0]?.free_seat?.filter((s) => s.seat_free).map((s) => s.seat_number) ?? []);

  const selectedSeats = seatsChosen[index];

  const handleClick = (seatNumber: string) => {
    setSeatsChosen((prev) => {
      const copy = prev.map((r) => [...r]);
      const target = copy[index];

      if (target.includes(seatNumber)) {
        copy[index] = target.filter((s) => s !== seatNumber);
      } else {
        if (target.length === passengerCount) return prev;
        copy[index] = [...target, seatNumber];
      }

      setSeat({ seat: copy });
      return copy;
    });
  };

  const handleNext = () => {
    const thereDone = seat[0].length === passengerCount;
    const backDone = routeBack ? seat[1].length === passengerCount : true;

    if (direction === 'there') {
      if (!thereDone) {
        toast.error('Ошибка. Выберете все места перед тем как продолжить');
        return;
      }

      if (routeBack) {
        setDirection('back');
        return;
      }

      onNext?.();
      return;
    }

    if (direction === 'back') {
      if (!backDone) return;
      onNext?.();
    }
  };

  const handlePrevious = () => {
    if (direction === 'back' && routeThere) {
      setDirection('there');
      return;
    }
    onPrevious?.();
  };

  const renderSeatCell = (seatCell: SeatCell) => {
    if (!seatCell) {
      return <button className="border aspect-square max-w-12 w-full rounded-md" />;
    }

    if (seatCell.type === 'icon') {
      return (
        <button className="border aspect-square max-w-12 w-full rounded-md p">
          <img src={seatCell.icon} alt="" className="w-full h-full object-contain" />
        </button>
      );
    }

    if (seatCell.type === 'seat') {
      const isFree = freeSeats.includes(seatCell.number);
      const isSelected = selectedSeats.includes(seatCell.number);

      return (
        <button
          disabled={!isFree}
          onClick={() => isFree && handleClick(seatCell.number)}
          className={
            `border aspect-square max-w-12 w-full rounded-md flex items-center justify-center ` +
            (isFree ? (isSelected ? 'bg-yellow-400' : 'bg-white') : 'bg-gray-500')
          }
        >
          {seatCell.number}
        </button>
      );
    }

    return <button className="border aspect-square max-w-12 w-full rounded-md" />;
  };

  return (
    <Card>
      <div className="flex flex-row justify-between px-6">
        <button
          type="button"
          onClick={handlePrevious}
          className="w-32 px-5 py-2 text-center rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
        >
          ← Previous
        </button>

        <h2 className="text-center">Осталось занять {passengerCount - selectedSeats.length}</h2>

        <button
          type="button"
          onClick={handleNext}
          className="w-32 px-5 py-2 text-center rounded-lg bg-purple-700 text-white font-medium hover:bg-purple-800"
        >
          Next →
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {rows?.map((row: Row, key) => (
          <div key={key} className="flex flex-row gap-2 justify-center items-center">
            {Object.values(row).map((rowNumber: Row) =>
              Object.values(rowNumber).map(renderSeatCell),
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
