export type ValueOf<T extends Record<string, unknown>> = T[keyof T];

export type Grid<T> = T[][];

export type Vec = [number, number];
