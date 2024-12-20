import test from 'ava';
import { input, sample, sample2 } from './input';
import { evaluateInitialProgram } from './part_1';
import { findQuineFast } from './part_2_handcrafted';
import { findQuineGeneric } from './part_2';

test('Part 1', t => {
  t.is(evaluateInitialProgram(sample), '4,6,3,5,6,3,5,2,1,0', 'sample');
  t.is(evaluateInitialProgram(input), '1,5,0,3,7,3,0,3,1', 'input');
});

test('Part 2 (handcrafted)', t => {
  t.is(findQuineFast(input), 105981155568026n, 'input');
});

test('Part 2 Generic', t => {
  t.is(findQuineGeneric(sample2), 117440n, 'sample2');
  t.is(findQuineGeneric(input), 105981155568026n, 'input');
});
