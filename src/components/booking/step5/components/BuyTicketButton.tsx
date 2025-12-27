import { useBookingStore } from '../../../../stores/bookingStore.ts';
import { buyTicket } from '../../../../api/bus.ts';
import { useUserStore } from '../../../../stores/userStore.ts';

export default function BuyTicketButton() {
  const order = useBookingStore((s) => s.newOrder);
  const paymentLink = useUserStore((s) => s.paymentLink);
  const setPaymentLink = useUserStore((s) => s.setPaymentLink);
  const clearPaymentLink = useUserStore((s) => s.clearPaymentLink);
  const handleBuyTicket = async () => {
    const newTab = window.open('', '_blank');

    if (!paymentLink) {
      const data = await buyTicket(order);
      setPaymentLink(data.data.response.checkout_url);
      setTimeout(() => clearPaymentLink(), 900000);
    }
    if (paymentLink && newTab) {
      newTab.location.href = paymentLink;
    }
  };

  return (
    <button type="button" onClick={handleBuyTicket} className="w-20 h-7 bg-red-500">
      Buy
    </button>
  );
}
