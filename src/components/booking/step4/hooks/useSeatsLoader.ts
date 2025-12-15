import { useEffect } from 'react';
import { getFreeSeats, getPlan } from '../../../../api/bus';
import { BookingState } from '../../../../stores/bookingStore';

type SeatsLoaderParams = {
  intervalIdThere?: string;
  intervalIdBack?: string;
  bustypeIdThere?: number;
  bustypeIdBack?: number;
  setBusPlanAndFreeSeats: (data: Partial<BookingState>) => void;
};

export const useSeatsLoader = ({
  intervalIdThere,
  intervalIdBack,
  bustypeIdThere,
  bustypeIdBack,
  setBusPlanAndFreeSeats,
}: SeatsLoaderParams) => {
  useEffect(() => {
    const load = async () => {
      const [freeSeatsThere, freeSeatsBack, busPlanThere, busPlanBack] = await Promise.all([
        getFreeSeats({ interval_id: intervalIdThere, fixed_types: true }),
        intervalIdBack
          ? getFreeSeats({ interval_id: intervalIdBack, fixed_types: true })
          : Promise.resolve(null),
        getPlan({ bustype_id: bustypeIdThere, v: 2.0, position: 'h', fixed_types: true }),
        bustypeIdBack
          ? getPlan({ bustype_id: bustypeIdBack, v: 2.0, position: 'h', fixed_types: true })
          : Promise.resolve(null),
      ]);

      setBusPlanAndFreeSeats({
        busPlanBack: busPlanBack?.data || null,
        freeSeatsThere: freeSeatsThere.data,
        freeSeatsBack: freeSeatsBack?.data || null,
        busPlanThere: busPlanThere.data,
      });
    };

    load();
  }, [intervalIdThere, intervalIdBack, bustypeIdThere, bustypeIdBack, setBusPlanAndFreeSeats]);
};
