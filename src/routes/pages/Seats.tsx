import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import {
  getSeatsAPI,
  type ScreeningSeats as ScreeningSeatsT,
  Seat,
} from '@/api/seat.api';
import { NumToggleGroup } from '@/components/NumToggleGroup';
import { SeatGrid } from '@/components/SeatGrid';
import { useAuthStore } from '@/store/authStore';

export function Seats() {
  const [screeningSeats, setScreeningSeats] = useState<ScreeningSeatsT | null>(
    null,
  );

  const [adultNum, setAdultNum] = useState<number>(0);
  const [youthNum, setYouthNum] = useState<number>(0);
  const [elderNum, setElderNum] = useState<number>(0);
  const [disabledNum, setDisabledNum] = useState<number>(0);

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const { isLogin } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const screening = location.state?.screening;
  const { movie, theater } = screening;

  const totalNum = useMemo(() => {
    return adultNum + youthNum + elderNum + disabledNum;
  }, [adultNum, youthNum, elderNum, disabledNum]);

  const handleTicketing = () => {
    if (totalNum && totalNum !== selectedSeats.length) return;
    if (!isLogin) {
      alert('로그인 후 이용 가능합니다.');
      return navigate('/');
    }

    navigate('/ticketing/payment', {
      state: {
        screening,
        selectedSeats: selectedSeats.sort(
          (a, b) => a.row - b.row || a.col - b.col,
        ),
      },
    });
  };

  useEffect(() => {
    const seats = selectedSeats;
    if (seats.length > totalNum) {
      setSelectedSeats(seats.slice(0, -(seats.length - totalNum)));
    }
  }, [totalNum, selectedSeats]);

  useEffect(() => {
    if (screening.id) {
      getSeatsAPI(screening.id).then(res => {
        setScreeningSeats(res.data);
      });
    }
  }, [screening.id]);
  return (
    <div className="flex overflow-auto p-4 sm:justify-center sm:py-8">
      <Card className="w-5xl gap-0 p-0">
        <div className="flex flex-col items-center gap-4 p-2">
          <h1 className="text-xl font-semibold">좌석 선택</h1>
          <div className="flex flex-wrap items-center justify-center gap-12">
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
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <div>성인:</div>
                <NumToggleGroup
                  maxNum={8}
                  selectedNum={adultNum}
                  setSelectedNum={setAdultNum}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>청소년:</div>
                <NumToggleGroup
                  maxNum={8}
                  selectedNum={youthNum}
                  setSelectedNum={setYouthNum}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>경로:</div>
                <NumToggleGroup
                  maxNum={8}
                  selectedNum={elderNum}
                  setSelectedNum={setElderNum}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>장애인:</div>
                <NumToggleGroup
                  maxNum={8}
                  selectedNum={disabledNum}
                  setSelectedNum={setDisabledNum}
                />
              </div>
            </div>
          </div>
          <div className="bg-muted-foreground text-black` flex w-full justify-center font-semibold">
            S C R E E N
          </div>
          {screeningSeats && (
            <SeatGrid
              screeningSeats={screeningSeats}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              totalNum={totalNum}
            />
          )}
          <Button size="lg" onClick={handleTicketing}>
            예매하기
          </Button>
        </div>
      </Card>
    </div>
  );
}
