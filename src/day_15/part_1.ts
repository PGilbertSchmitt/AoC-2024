import { sum } from 'ramda';
import { Grid, ValueOf, Vec } from '../types';
import { addVecs, gridHandlers } from '../utils';

const Space = {
  EMPTY: 0,
  WALL: 1,
  BOX: 2,
} as const;

type SpaceType = ValueOf<typeof Space>;

export const Dir = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
} as const;

export type DirType = ValueOf<typeof Dir>;

interface Warehouse {
  grid: Grid<SpaceType>;
  robot: Vec;
  instructions: DirType[];
  iPtr: number;
}

const parseInput = (input: string): Warehouse => {
  const [gridStr, insStr] = input.trim().split('\n\n');

  let robot: Vec = [0, 0];
  const grid = gridStr.split('\n').map((line, row) =>
    line.split('').map((ch, col) => {
      switch (ch) {
        case '#':
          return Space.WALL;
        case '.':
          return Space.EMPTY;
        case 'O':
          return Space.BOX;
        case '@': {
          robot = [row, col];
          return Space.EMPTY;
        }
        default:
          throw new Error(`Invalid warehouse character: ${ch}`);
      }
    }),
  );

  return {
    grid,
    robot,
    iPtr: 0,
    instructions: insStr
      .replace(/\n/g, '')
      .split('')
      .map(ch => {
        switch (ch) {
          case '^':
            return Dir.UP;
          case '>':
            return Dir.RIGHT;
          case '<':
            return Dir.LEFT;
          case 'v':
            return Dir.DOWN;
          default:
            throw new Error(`Invalid direction: ${ch}`);
        }
      }),
  };
};

export const dirTransform = (dir: DirType): Vec => {
  switch (dir) {
    case Dir.UP:
      return [-1, 0];
    case Dir.DOWN:
      return [1, 0];
    case Dir.RIGHT:
      return [0, 1];
    case Dir.LEFT:
      return [0, -1];
  }
};

const stepWarehouse = (warehouse: Warehouse) => {
  const { grid, iPtr, instructions, robot } = warehouse;
  if (iPtr >= instructions.length) return false;

  const dirVec = dirTransform(instructions[iPtr]);
  warehouse.iPtr++;
  const move = addVecs(dirVec);
  const { getAt, setAt } = gridHandlers(grid);

  let firstBoxPos: Vec | null = null;
  let viewedSpace = robot;

  while (true) {
    viewedSpace = move(viewedSpace);
    const space = getAt(viewedSpace);
    switch (space) {
      case Space.WALL:
        return true;
      case Space.BOX: {
        firstBoxPos ||= viewedSpace;
        continue;
      }
      case Space.EMPTY: {
        warehouse.robot = move(robot);
        if (firstBoxPos) {
          setAt(viewedSpace, Space.BOX);
          setAt(firstBoxPos, Space.EMPTY);
        }
        return true;
      }
    }
  }
};

export const navigateWarehouse = (input: string) => {
  const warehouse = parseInput(input);
  while (stepWarehouse(warehouse)) {}

  const gpsCoord = (row: number, col: number) => 100 * row + col;
  return sum(
    warehouse.grid.map((line, row) =>
      sum(
        line.map((space, col) =>
          space === Space.BOX ? gpsCoord(row, col) : 0,
        ),
      ),
    ),
  );
};
