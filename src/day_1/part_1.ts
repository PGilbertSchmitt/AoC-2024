import { sum, zip } from 'ramda';
import { justSort } from '../utils';

export const toLists = (input: string): [number[], number[]] => {
  const pairs = input
    .trim()
    .split('\n')
    .map(str => str.split('   ').map(x => parseInt(x)) as [number, number]);
  return [pairs.map(x => x[0]), pairs.map(x => x[1])];
};

export const sumOfSortedDistances = (input: string) => {
  const [left, right] = toLists(input);
  const sortedLeft = justSort(left);
  const sortedRight = justSort(right);
  return sum(
    zip(sortedLeft, sortedRight).map(([x, y]) => Math.abs(x - y))
  );
};