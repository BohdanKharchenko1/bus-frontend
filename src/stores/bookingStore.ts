import { create } from 'zustand/react';
import { Lang } from '../enums/bookingEnums.ts';
import { Point } from '@/components/partials/SearchableInput.tsx';
import { BusPlan, FreeSeats, RouteError, RouteItemType } from '@/types/routes.ts';
import { persist } from 'zustand/middleware';

interface BookingState {
  trans?: string;
  lang?: Lang;
  passengerCount: number;
  from?: Point;
  to?: Point;
  step: number;
  startDate: string;
  endDate: string;
  routeThere?: RouteItemType;
  routeBack?: RouteItemType;
  freeSeatsThere: FreeSeats[];
  freeSeatsBack?: FreeSeats[];
  busPlanThere: BusPlan | null;
  busPlanBack?: BusPlan;
  allRoutesThere: RouteItemType[] | RouteError;
  allRoutesBack?: RouteItemType[] | RouteError;
  setStep1: (data: Partial<BookingState>) => void;
  setAllRoutes: (dataThere: RouteItemType[], dataBack: RouteItemType[]) => void;
  nextStep: () => void;
  previousStep: () => void;
  setRoute: (route: RouteItemType, direction: 'there' | 'back') => void;
  setBusPlanAndFreeSeats: (busPlan: Partial<BookingState>) => void;
}
export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      freeSeatsThere: [],
      busPlanThere: null,
      endDate: '',
      startDate: '',
      passengerCount: 0,
      step: 1,
      allRoutesThere: [],
      setRoute: (route: RouteItemType, direction: 'there' | 'back') =>
        set(() => (direction === 'there' ? { routeThere: route } : { routeBack: route })),
      setStep1: (data) => set((state) => ({ ...state, ...data })),
      nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 5) })),
      previousStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
      setAllRoutes: (dataThere: RouteItemType[], dataBack: RouteItemType[]) =>
        set((state) => ({
          ...state,
          allRoutesThere: dataThere,
          allRoutesBack: dataBack || null,
        })),
      setBusPlanAndFreeSeats: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'booking',
    },
  ),
);
