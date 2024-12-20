import test from 'ava';
import { input, sample } from './input';
import { validTowels } from './part_1';
import { totalValidTowels } from './part_2';

test('Part 1', t => {
  t.is(validTowels(sample), 6, 'sample');
  t.is(validTowels(input), 238, 'input');
});

test('Part 2', t => {
  t.is(totalValidTowels(sample), 16n, 'sample');
  t.is(totalValidTowels(input), 635018909726691n, 'input');
});
