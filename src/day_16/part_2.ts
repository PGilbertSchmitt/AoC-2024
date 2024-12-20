import { clone, concat, isNil, last, uniq } from 'ramda';
import { PriorityQueue } from '../priority-queue';
import { Dir, Dirs, Vec } from '../types';
import {
  cheapestPathCost,
  Input,
  nextMoveAndCosts,
  parseInput,
} from './part_1';

type MoveWithPriorPaths = {
  dir: Dir;
  path: Vec[];
  cost: number;
};

const backwards = (dir: Dir): Dir => {
  switch (dir) {
    case Dirs.N:
      return Dirs.S;
    case Dirs.S:
      return Dirs.N;
    case Dirs.E:
      return Dirs.W;
    case Dirs.W:
      return Dirs.E;
  }
};

const getCheapestPathSpots = (input: Input) => {
  const {
    grid,
    start,
    end: [endRow, endCol],
    gridSize,
  } = input;
  const height = grid.length;
  const startingDir = Dirs.E;

  // Unlike in Part 1, we actually need to know the cheapest cost to get to any
  // space. These keys need to keep the dir as well
  const visitedMap = new Map<number, number>();
  const posKey = (dir: Dir, row: number, col: number) =>
    dir * gridSize + row * height + col;

  const currentMoves = new PriorityQueue<MoveWithPriorPaths>(
    (move1, move2) => move1.cost < move2.cost,
  );
  currentMoves.push({
    cost: 0,
    dir: startingDir,
    path: [start],
  });

  const cheapestCost = cheapestPathCost(input);

  let cheapestPath: Vec[] = [];

  while (true) {
    const cheapestMove = currentMoves.pop();
    if (isNil(cheapestMove)) break;
    const curDir = cheapestMove.dir;
    const curCost = cheapestMove.cost;
    const [curRow, curCol] = last(cheapestMove.path)!;

    if (curCost > cheapestCost) continue;
    if (curCost === cheapestCost && curRow === endRow && curCol === endCol) {
      cheapestPath = concat(cheapestPath, cheapestMove.path);
      continue;
    }

    let potentialMoves = nextMoveAndCosts(curDir, curRow, curCol).filter(
      move => grid[move[1]][move[2]],
    );

    for (const [dir, row, col, moveCost] of potentialMoves) {
      const cost = moveCost + curCost;
      if (cost > cheapestCost) continue;
      // optimization so that we don't perform expensive copies when we don't need to
      const key = posKey(dir, row, col);
      const prevCost = visitedMap.get(key) || Infinity;
      if (curCost > prevCost) continue;

      const path =
        potentialMoves.length === 1
          ? cheapestMove.path
          : clone(cheapestMove.path);
      path.push([row, col]);
      if (curCost === prevCost) {
        cheapestPath = concat(cheapestPath, path);
      } else {
        currentMoves.push({
          dir,
          cost,
          path,
        });
      }
    }

    visitedMap.set(posKey(curDir, curRow, curCol), curCost);
    // Optimization to make sure we don't search backwards
    visitedMap.set(posKey(backwards(curDir), curRow, curCol), curCost);
  }

  return uniq(cheapestPath).length;
};

export const getAllCheapestPathSpots = (input: string) =>
  getCheapestPathSpots(parseInput(input));
