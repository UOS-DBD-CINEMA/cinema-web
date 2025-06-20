import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useTopMovies } from '@/hooks/useTopMovies';

import { Button } from './ui/button';

export function TopMovieCarousel() {
  const [hoveringMovieId, setHoveringMovieId] = useState<number | null>(null);
  const { data: topMovies } = useTopMovies();

  const navigate = useNavigate();

  return (
    <>
      {topMovies && (
        <Carousel
          className="px-2 sm:w-5/6 xl:w-6xl"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="max-sm:-ml-2">
            {topMovies.map(movie => (
              <CarouselItem
                key={movie.id}
                className="basis-1/3 max-sm:pl-2 lg:basis-1/5"
              >
                <div
                  className="relative"
                  onMouseOver={() => {
                    setHoveringMovieId(movie.id);
                  }}
                  onMouseOut={() => {
                    setHoveringMovieId(null);
                  }}
                  onClick={() => {
                    navigate(`/movies/${movie.id}`);
                  }}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="aspect-3/4 rounded-2xl"
                  />
                  {hoveringMovieId === movie.id ? (
                    <div className="absolute top-0 flex h-full w-full flex-col justify-center gap-2 rounded-2xl bg-black/10 p-2">
                      <Button
                        className="rounded-xl"
                        onClick={event => {
                          event.stopPropagation();
                          navigate(`/ticketing`, {
                            state: { movieId: movie.id },
                          });
                        }}
                      >
                        예매하기
                      </Button>
                      <Button variant="secondary" className="rounded-xl">
                        상세보기
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-center text-xl">{movie.title}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  );
}
