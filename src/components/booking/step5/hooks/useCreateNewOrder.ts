import { useEffect } from 'react';
import { useBookingStore } from '../../../../stores/bookingStore.ts';
import { buildNewOrderPayload } from '../utils/buildNewOrderPayload.ts';
import { newOrder } from '../../../../api/bus.ts';

export function useCreateNewOrder() {
  const setNewOrder = useBookingStore((s) => s.setNewOrder);

  useEffect(() => {
    const payload = buildNewOrderPayload();
    console.log(payload);
    const load = async () => {
      const response = await newOrder(payload);
      setNewOrder({ newOrder: response.data });
    };

    load();
  }, []);
}
