import { parseUtcPlus1 } from '../utils/parseUtc+1';
import { useEffect, useState } from 'react';

export default function OrderTimer({ reservation_until }: { reservation_until?: string }) {
  const [remainingMs, setRemainingMs] = useState(0);

  useEffect(() => {
    if (!reservation_until) return;

    const reservationUntil = parseUtcPlus1(reservation_until);

    const tick = () => {
      setRemainingMs(Math.max(0, reservationUntil.getTime() - Date.now()));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [reservation_until]);

  if (!reservation_until) {
    return null;
  }

  if (remainingMs === 0) {
    return <span>Reservation expired</span>;
  }

  const sec = Math.ceil(remainingMs / 1000);
  const min = Math.floor(sec / 60);

  return (
    <span>
      Time left: {min}:{String(sec % 60).padStart(2, '0')}
    </span>
  );
}
