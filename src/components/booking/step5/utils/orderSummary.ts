export type StoredPassenger = {
  name?: string | null;
  surname?: string | null;
  seat?: string | null;
};

export type StoredTrip = {
  trip_id?: number;
  route_back?: number;
  date_from?: string;
  time_from?: string;
  time_to?: string;
  point_from?: string;
  point_to?: string;
  passengers?: StoredPassenger[];
};

export type StoredOrder = {
  order_id?: number | string;
  price_total?: number;
  currency?: string;
  [key: string]: unknown;
};

type SummaryLabels = {
  emptyValue: string;
  autoSeat: string;
  outbound: string;
  returnTrip: string;
};

type OrderSummary = {
  routeLabel: string;
  dateLabel: string;
  passengersValue: string;
  seatsValue: string;
  totalDisplay: string;
};

const formatDate = (value?: string | null) => (value ? new Date(value).toLocaleDateString() : '');

const getTrips = (newOrder?: StoredOrder | null) =>
  Object.values(newOrder ?? {}).filter(
    (value): value is StoredTrip => !!value && typeof value === 'object' && 'trip_id' in value,
  );

const formatRouteTime = (trip?: StoredTrip) => {
  if (!trip) return '';
  const date = formatDate(trip.date_from);
  const timeRange = [trip.time_from, trip.time_to].filter(Boolean).join(' -> ');
  return [date, timeRange].filter(Boolean).join(', ');
};

const formatTotal = (totalValue: number) => {
  if (!Number.isFinite(totalValue)) return '0';
  const rounded = Math.round(totalValue * 100) / 100;
  return rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(2);
};

export const buildOrderSummary = (
  newOrder: StoredOrder | null | undefined,
  labels: SummaryLabels,
): OrderSummary => {
  const trips = getTrips(newOrder);

  const routeLabel = trips.length
    ? trips
        .map((trip) => [trip.point_from, trip.point_to].filter(Boolean).join(' - '))
        .filter(Boolean)
        .join(' / ')
    : labels.emptyValue;

  const dateLabel = trips.length
    ? trips.map((trip) => formatRouteTime(trip)).filter(Boolean).join(' / ')
    : labels.emptyValue;

  const passengerNames = trips
    .flatMap((trip) => trip.passengers ?? [])
    .map((passenger) => [passenger.name, passenger.surname].filter(Boolean).join(' ').trim())
    .filter(Boolean);

  const passengerCount = trips.reduce((sum, trip) => sum + (trip.passengers?.length ?? 0), 0);
  const passengersValue =
    passengerNames.length > 0
      ? passengerNames.join(', ')
      : passengerCount
        ? String(passengerCount)
        : labels.emptyValue;

  const seatsByTrip = trips.map((trip) => {
    const seats = (trip.passengers ?? [])
      .map((passenger) => passenger.seat)
      .filter(Boolean) as string[];
    const seatList = seats.length ? seats.join(', ') : labels.autoSeat;
    if (trips.length > 1) {
      const directionLabel = trip.route_back ? labels.returnTrip : labels.outbound;
      return `${directionLabel}: ${seatList}`;
    }
    return seatList;
  });
  const seatsValue = seatsByTrip.length ? seatsByTrip.join(' / ') : labels.autoSeat;

  const total = Number(newOrder?.price_total ?? 0);
  const totalCurrency = newOrder?.currency ?? '';
  const formattedTotal = formatTotal(total);
  const totalDisplay = totalCurrency ? `${formattedTotal} ${totalCurrency}` : formattedTotal;

  return {
    routeLabel,
    dateLabel,
    passengersValue,
    seatsValue,
    totalDisplay,
  };
};
