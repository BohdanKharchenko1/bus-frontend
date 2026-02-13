import { useEffect, useState } from 'react';
import { useUserStore } from '../../../stores/userStore.ts';
import { getOrders } from '../../../api/bus.ts';
import TicketsList from './TicketsList.tsx';
import { isAxiosError } from 'axios';

export default function Dashboard() {
  const orders = useUserStore((s) => s.orders);
  const setOrders = useUserStore((s) => s.setOrders);
  const clearUser = useUserStore((s) => s.clearUser);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const orders = await getOrders();
        setOrders(orders.data ?? []);
      } catch (error: unknown) {
        if (isAxiosError(error) && error.response?.status === 401) {
          clearUser();
        }
      } finally {
        setIsLoading(false);
      }
    };
    getUserOrders();
  }, [clearUser, setOrders]);
  return <TicketsList orders={orders} isLoading={isLoading} />;
}
