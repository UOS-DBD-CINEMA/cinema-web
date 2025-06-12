import React from 'react';

import { type ScreeningSeats as ScreeningSeatsT, Seat } from '@/api/seat.api';

const alphabets = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

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
    <div className="grid w-xs grid-cols-11 gap-1">
      {[...Array(11).keys()].map(row => (
        <React.Fragment key={row}>
          {[...Array(11).keys()].map(col => (
            <React.Fragment key={col}>
              {col === 0 ? (
                <div>{alphabets[row]}</div>
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
                          className="bg-primary/80 text-primary-foregrou border"
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
                          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border"
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
                        <button type="button" className="border" disabled>
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
        </React.Fragment>
      ))}
    </div>
  );
}
