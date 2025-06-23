import { useNavigate } from 'react-router';

import { AdminMovie, deleteAdminMovieAPI } from '@/api/admin/movie.api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type AdminMovieListProps = {
  movies: AdminMovie[];
  setMovies: React.Dispatch<React.SetStateAction<AdminMovie[]>>;
};

export function AdminMovieList({ movies, setMovies }: AdminMovieListProps) {
  const navigate = useNavigate();

  return (
    <>
      {movies.map(movie => {
        return (
          <div
            key={movie.id}
            className="flex flex-wrap items-center justify-center gap-4 border-t border-dashed py-2"
          >
            <div className="flex w-xs items-center gap-2 sm:w-md">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="aspect-3/4 w-30 rounded-2xl"
              />
              <div className="flex flex-col items-start">
                <p className="truncate text-2xl font-semibold">{movie.title}</p>
                <p>상영 시간: {movie.runtime}분</p>
                <p>장르: {movie.genre}</p>
                <p>
                  {movie.staffs.map(({ movieName, personName, role }, i) => (
                    <span key={i}>
                      {personName}-{role}-{movieName}
                      &ensp;
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="secondary">
                    삭제하기
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-sm">
                  <DialogHeader>
                    <DialogTitle>정말 정말로 삭제하시겠습니까?</DialogTitle>
                    <DialogDescription>
                      데이터 손실의 위험이 있습니다.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        deleteAdminMovieAPI(movie.id).then(() => {
                          setMovies(movies.filter(m => m.id !== movie.id));
                        });
                      }}
                    >
                      삭제하기
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
              <Button
                size="sm"
                onClick={() => {
                  navigate(`/admin/movies/${movie.id}`, { state: { movie } });
                }}
              >
                상세 수정
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
