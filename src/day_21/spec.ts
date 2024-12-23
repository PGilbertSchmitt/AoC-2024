import test from 'ava';
import { input, sample } from './input';
import { codeComplexity } from './part_1';

test('Part 1', t => {
  t.is(codeComplexity(sample), 126384, 'sample');
  t.is(codeComplexity(input), 0, 'input');
});

// test('Part 2', t => {
//   t.is(, 0, 'sample');
//   t.is(, 0, 'sample');
// });
