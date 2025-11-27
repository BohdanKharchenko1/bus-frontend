import { useBookingStore } from '../../../../stores/bookingStore.ts';
import { buyTicket } from '../../../../api/bus.ts';

export default function BuyTicketButton() {
  const order = useBookingStore((s) => s.newOrder);
  const handleBuyTicket = () => {
    buyTicket(order);
  };
  return (
    <button type="button" onClick={handleBuyTicket} className="w-20 h-7 bg-red-500">
      Buy
    </button>
  );
}
