import { all, count, times } from 'ramda';

type Schematic = [number, number, number, number, number];

export const parseInput = (input: string) => {
  const schematics = input.trim().split('\n\n');

  const locks: Schematic[] = [];
  const keys: Schematic[] = [];
  schematics.forEach(block => {
    const lines = block.split('\n');
    const isLock = lines[0] === '#####';
    const pinLines = lines.slice(1, 6);
    const schematic = times(
      i => count(line => line[i] === '#', pinLines),
      5,
    ) as Schematic;
    if (isLock) {
      locks.push(schematic);
    } else {
      keys.push(schematic);
    }
  });

  return { locks, keys };
};

const keyFits = (key: Schematic, lock: Schematic): boolean => {
  let pinIdx = 0;
  for (const pin of key) {
    if (pin + lock[pinIdx++] > 5) return false;
  }
  return true;
};

export const uniqueFits = (input: string) => {
  const { locks, keys } = parseInput(input);

  let count = 0;

  for (const lock of locks) {
    for (const key of keys) {
      if (keyFits(key, lock)) count++;
    }
  }

  return count;
};
