import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  getTopMoviesFromLocalStorage,
  useTopMoviesStore,
} from '@/store/topMoviesStore';

import { Button } from './ui/button';

export function TopMoviesCarousel() {
  const { isTopMovies } = useTopMoviesStore();
  const topMovies = getTopMoviesFromLocalStorage();
  const navigate = useNavigate();
  const [movieId, setmovieId] = useState<number | null>(null);

  return (
    <>
      {isTopMovies ? (
        <Carousel
          className="px-2 sm:w-lg md:w-xl lg:w-4xl xl:w-6xl"
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
                    setmovieId(movie.id);
                  }}
                  onMouseOut={() => {
                    setmovieId(null);
                  }}
                  onClick={() => {
                    navigate(`/ticket/:${movie.id}`);
                  }}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="aspect-3/4 rounded-2xl"
                  />
                  {movieId === movie.id ? (
                    <div className="absolute top-0 flex h-full w-full flex-col justify-center gap-2 rounded-2xl bg-black/10 p-2">
                      <Button className="rounded-xl hover:scale-105">
                        예매하기
                      </Button>
                      <Button
                        variant="secondary"
                        className="rounded-xl hover:scale-105"
                        onClick={event => {
                          event.stopPropagation();
                          navigate(`/movies/:${movie.id}`);
                        }}
                      >
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
      ) : (
        ''
      )}
    </>
  );
}
