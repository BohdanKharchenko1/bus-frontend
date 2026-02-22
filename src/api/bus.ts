import { baseUrl } from '../lib/axios';
import { AxiosResponse } from 'axios';
import { LoginFormValues, SighUpFormValues } from '@/components/profile/schema/authSchema.ts';

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
export const registerUser = async (body: SighUpFormValues): Promise<AxiosResponse> => {
  return await baseUrl.post('auth/register', body);
};
export const loginUser = async (body: LoginFormValues): Promise<AxiosResponse> => {
  return await baseUrl.post('auth/login', body);
};
export const getOrders = async (): Promise<AxiosResponse> => {
  return await baseUrl.get('/user/get_orders');
};
export const saveBlockedSeats = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.put('/booking/save_blocked_seats', body);
};
export const sendInquiry = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/send_inquiry', body);
};
export const reserveTicket = async (body: any): Promise<AxiosResponse> => {
  return await baseUrl.post('/booking/reserve_ticket', body);
};
