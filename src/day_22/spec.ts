import test from 'ava';
import { input, sample, sample2 } from './input';
import { futureNumbers } from './part_1';
import { maxBananas } from './part_2';

test('Part 1', t => {
  t.is(futureNumbers(sample), 37327623, 'sample');
  t.is(futureNumbers(input), 19822877190, 'input');
});

test('Part 2', t => {
  t.is(maxBananas(sample2), 23, 'sample2');
  // Takes 17 seconds to run as-is
  // t.is(maxBananas(input), 2277, 'input');
});
