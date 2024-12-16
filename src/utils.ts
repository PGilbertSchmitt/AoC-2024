import { concat, sort } from 'ramda';
import { Grid, Vec } from './types';

export const justSort = (list: number[]): number[] =>
  sort((x, y) => x - y, list);

export const tally = <T>(list: T[]): Map<T, number> =>
  list.reduce((m, element) => {
    const oldValue = m.get(element) || 0;
    m.set(element, oldValue + 1);
    return m;
  }, new Map<T, number>());

export const allSubPairs = <T>(list: T[]): Array<[T, T]> => {
  if (list.length < 2) return [];
  if (list.length === 2) return [list as [T, T]];
  const [first, ...rest] = list;
  return concat(
    rest.map(x => [first, x] as [T, T]),
    allSubPairs(rest),
  );
};

export const coordToKey =
  (maxX: number, maxY: number) => (x: number, y: number) => {
    if (x < 0 || x > maxX || y < 0 || y > maxY) return null;
    return x * (maxX + 1) + y;
  };

export const addVecs =
  (v1: Vec) =>
  (v2: Vec): Vec => [v1[0] + v2[0], v1[1] + v2[1]];

export const gridHandlers = <T>(grid: Grid<T>) => ({
  getAt: (vec: Vec): T => grid[vec[0]][vec[1]],
  setAt: (vec: Vec, val: T) => {
    grid[vec[0]][vec[1]] = val;
  },
});
