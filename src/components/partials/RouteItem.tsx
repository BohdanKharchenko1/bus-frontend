import { Card, CardContent } from '../../components/ui/card.tsx';
import { RouteItemType } from '../../types/routes.ts';
import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';

type RouteItemProps = {
  route: RouteItemType;
  direction: 'there' | 'back';
};

export default function RouteItem({ route, direction }: RouteItemProps) {
  const { setRoute, routeThere, routeBack } = useBookingStore(
    useShallow((state) => ({
      setRoute: state.setRoute,
      routeThere: state.routeThere,
      routeBack: state.routeBack,
    })),
  );

  const handleClick = (route: RouteItemType, direction: 'there' | 'back') => {
    if (isSelected) {
      setRoute(undefined, direction);
    } else {
      setRoute(route, direction);
    }
  };

  const isSelected =
    direction === 'there'
      ? routeThere?.route_id === route.route_id
      : routeBack?.route_id === route.route_id;
  return (
    <Card className=" rounded-2xl shadow-sm border border-gray-100 overflow-hidden bg-stone-100">
      <CardContent className="flex justify-between p-6 gap-8">
        <div className="flex items-start gap-16">
          <div className="flex flex-col items-center justify-between relative h-full">
            <div className="flex flex-col items-center">
              <div className="text-gray-500 font-medium">
                {new Date(route.date_from).toLocaleDateString()}
              </div>
              <div className="text-2xl font-bold">{route.time_from}</div>
            </div>

            <div className="flex flex-col items-center flex-1 justify-center">
              <div className="text-gray-400 text-lg font-medium mt-2 mb-2">{route.time_in_way}</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-gray-500 font-medium">
                {new Date(route.date_to).toLocaleDateString()}
              </div>
              <div className="text-2xl font-bold">{route.time_to}</div>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-4 border-purple-700"></div>
                <span className="font-bold text-lg">{route.point_from}</span>
              </div>
              <div className="text-gray-500 font-medium text-left ">{route.station_from}</div>
            </div>

            <div className="mt-[5rem] flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-700"></div>
                <span className="font-bold text-lg">{route.point_to}</span>
              </div>
              <div className="text-gray-500 font-medium text-left">{route.station_to}</div>
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
            onClick={() => handleClick(route, direction)}
            className={
              `font-bold text-md text-white px-10 py-3 rounded-md transition ` +
              (isSelected ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-700 hover:bg-purple-800')
            }
          >
            {isSelected ? 'Selected' : 'Booking'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
