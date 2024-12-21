import { count, dropLast, equals, isNil } from 'ramda';
import { Vec } from 'src/types';
import { coordToKey, neighbors } from 'src/utils';

const parseInput = (input: string) => {
  const lines = input.trim().split('\n');
  const height = lines.length;
  const width = lines[0].length;
  const at = (row: number, col: number) => {
    if (row < 0 || row >= height || col < 0 || col >= width) return undefined;
    return lines[row][col];
  };

  let start: Vec | undefined;
  let end: Vec | undefined;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const ch = at(row, col);
      if (ch === 'S') {
        start = [row, col];
      } else if (ch === 'E') {
        end = [row, col];
      }
      if (start && end) {
        return {
          height,
          width,
          at,
          start,
          end,
        };
      }
    }
  }
  throw new Error('Invalid input, start or end is missing');
};

export interface PathElem {
  pos: Vec;
  cost: number;
}

export const buildPath = (input: string) => {
  const { height, width, at, start, end } = parseInput(input);

  const path: PathElem[] = [{ pos: start, cost: 0 }];

  let curPos = start;
  let lastPos = start;
  let cost = 1;

  while (!equals(curPos, end)) {
    const ns = neighbors(curPos).filter(
      n => at(...n) === '.' && !equals(n, lastPos),
    );
    if (ns.length === 0) break;
    if (ns.length > 1)
      throw new Error(
        `Found more than 1 location at r${curPos[0]}-c${curPos[1]}`,
      );
    const pos = ns[0];
    path.push({
      pos,
      cost: cost++,
    });
    lastPos = curPos;
    curPos = pos;
  }

  path.push({ pos: end, cost });

  const posKey = coordToKey(height - 1, width - 1);

  const pathMap = new Map<number, PathElem>();
  for (const elem of path) {
    pathMap.set(posKey(...elem.pos)!, elem);
  }

  return {
    path,
    pathMap,
    posKey,
  };
};

const cheatLocations = ([r, c]: Vec): Vec[] => [
  [r + 2, c],
  [r - 2, c],
  [r, c + 2],
  [r, c - 2],
];

export const shortCheats = (input: string, minSavings: number) => {
  const { path, pathMap, posKey } = buildPath(input);

  let validSavings = 0;
  for (const elem of dropLast(1, path)) {
    cheatLocations(elem.pos).forEach(v => {
      const key = posKey(...v);
      if (isNil(key)) return;
      const cheatSpace = pathMap.get(key);
      if (isNil(cheatSpace)) return;
      const savings = cheatSpace.cost - (elem.cost + 2);
      if (savings >= minSavings) validSavings++;
    });
  }

  return validSavings;
};
