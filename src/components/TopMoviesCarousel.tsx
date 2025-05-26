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

  return (
    <>
      {isTopMovies ? (
        <Carousel className="w-3xs min-[440px]:w-xs min-[520px]:w-md sm:w-lg md:w-xl lg:w-4xl xl:w-6xl">
          <CarouselContent className="max-sm:-ml-2">
            {topMovies.map(movie => (
              <CarouselItem
                key={movie.id}
                className="basis-1/3 max-sm:pl-2 lg:basis-1/5"
              >
                <div className="">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="aspect-3/4"
                  />
                </div>
                <div className="flex flex-col overflow-hidden text-xl">
                  {movie.title}
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
