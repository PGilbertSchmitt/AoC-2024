import { isNotNil } from 'ramda';
import { ColorList, newColorList } from './color_list';
import { ColorTrie } from './color_trie';
import { parseInput } from './part_1';
import { Color, Colors } from './colors';
import { bigSum } from '../utils';

const fromColorString = (colors: Color[]): string =>
  colors
    .map(color => {
      switch (color) {
        case Colors.WHITE:
          return 'w';
        case Colors.RED:
          return 'r';
        case Colors.BLUE:
          return 'u';
        case Colors.GREEN:
          return 'g';
        case Colors.BLACK:
          return 'b';
      }
    })
    .join('');

export const totalValidTowels = (input: string) => {
  const { patterns, sequences } = parseInput(input);

  const trie = new ColorTrie();
  patterns.forEach(pattern => trie.addPattern(pattern));
  const sequenceLists = sequences.map(newColorList);

  return bigSum(
    sequenceLists.map((seq, i) => {
      const memo = new Map<number, bigint>();

      const countValidSequences = (sequence: ColorList): bigint => {
        const memoized = memo.get(sequence.i);
        if (isNotNil(memoized)) return memoized;

        const [done, matches] = trie.allMatches(sequence);
        const count =
          (done ? 1n : 0n) +
          bigSum(matches.map(match => countValidSequences(match)));
        memo.set(sequence.i, count);
        return count;
      };

      const count = countValidSequences(seq);

      return BigInt(count);
    }),
  );
};
