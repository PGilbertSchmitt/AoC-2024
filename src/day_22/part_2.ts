import { flatten, isNil, isNotNil, sum, takeLast, uniq } from 'ramda';
import { nextSecret } from './part_1';
import { input } from './input';

// Convert any sequence of 4 digits from -9 to 9 inclusive into a unique value
const sequenceKey = (a: number, b: number, c: number, d: number) =>
  a + 9 + ((b + 9) << 5) + ((c + 9) << 10) + ((d + 9) << 15);
// `${a},${b},${c},${d}`;

const calculateSequences = (n: number) => (value: number) => {
  const sequence: number[] = [];
  const sequenceValues = new Map<number, number>();

  let v = value;
  let lastOnes = value % 10;
  for (let i = 0; i < n; i++) {
    v = nextSecret(v);
    const ones = v % 10;
    sequence.push(ones - lastOnes);
    lastOnes = ones;
    if (i >= 3) {
      const key = sequenceKey(
        ...(takeLast(4, sequence) as [number, number, number, number]),
      );
      if (isNil(sequenceValues.get(key))) {
        sequenceValues.set(key, ones);
      }
    }
  }

  return sequenceValues;
};

export const maxBananas = (input: string): number => {
  const inits = input
    .trim()
    .split('\n')
    .map(x => parseInt(x));
  const sequenceMaps = inits.map(calculateSequences(2000));

  const possibleKeys = new Set<number>();
  sequenceMaps.forEach(m => {
    for (const k of m.keys()) {
      possibleKeys.add(k);
    }
  });

  let highestBananaCount = 0;
  for (const key of possibleKeys.keys()) {
    const bananas = sum(sequenceMaps.map(m => m.get(key) || 0));
    if (bananas > highestBananaCount) {
      highestBananaCount = bananas;
    }
  }

  return highestBananaCount;
};
