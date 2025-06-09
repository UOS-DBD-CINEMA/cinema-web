import { httpClient } from './axios';

export const getSeatsAPI = async (screeningId: number) => {
  return await httpClient.get(`api/seats/screening/${screeningId}`);
};

export type ScreeningSeats = {
  screeningId: number;
  seats: Seat[];
};

type Seat = {
  row: number;
  column: number;
  available: boolean;
};
