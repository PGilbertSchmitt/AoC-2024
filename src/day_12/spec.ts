import test from 'ava';
import { input, sample1, sample2, sample3, sampleAB, sampleE } from './input';
import { costOfFences } from './part_1';
import { costOfBulkFences } from './part_2';

test('Part 1', t => {
  t.is(costOfFences(sample1), 140, 'sample1');
  t.is(costOfFences(sample2), 772, 'sample2');
  t.is(costOfFences(sample3), 1930, 'sample3');
  t.is(costOfFences(input), 1471452, 'input');
});

test('Part 2', t => {
  t.is(costOfBulkFences(sample1), 80, 'sample1');
  t.is(costOfBulkFences(sample2), 436, 'sample2');
  t.is(costOfBulkFences(sampleE), 236, 'sampleE');
  t.is(costOfBulkFences(sampleAB), 368, 'sampleAB');
  // Takes 8 seconds to run, and I don't feel like optimizing
  // t.is(costOfBulkFences(input), 863366, 'input');
});
