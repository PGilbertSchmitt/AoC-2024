import test from 'ava';
import { input, sample } from './input';
import { xmasCount } from './part_1';
import { xMasCount } from './part_2';

test('Part 1', t => {
  t.is(xmasCount(sample), 18, 'sample');
  t.is(xmasCount(input), 2462, 'sample');
});

test('Part 2', t => {
  t.is(xMasCount(sample), 9, 'sample');
  t.is(xMasCount(input), 1877, 'sample');
});
