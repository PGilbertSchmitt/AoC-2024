import test from 'ava';
import { input, sample } from './input';
import { shortCheats } from './part_1';
import { longCheats } from './part_2';

test('Part 1', t => {
  t.is(shortCheats(sample, 1), 44, 'sample');
  t.is(shortCheats(input, 100), 1406, 'input');
});

test('Part 2', t => {
  t.is(longCheats(sample, 50, 20), 285, 'sample');
  t.is(longCheats(input, 100, 20), 1006101, 'input');
});
