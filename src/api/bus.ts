import { baseUrl } from '../lib/axios';

type GetPoints = {
  autocomplete: string;
};

export const getPoints = async (body: GetPoints) => {
  return await baseUrl.post('/booking/get_points', { body });
};

export const allRoutes = async () => {
  return await baseUrl.get('/booking/get_routes');
};
