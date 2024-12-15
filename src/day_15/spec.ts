import test from 'ava';
import { input, sample1, sample2 } from './input';
import { navigateWarehouse } from './part_1';
import { navigateWideWarehouse } from './part_2';

test('Part 1', t => {
  t.is(navigateWarehouse(sample1), 2028, 'sample1');
  t.is(navigateWarehouse(sample2), 10092, 'sample2');
  t.is(navigateWarehouse(input), 1436690, 'input');
});

test('Part 2', t => {
  t.is(navigateWideWarehouse(sample2), 9021, 'sample2');
  t.is(navigateWideWarehouse(input), 1482350, 'input');
});
