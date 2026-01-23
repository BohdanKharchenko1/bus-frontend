import { useEffect } from 'react';
import { useBookingStore } from '../../../../stores/bookingStore.ts';
import { buildNewOrderPayload } from '../utils/buildNewOrderPayload.ts';
import { newOrder } from '../../../../api/bus.ts';

type UseCreateNewOrderOptions = {
  onCreated?: () => void;
};

export default function useCreateNewOrder(options?: UseCreateNewOrderOptions) {
  const onCreated = options?.onCreated;
  const setNewOrder = useBookingStore((s) => s.setNewOrder);

  useEffect(() => {
    const payload = buildNewOrderPayload();
    const load = async () => {
      const response = await newOrder(payload);
      setNewOrder({ newOrder: response.data });
      onCreated?.();
    };

    load();
  }, [onCreated, setNewOrder]);
}
