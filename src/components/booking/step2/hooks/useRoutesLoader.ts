import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getRoutes } from '../../../../api/bus';
import { RouteItemType } from '../../../../types/routes';
import { AxiosResponse } from 'axios';
import i18n from 'i18next';
import useCurrency from '../../../../hooks/useCurrency.tsx';

type RoutesLoaderParams = {
  cityFromId?: number;
  cityToId?: number;
  dateFrom: string;
  dateTo?: string | null;
  setAllRoutes: (dataThere: RouteItemType[] | null, dataBack: RouteItemType[] | null) => void;
};

export const useRoutesLoader = ({
  cityFromId,
  cityToId,
  dateFrom,
  dateTo,
  setAllRoutes,
}: RoutesLoaderParams) => {
  const lang = i18n.language;
  const { currency } = useCurrency();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchRoutes = async () => {
      setIsLoading(true);
      let resBack: AxiosResponse<RouteItemType[]> | null = null;
      const resThere = await getRoutes({
        id_from: cityFromId,
        id_to: cityToId,
        date: format(dateFrom, 'yyyy-MM-dd'),
        lang: lang,
        currency: currency,
      });

      if (dateTo) {
        resBack = await getRoutes({
          id_from: cityToId,
          id_to: cityFromId,
          date: format(dateTo, 'yyyy-MM-dd'),
          lang: lang,
        });
      }
      setIsLoading(false);
      setAllRoutes(resThere.data, resBack?.data ?? []);
    };

    fetchRoutes();
  }, [cityFromId, cityToId, dateFrom, dateTo, setAllRoutes]);
  return { isLoading };
};
