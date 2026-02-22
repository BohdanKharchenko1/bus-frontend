import { useBookingStore } from '../../../../stores/bookingStore.ts';
import { buyTicket, reserveTicket } from '../../../../api/bus.ts';
import { Button } from '../../../ui/button.tsx';
import { cn } from '../../../../lib/utils.ts';
import i18n from 'i18next';
import { useState } from 'react';

type BuyTicketButtonProps = {
  payNowLabel?: string;
  payOnBoardLabel?: string;
  payNowClassName?: string;
  payOnBoardClassName?: string;
  containerClassName?: string;
};

export default function BuyTicketButton({
  payNowLabel = 'Pay now',
  payOnBoardLabel = 'Pay on boarding',
  payNowClassName,
  payOnBoardClassName,
  containerClassName,
}: BuyTicketButtonProps) {
  const order = useBookingStore((s) => s.newOrder);
  const email = useBookingStore((s) => s.email);
  const orderLanguage = i18n.language;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ticketInformation = { order, email, orderLanguage };
  const handleBuyTicket = async () => {
    setIsSubmitting(true);
    const newTab = window.open('', '_blank');
    if (!newTab) {
      setIsSubmitting(false);
      return;
    }

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReserveTicket = async () => {
    try {
      setIsSubmitting(true);
      await reserveTicket(ticketInformation);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('grid gap-2', containerClassName)}>
      <Button
        type="button"
        onClick={handleBuyTicket}
        disabled={isSubmitting}
        className={cn(payNowClassName)}
      >
        {payNowLabel}
      </Button>
      <Button
        type="button"
        onClick={handleReserveTicket}
        disabled={isSubmitting}
        className={cn(payOnBoardClassName)}
      >
        {payOnBoardLabel}
      </Button>
    </div>
  );
}
