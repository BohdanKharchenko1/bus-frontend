import { useBookingStore } from '../../../../stores/bookingStore.ts';
import { buildNewOrderPayload } from '../utils/buildNewOrderPayload.ts';
import { newOrder } from '../../../../api/bus.ts';

export default function NewOrderButton() {
  const setNewOrder = useBookingStore((s) => s.setNewOrder);
  const createNewOrder = () => {
    const payload = buildNewOrderPayload();
    const load = async () => {
      const response = await newOrder(payload);
      setNewOrder({ newOrder: response.data });
    };
    load();
  };
  return (
    <button type="button" onClick={createNewOrder} className="w-20 h-7 bg-red-500">
      Create New Order
    </button>
  );
}
