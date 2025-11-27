import { create } from 'zustand/react';
import { Lang } from '../enums/bookingEnums.ts';
import { Point } from '@/components/partials/SearchableInput.tsx';
import { BaggageItem, BusPlan, FreeSeats, RouteError, RouteItemType } from '@/types/routes.ts';
import { persist } from 'zustand/middleware';

const initialState = {
  passengerCount: 0,
  from: undefined,
  to: undefined,
  step: 1,
  startDate: '',
  endDate: null,
  name: [],
  surname: [],
  discountsThere: undefined,
  discountsBack: undefined,
  baggageThere: undefined,
  baggageBack: undefined,
  discounts: [],
  routeThere: undefined,
  routeBack: undefined,
  freeSeatsThere: [],
  freeSeatsBack: [],
  busPlanThere: null,
  busPlanBack: undefined,
  allRoutesThere: [],
  allRoutesBack: [],
  seat: [[], []],
};

interface BookingState {
  trans?: string;
  lang?: string;
  passengerCount: number;
  email: string;
  phone: string;
  from?: Point;
  to?: Point;
  step: number;
  startDate: string;
  endDate: string | undefined | null;
  name: (string | undefined)[];
  surname: (string | undefined)[];
  discountsThere?;
  discountsBack?;
  baggage: unknown;
  baggageThere?: BaggageItem[];
  baggageBack?: BaggageItem[];
  discounts?: number[][];
  routeThere?: RouteItemType | undefined;
  routeBack?: RouteItemType | undefined;
  freeSeatsThere: FreeSeats[];
  freeSeatsBack?: FreeSeats[];
  busPlanThere: BusPlan | null;
  busPlanBack?: BusPlan;
  seat: string[][];
  newOrder: unknown;
  allRoutesThere: RouteItemType[] | RouteError;
  allRoutesBack: RouteItemType[] | RouteError;
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
  reset: () => void;
  resetNewOrder: () => void;
  setLang: (lang: string) => void;
}
export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      freeSeatsThere: [],
      seat: [[], []],
      allRoutesBack: [],
      busPlanThere: null,
      endDate: null,
      startDate: '',
      passengerCount: 0,
      step: 1,
      allRoutesThere: [],
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

      setStep1: (data) => set((state) => ({ ...state, ...data })),
      nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 5) })),
      previousStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
      setAllRoutes: (dataThere: RouteItemType[], dataBack: RouteItemType[]) =>
        set((state) => ({
          ...state,
          allRoutesThere: dataThere || null,
          allRoutesBack: dataBack || null,
        })),
      setNewOrder: (data) => set((state) => ({ ...state, ...data })),
      setBusPlanAndFreeSeats: (data) => set((state) => ({ ...state, ...data })),
      setSeat: (data) => set((state) => ({ ...state, ...data })),
      reset: () => {
        set(initialState);
        localStorage.removeItem('booking');
      },
      resetNewOrder: () => set(() => ({ newOrder: undefined })),
    }),
    {
      name: 'booking',
    },
  ),
);
