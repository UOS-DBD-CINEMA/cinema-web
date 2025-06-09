import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { getScreeningInfosAPI, ScreeningInfo } from '@/api/screening.api';
import { MovieBtns } from '@/components/MovieBtns';
import { Screening } from '@/components/Screening';
import { Card } from '@/components/ui/card';
import { useMovies } from '@/hooks/useMovies';

export function Ticketing() {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [screeningInfos, setScreeningInfos] = useState<ScreeningInfo[]>([]);

  const { data: moviesList } = useMovies();

  const location = useLocation();

  useEffect(() => {
    if (typeof selectedMovieId === 'number') {
      getScreeningInfosAPI(selectedMovieId).then(res => {
        setScreeningInfos(res.data);
      });
    } else {
      setScreeningInfos([]);
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
  }, []);
  return (
    <>
      <div className="flex h-[calc(100svh-(--spacing(14)))] justify-center px-4 py-4 sm:py-10">
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
          <div className="p-2">
            <Screening screeningInfos={screeningInfos} />
          </div>
        </Card>
      </div>
    </>
  );
}
