export interface RouteItemType {
  trans: string;
  trans_type: string;
  interval_id: string;
  route_id: number;
  bus_id: number;
  route_name: string;
  route_kod?: Record<string, unknown>;
  bustype_id: number;
  has_plan: number;
  bustype: string;
  carrier: string;
  carrier_id: number;
  comfort?: string;
  rating?: Record<string, unknown>;
  reviews?: Record<string, unknown>;
  logo?: string;
  buy: number;
  reserve: number;
  request: number;
  agent_sale_type: string;
  eticket: number;
  only_original: number;
  sum_backdisc: number;
  timetable_id: string;
  request_get_free_seats: number;
  request_get_discount: number;
  request_get_baggage: number;
  buy_open: number;
  day_open: number;
  international: number;
  inland: number;
  speed_type: number;
  need_orderdata: boolean;
  can_cyrillic_orderdata: number;
  need_birth: number;
  need_doc: number;
  need_doc_expire_date: number;
  need_citizenship: number;
  need_gender: number;
  need_middlename: number;
  lock_order: number;
  lock_min: number;
  reserve_min: number;
  max_seats: number;
  start_sale_day: number;
  stop_sale_hours: number;
  cancel_free_min: number;
  date_from: string;
  time_from: string;
  mktime_utc_from: number;
  point_from: string;
  country_from_id: number;
  point_from_id: number;
  station_from_id: number;
  station_from: string;
  station_from_lat: number;
  station_from_lon: number;
  platform_from?: Record<string, unknown>;

  change_route?: {
    item: ChangeRouteItem[];
  };

  date_to: string;
  time_to: string;
  mktime_utc_to: number;
  point_to: string;
  country_to_id: number;
  point_to_id: number;
  station_to_id: number;
  station_to: string;
  station_to_lat: number;
  station_to_lon: number;
  platform_to?: Record<string, unknown>;
  time_in_way: string;
  provision_rate: number;
  price_one_way: number;
  price_one_way_max: number;
  price_two_way: number;
  provision: number;
  currency: string;
  bonus_eur: number;

  discounts?: {
    item: DiscountItem[];
  };

  free_seats_info?: FreeSeatsInfo;
  free_seats?: {
    item: number[];
  };

  luggage?: string;
  route_info?: string;
  dispatcher_phone?: string;

  cancel_hours_info?: {
    item: CancelInfoItem;
  };

  route_foto?: {
    item: string[];
  };

  regulations_url?: number | string;
  ws: number;

  stations?: {
    departure?: { item: StationInfo };
    arrival?: { item: StationInfo };
  };

  search_id: string;
  logo_url?: string;
  period_is_supported: number;
}

export interface ChangeRouteItem {
  date_from: string;
  time_from: string;
  date_to: string;
  time_to: string;
  point_from: string;
  point_from_id: number;
  station_from: string;
  station_from_id: number;
  station_from_lat: number;
  station_from_lon: number;
  platform_from?: Record<string, unknown>;
  point_to: string;
  point_to_id: number;
  station_to: string;
  station_to_id: number;
  station_to_lat: number;
  station_to_lon: number;
  platform_to?: Record<string, unknown>;
  distance?: Record<string, unknown>;
  carrier: string;
  free_seats?: { item: number[] };
  trans: string;
  carrier_id: number;
  change_typ?: string;
  change_stations?: number;
  transfer_time?: { d: number; h: number; m: number };
}

export interface DiscountItem {
  discount_id: number;
  discount_name: string;
  discount_price: number;
}

export interface FreeSeatsInfo {
  count: {
    sitting: number;
    standing: number;
  };
  current_free_seats_typ: string;
  description: string;
}

export interface CancelInfoItem {
  hours_after_depar: number;
  hours_before_depar: number;
  cancel_rate: number;
  money_back: number;
  title: string;
}

export interface StationInfo {
  station_id: number;
  point_id: number;
  time: string;
  point_name: string;
  station_name: string;
  lat: number;
  lon: number;
  price?: {
    item: {
      station_id: number;
      price_one_way: number;
    };
  };
}
export interface FreeSeats {
  bustype_id: string;
  has_plan: boolean;
  free_seat: SeatInfo[];
}
interface SeatInfo {
  seat_number: string;
  seat_free: boolean;
  seat_type_descr: string;
  seat_price: number;
  seat_provision: number;
  seat_curency: string;
}

export interface BusPlan {
  plan_type: string;
  floors: Floor[];
}

export interface Floor {
  number: number;
  total_rows: number;
  total_columns: number;
  total_seats: number;
  row: Row[];
}

export interface Row {
  number: number;
  seat: SeatCell[];
}

export type SeatCell = Seat | EmptyCell | IconCell;

export interface Seat {
  number: string;
  type: 'seat';
}

export interface EmptyCell {
  number: null;
  type: 'empty';
}

export interface IconCell {
  number: null;
  type: 'icon';
  icon_name: string;
  icon: string;
}

export interface RouteError {
  error: string;
  detail: string;
}
type Discount = {
  discount_id: number | null;
  discount_name: string;
  discount_price: number;
  currency: string;
};

export interface DiscountResponse {
  route_id: number;
  discounts: Discount[];
}
export interface BaggageItem {
  baggage_id: string;
  baggage_type_id: string;
  baggage_type: string;
  baggage_title: string;
  baggage_type_abbreviated: string | null;
  currency: string;
  height: string;
  kg: string;
  length: string;
  max_in_bus: string;
  max_per_person: string;
  price: number;
  typ: string;
  width: string;
}
