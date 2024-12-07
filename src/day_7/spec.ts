import test from 'ava';
import { input, sample } from './input';
import { add, calibrateOperators, concat, mult } from './part_1_and_2';

test('Part 1', t => {
  t.is(calibrateOperators(sample, [add, mult]), 3749, 'sample');
  t.is(calibrateOperators(input, [add, mult]), 850435817339, 'input');
});

test('Part 2', t => {
  t.is(calibrateOperators(sample, [add, mult, concat]), 11387, 'sample');
  t.is(calibrateOperators(input, [add, mult, concat]), 104824810233437, 'input');
});
