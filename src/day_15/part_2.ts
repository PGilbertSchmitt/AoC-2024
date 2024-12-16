import { concat, flatten, reverse, sum, uniq } from 'ramda';
import { Grid, ValueOf, Vec } from '../types';
import { addVecs, gridHandlers } from '../utils';
import { Dir, dirTransform, DirType } from './part_1';

const Space = {
  EMPTY: 0,
  WALL: 1,
  BOX_L: 2,
  BOX_R: 3,
} as const;

type SpaceType = ValueOf<typeof Space>;

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
    flatten(
      line.split('').map((ch, col) => {
        switch (ch) {
          case '#':
            return [Space.WALL, Space.WALL];
          case '.':
            return [Space.EMPTY, Space.EMPTY];
          case 'O':
            return [Space.BOX_L, Space.BOX_R];
          case '@': {
            robot = [row, col * 2];
            return [Space.EMPTY, Space.EMPTY];
          }
          default:
            throw new Error(`Invalid warehouse character: ${ch}`);
        }
      }),
    ),
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

const lateralShift = (warehouse: Warehouse) => {
  const { grid, iPtr, instructions, robot } = warehouse;
  const dirVec = dirTransform(instructions[iPtr]);
  const move = addVecs(dirVec);

  const orderedBoxCoords: Array<Vec> = [];
  let viewedSpace = robot;
  const { getAt, setAt } = gridHandlers(grid);

  while (true) {
    viewedSpace = move(viewedSpace);
    const space = getAt(viewedSpace);
    switch (space) {
      case Space.BOX_L:
      case Space.BOX_R: {
        orderedBoxCoords.push(viewedSpace);
        continue;
      }
      case Space.WALL:
        return;
      case Space.EMPTY: {
        // Shift boxes
        reverse(orderedBoxCoords).forEach(boxCoord => {
          setAt(move(boxCoord), getAt(boxCoord));
        });
        const newBotPos = move(robot);
        if (orderedBoxCoords.length > 0) {
          setAt(orderedBoxCoords[0], Space.EMPTY);
        }
        warehouse.robot = newBotPos;
        return;
      }
    }
  }
};

const verticalShift = (warehouse: Warehouse) => {
  const { grid, iPtr, instructions, robot } = warehouse;
  const dirVec = dirTransform(instructions[iPtr]);
  const move = addVecs(dirVec);
  const moveRight = addVecs(dirTransform(Dir.RIGHT));
  const moveLeft = addVecs(dirTransform(Dir.LEFT));
  const { getAt, setAt } = gridHandlers(grid);

  const getPushableBoxCoords = (boxCoords: Vec[]): Vec[] | null => {
    const nextCoords: Vec[] = [];
    for (const coord of boxCoords) {
      const nextCoord = move(coord);
      const nextSpace = getAt(nextCoord);
      switch (nextSpace) {
        case Space.WALL: {
          // Invalidates the whole move
          return null;
        }
        case Space.BOX_L: {
          nextCoords.push(nextCoord);
          nextCoords.push(moveRight(nextCoord));
          break;
        }
        case Space.BOX_R: {
          nextCoords.push(nextCoord);
          nextCoords.push(moveLeft(nextCoord));
          break;
        }
      }
    }

    const nextLayer =
      nextCoords.length > 0 ? getPushableBoxCoords(uniq(nextCoords)) : [];
    return nextLayer
      ? concat(nextLayer, boxCoords) // Order is important
      : null;
  };

  const firstVec = move(robot);
  let pushableBoxes: null | Vec[] = null;
  switch (getAt(firstVec)) {
    case Space.WALL:
      return;
    case Space.EMPTY: {
      // no-op
      pushableBoxes = [];
      break;
    }
    case Space.BOX_L: {
      pushableBoxes = getPushableBoxCoords([firstVec, moveRight(firstVec)]);
      break;
    }
    case Space.BOX_R: {
      pushableBoxes = getPushableBoxCoords([firstVec, moveLeft(firstVec)]);
      break;
    }
  }

  if (pushableBoxes === null) return;
  for (const boxCoord of pushableBoxes) {
    setAt(move(boxCoord), getAt(boxCoord));
    setAt(boxCoord, Space.EMPTY);
  }

  warehouse.robot = firstVec;
};

const step = (warehouse: Warehouse) => {
  const dir = warehouse.instructions[warehouse.iPtr];
  if (dir === Dir.UP || dir === Dir.DOWN) {
    verticalShift(warehouse);
  } else {
    lateralShift(warehouse);
  }
};

export const navigateWideWarehouse = (input: string) => {
  const warehouse = parseInput(input);

  while (warehouse.iPtr < warehouse.instructions.length) {
    step(warehouse);
    warehouse.iPtr++;
  }

  const gpsCoord = (row: number, col: number) => 100 * row + col;
  return sum(
    warehouse.grid.map((line, row) =>
      sum(
        line.map((space, col) => {
          if (space === Space.BOX_L) {
            return gpsCoord(row, col);
          }
          return 0;
        }),
      ),
    ),
  );
};
