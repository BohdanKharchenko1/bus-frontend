import RouteItem from '../../../partials/RouteItem';
import { RouteError, RouteItemType } from '../../../../types/routes';
import { useTranslation } from 'react-i18next';

type RoutesListProps = {
  data: RouteItemType[] | RouteError | null | undefined;
  direction: 'there' | 'back';
};

const RoutesList = ({ data, direction }: RoutesListProps) => {
  const { t } = useTranslation('step2');
  if (!data) return null;

  if (!Array.isArray(data) && 'error' in data) {
    return (
      <div className="text-center py-6 sm:py-8 text-gray-500 text-base sm:text-lg">
        <span className="block text-xl sm:text-2xl font-semibold text-gray-700">
          {t('noRoutesTitle')}
        </span>
        <span className="mt-1 block">{t('noRoutesSubtitle')}</span>
      </div>
    );
  }

  if (!Array.isArray(data)) return null;

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {data.map((route) => (
        <RouteItem key={route.route_id} route={route} direction={direction} />
      ))}
    </div>
  );
};

export default RoutesList;
