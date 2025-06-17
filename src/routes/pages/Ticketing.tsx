import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import {
  getScreeningsAPI,
  type Screening as ScreeningT,
} from '@/api/screening.api';
import { MovieBtns } from '@/components/MovieBtns';
import { Screening } from '@/components/Screening';
import { Card } from '@/components/ui/card';
import { useMovies } from '@/hooks/useMovies';

export function Ticketing() {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [screenings, setScreenings] = useState<ScreeningT[]>([]);

  const { data: moviesList } = useMovies();

  const location = useLocation();

  useEffect(() => {
    if (typeof selectedMovieId === 'number') {
      getScreeningsAPI(selectedMovieId).then(res => {
        setScreenings(res.data);
      });
    } else {
      setScreenings([]);
    }
  }, [selectedMovieId]);

  useEffect(() => {
    setSelectedMovieId(location.state?.movieId ?? null);

    // for (let i = 100; i < 120; i++) {
    //   moviesList?.push({
    //     id: i,
    //     title:
    //       'dddadsggegeaerherhrhaerrahrehargrsehrehsrehersherjeregagwrharherhehehearharhaererhaer',
    //   });
    // }
  }, [location.state?.movieId]);
  return (
    <div className="flex h-[calc(100svh-(--spacing(14)))] overflow-auto p-4 sm:justify-center sm:py-8">
      <Card className="w-6xl flex-row gap-0 p-0">
        <div className="w-3xs border-r p-2 sm:w-2xs lg:w-sm">
          {moviesList && (
            <MovieBtns
              moviesList={moviesList}
              selectedMovieId={selectedMovieId}
              setSelectedMovieId={setSelectedMovieId}
            />
          )}
        </div>
        <div className="flex p-2">
          <Screening screenings={screenings} />
        </div>
      </Card>
    </div>
  );
}
