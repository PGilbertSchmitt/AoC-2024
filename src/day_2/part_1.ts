import { all, aperture } from 'ramda';

export const parseInput = (input: string): number[][] =>
  input
    .trim()
    .split('\n')
    .map(line => line.split(' ').map(x => parseInt(x)));

export const safeEntry = (entry: number[]): boolean => {
  if (entry[0] === entry[1]) return false;
  const positive = entry[1] - entry[0] > 0;
  return all(
    ([x, y]) => {
      const diff = y - x;
      return positive ? diff > 0 && diff < 4 : diff < 0 && diff > -4;
    },
    aperture(2, entry) as Array<[number, number]>,
  );
};

export const countSafeReports = (input: string): number =>
  parseInput(input).filter(safeEntry).length;
