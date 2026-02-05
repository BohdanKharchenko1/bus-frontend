import { useEffect, useState } from 'react';
import { useUserStore } from '../../../stores/userStore.ts';
import { getOrders } from '../../../api/bus.ts';
import TicketsList from './TicketsList.tsx';

export default function Dashboard() {
  const orders = useUserStore((s) => s.orders);
  const setOrders = useUserStore((s) => s.setOrders);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const orders = await getOrders();
        setOrders(orders.data ?? []);
      } catch (error) {
        console.error('Failed to load orders', error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserOrders();
  }, [setOrders]);
  return <TicketsList orders={orders} isLoading={isLoading} />;
}
