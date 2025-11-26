import { useBookingStore } from '../../../../stores/bookingStore.ts';
import { buyTicket } from '../../../../api/bus.ts';

export default function BuyTicketButton() {
  const orderId = useBookingStore((s) => s.newOrder?.order_id);
  const handleBuyTicket = () => {
    buyTicket({ order_id: orderId });
  };
  return (
    <button type="button" onClick={handleBuyTicket} className="w-20 h-7 bg-red-500">
      Buy
    </button>
  );
}
