import { isNil } from "ramda";
import { Dir, Dirs, Grid, Vec } from "../types";
import { coordToKey } from "../utils";
import { PriorityQueue } from "../priority-queue";

export const parseInput = (input: string) => {
  const lines = input.trim().split('\n');
  let start: Vec = [0, 0];
  let end: Vec = [0, 0];

  const grid: Grid<boolean> = lines.map((line, row) =>
    line.split('').map((ch, col) => {
      if (ch === 'S') {
        start = [row, col];
      } else if (ch === 'E') {
        end = [row, col];
      }
      return !(ch === '#');
    })
  );

  return {
    grid,
    start,
    end,
    gridSize: input.length,
  }
};

export type Input = ReturnType<typeof parseInput>;

export type Move = [Dir, number, number, number];
export const nextMoveAndCosts = (dir: Dir, row: number, col: number): [Move, Move, Move] => {
  switch (dir) {
    case Dirs.N: return [
      [Dirs.N, row-1, col, 1],
      [Dirs.E, row, col, 1000],
      [Dirs.W, row, col, 1000],
    ];
    case Dirs.S: return [
      [Dirs.S, row+1, col, 1],
      [Dirs.E, row, col, 1000],
      [Dirs.W, row, col, 1000],
    ];
    case Dirs.E: return [
      [Dirs.E, row, col+1, 1],
      [Dirs.S, row, col, 1000],
      [Dirs.N, row, col, 1000],
    ];
    case Dirs.W: return [
      [Dirs.W, row, col-1, 1],
      [Dirs.S, row, col, 1000],
      [Dirs.N, row, col, 1000],
    ];
  };
};

// const dirStr = (dir: Dir) => {
//   switch (dir) {
//     case Dirs.N: return '^';
//     case Dirs.S: return 'v';
//     case Dirs.E: return '>';
//     case Dirs.W: return '<';
//   }
// }

export const cheapestPathCost = (input: Input) => {
  const { grid, start, end: [endRow, endCol] } = input;

  // console.log(`Looking for ${endRow}x${endCol}`);
  const startingDir = Dirs.E;

  // Any space we revisit is guaranteed to have a shorter path to it since we navigate
  // using the lowest cost path first.
  const visitedSet = new Set<number>();
  const posKey = coordToKey(grid.length-1, grid[0].length-1);

  const currentMoves = new PriorityQueue<Move>((move1, move2) => move1[3] < move2[3]);
  currentMoves.push([startingDir, ...start, 0]);

  let mazeCost = 0;
  while (true) {
    const cheapestMove = currentMoves.pop();
    if (isNil(cheapestMove)) throw new Error('Ran out of valid moves, missed the exit');
    const [curDir, curRow, curCol, curCost] = cheapestMove;
    // console.log(`Current move: ${dirStr(curDir)} ${curRow}x${curCol} ($${curCost})`);
    if (curRow === endRow && curCol === endCol) {
      mazeCost = curCost;
      break;
    }
    nextMoveAndCosts(curDir, curRow, curCol).forEach(([dir, row, col, cost]) => {
      if (grid[row][col] && !visitedSet.has(posKey(row, col)!)) {
        // console.log(`Adding ${dirStr(dir)} ${row}x${col} ($${cost+curCost})`)
        currentMoves.push([dir, row, col, cost+curCost]);
      }
    });
    visitedSet.add(posKey(curRow, curCol)!);
  }

  return mazeCost;
};

export const getCheapestPathCost = (input: string) =>
  cheapestPathCost(parseInput(input));
