import { Card } from '@ui/card';
import { useLocation } from 'react-router';

import { Seat } from '@/api/seat.api';
import { PaymentForm } from '@/components/PaymentForm';
import { seatRowAlphabets } from '@/constants/seat';

export function Payment() {
  const location = useLocation();
  const screening = location.state?.screening;
  const selectedSeats: Seat[] = location.state?.selectedSeats;
  const { movie, theater } = screening;

  return (
    <div className="flex overflow-auto p-4 sm:justify-center sm:py-8">
      <Card className="w-5xl gap-0 p-0">
        <div className="flex h-full flex-col items-center gap-6 p-2">
          <h1 className="text-xl font-semibold">결제</h1>
          <div className="flex items-center gap-2">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="aspect-3/4 w-40 rounded-2xl"
            />
            <div className="flex flex-col items-start">
              <p className="text-2xl font-semibold">{movie.title}</p>
              <p>{screening.startTime.substr(5, 11)}</p>
              <p>상영 시간: {movie.runtime}분</p>
              <p>
                {theater.location} {theater.name}
              </p>
              <p>인원: {selectedSeats.length}</p>
              <p>
                좌석:&ensp;
                {selectedSeats.map((seat, i) => (
                  <span key={i}>
                    {seatRowAlphabets[seat.row]}
                    {seat.col}
                    &ensp;
                  </span>
                ))}
              </p>
            </div>
          </div>
          <PaymentForm
            screeningId={screening.id}
            selectedSeats={selectedSeats}
          />
        </div>
      </Card>
    </div>
  );
}
