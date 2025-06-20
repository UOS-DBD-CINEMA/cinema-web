import { useEffect, useState } from 'react';

import { getTicketsAPI, type Ticket } from '@/api/ticket.api';
import { seatRowAlphabets } from '@/constants/seat';

import { Button } from './ui/button';

export function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  console.log(tickets);

  useEffect(() => {
    getTicketsAPI().then(res => {
      setTickets(res.data);
    });
  }, []);
  return (
    <>
      {tickets.map(ticket => {
        const { movie, seats, theater } = ticket;
        return (
          <div
            key={ticket.ticketId}
            className="flex flex-wrap items-center justify-center gap-4 border-t border-dashed py-2"
          >
            <div className="flex w-xs items-center gap-2 sm:w-md">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="aspect-3/4 w-30 rounded-2xl"
              />
              <div className="flex flex-col items-start">
                <p className="truncate text-2xl font-semibold">{movie.title}</p>
                <p>{ticket.screeningTime.substr(5, 11)}</p>
                <p>상영 시간: {movie.runtime}분</p>
                <p>
                  {theater.location} {theater.name}
                </p>
                <p>인원: {seats.length}</p>
                <p>
                  좌석:&ensp;
                  {seats.map((seat, i) => (
                    <span key={i}>
                      {seatRowAlphabets[seat.row]}
                      {seat.col}
                      &ensp;
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="secondary">
                결제 내역
              </Button>
              <Button size="sm">입장하기</Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
