import { create } from 'zustand/react';
import { Point } from '@/components/partials/SearchableInput.tsx';
import {
  BaggageItem,
  BusPlan,
  FreeSeatsResponse,
  RouteError,
  RouteItemType,
} from '@/types/routes.ts';
import { persist } from 'zustand/middleware';

export interface BookingState {
  trans?: string;
  lang?: string;
  passengerCount: number;
  currency?: 'UAH' | 'CZK';
  email: string;
  phone: string;
  from?: Point;
  to?: Point;
  step: number;
  startDate: string;
  endDate: string | undefined | null;
  name: (string | undefined)[];
  surname: (string | undefined)[];
  discountsThere?: any;
  discountsBack?: any;
  baggage?: string[][];
  baggageThere?: BaggageItem[];
  baggageBack?: BaggageItem[];
  discounts?: number[][];
  routeThere?: RouteItemType | undefined;
  routeBack?: RouteItemType | undefined;
  freeSeatsThere: FreeSeatsResponse | undefined;
  freeSeatsBack?: FreeSeatsResponse | undefined;
  busPlanThere: BusPlan | null;
  busPlanBack?: BusPlan;
  seat: string[][];
  blockedSeats: string[][];
  newOrder?: { order_id?: string | number; reservation_until: string } | null;
  ticket?: { orderId: string | number; link: string } | null;
  reservationConfirmed: boolean;
  allRoutesThere: RouteItemType[] | RouteError | null;
  allRoutesBack: RouteItemType[] | RouteError | null;
  setStep1: (data: Partial<BookingState>) => void;
  setAllRoutes: (dataThere: RouteItemType[] | null, dataBack: RouteItemType[] | null) => void;
  nextStep: () => void;
  previousStep: () => void;
  setRoute: (route: RouteItemType | undefined, direction: 'there' | 'back') => void;
  setBusPlanAndFreeSeats: (busPlan: Partial<BookingState>) => void;
  savePassengers: (payload: Partial<BookingState>) => void;
  saveBaggageAndDiscounts: (payload: Partial<BookingState>) => void;
  saveStep3: (payload: Partial<BookingState>) => void;
  setSeat: (payload: Partial<BookingState>) => void;
  setNewOrder: (payload: Partial<BookingState>) => void;
  setTicket: (ticket: BookingState['ticket']) => void;
  setBlockedSeats: (payload: Partial<BookingState>) => void;
  reset: () => void;
  resetNewOrder: () => void;
  setLang: (lang: string) => void;
}
const initialState = {
  passengerCount: 1,
  currency: undefined,
  from: undefined,
  to: undefined,
  step: 1,
  startDate: '',
  endDate: null,
  name: [],
  surname: [],
  email: '',
  phone: '',
  discountsThere: undefined,
  discountsBack: undefined,
  baggageThere: undefined,
  baggageBack: undefined,
  discounts: [],
  baggage: [[]],
  routeThere: undefined,
  routeBack: undefined,
  freeSeatsThere: undefined,
  freeSeatsBack: undefined,
  busPlanThere: null,
  busPlanBack: undefined,
  allRoutesThere: [],
  allRoutesBack: [],
  seat: [[]],
  blockedSeats: [[]],
  newOrder: null,
  ticket: null,
  reservationConfirmed: false,
  trans: undefined,
  lang: undefined,
} satisfies Omit<
  BookingState,
  | 'setStep1'
  | 'setAllRoutes'
  | 'nextStep'
  | 'previousStep'
  | 'setRoute'
  | 'setBusPlanAndFreeSeats'
  | 'savePassengers'
  | 'saveBaggageAndDiscounts'
  | 'saveStep3'
  | 'setSeat'
  | 'setNewOrder'
  | 'setTicket'
  | 'setBlockedSeats'
  | 'reset'
  | 'resetNewOrder'
  | 'setLang'
>;
export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,
      saveStep3: (payload: Partial<BookingState>) =>
        set(() => ({
          discounts: payload.discounts,
          name: payload.name,
          surname: payload.surname,
          phone: payload.phone,
          email: payload.email,
          baggage: payload.baggage,
        })),
      savePassengers: (payload) =>
        set(() => ({
          name: payload.name,
          surname: payload.surname,
        })),
      saveBaggageAndDiscounts: (data) => set((state) => ({ ...state, ...data })),
      setRoute: (route: RouteItemType | undefined, direction: 'there' | 'back') =>
        set(() => (direction === 'there' ? { routeThere: route } : { routeBack: route })),
      setLang: (lang: string) => set(() => ({ lang: lang })),
      setBlockedSeats: (data) => set((state) => ({ ...state, ...data })),
      setStep1: (data) => set((state) => ({ ...state, ...data })),
      nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 5) })),
      previousStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
      setAllRoutes: (dataThere: RouteItemType[] | null, dataBack: RouteItemType[] | null) =>
        set((state) => ({
          ...state,
          allRoutesThere: dataThere || null,
          allRoutesBack: dataBack || null,
        })),
      setNewOrder: (data) => set((state) => ({ ...state, ...data })),
      setTicket: (ticket) => set(() => ({ ticket })),
      setBusPlanAndFreeSeats: (data) => set((state) => ({ ...state, ...data })),
      setSeat: (data) => set((state) => ({ ...state, ...data })),
      reset: () => {
        set(() => ({ ...initialState }));
        localStorage.removeItem('booking');
      },
      resetNewOrder: () =>
        set(() => ({ newOrder: undefined, ticket: null, reservationConfirmed: false })),
    }),
    {
      name: 'booking',
    },
  ),
);
