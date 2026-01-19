import { useBookingStore } from '../../../../stores/bookingStore.ts';
import { buyTicket } from '../../../../api/bus.ts';
import { Button } from '../../../ui/button.tsx';
import { cn } from '../../../../lib/utils.ts';
import i18n from 'i18next';

type BuyTicketButtonProps = {
  label?: string;
  className?: string;
};

export default function BuyTicketButton({ label = 'Buy', className }: BuyTicketButtonProps) {
  const order = useBookingStore((s) => s.newOrder);
  const email = useBookingStore((s) => s.email);
  const orderLanguage = i18n.language;

  const ticketInformation = { order, email, orderLanguage };
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
    <Button type="button" onClick={handleBuyTicket} className={cn(className)}>
      {label}
    </Button>
  );
}
