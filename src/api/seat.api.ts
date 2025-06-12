import { httpClient } from './axios';

export const getSeatsAPI = async (screeningId: number) => {
  return await httpClient.get(`api/seats/screening/${screeningId}`);
};

export type ScreeningSeats = {
  screeningId: number;
  seats: Seat[];
};

export type Seat = {
  row: number;
  col: number;
  available: boolean;
};
