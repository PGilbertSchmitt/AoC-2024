import { isNotNil } from 'ramda';
import { bigSum } from '../utils';

// Slower than the other way, but might get results
const match = (
  memo: Map<string, bigint>,
  patterns: string[],
  sequence: string,
): bigint => {
  const memoized = memo.get(sequence);
  if (isNotNil(memoized)) return memoized;

  let total = 0n;
  for (const pattern of patterns) {
    if (pattern.length === sequence.length && pattern === sequence) {
      total++;
    } else if (
      pattern.length < sequence.length &&
      sequence.startsWith(pattern)
    ) {
      total += match(memo, patterns, sequence.slice(pattern.length));
    }
  }

  memo.set(sequence, total);
  return total;
};

export const totalValidTowels = (input: string) => {
  const [patternStr, sequenceStr] = input.trim().split('\n\n');
  const patterns = patternStr.split(', ');
  const sequences = sequenceStr.split('\n');

  return bigSum(
    sequences.map(seq => {
      const count = match(new Map(), patterns, seq);
      return count;
    }),
  );
};
