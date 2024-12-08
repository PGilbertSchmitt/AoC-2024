import { ValueOf } from '../types';

export const Dirs = {
  N: 0,
  E: 1,
  S: 2,
  W: 3,
} as const;

export type Dir = ValueOf<typeof Dirs>;

type Grid = boolean[][];
type Pos = [number, number, Dir];

interface Input {
  grid: Grid;
  guardPos: Pos;
}

export const parseInput = (input: string): Input => {
  let guardPos: Pos = [0, 0, Dirs.N];
  const grid = input
    .trim()
    .split('\n')
    .map((line, row) =>
      line.split('').map((ch, col) => {
        if (ch === '#') return false;
        if (ch === '^') {
          guardPos = [row, col, Dirs.N];
        }
        return true;
      }),
    );

  return {
    grid,
    guardPos,
  };
};

const nextPos = ([r, c, d]: Pos): Pos => {
  switch (d) {
    case Dirs.N:
      return [r - 1, c, d];
    case Dirs.E:
      return [r, c + 1, d];
    case Dirs.S:
      return [r + 1, c, d];
    case Dirs.W:
      return [r, c - 1, d];
  }
};

const clockworkTurn = ([r, c, d]: Pos): Pos => {
  switch (d) {
    case Dirs.N:
      return [r, c, Dirs.E];
    case Dirs.E:
      return [r, c, Dirs.S];
    case Dirs.S:
      return [r, c, Dirs.W];
    case Dirs.W:
      return [r, c, Dirs.N];
  }
};

export const distinctGuardPositions = (input: string): number => {
  const { grid, guardPos } = parseInput(input);

  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const inGrid = ([r, c]: Pos) => r < gridHeight && c < gridWidth;
  const posKey = ([r, c]: Pos) => r * gridHeight + c;

  let currentPos = guardPos;
  let visitedSpots = new Set<number>();
  visitedSpots.add(posKey(currentPos));
  while (currentPos !== null) {
    const tryNext = nextPos(currentPos);
    if (!inGrid(tryNext)) break;

    currentPos = grid[tryNext[0]][tryNext[1]]
      ? tryNext
      : nextPos(clockworkTurn(currentPos));

    visitedSpots.add(posKey(currentPos));
  }

  return visitedSpots.size;
};
