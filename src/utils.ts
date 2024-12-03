import { has, sort } from 'ramda';

export const justSort = (list: number[]): number[] =>
  sort((x, y) => x - y, list);

export const tally = <T>(list: T[]): Map<T, number> =>
  list.reduce((m, element) => {
    const oldValue = m.get(element) || 0;
    m.set(element, oldValue + 1);
    return m;
  }, new Map<T, number>());
