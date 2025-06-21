import { httpClient } from '@/api/instance';
import { Movie } from '@/api/movie.api';
import { Payment } from '@/api/payment.api';
import { Seat } from '@/api/seat.api';
import { Theater } from '@/api/theater.api';

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

export type Ticket = {
  ticketId: number;
  movie: Movie;
  theater: Theater;
  screeningTime: string;
  seats: Omit<Seat, 'available'>[];
  totalAmount: number;
  payment: Payment;
};
