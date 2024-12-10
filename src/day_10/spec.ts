import test from 'ava';
import { input, sample } from './input';
import { trailheadScore } from './part_1';
import { trailheadRating } from './part_2';

test('Part 1', t => {
  t.is(trailheadScore(sample), 36, 'sample');
  t.is(trailheadScore(input), 550, 'input');
});

test('Part 2', t => {
  t.is(trailheadRating(sample), 81, 'sample');
  t.is(trailheadRating(input), 1255, 'input');
});
