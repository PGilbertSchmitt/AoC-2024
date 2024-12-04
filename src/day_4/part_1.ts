import { times } from 'ramda';
import { Grid as GridT } from '../types';

type Grid = GridT<string>;

export const parseInput = (input: string): Grid =>
  input
    .trim()
    .split('\n')
    .map(line => line.split(''));

const countXmas = (ch1: string, ch2: string, ch3: string, ch4: string) =>
  (ch1 === 'X' && ch2 === 'M' && ch3 === 'A' && ch4 === 'S') ||
  (ch1 === 'S' && ch2 === 'A' && ch3 === 'M' && ch4 === 'X')
    ? 1
    : 0;

const findHorizontal = (grid: Grid): number => {
  const lim = grid[0].length - 3;
  let count = 0;
  grid.forEach(row => {
    times(i => {
      count += countXmas(row[i], row[i + 1], row[i + 2], row[i + 3]);
    }, lim);
  });
  return count;
};

const findVertical = (grid: Grid): number => {
  const lim = grid.length - 3;
  let count = 0;
  times(r => {
    times(c => {
      count += countXmas(
        grid[r][c],
        grid[r + 1][c],
        grid[r + 2][c],
        grid[r + 3][c],
      );
    }, grid[r].length);
  }, lim);
  return count;
};

const findDiagonals = (grid: Grid): number => {
  const limR = grid.length - 3;
  const limC = grid[0].length - 3;
  let count = 0;
  times(r => {
    times(c => {
      count +=
        countXmas(
          grid[r][c],
          grid[r + 1][c + 1],
          grid[r + 2][c + 2],
          grid[r + 3][c + 3],
        ) +
        countXmas(
          grid[r][c + 3],
          grid[r + 1][c + 2],
          grid[r + 2][c + 1],
          grid[r + 3][c],
        );
    }, limC);
  }, limR);
  return count;
};

export const xmasCount = (input: string): number => {
  const grid = parseInput(input);
  return findHorizontal(grid) + findVertical(grid) + findDiagonals(grid);
};
