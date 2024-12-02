import test from 'ava';
import { sumOfSortedDistances } from './part_1';
import { input, sample } from './input';
import { similarityScore } from './part_2';

test('Part 1', t => {
  t.is(sumOfSortedDistances(sample), 11, 'sample');
  t.is(sumOfSortedDistances(input), 2344935, 'input');
});

test('Part 2', t => {
  t.is(similarityScore(sample), 31, 'sample');
  t.is(similarityScore(input), 27647262, 'sample');
});
