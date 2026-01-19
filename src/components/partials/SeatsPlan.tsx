import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card.tsx';
import { Row, SeatCell } from '../../types/routes.ts';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface SeatPlanProps {
  onPrevious?: () => void;
  onNext?: () => void;
}
export default function SeatsPlan({ onPrevious, onNext }: SeatPlanProps) {
  const { t } = useTranslation('step4');
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
        toast.error(t('errors.selectSeats'));
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

  const seatBaseClass =
    'border rounded-md flex items-center justify-center h-[3.25rem] w-[3.25rem] text-base sm:h-12 sm:w-12 sm:text-sm';

  const rowCells =
    rows?.map((row) =>
      Object.values(row).flatMap(
        (rowNumber) => Object.values(rowNumber as Record<string, SeatCell>) as SeatCell[],
      ),
    ) ?? [];

  const maxColumns = rowCells.reduce((max, row) => Math.max(max, row.length), 0);
  const mobileRows = Array.from({ length: maxColumns }, (_, colIndex) =>
    rowCells
      .slice()
      .reverse()
      .map((row) => row[colIndex]),
  );

  const renderSeatCell = (seatCell?: SeatCell, index?: number) => {
    if (!seatCell) {
      return <button key={index} className={seatBaseClass} />;
    }

    if (seatCell.type === 'icon') {
      return (
        <button key={index} className={seatBaseClass}>
          <img src={seatCell.icon} alt="" className="h-full w-full object-contain" />
        </button>
      );
    }

    if (seatCell.type === 'seat') {
      const isFree = freeSeats.includes(seatCell.number);
      const isSelected = selectedSeats.includes(seatCell.number);

      return (
        <button
          key={index}
          disabled={!isFree}
          onClick={() => isFree && handleClick(seatCell.number)}
          className={
            `${seatBaseClass} ` +
            (isFree ? (isSelected ? 'bg-yellow-400' : 'bg-white') : 'bg-gray-500')
          }
        >
          {seatCell.number}
        </button>
      );
    }

    return <button key={index} className={seatBaseClass} />;
  };

  return (
    <Card>
      <div className="flex flex-col gap-4 px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <button
            type="button"
            onClick={handlePrevious}
            className="w-full sm:w-32 px-5 py-2 text-center rounded-lg bg-gray-200 text-gray-700 font-medium text-sm sm:text-base hover:bg-gray-300"
          >
            ← {t('previous')}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="w-full sm:w-32 px-5 py-2 text-center rounded-lg bg-purple-700 text-white font-medium text-sm sm:text-base hover:bg-purple-800 sm:col-start-3 sm:row-start-1 sm:justify-self-end"
          >
            {t('next')} →
          </button>

          <h2 className="text-center text-base sm:text-base sm:col-start-2 sm:row-start-1">
            {t('seatsRemaining', {
              count: passengerCount - (selectedSeats ? selectedSeats.length : 0),
            })}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-2 pb-4 px-4 sm:px-6 sm:pb-2">
        <div className="flex flex-col gap-2 sm:hidden">
          {mobileRows.map((row, key) => (
            <div key={key} className="flex flex-row gap-2 justify-center items-center min-w-max">
              {row.map(renderSeatCell)}
            </div>
          ))}
        </div>
        <div className="hidden sm:flex sm:flex-col sm:gap-2">
          {rowCells.map((row, key) => (
            <div key={key} className="flex flex-row gap-2 justify-center items-center min-w-max">
              {row.map(renderSeatCell)}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
