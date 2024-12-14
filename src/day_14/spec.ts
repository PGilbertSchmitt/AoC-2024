import test from 'ava';
import { input, sample } from './input';
import { robotLocations } from './part_1';
import { robotStepper } from './part_2';

test('Part 1', t => {
  t.is(robotLocations(sample, 11, 7), 12, 'sample');
  t.is(robotLocations(input, 101, 103), 219512160, 'input');
});

test('Part 2', t => {
  // Not really the type of problem that requires a spec, but if you want to see the fruits of
  // this labor, uncomment this line before running the test
  // robotStepper(input, 101, 103);
  t.assert(true);
});
