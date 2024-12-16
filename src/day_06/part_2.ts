import { Dir, Dirs, Vec } from "../types";

const parseInput = (input: string) => {
  let guardPos: [number, number] = [0, 0];
  const obstructionSet = new Set<number>();
  const rows = input.trim().split('\n');
  const gridHeight = rows.length;
  const gridWidth = rows[0].length;
  const posKey = ([r, c]: Vec) => r * gridHeight + c;
  rows.forEach((line, row) => {
    line.split('').forEach((ch, col) => {
      switch (ch) {
        case '#':
          obstructionSet.add(posKey([row, col]));
          break;
        case '^':
          guardPos = [row, col];
      }
    });
  });

  return {
    obstructionSet,
    guardPos,
    posKey,
    gridHeight,
    gridWidth,
  };
};

const nextPos = ([r, c]: Vec, d: Dir): Vec => {
  switch (d) {
    case Dirs.N:
      return [r - 1, c];
    case Dirs.E:
      return [r, c + 1];
    case Dirs.S:
      return [r + 1, c];
    case Dirs.W:
      return [r, c - 1];
  }
};

const clockworkTurn = (dir: Dir): Dir => {
  switch (dir) {
    case Dirs.N:
      return Dirs.E;
    case Dirs.E:
      return Dirs.S;
    case Dirs.S:
      return Dirs.W;
    case Dirs.W:
      return Dirs.N;
  }
};

export const totalGuardLoopPositions = (input: string) => {
  const { obstructionSet, guardPos, posKey, gridHeight, gridWidth } =
    parseInput(input);

  const inGrid = ([r, c]: Vec) =>
    r >= 0 && r < gridHeight && c >= 0 && c < gridWidth;

  const guardPath = (obstructions: Set<number>): Map<number, number> | null => {
    const visitMap = new Map<number, number>();

    const visit = (pos: Vec, dir: Dir) => {
      if (inGrid(pos)) {
        const key = posKey(pos);
        const space = visitMap.get(key) || 0;
        visitMap.set(key, space | (1 << dir));
      }
    };

    const visited = (pos: Vec, dir: Dir) => {
      const key = posKey(pos);
      const space = visitMap.get(key) || 0;
      return (space & (1 << dir)) !== 0;
    };

    const navigate = (pos: Vec, dir: Dir): Vec | null => {
      let curPos = pos;
      while (true) {
        visit(curPos, dir);
        const ahead = nextPos(curPos, dir);
        const aheadKey = posKey(ahead);
        if (!inGrid(ahead)) {
          return null; // The end
        }
        if (obstructions.has(aheadKey)) {
          return curPos; // Hit obstruction
        }
        curPos = ahead;
      }
    };

    const turn = (pos: Vec, dir: Dir): Dir | null => {
      let newDir = clockworkTurn(dir);
      const ahead = nextPos(pos, newDir);
      if (!inGrid(ahead)) {
        return null; // The end
      }
      const aheadKey = posKey(ahead);
      if (!obstructions.has(aheadKey)) {
        return newDir;
      }
      // If we haven't returned, then we are turning back the way we came
      // This is guaranteed to be safe
      return clockworkTurn(newDir);
    };

    let currentPos: Vec = guardPos;
    let currentDir: Dir = Dirs.N;

    while (true) {
      const newPos = navigate(currentPos, currentDir);
      if (newPos === null) break;
      currentPos = newPos;

      const newDir = turn(currentPos, currentDir);
      if (newDir === null) break;
      currentDir = newDir;

      if (visited(currentPos, currentDir)) {
        return null;
      }
    }

    return visitMap;
  };

  const visitMap = guardPath(obstructionSet)!; // Guaranteed to return a map when no obstruction is provided.

  const startKey = posKey(guardPos);
  let loopCount = 0;
  for (const key of visitMap.keys()) {
    if (key !== startKey) {
      const customObstructions = new Set(obstructionSet);
      customObstructions.add(key);
      const path = guardPath(customObstructions);
      if (path === null) loopCount++;
    }
  }

  return loopCount;
};
