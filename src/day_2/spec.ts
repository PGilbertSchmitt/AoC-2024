import test from 'ava';
import { input, sample } from './input';
import { countSafeReports } from './part_1';
import { countSaferReports } from './part_2';

test('Day 2 Part 1', t => {
  t.is(countSafeReports(sample), 2, 'sample');
  t.is(countSafeReports(input), 660, 'input');
});

test('Day 2 Part 2', t => {
  t.is(countSaferReports(sample), 4, 'sample');
  t.is(countSaferReports(input), 689, 'input');
});
