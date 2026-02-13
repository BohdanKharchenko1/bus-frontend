import { FreeSeats } from '../../../../types/routes.ts';

export function filterBlockedSeats(
  blockedSeats: string[][] | undefined,
  allSeats: FreeSeats[] | undefined,
) {
  const blocked = new Set(blockedSeats?.flat());
  return allSeats?.map((info) => ({
    ...info,
    free_seat: info.free_seat.filter((seat) => !blocked.has(seat.seat_number)),
  }));
}
