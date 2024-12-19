import { isNotNil } from 'ramda';
import { Vec } from '../types';
import { bigSum } from 'src/utils';

interface Machine {
  slope1: Vec;
  slope2: Vec;
  end: Vec;
}

const TWO_NUMS = /(\d+)/g;
const twoNums = (line: string): Vec => {
  const [x, y] = line.match(TWO_NUMS)!;
  return [parseInt(x), parseInt(y)];
};

export const parseInput = (input: string): Array<Machine> =>
  input
    .trim()
    .split('\n\n')
    .map(chunk => {
      const [aButtonLine, bButtonLine, prizeLine] = chunk.split('\n');
      return {
        slope1: twoNums(aButtonLine),
        slope2: twoNums(bButtonLine),
        end: twoNums(prizeLine),
      };
    });

const intersectionPoint = (
  slope1: Vec,
  slope2: Vec,
  endPoint: Vec,
): [bigint, bigint] | null => {
  // https://en.wikipedia.org/wiki/Line-line_intersection#Given_two_points_on_each_line

  const [run1, rise1] = slope1;
  const [run2, rise2] = slope2;
  const [endX, endY] = endPoint;

  // Form line segment from origin with first slope
  const x1 = 0n;
  const y1 = 0n;
  const x2 = BigInt(run1);
  const y2 = BigInt(rise1);

  // Form line segment from end point with second slope
  const x3 = BigInt(endX);
  const y3 = BigInt(endY);
  const x4 = BigInt(endX + run2);
  const y4 = BigInt(endY + rise2);

  const pDenominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (pDenominator === 0n) {
    // Input doesn't seem to contain any parallel lines, so I don't gotta process it
    throw new Error('PARALLEL');
  }

  const termA = x1 * y2 - y1 * x2;
  const termB = x3 * y4 - y3 * x4;
  const pxNumerator = termA * (x3 - x4) - (x1 - x2) * termB;
  const pyNumerator = termA * (y3 - y4) - (y1 - y2) * termB;

  if (pxNumerator % pDenominator === 0n && pyNumerator % pDenominator === 0n) {
    return [pxNumerator / pDenominator, pyNumerator / pDenominator];
  }

  // This means there is an origin point, but either the x or the y isn't an integer, which means it's useless
  return null;
};

export const findButtonPresses = ({ slope1, slope2, end }: Machine) => {
  const inter = intersectionPoint(slope1, slope2, end);
  if (inter === null) {
    // No intersection, so no button presses
    return null;
  }

  const run1 = BigInt(slope1[0]);
  const run2 = BigInt(slope2[0]);
  const xEnd = BigInt(end[0]);
  const xIntersect = inter[0];

  const slope2run = xEnd - xIntersect;
  if (xIntersect % run1 === 0n && slope2run % run2 === 0n) {
    return [xIntersect / run1, slope2run / run2];
  }

  // Intersection point not reachable using the buttons
  return null;
};

export const costOfButtonPresses = (input: string) => {
  const machines = parseInput(input);
  return bigSum(
    machines
      .map(machine => {
        const result = findButtonPresses(machine);
        if (result) {
          const [aPresses, bPresses] = result;
          return aPresses * 3n + bPresses;
        }
      })
      .filter(isNotNil),
  );
};
