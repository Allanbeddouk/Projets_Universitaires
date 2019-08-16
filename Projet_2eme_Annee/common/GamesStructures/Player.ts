export class Player {
  public constructor(public name: string, public minutes: string, public seconds: string ) {}
}

export enum Mode {
  simple,
  free,
}

export const MINUTES_MIN: number = 2;
export const MINUTES_MAX: number = 7;
export const SECOND_MIN: number = 0;
export const SECOND_MAX: number = 59;
export const MAX_BEST_PLAYERS: number = 2;
