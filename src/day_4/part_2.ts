import { times } from 'ramda';
import { Grid as GridT } from '../types';
import { parseInput } from './part_1';

type Grid = GridT<string>;

const countXMas = (grid: Grid, row: number, col: number): number => {
  const diag1 = [
    grid[row][col],
    grid[row + 1][col + 1],
    grid[row + 2][col + 2],
  ].join('');
  const diag2 = [
    grid[row][col + 2],
    grid[row + 1][col + 1],
    grid[row + 2][col],
  ].join('');
  return (diag1 === 'MAS' || diag1 === 'SAM') &&
    (diag2 === 'MAS' || diag2 === 'SAM')
    ? 1
    : 0;
};

export const xMasCount = (input: string): number => {
  const grid = parseInput(input);
  const limR = grid.length - 2;
  const limC = grid[0].length - 2;
  let count = 0;
  times(r => {
    times(c => {
      count += countXMas(grid, r, c);
    }, limC);
  }, limR);
  return count;
};
