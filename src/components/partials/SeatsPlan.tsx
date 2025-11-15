import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { useState } from 'react';
import { Card } from '../../components/ui/card.tsx';
import { Row, SeatCell } from '../../types/routes.ts';

export default function SeatsPlan() {
  const [chosenSeatsThere, setChosenSeatsThere] = useState<string[][]>();
  const { freeSeatsThere, freeSeatsBack, busPlanThere, busPlanBack } = useBookingStore(
    useShallow((state) => ({
      freeSeatsThere: state.freeSeatsThere,
      freeSeatsBack: state.freeSeatsBack,
      busPlanThere: state.busPlanThere,
      busPlanBack: state.busPlanBack,
    })),
  );
  const rows: Row[] | null = busPlanThere?.floors[0].row ?? null;

  return (
    <Card>
      <div className="flex flex-col gap-6 mx-auto">
        {rows &&
          rows.map((i: Row, key) => (
            <div key={key}>
              {Object.values(i).map((rowNumber: Row) =>
                Object.values(rowNumber).map((seat: SeatCell) =>
                  seat && seat.type != 'empty' && seat.type != 'icon' ? (
                    <button className="border p-4">{seat.number}</button>
                  ) : (
                    <span className="border p-4"></span>
                  ),
                ),
              )}
            </div>
          ))}
      </div>
    </Card>
  );
}
