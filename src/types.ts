export type ValueOf<T extends Record<string, unknown>> = T[keyof T];

export type Grid<T> = T[][];

export type Vec = [number, number];

export const Dirs = {
  N: 0,
  E: 1,
  S: 2,
  W: 3,
} as const;

export type Dir = ValueOf<typeof Dirs>;
