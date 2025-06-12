import { Movie } from '@/api/movie.api';

type MovieBtnsProps = {
  moviesList: Movie[];
  selectedMovieId: number | null;
  setSelectedMovieId: React.Dispatch<React.SetStateAction<number | null>>;
};

export function MovieBtns({
  moviesList,
  selectedMovieId,
  setSelectedMovieId,
}: MovieBtnsProps) {
  return (
    <div className="flex h-full flex-col overflow-x-hidden overflow-y-auto">
      {moviesList.map(movie => (
        <div key={movie.id}>
          {selectedMovieId === movie.id ? (
            <button
              type="button"
              className="border-primary hover:bg-primary/10 w-max border-l-2 p-2 text-left font-semibold"
              onClick={() => setSelectedMovieId(null)}
            >
              {movie.title}
            </button>
          ) : (
            <button
              type="button"
              className="hover:bg-primary/10 w-max border-l-2 p-2 text-left font-semibold"
              onClick={() => setSelectedMovieId(movie.id)}
            >
              {movie.title}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
