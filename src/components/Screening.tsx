import { useNavigate } from 'react-router';

import { ScreeningInfo } from '@/api/screening.api';

type ScreeningProps = {
  screeningInfos: ScreeningInfo[];
};

export function Screening({ screeningInfos }: ScreeningProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col">
        <div></div>
        <div className="flex flex-wrap gap-2">
          {screeningInfos.map(screeningInfo => (
            <button
              type="button"
              key={screeningInfo.id}
              className="bg-secondary hover:bg-secondary/60 text-secondary-foreground flex flex-col rounded-md border p-1"
              onClick={() => {
                navigate(`seats`, {
                  state: { screeningInfo },
                });
              }}
            >
              <div>{screeningInfo.theater.name}</div>
              <div>{screeningInfo.startTime.substr(5, 11)}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
