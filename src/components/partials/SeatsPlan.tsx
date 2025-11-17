import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { useState } from 'react';
import { Card } from '../../components/ui/card.tsx';
import { Row, SeatCell } from '../../types/routes.ts';

export default function SeatsPlan() {
  const [chosenSeatsThere, setChosenSeatsThere] = useState<string[][]>();
  const { freeSeatsThere, freeSeatsBack, busPlanThere, busPlanBack, passengerCount } =
    useBookingStore(
      useShallow((state) => ({
        freeSeatsThere: state.freeSeatsThere,
        freeSeatsBack: state.freeSeatsBack,
        busPlanThere: state.busPlanThere,
        busPlanBack: state.busPlanBack,
        passengerCount: state.passengerCount,
      })),
    );
  const [seatsChosen, setSeatsChosen] = useState<string[][]>([[]]);
  const handleClick = (seatNumber: string) => {
    setSeatsChosen((prev) => {
      const copy = [...prev];
      const seats = copy[0] ?? [];

      if (seats.includes(seatNumber)) {
        copy[0] = seats.filter((s) => s !== seatNumber);
        return copy;
      }

      if (seats.length === passengerCount) return prev;

      copy[0] = [...seats, seatNumber];
      return copy;
    });
  };

  const rows: Row[] | null = busPlanThere?.floors[0].row ?? null;
  const freeSeats: string[] =
    freeSeatsThere?.[0]?.free_seat
      ?.filter((seat) => seat.seat_free)
      .map((seat) => seat.seat_number) ?? [];

  console.log(freeSeatsThere);

  return (
    <Card>
      <h2 className="text-center">Осталось занять {passengerCount - seatsChosen[0]?.length}</h2>
      <div className="flex flex-col gap-2   ">
        {rows &&
          rows.map((i: Row, key) => (
            <div key={key} className="flex flex-row gap-2 justify-center items-center  ">
              {Object.values(i).map((rowNumber: Row) =>
                Object.values(rowNumber).map((seat: SeatCell) =>
                  seat && seat.type === 'seat' ? (
                    freeSeats?.includes(seat.number) ? (
                      <button
                        onClick={() => handleClick(seat.number)}
                        className={
                          `flex items-center justify-center border aspect-square max-w-12 w-full rounded-md ` +
                          (seatsChosen[0]?.includes(seat.number) ? 'bg-yellow-400' : 'bg-white')
                        }
                      >
                        {seat.number}
                      </button>
                    ) : (
                      <button className="flex items-center justify-center border aspect-square max-w-12 w-full rounded-md bg-gray-500">
                        {seat.number}
                      </button>
                    )
                  ) : (
                    <button className="flex items-center justify-center border aspect-square max-w-12 w-full rounded-md"></button>
                  ),
                ),
              )}
            </div>
          ))}
      </div>
    </Card>
  );
}
