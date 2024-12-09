import { append, isNotNil } from 'ramda';
import { allSubPairs, coordToKey } from '../utils';

export type Pos = [number, number];
export type AntinodeCalculator = (
  toKey: (x: number, y: number) => number | null,
  pos1: Pos,
  pos2: Pos,
) => number[];

export const parseInput = (input: string) => {
  const lines = input.trim().split('\n');

  const antennae = new Map<string, Array<[number, number]>>();
  lines.forEach((line, row) => {
    line.split('').forEach((ch, col) => {
      if (ch !== '.') {
        antennae.set(ch, append([row, col], antennae.get(ch) || []));
      }
    });
  });

  return {
    antennae,
    height: lines.length,
    width: lines[0].length,
  };
};

export const antiPair: AntinodeCalculator = (toKey, [x1, y1], [x2, y2]) => {
  const xDiff = x2 - x1;
  const yDiff = y2 - y1;
  const x3 = x2 + xDiff;
  const y3 = y2 + yDiff;
  const nodeA = toKey(x3, y3);
  const x4 = x1 - xDiff;
  const y4 = y1 - yDiff;
  const nodeB = toKey(x4, y4);

  return [nodeA, nodeB].filter(isNotNil);
};

export const countAntinodes = (
  input: string,
  findAntinodes: AntinodeCalculator,
) => {
  const { antennae, width, height } = parseInput(input);

  const posKey = coordToKey(height - 1, width - 1);
  const antinodes = new Set<number>();

  for (const [_frequency, locations] of antennae) {
    for (const pair of allSubPairs(locations)) {
      findAntinodes(posKey, ...pair).forEach(x => antinodes.add(x));
    }
  }

  return antinodes.size;
};
