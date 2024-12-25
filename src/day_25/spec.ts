import test from 'ava';
import { input, sample } from './input';
import { uniqueFits } from './part_1';

test('Part 1', t => {
  t.is(uniqueFits(sample), 3, 'sample');
  t.is(uniqueFits(input), 3284, 'input');
});
