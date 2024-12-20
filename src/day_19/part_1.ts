/**
 * This solution was intended to be very efficient compared to handling
 * only strings, but when I adapted it for part 2, I just couldn't get
 * the right answers. My solution for part 2 is considerably simpler,
 * but rather than retrofit part 1 to use the newer pattern, I've left
 * this here since it is also faster by quite a bit.
 */

import { Color, Colors } from './colors';
import { ColorTrie } from './color_trie';
import { ColorList, newColorList } from './color_list';
import { any, count, isNotNil, reverse, sum } from 'ramda';

const ColorMap: Record<string, Color> = {
  w: Colors.WHITE,
  u: Colors.BLUE,
  b: Colors.BLACK,
  r: Colors.RED,
  g: Colors.GREEN,
};

const toColorString = (pattern: string) =>
  pattern.split('').map(ch => ColorMap[ch]);

export const parseInput = (input: string) => {
  const [patternStr, sequenceStr] = input.trim().split('\n\n');

  return {
    patterns: patternStr.split(', ').map(toColorString),
    sequences: sequenceStr.split('\n').map(toColorString),
  };
};

export const validTowels = (input: string) => {
  const { patterns, sequences } = parseInput(input);
  const trie = new ColorTrie();
  patterns.forEach(pattern => trie.addPattern(pattern));
  const sequenceLists = sequences.map(newColorList);

  return count(seq => {
    const memo = new Map<number, boolean>();
    const validSequence = (sequence: ColorList): boolean => {
      const memoized = memo.get(sequence.i);
      if (isNotNil(memoized)) {
        return memoized;
      }
      const [done, matches] = trie.allMatches(sequence);
      if (done === true) return true;
      // Iterate through the matches in reverse order to perform depth-first search,
      // since the matches are in order from least-matched to most-matched
      const valid = any(match => validSequence(match), reverse(matches));
      memo.set(sequence.i, valid);
      return valid;
    };
    return validSequence(seq);
  }, sequenceLists);
};
