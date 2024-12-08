import { concat, sort } from 'ramda';

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
    allSubPairs(rest)
  );
}

export const coordToKey = (maxX: number, maxY: number) => (x: number, y: number) => {
  if (x < 0 || x > maxX || y < 0 || y > maxY) return null;
  return x * (maxX+1) + y;
};
