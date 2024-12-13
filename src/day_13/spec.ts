import test from 'ava';
import { input, sample } from './input';
import { costOfButtonPresses } from './part_1';
import { costOfFarButtonPresses } from './part_2';

test('Part 1', t => {
  t.is(costOfButtonPresses(sample), 480n, 'sample');
  t.is(costOfButtonPresses(input), 32041n, 'input');
});

test('Part 2', t => {
  t.is(costOfFarButtonPresses(sample), 875318608908n, 'sample');
  t.is(costOfFarButtonPresses(input), 95843948914827n, 'input');
});
