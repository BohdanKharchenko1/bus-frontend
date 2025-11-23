import { baseUrl } from '../lib/axios';
import { AxiosResponse } from 'axios';

export const getPoints: any = async (body): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_points', body);
};

export const getRoutes = async (body): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_routes', body);
};

export const getPlan = async (body): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_plan', body);
};
export const getFreeSeats = async (body): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_free_seats', body);
};

export const getBaggage = async (body): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_baggage', body);
};
export const getDiscount = async (body): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_discount', body);
};
