import { sum } from 'ramda';
import { Vec } from '../types';
import { parseInput } from './part_1';
import { neighbors } from 'src/utils';

export const trailheadRating = (input: string) => {
  const { startingPoints, heightMap, rowCount, colCount } = parseInput(input);

  const inGrid = ([r, c]: Vec) =>
    r >= 0 && r < rowCount && c >= 0 && c < colCount;

  const navigate = (target: number, pos: Vec): number => {
    if (target === 10) return 1;

    return sum(
      neighbors(pos)
        .filter(pos => inGrid(pos) && heightMap[pos[0]][pos[1]] === target)
        .map(neighbor => navigate(target + 1, neighbor)),
    );
  };

  return sum(startingPoints.map(pos => navigate(1, pos)));
};
