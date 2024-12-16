import { Vec } from '../types';

export interface Bot {
  pos: Vec;
  vel: Vec;
}

export const parseInput = (input: string): Array<Bot> =>
  input
    .trim()
    .split('\n')
    .map(line => {
      const [px, py, dx, dy] = line
        .match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/)!
        .slice(1, 5)
        .map(x => parseInt(x));
      return {
        pos: [px, py],
        vel: [dx, dy],
      };
    });

export const robotLocations = (
  input: string,
  width: number,
  height: number,
) => {
  const locationAfterSteps =
    (steps: number) =>
    ({ pos: [px, py], vel: [dx, dy] }: Bot) => {
      let x = (dx * steps + px) % width;
      if (x < 0) x += width;
      let y = (dy * steps + py) % height;
      if (y < 0) y += height;
      return [x, y];
    };

  const botPositions = parseInput(input).map(locationAfterSteps(100));
  const midX = Math.floor(width / 2);
  const midY = Math.floor(height / 2);
  const quads = botPositions.reduce(
    (acc, [x, y]) => {
      if (x === midX || y === midY) return acc;
      if (x < midX) {
        if (y < midY) {
          acc.q1++;
        } else {
          acc.q2++;
        }
      } else {
        if (y < midY) {
          acc.q3++;
        } else {
          acc.q4++;
        }
      }
      return acc;
    },
    {
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
    },
  );

  return quads.q1 * quads.q2 * quads.q3 * quads.q4;
};
