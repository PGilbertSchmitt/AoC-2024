import test from 'ava';
import { input, sample } from './input';
import { totalGuardLoopPositions } from './part_2';
import { distinctGuardPositions } from './part_1';

test('Part 1', t => {
  t.is(distinctGuardPositions(sample), 41, 'sample');
  t.is(distinctGuardPositions(input), 4819, 'input');
});

test('Part 2', t => {
  t.is(totalGuardLoopPositions(sample), 6, 'sample');
  t.is(totalGuardLoopPositions(input), 1796, 'input');
});
