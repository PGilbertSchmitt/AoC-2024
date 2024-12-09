import test from 'ava';
import { input, sample } from './input';
import { compactFilesystemNaive } from './part_1';
import { compactFilesystem } from './part_2';

test('Part 1', t => {
  t.is(compactFilesystemNaive(sample), 1928, 'sample');
  t.is(compactFilesystemNaive(input), 6216544403458, 'input');
});

test('Part 2', t => {
  t.is(compactFilesystem(sample), 2858, 'sample');
  t.is(compactFilesystem(input), 6237075041489, 'input');
});

