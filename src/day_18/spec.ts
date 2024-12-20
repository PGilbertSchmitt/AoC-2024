import test from 'ava';
import { input, sample } from './input';
import { fewestPathSquares } from './part_1';
import { firstBlockedSpace } from './part_2';

test('Part 1', t => {
  t.is(fewestPathSquares(sample, 6, 12), 22, 'sample');
  t.is(fewestPathSquares(input, 70, 1024), 304, 'input');
});

test('Part 2', t => {
  t.deepEqual(firstBlockedSpace(sample, 6), [6, 1], 'sample');
  t.deepEqual(firstBlockedSpace(input, 70), [50, 28], 'input');
});
