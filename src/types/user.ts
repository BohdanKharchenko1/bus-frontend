export type Order = {
  id: string;
  orderId: number;
  status: string;
  ticketLink: string | null;
  createdAt?: string;
  updatedAt?: string;
  pointFrom?: string | null;
  pointTo?: string | null;
};
