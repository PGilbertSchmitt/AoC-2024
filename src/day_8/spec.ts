import test from 'ava';
import { input, sample, sample2 } from './input';
import { antiPair, countAntinodes } from './part_1';
import { harmonics } from './part_2';

test('Part 1', t => {
  t.is(countAntinodes(sample, antiPair), 14, 'sample');
  t.is(countAntinodes(input, antiPair), 392, 'input');
});

test('Part 2', t => {
  t.is(countAntinodes(sample, harmonics), 34, 'sample');
  t.is(countAntinodes(sample2, harmonics), 9, 'sample2');
  t.is(countAntinodes(input, harmonics), 1235, 'input');
});
