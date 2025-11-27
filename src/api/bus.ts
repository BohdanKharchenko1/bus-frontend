import { baseUrl } from '../lib/axios';
import { AxiosResponse } from 'axios';

export const getPoints: any = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_points', body);
};

export const getRoutes = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_routes', body);
};

export const getPlan = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_plan', body);
};
export const getFreeSeats = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_free_seats', body);
};

export const getBaggage = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_baggage', body);
};
export const getDiscount = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/get_discount', body);
};
export const newOrder = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/new_order', body);
};
export const cancelTicket = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/cancel_ticket', body);
};
export const buyTicket = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/buy_ticket', body);
};
