import test from 'ava';
import { input, sample } from './input';
import { sumOfMiddleValidSections } from './part_1';
import { uniq } from 'ramda';
import { sumOfMiddleFixedSections } from './part_2';

test('Part 1', t => {
  t.is(sumOfMiddleValidSections(sample), 143, 'sample');
  t.is(sumOfMiddleValidSections(input), 4766, 'input');
});

test('Part 2', t => {
  t.is(sumOfMiddleFixedSections(sample), 123, 'sample');
  t.is(sumOfMiddleFixedSections(input), 6257, 'input');
});
