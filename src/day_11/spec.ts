import test from 'ava';
import { input, sample1, sample2 } from './input';
import { blinkAtStones } from './part_2';

test('Part 1', t => {
  t.is(blinkAtStones(sample1, 1), 7, 'sample1');
  t.is(blinkAtStones(sample2, 6), 22, 'sample2 - 6 times');
  t.is(blinkAtStones(sample2, 25), 55312, 'sample2 - 25 times');
  t.is(blinkAtStones(input, 25), 212655, 'input');
});

test('Part 2', t => {
  t.is(blinkAtStones(input, 75), 253582809724830, 'input');
});
