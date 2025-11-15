import { Card, CardContent } from '../../components/ui/card.tsx';
import { RouteItemType } from '../../types/routes.ts';
import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';

type RouteItemProps = {
  route: RouteItemType;
};

export default function RouteItem({ route }: RouteItemProps) {
  const { setRoute } = useBookingStore(
    useShallow((state) => ({
      setRoute: state.setRoute,
    })),
  );
  return (
    <Card className=" rounded-2xl shadow-sm border border-gray-100 overflow-hidden bg-stone-100">
      <CardContent className="flex justify-between p-6 gap-8">
        <div className="flex items-start gap-16">
          <div className="flex flex-col items-center justify-between relative h-full">
            <div className="flex flex-col items-center">
              <div className="text-gray-500 font-medium">{route.date_from}</div>
              <div className="text-2xl font-bold">{route.time_from}</div>
            </div>

            {/* Center (duration) */}
            <div className="flex flex-col items-center flex-1 justify-center">
              <div className="text-gray-400 text-lg font-medium mt-2 mb-2">{route.time_in_way}</div>
            </div>

            {/* To */}
            <div className="flex flex-col items-center">
              <div className="text-gray-500 font-medium">{route.date_to}</div>
              <div className="text-2xl font-bold">{route.time_to}</div>
            </div>
          </div>

          {/* Locations column */}
          <div className="flex flex-col justify-between h-full">
            {/* Departure */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-4 border-purple-700"></div>
                <span className="font-bold text-lg">{route.point_from}</span>
              </div>
              <div className="text-gray-500 font-medium ml-6">{route.station_from}</div>
            </div>

            {/* Arrival */}
            <div className="mt-[5rem] flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-700"></div>
                <span className="font-bold text-lg">{route.point_to}</span>
              </div>
              <div className="text-gray-500 font-medium ml-6">{route.station_to}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex flex-row items-baseline gap-1">
            <div className="text-gray-500 font-semibold">Price:</div>
            <div className=" text-xl align-text-bottom whitespace-nowrap font-bold">
              {route.price_one_way} {route.currency}
            </div>
          </div>
          <button
            onClick={() => setRoute(route)}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-lg px-10 py-3 rounded-md transition"
          >
            Booking
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
