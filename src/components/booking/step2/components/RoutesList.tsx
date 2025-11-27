import RouteItem from '../../../partials/RouteItem';
import { RouteError, RouteItemType } from '../../../../types/routes';

type RoutesListProps = {
  data: RouteItemType[] | RouteError | null | undefined;
  direction: 'there' | 'back';
};

const RoutesList = ({ data, direction }: RoutesListProps) => {
  if (!data) return null;

  if (!Array.isArray(data) && 'error' in data) {
    return (
      <div className="text-center py-8 text-gray-500 text-lg">
        <span className="block text-2xl font-semibold text-gray-700">No routes found</span>
        <span className="mt-1 block">Try selecting a different date.</span>
      </div>
    );
  }

  if (!Array.isArray(data)) return null;

  return data.map((route) => <RouteItem key={route.route_id} route={route} direction={direction} />);
};

export default RoutesList;
