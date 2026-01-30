import { useEffect } from 'react';
import { useUserStore } from '../../../stores/userStore.ts';
import { getOrders } from '../../../api/bus.ts';

export default function Dashboard() {
  const setOrders = useUserStore((s) => s.setOrders);
  useEffect(() => {
    const getUserOrders = async () => {
      const orders = await getOrders();
      setOrders(orders.data);
    };
    getUserOrders();
  }, [setOrders]);
  return <></>;
}
