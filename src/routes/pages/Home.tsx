import { TopMovieCarousel } from '@/components/TopMovieCarousel';

export function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center bg-black">
        <img
          src="https://cf2.lottecinema.co.kr/lotte_image/2025/Mission/Mission_19207746.jpg"
          data-video="https://cf2.lottecinema.co.kr/lotte_image/2025/Mission/Mission_12807206.mp4"
          alt="mission impossible"
          className="w-7xl"
        />
      </div>
      <div className="flex justify-center py-10">
        <TopMovieCarousel />
      </div>
    </div>
  );
}
