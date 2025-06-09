import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { getSeatsAPI, ScreeningSeats } from '@/api/seat.api';
import { Card } from '@/components/ui/card';

export function Seats() {
  const [seats, setSeats] = useState<ScreeningSeats | null>(null);
  console.log(seats);

  const location = useLocation();

  const screeningInfo = location.state?.screeningInfo;
  console.log(screeningInfo);
  const { movie, theater } = screeningInfo;

  useEffect(() => {
    if (screeningInfo.id) {
      getSeatsAPI(screeningInfo.id).then(res => {
        setSeats(res.data);
      });
    }
  }, []);
  return (
    <>
      <div className="flex justify-center px-4 py-4 sm:py-10">
        <Card className="w-6xl gap-0 p-0">
          <div className="h-full p-2">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-xl font-semibold">좌석 예매</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="aspect-3/4 w-40 rounded-2xl"
                  />
                  <div className="flex flex-col items-start">
                    <p className="text-2xl font-semibold">{movie.title}</p>
                    <p>{screeningInfo.startTime.substr(5, 11)}</p>
                    <p>상영 시간: {movie.runtime}분</p>
                    <p>
                      {theater.location} {theater.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>dd</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
