import { create } from 'zustand/react';
import { Lang } from '../enums/bookingEnums.ts';

type Passenger = {};

interface BookingState {
  idFrom?: string;
  idTo?: string;
  trans?: string;
  lang?: Lang;
  leavingDate?: Date;
  passengers?: Passenger[];
  passengerCount?: number;
  from?: string;
  to?: string;
  step: number;
  startDate?: string;
  endDate?: string;
  setStep1: (data: Partial<BookingState>) => void;
}
export const useBookingStore = create<BookingState>((set) => ({
  step: 0,
  setStep1: (data) => set((state) => ({ ...state, ...data })),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 5) })),
  previousStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
}));
