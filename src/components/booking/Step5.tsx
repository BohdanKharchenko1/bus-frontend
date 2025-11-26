import NewOrderButton from './step5/components/NewOrderButton.tsx';
import { cancelTicket } from '../../api/bus.ts';
import { useBookingStore } from '../../stores/bookingStore.ts';
import BuyTicketButton from './step5/components/BuyTicketButton.tsx';

type Step5Props = {
  onPrevious?: () => void;
};
export default function Step5({ onPrevious }: Step5Props) {
  const orderId = useBookingStore((s) => s.newOrder?.order_id);
  const resetNewOrder = useBookingStore((s) => s.resetNewOrder);

  const handleReturn = () => {
    cancelTicket({ order_id: orderId });
    resetNewOrder();
    onPrevious?.();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleReturn}
        className="w-32 px-5 py-2 text-center rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
      >
        ← Previous
      </button>

      <NewOrderButton />
      <BuyTicketButton />
    </>
  );
}
