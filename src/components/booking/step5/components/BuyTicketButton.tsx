import { useBookingStore } from '../../../../stores/bookingStore.ts';
import { buyTicket } from '../../../../api/bus.ts';

export default function BuyTicketButton() {
  const order = useBookingStore((s) => s.newOrder);
  const email = useBookingStore((s) => s.email);

  const ticketInformation = { order, email };
  const handleBuyTicket = async () => {
    const newTab = window.open('', '_blank');
    if (!newTab) return;

    try {
      const res = await buyTicket(ticketInformation);
      const checkoutUrl = res.data.checkout_url;

      if (!checkoutUrl) {
        throw new Error('Missing checkout URL');
      }

      newTab.location.href = checkoutUrl;
    } catch (err) {
      newTab.close();
      throw err;
    }
  };

  return (
    <button type="button" onClick={handleBuyTicket} className="w-20 h-7 bg-red-500">
      Buy
    </button>
  );
}
