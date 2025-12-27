import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';

interface UserState {
  id: string | null;
  email: string | null;
  paymentLink: string | null;
  setUser: (id: string, email: string) => void;
  clearUser: () => void;
  setPaymentLink: (id: string) => void;
  clearPaymentLink: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: null,
      email: null,
      paymentLink: null,

      setUser: (id, email) => set({ id, email }),
      clearUser: () => set({ id: null, email: null }),
      setPaymentLink: (link: string) => set({ paymentLink: link }),
      clearPaymentLink: () => set({ paymentLink: null }),
    }),
    {
      name: 'user',
    },
  ),
);
