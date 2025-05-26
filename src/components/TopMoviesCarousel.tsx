import { useCallback } from 'react';
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

export function TopMoviesCarousel() {
  const { isTopMovies } = useTopMoviesStore();
  const topMovies = getTopMoviesFromLocalStorage();
  const navigate = useNavigate();

  return (
    <>
      {isTopMovies ? (
        <Carousel
          className="w-3xs min-[440px]:w-xs min-[520px]:w-md sm:w-lg md:w-xl lg:w-4xl xl:w-6xl"
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
                  onClick={() => {
                    navigate(`/movies/:${movie.id}`);
                  }}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="aspect-3/4 rounded-2xl"
                  />
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
