import { useEffect, useState } from 'react';
import { useBookingStore } from '../../../../stores/bookingStore.ts';

type TicketReadyPayload = {
  orderId: string | number;
  link: string;
};

type UseTicketStreamOptions = {
  orderId?: string | number;
  enabled?: boolean;
};

const buildTicketUrl = (orderId: string | number) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  if (!baseUrl) {
    return `/booking/ticket/${orderId}`;
  }
  return `${baseUrl.replace(/\/$/, '')}/booking/ticket/${orderId}`;
};

export default function useTicketStream({ orderId, enabled = true }: UseTicketStreamOptions) {
  const setTicket = useBookingStore((s) => s.setTicket);
  const currentTicket = useBookingStore((s) => s.ticket);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'open' | 'closed' | 'error'>('idle');

  useEffect(() => {
    if (!enabled || !orderId || currentTicket?.orderId === orderId) {
      return;
    }

    const eventSource = new EventSource(buildTicketUrl(orderId));
    setStatus('connecting');

    const handleOpen = () => setStatus('open');
    const handleError = () => setStatus('error');
    const handleTicketReady = (event: MessageEvent<string>) => {
      try {
        const payload = JSON.parse(event.data) as TicketReadyPayload;
        if (!payload?.link) {
          return;
        }
        setTicket({ orderId: payload.orderId, link: payload.link });
        eventSource.close();
        setStatus('closed');
      } catch {
        setStatus('error');
      }
    };

    eventSource.addEventListener('open', handleOpen);
    eventSource.addEventListener('error', handleError);
    eventSource.addEventListener('ticket_ready', handleTicketReady);

    return () => {
      eventSource.removeEventListener('open', handleOpen);
      eventSource.removeEventListener('error', handleError);
      eventSource.removeEventListener('ticket_ready', handleTicketReady);
      eventSource.close();
    };
  }, [enabled, orderId, currentTicket?.orderId, setTicket]);

  return { status };
}
