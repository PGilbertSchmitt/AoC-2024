import { flatten, sum } from 'ramda';
import { Grid as Grid_, Pos } from '../types';
import { coordToKey } from '../utils';

type Grid = Grid_<number>;

export const parseInput = (input: string) => {
  const startingPoints: Array<Pos> = [];
  const lines = input.trim().split('\n');
  const heightMap: Grid = lines.map((line, row) =>
    line.split('').map((val, col) => {
      const heightValue = parseInt(val);
      if (heightValue === 0) {
        startingPoints.push([row, col]);
      }
      if (Number.isNaN(heightValue)) {
        return -1;
      }
      return heightValue;
    }),
  );

  return {
    startingPoints,
    heightMap,
    rowCount: lines.length,
    colCount: lines[0].length,
  };
};

export const neighbors = ([r, c]: Pos): Array<Pos> => [
  [r + 1, c],
  [r - 1, c],
  [r, c + 1],
  [r, c - 1],
];

export const trailheadScore = (input: string) => {
  const { startingPoints, heightMap, rowCount, colCount } = parseInput(input);

  const posKey = coordToKey(rowCount - 1, colCount - 1);

  // Key = hash of position, value = position keys of all 9s accessible to the key
  const cacheMap = new Map<number, Set<number>>();

  const navigate =
    (target: number) =>
    (pos: Pos): Array<number> => {
      const [r, c] = pos;
      const key = posKey(r, c);
      if (key === null || heightMap[r][c] !== target) {
        return [];
      }

      if (target === 9) {
        return [key];
      }

      const memoized = cacheMap.get(key);
      if (memoized) return Array.from(memoized.keys());

      const ends = new Set<number>(
        flatten(neighbors(pos).map(navigate(target + 1))),
      );
      cacheMap.set(key, ends);
      return Array.from(ends.keys());
    };

  return sum(startingPoints.map(pos => navigate(0)(pos).length));
};
