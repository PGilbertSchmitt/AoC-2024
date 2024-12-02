import test from 'ava';
import { input, sample } from './input';

const fn = (x: any) => 0;

test('Part 1', t => {
  t.is(fn(sample), 0, 'sample');
  t.is(fn(input), 0, 'input');
});

test('Part 2', t => {
  t.is(fn(sample), 0, 'sample');
  t.is(fn(input), 0, 'sample');
});
