import test from 'ava';
import { input, sample1, sample2 } from './input';
import { getCheapestPathCost } from './part_1';
import { getAllCheapestPathSpots } from './part_2';

test('Part 1', t => {
  t.is(getCheapestPathCost(sample1), 7036, 'sample1');
  t.is(getCheapestPathCost(sample2), 11048, 'sample2');
  t.is(getCheapestPathCost(input), 74392, 'input');
});

test('Part 2', t => {
  t.is(getAllCheapestPathSpots(sample1), 45, 'sample1');
  t.is(getAllCheapestPathSpots(sample2), 64, 'sample2');
 // t.is(allCheapestPathSpots(input), 426, 'input'); // Very inefficient, takes 30+ seconds
});
