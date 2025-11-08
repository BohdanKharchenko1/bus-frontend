import {create} from "zustand/react";
import {Lang} from "../enums/bookingEnums.ts";

type Passenger = {}

interface BookingState {
    id_from?: number,
    id_to?: number,
    trans?: string,
    lang?: Lang,
    leavingDate?: Date,
    passengers?: Passenger[],
    step: number,
}
export const useBookingStore = create<BookingState>((set) =>({
    step:0,
    nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 5)})),
    previousStep: () => set((s) => ({step: Math.max(s.step-1,1)}))
}))


