import { httpClient } from '@/api/axios';
import { Seat } from '@/api/seat.api';

export const getTicketsAPI = async () => {
  return await httpClient.get('api/tickets/member');
};

export const postTicketAPI = async (ticketingPayload: TicketingPayload) => {
  return await httpClient.post('api/tickets/member', ticketingPayload);
};

type TicketingPayload = {
  screeningId: number;
  seats: Omit<Seat, 'available'>[];
  payment: {
    paymentType: string;
    discountType: string;
  };
};
