import test from 'ava';
import { input, sample } from './input';
import { codeComplexity } from './part_1_and_2';

test('Part 1', t => {
  t.is(codeComplexity(sample, 2), 126384n, 'sample');
  t.is(codeComplexity(input, 2), 215374n, 'input');
});

test('Part 2', t => {
  t.is(codeComplexity(input, 25), 260586897262600n, 'input');
});
