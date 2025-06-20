import React from 'react';

import { type ScreeningSeats as ScreeningSeatsT, Seat } from '@/api/seat.api';
import { seatRowAlphabets } from '@/constants/seat';

type SeatGridProps = {
  screeningSeats: ScreeningSeatsT;
  selectedSeats: Seat[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>;
  totalNum: number;
};

export function SeatGrid({
  screeningSeats,
  selectedSeats,
  setSelectedSeats,
  totalNum,
}: SeatGridProps) {
  return (
    <div className="flex flex-col gap-1">
      {[...Array(15).keys()].map(row => (
        <div key={row} className="flex gap-1">
          {[...Array(21).keys()].map(col => (
            <React.Fragment key={col}>
              {col === 0 ? (
                <div className="size-6">{seatRowAlphabets[row]}</div>
              ) : (
                <>
                  {screeningSeats?.seats.some(
                    seat =>
                      seat.row === row && seat.col === col && seat.available,
                  ) ? (
                    <>
                      {selectedSeats.some(
                        seat => seat.row === row && seat.col === col,
                      ) ? (
                        <button
                          type="button"
                          className="bg-primary/80 text-primary-foreground size-6 border"
                          onClick={() =>
                            setSelectedSeats(
                              selectedSeats.filter(
                                seat => seat.row !== row || seat.col !== col,
                              ),
                            )
                          }
                        >
                          {col}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 size-6 border"
                          onClick={() => {
                            if (selectedSeats.length < totalNum) {
                              setSelectedSeats([
                                ...selectedSeats,
                                { row, col, available: true },
                              ]);
                            }
                          }}
                        >
                          {col}
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {screeningSeats?.seats.some(
                        seat =>
                          seat.row === row &&
                          seat.col === col &&
                          !seat.available,
                      ) ? (
                        <button
                          type="button"
                          className="size-6 border disabled:pointer-events-none disabled:opacity-50"
                          disabled
                        >
                          {col}
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
