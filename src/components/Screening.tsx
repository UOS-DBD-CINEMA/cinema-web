import { useNavigate } from 'react-router';

import { type Screening as ScreeningT } from '@/api/screening.api';

type ScreeningProps = {
  screenings: ScreeningT[];
};

export function Screening({ screenings }: ScreeningProps) {
  const navigate = useNavigate();

  // for (let i = 100; i < 120; i++) {
  //   screenings.push({
  //     id: i,
  //     theater: { name: `${i}` },
  //     startTime: `${i}`,
  //   });
  // }

  return (
    <div className="flex flex-col">
      <div></div>
      <div className="flex flex-wrap gap-2 overflow-y-auto">
        {screenings.map(screening => (
          <button
            key={screening.id}
            className="bg-secondary hover:bg-secondary/60 text-secondary-foreground w-max rounded-md border p-1"
            onClick={() => {
              navigate(`seats`, {
                state: { screening },
              });
            }}
          >
            <div>{screening.theater.name}</div>
            <div>{screening.startTime.substr(5, 11)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
