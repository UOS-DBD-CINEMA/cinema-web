import { useState } from 'react';
import { useLocation } from 'react-router';

import { AdminMovie } from '@/api/admin/movie.api';
import { AdminEditMovieForm } from '@/components/admin/AdminEditMovieForm';
import { Card } from '@/components/ui/card';

export function AdminMovieDetail() {
  const location = useLocation();

  const [movie, setMovie] = useState<AdminMovie>(() => {
    return location.state.movie;
  });

  return (
    <div className="flex overflow-auto p-4 sm:justify-center sm:py-8">
      <Card className="w-6xl gap-0 p-0">
        <div className="flex h-full flex-col items-center gap-6 p-2">
          {movie && (
            <div className="flex flex-col gap-8 lg:w-3xl">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-12">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="aspect-3/4 w-50 rounded-2xl sm:w-80"
                />
                <div className="flex flex-col items-start gap-2 sm:scale-120">
                  <p className="text-2xl font-semibold">{movie.title}</p>
                  <p>상영 시간: {movie.runtime}분</p>
                  <p>장르: {movie.genre}</p>
                  <p>등급: {movie.rating}</p>
                  <p>
                    {movie.staffs.map(({ movieName, personName, role }, i) => (
                      <span key={i}>
                        {personName}-{role}-{movieName}
                        &ensp;
                      </span>
                    ))}
                  </p>
                  <AdminEditMovieForm movie={movie} setMovie={setMovie} />
                </div>
              </div>
              <p>{movie.description}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
